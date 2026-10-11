"use client";

import Link from "next/link";
import { CartTable } from "@/components/cart-table";
import { OrderSummary } from "@/components/order-summary";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const hydrated = useHydrated();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Your cart</h1>
        {hydrated && count ? <p className="text-sm tabular-nums text-black/60">{count} {count === 1 ? "item" : "items"}</p> : null}
      </div>

      {!hydrated ? (
        // Cart lives in localStorage — render a placeholder until the browser has it
        <div aria-hidden className="h-64 animate-pulse rounded-2xl bg-white ring-1 ring-black/5" />
      ) : !items.length ? (
        <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-black/5">
          <p className="font-display text-3xl text-ink">Your cart is empty.</p>
          <p className="mt-2 text-black/60">Go find something worth training for.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-flame-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-flame-700">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <CartTable />
          <OrderSummary items={items}>
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center rounded-full bg-flame-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-700 active:scale-[0.98]"
            >
              Checkout
            </Link>
            <Link href="/products" className="block text-center text-sm font-semibold text-ink underline decoration-flame-500 decoration-2 underline-offset-4">
              Continue shopping
            </Link>
          </OrderSummary>
        </div>
      )}
    </section>
  );
}
