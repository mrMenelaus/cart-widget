import { memo, type RefCallback } from "react";
import { ProductCardSkeleton } from "../ProductCard/ProductCardSkeleton";
import { ProductCard } from "../ProductCard/ProductCard";
import type { Product } from "@/store";


export const ProductsList = memo(({isFetching,isSuccess,products, observableRef} : {isSuccess: boolean, products?: Product[], isFetching: boolean, observableRef: RefCallback<HTMLDivElement>}) => {
  return (
    <>
      {isSuccess &&
        products!.map((product) => <ProductCard product={product} key={product.id} />)}
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
    </>
  );
});
