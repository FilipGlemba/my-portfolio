"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/toast-provider";

const fieldClass = "w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const items = useCartStore((state) => state.items);
  const toast = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      address: formData.get("address"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
      items,
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok && data.url) {
      window.location.href = data.url;
      return;
    }
    setLoading(false);
    toast.notify(data.error || "Unable to start checkout.", "error");
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="rounded-2xl border border-black/5 bg-white p-10 text-center text-black/60">Add items to your cart to proceed to checkout.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="space-y-8 rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10">
        <div>
          <h1 className="font-display text-4xl text-ink">Checkout</h1>
          <p className="mt-2 text-sm text-black/50">
            Uses Stripe Checkout. Without a real <code className="rounded bg-black/5 px-1.5 py-0.5">STRIPE_SECRET_KEY</code> configured, this will return a clear error instead of charging anything.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Email</span>
              <input type="email" name="email" required className={fieldClass} />
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Shipping address</span>
              <input type="text" name="address" required className={fieldClass} placeholder="Street address" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <input type="text" name="city" required placeholder="City" className={fieldClass} />
            <input type="text" name="postalCode" required placeholder="Postal code" className={fieldClass} />
            <input type="text" name="country" required placeholder="Country" className={fieldClass} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-flame-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Redirecting to Stripe..." : "Continue to Stripe"}
          </button>
          <p className="text-center text-xs text-black/50">
            Your shipping details are stored with your order. See the{" "}
            <Link href="/privacy" className="underline decoration-flame-500 decoration-2 underline-offset-2">Privacy Policy</Link> for details.
          </p>
        </form>
      </div>
    </section>
  );
}
