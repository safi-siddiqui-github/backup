"use client";

import { Button } from "@/components/ui/button";
import { getEventCategories, MOCK_EVENTS } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Search, Clock, MapPin, Tag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	useTransition,
} from "react";
import { DateRange } from "react-day-picker";
import {
	ActiveFilterBadges,
	EventsGrid,
	EventsGridTwoColumn,
	EventsHeader,
	EventsPagination,
	MapSection,
} from "./components";
import { useEventFilters } from "./hooks/useEventFilters";
import { useEventPagination } from "./hooks/useEventPagination";
import { useURLSync } from "./hooks/useURLSync";
import { useUserLocation } from "./hooks/useUserLocation";
import { useWindowSize } from "./hooks/useWindowSize";

import {
	SortDropdownComponent,
	CategoryFilterDropdown,
	DateRangeFilterDropdown,
	PriceRangeFilterDropdown,
} from "./searching-components";

// Memoized wrappers to reduce child re-renders
const MemoHeader = memo(EventsHeader);
const MemoGrid = memo(EventsGrid);
const MemoGridTwo = memo(EventsGridTwoColumn);
const MemoMapSection = memo(MapSection);
const MemoActiveBadges = memo(ActiveFilterBadges);

interface EventsDiscoverSectionComponentProps {
	location?: string;
	category?: string;
}

export default function EventsDiscoverSectionComponent({
	location,
	category,
}: EventsDiscoverSectionComponentProps) {
	const searchParams = useSearchParams();

	// URL params
	const query = searchParams.get("q") || "";
	const categoryFilter = searchParams.get("category") || "";

	// Custom hooks
	const { userLocation, locationPermissionDenied, retryLocation } =
		useUserLocation();
	const { updateURLParams } = useURLSync();

	const {
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
		filteredEvents,
		hasActiveFilters,
		dataMinPrice,
		dataMaxPrice,
		clearAllFilters,
	} = useEventFilters(userLocation);

	// Set initial location filter from route param
	useEffect(() => {
		if (location && location !== selectedLocation) {
			setSelectedLocation(location);
		}
	}, [location, selectedLocation, setSelectedLocation]);

	// Set initial category filter from route param
	useEffect(() => {
		if (category && !selectedCategories.includes(category)) {
			setSelectedCategories([category]);
		}
	}, [category, selectedCategories, setSelectedCategories]);

	const {
		currentPage,
		eventsPerPage,
		totalPages,
		paginatedEvents,
		goToPage,
		goToNextPage,
		goToPreviousPage,
		changeItemsPerPage,
	} = useEventPagination(filteredEvents);

	// UI State
	const [showMap, setShowMap] = useState(true);
	const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
	
	// Search bar state
	const [searchQuery, setSearchQuery] = useState(query);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);
	
	// Mock search suggestions
	const SEARCH_SUGGESTIONS = [
		{ id: "1", text: "Tech Conferences", type: "category", icon: Tag },
		{ id: "2", text: "Music Festivals", type: "category", icon: Tag },
		{ id: "3", text: "New York Events", type: "location", icon: MapPin },
		{ id: "4", text: "Upcoming This Week", type: "time", icon: Clock },
	];
	
	// Initialize search from URL
	useEffect(() => {
		setSearchQuery(query);
	}, [query]);
	
	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node) &&
				searchInputRef.current &&
				!searchInputRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};
		
		if (showSuggestions) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showSuggestions]);
	
	const handleSearch = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		updateURLParams({ q: searchQuery });
		setShowSuggestions(false);
	};
	
	const handleSuggestionClick = (suggestion: string) => {
		setSearchQuery(suggestion);
		setShowSuggestions(false);
		updateURLParams({ q: suggestion });
	};

	// Responsive layout
	const { width } = useWindowSize();
	const [isPrimaryView, setIsPrimaryView] = useState(true);

	// Transition to keep UI responsive
	const [, startTransition] = useTransition();

	// Unique categories and locations
	const categories = useMemo(() => getEventCategories(), []);
	const locations = useMemo(() => {
		const locs = MOCK_EVENTS.map((e) => e.locationMap).filter(
			Boolean,
		) as string[];
		return Array.from(new Set(locs));
	}, []);

	// Desktop defaults
	useEffect(() => {
		if (width >= 1024) {
			setShowMap(true);
		} else {
			setShowMap(false);
		}
	}, [width]);

	// Primary view based on width
	useEffect(() => {
		setIsPrimaryView(width >= 1024);
	}, [width]);

	// Handlers
	const handlePrimaryView = useCallback(() => {
		setIsPrimaryView((prev) => !prev);
	}, []);

	const handlePriceRangeChange = useCallback(
		(value: number[]) => {
			startTransition(() => {
				setPriceRangeWithTracking([value[0], value[1]]);
			});
		},
		[setPriceRangeWithTracking],
	);

	const handleDateRangeChange = useCallback(
		(range: DateRange | undefined) => {
			startTransition(() => setDateRange(range));
			updateURLParams({
				dateFrom: range?.from ? format(range.from, "yyyy-MM-dd") : "",
				dateTo: range?.to ? format(range.to, "yyyy-MM-dd") : "",
			});
		},
		[setDateRange, updateURLParams],
	);

	const handleCategoryToggle = useCallback(
		(category: string) => {
			startTransition(() => {
				setSelectedCategories((prev) => {
					return prev.includes(category)
						? prev.filter((c) => c !== category)
						: [...prev, category];
				});
			});
		},
		[setSelectedCategories],
	);

	const handleEventHover = useCallback((slug: string | null) => {
		setHighlightedSlug(slug);
	}, []);

	const handleSortChange = useCallback(
		(value: string) => {
			startTransition(() =>
				setSortBy(value as "date" | "name" | "price" | "distance"),
			);
		},
		[setSortBy],
	);

	const handleItemsPerPageChange = useCallback(
		(value: number) => {
			startTransition(() => changeItemsPerPage(value));
		},
		[changeItemsPerPage],
	);

	const toggleMap = useCallback(() => setShowMap((p) => !p), []);

	// Debounced URL updates for price
	useEffect(() => {
		if (!hasUserChangedPrice) return;
		const timeout = setTimeout(() => {
			if (priceRange[0] !== dataMinPrice || priceRange[1] !== dataMaxPrice) {
				updateURLParams({
					minPrice: priceRange[0].toString(),
					maxPrice: priceRange[1].toString(),
				});
			} else {
				updateURLParams({ minPrice: "", maxPrice: "" });
			}
		}, 400);
		return () => clearTimeout(timeout);
	}, [
		priceRange,
		hasUserChangedPrice,
		dataMinPrice,
		dataMaxPrice,
		updateURLParams,
	]);

	// Debounced URL updates for distance
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (userLocation) updateURLParams({ radiusKm: radiusKm.toString() });
		}, 400);
		return () => clearTimeout(timeout);
	}, [radiusKm, userLocation, updateURLParams]);

	// Debounced URL updates for location text
	useEffect(() => {
		const timeout = setTimeout(() => {
			updateURLParams({ location: selectedLocation });
		}, 400);
		return () => clearTimeout(timeout);
	}, [selectedLocation, updateURLParams]);

	// Debounced URL updates for categories
	useEffect(() => {
		const timeout = setTimeout(() => {
			const categoryParam = selectedCategories.length > 0 ? selectedCategories.join(",") : "";
			updateURLParams({ category: categoryParam });
		}, 400);
		return () => clearTimeout(timeout);
	}, [selectedCategories, updateURLParams]);

	// Active filters count (badge)
	const activeFiltersCount = useMemo(
		() =>
			[
				query && 1,
				selectedCategories.length > 0 && 1,
				dateRange && 1,
				(priceRange[0] !== dataMinPrice || priceRange[1] !== dataMaxPrice) && 1,
				userLocation && !anyDistance && radiusKm !== 50 && 1,
				selectedLocation && 1,
			].filter(Boolean).length,
		[
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
		],
	);

	return (
		<div className="flex flex-col gap-10">
			{/* Header */}
			<MemoHeader
				filteredEventsCount={filteredEvents.length}
				sortBy={sortBy}
				onSortChange={handleSortChange}
				userLocation={userLocation}
				// (Header doesn't render badges, but we keep the full API)
				query={query}
				categoryFilter={categoryFilter}
				dateRange={dateRange}
				priceRange={priceRange}
				dataMinPrice={dataMinPrice}
				dataMaxPrice={dataMaxPrice}
				anyDistance={anyDistance}
				radiusKm={radiusKm}
				selectedLocation={selectedLocation}
				updateURLParams={updateURLParams}
				setDateRange={setDateRange}
				setPriceRange={setPriceRange}
				setAnyDistance={setAnyDistance}
				setRadiusKm={setRadiusKm}
				setSelectedLocation={setSelectedLocation}
			/>

			{/* Primary (Desktop-first) */}
			<div
				className={cn("hidden flex-col gap-4 md:gap-4", { "lg:flex": isPrimaryView })}
			>
				{/* Search Bar */}
				<form
					onSubmit={handleSearch}
					className="relative flex w-full max-w-lg flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-2"
				>
					<div className="relative w-full md:flex-1">
						<div className="bg-background text-foreground flex items-center gap-2 overflow-hidden rounded-xl border px-2 md:flex-1">
							<Search />
							<input
								ref={searchInputRef}
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setShowSuggestions(true)}
								onClick={() => setShowSuggestions(true)}
								className="text-foreground placeholder:text-foreground w-full flex-1 truncate bg-transparent py-2 outline-none"
								placeholder="Search for events, venues or categories"
							/>
						</div>

						{/* Search Suggestions */}
						{showSuggestions && (
							<div
								ref={suggestionsRef}
								className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border bg-white shadow-lg dark:bg-[#090a11] dark:border-gray-700"
							>
								<div className="p-2">
									<div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
										Suggestions
									</div>
									{SEARCH_SUGGESTIONS.map((suggestion) => {
										const Icon = suggestion.icon;
										return (
											<button
												key={suggestion.id}
												type="button"
												onClick={() => handleSuggestionClick(suggestion.text)}
												className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left cursor-pointer"
											>
												<Icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
												<span className="text-xs text-gray-900 dark:text-gray-100">
													{suggestion.text}
												</span>
											</button>
										);
									})}
								</div>
							</div>
						)}
					</div>
					<Button type="submit" className="">
						Search
					</Button>
				</form>

				{/* Filter Dropdowns */}
				<div className="flex items-center gap-2 overflow-x-auto">
					<CategoryFilterDropdown
						categories={categories}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
					<DateRangeFilterDropdown
						dateRange={dateRange}
						onDateRangeChange={handleDateRangeChange}
					/>
					<PriceRangeFilterDropdown
						priceRange={priceRange}
						onPriceRangeChange={handlePriceRangeChange}
						events={MOCK_EVENTS}
						dataMinPrice={dataMinPrice}
						dataMaxPrice={dataMaxPrice}
					/>
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<SortDropdownComponent
							sortBy={sortBy}
							onSortChange={handleSortChange}
							userLocation={userLocation}
						/>

						<MemoActiveBadges
							query={query}
							categoryFilter={selectedCategories}
							dateRange={dateRange}
							priceRange={priceRange}
							dataMinPrice={dataMinPrice}
							dataMaxPrice={dataMaxPrice}
							userLocation={userLocation}
							anyDistance={anyDistance}
							radiusKm={radiusKm}
							selectedLocation={selectedLocation}
							updateURLParams={updateURLParams}
							setDateRange={setDateRange}
							setPriceRange={setPriceRange}
							setAnyDistance={setAnyDistance}
							setRadiusKm={setRadiusKm}
							setSelectedLocation={setSelectedLocation}
							setSelectedCategories={setSelectedCategories}
						/>
					</div>

					<div className="flex items-end justify-end">
						<Button variant="outline" onClick={handlePrimaryView}>
							Hide Map
						</Button>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="flex flex-1 flex-col gap-4">
						<MemoGridTwo
							events={paginatedEvents}
							isFiltering={false}
							hasActiveFilters={hasActiveFilters}
							onClearAllFilters={clearAllFilters}
							onEventHover={handleEventHover}
						/>

						<EventsPagination
							currentPage={currentPage}
							totalPages={totalPages}
							totalEvents={filteredEvents.length}
							eventsPerPage={eventsPerPage}
							onPageChange={goToPage}
							onNextPage={goToNextPage}
							onPreviousPage={goToPreviousPage}
							onEventsPerPageChange={handleItemsPerPageChange}
						/>
					</div>

					<div className="flex flex-1 flex-col">
						<div className="sticky top-26 flex flex-col">
							<MemoMapSection
								showMap={showMap}
								onToggleMap={toggleMap}
								events={filteredEvents}
								userLocation={userLocation}
								highlightedEventSlug={highlightedSlug || undefined}
								radiusKm={radiusKm}
								anyDistance={anyDistance}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Secondary (Mobile-first) */}
			<div
				className={cn("flex-col gap-4 md:gap-6 lg:gap-10", {
					flex: !isPrimaryView,
					"lg:hidden": isPrimaryView,
				})}
			>
				{/* Search Bar */}
				<form
					onSubmit={handleSearch}
					className="relative flex w-full max-w-lg flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-2"
				>
					<div className="relative w-full md:flex-1">
						<div className="bg-background text-foreground flex items-center gap-2 overflow-hidden rounded-xl border px-2 md:flex-1">
							<Search />
							<input
								ref={searchInputRef}
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setShowSuggestions(true)}
								onClick={() => setShowSuggestions(true)}
								className="text-foreground placeholder:text-foreground w-full flex-1 truncate bg-transparent py-2 outline-none"
								placeholder="Search for events, venues or categories"
							/>
						</div>

						{/* Search Suggestions */}
						{showSuggestions && (
							<div
								ref={suggestionsRef}
								className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border bg-white shadow-lg dark:bg-[#090a11] dark:border-gray-700"
							>
								<div className="p-2">
									<div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
										Suggestions
									</div>
									{SEARCH_SUGGESTIONS.map((suggestion) => {
										const Icon = suggestion.icon;
										return (
											<button
												key={suggestion.id}
												type="button"
												onClick={() => handleSuggestionClick(suggestion.text)}
												className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left cursor-pointer"
											>
												<Icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
												<span className="text-xs text-gray-900 dark:text-gray-100">
													{suggestion.text}
												</span>
											</button>
										);
									})}
								</div>
							</div>
						)}
					</div>
					<Button type="submit" className="">
						Search
					</Button>
				</form>

				{/* Filter Dropdowns */}
				<div className="flex items-center gap-2 overflow-x-auto">
					<CategoryFilterDropdown
						categories={categories}
						selectedCategories={selectedCategories}
						onCategoryToggle={handleCategoryToggle}
					/>
					<DateRangeFilterDropdown
						dateRange={dateRange}
						onDateRangeChange={handleDateRangeChange}
					/>
					<PriceRangeFilterDropdown
						priceRange={priceRange}
						onPriceRangeChange={handlePriceRangeChange}
						events={MOCK_EVENTS}
						dataMinPrice={dataMinPrice}
						dataMaxPrice={dataMaxPrice}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<MemoActiveBadges
							query={query}
							categoryFilter={selectedCategories}
							dateRange={dateRange}
							priceRange={priceRange}
							dataMinPrice={dataMinPrice}
							dataMaxPrice={dataMaxPrice}
							userLocation={userLocation}
							anyDistance={anyDistance}
							radiusKm={radiusKm}
							selectedLocation={selectedLocation}
							updateURLParams={updateURLParams}
							setDateRange={setDateRange}
							setPriceRange={setPriceRange}
							setAnyDistance={setAnyDistance}
							setRadiusKm={setRadiusKm}
							setSelectedLocation={setSelectedLocation}
							setSelectedCategories={setSelectedCategories}
						/>
					</div>

					{/* This “Show Map” button appears only on large screens in secondary view */}
					<div className="hidden flex-col lg:flex">
						<Button variant="outline" onClick={handlePrimaryView}>
							Show Map
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-4">
					<div className="flex flex-1 flex-col gap-6">
						<div className="flex flex-col lg:hidden">
							<MemoMapSection
								showMap={showMap}
								onToggleMap={toggleMap}
								events={filteredEvents}
								userLocation={userLocation}
								radiusKm={radiusKm}
								anyDistance={anyDistance}
							/>
						</div>

						<MemoGrid
							events={paginatedEvents}
							isFiltering={false}
							hasActiveFilters={hasActiveFilters}
							onClearAllFilters={clearAllFilters}
							onEventHover={handleEventHover}
						/>

						<EventsPagination
							currentPage={currentPage}
							totalPages={totalPages}
							totalEvents={filteredEvents.length}
							eventsPerPage={eventsPerPage}
							onPageChange={goToPage}
							onNextPage={goToNextPage}
							onPreviousPage={goToPreviousPage}
							onEventsPerPageChange={handleItemsPerPageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
