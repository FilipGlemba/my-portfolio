"use client";

import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export function CartTable() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.subtotal());

  if (!items.length) {
    return <p className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="grid gap-6">
          {items.map((item) => (
            <div key={`${item.slug}-${item.size}`} className="grid gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr] sm:items-center">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-3xl object-cover" />
                <div>
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">Size: {item.size}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="rounded-full border border-slate-300 px-3 py-2 text-slate-700">-</button>
                <span className="min-w-[2rem] text-center text-slate-900">{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="rounded-full border border-slate-300 px-3 py-2 text-slate-700">+</button>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                <button type="button" onClick={() => removeItem(item.slug)} className="text-sm font-semibold text-rose-600 hover:text-rose-700">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-right">
        <p className="text-sm text-slate-500">Subtotal</p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">{formatPrice(subtotal)}</p>
      </div>
    </div>
  );
}
