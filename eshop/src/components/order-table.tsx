import Link from "next/link";
import { formatPrice } from "@/lib/format";

export type OrderSummary = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
};

const statusStyle: Record<string, string> = {
  pending: "bg-black/5 text-black/60",
  paid: "bg-volt/25 text-ink",
  shipped: "bg-flame-100 text-flame-600",
  delivered: "bg-volt text-ink",
  cancelled: "bg-black/5 text-black/40",
};

export function OrderTable({ orders }: { orders: OrderSummary[] }) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-10 text-center text-black/50">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <table className="min-w-full divide-y divide-black/5 text-left text-sm">
        <thead className="bg-black/[0.02] text-black/50">
          <tr>
            <th className="px-6 py-4 font-semibold">Order</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Created</th>
            <th className="px-6 py-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {orders.map((order) => (
            <tr key={order.id} className="transition hover:bg-black/[0.015]">
              <td className="px-6 py-4 font-medium text-ink">#{order.id.slice(-6)}</td>
              <td className="px-6 py-4 font-semibold text-ink">{formatPrice(order.total)}</td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusStyle[order.status] ?? "bg-black/5 text-black/60"}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-black/60">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <Link href={`/admin/orders/${order.id}`} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-black">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
