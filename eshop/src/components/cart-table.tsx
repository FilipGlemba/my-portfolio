"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/format";
import { MAX_LINE_QUANTITY } from "@/lib/limits";
import { useCartStore } from "@/store/cart";

export function CartTable() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <ul className="divide-y divide-black/10 rounded-2xl bg-white px-5 ring-1 ring-black/5 sm:px-6">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.li
            key={`${item.slug}-${item.size}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-4 py-5"
          >
            <Link href={`/products/${item.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#ECEBE6]">
              {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail; may be a generated SVG data: URI */}
              <img src={item.image} alt={item.name} className="gear-photo h-full w-full object-cover" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <Link href={`/products/${item.slug}`} className="font-semibold text-ink hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-black/60">
                  {item.size ? `Size ${item.size} · ` : ""}
                  {formatPrice(item.price)} each
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.slug, item.size)}
                  className="mt-2 text-sm font-semibold text-flame-700 hover:text-flame-600"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <div className="flex items-center rounded-full ring-1 ring-black/15" role="group" aria-label={`Quantity of ${item.name}`}>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.slug, item.quantity - 1, item.size)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                    className="h-9 w-9 rounded-l-full text-black/70 transition hover:text-ink disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="w-7 text-center text-sm font-semibold tabular-nums text-ink">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.slug, item.quantity + 1, item.size)}
                    disabled={item.quantity >= MAX_LINE_QUANTITY}
                    aria-label="Increase quantity"
                    className="h-9 w-9 rounded-r-full text-black/70 transition hover:text-ink disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right font-bold tabular-nums text-ink">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
