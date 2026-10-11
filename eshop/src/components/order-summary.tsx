"use client";

import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, orderTotal, remainingForFreeShipping, shippingFor } from "@/lib/shipping";
import type { CartItem } from "@/store/cart";

type Props = {
  items: CartItem[];
  /** List each line (checkout) or just the totals (cart, which shows lines itself). */
  showItems?: boolean;
  children?: React.ReactNode;
};

export function OrderSummary({ items, showItems = false, children }: Props) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingFor(subtotal);
  const remaining = remainingForFreeShipping(subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <aside className="h-fit rounded-2xl bg-white p-6 ring-1 ring-black/5 lg:sticky lg:top-24">
      <h2 className="font-display text-2xl text-ink">Order summary</h2>

      {showItems ? (
        <ul className="mt-5 space-y-4 border-b border-black/10 pb-5">
          {items.map((item) => (
            <li key={`${item.slug}-${item.size}`} className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#ECEBE6]">
                {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail; may be a generated SVG data: URI */}
                <img src={item.image} alt="" className="h-full w-full object-cover" />
                <span className="absolute -right-0 -top-0 rounded-bl-md bg-ink px-1.5 text-[11px] font-bold text-white">{item.quantity}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{item.name}</span>
                {item.size ? <span className="text-xs text-black/60">Size {item.size}</span> : null}
              </span>
              <span className="text-sm font-semibold tabular-nums text-ink">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-black/65">Subtotal</dt>
          <dd className="tabular-nums text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-black/65">Shipping</dt>
          <dd className="tabular-nums text-ink">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-black/10 pt-3 text-base font-bold">
          <dt className="text-ink">Total</dt>
          <dd className="tabular-nums text-ink">{formatPrice(orderTotal(subtotal))}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-black/10" aria-hidden>
          <div className="h-full rounded-full bg-volt-dark transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-black/65">
          {remaining > 0 ? (
            <>Add <strong className="text-ink">{formatPrice(remaining)}</strong> more for free shipping.</>
          ) : (
            <>You&apos;ve unlocked free shipping.</>
          )}
        </p>
      </div>

      {children ? <div className="mt-6 space-y-3">{children}</div> : null}
    </aside>
  );
}
