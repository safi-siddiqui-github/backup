"use client";

import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { HomePageProp } from "@/types/home";
import { useEffect, useState } from "react";
import HomeCardComponent from "./HomeCardComponent";

export default function HomeCarouselComponent(prop?: HomePageProp & { location?: string }) {
	const { events, sectionType, location } = prop ?? {};
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	useEffect(() => {
		if (!api) {
			return;
		}
		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap() + 1);
		};

		// Set initial state and subscribe to selection changes
		setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", handleSelect);

		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);
	return (
		<div className="flex flex-col gap-4 overflow-hidden">
			{location && (
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
					Top Picks in {location}
				</h2>
			)}
			<Carousel
				opts={{
					// Longer duration for smoother, less snappy motion
					duration: 24,
					// Scroll by a "page" of cards (number of visible slides) instead of one card
					slidesToScroll: "auto",
					align: "start",
				}}
				setApi={setApi}
				className="relative w-full"
			>
				<CarouselContent className="">
					{events?.map((eventData, index) => (
						<CarouselItem
							key={index}
							className="basis-2/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
						>
							<div className="flex flex-col">
								<HomeCardComponent event={eventData} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0 backdrop-blur-3xl" />
				<CarouselNext className="right-0 backdrop-blur-3xl" />
			</Carousel>
			<div className="flex flex-col items-center" id={sectionType}>
				<Carousel className="w-full max-w-44">
					<CarouselContent>
						{events?.map((eventData, index) => (
							<CarouselItem
								key={index}
								data-state={index === current ? "active" : "inactive"}
								className="basis-auto data-[state=active]:*:w-5"
							>
								<div
									className="size-2 rounded-full bg-blue-500"
									onClick={() => api?.scrollTo(index)}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}
