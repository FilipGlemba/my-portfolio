import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

type AdminStatsProps = {
  revenue: number;
  ordersToday: number;
  topProducts: Array<{ name: string; units: number }>;
};

export function AdminStats({ revenue, ordersToday, topProducts }: AdminStatsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Reveal className="rounded-2xl border border-black/5 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/40">Revenue</p>
        <p className="mt-4 font-display text-4xl text-ink">
          €<CountUp value={revenue} decimals={0} />
        </p>
      </Reveal>
      <Reveal delay={0.08} className="rounded-2xl border border-black/5 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/40">Orders today</p>
        <p className="mt-4 font-display text-4xl text-ink">
          <CountUp value={ordersToday} />
        </p>
      </Reveal>
      <Reveal delay={0.16} className="rounded-2xl border border-black/5 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/40">Top products</p>
        <ul className="mt-4 space-y-3 text-sm text-black/70">
          {topProducts.length ? (
            topProducts.map((product) => (
              <li key={product.name} className="flex items-center justify-between gap-4">
                <span className="truncate">{product.name}</span>
                <strong className="shrink-0 text-ink">{product.units} sold</strong>
              </li>
            ))
          ) : (
            <li className="text-black/40">No sales yet.</li>
          )}
        </ul>
      </Reveal>
    </div>
  );
}
