"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/toast-provider";
import { useHydrated } from "@/lib/use-hydrated";

const fieldClass = "w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 focus:border-flame-500 focus:outline-none";

export function CheckoutForm({ demoMode }: { demoMode: boolean }) {
  const [loading, setLoading] = useState(false);
  const items = useCartStore((state) => state.items);
  const toast = useToast();
  const hydrated = useHydrated();

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
      items: items.map(({ slug, quantity, size }) => ({ slug, quantity, size })),
    };

    try {
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
      toast.notify(data.error || "Unable to start checkout.", "error");
    } catch {
      toast.notify("Couldn't reach the server — check your connection and try again.", "error");
    }
    setLoading(false);
  }

  if (!hydrated) {
    return <section aria-hidden className="mx-auto h-96 max-w-3xl animate-pulse rounded-2xl bg-white px-4 py-20 sm:px-6" />;
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-10 text-center">
          <p className="text-black/60">Your cart is empty — add something before checking out.</p>
          <Link href="/products" className="mt-4 inline-block font-semibold text-ink underline decoration-flame-500 decoration-2 underline-offset-2">
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="space-y-8 rounded-2xl border border-black/5 bg-white p-8 shadow-panel sm:p-10">
        <div>
          <h1 className="font-display text-4xl text-ink">Checkout</h1>
          {demoMode ? (
            <p className="mt-3 rounded-xl border border-volt/50 bg-volt/15 px-4 py-3 text-sm text-ink/80">
              <strong className="font-semibold text-ink">Demo store — no payment is taken.</strong> Your order is
              saved for real and shows up in your account and in the admin dashboard.
            </p>
          ) : (
            <p className="mt-2 text-sm text-black/50">You&apos;ll pay on Stripe&apos;s secure checkout page.</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Email</span>
              <input type="email" name="email" required autoComplete="email" className={fieldClass} />
            </label>
            <label className="block text-sm text-black/70">
              <span className="mb-2 block font-semibold">Shipping address</span>
              <input type="text" name="address" required autoComplete="street-address" className={fieldClass} placeholder="Street address" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <input type="text" name="city" required autoComplete="address-level2" placeholder="City" aria-label="City" className={fieldClass} />
            <input type="text" name="postalCode" required autoComplete="postal-code" placeholder="Postal code" aria-label="Postal code" className={fieldClass} />
            <input type="text" name="country" required autoComplete="country-name" placeholder="Country" aria-label="Country" className={fieldClass} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-flame-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600 disabled:cursor-not-allowed disabled:opacity-60">
            {demoMode ? (loading ? "Placing order…" : "Place demo order") : loading ? "Redirecting to Stripe…" : "Continue to Stripe"}
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
