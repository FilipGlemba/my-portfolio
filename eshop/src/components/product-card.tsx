import Image from "next/image";
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
  /** Above-the-fold cards: load the image eagerly instead of lazily. */
  priority?: boolean;
};

const badgeStyle: Record<string, string> = {
  NEW: "bg-volt text-ink",
  BESTSELLER: "bg-flame-600 text-white",
  LIMITED: "bg-ink text-white",
};

const CARD_SIZES = "(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw";

export function ProductCard({ slug, name, price, category, badge, image, rating = null, reviewCount = 0, priority = false }: ProductCardProps) {
  return (
    <TiltCard maxTilt={6}>
      <article className="group h-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-panel">
        <Link href={`/products/${slug}`} className="relative block aspect-square overflow-hidden bg-[#ECEBE6]">
          {image.startsWith("data:") ? (
            // eslint-disable-next-line @next/next/no-img-element -- generated SVG placeholder; next/image can't optimize data: URIs
            <img src={image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]" />
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              sizes={CARD_SIZES}
              priority={priority}
              className="gear-photo object-cover transition duration-500 group-hover:scale-[1.06]"
            />
          )}
          {badge && badge !== "NONE" ? (
            <span className={`absolute left-0 top-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${badgeStyle[badge] ?? "bg-white text-ink"}`}>
              {badge}
            </span>
          ) : null}
        </Link>
        <div className="space-y-2 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/60">{category}</p>
          <Link href={`/products/${slug}`} className="block">
            <h3 className="font-display text-lg leading-tight tracking-wide text-ink transition-colors group-hover:text-flame-600">{name}</h3>
          </Link>
          <StarRating rating={rating ?? null} reviewCount={reviewCount ?? 0} />
          <p className="text-base font-bold tabular-nums text-ink">{formatPrice(price)}</p>
        </div>
      </article>
    </TiltCard>
  );
}
