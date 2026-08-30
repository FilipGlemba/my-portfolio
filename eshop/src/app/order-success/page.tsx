"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart";

export default function OrderSuccessPage() {
  const { clear } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-black/5 bg-white p-12 text-center shadow-panel"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt text-2xl font-bold text-ink"
        >
          ✓
        </motion.div>
        <h1 className="mt-6 font-display text-4xl text-ink">Order complete</h1>
        <p className="mt-4 text-black/60">
          Your order is confirmed. Check your email for tracking updates and order details.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button onClick={() => router.push("/")} className="rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600">
            Continue shopping
          </button>
          <button onClick={() => router.push("/account")} className="rounded-full border border-black/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-black/[0.03]">
            View orders
          </button>
        </div>
      </motion.div>
    </section>
  );
}
