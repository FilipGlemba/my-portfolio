import { redirect } from "next/navigation";
import { AdminStats } from "@/components/admin-stats";
import { AdminNav } from "@/components/admin-nav";
import { getAdminSession } from "@/lib/require-admin";
import { getAdminStats } from "@/lib/queries";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  const data = await getAdminStats();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Dashboard</h1>
        <p className="mt-2 text-black/50">Store performance at a glance.</p>
      </div>
      <AdminNav />
      <AdminStats revenue={data.revenue} ordersToday={data.ordersToday} topProducts={data.topProducts} />
    </section>
  );
}
