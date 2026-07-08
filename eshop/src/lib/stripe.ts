import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error("STRIPE_SECRET_KEY is required.");
}

export const stripe = new Stripe(stripeSecret, {
  apiVersion: "2024-08-13",
});

export type CheckoutLineItem = {
  productId: string;
  price: number;
  quantity: number;
  name: string;
  images: string[];
  slug: string;
};

export const createCheckoutSession = async (
  lineItems: CheckoutLineItem[],
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "DE", "FR", "NL", "IT", "ES"],
    },
    line_items: lineItems.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.images,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      items: JSON.stringify(lineItems.map((item) => ({ productId: item.productId, slug: item.slug, quantity: item.quantity, size: 1 }))),
    },
  });
  return session;
};
