"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart";

const SuccessBadge3D = dynamic(() => import("@/components/success-badge-3d").then((mod) => mod.SuccessBadge3D), { ssr: false });

export function OrderSuccessView({ demo, orderId }: { demo: boolean; orderId: string | null }) {
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
        <div className="relative mx-auto h-32 w-32">
          <div className="absolute inset-0">
            <SuccessBadge3D />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
            className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-volt text-2xl font-bold text-ink"
          >
            ✓
          </motion.div>
        </div>
        <h1 className="mt-2 font-display text-4xl text-ink">{demo ? "Demo order placed" : "Order complete"}</h1>
        {orderId ? (
          <p className="mt-3 font-mono text-sm text-black/50">Order #{orderId.slice(-8).toUpperCase()}</p>
        ) : null}
        <p className="mx-auto mt-4 max-w-lg text-black/60">
          {demo
            ? "Nothing was charged — this is a demo store. The order is saved in the database for real, so it shows up in your account (if you were signed in) and in the admin dashboard."
            : "Your order is confirmed. Check your email for tracking updates and order details."}
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
