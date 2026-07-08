import Link from "next/link";
import { formatPrice } from "@/lib/format";

export type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  category: string;
  badge: string;
  image: string;
};

export function ProductCard({ slug, name, price, category, badge, image }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-panel">
      <Link href={`/products/${slug}`} className="block h-72 overflow-hidden bg-slate-100">
        <img src={image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </Link>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
          <span>{category}</span>
          <span className="rounded-full border border-slate-200 px-3 py-1 uppercase tracking-[0.18em] text-slate-600">{badge}</span>
        </div>
        <Link href={`/products/${slug}`} className="block">
          <h3 className="text-lg font-semibold text-slate-950">{name}</h3>
        </Link>
        <p className="text-base font-semibold text-slate-900">{formatPrice(price)}</p>
      </div>
    </article>
  );
}
