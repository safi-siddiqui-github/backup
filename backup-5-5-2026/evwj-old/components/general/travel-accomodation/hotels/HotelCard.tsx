"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { HotelType } from "./hotels";
import { useSaved } from "../saved/SavedContext";
import useEmblaCarousel from "embla-carousel-react";

type HotelCardProps = {
	hotel: HotelType;
	onBook: () => void;
	guestView?: boolean;
};

export default function HotelCard({
	hotel,
	onBook,
	guestView,
}: HotelCardProps) {
	const [recommended, setRecommended] = useState(false);
	const { add, remove, byKind } = useSaved();
	const isSaved = byKind("hotel").some((i) => i.id === hotel.name);
	// hotels.tsx defines `imageUrl` as string[]; prefer that array directly
	const images: string[] =
		Array.isArray(hotel.imageUrl) && hotel.imageUrl.length
			? hotel.imageUrl
			: [];

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
	const [canPrev, setCanPrev] = useState(false);
	const [canNext, setCanNext] = useState(false);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi],
	);

	useEffect(() => {
		if (!emblaApi) return;
		const onSelect = () => {
			setCanPrev(emblaApi.canScrollPrev());
			setCanNext(emblaApi.canScrollNext());
		};
		onSelect();
		emblaApi.on("select", onSelect);
		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);
	return (
		<Card className="overflow-hidden flex flex-col md:flex-row !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01]">
			<div className="md:w-1/3 relative">
				<div className="relative h-56 md:h-full w-full">
					<div className="h-full w-full overflow-hidden" ref={emblaRef}>
						<div className="flex h-full w-full">
							{images.map((src, idx) => (
								<div key={idx} className="shrink-0 w-full h-full relative">
									<Image
										src={src}
										alt={`${hotel.name} ${idx + 1}`}
										fill
										className="object-cover"
										unoptimized
									/>
								</div>
							))}
						</div>
					</div>

					{images.length > 1 && (
						<>
							<button
								onClick={scrollPrev}
								aria-label="Previous image"
								disabled={!canPrev}
								className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white transition duration-150 ${!canPrev ? "opacity-40 cursor-not-allowed" : "opacity-90 hover:bg-black/60"}`}
							>
								<ChevronLeft className="h-4 w-4" />
							</button>
							<button
								onClick={scrollNext}
								aria-label="Next image"
								disabled={!canNext}
								className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white transition duration-150 ${!canNext ? "opacity-40 cursor-not-allowed" : "opacity-90 hover:bg-black/60"}`}
							>
								<ChevronRight className="h-4 w-4" />
							</button>
						</>
					)}
				</div>
				{hotel.name === "Grand Plaza Hotel" && (
					<span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md transition duration-150 group-hover:bg-rose-600">
						Featured
					</span>
				)}

				<span className="absolute top-12 left-3 bg-black/60 dark:bg-white/10 text-white dark:text-gray-100 text-xs font-semibold px-2 py-1 rounded-md transition duration-150 group-hover:bg-black/70 dark:group-hover:bg-white/20">
					{hotel.roomTypes} Room Types
				</span>
				{/* If guestView is true show host recommendation badge; otherwise show the toggleable recommended badge */}
				{guestView ? (
					<span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
						Recommended By Host
					</span>
				) : (
					recommended && (
						<span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm transition duration-150 group-hover:bg-emerald-700">
							recommended to guest
						</span>
					)
				)}
			</div>

			<CardContent className="md:w-2/3 p-5 flex flex-col lg:flex-row">
				<div className="grow">
					<h4 className="text-2xl font-bold text-foreground">{hotel.name}</h4>
					<div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
						<Star className="h-4 w-4 text-yellow-400" />
						<span className="font-medium">{hotel.rating} rating</span>
						<span className="text-gray-300">|</span>
						<span>{hotel.distance}</span>
					</div>
					<p className="text-sm text-muted-foreground mt-1">{hotel.address}</p>

					<h5 className="text-sm font-semibold text-foreground mt-4 mb-2">
						Hotel Amenities
					</h5>
					<div className="flex flex-wrap gap-2">
						{hotel.amenities.map((amenity) => (
							<span
								key={amenity}
								className="!bg-white dark:!bg-slate-700/50 text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								{amenity}
							</span>
						))}
					</div>

					<div className="mt-4 text-sm text-muted-foreground space-y-1">
						<p>
							<span className="font-medium text-foreground">Check-in:</span>{" "}
							{hotel.checkIn}
						</p>
						<p>
							<span className="font-medium text-foreground">Check-out:</span>{" "}
							{hotel.checkOut}
						</p>
					</div>
				</div>

				<div className="lg:w-48 shrink-0 mt-4 lg:mt-0 lg:ml-6 lg:text-right flex flex-col justify-between items-center lg:items-end">
					<div>
						<p className="text-sm text-muted-foreground">Starting at</p>
						<p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
							{hotel.price}
						</p>
						<p className="text-sm text-muted-foreground">per night</p>
					</div>
					<div className="w-full mt-4 lg:mt-0">
						{/* Recommend on top - hide toggle when viewing as guest */}
						{!guestView && (
							<div className="mb-3">
								<button
									onClick={() => setRecommended((v) => !v)}
									className={`w-full inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-sm shadow-md transform-gpu transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 ${recommended ? "bg-emerald-600 text-white focus-visible:ring-emerald-300 hover:bg-emerald-700" : "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-200"}`}
									aria-pressed={recommended}
								>
									{recommended ? "Recommended to guest" : "Recommend to guest"}
								</button>
							</div>
						)}

						{/* Save and Book side-by-side */}
						<div className="flex gap-2">
							<button
								onClick={() => {
									if (isSaved) {
										remove(hotel.name, "hotel");
										toast("Removed from wishlist");
									} else {
										add({
											id: hotel.name,
											kind: "hotel",
											title: hotel.name,
											payload: hotel,
										});
										toast("Saved to wishlist");
									}
								}}
								className={`flex-1 inline-flex justify-center items-center gap-2 px-4 py-1.5 rounded-lg border shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isSaved ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 hover:from-indigo-700 hover:to-purple-700 focus-visible:ring-indigo-300" : "!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground border-gray-200 dark:border-slate-600 hover:shadow-md hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
							>
								{isSaved ? "Saved" : "Save"}
							</button>

							<button
								onClick={onBook}
								className="flex-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-lg font-semibold text-sm shadow-lg transform-gpu hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
							>
								Book
							</button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
