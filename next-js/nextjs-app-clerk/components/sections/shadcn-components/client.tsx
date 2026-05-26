"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { ComponentProps, ReactNode } from "react";

export const ShadcnCarouselComponent = ({
  carouselProps,
  carouselArray,
  carouselItemProps,
}: {
  carouselProps?: ComponentProps<typeof Carousel> & {
    autoplay?: boolean;
    buttonLess?: boolean;
  };
  carouselItemProps?: ComponentProps<typeof CarouselItem>;
  carouselArray?: ReactNode[];
}) => {
  const { className, autoplay, buttonLess, ...inlineCarouselProps } =
    carouselProps ?? {};
  const { className: carouselItemClassName, ...inlineCarouselItemProps } =
    carouselItemProps ?? {};

  return (
    <Carousel
      className={cn(
        "relative flex h-full flex-col *:*:nth-1:h-full *:nth-1:h-full",
        className,
      )}
      plugins={[...(autoplay ? [Autoplay({ delay: 2000 })] : [])]}
      {...inlineCarouselProps}
    >
      <CarouselContent>
        {carouselArray?.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              // "basis-4/5 md:basis-2/5 lg:basis-3/10 xl:basis-4/18",
              "basis-1/1",
              carouselItemClassName,
            )}
            {...inlineCarouselItemProps}
          >
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      {!buttonLess && (
        <>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </>
      )}
    </Carousel>
  );
};
