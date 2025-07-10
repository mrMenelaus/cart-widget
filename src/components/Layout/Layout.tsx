import { lazy, Suspense, type ReactNode } from "react";
import { Button } from "../ui/button";
import { toggleTheme } from "@/lib/theme";
import { Toaster } from "../ui/sonner";
// import Cart from "../Cart/Cart";

const Cart = lazy(() => import("../Cart/Cart"));

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="border-b-2 border-neutral-500/10">
        <div className="w-full m-auto max-w-7xl p-4 flex gap-2 justify-end">
          <Button onClick={toggleTheme} variant={"outline"}>
            Сменить тему
          </Button>
          <Suspense fallback={<Button variant={"outline"} disabled>Открыть корзину</Button>}>
            <Cart />
          </Suspense>
        </div>
      </header>
      <main className="w-full">{children}</main>
      <Toaster position="bottom-center"/>
    </div>
  );
}
