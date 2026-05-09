"use client";

import { cn } from "@/lib/lib-shadcn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { ComponentPropsType } from "@/type/type-component";
import { ReactNode } from "react";

type CarouselComponentProps = ComponentPropsType<typeof Carousel>;
type CarouselItemComponentProps = ComponentPropsType<typeof CarouselItem>;

type Props = {
  carouselProps?: CarouselComponentProps;
  carouselItemProps?: CarouselItemComponentProps;
  carouselArray?: ReactNode[];
};

export function CarouselComponent(props?: Props) {
  const { carouselProps, carouselArray, carouselItemProps } = props ?? {};
  const { className, ...inlineCarouselProps } = carouselProps ?? {};
  const { className: carouselItemClassName, ...inlineCarouselItemProps } =
    carouselItemProps ?? {};

  return (
    <Carousel
      className={cn("relative flex flex-col", className)}
      {...inlineCarouselProps}
    >
      <CarouselContent>
        {carouselArray?.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "2xs:basis-3/4 3xs:basis-2/4 basis-4/5 md:basis-2/5 lg:basis-3/10 xl:basis-4/18",
              carouselItemClassName,
            )}
            {...inlineCarouselItemProps}
          >
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
