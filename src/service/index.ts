import type { Product } from "@/store";

const delay = (delay: number) =>
  new Promise<void>((res) => setTimeout(() => res(), delay));

const byCategory = (categories?: number[]) => {
  return (product: Product) => {
    if (categories && categories.length) {
      return categories.some((categoryId) =>
        product.categories.some((category) => category.id === categoryId)
    );
  }
  return true;
}

};

const byPrice = (range?: { min?: number; max?: number }) => {
  return (product: Product) => {
    const { price } = product;
    return (
      (!range?.min || price >= range.min) && (!range?.max || price <= range.max)
    );
  };
};

export const productService = {
  getCategories: async () => {
      await delay(1000);
    return Object.values((await import("./db")).categories);
  },
  getProducts: async ({
    count,
    cursor,
    filters,
  }: {
    count: number;
    cursor: number | null;
    filters?: {
      categories?: Set<number>;
      price?: {
        min?: number;
        max?: number;
      };
    };
  }) => {
    await delay(1000);

    const predicates = [
      byPrice(filters?.price),
      byCategory(filters?.categories && Array.from(filters.categories))
    ];

    const filteredItems = (await import("./db")).products.filter(product => predicates.every(predicate => predicate(product)))

    let startIndex = 0;
    if (cursor) {
      startIndex = filteredItems.findIndex((product) => product.id === cursor);
    }
    const items = filteredItems.slice(startIndex, startIndex + count);

    const nextCursor = filteredItems[startIndex + count + 1]?.id || null;

    return { items, nextCursor };
  },
};
