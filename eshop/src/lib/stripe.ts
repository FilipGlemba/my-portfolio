import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Without a key the store runs in demo mode: checkout records the order as
// paid without charging anything. Adding STRIPE_SECRET_KEY (test keys are fine)
// switches it to real Stripe Checkout — no code change needed.
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required to use Stripe checkout.");
    }
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

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
  shippingCost = 0,
) => {
  const session = await stripe().checkout.sessions.create({
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
          images: item.images.filter((image) => image.startsWith("http")),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })).concat(
      shippingCost > 0
        ? [{ price_data: { currency: "eur", product_data: { name: "Shipping", images: [] }, unit_amount: Math.round(shippingCost * 100) }, quantity: 1 }]
        : [],
    ),
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      items: JSON.stringify(lineItems.map((item) => ({ productId: item.productId, slug: item.slug, quantity: item.quantity }))),
    },
  });
  return session;
};
