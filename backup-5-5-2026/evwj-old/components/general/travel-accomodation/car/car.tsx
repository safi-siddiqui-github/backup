"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import CarBookingModal from "./car-booking/CarBookingModal";
import { CalendarDays } from "lucide-react";
import { useSaved } from "../saved/SavedContext";
import FiltersPanel from "./FiltersPanel";
import SearchBar from "./SearchBar";
import CarCard from "./CarCard";
import { CARS, type CarItem } from "./types";

export default function CarTab() {
	const [query, setQuery] = useState("");
	const [modalCar, setModalCar] = useState<CarItem | null>(null);

	const { add, remove, byKind } = useSaved();

	const filteredCars = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return CARS;
		return CARS.filter((c) => {
			if (c.name.toLowerCase().includes(q)) return true;
			if (c.tags.join(" ").toLowerCase().includes(q)) return true;
			if (c.pickupLocation.toLowerCase().includes(q)) return true;
			return false;
		});
	}, [query]);

	return (
		<div className="flex flex-col gap-6">
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="flex items-center justify-between space-x-2 p-4">
					<div className="flex items-center space-x-2">
						<CalendarDays className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
						<span className="text-sm font-medium text-foreground">
							Event: Jul 20, 2024 - Jul 22, 2024
						</span>
					</div>
					<span className="text-xs font-semibold !bg-white dark:!bg-slate-700/50 text-indigo-600 dark:text-indigo-400 border border-gray-200 dark:border-slate-600 px-2.5 py-0.5 rounded-full [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						4 days rental
					</span>
				</CardContent>
			</Card>

			{/* Filters panel */}
			<FiltersPanel filteredCount={filteredCars.length} />

			{/* Search Bar */}
			<SearchBar query={query} setQuery={setQuery} />

			<div className="flex flex-col gap-6">
				{filteredCars.map((car) => (
					<CarCard
						key={car.id}
						car={car}
						onReserve={(c) => setModalCar(c)}
						onToggleSave={(c) => {
							const isSaved = byKind("car").some((i) => i.id === c.id);
							if (isSaved) {
								remove(c.id, "car");
								toast("Removed from saved");
							} else {
								add({ id: c.id, kind: "car", title: c.name, payload: c });
								toast.info(`${c.name} saved!`);
							}
						}}
						isSaved={byKind("car").some((i) => i.id === car.id)}
					/>
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
			{modalCar && (
				<CarBookingModal car={modalCar} onClose={() => setModalCar(null)} />
			)}
		</div>
	);
}
