"use client";

import React from "react";
import Image from "next/image";
import { Building, Star } from "lucide-react";
import type { HotelType } from "../hotels";

export default function Step1_Details({
	hotel,
	onNext,
}: {
	hotel: Partial<HotelType>;
	onNext: () => void;
}) {
	return (
		<div>
			<div className="flex items-center gap-4 p-4 mb-6 !bg-white dark:!bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="!bg-white dark:!bg-slate-700/50 text-indigo-600 dark:text-indigo-400 p-3 rounded-lg border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<Building className="h-8 w-8" />
				</div>
				<div>
					<h2 className="text-2xl font-bold text-foreground">{hotel.name}</h2>
					<p className="text-muted-foreground">{hotel.address}</p>
				</div>
				{/** show a thumbnail of the selected hotel if available */}
				{(() => {
					// hotel.imageUrl may be string[] (per hotels.tsx) or a single string in some cases
					let img: string | undefined;
					if (Array.isArray(hotel.imageUrl) && hotel.imageUrl.length)
						img = hotel.imageUrl[0];
					else if (typeof hotel.imageUrl === "string") img = hotel.imageUrl;
					if (!img) return null;
					return (
						<div className="ml-auto rounded-lg overflow-hidden w-28 h-20">
							<Image
								src={img}
								alt={hotel.name ?? "hotel image"}
								width={160}
								height={120}
								className="object-cover w-full h-full"
								unoptimized
							/>
						</div>
					);
				})()}
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div className="col-span-2 mb-4">
					<h3 className="text-lg font-semibold mb-2 text-foreground">
						About this property
					</h3>
					<p className="text-sm text-muted-foreground mb-3">
						{hotel.description
							? hotel.description
							: `Located in ${hotel.address ?? "the area"}, this property offers comfortable rooms with free WiFi. A continental breakfast is served every morning. Popular facilities include ${hotel.amenities?.slice(0, 6).join(", ") || "Private Parking, Free Wifi, Non-smoking rooms"}. Couples in particular like the location.`}
					</p>
					<div className="flex flex-wrap gap-2">
						{(hotel.amenities ?? []).slice(0, 6).map((a) => (
							<span
								key={a}
								className="!bg-white dark:!bg-slate-700/50 text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								{a}
							</span>
						))}
					</div>
				</div>
				<div>
					<h4 className="font-semibold text-foreground mb-2">
						Booking Details
					</h4>
					<div className="space-y-2 text-sm">
						<p>
							<span className="font-medium text-muted-foreground">
								Check-in:
							</span>{" "}
							<span className="text-foreground">{hotel.checkIn}</span>
						</p>
						<p>
							<span className="font-medium text-muted-foreground">
								Check-out:
							</span>{" "}
							<span className="text-foreground">{hotel.checkOut}</span>
						</p>
						<p>
							<span className="font-medium text-muted-foreground">Rating:</span>{" "}
							<span className="text-foreground">{hotel.rating}</span>{" "}
							<Star className="h-4 w-4 inline text-yellow-400 -mt-1" />
						</p>
					</div>
				</div>
				<div>
					<h4 className="font-semibold text-foreground mb-2">Amenities</h4>
					<div className="flex flex-wrap gap-2">
						{hotel.amenities?.slice(0, 6).map((amenity) => (
							<span
								key={amenity}
								className="!bg-white dark:!bg-slate-700/50 text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								{amenity}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="flex justify-end pt-4 border-t border-gray-200 dark:border-slate-600">
				<button
					onClick={onNext}
					className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition"
				>
					Continue to Next Step
				</button>
			</div>
		</div>
	);
}
