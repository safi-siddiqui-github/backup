"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { ClientPropType } from "@/type";
import SeatingDashboardCarouselCardComponent from "./SeatingDashboardCarouselCardComponent";

export default function SeatingDashboardCarouselComponent(
	prop: ClientPropType,
) {
	//
	const { slug, seatingSlug } = prop;
	//
	return (
		<div className="flex flex-col gap-4">
			{/*  */}

			{/*  */}
			<Carousel
				opts={{
					align: "start",
				}}
			>
				{/*  */}

				{/*  */}
				<CarouselContent>
					{/*  */}

					{/*  */}
					{Array.from({ length: 10 }).map((subSubItem, subSubIndex) => (
						<CarouselItem
							key={subSubIndex}
							className="basis-1/1 md:basis-1/2 xl:basis-1/3"
						>
							{/*  */}

							{/*  */}
							<div className="p-1">
								{/*  */}

								{/*  */}
								<SeatingDashboardCarouselCardComponent
									slug={slug}
									seatingSlug={seatingSlug}
								/>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
						</CarouselItem>
					))}
					{/*  */}

					{/*  */}
				</CarouselContent>
				{/*  */}

				{/*  */}
				<CarouselPrevious />
				{/*  */}
				<CarouselNext />
				{/*  */}

				{/*  */}
			</Carousel>
			{/*  */}

			{/*  */}
		</div>
	);
}
