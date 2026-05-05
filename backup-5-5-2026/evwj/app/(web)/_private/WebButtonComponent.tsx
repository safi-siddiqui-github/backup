"use client";

import { Button } from "@/shadcn/ui/button";
import { ComponentProps, ReactNode } from "react";

type WebButtonComponentProps = ComponentProps<typeof Button> & {
  children?: ReactNode;
};

export default function WebButtonComponent({
  children,
  ...props
}: WebButtonComponentProps) {
  return (
    <Button
      {...props}
      // className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-linear-to-r from-purple-600 to-blue-600 px-4 py-2 font-medium text-white hover:brightness-90"
      className="bg-linear-to-r from-purple-600 to-blue-600 hover:brightness-90 dark:text-white"
    >
      {children}
    </Button>
  );
}
