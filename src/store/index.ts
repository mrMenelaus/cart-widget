import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Category {
  id: number;
  value: string;
}
export interface ProductFilters {
  categories: Set<number>
  price: {
    min: number,
    max: number
  }
}

export interface Product {
  id: number;
  price: number;
  title: string;
  description: string;
  categories: Category[];
  image: string;
}

interface Store {
  cart: Product[];
  addToCart: (product: Product) => void;
  setCart: (products: Product[]) => void;
  removeFromCart: (id: number) => void;
  resetCart: () => void;
}

export const useShopStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      setCart(products) {
        set({ cart: products });
      },
      addToCart: (product) => {
        set((state) => ({ cart: [...state.cart, product] }));
      },
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== id),
        }));
      },
      resetCart: () => {
        set({cart: []})
      },
    }),
    { name: "cart", partialize: (state) => ({ cart: state.cart }) }
  )
);
