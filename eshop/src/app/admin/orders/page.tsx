import { OrderTable } from "@/components/order-table";

async function fetchOrders() {
  const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/orders`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load orders.");
  return response.json();
}

export default async function AdminOrdersPage() {
  const data = await fetchOrders();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Orders</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Order management</h1>
      </div>
      <OrderTable orders={data.orders.map((order: any) => ({ id: order._id, total: order.total, status: order.status, createdAt: order.createdAt }))} />
    </section>
  );
}
