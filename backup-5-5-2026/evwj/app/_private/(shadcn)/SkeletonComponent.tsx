import { cn } from "@/lib/lib-shadcn";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { ComponentPropsType } from "@/type/type-component";

type Props = ComponentPropsType<typeof Skeleton>;

export function SkeletonComponent({ className, ...props }: Props) {
  return (
    <Skeleton
      className={cn("bg-white/20", className)}
      {...props}
    />
  );
}
export function SkeletonCardComponent() {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonComponent className="h-4 w-2/3" />
      <SkeletonComponent className="h-4 w-1/2" />
      <SkeletonComponent className="h-44 w-full" />
    </div>
  );
}
