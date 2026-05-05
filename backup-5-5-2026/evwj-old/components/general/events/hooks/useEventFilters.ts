import { Coordinates } from "@/lib/geo";
import { MOCK_EVENTS } from "@/lib/mock-events";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { applyAllFilters } from "../utils/eventFiltering";
import { sortEvents, SortOption } from "../utils/eventSorting";

export function useEventFilters(userLocation: Coordinates | null) {
	const searchParams = useSearchParams();

	// URL params
	const query = searchParams.get("q") || "";
	const categoryFilterParam = searchParams.get("category") || "";
	const categoryFilter = categoryFilterParam ? categoryFilterParam.split(",").filter(Boolean) : [];
	const dateFrom = searchParams.get("dateFrom") || "";
	const dateTo = searchParams.get("dateTo") || "";
	const minPriceParam = searchParams.get("minPrice");
	const maxPriceParam = searchParams.get("maxPrice");
	const radiusKmParam = searchParams.get("radiusKm");

	// Calculate price range from all events
	const { minPrice: dataMinPrice, maxPrice: dataMaxPrice } = useMemo(() => {
		const prices = MOCK_EVENTS.map((e) => e.price);
		return {
			minPrice: Math.floor(Math.min(...prices)),
			maxPrice: Math.ceil(Math.max(...prices)),
		};
	}, []);

	// Filter state
	const [priceRange, setPriceRange] = useState<[number, number]>([
		minPriceParam ? parseFloat(minPriceParam) : dataMinPrice,
		maxPriceParam ? parseFloat(maxPriceParam) : dataMaxPrice,
	]);

	// Track if price range was initialized from URL params
	const [hasUserChangedPrice, setHasUserChangedPrice] = useState(
		!!(minPriceParam || maxPriceParam),
	);

	const [radiusKm, setRadiusKm] = useState<number>(
		radiusKmParam ? parseFloat(radiusKmParam) : 50,
	);
	const [anyDistance, setAnyDistance] = useState<boolean>(true);

	const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
		if (dateFrom && dateTo) {
			return {
				from: new Date(dateFrom),
				to: new Date(dateTo),
			};
		}
		return undefined;
	});

	const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFilter);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [sortBy, setSortBy] = useState<SortOption>("date");

	// Filtered and sorted events
	const filteredEvents = useMemo(() => {
		const filters = {
			query,
			category: selectedCategories.length > 0 ? selectedCategories : categoryFilter,
			dateRange,
			priceRange,
			location: selectedLocation,
			userLocation,
			radiusKm,
			anyDistance,
		};

		const filtered = applyAllFilters(MOCK_EVENTS, filters);
		return sortEvents(filtered, sortBy);
	}, [
		query,
		categoryFilter,
		selectedCategories,
		dateRange,
		priceRange,
		selectedLocation,
		userLocation,
		radiusKm,
		anyDistance,
		sortBy,
	]);

	// Check if any filters are active
	const hasActiveFilters = useMemo(() => {
		return !!(
			query ||
			selectedCategories.length > 0 ||
			dateRange ||
			priceRange[0] !== dataMinPrice ||
			priceRange[1] !== dataMaxPrice ||
			(userLocation && !anyDistance && radiusKm !== 50) ||
			selectedLocation
		);
	}, [
		query,
		selectedCategories,
		dateRange,
		priceRange,
		dataMinPrice,
		dataMaxPrice,
		userLocation,
		anyDistance,
		radiusKm,
		selectedLocation,
	]);

	// Clear all filters
	const clearAllFilters = () => {
		setPriceRange([dataMinPrice, dataMaxPrice]);
		setDateRange(undefined);
		setRadiusKm(50);
		setAnyDistance(true);
		setSelectedCategories([]);
		setSelectedLocation("");
		setHasUserChangedPrice(false);
	};

	// Enhanced setPriceRange that tracks user interaction
	const setPriceRangeWithTracking = (range: [number, number]) => {
		setPriceRange(range);
		setHasUserChangedPrice(true);
	};

	return {
		// State
		priceRange,
		setPriceRange,
		setPriceRangeWithTracking,
		hasUserChangedPrice,
		radiusKm,
		setRadiusKm,
		anyDistance,
		setAnyDistance,
		dateRange,
		setDateRange,
		selectedCategories,
		setSelectedCategories,
		selectedLocation,
		setSelectedLocation,
		sortBy,
		setSortBy,

		// Computed
		filteredEvents,
		hasActiveFilters,
		dataMinPrice,
		dataMaxPrice,

		// Actions
		clearAllFilters,
	};
}
