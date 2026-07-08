"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const items = useCartStore((state) => state.items);

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
    alert(data.error || "Unable to start checkout.");
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Add items to your cart to proceed to checkout.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-panel">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Complete your order</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Email</span>
              <input type="email" name="email" required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-semibold">Shipping address</span>
              <input type="text" name="address" required className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none" placeholder="Street address" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <input type="text" name="city" required placeholder="City" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none" />
            <input type="text" name="postalCode" required placeholder="Postal code" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none" />
            <input type="text" name="country" required placeholder="Country" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500 focus:outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-emerald-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Redirecting to Stripe..." : "Continue to Stripe"}
          </button>
        </form>
      </div>
    </section>
  );
}
