"use client";

import { useMemo } from "react";

type Props = {
  value: string;
  category: string;
  sort: string;
  onFilterChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

const categories = ["All", "Training", "Running", "Recovery", "Accessories"];
const sorts = [
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price_asc" },
  { label: "Price: high to low", value: "price_desc" },
];

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink shadow-sm transition focus:border-flame-500 focus:outline-none focus:ring-2 focus:ring-flame-500/20";

export function ProductFilter({ value, category, sort, onFilterChange, onCategoryChange, onSortChange }: Props) {
  const activeCategory = useMemo(() => category || "All", [category]);

  return (
    <div className="grid gap-4 rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur lg:grid-cols-[1.4fr_1fr_1fr]">
      <label className="block text-sm text-black/70">
        <span className="mb-2 block font-semibold text-ink">Search</span>
        <input
          value={value}
          onChange={(event) => onFilterChange(event.target.value)}
          placeholder="Search products"
          className={fieldClass}
        />
      </label>
      <label className="block text-sm text-black/70">
        <span className="mb-2 block font-semibold text-ink">Category</span>
        <select value={activeCategory} onChange={(event) => onCategoryChange(event.target.value)} className={fieldClass}>
          {categories.map((item) => (
            <option key={item} value={item === "All" ? "" : item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-black/70">
        <span className="mb-2 block font-semibold text-ink">Sort</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)} className={fieldClass}>
          {sorts.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
