import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
        <Skeleton className="h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 flex-col">
        <CardDescription className="flex gap-2 flex-col">
          
        <Skeleton className="h-2"/>
        <Skeleton className="h-2"/>
        <Skeleton className="h-2"/>
        <Skeleton className="h-2"/>
        </CardDescription>
        
        


        <Skeleton className="h-32"/>
      </CardContent>
      <CardFooter className="flex flex-col gap-1 items-start">
        <Skeleton className="h-2 w-16" />
        <Skeleton className="h-8 w-32" />
      </CardFooter>
    </Card>
  );
}
