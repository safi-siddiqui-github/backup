"use client";

import { Button } from "@/components/ui/button";
import { useDevicePerfFlags } from "@/hooks/use-device-perf-flags";
import { OrganizerWithStats } from "@/lib/mock-events/organizer";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "../home/swiper-styles.css";
import OrganizerCardComponent from "./OrganizerCardComponent";

type OrganizerCarouselComponentProps = {
  title: string;
  organizers: OrganizerWithStats[];
  seeMoreLink?: string;
  className?: string;
  id: string;
};

/** ---------- Desktop arrow components ---------- */
const SwipperArrowLeftComponent = ({ id }: { id: string }) => {
  return (
    <button
      className={cn(
        `swiper-slide-prev-${id}`,
        "absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-3 shadow-lg transition-all hover:bg-white dark:border-slate-700 dark:bg-slate-800/90 dark:hover:bg-slate-800",
        "hidden items-center justify-center md:flex",
      )}
      aria-label="Previous"
      type="button"
    >
      <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
    </button>
  );
};

const SwipperArrowRightComponent = ({ id }: { id: string }) => {
  return (
    <button
      className={cn(
        `swiper-slide-next-${id}`,
        "absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-3 shadow-lg transition-all hover:bg-white dark:border-slate-700 dark:bg-slate-800/90 dark:hover:bg-slate-800",
        "hidden items-center justify-center md:flex",
      )}
      aria-label="Next"
      type="button"
    >
      <ArrowRight className="h-5 w-5 text-slate-700 dark:text-slate-300" />
    </button>
  );
};

/** ---------- Mobile arrow components ---------- */
const SwipperArrowLeftMobileComponent = ({ id }: { id: string }) => {
  return (
    <button
      className={cn(
        `swiper-slide-prev-${id}`,
        "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-all",
        "border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground border shadow-xs",
        "dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "size-8",
      )}
      aria-label="Previous"
      type="button"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
};

const SwipperArrowRightMobileComponent = ({ id }: { id: string }) => {
  return (
    <button
      className={cn(
        `swiper-slide-next-${id}`,
        "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-all",
        "border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground border shadow-xs",
        "dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "size-8",
      )}
      aria-label="Next"
      type="button"
    >
      <ArrowRight className="h-4 w-4" />
    </button>
  );
};

/** ---------- Swiper pagination pills ---------- */
const SwiperPaginationComponent = ({
  id,
  organizers,
}: {
  id: string;
  organizers: OrganizerWithStats[];
}) => {
  return (
    <div className="mt-4 flex snap-x flex-col items-center">
      <div className="flex w-full max-w-44 snap-x flex-col overflow-hidden md:max-w-72">
        <div className={cn(`swiper-pagination-${id} min-w-max flex-nowrap`)} />
      </div>
    </div>
  );
};

export default function OrganizerCarouselComponent({
  title,
  organizers,
  seeMoreLink,
  className,
  id,
}: OrganizerCarouselComponentProps) {
  const { isMobile } = useDevicePerfFlags();
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setSwiperInstance(swiper);
  }, []);

  if (!organizers || organizers.length === 0) {
    return (
      <div className={cn("flex flex-col gap-6 py-8", className)}>
        <h2 className="text-foreground text-2xl font-bold">{title}</h2>
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">No organizers found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6 py-8", className)}>
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold md:text-3xl">
          {title}
        </h2>
        {seeMoreLink && (
          <Button
            asChild
            variant="ghost"
            className="hidden items-center gap-2 text-sm md:flex"
          >
            <Link href={seeMoreLink}>
              See More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {/* Desktop Swiper */}
      <div className="relative hidden md:block">
        <SwipperArrowLeftComponent id={id} />
        <SwipperArrowRightComponent id={id} />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiperInstance}
          spaceBetween={24}
          slidesPerView={4}
          navigation={{
            nextEl: `.swiper-slide-next-${id}`,
            prevEl: `.swiper-slide-prev-${id}`,
          }}
          pagination={{
            clickable: true,
            el: `.swiper-pagination-${id}`,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 14 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
            1536: { slidesPerView: 4, spaceBetween: 24 },
            2000: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="organizer-carousel"
        >
          {organizers.map((organizer) => (
            <SwiperSlide
              key={organizer.id}
              className="flex flex-col"
            >
              <OrganizerCardComponent
                organizer={organizer}
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <SwiperPaginationComponent
          id={id}
          organizers={organizers}
        />
      </div>

      {/* Mobile Swiper */}
      <div className="block md:hidden">
        <div className="mb-4 flex items-center justify-between">
          <SwipperArrowLeftMobileComponent id={`${id}-mobile`} />
          <SwipperArrowRightMobileComponent id={`${id}-mobile`} />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSlideChange={handleSlideChange}
          onSwiper={setSwiperInstance}
          spaceBetween={16}
          slidesPerView={1.5}
          navigation={{
            nextEl: `.swiper-slide-next-${id}-mobile`,
            prevEl: `.swiper-slide-prev-${id}-mobile`,
          }}
          pagination={{
            clickable: true,
            el: `.swiper-pagination-${id}-mobile`,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="organizer-carousel-mobile"
        >
          {organizers.map((organizer) => (
            <SwiperSlide
              key={organizer.id}
              className="flex flex-col"
            >
              <OrganizerCardComponent
                organizer={organizer}
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 flex snap-x flex-col items-center">
          <div className="flex w-full max-w-44 snap-x flex-col overflow-hidden">
            <div
              className={cn(
                `swiper-pagination-${id}-mobile min-w-max flex-nowrap`,
              )}
            />
          </div>
        </div>

        {seeMoreLink && (
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700"
            >
              <Link href={seeMoreLink}>
                See More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
