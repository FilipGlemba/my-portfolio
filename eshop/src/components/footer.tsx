export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} FitGear. Built for modern shopping experiences.</p>
        <p>Designed to be clean, accessible, and fast.</p>
      </div>
    </footer>
  );
}
