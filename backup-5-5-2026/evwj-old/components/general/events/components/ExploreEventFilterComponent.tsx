"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Coordinates } from "@/lib/geo";
import { cn } from "@/lib/utils";
import { MockEventData } from "@/type";
import { ChevronDown, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
	CategoryFilterComponent,
	DateRangeFilterComponent,
	DistanceFilterComponent,
	LocationFilterComponent,
	PriceRangeFilterComponent,
} from "../searching-components";

interface FilterSidebarProps {
	showFilter: boolean;
	onToggleFilter: () => void;
	hasActiveFilters: boolean;
	activeFiltersCount: number;

	// Filter components props
	categories: string[];
	selectedCategory: string;
	categoryFilter: string;
	onCategorySelect: (category: string) => void;

	dateRange: DateRange | undefined;
	onDateRangeChange: (range: DateRange | undefined) => void;

	priceRange: [number, number];
	onPriceRangeChange: (value: number[]) => void;
	events: MockEventData[];
	dataMinPrice: number;
	dataMaxPrice: number;

	radiusKm: number;
	onRadiusChange: (value: number) => void;
	anyDistance: boolean;
	onAnyDistanceChange: (value: boolean) => void;
	userLocation: Coordinates | null;
	locationPermissionDenied: boolean;
	onLocationPermissionRetry: () => void;

	locations: string[];
	selectedLocation: string;
	onLocationSelect: (location: string) => void;

	onClearAllFilters: () => void;
}

export default function ExploreEventFilterComponent({
	showFilter,
	onToggleFilter,
	hasActiveFilters,
	activeFiltersCount,
	categories,
	selectedCategory,
	categoryFilter,
	onCategorySelect,
	dateRange,
	onDateRangeChange,
	priceRange,
	onPriceRangeChange,
	events,
	dataMinPrice,
	dataMaxPrice,
	radiusKm,
	onRadiusChange,
	anyDistance,
	onAnyDistanceChange,
	userLocation,
	locationPermissionDenied,
	onLocationPermissionRetry,
	locations,
	selectedLocation,
	onLocationSelect,
	onClearAllFilters,
}: FilterSidebarProps) {
	return (
		<div className="bg-background flex flex-col gap-4 rounded-xl p-4 overflow-auto h-full">
			{/*  */}

			{/*  */}
			<div
				className="flex cursor-pointer justify-between lg:hidden"
				onClick={onToggleFilter}
			>
				<div className="flex items-center gap-2">
					<Filter />
					<p>Filters</p>
					{hasActiveFilters && (
						<span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
							{activeFiltersCount}
						</span>
					)}
				</div>
				<ChevronDown
					className={cn("transition-transform", {
						"rotate-180": showFilter,
					})}
				/>
			</div>

			<div
				className={cn("flex-col gap-8", {
					hidden: !showFilter,
					flex: showFilter,
				})}
			>
				<Separator className="lg:hidden" />

				{/* Category Filter */}
				<CategoryFilterComponent
					categories={categories}
					selectedCategory={selectedCategory}
					categoryFilter={categoryFilter}
					onCategorySelect={onCategorySelect}
				/>

				{/* Date Range Filter */}
				<DateRangeFilterComponent
					dateRange={dateRange}
					onDateRangeChange={onDateRangeChange}
				/>

				{/* Price Range Filter */}
				<PriceRangeFilterComponent
					priceRange={priceRange}
					onPriceRangeChange={onPriceRangeChange}
					events={events}
					dataMinPrice={dataMinPrice}
					dataMaxPrice={dataMaxPrice}
				/>

				{/* Distance Filter */}
				<DistanceFilterComponent
					radiusKm={radiusKm}
					onRadiusChange={onRadiusChange}
					anyDistance={anyDistance}
					onAnyDistanceChange={onAnyDistanceChange}
					userLocation={userLocation}
					locationPermissionDenied={locationPermissionDenied}
					onLocationPermissionRetry={onLocationPermissionRetry}
				/>

				{/* Location Filter */}
				<LocationFilterComponent
					locations={locations}
					selectedLocation={selectedLocation}
					onLocationSelect={onLocationSelect}
					userLocation={userLocation}
				/>

				{hasActiveFilters && (
					<Button onClick={onClearAllFilters} variant="outline">
						Clear All Filters
					</Button>
				)}
			</div>
		</div>
	);
}
