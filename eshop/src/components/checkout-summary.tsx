import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export function CheckoutSummary() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">Order summary</h2>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={`${item.slug}-${item.size}`} className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p>Qty {item.quantity} · {item.size}</p>
            </div>
            <p className="font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          Shipping calculated at checkout.
        </div>
      </div>
    </aside>
  );
}
