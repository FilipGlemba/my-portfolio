"use client";

import { CATEGORIES } from "@/lib/categories";
import { MAX_SEARCH_LENGTH } from "@/lib/text";

type Props = {
  query: string;
  category: string;
  sort: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

const sorts = [
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price_asc" },
  { label: "Price: high to low", value: "price_desc" },
];

const tabClass = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500 ${
    active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-black/10 hover:ring-black/30"
  }`;

export function ProductFilter({ query, category, sort, onQueryChange, onCategoryChange, onSortChange }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!category} onClick={() => onCategoryChange("")} className={tabClass(!category)}>
          All
        </button>
        {CATEGORIES.map((item) => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => onCategoryChange(item)} className={tabClass(category === item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block sm:w-64">
          <span className="sr-only">Search products</span>
          <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            maxLength={MAX_SEARCH_LENGTH}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-sm text-ink ring-1 ring-black/10 transition placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-flame-500"
          />
        </label>
        <label className="block">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="w-full rounded-full bg-white px-4 py-2.5 text-sm text-ink ring-1 ring-black/10 transition focus:outline-none focus:ring-2 focus:ring-flame-500 sm:w-auto"
          >
            {sorts.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
