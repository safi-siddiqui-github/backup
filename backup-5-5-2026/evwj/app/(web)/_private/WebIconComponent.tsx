"use client";

import { ReactNode } from "react";

type WebButtonComponentProps = {
  children?: ReactNode;
};

export default function WebIconComponent({
  children,
  ...props
}: WebButtonComponentProps) {
  return (
    <div
      {...props}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-linear-to-r from-purple-600 to-blue-600 p-2 font-medium text-white"
    >
      {children}
    </div>
  );
}
