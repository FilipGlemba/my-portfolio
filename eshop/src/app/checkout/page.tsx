import { CheckoutForm } from "@/components/checkout-form";
import { isStripeConfigured } from "@/lib/stripe";

export const metadata = { title: "Checkout" };

// Read the env per request, so adding Stripe keys on Vercel takes effect on
// the next deploy without touching this file.
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return <CheckoutForm demoMode={!isStripeConfigured()} />;
}
