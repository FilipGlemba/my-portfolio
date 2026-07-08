import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  subtotal: () => number;
};

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
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      updateQuantity: (slug, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: "fitgear-cart" },
  ),
);
