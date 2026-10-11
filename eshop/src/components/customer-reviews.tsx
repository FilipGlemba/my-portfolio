import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StarRating } from "@/components/star-rating";
import type { HighlightedReview } from "@/lib/queries";

export function CustomerReviews({ reviews }: { reviews: HighlightedReview[] }) {
  if (!reviews.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal className="mb-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame-700">Reviews</p>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Tested on real training days</h2>
      </Reveal>
      {/* CSS columns = a masonry wall: quotes keep their natural height */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 0.05} className="mb-5 break-inside-avoid">
            <figure className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <StarRating rating={review.rating} reviewCount={1} showCount={false} />
              <blockquote className="mt-3 text-lg leading-snug text-ink">“{review.comment}”</blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-ink">{review.name}</span>
                <Link href={`/products/${review.productSlug}`} className="text-black/60 transition hover:text-ink">
                  {review.productName} →
                </Link>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
