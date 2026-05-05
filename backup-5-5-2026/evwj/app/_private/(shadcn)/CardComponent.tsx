"use client";

import { cn } from "@/lib/lib-shadcn";
import { Card } from "@/shadcn/ui/card";
import { ComponentPropsType } from "@/type/type-component";

type CardComponentProps = ComponentPropsType<typeof Card>;

export function CardComponent({
  children,
  className,
  ...props
}: CardComponentProps) {
  return (
    <Card
      className={cn("flex flex-col px-3 py-4 md:px-4 md:py-4", className)}
      {...props}
    >
      {children}
    </Card>
  );
}
