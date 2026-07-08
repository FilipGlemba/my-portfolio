import Link from "next/link";

export type OrderSummary = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
};

export function OrderTable({ orders }: { orders: OrderSummary[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-6 py-4">Order</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 text-slate-900">#{order.id}</td>
              <td className="px-6 py-4 text-slate-900">€{order.total.toFixed(0)}</td>
              <td className="px-6 py-4 text-slate-600">{order.status}</td>
              <td className="px-6 py-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <Link href={`/admin/orders/${order.id}`} className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
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
