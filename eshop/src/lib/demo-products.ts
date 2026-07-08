import { products } from "@/lib/products";

export const demoProducts = products.map((product) => ({
  slug: product.id,
  name: product.name,
  category: product.category,
  price: product.price,
  badge: product.badge,
  description: product.description,
  stock: 25,
  featured: true,
  images: [`https://placehold.co/500x500?text=${encodeURIComponent(product.name)}`],
  createdAt: new Date(0).toISOString(),
}));

