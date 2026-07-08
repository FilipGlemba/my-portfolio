import Link from "next/link";

const categories = [
  { label: "Training", slug: "Training" },
  { label: "Running", slug: "Running" },
  { label: "Recovery", slug: "Recovery" },
  { label: "Accessories", slug: "Accessories" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex items-baseline justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Collections</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Shop by category</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/collections/${category.slug}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-panel"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
              {category.label}
            </div>
            <p className="mt-6 text-lg font-semibold text-slate-950">Premium gear for {category.label.toLowerCase()}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
