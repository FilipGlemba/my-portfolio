"use client";

import Link from "next/link";
import { CartTable } from "@/components/cart-table";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const subtotal = useCartStore((state) => state.subtotal());
  const hasItems = useCartStore((state) => state.items.length > 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Your cart</h1>
          <p className="mt-2 text-black/50">Review your gear before checkout.</p>
        </div>
        <div className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm">
          Subtotal: {formatPrice(subtotal)}
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <CartTable />
        <div className="h-fit space-y-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-sm text-black/60">Ready to checkout?</p>
          {hasItems ? (
            <Link href="/checkout" className="inline-flex w-full items-center justify-center rounded-full bg-flame-500 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600">
              Proceed to checkout
            </Link>
          ) : (
            <Link href="/products" className="inline-flex w-full items-center justify-center rounded-full border border-black/10 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/[0.03]">
              Browse products
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
