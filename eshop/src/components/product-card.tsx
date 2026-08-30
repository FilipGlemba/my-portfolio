import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { TiltCard } from "@/components/tilt-card";
import { StarRating } from "@/components/star-rating";

export type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  category: string;
  badge: string;
  image: string;
  rating?: number | null;
  reviewCount?: number;
};

const badgeStyle: Record<string, string> = {
  NEW: "bg-volt text-ink",
  BESTSELLER: "bg-flame-500 text-white",
  LIMITED: "bg-ink text-white",
};

export function ProductCard({ slug, name, price, category, badge, image, rating = null, reviewCount = 0 }: ProductCardProps) {
  return (
    <TiltCard maxTilt={7}>
      <article className="group h-full overflow-hidden rounded-2xl border border-black/5 bg-white transition-shadow duration-300 hover:shadow-panel">
        <Link href={`/products/${slug}`} className="relative block aspect-square overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element -- image can be a real /images/... file or a generated SVG data: URI; next/image can't optimize data URIs */}
          <img
            src={image}
            alt={name}
            className="gear-photo h-full w-full object-cover transition duration-500 group-hover:scale-[1.08]"
            loading="lazy"
            style={{ transform: "translateZ(20px)" }}
          />
          {badge && badge !== "NONE" ? (
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${badgeStyle[badge] ?? "bg-white text-ink"}`}>
              {badge}
            </span>
          ) : null}
        </Link>
        <div className="space-y-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">{category}</p>
          <Link href={`/products/${slug}`} className="block">
            <h3 className="font-display text-lg leading-tight tracking-wide text-ink">{name}</h3>
          </Link>
          <StarRating rating={rating ?? null} reviewCount={reviewCount ?? 0} />
          <p className="text-base font-bold text-ink">{formatPrice(price)}</p>
        </div>
      </article>
    </TiltCard>
  );
}
