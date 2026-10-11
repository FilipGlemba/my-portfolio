import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";
import { CustomerReviews } from "@/components/customer-reviews";
import { getCatalog, getCatalogStats, getHighlightedReviews, type CatalogProduct } from "@/lib/queries";

// Re-render at most once a minute so catalog changes made in /admin show up.
export const revalidate = 60;

async function loadHome() {
  try {
    const [products, reviews, stats] = await Promise.all([getCatalog(), getHighlightedReviews(6), getCatalogStats()]);
    return { products, reviews, stats };
  } catch (error) {
    console.error("Failed to load the homepage data:", error); // e.g. no DB at build time
    return { products: [] as CatalogProduct[], reviews: [], stats: null };
  }
}

const hasPhoto = (product: CatalogProduct) => Boolean(product.images[0]) && !product.images[0].startsWith("data:");

export default async function Home() {
  const { products, reviews, stats } = await loadHome();

  // Hero spotlight: a featured bestseller with a real photo, else any featured product.
  const spotlight =
    products.find((p) => p.featured && p.badge === "BESTSELLER" && hasPhoto(p)) ??
    products.find((p) => p.featured && hasPhoto(p)) ??
    null;

  // Four favourites, not repeating the spotlight; topped up by rating if needed.
  const others = products.filter((p) => p.slug !== spotlight?.slug);
  const favorites = [
    ...others.filter((p) => p.featured),
    ...others.filter((p) => !p.featured).sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
  ].slice(0, 4);

  return (
    <div>
      <Hero productCount={stats?.products} categoryCount={stats?.categories} spotlight={spotlight} />
      <TrustMarquee />
      <FeaturedProducts products={favorites} />
      <CategoryGrid />
      <CustomerReviews reviews={reviews} />
    </div>
  );
}
