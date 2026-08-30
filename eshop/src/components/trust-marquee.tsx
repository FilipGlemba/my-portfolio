const items = [
  "Free tracked shipping",
  "Secure Stripe checkout",
  "30-day returns",
  "Real order history",
];

export function TrustMarquee() {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-4">
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 font-display text-sm tracking-wide text-white/60">
            {item}
            <span aria-hidden className="text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
