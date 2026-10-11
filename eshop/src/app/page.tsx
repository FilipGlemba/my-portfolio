import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";
import { getCatalogStats } from "@/lib/queries";

// Homepage shows featured products fetched at build time; without this the
// static page would never notice catalog changes made later via /admin.
export const revalidate = 60;

async function catalogStats() {
  try {
    return await getCatalogStats();
  } catch {
    return null; // e.g. no database at build time — the hero just hides the counts
  }
}

export default async function Home() {
  const stats = await catalogStats();
  return (
    <div>
      <Hero productCount={stats?.products} categoryCount={stats?.categories} />
      <TrustMarquee />
      <FeaturedProducts />
      <CategoryGrid />
    </div>
  );
}
