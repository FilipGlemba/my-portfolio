import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_LINE_QUANTITY } from "@/lib/limits";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (slug: string, quantity: number, size?: string) => void;
  removeItem: (slug: string, size?: string) => void;
  clear: () => void;
  subtotal: () => number;
};

const clampQuantity = (quantity: number) => Math.min(MAX_LINE_QUANTITY, Math.max(1, Math.floor(quantity) || 1));

// The same product in two sizes is two cart lines. Without a size, every line
// of that product matches (kept so older callers keep working).
const matches = (item: CartItem, slug: string, size?: string) =>
  item.slug === slug && (size === undefined || item.size === size);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((cartItem) => cartItem.slug === item.slug && cartItem.size === item.size);
          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.slug === item.slug && cartItem.size === item.size
                  ? { ...cartItem, quantity: clampQuantity(cartItem.quantity + item.quantity) }
                  : cartItem,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: clampQuantity(item.quantity) }] };
        }),
      updateQuantity: (slug, quantity, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            matches(item, slug, size) ? { ...item, quantity: clampQuantity(quantity) } : item,
          ),
        })),
      removeItem: (slug, size) =>
        set((state) => ({
          items: state.items.filter((item) => !matches(item, slug, size)),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "fitgear-cart" },
  ),
);
