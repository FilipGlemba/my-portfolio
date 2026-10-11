import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { RevenueChart } from "@/components/revenue-chart";
import { formatDate, formatPrice } from "@/lib/format";

type AdminStatsProps = {
  revenue30: number;
  orders30: number;
  averageOrder: number;
  ordersToday: number;
  daily: Array<{ date: string; revenue: number; orders: number }>;
  topProducts: Array<{ name: string; units: number }>;
  recentOrders: Array<{ id: string; name: string; total: number; status: string; createdAt: string }>;
};

const labelClass = "text-xs font-bold uppercase tracking-[0.2em] text-black/60";

const statusClass: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-800",
  delivered: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-900",
  shipped: "bg-sky-100 text-sky-900",
  cancelled: "bg-black/5 text-black/70",
};

export function AdminStats({ revenue30, orders30, averageOrder, ordersToday, daily, topProducts, recentOrders }: AdminStatsProps) {
  const tiles = [
    { label: "Revenue · 30 days", value: <>€<CountUp value={revenue30} decimals={2} /></> },
    { label: "Orders · 30 days", value: <CountUp value={orders30} /> },
    { label: "Average order", value: <>€<CountUp value={averageOrder} decimals={2} /></> },
    { label: "Orders today", value: <CountUp value={ordersToday} /> },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Reveal key={tile.label} delay={i * 0.05} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <dt className={labelClass}>{tile.label}</dt>
            <dd className="mt-3 font-display text-3xl tabular-nums text-ink sm:text-4xl">{tile.value}</dd>
          </Reveal>
        ))}
      </dl>

      <Reveal className="rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-6">
        <h2 className="font-display text-2xl text-ink">Revenue per day</h2>
        <p className="mt-1 text-sm text-black/60">Last 30 days, cancelled orders excluded.</p>
        <div className="mt-6">
          <RevenueChart daily={daily} />
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-6">
          <h2 className="font-display text-2xl text-ink">Recent orders</h2>
          {recentOrders.length ? (
            <ul className="mt-4 divide-y divide-black/5">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{order.name || "Guest"}</p>
                    <p className="text-black/60">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${statusClass[order.status] ?? statusClass.pending}`}>
                      {order.status}
                    </span>
                    <span className="w-20 text-right font-semibold tabular-nums text-ink">{formatPrice(order.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-black/60">No orders yet. Place a demo order to see it here.</p>
          )}
        </Reveal>

        <Reveal delay={0.08} className="rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-6">
          <h2 className="font-display text-2xl text-ink">Top products</h2>
          {topProducts.length ? (
            <ol className="mt-4 space-y-3 text-sm">
              {topProducts.map((product, i) => (
                <li key={product.name} className="flex items-center gap-3">
                  <span className="w-5 shrink-0 font-display text-lg text-black/60">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-ink">{product.name}</span>
                  <strong className="shrink-0 tabular-nums text-ink">{product.units} sold</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-sm text-black/60">No sales yet.</p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
