"use client";

import React, { useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Card, CardContent } from "@/components/ui/card";
import { useSaved, SavedKind } from "../saved/SavedContext";
import { toast } from "sonner";
import { Search, X } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import {
	stats,
	bookings as initialBookings,
	type Booking,
	type HotelBooking,
} from "./data";
import BookingCard from "./BookingCard";
import DiningBookingCard from "./DiningBookingCard";
import StatCard from "./StatCard";
import { Upload, Trash2 } from "lucide-react";

export default function BookingsTab() {
	const [query, setQuery] = useState("");
	const {
		items: savedItems,
		byKind,
		remove: removeSaved,
		clear: clearSaved,
	} = useSaved();

	const kinds: { key: SavedKind | "all"; label: string }[] = [
		{ key: "all", label: "All" },
		{ key: "hotel", label: "Hotels" },
		{ key: "flight", label: "Flights" },
		{ key: "car", label: "Cars" },
		{ key: "activity", label: "Activities" },
		{ key: "dining", label: "Dining" },
		{ key: "ride", label: "Rides" },
	];

	const [bookingList, setBookingList] = useState<Booking[]>(initialBookings);

	const filteredBookings = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return bookingList;
		return bookingList.filter((b) => {
			if (b.title.toLowerCase().includes(q)) return true;
			if (b.details?.toString().toLowerCase().includes(q)) return true;
			if (
				(b as HotelBooking).amenities &&
				(b as HotelBooking).amenities.join(" ").toLowerCase().includes(q)
			)
				return true;
			return false;
		});
	}, [query, bookingList]);

	const groupedByDate = useMemo(() => {
		const groups: Record<string, Booking[]> = {};

		const parseDisplayDate = (b: Booking) => {
			if (b.category === "Hotel") return (b as HotelBooking).checkIn;
			const details = b.details || "";
			const beforeBullet = details.split("•")[0].trim();
			if (!beforeBullet) return "Unknown";
			return beforeBullet.includes(",")
				? beforeBullet
				: `${beforeBullet}, 2024`;
		};

		for (const b of filteredBookings) {
			const key = parseDisplayDate(b);
			if (!groups[key]) groups[key] = [];
			groups[key].push(b);
		}

		return groups;
	}, [filteredBookings]);

	const sortedDateKeys = useMemo(() => {
		const toTime = (k: string) => {
			const t = Date.parse(k);
			if (!isNaN(t)) return t;
			const alt = Date.parse(`${k}, 2024`);
			if (!isNaN(alt)) return alt;
			return Number.MAX_SAFE_INTEGER;
		};

		return Object.keys(groupedByDate).sort((a, b) => toTime(a) - toTime(b));
	}, [groupedByDate]);

	return (
		<div className="flex flex-col gap-6">
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="p-5 sm:p-6">
					<h3 className="mb-4 text-xl font-semibold text-foreground">
						Your Trip Summary
					</h3>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						{stats.map((stat) => (
							<StatCard key={stat.label} {...stat} />
						))}
					</div>

					<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<button
							onClick={() => toast.success("Bookings exported!")}
							className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-6 py-3 text-base font-semibold !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground shadow-sm transition duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						>
							<Upload className="h-5 w-5" />
							<span>Export Bookings</span>
						</button>
						<button
							onClick={() =>
								toast.error("Demo data cleared!", {
									description: "All bookings have been removed.",
								})
							}
							className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
						>
							<Trash2 className="h-5 w-5" />
							<span>Clear Demo Data</span>
						</button>
					</div>
				</CardContent>
			</Card>

			{/* Saved items section inside My Bookings */}
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="p-5 sm:p-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-foreground">
							Saved Items
						</h3>
						<div className="flex items-center gap-3">
							<span className="text-sm text-muted-foreground">
								{savedItems.length} items
							</span>
							<button
								onClick={() => {
									clearSaved();
									toast("Cleared saved items");
								}}
								className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
							>
								Clear
							</button>
						</div>
					</div>

					<div className="mt-4">
						<Tabs>
							<TabList className="mb-4 flex gap-2 overflow-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-lg p-1 [background-color:white] dark:[background-color:#020617]">
								{kinds.map((k) => (
									<Tab
										key={String(k.key)}
										className="px-3 py-1 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm cursor-pointer data-[selected]:bg-gradient-to-r data-[selected]:from-indigo-600 data-[selected]:to-purple-600 data-[selected]:text-white text-foreground [background-color:white] dark:[background-color:#020617]"
									>
										{k.label}{" "}
										{k.key === "all"
											? `(${savedItems.length})`
											: `(${byKind(k.key as SavedKind).length})`}
									</Tab>
								))}
							</TabList>

							{kinds.map((k) => (
								<TabPanel key={String(k.key)}>
									<div className="grid grid-cols-1 gap-3">
										{(k.key === "all" ? savedItems : byKind(k.key as SavedKind))
											.length === 0 && (
											<div className="text-sm text-muted-foreground">
												No saved {k.label.toLowerCase()}.
											</div>
										)}

										{(k.key === "all"
											? savedItems
											: byKind(k.key as SavedKind)
										).map((it) => (
											<Card
												key={`${it.kind}_${it.id}`}
												className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
											>
												<CardContent className="flex items-center justify-between p-3">
													<div>
														<div className="font-medium text-foreground">
															{it.title}
														</div>
														<div className="text-sm text-muted-foreground">
															{it.kind}
														</div>
													</div>
													<div className="flex items-center gap-2">
														<button
															onClick={() => {
																removeSaved(it.id, it.kind);
																toast("Removed from saved");
															}}
															className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
														>
															Remove
														</button>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</TabPanel>
							))}
						</Tabs>
					</div>
				</CardContent>
			</Card>

			<div className="flex items-center gap-3">
				<label htmlFor="bookings-search" className="sr-only">
					Search bookings
				</label>
				<div className="flex flex-1 items-center rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<Search className="h-4 w-4 text-muted-foreground" />
					<input
						id="bookings-search"
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search bookings by title, details or amenity"
						className="flex-1 px-2 py-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							aria-label="Clear search"
							className="px-2 text-muted-foreground hover:text-foreground"
						>
							<X className="h-4 w-4" />
						</button>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-6">
				{sortedDateKeys.length === 0 && (
					<div className="text-sm text-muted-foreground">
						No bookings for selected dates.
					</div>
				)}

				{sortedDateKeys.map((dateKey) => (
					<div key={dateKey}>
						<div className="flex items-center gap-6">
							<div className="relative pl-10">
								<div className="absolute top-1.5 left-0 z-10 h-4 w-4 rounded-full border-4 border-gray-100 dark:border-slate-800 bg-gray-300 dark:bg-slate-600" />
								<h4 className="text-lg font-semibold text-foreground">
									{dateKey}
								</h4>
								<p className="text-sm text-muted-foreground">Completed</p>
							</div>

							<div className="h-px w-full bg-gray-200 dark:bg-slate-600" />
						</div>

						<div className="mt-4 space-y-4 pl-10">
							{groupedByDate[dateKey]?.map((booking) => {
								if (booking.category === "Activity") {
									return (
										<DiningBookingCard
											key={booking.id}
											booking={booking}
											onCancel={(id: string) => {
												setBookingList((prev) =>
													prev.filter((b) => b.id !== id),
												);
												toast.success("Booking cancelled");
											}}
										/>
									);
								}

								return (
									<BookingCard
										key={booking.id}
										booking={booking}
										onCancel={(id: string) => {
											setBookingList((prev) => prev.filter((b) => b.id !== id));
											toast.success("Booking cancelled");
										}}
									/>
								);
							})}
						</div>
					</div>
				))}
			</div>

			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
