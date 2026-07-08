import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
            New collection
          </span>
          <div className="space-y-6">
            <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              FitGear for every workout, every day.
            </h1>
            <p className="max-w-xl text-lg text-slate-200 sm:text-xl">
              A modern editorial storefront for premium training essentials, powered by Stripe checkout, Cloudinary product media, and admin controls.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Browse products
            </Link>
            <Link href="/collections/Training" className="inline-flex items-center justify-center rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300">
              Shop collections
            </Link>
          </div>
        </div>
        <div className="relative rounded-3xl bg-slate-900/90 p-8 shadow-panel ring-1 ring-white/10 sm:p-12">
          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-slate-800/70 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Featured gear</p>
              <h2 className="mt-4 text-3xl font-semibold">Velocity Pro Trainer</h2>
              <p className="mt-3 text-slate-300">Lightweight training shoes engineered for speed, stability, and long-distance comfort.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Performance</p>
                <p className="mt-3 text-xl font-semibold text-white">Breathable</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Fabric</p>
                <p className="mt-3 text-xl font-semibold text-white">Recycled stretch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
