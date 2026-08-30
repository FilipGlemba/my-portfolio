const STAR_PATH = "M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 14.9l-5.2 2.9 1-5.9L1.5 7.7l5.9-.8L10 1.5z";

function Star({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d={STAR_PATH} />
    </svg>
  );
}

type StarRatingProps = {
  rating: number | null;
  reviewCount: number;
  size?: "sm" | "md";
  showCount?: boolean;
};

export function StarRating({ rating, reviewCount, size = "sm", showCount = true }: StarRatingProps) {
  if (!rating || !reviewCount) return null;

  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const starSize = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative" aria-hidden="true">
        <div className="flex gap-0.5 text-black/15">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={starSize} />)}
        </div>
        <div className="absolute inset-0 flex gap-0.5 overflow-hidden text-volt-dark" style={{ width: `${pct}%` }}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${starSize} shrink-0`} />)}
        </div>
      </div>
      <span className="text-xs font-semibold text-black/60">{rating.toFixed(1)}</span>
      {showCount ? <span className="text-xs text-black/40">({reviewCount})</span> : null}
    </div>
  );
}
