import { ProductList } from "@/components/product-list";
import { getCatalog, type CatalogProduct, type ProductSort } from "@/lib/queries";
import { isCategory } from "@/lib/categories";
import { MAX_SEARCH_LENGTH } from "@/lib/text";

export const metadata = { title: "Shop" };

const SORTS: readonly ProductSort[] = ["newest", "price_asc", "price_desc"];

type SearchParams = { search?: string | string[]; category?: string | string[]; sort?: string | string[] };

// Filters live in the URL, so results are server-rendered and shareable
// (/products?category=Running&sort=price_asc) — no client-side fetch.
export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const search = typeof searchParams.search === "string" ? searchParams.search.slice(0, MAX_SEARCH_LENGTH) : "";
  const category = isCategory(searchParams.category) ? searchParams.category : "";
  const sort = SORTS.find((value) => value === searchParams.sort) ?? "newest";

  let products: CatalogProduct[] = [];
  let failed = false;
  try {
    products = await getCatalog({ search, category: category || undefined, sort });
  } catch (error) {
    console.error("Failed to load the catalog:", error);
    failed = true;
  }

  return <ProductList products={products} search={search} category={category} sort={sort} failed={failed} />;
}
