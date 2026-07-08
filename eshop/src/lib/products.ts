export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  badge: string;
  color: string;
  accent: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "velocity-tee",
    name: "Velocity Training Tee",
    category: "Tops",
    price: 39,
    badge: "Bestseller",
    color: "#2f6f73",
    accent: "#d7f36b",
    description: "Lightweight performance tee for gym days and city runs.",
  },
  {
    id: "aero-shorts",
    name: "Aero Flex Shorts",
    category: "Bottoms",
    price: 46,
    badge: "New",
    color: "#243447",
    accent: "#7bdff2",
    description: "Four-way stretch shorts with secure zip pockets.",
  },
  {
    id: "pulse-hoodie",
    name: "Pulse Recovery Hoodie",
    category: "Outerwear",
    price: 79,
    badge: "Limited",
    color: "#6f4d38",
    accent: "#ffcf70",
    description: "Soft heavyweight hoodie for warmups and rest days.",
  },
  {
    id: "stride-bottle",
    name: "Stride Steel Bottle",
    category: "Accessories",
    price: 28,
    badge: "Eco",
    color: "#455a64",
    accent: "#c8ff00",
    description: "Insulated bottle with a leak-proof carry loop.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
