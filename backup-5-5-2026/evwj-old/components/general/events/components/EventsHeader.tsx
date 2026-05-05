"use client";

import { Coordinates } from "@/lib/geo";
import { DateRange } from "react-day-picker";

interface EventsHeaderProps {
	filteredEventsCount: number;
	sortBy: string;
	onSortChange: (value: string) => void;
	userLocation: Coordinates | null;
	// ActiveFilterBadges props
	query: string;
	categoryFilter: string;
	dateRange: DateRange | undefined;
	priceRange: [number, number];
	dataMinPrice: number;
	dataMaxPrice: number;
	anyDistance: boolean;
	radiusKm: number;
	selectedLocation: string;
	updateURLParams: (updates: Record<string, string>) => void;
	setDateRange: (range: DateRange | undefined) => void;
	setPriceRange: (range: [number, number]) => void;
	setAnyDistance: (value: boolean) => void;
	setRadiusKm: (value: number) => void;
	setSelectedLocation: (value: string) => void;
}

export default function EventsHeader({
	filteredEventsCount,
	sortBy,
	onSortChange,
	userLocation,
	// query,
	// categoryFilter,
	// dateRange,
	// priceRange,
	// dataMinPrice,
	// dataMaxPrice,
	// anyDistance,
	// radiusKm,
	// selectedLocation,
	// updateURLParams,
	// setDateRange,
	// setPriceRange,
	// setAnyDistance,
	// setRadiusKm,
	// setSelectedLocation,
}: EventsHeaderProps) {
	return null;
}
