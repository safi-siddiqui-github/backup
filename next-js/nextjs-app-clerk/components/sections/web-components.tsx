import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

export const FlexColComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section
      className={cn("flex flex-col overflow-hidden", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export const FlexOneComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <FlexColComponent
      className={cn("relative w-full flex-1", className)}
      {...props}
    >
      {children}
    </FlexColComponent>
  );
};

export const FlexOneCenterComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <FlexOneComponent
      className={cn("items-center", className)}
      {...props}
    >
      {children}
    </FlexOneComponent>
  );
};

export const FlexColMaxWidthSMComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <FlexOneComponent
      className={cn("w-full max-w-sm", className)}
      {...props}
    >
      {children}
    </FlexOneComponent>
  );
};

export const FlexColMaxWidth8XLComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <FlexOneComponent
      className={cn("max-w-8xl w-full", className)}
      {...props}
    >
      {children}
    </FlexOneComponent>
  );
};

export const FlexRowComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section
      className={cn("flex flex-wrap items-center", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export const GridComponent = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section
      className={cn("grid", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export const FormComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"form">) => {
  return (
    <form
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </form>
  );
};

export const HeadingOneComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export const HeadingTwoComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"h2">) => {
  return (
    <h2
      className={cn("text-3xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export const HeadingThreeComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"h3">) => {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const HeadingFourComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"h4">) => {
  return (
    <h4
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h4>
  );
};

export const ListItemComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"li">) => {
  return (
    <li
      className={cn("", className)}
      {...props}
    >
      {children}
    </li>
  );
};

export const ParagraphComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const UnorderedListComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"ul">) => {
  return (
    <ul
      className={cn("flex list-inside list-disc flex-col", className)}
      {...props}
    >
      {children}
    </ul>
  );
};

export const LinkComponent = ({
  className,
  children,
  href,
  ...props
  // }: ComponentProps<typeof Link>) => {
}: Partial<ComponentProps<typeof Link>>) => {
  return (
    <Link
      className={cn("", className)}
      href={href ?? "#"}
      {...props}
    >
      {children}
    </Link>
  );
};

// When image out of control
// hero ui rule, image no control then sideways flex
export const ImageComponent = ({
  divProps,
  imageProps,
}: {
  divProps?: Partial<ComponentProps<typeof FlexColComponent>>;
  imageProps?: Partial<ComponentProps<typeof Image>>;
}) => {
  const { className: divClassName, ...divPropsD } = divProps ?? {};
  const {
    src: imageSrc,
    alt: imageAlt,
    className: imageClassName,
    width: imageWidth,
    height: imageHeight,
    loading: imageLoading,
    fetchPriority: imageFetchPriority,
    priority: imagePriority,
    // fill: imageFill,
    ...imagePropsD
  } = imageProps ?? {};

  return (
    <FlexColComponent
      className={cn("relative h-full w-full", divClassName)}
      {...divPropsD}
    >
      <Image
        className={cn("h-full w-full object-cover", imageClassName)}
        src={imageSrc ?? ""}
        alt={imageAlt ?? ""}
        // loading={imageLoading ?? "lazy"}
        width={imageWidth ?? 1000}
        height={imageHeight ?? 1000}
        loading={imageLoading ?? "eager"}
        fetchPriority={imageFetchPriority ?? "low"}
        priority={imagePriority ?? false}
        // fill={imageFill ?? true}
        {...imagePropsD}
      />
    </FlexColComponent>
  );
};

// use when image is in our control
export const BackgroundImageComponent = ({
  divProps,
  imageProps,
}: {
  divProps?: Partial<ComponentProps<typeof FlexColComponent>>;
  imageProps?: Partial<ComponentProps<typeof Image>>;
}) => {
  const { className: divClassName, ...divPropsD } = divProps ?? {};

  const {
    src: imageSrc,
    alt: imageAlt,
    className: imageClassName,
    // width: imageWidth,
    // height: imageHeight,
    loading: imageLoading,
    fetchPriority: imageFetchPriority,
    priority: imagePriority,
    fill: imageFill,
    ...imagePropsD
  } = imageProps ?? {};

  return (
    <FlexColComponent
      className={cn("absolute top-0 left-0 h-full w-full", divClassName)}
      {...divPropsD}
    >
      <FlexColComponent className="relative h-full w-full">
        <Image
          className={cn("absoluteh-full w-full object-cover", imageClassName)}
          src={imageSrc ?? ""}
          alt={imageAlt ?? ""}
          loading={imageLoading ?? "lazy"}
          fetchPriority={imageFetchPriority ?? "low"}
          priority={imagePriority ?? false}
          fill={imageFill ?? true}
          {...imagePropsD}
        />
      </FlexColComponent>
    </FlexColComponent>
  );
};

export const HeaderComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"header">) => {
  return (
    <header
      className={cn("flex items-center", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export const NavComponent = ({
  className,
  children,
  ...props
}: ComponentProps<"nav">) => {
  return (
    <nav
      className={cn("flex items-center", className)}
      {...props}
    >
      {children}
    </nav>
  );
};
