import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";

// Homepage shows featured products fetched at build time; without this the
// static page would never notice catalog changes made later via /admin.
export const revalidate = 60;

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustMarquee />
      <FeaturedProducts />
      <CategoryGrid />
    </div>
  );
}
