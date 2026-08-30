"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";

// Client-only: WebGL can't render during SSR.
const Hero3D = dynamic(() => import("@/components/hero-3d").then((mod) => mod.Hero3D), { ssr: false });

const headline = ["GEAR UP.", "SHOW UP."];

const stats = [
  { value: 8, suffix: "+", label: "Products" },
  { value: 4, suffix: "", label: "Categories" },
  { value: 30, suffix: "d", label: "Free returns" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/sprinter.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="gear-photo object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Hero3D />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-volt"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          New collection dropped
        </motion.span>

        <h1 className="mt-6 font-display text-[15vw] leading-[0.86] tracking-tight sm:text-[9vw] lg:text-[7.5rem]">
          {headline.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`block ${i === 1 ? "text-volt" : "text-white"}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 max-w-lg text-lg text-white/70"
        >
          Performance gear for training, running, and recovery — built for the days you don&apos;t feel like showing up, and the ones you crush anyway.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.62 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-flame-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-flame-600"
          >
            Shop the drop
          </Link>
          <Link
            href="/collections/Running"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10"
          >
            Browse collections
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl text-white sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
