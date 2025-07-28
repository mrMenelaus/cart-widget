import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Category {
  id: number;
  value: string;
}
export interface ProductFilters {
  categories: Set<number>;
  price: {
    min: number;
    max: number;
  };
}

export interface Product {
  id: number;
  price: number;
  title: string;
  description: string;
  categories: Category[];
  image: string;
}

type Cart = Map<number, Product>;

interface Store {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  resetCart: () => void;
}

export const useShopStore = create<Store>()(
  persist(
    (set) => ({
      cart: new Map(),
      addToCart: (product) => {
        set((state) => {
          const cart = new Map(state.cart);
          cart.set(product.id, product);
          return { cart };
        });
      },
      removeFromCart: (id) => {
        set((state) => {
          const cart = new Map(state.cart);
          cart.delete(id);
          return { cart };
        });
      },
      resetCart: () => {
        set({ cart: new Map() });
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({ cart: [...state.cart.entries()] }),
      merge: (persisted, state) => {
        const {cart} = persisted as {cart: [number, Product][]}
        return {
          ...state,
          cart: new Map(cart),
        };
      },
    }
  )
);

export function useCartItems () {
   const cart = useShopStore((state) => state.cart)
   return [...cart.values()]
}