import Link from "next/link";
import { CartTable } from "@/components/cart-table";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const subtotal = useCartStore((state) => state.subtotal());

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Shopping cart</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Review your items</h1>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-sm">
          Subtotal: {formatPrice(subtotal)}
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <CartTable />
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Ready to checkout?</p>
          <Link href="/checkout" className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
