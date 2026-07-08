import { AdminStats } from "@/components/admin-stats";

async function fetchStats() {
  const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/admin/stats`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load admin stats.");
  return response.json();
}

export default async function AdminPage() {
  const data = await fetchStats();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Admin dashboard</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">Store performance</h1>
      </div>
      <AdminStats revenue={data.revenue} ordersToday={data.ordersToday} topProducts={data.topProducts} />
    </section>
  );
}
