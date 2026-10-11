"use client";

import { useEffect, useState } from "react";

// The cart lives in localStorage, which the server can't see. Anything that
// renders cart contents must wait until this is true, or the server HTML
// (empty cart) won't match the first client render (full cart) and React
// throws a hydration error.
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
