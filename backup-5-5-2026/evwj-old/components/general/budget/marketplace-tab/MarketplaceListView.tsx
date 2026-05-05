"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal, Grid3x3, List, X, MapPin, Users } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import PaginationControls from "@/components/ui/pagination-controls";
import MarketplaceCard from "./MarketplaceCard";
import VendorProfileModal from "./VendorProfileModal";
import { BudgetItem } from "../budget-tab/BudgetPlanningView";

export interface MarketplaceVendor {
	id: string;
	name: string;
	location: string;
	description: string;
	images: string[];
	rating: number;
	reviewCount: number;
	pricing: 1 | 2 | 3 | 4; // $ $$ $$$ $$$$
	categories: string[];
	serviceTypes: string[]; // e.g., "Venue", "Photography", "Catering"
	badges: {
		verified: boolean;
		topRated: boolean;
		hostsFavorite: boolean;
		risingStar: boolean;
	};
	eventsCount: number;
	established: number;
	estimatedGuests?: string;
	minGuests?: number;
	maxGuests?: number;
}

type BadgeFilter = "verified" | "topRated" | "hostsFavorite" | "risingStar";
type RatingFilter = 5 | 4 | 3 | 2 | 1;

interface MarketplaceListViewProps {
	budgetItems?: BudgetItem[];
}

export default function MarketplaceListView({
	budgetItems = [],
}: MarketplaceListViewProps) {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOrder, setSortOrder] = useState<"rating" | "newest" | "events">(
		"rating",
	);

	// Filters
	const [selectedBadges, setSelectedBadges] = useState<BadgeFilter[]>([]);
	const [selectedRating, setSelectedRating] = useState<RatingFilter | null>(
		null,
	);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
	const [guestCountRange, setGuestCountRange] = useState<[number, number]>([0, 10000]);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [selectedVendor, setSelectedVendor] =
		useState<MarketplaceVendor | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Mock vendors data
	const [vendors] = useState<MarketplaceVendor[]>([
		{
			id: "1",
			name: "Elegant Venues Inc.",
			location: "New York, NY",
			description:
				"Premier venue provider with elegant spaces for weddings and corporate events.",
			images: [
				"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
				"https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
			],
			rating: 4.8,
			reviewCount: 128,
			pricing: 3,
			categories: ["Weddings", "Corporate Events", "Galas"],
			serviceTypes: ["Venue"],
			badges: {
				verified: true,
				topRated: false,
				hostsFavorite: true,
				risingStar: false,
			},
			eventsCount: 350,
			established: 2005,
			estimatedGuests: "100-500",
			minGuests: 100,
			maxGuests: 500,
		},
		{
			id: "2",
			name: "Gourmet Catering Services",
			location: "Los Angeles, CA",
			description:
				"Exquisite catering services with customizable menus for all occasions.",
			images: [
				"https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
				"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
				"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
			],
			rating: 4.6,
			reviewCount: 95,
			pricing: 2,
			categories: ["Catering", "Corporate Events", "Private Parties"],
			serviceTypes: ["Catering"],
			badges: {
				verified: true,
				topRated: false,
				hostsFavorite: false,
				risingStar: false,
			},
			eventsCount: 280,
			established: 2010,
			minGuests: 20,
			maxGuests: 300,
		},
		{
			id: "3",
			name: "Pixel Perfect Photography",
			location: "Chicago, IL",
			description:
				"Professional photography and videography services capturing your special moments.",
			images: [
				"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
				"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
				"https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
			],
			rating: 4.9,
			reviewCount: 150,
			pricing: 3,
			categories: ["Weddings", "Corporate Events", "Family Portraits"],
			serviceTypes: ["Photography", "Videography"],
			badges: {
				verified: true,
				topRated: true,
				hostsFavorite: false,
				risingStar: false,
			},
			eventsCount: 400,
			established: 2000,
			minGuests: 10,
			maxGuests: 1000,
		},
		{
			id: "4",
			name: "Floral Fantasies",
			location: "Miami, FL",
			description:
				"Creative floral designs and decor for weddings and special events.",
			images: [
				"https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
				"https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=800",
				"https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800",
			],
			rating: 4.7,
			reviewCount: 82,
			pricing: 2,
			categories: ["Weddings", "Private Parties"],
			serviceTypes: ["Florist", "Decor & Rentals"],
			badges: {
				verified: true,
				topRated: false,
				hostsFavorite: false,
				risingStar: false,
			},
			eventsCount: 230,
			established: 2015,
			minGuests: 25,
			maxGuests: 200,
		},
		{
			id: "5",
			name: "Sonic Boom Entertainment",
			location: "Austin, TX",
			description:
				"DJ and entertainment services bringing energy to every celebration.",
			images: [
				"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
				"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
				"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
			],
			rating: 4.5,
			reviewCount: 67,
			pricing: 1,
			categories: ["Corporate Events", "Private Parties"],
			serviceTypes: ["DJ / Music", "Entertainment"],
			badges: {
				verified: true,
				topRated: false,
				hostsFavorite: false,
				risingStar: true,
			},
			eventsCount: 180,
			established: 2018,
			minGuests: 50,
			maxGuests: 500,
		},
	]);

	// Derived list of unique service categories from vendors
	const allCategories = useMemo(
		() =>
			Array.from(
				new Set(
					vendors
						.flatMap((v) => v.categories ?? [])
						.filter(Boolean) as string[],
				),
			).sort(),
		[vendors],
	);

	// Derived list of unique service types from vendors
	const allServiceTypes = useMemo(
		() =>
			Array.from(
				new Set(
					vendors
						.flatMap((v) => v.serviceTypes ?? [])
						.filter(Boolean) as string[],
				),
			).sort(),
		[vendors],
	);

	// Derived list of unique locations from vendors
	const allLocations = useMemo(
		() =>
			Array.from(
				new Set(
					vendors
						.map((v) => v.location)
						.filter(Boolean) as string[],
				),
			).sort(),
		[vendors],
	);

	// Calculate min/max guest counts from vendors
	const guestCountRangeData = useMemo(() => {
		const allMinGuests = vendors
			.map((v) => v.minGuests)
			.filter((g): g is number => g !== undefined);
		const allMaxGuests = vendors
			.map((v) => v.maxGuests)
			.filter((g): g is number => g !== undefined);
		const min = allMinGuests.length > 0 ? Math.min(...allMinGuests) : 0;
		const max = allMaxGuests.length > 0 ? Math.max(...allMaxGuests) : 10000;
		return { min, max };
	}, [vendors]);

	// Toggle badge filter
	const toggleBadgeFilter = (badge: BadgeFilter) => {
		setSelectedBadges((prev) =>
			prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge],
		);
	};

	// Toggle service type filter
	const toggleServiceTypeFilter = (serviceType: string) => {
		setSelectedServiceTypes((prev) =>
			prev.includes(serviceType)
				? prev.filter((s) => s !== serviceType)
				: [...prev, serviceType],
		);
	};

	// Toggle service category filter
	const toggleCategoryFilter = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	// Toggle location filter
	const toggleLocationFilter = (location: string) => {
		setSelectedLocations((prev) =>
			prev.includes(location)
				? prev.filter((l) => l !== location)
				: [...prev, location],
		);
	};

	// Clear all filters
	const clearAllFilters = () => {
		setSelectedBadges([]);
		setSelectedRating(null);
		setSelectedCategories([]);
		setSelectedServiceTypes([]);
		setSelectedLocations([]);
		setGuestCountRange([guestCountRangeData.min, guestCountRangeData.max]);
	};

	// Get filtered vendors
	const getFilteredVendors = () => {
		let filtered = vendors;

		// Search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(v) =>
					v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
					v.categories.some((c) =>
						c.toLowerCase().includes(searchQuery.toLowerCase()),
					),
			);
		}

		// Badge filters
		if (selectedBadges.length > 0) {
			filtered = filtered.filter((v) =>
				selectedBadges.every((badge) => v.badges[badge]),
			);
		}

		// Service type filters
		if (selectedServiceTypes.length > 0) {
			filtered = filtered.filter((v) =>
				v.serviceTypes?.some((s) => selectedServiceTypes.includes(s)),
			);
		}

		// Service category filters
		if (selectedCategories.length > 0) {
			filtered = filtered.filter((v) =>
				v.categories.some((c) => selectedCategories.includes(c)),
			);
		}

		// Location filters
		if (selectedLocations.length > 0) {
			filtered = filtered.filter((v) =>
				selectedLocations.includes(v.location),
			);
		}

		// Guest count filter
		if (guestCountRange[0] > guestCountRangeData.min || guestCountRange[1] < guestCountRangeData.max) {
			filtered = filtered.filter((v) => {
				const minGuests = v.minGuests ?? 0;
				const maxGuests = v.maxGuests ?? 10000;
				// Check if vendor's guest range overlaps with selected range
				return (
					(minGuests >= guestCountRange[0] && minGuests <= guestCountRange[1]) ||
					(maxGuests >= guestCountRange[0] && maxGuests <= guestCountRange[1]) ||
					(minGuests <= guestCountRange[0] && maxGuests >= guestCountRange[1])
				);
			});
		}

		// Rating filter
		if (selectedRating) {
			filtered = filtered.filter((v) => v.rating >= selectedRating);
		}

		// Sort
		filtered = [...filtered].sort((a, b) => {
			if (sortOrder === "rating") {
				return b.rating - a.rating;
			} else if (sortOrder === "newest") {
				return b.established - a.established;
			} else if (sortOrder === "events") {
				return b.eventsCount - a.eventsCount;
			}
			return 0;
		});

		return filtered;
	};

	const filteredVendors = getFilteredVendors();
	const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
	const paginatedVendors = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredVendors.slice(startIndex, endIndex);
	}, [filteredVendors, currentPage, itemsPerPage]);

	const activeFilterCount =
		selectedBadges.length +
		selectedServiceTypes.length +
		selectedCategories.length +
		selectedLocations.length +
		(guestCountRange[0] > guestCountRangeData.min || guestCountRange[1] < guestCountRangeData.max ? 1 : 0) +
		(selectedRating ? 1 : 0);

	return (
		<div className="space-y-6">
			{/* Search and Controls */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				{/* Search Bar */}
				<div className="relative flex-1 max-w-md rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search vendors, services, or specialties..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8 pr-2 py-2 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
					/>
				</div>

				{/* Controls */}
				<div className="flex gap-2">
					{/* Sort Order */}
					<Select
						value={sortOrder}
						onValueChange={(value: "rating" | "newest" | "events") =>
							setSortOrder(value)
						}
					>
						<SelectTrigger className="w-[180px] bg-white dark:bg-[#020617]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="rating">Highest Rated</SelectItem>
							<SelectItem value="events">Most Events</SelectItem>
							<SelectItem value="newest">Newest</SelectItem>
						</SelectContent>
					</Select>

					{/* Filters Button */}
					<Button
						variant="outline"
						size="icon"
						onClick={() => setFiltersOpen(!filtersOpen)}
						className="relative bg-white dark:bg-[#020617]"
					>
						<SlidersHorizontal className="h-4 w-4" />
						{activeFilterCount > 0 && (
							<Badge
								variant="destructive"
								className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
							>
								{activeFilterCount}
							</Badge>
						)}
					</Button>

					{/* View Mode Toggle */}
					<div className="flex rounded-md border">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="icon"
							onClick={() => setViewMode("grid")}
							className={
								viewMode === "grid"
									? "rounded-r-none bg-blue-600 hover:bg-blue-700"
									: "rounded-r-none"
							}
						>
							<Grid3x3 className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="icon"
							onClick={() => setViewMode("list")}
							className={
								viewMode === "list"
									? "rounded-l-none bg-blue-600 hover:bg-blue-700"
									: "rounded-l-none"
							}
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Collapsible Filters Bar */}
			<Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
				<CollapsibleContent>
					<div className="space-y-6 rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
						{/* Header */}
						<div className="flex items-center justify-between">
							<h4 className="font-semibold">Filters</h4>
							{activeFilterCount > 0 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={clearAllFilters}
									className="h-8 px-2 text-xs"
								>
									Clear All
								</Button>
							)}
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{/* Badge Filters */}
							<div className="space-y-3">
								<Label className="text-sm font-semibold">Badge</Label>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox
											id="verified"
											checked={selectedBadges.includes("verified")}
											onCheckedChange={() => toggleBadgeFilter("verified")}
										/>
										<Label htmlFor="verified" className="text-sm">
											Verified
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox
											id="topRated"
											checked={selectedBadges.includes("topRated")}
											onCheckedChange={() => toggleBadgeFilter("topRated")}
										/>
										<Label htmlFor="topRated" className="text-sm">
											Top Rated
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox
											id="hostsFavorite"
											checked={selectedBadges.includes("hostsFavorite")}
											onCheckedChange={() => toggleBadgeFilter("hostsFavorite")}
										/>
										<Label htmlFor="hostsFavorite" className="text-sm">
											Host&apos;s Favorite
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox
											id="risingStar"
											checked={selectedBadges.includes("risingStar")}
											onCheckedChange={() => toggleBadgeFilter("risingStar")}
										/>
										<Label htmlFor="risingStar" className="text-sm">
											Rising Star
										</Label>
									</div>
								</div>
							</div>

							{/* Service Type Filters */}
							<div className="space-y-3">
								<Label className="text-sm font-semibold flex items-center gap-2">
									Service Type
								</Label>
								<Accordion
									type="single"
									collapsible
									className="w-full rounded-md border bg-background/60"
								>
									<AccordionItem value="service-types">
										<AccordionTrigger className="px-3 py-2 text-sm">
											Browse service types
										</AccordionTrigger>
										<AccordionContent>
											<div className="mt-2 max-h-48 space-y-2 overflow-y-auto pr-1">
												{allServiceTypes.map((serviceType) => (
													<div
														key={serviceType}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`service-type-${serviceType}`}
															checked={selectedServiceTypes.includes(serviceType)}
															onCheckedChange={() =>
																toggleServiceTypeFilter(serviceType)
															}
														/>
														<Label
															htmlFor={`service-type-${serviceType}`}
															className="text-sm"
														>
															{serviceType}
														</Label>
													</div>
												))}
												{allServiceTypes.length === 0 && (
													<p className="text-xs text-muted-foreground">
														No service types available yet.
													</p>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>

							{/* Location Filters */}
							<div className="space-y-3">
								<Label className="text-sm font-semibold flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									Location
								</Label>
								<Accordion
									type="single"
									collapsible
									className="w-full rounded-md border bg-background/60"
								>
									<AccordionItem value="locations">
										<AccordionTrigger className="px-3 py-2 text-sm">
											Browse locations
										</AccordionTrigger>
										<AccordionContent>
											<div className="mt-2 max-h-48 space-y-2 overflow-y-auto pr-1">
												{allLocations.map((location) => (
													<div
														key={location}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`location-${location}`}
															checked={selectedLocations.includes(location)}
															onCheckedChange={() =>
																toggleLocationFilter(location)
															}
														/>
														<Label
															htmlFor={`location-${location}`}
															className="text-sm"
														>
															{location}
														</Label>
													</div>
												))}
												{allLocations.length === 0 && (
													<p className="text-xs text-muted-foreground">
														No locations available yet.
													</p>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>

							{/* Guest Count Filter */}
							<div className="space-y-3">
								<Label className="text-sm font-semibold flex items-center gap-2">
									<Users className="h-4 w-4" />
									Guest Count
								</Label>
								<div className="space-y-3 px-2">
									<Slider
										value={[guestCountRange[0], guestCountRange[1]]}
										onValueChange={(value) =>
											setGuestCountRange([value[0], value[1]])
										}
										min={guestCountRangeData.min}
										max={guestCountRangeData.max}
										step={10}
										className="w-full"
									/>
									<div className="flex items-center justify-between text-xs text-muted-foreground">
										<span>{guestCountRange[0].toLocaleString()}</span>
										<span>{guestCountRange[1].toLocaleString()}</span>
									</div>
									<div className="flex items-center gap-2 text-xs">
										<Input
											type="number"
											value={guestCountRange[0]}
											onChange={(e) =>
												setGuestCountRange([
													Math.max(guestCountRangeData.min, parseInt(e.target.value) || 0),
													guestCountRange[1],
												])
											}
											className="h-8 w-20 text-xs"
											min={guestCountRangeData.min}
											max={guestCountRange[1]}
										/>
										<span className="text-muted-foreground">to</span>
										<Input
											type="number"
											value={guestCountRange[1]}
											onChange={(e) =>
												setGuestCountRange([
													guestCountRange[0],
													Math.min(guestCountRangeData.max, parseInt(e.target.value) || guestCountRangeData.max),
												])
											}
											className="h-8 w-20 text-xs"
											min={guestCountRange[0]}
											max={guestCountRangeData.max}
										/>
									</div>
								</div>
							</div>

							{/* Rating Filter */}
							<div className="space-y-3">
								<Label className="text-sm font-semibold">Rating</Label>
								<Select
									value={selectedRating?.toString() || "all"}
									onValueChange={(value) =>
										setSelectedRating(
											value === "all"
												? null
												: (parseInt(value) as RatingFilter),
										)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="All ratings" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All ratings</SelectItem>
										<SelectItem value="5">5 stars</SelectItem>
										<SelectItem value="4">4+ stars</SelectItem>
										<SelectItem value="3">3+ stars</SelectItem>
										<SelectItem value="2">2+ stars</SelectItem>
										<SelectItem value="1">1+ star</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Service Categories (Accordion) */}
							<div className="space-y-3">
								<Label className="text-sm font-semibold">
									Service categories
								</Label>
								<Accordion
									type="single"
									collapsible
									className="w-full rounded-md border bg-background/60"
								>
									<AccordionItem value="service-categories">
										<AccordionTrigger className="px-3 py-2 text-sm">
											Browse categories
										</AccordionTrigger>
										<AccordionContent>
											<div className="mt-2 max-h-48 space-y-2 overflow-y-auto pr-1">
												{allCategories.map((category) => (
													<div
														key={category}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`category-${category}`}
															checked={selectedCategories.includes(category)}
															onCheckedChange={() =>
																toggleCategoryFilter(category)
															}
														/>
														<Label
															htmlFor={`category-${category}`}
															className="text-sm"
														>
															{category}
														</Label>
													</div>
												))}
												{allCategories.length === 0 && (
													<p className="text-xs text-muted-foreground">
														No categories available yet.
													</p>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>

			{/* Active Filters */}
			{activeFilterCount > 0 && (
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-sm text-muted-foreground">Active filters:</span>
					{selectedBadges.map((badge) => (
						<Badge
							key={badge}
							variant="secondary"
							className="cursor-pointer"
							onClick={() => toggleBadgeFilter(badge)}
						>
							{badge === "topRated"
								? "Top Rated"
								: badge === "hostsFavorite"
									? "Host's Favorite"
									: badge === "risingStar"
										? "Rising Star"
										: "Verified"}
							<X className="ml-1 h-3 w-3" />
						</Badge>
					))}
					{selectedServiceTypes.map((serviceType) => (
						<Badge
							key={serviceType}
							variant="secondary"
							className="cursor-pointer"
							onClick={() => toggleServiceTypeFilter(serviceType)}
						>
							{serviceType}
							<X className="ml-1 h-3 w-3" />
						</Badge>
					))}
					{selectedLocations.map((location) => (
						<Badge
							key={location}
							variant="secondary"
							className="cursor-pointer"
							onClick={() => toggleLocationFilter(location)}
						>
							{location}
							<X className="ml-1 h-3 w-3" />
						</Badge>
					))}
					{(guestCountRange[0] > guestCountRangeData.min || guestCountRange[1] < guestCountRangeData.max) && (
						<Badge
							variant="secondary"
							className="cursor-pointer"
							onClick={() => setGuestCountRange([guestCountRangeData.min, guestCountRangeData.max])}
						>
							{guestCountRange[0].toLocaleString()} - {guestCountRange[1].toLocaleString()} guests
							<X className="ml-1 h-3 w-3" />
						</Badge>
					)}
					{selectedCategories.map((category) => (
						<Badge
							key={category}
							variant="secondary"
							className="cursor-pointer"
							onClick={() => toggleCategoryFilter(category)}
						>
							{category}
							<X className="ml-1 h-3 w-3" />
						</Badge>
					))}
					{selectedRating && (
						<Badge
							variant="secondary"
							className="cursor-pointer"
							onClick={() => setSelectedRating(null)}
						>
							{selectedRating}+ stars
							<X className="ml-1 h-3 w-3" />
						</Badge>
					)}
				</div>
			)}

			{/* Results Count */}
			<div className="text-sm text-muted-foreground">
				{filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""}{" "}
				found
			</div>

			{/* Vendors Grid/List */}
			<div
				className={cn(
					viewMode === "grid"
						? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						: "space-y-4",
				)}
			>
				{filteredVendors.length === 0 ? (
					<div className="col-span-full flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
						<div className="text-center">
							<p className="text-lg font-semibold text-muted-foreground">
								No vendors found
							</p>
							<p className="text-sm text-muted-foreground">
								{searchQuery || activeFilterCount > 0
									? "Try adjusting your search or filters"
									: "Vendors will appear here"}
							</p>
						</div>
					</div>
				) : (
					paginatedVendors.map((vendor) => (
						<MarketplaceCard
							key={vendor.id}
							vendor={vendor}
							viewMode={viewMode}
							onViewProfile={() => setSelectedVendor(vendor)}
						/>
					))
				)}
			</div>

			{/* Pagination */}
			{filteredVendors.length > 0 && (
				<div className="mt-6">
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={filteredVendors.length}
						itemsPerPage={itemsPerPage}
						onPageChange={setCurrentPage}
						onItemsPerPageChange={(newItemsPerPage) => {
							setItemsPerPage(newItemsPerPage);
							setCurrentPage(1);
						}}
					/>
				</div>
			)}

			{/* Vendor Profile Modal */}
			<VendorProfileModal
				vendor={selectedVendor}
				open={!!selectedVendor}
				onOpenChange={(open) => !open && setSelectedVendor(null)}
				budgetItems={budgetItems}
			/>
		</div>
	);
}
