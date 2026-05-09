"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface ProposalsFiltersState {
	selectedCategories: string[];
	minRating: number;
	priceRange: [number, number];
	showOnlyNew: boolean;
	showOnlyFavorites: boolean;
}

interface ProposalsFiltersProps {
	categories: string[];
	maxPrice: number;
	filters: ProposalsFiltersState;
	onFiltersChange: (filters: ProposalsFiltersState) => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function ProposalsFilters({
	categories,
	maxPrice,
	filters,
	onFiltersChange,
	isOpen,
	onOpenChange,
}: ProposalsFiltersProps) {
	const {
		selectedCategories,
		minRating,
		priceRange,
		showOnlyNew,
		showOnlyFavorites,
	} = filters;

	// Check if any filters are active
	const hasActiveFilters =
		selectedCategories.length > 0 ||
		minRating > 0 ||
		priceRange[0] > 0 ||
		priceRange[1] < maxPrice ||
		showOnlyNew ||
		showOnlyFavorites;

	// Reset all filters
	const resetFilters = () => {
		onFiltersChange({
			selectedCategories: [],
			minRating: 0,
			priceRange: [0, Math.max(maxPrice, 50000)],
			showOnlyNew: false,
			showOnlyFavorites: false,
		});
	};

	// Toggle category selection
	const toggleCategory = (category: string) => {
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category];

		onFiltersChange({
			...filters,
			selectedCategories: newCategories,
		});
	};

	// Update filter value
	const updateFilter = <K extends keyof ProposalsFiltersState>(
		key: K,
		value: ProposalsFiltersState[K],
	) => {
		onFiltersChange({
			...filters,
			[key]: value,
		});
	};

	// Count active filters
	const activeFilterCount =
		selectedCategories.length +
		(minRating > 0 ? 1 : 0) +
		(priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0) +
		(showOnlyNew ? 1 : 0) +
		(showOnlyFavorites ? 1 : 0);

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				onClick={() => onOpenChange(!isOpen)}
				className={cn(
					"relative bg-white dark:bg-[#020617]",
					hasActiveFilters && "bg-primary/10 border-primary",
				)}
			>
				<SlidersHorizontal className="h-4 w-4" />
				{activeFilterCount > 0 && (
					<Badge
						variant="destructive"
						className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
					>
						{activeFilterCount}
					</Badge>
				)}
			</Button>
		</>
	);
}
