import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-12 text-white/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-volt" />
            <span className="font-display text-lg tracking-wide text-white">FITGEAR</span>
          </div>
          <p className="mt-3 max-w-xs text-sm">Gear up. Show up. A full-stack storefront built with Next.js, MongoDB, and Stripe.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 font-semibold text-white">Shop</p>
            <div className="flex flex-col gap-2">
              <Link href="/products" className="transition hover:text-volt">All products</Link>
              <Link href="/collections/Training" className="transition hover:text-volt">Training</Link>
              <Link href="/collections/Running" className="transition hover:text-volt">Running</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Account</p>
            <div className="flex flex-col gap-2">
              <Link href="/login" className="transition hover:text-volt">Sign in</Link>
              <Link href="/register" className="transition hover:text-volt">Create account</Link>
              <Link href="/cart" className="transition hover:text-volt">Cart</Link>
            </div>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">Project</p>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/FilipGlemba" target="_blank" rel="noreferrer" className="transition hover:text-volt">GitHub ↗</a>
              <Link href="/privacy" className="transition hover:text-volt">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs sm:px-6">
        © {new Date().getFullYear()} FitGear. Portfolio project — not a real store.
      </div>
    </footer>
  );
}
