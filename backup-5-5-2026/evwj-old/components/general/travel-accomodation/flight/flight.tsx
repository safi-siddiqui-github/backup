"use client";

import { CalendarDays, MapPin, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
// Filters and card UI moved to extracted components
import { useSaved } from "../saved/SavedContext";
import FlightBookingModal from "./flight-book/FlightBookingModal";
import FiltersPanel from "./FiltersPanel";
import FlightCard from "./FlightCard";
import { flights } from "./data";
import type { Flight } from "./data";

export default function Flight() {
	const [query, setQuery] = useState("");

	const { add, remove, byKind } = useSaved();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

	const [currentStep, setCurrentStep] = useState(1);

	const handleOpenModal = (hotel: Flight) => {
		setSelectedFlight(hotel);
		setCurrentStep(1);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedFlight(null);
	};

	const handleNextStep = () => {
		setCurrentStep((prev) => prev + 1);
	};

	const handlePrevStep = () => {
		setCurrentStep((prev) => prev - 1);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="flex items-center justify-between gap-4 p-4">
					<div className="flex items-center gap-3">
						<CalendarDays className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
						<div className="text-sm">
							<div className="font-medium text-foreground">
								Event: Jul 20, 2024 - Jul 22, 2024
							</div>
							<div className="text-xs text-muted-foreground">
								San Francisco — Multi-day conference
							</div>
						</div>
					</div>
					<div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
						<MapPin className="h-4 w-4" />
						<span>Airports within 70 miles</span>
					</div>
				</CardContent>
			</Card>

			<FiltersPanel flightsCount={flights.length} />

			{/* Search Input */}
			<div className="mt-4 flex items-center gap-3">
				<label htmlFor="flight-search" className="sr-only">
					Search flights
				</label>
				<div className="relative w-full">
					<Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
					<Input
						id="flight-search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search airline, flight code or airport"
						className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:bg-[#020617] dark:text-gray-100 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]"
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							aria-label="Clear search"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#020617]"
						>
							<X className="h-4 w-4" />
						</button>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-6">
				{flights
					.filter((f) => {
						const q = query.trim().toLowerCase();
						if (!q) return true;
						if (f.airline.toLowerCase().includes(q)) return true;
						if (f.code.toLowerCase().includes(q)) return true;
						if (f.depCode.toLowerCase().includes(q)) return true;
						if (f.arrCode.toLowerCase().includes(q)) return true;
						return false;
					})
					.map((f) => {
						const isSaved = byKind("flight").some((i) => i.id === f.id);
						return (
							<FlightCard
								key={f.id}
								flight={f}
								onBook={handleOpenModal}
								onToggleSave={(flight) => {
									if (isSaved) {
										remove(flight.id, "flight");
										toast("Removed from saved");
									} else {
										add({
											id: flight.id,
											kind: "flight",
											title: `${flight.airline} ${flight.code}`,
											payload: flight,
										});
										toast.info(`${flight.code} saved`);
									}
								}}
								isSaved={isSaved}
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

			{isModalOpen && selectedFlight && (
				<FlightBookingModal
					flight={selectedFlight}
					currentStep={currentStep}
					onClose={handleCloseModal}
					onNext={handleNextStep}
					onBack={handlePrevStep}
				/>
			)}
		</div>
	);
}
