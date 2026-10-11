"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/account", label: "Account" },
  { href: "/admin", label: "Admin" },
];

export function SiteNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-ink-line bg-ink/95 backdrop-blur-md" : "border-transparent bg-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-volt transition group-hover:scale-125" />
          <span className="font-display text-xl tracking-wide text-white">FITGEAR</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 text-sm font-medium text-white/70 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 transition hover:text-white ${active ? "text-white" : ""}`}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-volt"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
        <Link
          href="/cart"
          className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-volt/60 hover:bg-white/10"
        >
          Cart
          {mounted && itemCount > 0 ? (
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-volt px-1 text-xs font-bold text-ink">
              {itemCount}
            </span>
          ) : null}
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/5 md:hidden"
        >
          <span className={`h-[2px] w-4 bg-white transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-4 bg-white transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-4 bg-white transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-white/10 bg-ink md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block border-b border-white/5 py-3.5 text-base font-medium last:border-0 ${
                    pathname === item.href ? "text-volt" : "text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
