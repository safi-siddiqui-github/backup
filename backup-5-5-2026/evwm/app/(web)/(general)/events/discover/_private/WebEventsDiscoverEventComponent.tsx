"use client";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { ChartContainer } from "@/shadcn/ui/chart";
import { Checkbox } from "@/shadcn/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Field, FieldDescription, FieldTitle } from "@/shadcn/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Separator } from "@/shadcn/ui/separator";
import { Slider } from "@/shadcn/ui/slider";

import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/lib-shadcn";
import { format } from "date-fns";
import {
  ArrowDownWideNarrow,
  CalendarHeart,
  CalendarIcon,
  CheckIcon,
  ChevronDown,
  ChevronsUpDownIcon,
  Filter,
  Map,
  MapPin,
  MapPinIcon,
  Search,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
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
import { Bar, BarChart, Cell } from "recharts";
import Image from "next/image";
import { Input } from "@/shadcn/ui/input";
import { Images } from "@/lib/lib-images";
import { getEventCategories, MOCK_EVENTS } from "../../../_private/web-home-healper";
import { MockEventData } from "../../../_private/EventsMockData";

const useEventFilters = () => ({
  priceRange: [0, 100],
  setPriceRange: () => {},
  setPriceRangeWithTracking: () => {},
  hasUserChangedPrice: false,
  radiusKm: 50,
  setRadiusKm: () => {},
  anyDistance: false,
  setAnyDistance: () => {},
  dateRange: undefined,
  setDateRange: () => {},
  selectedCategory: "",
  setSelectedCategory: () => {},
  selectedLocation: "",
  setSelectedLocation: () => {},
  sortBy: "date",
  setSortBy: () => {},
  filteredEvents: MOCK_EVENTS,
  hasActiveFilters: false,
  dataMinPrice: 0,
  dataMaxPrice: 100,
  clearAllFilters: () => {},
});
// fake pagination hook
const useEventPagination = (events: MockEventData[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(6);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(events.length / eventsPerPage));
  }, [events.length, eventsPerPage]);

  const paginatedEvents = useMemo(() => {
    const startIdx = (currentPage - 1) * eventsPerPage;
    return events.slice(startIdx, startIdx + eventsPerPage);
  }, [events, currentPage, eventsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const changeItemsPerPage = (num: number) => {
    setEventsPerPage(num);
    setCurrentPage(1);
  };

  return {
    currentPage,
    eventsPerPage,
    totalPages,
    paginatedEvents,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    changeItemsPerPage,
  };
};
const useURLSync = () => ({
  updateURLParams: (_params?: unknown) => {
    console.log(_params);
  },
});
const useUserLocation = () => ({
  userLocation: undefined,
  locationPermissionDenied: false,
  retryLocation: () => {},
});
const useWindowSize = () => ({ width: 1200 });

 
const MemoFilterSidebar = memo(FilterSidebar);
const MemoMapSection = memo(MapSection);
 

export default function WebDiscoverEventMapComponent() {
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
    setPriceRangeWithTracking,
    hasUserChangedPrice,
    radiusKm,
    setRadiusKm,
    anyDistance,
    setAnyDistance,
    dateRange,
    setDateRange,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,
    filteredEvents,
    hasActiveFilters,
    dataMinPrice,
    dataMaxPrice,
    clearAllFilters,
  } = useEventFilters();

  const eventGridPrimaryRef = useRef<HTMLDivElement>(null);
  const eventGridSecondaryRef = useRef<HTMLDivElement>(null);
  const {
    currentPage,
    eventsPerPage,
    totalPages,
    paginatedEvents,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = useEventPagination(filteredEvents);

  // Scroll to event grid top on page change (primary/secondary view)
  const scrollToEventGrid = useCallback(() => {
    // Try both refs, scroll the one that's visible
    if (
      eventGridPrimaryRef.current &&
      eventGridPrimaryRef.current.offsetParent !== null
    ) {
      eventGridPrimaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (
      eventGridSecondaryRef.current &&
      eventGridSecondaryRef.current.offsetParent !== null
    ) {
      eventGridSecondaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      goToPage(page);
      setTimeout(scrollToEventGrid, 0);
    },
    [goToPage, scrollToEventGrid]
  );

  const handleNextPage = useCallback(() => {
    goToNextPage();
    setTimeout(scrollToEventGrid, 0);
  }, [goToNextPage, scrollToEventGrid]);

  const handlePreviousPage = useCallback(() => {
    goToPreviousPage();
    setTimeout(scrollToEventGrid, 0);
  }, [goToPreviousPage, scrollToEventGrid]);

  // UI State
  const [showFilter, setShowFilter] = useState(false); // used by sidebar + dropdown content
  const [showMap, setShowMap] = useState(true);
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  // Responsive layout
  const { width } = useWindowSize();
  const [isPrimaryView, setIsPrimaryView] = useState(true);
  // Transition to keep UI responsive
  const [, startTransition] = useTransition();

  const categories = useMemo(() => getEventCategories(), []);
  const locations = useMemo(() => {
    const locs = MOCK_EVENTS.map((e) => e.locationMap).filter(
      Boolean
    ) as string[];
    return Array.from(new Set(locs));
  }, []);

  // Desktop defaults
  useEffect(() => {
    if (width >= 1024) {
      setShowFilter(true);
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
        setPriceRangeWithTracking();
      });
    },
    [setPriceRangeWithTracking]
  );

  const handleDateRangeChange = useCallback(
    (range: DateRange | undefined) => {
      startTransition(() => setDateRange());
      updateURLParams({
        dateFrom: range?.from ? format(range.from, "yyyy-MM-dd") : "",
        dateTo: range?.to ? format(range.to, "yyyy-MM-dd") : "",
      });
    },
    [setDateRange, updateURLParams]
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      startTransition(() => setSelectedCategory());
      updateURLParams({ category });
    },
    [setSelectedCategory, updateURLParams]
  );

 

  const handleSortChange = useCallback(
    (value: string) => {
      startTransition(() => setSortBy());
    },
    [setSortBy]
  );

  

  const toggleFilter = useCallback(() => setShowFilter((p) => !p), []);
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

  // Active filters count (badge)
  const activeFiltersCount = useMemo(
    () =>
      [
        query && 1,
        categoryFilter && 1,
        dateRange && 1,
        (priceRange[0] !== dataMinPrice || priceRange[1] !== dataMaxPrice) && 1,
        userLocation && !anyDistance && radiusKm !== 50 && 1,
        selectedLocation && 1,
      ].filter(Boolean).length,
    [
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
    ]
  );

  function onEventHover(arg0: string | null): void {
    setHighlightedSlug(arg0);
  }

  return (
    <div className="flex flex-col gap-10">
      <div ref={eventGridSecondaryRef} />

      {/* Primary (Desktop-first) */}
      <div
        className={cn("hidden flex-col gap-10", { "lg:flex": isPrimaryView })}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex   gap-4 flex-col ">
              <SearchComponent />
              <div className="flex items-center gap-2 w-full">
                <SortDropdownComponent
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  userLocation={userLocation ?? null}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Filter />
                      Filters
                      {hasActiveFilters && (
                        <span className="bg-primary text-primary-foreground ml-2 rounded-full px-2 py-0.5 text-xs">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[24rem] p-0" align="start">
                    <ExploreEventFilterComponent
                      showFilter={true}
                      onToggleFilter={() => {}}
                      hasActiveFilters={hasActiveFilters}
                      activeFiltersCount={activeFiltersCount}
                      categories={categories}
                      selectedCategory={selectedCategory}
                      categoryFilter={categoryFilter}
                      onCategorySelect={handleCategorySelect}
                      dateRange={dateRange}
                      onDateRangeChange={handleDateRangeChange}
                      priceRange={priceRange as [number, number]}
                      onPriceRangeChange={handlePriceRangeChange}
                      events={MOCK_EVENTS}
                      dataMinPrice={dataMinPrice}
                      dataMaxPrice={dataMaxPrice}
                      radiusKm={radiusKm}
                      onRadiusChange={setRadiusKm}
                      anyDistance={anyDistance}
                      onAnyDistanceChange={setAnyDistance}
                      userLocation={userLocation ?? null}
                      locationPermissionDenied={locationPermissionDenied}
                      onLocationPermissionRetry={retryLocation}
                      locations={locations}
                      selectedLocation={selectedLocation}
                      onLocationSelect={setSelectedLocation}
                      onClearAllFilters={clearAllFilters}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button variant="outline" onClick={handlePrimaryView}>
              Hide Map
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
              {paginatedEvents.map((event, index) => (
                <div
                  key={`${event.slug || ""}-${index}`}
                  onMouseEnter={() => onEventHover?.(event.slug || null)}
                  onMouseLeave={() => onEventHover?.(null)}
                >
                  <EventCardComponent item={event} distanceKm={3} />
                </div>
              ))}
            </div>

            <EventsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalEvents={filteredEvents.length}
              eventsPerPage={eventsPerPage}
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="sticky top-26 flex flex-col">
              <MemoMapSection showMap={showMap} onToggleMap={toggleMap} />
              
            </div>
          </div>
        </div>
      </div>

      {/* Secondary (Mobile-first) */}
      <div
        className={cn("flex-col gap-10", {
          flex: !isPrimaryView,
          "lg:hidden": isPrimaryView,
        })}
      >
        <div className="flex items-center justify-between">
          <div className="hidden flex-col lg:flex">
            <Button variant="outline" onClick={handlePrimaryView}>
              Show Map
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-4">
        <div className="flex flex-col space-y-2">
          <SearchComponent />

          <MemoFilterSidebar
            showFilter={showFilter}
            onToggleFilter={toggleFilter}
            hasActiveFilters={hasActiveFilters}
            activeFiltersCount={activeFiltersCount}
            categories={categories}
            selectedCategory={selectedCategory}
            categoryFilter={categoryFilter}
            onCategorySelect={handleCategorySelect}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            priceRange={priceRange as [number, number]}
            onPriceRangeChange={handlePriceRangeChange}
            events={MOCK_EVENTS}
            dataMinPrice={dataMinPrice}
            dataMaxPrice={dataMaxPrice}
            radiusKm={radiusKm}
            onRadiusChange={setRadiusKm}
            anyDistance={anyDistance}
            onAnyDistanceChange={setAnyDistance}
            userLocation={userLocation ?? null}
            locationPermissionDenied={locationPermissionDenied}
            onLocationPermissionRetry={retryLocation}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            onClearAllFilters={clearAllFilters}
          />
        </div>

          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col lg:hidden">
              <MemoMapSection showMap={showMap} onToggleMap={toggleMap} />
            </div>

            

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {paginatedEvents.map((event, index) => (
        <div
          key={`${event.slug || ""}-${index}`}
          onMouseEnter={() => onEventHover?.(event.slug || null)}
          onMouseLeave={() => onEventHover?.(null)}
        >
          <EventCardComponent item={event} distanceKm={3} />
        </div>
      ))}
    </div>

            <EventsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalEvents={filteredEvents.length}
              eventsPerPage={eventsPerPage}
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

function SortDropdownComponent({
  sortBy,
  onSortChange,
  userLocation,
}: {
  sortBy: string;
  onSortChange: (value: string) => void;
  userLocation: Coordinates | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ArrowDownWideNarrow />
          <span>Sort By</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
          {userLocation && (
            <DropdownMenuRadioItem value="distance">
              Distance
            </DropdownMenuRadioItem>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SearchComponent() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => setShowSuggestions(true);
  const handleBlur = () => {
    // Delay hiding to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 100);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <form className="relative flex items-center w-full ">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="text-muted-foreground w-4 h-4" />
      </span>
      <Input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search events..."
        className="pl-10 pr-3 py-2 w-full max-w-xl"
        aria-label="Search events"
        type="search"
        name="q"
        autoComplete="off"
      />
      <Button type="submit" className="ml-2 dark:bg-white dark:text-black">
        Search
      </Button>
      {showSuggestions && (
        <div className="absolute left-0 top-full mt-2 w-full max-w-xl rounded-lg border bg-white shadow-lg z-50 dark:bg-black">
          <ul className="py-2">
            <h1 className="px-2 py-2 font-semibold border-b">Suggestions</h1>
            {[
              "Music Festival",
              "Tech Conference",
              "Food & Drink",
              "Art Exhibition",
            ]
              .filter((s) =>
                s.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((suggestion) => (
                <li
                  key={suggestion}
                  className="cursor-pointer px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            {[
              "Music Festival",
              "Tech Conference",
              "Food & Drink",
              "Art Exhibition",
            ].filter((s) => s.toLowerCase().includes(searchValue.toLowerCase()))
              .length === 0 && (
              <li className="px-4 py-2 text-muted-foreground">
                No suggestions
              </li>
            )}
          </ul>
        </div>
      )}
    </form>
  );
}

type FilterSidebarProps = {
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
};

function ExploreEventFilterComponent({
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
    <div className="bg-background flex h-full flex-col gap-4 overflow-auto rounded-xl p-4">
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

function CategoryFilterComponent({
  categories,
  selectedCategory,
  categoryFilter,
  onCategorySelect,
}: {
  categories: string[];
  selectedCategory: string;
  categoryFilter: string;
  onCategorySelect: (category: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-medium">Category</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="justify-between">
            <span>
              {selectedCategory || categoryFilter || "All categories"}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((cat) => (
                  <CommandItem key={cat} onSelect={() => onCategorySelect(cat)}>
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        categoryFilter === cat ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {cat}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

type DateRangeFilterComponentProps = {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
};

function DateRangeFilterComponent({
  dateRange,
  onDateRangeChange,
}: DateRangeFilterComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-medium">Date Range</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal"
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {dateRange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDateRangeChange(undefined)}
          className="w-fit"
        >
          <X className="mr-1 h-4 w-4" />
          Clear dates
        </Button>
      )}
    </div>
  );
}

type DistanceFilterComponentProps = {
  radiusKm: number;
  onRadiusChange: (value: number) => void;
  anyDistance: boolean;
  onAnyDistanceChange: (value: boolean) => void;
  userLocation: Coordinates | null;
  locationPermissionDenied: boolean;
  onLocationPermissionRetry: () => void;
};

function DistanceFilterComponent({
  radiusKm,
  onRadiusChange,
  anyDistance,
  onAnyDistanceChange,
  userLocation,
  locationPermissionDenied,
  onLocationPermissionRetry,
}: DistanceFilterComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      <Field>
        <FieldTitle className="text-lg">Distance</FieldTitle>
        <div className="mb-2 flex items-center space-x-2">
          <Checkbox
            id="any-distance"
            checked={anyDistance}
            onCheckedChange={onAnyDistanceChange}
          />
          <label
            htmlFor="any-distance"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Any distance
          </label>
        </div>
        {!userLocation && locationPermissionDenied && (
          <Button
            variant="outline"
            size="sm"
            onClick={onLocationPermissionRetry}
            className="mb-2"
          >
            <MapPinIcon className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        )}
        {!anyDistance && (
          <>
            <FieldDescription>Within {radiusKm} km</FieldDescription>
            <Slider
              value={[radiusKm]}
              onValueChange={([value]) => onRadiusChange(value)}
              max={500}
              min={5}
              step={5}
              className="mt-2 w-full"
              aria-label="Distance Radius"
            />
          </>
        )}
      </Field>
    </div>
  );
}

type PriceRangeFilterComponentProps = {
  priceRange: [number, number];
  onPriceRangeChange: (value: number[]) => void;
  events: MockEventData[];
  dataMinPrice: number;
  dataMaxPrice: number;
};

function PriceRangeFilterComponent({
  priceRange,
  onPriceRangeChange,
  events,
  dataMinPrice,
  dataMaxPrice,
}: PriceRangeFilterComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      <Field>
        <FieldTitle className="text-lg">Price range</FieldTitle>
        <FieldDescription className="text-muted-foreground text-sm">
          Trip price, includes all fees
        </FieldDescription>
        <PriceHistogram
          events={events}
          minPrice={dataMinPrice}
          maxPrice={dataMaxPrice}
          selectedMin={priceRange[0]}
          selectedMax={priceRange[1]}
          className="my-2"
        />
        <Slider
          value={priceRange}
          onValueChange={onPriceRangeChange}
          max={dataMaxPrice}
          min={dataMinPrice}
          step={5}
          className="mt-2 w-full"
          aria-label="Price Range"
        />
        <div className="mt-4 flex justify-between">
          <div className="flex flex-col items-center">
            <label className="text-muted-foreground mb-1 text-sm">
              Minimum
            </label>
            <div className="bg-muted rounded-lg px-4 py-2 font-semibold">
              ${priceRange[0]}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label className="text-muted-foreground mb-1 text-sm">
              Maximum
            </label>
            <div className="bg-muted rounded-lg px-4 py-2 font-semibold">
              ${priceRange[1]}
              {priceRange[1] === dataMaxPrice ? "+" : ""}
            </div>
          </div>
        </div>
      </Field>
    </div>
  );
}

type PriceHistogramProps = {
  readonly events: MockEventData[];
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly className?: string;
  readonly selectedMin?: number;
  readonly selectedMax?: number;
};
type HistogramBucket = {
  readonly range: number;
  readonly start: number;
  readonly end: number;
  readonly center: number;
  count: number;
  readonly inRange: boolean;
};

function PriceHistogram({
  events,
  minPrice,
  maxPrice,
  className = "",
  selectedMin,
  selectedMax,
}: PriceHistogramProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver to fix the chart warning
  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (!entry) return;

    const { width, height } = entry.contentRect;
    setIsVisible(width > 0 && height > 0);
  }, []);

  // Check if container is visible and has dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [handleResize]);

  const histogramData = useMemo((): HistogramBucket[] => {
    const bucketCount = 20;
    const bucketSize = (maxPrice - minPrice) / bucketCount;

    if (bucketSize <= 0) {
      return [];
    }

    const buckets: HistogramBucket[] = Array.from(
      { length: bucketCount },
      (_, i) => {
        const start = minPrice + i * bucketSize;
        const end = start + bucketSize;
        const center = (start + end) / 2;
        const inRange =
          selectedMin !== undefined && selectedMax !== undefined
            ? center >= selectedMin && center <= selectedMax
            : true;
        return {
          range: start,
          start,
          end,
          center,
          count: 0,
          inRange,
        };
      }
    );

    events.forEach((event) => {
      const bucketIndex = Math.min(
        Math.floor((event.price - minPrice) / bucketSize),
        bucketCount - 1
      );
      if (bucketIndex >= 0 && bucketIndex < bucketCount) {
        buckets[bucketIndex].count += 1;
      }
    });

    return buckets;
  }, [events, minPrice, maxPrice, selectedMin, selectedMax]);

  const chartConfig = useMemo(
    () => ({
      count: {
        label: "Events",
        color: "black",
      },
    }),
    []
  );

  return (
    <div className={className}>
      <div ref={containerRef} className="h-16 min-h-16 w-full min-w-50">
        {isVisible && histogramData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              data={histogramData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <Bar dataKey="count" fill="#7C3AED" radius={[0, 0, 0, 0]}>
                {histogramData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.inRange ? "#7C3AED" : "#E5E7EB"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="bg-muted flex h-full w-full animate-pulse items-center justify-center rounded">
            <span className="text-muted-foreground text-sm">
              {histogramData.length === 0
                ? "No data available"
                : "Loading chart..."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

type LocationFilterComponentProps = {
  locations: string[];
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
  userLocation?: Coordinates | null;
};

const USE_MY_LOCATION_TEXT = "Use my current location";

function LocationFilterComponent({
  locations,
  selectedLocation,
  onLocationSelect,
  userLocation,
}: LocationFilterComponentProps) {
  const handleSelect = (value: string) => {
    if (value === USE_MY_LOCATION_TEXT) {
      // Clear selectedLocation to use user's current location
      onLocationSelect("");
    } else {
      onLocationSelect(value);
    }
  };

  // Check if userLocation is actually available (has coordinates)
  const hasUserLocation =
    userLocation !== null &&
    userLocation !== undefined &&
    userLocation.latitude !== undefined &&
    userLocation.longitude !== undefined;

  const isUsingMyLocation = !selectedLocation && hasUserLocation;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-medium">Location</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="justify-between">
            <span>
              {isUsingMyLocation
                ? USE_MY_LOCATION_TEXT
                : selectedLocation || "All locations"}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {/* "Use my current location" option - only show if userLocation is available */}
                {hasUserLocation && (
                  <CommandItem
                    key={USE_MY_LOCATION_TEXT}
                    value={USE_MY_LOCATION_TEXT}
                    onSelect={() => handleSelect(USE_MY_LOCATION_TEXT)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        isUsingMyLocation ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {USE_MY_LOCATION_TEXT}
                  </CommandItem>
                )}
                {locations.map((loc) => (
                  <CommandItem
                    key={loc}
                    value={loc}
                    onSelect={() => handleSelect(loc)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLocation === loc ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {loc}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ------------- Filter Sidebar Component Ends Here -------------

function FilterSidebar({
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
    <div className="bg-background flex flex-col gap-4 rounded-xl border p-4 lg:sticky lg:top-29 lg:max-h-[calc(100vh-8rem)] lg:max-w-xs lg:flex-1 lg:overflow-y-auto">
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

function MapSection({
  showMap = true,
  onToggleMap,
}: {
  showMap: boolean;
  onToggleMap: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center lg:hidden">
        <Button
          variant="outline"
          onClick={onToggleMap}
          className="flex items-center gap-2"
        >
          <Map className="h-4 w-4" />
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>
      {/* Map Placeholder */}
      {showMap && (
        <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-blue-100 to-blue-300 xl:h-125 2xl:h-175">
          <div className="flex flex-col items-center">
            <Map className="mb-2 h-16 w-16 text-blue-400" />
            <span className="text-lg font-semibold text-blue-900">
              Map Placeholder
            </span>
            <span className="text-xs text-blue-700">
              (UI only, no map functionality)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

type EventsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalEvents: number;
  eventsPerPage: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

function EventsPagination({
  currentPage,
  totalPages,
  totalEvents,
  eventsPerPage,
  onPageChange,
  onNextPage,
  onPreviousPage,
}: EventsPaginationProps) {
  if (totalEvents === 0) return null;
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={onPreviousPage}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const isCurrentPage = page === currentPage;
            const showPage =
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1;

            if (!showPage) {
              if (page === 2 && currentPage > 4) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <span className="px-2">...</span>
                  </PaginationItem>
                );
              }
              if (page === totalPages - 1 && currentPage < totalPages - 3) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <span className="px-2">...</span>
                  </PaginationItem>
                );
              }
              return null;
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={isCurrentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={onNextPage}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-muted-foreground text-sm">
        Showing {(currentPage - 1) * eventsPerPage + 1} to{" "}
        {Math.min(currentPage * eventsPerPage, totalEvents)} of {totalEvents}{" "}
        events
      </p>
    </div>
  );
}

type EventCardType = {
  item: Partial<MockEventData>;
  disableLink?: boolean;
  disableOrganizerLink?: boolean;
  distanceKm?: number;
};

function EventCardComponent(props: EventCardType) {
  //
  const item = props.item;
  const eventLink = `${Routes.web.general.eventsDiscover}/${item.slug || "event"}`;

  const cardContent = (
    <div className="relative cursor-pointer flex-col transition-transform duration-300 hover:scale-105">
      {/* Main Card Content */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-2xl transition-all duration-300 hover:border-pink-400/50 dark:hover:border-purple-400/50">
        {/* Event Image - Optimized with next/image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl lg:h-56">
          <Image
            src={item.imageUrl || Images.asset.page.background}
            alt={item.name || "Event image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={item.featured}
            loading={item.featured ? "eager" : "lazy"}
          />

          {/* Featured Tag */}
          {item.featured && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <Star className="h-3.5 w-3.5 fill-white" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="mt-2 flex flex-col gap-1 bg-gray-950 p-3 text-gray-900 dark:text-white">
          {/* Event Title */}
          <h3 className="line-clamp-1 text-base font-semibold text-white xl:text-lg 2xl:text-xl">
            {item.name}
          </h3>
          {/* Category */}
          {item.category && (
            <p className="text-xs text-gray-400 dark:text-gray-400 xl:text-sm">
              {item.category}
            </p>
          )}
          {/* Date */}
          <div className="flex items-center gap-1 text-xs tracking-tighter text-gray-400 dark:text-gray-400 xl:text-sm">
            <CalendarHeart className="h-3 w-3 text-pink-400 dark:text-pink-500 xl:h-4 xl:w-4" />
            <p>{item.startDate}</p>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1 text-xs tracking-tighter text-gray-400 dark:text-gray-400 xl:text-sm">
            <MapPin className="h-3 w-3 text-cyan-400 dark:text-cyan-500 xl:h-4 xl:w-4" />
            <p>{item.locationMap}</p>
          </div>
          {/* Price */}
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs tracking-tighter text-gray-400 dark:text-gray-400">
              From
            </span>
            <p className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-base font-bold text-transparent xl:text-lg 2xl:text-xl">
              ${item.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (props.disableLink) {
    return cardContent;
  }

  return <Link href={eventLink}>{cardContent}</Link>;
}

 
