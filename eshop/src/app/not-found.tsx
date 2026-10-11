import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-4 py-20 sm:px-6">
      <p className="font-display text-7xl text-flame-500">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink">This page sat out the workout.</h1>
      <p className="mt-3 max-w-md text-black/60">
        The link might be old, or the product was removed from the catalog. Here&apos;s where to go instead:
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/products" className="rounded-full bg-flame-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-flame-700">
          Browse the shop
        </Link>
        <Link href="/" className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink ring-1 ring-black/15 transition hover:ring-black/40">
          Home
        </Link>
      </div>
    </section>
  );
}
