"use client";

import { X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Coordinates } from "@/lib/geo";

interface FilterBadge {
	key: string;
	label: string;
	onRemove: () => void;
}

interface ActiveFilterBadgesProps {
	query: string;
	categoryFilter: string | string[];
	dateRange: DateRange | undefined;
	priceRange: [number, number];
	dataMinPrice: number;
	dataMaxPrice: number;
	userLocation: Coordinates | null;
	anyDistance: boolean;
	radiusKm: number;
	selectedLocation: string;
	updateURLParams: (updates: Record<string, string>) => void;
	setDateRange: (range: DateRange | undefined) => void;
	setPriceRange: (range: [number, number]) => void;
	setAnyDistance: (value: boolean) => void;
	setRadiusKm: (value: number) => void;
	setSelectedLocation: (value: string) => void;
	setSelectedCategories: (categories: string[] | ((prev: string[]) => string[])) => void;
}

export default function ActiveFilterBadges({
	query,
	categoryFilter,
	dateRange,
	priceRange,
	dataMinPrice,
	dataMaxPrice,
	userLocation,
	anyDistance,
	radiusKm,
	selectedLocation,
	updateURLParams,
	setDateRange,
	setPriceRange,
	setAnyDistance,
	setRadiusKm,
	setSelectedLocation,
	setSelectedCategories,
}: ActiveFilterBadgesProps) {
	const badges: FilterBadge[] = [];

	if (query) {
		badges.push({
			key: "search",
			label: `Search: "${query}"`,
			onRemove: () => updateURLParams({ q: "" }),
		});
	}

	const categoryArray = Array.isArray(categoryFilter) ? categoryFilter : categoryFilter ? [categoryFilter] : [];
	categoryArray.forEach((cat) => {
		badges.push({
			key: `category-${cat}`,
			label: cat,
			onRemove: () => {
				setSelectedCategories((prev) => prev.filter((c) => c !== cat));
			},
		});
	});

	if (dateRange?.from || dateRange?.to) {
		const fromStr = dateRange.from ? format(dateRange.from, "MM/dd") : "";
		const toStr = dateRange.to ? format(dateRange.to, "MM/dd") : "";
		badges.push({
			key: "date",
			label: `Date: ${fromStr}${fromStr && toStr ? " - " : ""}${toStr}`,
			onRemove: () => {
				setDateRange(undefined);
				updateURLParams({ dateFrom: "", dateTo: "" });
			},
		});
	}

	if (priceRange[0] !== dataMinPrice || priceRange[1] !== dataMaxPrice) {
		badges.push({
			key: "price",
			label: `Price: $${priceRange[0]} - $${priceRange[1]}`,
			onRemove: () => {
				setPriceRange([dataMinPrice, dataMaxPrice]);
				updateURLParams({ minPrice: "", maxPrice: "" });
			},
		});
	}

	if (userLocation && !anyDistance && radiusKm !== 50) {
		badges.push({
			key: "distance",
			label: `Distance: ${radiusKm}km`,
			onRemove: () => {
				setAnyDistance(true);
				setRadiusKm(50);
				updateURLParams({ radiusKm: "" });
			},
		});
	}

	if (selectedLocation) {
		badges.push({
			key: "location",
			label: `Location: ${selectedLocation}`,
			onRemove: () => setSelectedLocation(""),
		});
	}

	if (badges.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-2 mt-2">
			{badges.map((badge) => (
				<div
					key={badge.key}
					className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
				>
					<span>{badge.label}</span>
					<button
						onClick={badge.onRemove}
						className="hover:bg-primary/20 rounded-full p-0.5"
					>
						<X className="h-3 w-3" />
					</button>
				</div>
			))}
		</div>
	);
}
