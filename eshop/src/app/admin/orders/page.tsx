import { redirect } from "next/navigation";
import { OrderTable } from "@/components/order-table";
import { AdminNav } from "@/components/admin-nav";
import { getAdminSession } from "@/lib/require-admin";
import { getOrdersForUser } from "@/lib/queries";

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  const orders = await getOrdersForUser(session.user.email!, true);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Orders</h1>
      </div>
      <AdminNav />
      <OrderTable
        orders={orders.map((order) => ({
          id: order._id.toString(),
          total: order.total,
          status: order.status,
          createdAt: order.createdAt.toString(),
        }))}
      />
    </section>
  );
}
