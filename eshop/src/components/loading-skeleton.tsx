export function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-black/5 bg-white">
          <div className="aspect-square bg-black/[0.06]" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 rounded bg-black/[0.08]" />
            <div className="h-4 w-2/3 rounded bg-black/[0.08]" />
            <div className="h-4 w-1/4 rounded bg-black/[0.08]" />
          </div>
        </div>
      ))}
    </div>
  );
}
