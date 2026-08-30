import { Suspense } from "react";
import { ProductList } from "@/components/product-list";
import { LoadingSkeleton } from "@/components/loading-skeleton";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6"><LoadingSkeleton /></div>}>
      <ProductList />
    </Suspense>
  );
}
