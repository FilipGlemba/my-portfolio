export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-100 p-6"></div>
      ))}
    </div>
  );
}
