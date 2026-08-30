"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export function CartTable() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.subtotal());

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-12 text-center">
        <p className="font-display text-2xl text-ink">Your cart is empty.</p>
        <p className="mt-2 text-sm text-black/50">Go find something worth training for.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-6">
        <AnimatePresence initial={false}>
          <div className="grid gap-4">
            {items.map((item) => (
              <motion.div
                key={`${item.slug}-${item.size}`}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 rounded-xl border border-black/5 bg-black/[0.015] p-4 sm:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] sm:items-center"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- image can be a real /images/... file or a generated SVG data: URI */}
                  <img src={item.image} alt={item.name} className="gear-photo h-20 w-20 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-ink">{item.name}</p>
                    <p className="text-sm text-black/50">Size: {item.size}</p>
                  </div>
                </div>
                <p className="text-sm text-black/60">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="h-8 w-8 rounded-full border border-black/10 text-black/70 transition hover:border-flame-500 hover:text-flame-500">−</button>
                  <span className="min-w-[2rem] text-center font-semibold text-ink">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="h-8 w-8 rounded-full border border-black/10 text-black/70 transition hover:border-flame-500 hover:text-flame-500">+</button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-ink">{formatPrice(item.price * item.quantity)}</p>
                  <button type="button" onClick={() => removeItem(item.slug)} className="text-sm font-semibold text-flame-500 hover:text-flame-600">Remove</button>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
      <div className="rounded-2xl border border-black/5 bg-white p-6 text-right">
        <p className="text-sm text-black/50">Subtotal</p>
        <p className="mt-2 font-display text-3xl text-ink">{formatPrice(subtotal)}</p>
      </div>
    </div>
  );
}
