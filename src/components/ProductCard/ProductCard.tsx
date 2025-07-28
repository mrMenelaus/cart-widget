import { useShopStore, type Product } from "@/store";
import { Button } from "../ui/button";
import {
  Card,
  //   CardAction,
  CardContent,
  CardDescription,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Price } from "../ui/price";
import { ShoppingBasket } from "lucide-react";

interface Props {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product }: Props) {
  const { description, image, price, title, id } = product;
  const inCart = useShopStore((state) => state.cart.has(id));
  const addToCart = useShopStore((state) => state.addToCart);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <img className="w-full h-auto" src={image} alt="" />
      </CardContent>
      <CardFooter className="flex flex-col gap-1 items-start">
        <Price value={price} />
        <Button disabled={inCart} onClick={() => addToCart(product)}>
          {inCart ? "В корзине" : "В корзину"}
          <ShoppingBasket/>
        </Button>
      </CardFooter>
    </Card>
  );
}
