"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/toast-provider";
import { OrderSummary } from "@/components/order-summary";
import { useHydrated } from "@/lib/use-hydrated";

const fieldClass =
  "mt-2 w-full rounded-xl bg-white px-4 py-3 text-ink ring-1 ring-black/15 transition placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-flame-500";

function Field({ label, className = "", ...input }: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block text-sm font-semibold text-ink ${className}`}>
      {label}
      <input required {...input} className={fieldClass} />
    </label>
  );
}

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
      name: formData.get("name"),
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
    return <section aria-hidden className="mx-auto my-16 h-96 max-w-6xl animate-pulse rounded-2xl bg-white" />;
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-black/5">
          <p className="font-display text-3xl text-ink">Nothing to check out yet.</p>
          <p className="mt-2 text-black/60">Your cart is empty — add something first.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-flame-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-flame-700">
            Browse the shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href="/cart" className="text-sm font-semibold text-black/60 hover:text-ink">← Back to cart</Link>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Checkout</h1>
      {demoMode ? (
        <p className="mt-4 max-w-2xl rounded-xl bg-volt/25 px-4 py-3 text-sm text-ink ring-1 ring-volt-dark/40">
          <strong className="font-semibold">Demo store — no payment is taken.</strong> Your order is saved for real and shows up
          in your account and in the admin dashboard.
        </p>
      ) : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-5">
            <legend className="mb-1 font-display text-2xl text-ink">Contact</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" minLength={2} maxLength={80} />
              <Field label="Email" name="email" type="email" autoComplete="email" />
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-1 font-display text-2xl text-ink">Shipping address</legend>
            <Field label="Street address" name="address" autoComplete="street-address" minLength={5} />
            <div className="grid gap-5 sm:grid-cols-[1fr_160px]">
              <Field label="City" name="city" autoComplete="address-level2" minLength={2} />
              <Field label="Postal code" name="postalCode" autoComplete="postal-code" minLength={3} />
            </div>
            <Field label="Country" name="country" autoComplete="country-name" defaultValue="Slovakia" minLength={2} />
          </fieldset>
        </form>

        <OrderSummary items={items} showItems>
          <button
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="w-full rounded-full bg-flame-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {demoMode ? (loading ? "Placing order…" : "Place demo order") : loading ? "Redirecting to Stripe…" : "Continue to Stripe"}
          </button>
          <p className="text-center text-xs text-black/60">
            Your details are stored with your order. See the{" "}
            <Link href="/privacy" className="underline decoration-flame-500 decoration-2 underline-offset-2">Privacy Policy</Link>.
          </p>
        </OrderSummary>
      </div>
    </section>
  );
}
