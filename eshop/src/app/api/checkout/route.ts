import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { parseJson } from "@/lib/validation";
import { checkoutSchema } from "@/lib/schemas";
import { createCheckoutSession, type CheckoutLineItem } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await parseJson(request, checkoutSchema);
  await connect();

  const session = await getServerSession(authOptions);
  const userEmail = body.email;

  const items: CheckoutLineItem[] = await Promise.all(
    body.items.map(async (item) => {
      const product = await Product.findOne({ slug: item.slug }).lean();
      if (!product) throw new Error("Product not found");
      return {
        productId: product._id.toString(),
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        images: product.images || [],
      };
    }),
  );

  const checkoutSession = await createCheckoutSession(
    items,
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/order-success`,
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/cart`,
    userEmail,
  );

  const orderUser = session?.user?.email
    ? await import("@/models/User").then((module) => module.default.findOne({ email: session.user.email }))
    : null;

  await Order.create({
    user: orderUser?._id ?? null,
    items: items.map((item) => ({
      product: item.productId,
      slug: item.slug,
      name: item.name,
      image: item.images?.[0] ?? "",
      qty: item.quantity,
      price: item.price,
    })),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: "pending",
    stripeSessionId: checkoutSession.id,
    shippingAddress: {
      name: session?.user?.name ?? body.email,
      email: body.email,
      address: body.address,
      city: body.city,
      postalCode: body.postalCode,
      country: body.country,
    },
    createdAt: new Date(),
  });

  return NextResponse.json({ url: checkoutSession.url });
}
