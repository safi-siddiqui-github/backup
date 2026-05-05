"use client";

import { Card, CardContent } from "@/shadcn/ui/card";
import { ComponentProps, ReactNode } from "react";

type WebCardComponentProps = ComponentProps<typeof Card> & {
  children?: ReactNode;
};

export default function WebCardComponent({
  children,
  className,
  ...props
}: WebCardComponentProps) {
  return (
    <Card
      className={`px-3 py-4 md:px-4 md:py-4 ${className}`}
      {...props}
    >
      <CardContent className="flex flex-col gap-4 p-0 lg:p-2">
        {children}
      </CardContent>
    </Card>
  );
}
