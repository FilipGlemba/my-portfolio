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

export function ProductFilter({ value, category, sort, onFilterChange, onCategoryChange, onSortChange }: Props) {
  const activeCategory = useMemo(() => category || "All", [category]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-semibold text-slate-900">Search</span>
        <input
          value={value}
          onChange={(event) => onFilterChange(event.target.value)}
          placeholder="Search products"
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-semibold text-slate-900">Category</span>
        <select
          value={activeCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item === "All" ? "" : item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-semibold text-slate-900">Sort</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none"
        >
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
