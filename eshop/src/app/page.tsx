import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";

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
