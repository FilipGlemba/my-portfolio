import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import connect from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import authOptions from "@/lib/auth";
import { checkoutSchema } from "@/lib/schemas";
import { createCheckoutSession, isStripeConfigured, type CheckoutLineItem } from "@/lib/stripe";
import { orderTotal, shippingFor } from "@/lib/shipping";
import { MAX_CART_LINES } from "@/lib/limits";

// Thrown for problems the shopper can fix — its message is safe to show them.
class CheckoutError extends Error {}

export async function POST(request: NextRequest) {
  let body;
  try {
    const raw = await request.json();
    // Obrovské pole odmietnuť skôr, než ho Zod začne prechádzať (ochrana pamäte).
    if (Array.isArray(raw?.items) && raw.items.length > MAX_CART_LINES) {
      return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
    }
    body = checkoutSchema.parse(raw);
  } catch (error) {
    const message = error instanceof ZodError ? "Please check your details and try again." : "Invalid request.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    await connect();
    const session = await getServerSession(authOptions);

    const items: CheckoutLineItem[] = await Promise.all(
      body.items.map(async (item) => {
        const product = await Product.findOne({ slug: item.slug }).lean();
        if (!product) throw new CheckoutError(`"${item.slug}" is no longer available — please remove it from your cart.`);
        return {
          productId: product._id.toString(),
          slug: product.slug,
          name: product.name,
          price: product.price, // always the DB price, never the client's
          quantity: item.quantity,
          images: product.images || [],
        };
      }),
    );

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const demoMode = !isStripeConfigured();
    const checkoutSession = demoMode
      ? null
      : await createCheckoutSession(items, `${baseUrl}/order-success`, `${baseUrl}/cart`, body.email, shippingFor(subtotal));

    const orderUser = session?.user?.email ? await User.findOne({ email: session.user.email }) : null;

    const order = await Order.create({
      user: orderUser?._id ?? null,
      items: items.map((item) => ({
        product: item.productId,
        slug: item.slug,
        name: item.name,
        image: item.images?.[0] ?? "",
        qty: item.quantity,
        price: item.price,
      })),
      total: orderTotal(subtotal), // includes shipping — the same number the summary showed
      // Demo orders skip payment, so they're recorded as paid straight away;
      // real Stripe orders stay pending until the webhook confirms payment.
      status: demoMode ? "paid" : "pending",
      stripeSessionId: checkoutSession ? checkoutSession.id : `demo_${randomUUID()}`,
      shippingAddress: {
        name: body.name,
        email: body.email,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
      },
      createdAt: new Date(),
    });

    const url = checkoutSession ? checkoutSession.url : `/order-success?order=${order._id.toString()}&demo=1`;
    return NextResponse.json({ url, demo: demoMode });
  } catch (error) {
    if (error instanceof CheckoutError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Checkout failed:", error);
    return NextResponse.json({ error: "Checkout is temporarily unavailable. Please try again in a moment." }, { status: 500 });
  }
}
