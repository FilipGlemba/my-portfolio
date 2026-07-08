type AdminStatsProps = {
  revenue: number;
  ordersToday: number;
  topProducts: Array<{ name: string; units: number }>;
};

export function AdminStats({ revenue, ordersToday, topProducts }: AdminStatsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Revenue</p>
        <p className="mt-4 text-3xl font-semibold text-slate-950">€{revenue.toFixed(0)}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Orders today</p>
        <p className="mt-4 text-3xl font-semibold text-slate-950">{ordersToday}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Top products</p>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {topProducts.map((product) => (
            <li key={product.name} className="flex items-center justify-between">
              <span>{product.name}</span>
              <strong>{product.units} sold</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
