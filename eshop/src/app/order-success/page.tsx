import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function OrderSuccessPage() {
  const { clear } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-panel">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Order complete</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Thanks for your purchase!</h1>
        <p className="mt-4 text-slate-600">
          Your order is confirmed. Check your email for tracking updates and order details.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button onClick={() => router.push("/")} className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
            Continue shopping
          </button>
          <button onClick={() => router.push("/account")} className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            View orders
          </button>
        </div>
      </div>
    </section>
  );
}
