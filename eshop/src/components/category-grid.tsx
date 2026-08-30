import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { CATEGORY_IMAGES } from "@/lib/seed-data";

const categories = [
  { label: "Training", slug: "Training", blurb: "Strength & conditioning" },
  { label: "Running", slug: "Running", blurb: "Road & trail" },
  { label: "Recovery", slug: "Recovery", blurb: "Move better, longer" },
  { label: "Accessories", slug: "Accessories", blurb: "The finishing gear" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal className="mb-10 flex items-baseline justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-500">Collections</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Shop by category</h2>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => (
          <Reveal key={category.slug} delay={i * 0.08}>
            <TiltCard maxTilt={8}>
              <Link
                href={`/collections/${category.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={CATEGORY_IMAGES[category.slug]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="gear-photo object-cover opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5" style={{ transform: "translateZ(30px)" }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-volt">{category.blurb}</p>
                  <p className="mt-1 font-display text-2xl text-white">{category.label}</p>
                </div>
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">
                  →
                </span>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
