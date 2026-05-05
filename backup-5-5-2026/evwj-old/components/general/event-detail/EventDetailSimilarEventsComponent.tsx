"use client";

import EventCardComponent from "@/components/general/card/EventCardComponent";
import "@/components/general/home/swiper-styles.css";
import { CardTitle } from "@/components/ui/card";
import { useDevicePerfFlags } from "@/hooks/use-device-perf-flags";
import { getUpcomingEvents } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { MockEventData } from "@/type";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

type EventDetailSimilarEventsComponentProps = {
	slug?: string;
	limit?: number;
};

type ComponentData = {
	events?: MockEventData[];
	activeSlide?: number;
};

type SwiperData = {
	handleSlideChange?: (swiper: SwiperClass) => void;
	id?: string;
};

// Arrow components (exact copy from HomeFilteredEventV2Component)
const SwipperArrowRightComponent = ({ id }: { id?: string }) => {
	return (
		<button
			className={cn(
				`swiper-slide-next-${id}`,
				"absolute top-1/2 right-0 z-20 -translate-y-1/2",
				"hidden h-12 w-12 items-center justify-center rounded-full border-2 md:flex",
				"border-gray-300 bg-white/70 backdrop-blur",
				"hover:border-gray-800 hover:bg-white",
				"dark:border-white/30 dark:bg-black/40 dark:hover:bg-black",
			)}
			aria-label="Next"
			type="button"
		>
			<ArrowRight className="h-5 w-5 text-gray-800 dark:text-white" />
		</button>
	);
};

const SwipperArrowLeftComponent = ({ id }: { id?: string }) => {
	return (
		<button
			className={cn(
				`swiper-slide-prev-${id}`,
				"absolute top-1/2 left-0 z-20 -translate-y-1/2",
				"hidden h-12 w-12 items-center justify-center rounded-full border-2 md:flex",
				"border-gray-300 bg-white/70 backdrop-blur",
				"hover:border-gray-800 hover:bg-white",
				"dark:border-white/30 dark:bg-black/40 dark:hover:bg-black",
			)}
			aria-label="Previous"
			type="button"
		>
			<ArrowRight className="h-5 w-5 rotate-180 text-gray-800 dark:text-white" />
		</button>
	);
};

const SwipperArrowRightMobileComponent = ({ id }: { id?: string }) => {
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

const SwipperArrowLeftMobileComponent = ({ id }: { id?: string }) => {
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
			<ArrowRight className="h-4 w-4 rotate-180" />
		</button>
	);
};

const SwiperPaginationComponent = ({ id }: { id?: string }) => {
	return (
		<div className="flex snap-x flex-col items-center">
			<div className="flex w-full max-w-44 snap-x flex-col overflow-hidden md:max-w-72">
				<div className={cn(`swiper-pagination-${id} min-w-max flex-nowrap`)} />
			</div>
		</div>
	);
};

// Desktop Swiper Component (exact copy from HomeFilteredEventV2Component)
const SwiperSlideComponent = ({
	componentData,
	swiperData,
}: {
	componentData?: ComponentData;
	swiperData?: SwiperData;
}) => {
	const { handleSlideChange, id } = swiperData ?? {};
	const { events } = componentData ?? {};
	const swiperRef = useRef<any>(null);

	useEffect(() => {
		if (swiperRef.current) {
			// Wait for next frame to ensure container has width
			requestAnimationFrame(() => {
				if (swiperRef.current) {
					swiperRef.current.update();
				}
			});
		}
	}, [events]);

	if (!events || events.length === 0) {
		return null;
	}

	return (
		<div className="flex w-full flex-col">
			<div className="relative w-full overflow-hidden">
				{/* Desktop Swiper with edge arrows - matching Explore Categories structure */}
				<div className="hidden w-full md:block">
					{/* Edge-positioned navigation buttons matching Explore Categories */}
					<SwipperArrowLeftComponent id={id} />
					<SwipperArrowRightComponent id={id} />

					<div className="w-full" style={{ width: "100%", maxWidth: "100%" }}>
						<Swiper
							onSwiper={(swiper) => {
								swiperRef.current = swiper;

								// Force update after a short delay to ensure container has width
								setTimeout(() => {
									swiper.update();
								}, 100);
							}}
							modules={[Navigation, Pagination, Autoplay]}
							onSlideChange={handleSlideChange}
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
								1280: { slidesPerView: 3, spaceBetween: 24 },
								1536: { slidesPerView: 4, spaceBetween: 24 },
								2000: { slidesPerView: 5, spaceBetween: 24 },
							}}
							className="desktop-swiper"
							style={{ width: "100%" }}
							observer
							observeParents
							updateOnWindowResize
						>
							{events?.map((event, index) => (
								<SwiperSlide
									key={`${event.slug || index}-${index}`}
									className="flex flex-col px-1 py-6"
								>
									<div className="h-full w-full">
										<EventCardComponent item={event} />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>

			{/* Single pagination row (below) */}
			<SwiperPaginationComponent id={id} />
		</div>
	);
};

// Mobile Swiper Component (exact copy from HomeFilteredEventV2Component)
const SwiperSwapCardComponent = ({
	componentData,
	swiperData,
}: {
	componentData?: ComponentData;
	swiperData?: SwiperData;
}) => {
	const { handleSlideChange, id } = swiperData ?? {};
	const { events } = componentData ?? {};
	const [shouldRender, setShouldRender] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { isMobile } = useDevicePerfFlags();

	useEffect(() => {
		if (!isMobile) {
			setShouldRender(true);
			return;
		}

		if (!containerRef.current) return;

		let mounted = true;
		const observer = new IntersectionObserver(
			(entries) => {
				requestAnimationFrame(() => {
					if (!mounted) return;
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setShouldRender(true);
							observer.disconnect();
						}
					});
				});
			},
			{ rootMargin: "100px" },
		);

		observer.observe(containerRef.current);
		return () => {
			mounted = false;
			observer.disconnect();
		};
	}, [isMobile]);

	const limitedEvents = useMemo(() => {
		if (isMobile) {
			return events?.slice(0, 12) ?? [];
		}
		return events ?? [];
	}, [events, isMobile]);

	return (
		<div ref={containerRef} className="flex flex-col gap-4">
			{shouldRender ? (
				<>
					<Swiper
						onSlideChange={handleSlideChange}
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={16}
						slidesPerView={1.2}
						centeredSlides={false}
						grabCursor
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
							375: { slidesPerView: 1.3, spaceBetween: 16 },
							425: { slidesPerView: 1.4, spaceBetween: 18 },
						}}
						className="mobile-swiper"
					>
						{limitedEvents.map((event, index) => (
							<SwiperSlide key={index} className="flex flex-col">
								<div className="flex h-full w-full flex-col py-6">
									<EventCardComponent item={event} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="flex items-center justify-between gap-2">
						<SwipperArrowLeftMobileComponent id={id} />
						<SwiperPaginationComponent id={id} />
						<SwipperArrowRightMobileComponent id={id} />
					</div>
				</>
			) : (
				<div className="h-96 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
			)}
		</div>
	);
};

export default function EventDetailSimilarEventsComponent({
	slug,
	limit = 10,
}: EventDetailSimilarEventsComponentProps) {
	const [pageData, setPageData] = useState<ComponentData>({
		events: [],
		activeSlide: 0,
	});

	// Get upcoming events (time-based rail for event detail)
	const upcomingEvents = useMemo(() => {
		// Next 30 days of events
		const base = getUpcomingEvents(30);
		// Exclude the current event if slug is known
		const withoutCurrent = slug
			? base.filter((event) => event.slug !== slug)
			: base;
		return withoutCurrent.slice(0, limit);
	}, [slug, limit]);

	useEffect(() => {
		setPageData({
			events: upcomingEvents,
			activeSlide: 0,
		});
	}, [upcomingEvents]);

	const handleActiveSlide = useCallback((swiper: SwiperClass) => {
		setPageData((prev) => ({ ...prev, activeSlide: swiper.activeIndex }));
	}, []);

	if (!upcomingEvents || upcomingEvents.length === 0) {
		return null;
	}

	return (
		<div className="flex w-full flex-col gap-2">
			<CardTitle className="text-2xl lg:text-3xl">
				Similar events you might like
			</CardTitle>

			{/* Desktop swiper */}
			{(pageData?.events?.length ?? 0) > 0 && (
				<div className="hidden w-full md:flex">
					<SwiperSlideComponent
						componentData={pageData}
						swiperData={{
							id: "similarDesktop",
							handleSlideChange: handleActiveSlide,
						}}
					/>
				</div>
			)}

			{/* Mobile swiper */}
			{(pageData?.events?.length ?? 0) > 0 && (
				<div className="flex w-full flex-col md:hidden">
					<SwiperSwapCardComponent
						componentData={pageData}
						swiperData={{
							id: "similarMobile",
							handleSlideChange: handleActiveSlide,
						}}
					/>
				</div>
			)}
		</div>
	);
}
