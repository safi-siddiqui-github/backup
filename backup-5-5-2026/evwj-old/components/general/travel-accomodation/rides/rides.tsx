"use client";

import React, { useState, useMemo } from "react";
import RideBookingModal from "./ride-booking/RideBookingModal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
// icons used inside child components
import { useSaved } from "../saved/SavedContext";

import RideCard from "./RideCard";
import FiltersPanel from "./FiltersPanel";
import { RIDE_OPTIONS, RideOption } from "./data";

// --- Main Component ---
export default function RidesTab() {
	const rideOptions = useMemo<RideOption[]>(() => RIDE_OPTIONS, []);

	const [query, setQuery] = useState("");
	const [modalRide, setModalRide] = useState<RideOption | null>(null);
	const { add, remove, byKind } = useSaved();

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return rideOptions;
		return rideOptions.filter((r) => {
			if (r.service.toLowerCase().includes(q)) return true;
			if (r.description.toLowerCase().includes(q)) return true;
			if (r.pickupLocation.toLowerCase().includes(q)) return true;
			return false;
		});
	}, [query, rideOptions]);

	return (
		<div className="min-h-screen w-full bg-gray-100 dark:bg-black p-4 sm:p-6 lg:p-8">
			<div className="w-full max-w-7xl mx-auto space-y-6">
				{/* Schedule Ride Card (search removed from filter panel) */}
				<FiltersPanel optionsCount={rideOptions.length} />

				{/* Search Input */}
				<div className="mt-4 flex items-center gap-3">
					<label htmlFor="rides-search" className="sr-only">
						Search rides
					</label>
					<div className="relative w-full">
						<svg
							className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
							/>
						</svg>
						<Input
							id="rides-search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search service, description or pickup location"
							className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:bg-[#020617] dark:text-gray-100 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]"
						/>
						{query && (
							<button
								onClick={() => setQuery("")}
								aria-label="Clear search"
								className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
							>
								✕
							</button>
						)}
					</div>
				</div>

				{/* Ride Options */}
				<div className="space-y-4">
					{filtered.map((ride) => {
						const isSaved = byKind("ride").some((i) => i.id === ride.id);
						return (
							<RideCard
								key={ride.id}
								ride={ride}
								isSaved={isSaved}
								onSchedule={(r) => setModalRide(r)}
								onToggleSave={(r) => {
									if (isSaved) {
										remove(r.id, "ride");
										toast("Removed from saved");
									} else {
										add({
											id: r.id,
											kind: "ride",
											title: r.service,
											payload: r,
										});
										toast.info(`${r.service} ride saved!`);
									}
								}}
							/>
						);
					})}
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
				{modalRide && (
					<RideBookingModal
						ride={modalRide}
						onClose={() => setModalRide(null)}
					/>
				)}
			</div>
		</div>
	);
}
