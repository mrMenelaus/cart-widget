import { useShopStore, type Product } from "@/store";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Price } from "../ui/price";

interface Props {
  product: Product
}

export function CartProductCard({product} : Props) {
  const removeFromCart = useShopStore(state => state.removeFromCart)
  const {description,image,price,title, id} = product
  return (
    <Card
    //  className="w-full max-w-sm"
    >
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
                    <Price value={price} />
        
        <Button variant="destructive" onClick={() => removeFromCart(id)}>
    Удалить из корзины
          </Button>
      </CardFooter>
    </Card>
  );
}
