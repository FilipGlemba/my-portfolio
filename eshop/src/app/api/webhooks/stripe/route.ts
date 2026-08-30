import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import connect from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { sendOrderConfirmation } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  const body = await request.arrayBuffer();
  const payload = Buffer.from(body);

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: "Webhook signature mismatch" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const address = session.customer_details?.address;
    if (!email || !address) {
      return NextResponse.json({ received: true });
    }

    await connect();
    const existingOrder = await Order.findOne({ stripeSessionId: session.id });
    if (existingOrder) {
      if (existingOrder.status !== "paid") {
        existingOrder.status = "paid";
        await existingOrder.save();
        await sendOrderConfirmation(email, existingOrder._id.toString(), existingOrder.total).catch((error) =>
          console.error("Failed to send order confirmation email:", error),
        );
      }
      return NextResponse.json({ received: true });
    }

    const metadataItems = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
    const lineItems = await stripe().checkout.sessions.listLineItems(session.id as string);

    const items = Array.isArray(metadataItems)
      ? await Promise.all(
          metadataItems.map(async (metaItem: { slug: string; quantity: number }, index: number) => {
            const product = await Product.findOne({ slug: metaItem.slug }).lean();
            const lineItem = lineItems.data[index];
            return {
              product: product?._id ?? null,
              slug: metaItem.slug,
              name: product?.name ?? lineItem.description ?? metaItem.slug,
              image: product?.images?.[0] ?? "",
              qty: metaItem.quantity,
              price: lineItem?.price?.unit_amount ? lineItem.price.unit_amount / 100 : 0,
            };
          }),
        )
      : lineItems.data.map((item) => ({
          product: null,
          slug: item.description ?? "unknown",
          name: item.description ?? "Unknown product",
          image: "",
          qty: item.quantity ?? 1,
          price: (item.price?.unit_amount ?? 0) / 100,
        }));

    const user = await User.findOne({ email });
    const order = await Order.create({
      user: user?._id ?? null,
      items,
      total: session.amount_total ? session.amount_total / 100 : 0,
      status: "paid",
      stripeSessionId: session.id,
      shippingAddress: {
        name: session.customer_details?.name ?? "",
        email,
        address: `${address.line1 ?? ""} ${address.line2 ?? ""}`.trim(),
        city: address.city ?? "",
        postalCode: address.postal_code ?? "",
        country: address.country ?? "",
      },
      createdAt: new Date(),
    });

    await sendOrderConfirmation(email, order._id.toString(), order.total).catch((error) =>
      console.error("Failed to send order confirmation email:", error),
    );
  }

  return NextResponse.json({ received: true });
}
