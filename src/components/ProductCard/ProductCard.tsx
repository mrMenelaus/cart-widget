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

interface Props {
  product: Product
  onClick?: () => void
}

export function ProductCard({product} : Props) {
  const cart = useShopStore(state => state.cart)
  const addToCart = useShopStore(state => state.addToCart)

  const {description,id,image,price,title} = product

  const inCart = cart.some(product => product.id === id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {description}
        </CardDescription>
        <img className="w-full h-auto" src={image} alt="" />
      </CardContent>
      <CardFooter className="flex flex-col gap-1 items-start">
        <span>
          ${price}
        </span>
        <Button onClick={() => inCart || addToCart(product)}>
          {inCart ? 
           "В корзине" : "Добавить в корзину" 
        }
          </Button>
      </CardFooter>
    </Card>
  );
}
