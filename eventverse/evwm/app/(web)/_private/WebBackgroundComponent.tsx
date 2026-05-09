"use client";

import { HtmlHTMLAttributes, ReactNode } from "react";

type WebButtonComponentProps = HtmlHTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export default function WebBackgroundComponent({
  children,
  className,
  ...props
}: WebButtonComponentProps) {
  return (
    <div
      {...props}
      className={`flex bg-linear-to-r from-purple-600 to-blue-600 p-2 text-white gap-2 ${className}`}
    >
      {children}
    </div>
  );
}
