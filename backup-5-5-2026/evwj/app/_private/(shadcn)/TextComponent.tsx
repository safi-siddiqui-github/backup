"use client";

import { cn } from "@/lib/lib-shadcn";
import { ComponentPropsType } from "@/type/type-component";

type TextComponentProps = {
  headingOne?: ComponentPropsType<"h1">;
  headingTwo?: ComponentPropsType<"h2">;
  headingThree?: ComponentPropsType<"h3">;
};

export function HeadingOneComponent(props?: TextComponentProps["headingOne"]) {
  const { className, children, ...propsInline } = props ?? {};
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight text-balance lg:text-5xl xl:text-6xl",
        className,
      )}
      {...propsInline}
    >
      {children}
    </h1>
  );
}

export function HeadingTwoComponent(props?: TextComponentProps["headingTwo"]) {
  const { className, children, ...propsInline } = props ?? {};

  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight md:text-3xl",
        className,
      )}
      {...propsInline}
    >
      {children}
    </h2>
  );
}

export function HeadingThreeComponent(
  props?: TextComponentProps["headingThree"],
) {
  const { className, children, ...propsInline } = props ?? {};

  return (
    <h3
      className={cn(
        "text-xl font-semibold tracking-tight md:text-2xl",
        className,
      )}
      {...propsInline}
    >
      {children}
    </h3>
  );
}
