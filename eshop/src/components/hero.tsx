import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/count-up";
import { TiltCard } from "@/components/tilt-card";
import { formatPrice } from "@/lib/format";
import type { CatalogProduct } from "@/lib/queries";

type HeroProps = {
  /** Live counts from the catalog; omitted when the DB isn't reachable (e.g. at build time). */
  productCount?: number;
  categoryCount?: number;
  /** The product shown big on the right — a real item, not decoration. */
  spotlight?: CatalogProduct | null;
};

function buildStats({ productCount, categoryCount }: HeroProps) {
  return [
    ...(productCount ? [{ value: productCount, suffix: "", label: "Products" }] : []),
    ...(categoryCount ? [{ value: categoryCount, suffix: "", label: "Categories" }] : []),
    { value: 30, suffix: "d", label: "Free returns" },
  ];
}

const headline = ["Gear up.", "Show up."];

export function Hero(props: HeroProps) {
  const stats = buildStats(props);
  const { spotlight } = props;

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* Ambient light + grain instead of a flat black slab */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-volt/10 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-flame-600/10 blur-[110px]" />
        <div className="absolute inset-0 bg-grain [background-size:22px_22px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:min-h-[80vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="flex animate-fade-up items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-volt">
            <span className="h-px w-8 bg-volt" />
            Training · Running · Recovery
          </p>

          <h1 className="mt-6 font-display text-[17vw] uppercase leading-[0.86] tracking-tight sm:text-[7.5rem] lg:text-[8.25rem]">
            {/* Not animated on purpose: the headline is the page's LCP element,
                and an entry animation on it delays LCP by seconds on mobile. */}
            {headline.map((line, i) => (
              <span key={line} className={`block pb-1 ${i === 1 ? "text-volt" : "text-white"}`}>
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-md animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:350ms] [text-wrap:pretty]">
            Training, running and recovery gear for the days you don&apos;t feel like showing up — and the ones you crush anyway.
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:450ms]">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-flame-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-700 active:scale-[0.98]"
            >
              Shop the collection
            </Link>
            <Link href="/collections/Running" className="group text-sm font-bold uppercase tracking-wide text-white">
              Running gear <span className="inline-block transition group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <dl className="mt-14 grid max-w-md animate-fade-up grid-cols-3 gap-6 border-t border-white/10 pt-7 [animation-delay:550ms]">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">{stat.label}</dt>
                <dd className="font-display text-3xl tabular-nums text-white sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {spotlight ? (
          <Link href={`/products/${spotlight.slug}`} className="group relative block animate-fade-up [animation-delay:250ms]">
            {/* Offset block behind the card — layering instead of a flat edge */}
            <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-[28px] border border-volt/40" />
            <TiltCard maxTilt={7}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ink-soft ring-1 ring-white/10 sm:aspect-[4/5]">
                <Image
                  src={spotlight.images[0]}
                  alt={spotlight.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="gear-photo object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                {spotlight.badge !== "NONE" ? (
                  <span className="absolute left-0 top-6 bg-flame-600 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                    {spotlight.badge}
                  </span>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-volt">{spotlight.category}</p>
                    <p className="mt-2 font-display text-3xl leading-none sm:text-4xl">{spotlight.name}</p>
                    <p className="mt-3 text-lg font-semibold tabular-nums text-white/90">{formatPrice(spotlight.price)}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-ink transition group-hover:bg-volt">
                    →
                  </span>
                </div>
              </div>
            </TiltCard>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
