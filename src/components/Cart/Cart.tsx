import { useCartItems, useShopStore } from "@/store";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CartProductCard } from "../CartProductCard/CartProductCard";
import { useMemo } from "react";
import { toast } from "sonner";
import { format } from "@/lib/date";
import { Price } from "../ui/price";

export default function Cart() {
  const resetCart = useShopStore((state) => state.resetCart);
  const cart = useCartItems();
  const price = useMemo(() => {
    return cart.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
  }, [cart]);

  const makeOrder = () => {
    toast.success("Успешный заказ", {
      description: `Дата заказа ${format(new Date(Date.now()))}`,
    });
    resetCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Открыть корзину</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>Товары для заказа</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col px-4 gap-2 overflow-auto">
          {cart.map((product) => (
            <CartProductCard product={product} key={product.id} />
          ))}
        </div>
        <SheetFooter>
          <div className="flex justify-between">
            <span>Итого</span>
            <Price value={price} />
          </div>
          <SheetClose asChild>
            <Button disabled={cart.length === 0} onClick={makeOrder}>
              Оформить заказ
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
