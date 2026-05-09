"use client";

import { cn } from "@/lib/lib-shadcn";
import { ComponentPropsType } from "@/type/type-component";

type Props = ComponentPropsType<"div"> & {
  backgroundImage: string;
};

export function ImageComponent(props?: Props) {
  const { className, children, style, backgroundImage, ...propsInline } =
    props ?? {};
  return (
    <div
      className={cn("flex flex-col overflow-hidden", className)}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        ...style,
      }}
      {...propsInline}
    >
      {children}
    </div>
  );
}
