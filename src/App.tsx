import { useCallback, useState } from "react";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { type ProductFilters } from "./store";
import { Layout } from "./components/Layout/Layout";
import { productService } from "./service";
import { Button } from "./components/ui/button";
import { ProductCardSkeleton } from "./components/ProductCard/ProductCardSkeleton";
import { useInView } from "./lib/useInView";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Input } from "./components/ui/input";
import { Skeleton } from "./components/ui/skeleton";

function App() {

  const [filters, setFilters] = useState<ProductFilters>({
    categories: new Set(),
    price: {
      min: 0,
      max: 10000,
    },
  });

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });

  const {
    data: products,
    isSuccess,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      filters.price.min,
      filters.price.max,
      ...filters.categories,
    ],
    initialPageParam: null,
    getNextPageParam: (res: { nextCursor: null | number }) => res.nextCursor,
    queryFn: ({ pageParam }) =>
      productService.getProducts({ count: 5, cursor: pageParam, filters }),
  });

  const callback = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [fetchNextPage, hasNextPage]);
  const observableRef = useInView(callback);

  return (
    <Layout>
      <div className="relative w-full m-auto max-w-7xl p-4 grid gap-5 grid-cols-1 sm:grid-cols-[256px_1fr]">
        <aside className="relative">
          <div className="sticky top-0 grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Цена</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  min={0}
                  max={10000}
                  value={filters.price.min}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      price: {
                        ...prev.price,
                        min: Math.min(Number(e.target.value), prev.price.max),
                      },
                    }))
                  }
                />
                <Input
                  type="number"
                  min={0}
                  max={10000}
                  value={filters.price.max}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      price: {
                        ...prev.price,
                        max: Math.max(Number(e.target.value), prev.price.min),
                      },
                    }))
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Категория</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 items-start">
                {isLoading ? (
                  <>
                    <Skeleton className="w-[80%] h-6" />
                    <Skeleton className="w-[80%] h-6" />
                    <Skeleton className="w-[80%] h-6" />
                  </>
                ) : (
                  categories?.map((category) => (
                    <Button
                      variant={
                        filters.categories.has(category.id)
                          ? "default"
                          : "secondary"
                      }
                      key={category.id}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          categories: new Set(
                            prev.categories.has(category.id)
                              ? [...prev.categories].filter(
                                  (e) => e !== category.id
                                )
                              : [...prev.categories, category.id]
                          ),
                        }))
                      }
                    >
                      {category.value}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </aside>
        <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(256px,1fr))]">
          {isSuccess &&
            products.pages
              .flatMap((e) => e.items)
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          {isFetching ? (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : (
            <div ref={observableRef} />
          )}
        </section>
      </div>
    </Layout>
  );
}

export default App;
