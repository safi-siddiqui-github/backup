"use client";

import React from "react";
import {
	Star,
	MapPin,
	Phone,
	CalendarCheck,
	Info,
	Bookmark,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useSaved } from "../saved/SavedContext";
import type { Restaurant } from "./data";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
	DialogClose,
	DialogFooter,
} from "@/components/ui/dialog";

export default function RestaurantCard({
	restaurant,
}: {
	restaurant: Restaurant;
}) {
	const { add, remove, byKind } = useSaved();
	const isSaved = byKind("dining").some((item) => item.id === restaurant.id);

	const bookingPayload = {
		restaurantId: restaurant.id,
		name: restaurant.name,
		partySize: restaurant.defaultPartySize ?? 2,
		time: restaurant.nextAvailable ?? restaurant.availableTimes?.[0] ?? null,
		phone: restaurant.phone,
		address: restaurant.address,
	};

	const copyPayload = async () => {
		try {
			await navigator.clipboard.writeText(JSON.stringify(bookingPayload, null, 2));
			toast.success("Booking payload copied to clipboard");
		} catch (err) {
			// Fallback for browsers that don't support clipboard API
			console.error("Failed to copy to clipboard:", err);
			toast.error("Unable to copy to clipboard. Please copy manually.");
		}
	};

	return (
		<Card className="overflow-hidden !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl">
			<div className="relative">
				<Image
					width={120}
					height={120}
					src={restaurant.imageUrl}
					alt={restaurant.name}
					className="w-full h-48 object-cover"
				/>
				<span
					className={`absolute top-3 left-3 text-xs font-semibold text-white ${restaurant.categoryColor} px-2.5 py-1 rounded-full`}
				>
					{restaurant.category}
				</span>
				<span className="absolute top-3 right-3 flex items-center gap-1 text-sm font-semibold !bg-white dark:!bg-slate-700/50 text-foreground border border-gray-200 dark:border-slate-600 px-2.5 py-1 rounded-full [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
					{restaurant.rating.toFixed(1)}
				</span>
			</div>

			<CardContent className="p-4">
				<div className="flex justify-between items-start">
					<h4 className="text-lg font-semibold text-foreground">
						{restaurant.name}
					</h4>
					<span className="text-lg font-semibold text-foreground">
						{restaurant.priceRange}
					</span>
				</div>

				<div className="space-y-1.5 mt-2 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<MapPin className="h-4 w-4 shrink-0" />
						<span>
							{restaurant.address} • {restaurant.distance}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Phone className="h-4 w-4 shrink-0" />
						<span>{restaurant.phone}</span>
					</div>
					{/* reservation quick info */}
					<div className="flex items-center gap-3 mt-2 text-sm">
						<div className="inline-flex items-center gap-2 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 px-3 py-1 rounded-full [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<CalendarCheck className="h-4 w-4 text-red-600 dark:text-red-400" />
							<span className="font-medium text-foreground">
								{restaurant.nextAvailable ?? "—"}
							</span>
							<span className="text-muted-foreground">·</span>
							<span className="text-sm text-muted-foreground">
								Party of {restaurant.defaultPartySize ?? 2}
							</span>
						</div>
						<div className="ml-auto text-xs text-muted-foreground">
							OpenTable style
						</div>
					</div>
				</div>
			</CardContent>

			<CardContent className="p-4 !bg-white dark:!bg-slate-700/50 border-t border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="flex items-center justify-between gap-4">
					<button
						onClick={() =>
							toast.success(
								`Reservation made at ${restaurant.name} for ${bookingPayload.partySize} at ${bookingPayload.time}`,
							)
						}
						className="grow w-full rounded-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2"
					>
						<CalendarCheck className="h-4 w-4" />
						<span>
							Reserve — {bookingPayload.time} · Party of{" "}
							{bookingPayload.partySize}
						</span>
					</button>

					<div className="flex items-center gap-2">
						<Dialog>
							<DialogTrigger asChild>
								<button className="h-10 px-3 rounded-md flex items-center gap-2 text-sm !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50">
									<Info className="h-4 w-4" />
									<span>Details</span>
								</button>
							</DialogTrigger>
							<DialogContent className="max-w-xl">
								<DialogHeader>
									<DialogTitle>Booking details</DialogTitle>
									<DialogDescription>
										Preview of the booking information that would be sent to
										OpenTable.
									</DialogDescription>
								</DialogHeader>

								<div className="mt-4 space-y-4">
									<div className="flex items-start gap-4">
										<div className="shrink-0 w-12 h-12 rounded-md overflow-hidden">
											<Image
												src={restaurant.imageUrl}
												width={48}
												height={48}
												alt={restaurant.name}
												className="object-cover w-full h-full"
											/>
										</div>
										<div>
											<div className="text-lg font-semibold">
												{restaurant.name}
											</div>
											<div className="text-sm text-gray-500">
												{restaurant.category} · {restaurant.priceRange} ·{" "}
												{restaurant.rating.toFixed(1)}★
											</div>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-3 text-sm">
										<div>
											<div className="text-xs text-gray-500">Party size</div>
											<div className="font-medium">
												{bookingPayload.partySize}
											</div>
										</div>
										<div>
											<div className="text-xs text-gray-500">Time</div>
											<div className="font-medium">
												{bookingPayload.time ?? "—"}
											</div>
										</div>

										<div>
											<div className="text-xs text-gray-500">Phone</div>
											<div className="font-medium">{bookingPayload.phone}</div>
										</div>
										<div>
											<div className="text-xs text-gray-500">Distance</div>
											<div className="font-medium">{restaurant.distance}</div>
										</div>

										<div className="col-span-2">
											<div className="text-xs text-gray-500">Address</div>
											<div className="font-medium">
												{bookingPayload.address}
											</div>
										</div>
									</div>

									<div>
										<div className="text-xs text-gray-500">Available times</div>
										<div className="mt-2 flex flex-wrap gap-2">
											{(restaurant.availableTimes ?? []).map((t) => (
												<span
													key={t}
													className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
												>
													{t}
												</span>
											))}
											{(restaurant.availableTimes ?? []).length === 0 && (
												<span className="text-sm text-gray-500">
													No times available
												</span>
											)}
										</div>
									</div>
								</div>

								<DialogFooter>
									<button
										onClick={copyPayload}
										className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800"
									>
										Copy JSON
									</button>
									<DialogClose className="rounded-md border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
										Close
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<button
							onClick={() => {
								if (isSaved) {
									remove(restaurant.id, "dining");
									toast("Removed from saved");
								} else {
									add({
										id: restaurant.id,
										kind: "dining",
										title: restaurant.name,
										payload: restaurant,
									});
									toast.info(`${restaurant.name} saved!`);
								}
							}}
							aria-label="Save"
							className={`h-10 w-10 rounded-md border transition duration-200 flex items-center justify-center ${isSaved ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600" : "!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
						>
							<Bookmark className="h-5 w-5" />
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
