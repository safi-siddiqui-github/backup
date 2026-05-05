"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Search, ArrowUpDown, X } from "lucide-react";
import { toast } from "sonner";
import PaginationControls from "@/components/ui/pagination-controls";
import ProposalCard from "./ProposalCard";
import ProposalDetailModal from "./ProposalDetailModal";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import ProposalsFilters, { ProposalsFiltersState } from "./ProposalsFilters";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import PriceHistogram from "@/components/general/events/PriceHistogram";
import VendorDetailDialog from "./vendor-detail/VendorDetailDialog";
import { Vendor, mockVendors } from "../vendor-mgmt-tab/VendorListView";

export type ProposalStatus =
	| "all"
	| "shortlisted"
	| "negotiation"
	| "hired"
	| "archived";

export interface Proposal {
	id: string;
	vendorName: string;
	vendorCompany: string;
	category: string;
	totalCost: number;
	budget: number;
	status: "pending" | "shortlisted" | "negotiation" | "hired" | "archived";
	rating: number;
	isNew?: boolean;
	isFavorite?: boolean;
	description: string;
	timeline: string;
	validUntil: string;
	submitted: string;
	costBreakdown: {
		item: string;
		quantity: number;
		unitPrice: number;
		total: number;
	}[];
	deliverables: string[];
	termsAndConditions: string;
	paymentSchedule: {
		milestone: string;
		percentage: number;
		amount: number;
		date: string;
	}[];
	// Version tracking fields
	version?: number;
	parentProposalId?: string; // ID of the original proposal if this is an edited version
	editedBy?: "vendor" | "host";
	editedAt?: string;
}

interface ProposalsListViewProps {
	initialProposals?: Proposal[];
	hideFilters?: boolean;
	hideTabs?: boolean;
}

export default function ProposalsListView({ 
	initialProposals, 
	hideFilters = false,
	hideTabs = false 
}: ProposalsListViewProps = {}) {
	const [activeTab, setActiveTab] = useState<ProposalStatus>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
	const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
		null,
	);
	const [archivingProposal, setArchivingProposal] = useState<Proposal | null>(
		null,
	);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
	const [vendorDialogTab, setVendorDialogTab] = useState<string>("overview");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Mock proposals data or use initialProposals
	const defaultProposals: Proposal[] = [
		{
			id: "1",
			vendorName: "Gourmet Catering Services",
			vendorCompany: "Gourmet Catering Services",
			category: "Catering",
			totalCost: 7500,
			budget: 5000,
			status: "pending",
			rating: 4.6,
			isNew: false,
			description:
				"Three-course plated dinner with cocktail hour and premium bar service",
			timeline: "Setup 3 hours before service",
			validUntil: "12/11/2025",
			submitted: "01/11/2025",
			costBreakdown: [
				{
					item: "Cocktail Hour Appetizers",
					quantity: 100,
					unitPrice: 25,
					total: 2500,
				},
				{
					item: "Three-Course Plated Dinner",
					quantity: 100,
					unitPrice: 45,
					total: 4500,
				},
				{
					item: "Premium Bar Service",
					quantity: 1,
					unitPrice: 500,
					total: 500,
				},
			],
			deliverables: [
				"Professional waitstaff (6 servers)",
				"Premium appetizer selection",
				"Choice of chicken, beef, or vegetarian entree",
				"Signature cocktails and wine pairing",
				"Wedding cake cutting service",
			],
			termsAndConditions:
				"Menu tasting included. 48-hour final count required. Service charge and gratuity separate.",
			paymentSchedule: [
				{
					milestone: "Contract Signing",
					percentage: 25,
					amount: 1875,
					date: "07/11/2025",
				},
				{
					milestone: "Final Menu Confirmation",
					percentage: 75,
					amount: 5625,
					date: "16/11/2025",
				},
			],
		},
		{
			id: "2",
			vendorName: "Elegant Venues Inc.",
			vendorCompany: "Elegant Venues Inc.",
			category: "Venue",
			totalCost: 8500,
			budget: 5000,
			status: "shortlisted",
			rating: 4.8,
			isNew: true,
			isFavorite: true,
			description:
				"Complete venue rental with tables, chairs, and basic lighting for your special day",
			timeline: "Available for your event date",
			validUntil: "16/11/2025",
			submitted: "02/11/2025",
			version: 2,
			costBreakdown: [
				{
					item: "Venue Rental (8 hours)",
					quantity: 1,
					unitPrice: 5000,
					total: 5000,
				},
				{
					item: "Tables and Chairs",
					quantity: 100,
					unitPrice: 15,
					total: 1500,
				},
				{
					item: "Basic Lighting Setup",
					quantity: 1,
					unitPrice: 2000,
					total: 2000,
				},
			],
			deliverables: [
				"8-hour venue rental",
				"Tables and chairs for 100 guests",
				"Basic lighting and sound system",
				"Bridal suite access",
				"On-site coordinator",
			],
			termsAndConditions:
				"Venue available from 2 PM to 10 PM. Additional hours available at $500/hour. Cleanup included.",
			paymentSchedule: [
				{
					milestone: "Booking Deposit",
					percentage: 50,
					amount: 4250,
					date: "10/11/2025",
				},
				{
					milestone: "Final Payment",
					percentage: 50,
					amount: 4250,
					date: "20/11/2025",
				},
			],
		},
	];

	const [proposals, setProposals] = useState<Proposal[]>(initialProposals || defaultProposals);

	// Get all unique categories
	const allCategories = Array.from(
		new Set(proposals.map((p) => p.category)),
	).sort();

	// Get max price for price range
	const maxPrice = Math.max(
		...proposals.map((p) => Math.max(p.totalCost, p.budget)),
		50000,
	);
	const minPrice = Math.min(
		...proposals.map((p) => Math.min(p.totalCost, p.budget)),
		0,
	);

	const priceHistogramEvents = useMemo(
		() =>
			proposals.map((proposal) => ({
				name: proposal.vendorCompany || proposal.vendorName,
				startDate: proposal.submitted,
				locationMap: proposal.category,
				price: proposal.totalCost,
			})),
		[proposals],
	);

	// Filter state
	const [filters, setFilters] = useState<ProposalsFiltersState>({
		selectedCategories: [],
		minRating: 0,
		priceRange: [0, 50000],
		showOnlyNew: false,
		showOnlyFavorites: false,
	});

	// Update price range max when maxPrice increases
	useEffect(() => {
		setFilters((prev) => {
			if (prev.priceRange[1] < maxPrice) {
				return {
					...prev,
					priceRange: [prev.priceRange[0], maxPrice],
				};
			}
			return prev;
		});
	}, [maxPrice]);

	// Clear all filters
	const clearAllFilters = () => {
		setFilters({
			selectedCategories: [],
			minRating: 0,
			priceRange: [0, maxPrice],
			showOnlyNew: false,
			showOnlyFavorites: false,
		});
	};

	// Toggle category selection
	const toggleCategory = (category: string) => {
		const newCategories = filters.selectedCategories.includes(category)
			? filters.selectedCategories.filter((c) => c !== category)
			: [...filters.selectedCategories, category];

		setFilters({
			...filters,
			selectedCategories: newCategories,
		});
	};

	// Update filter value
	const updateFilter = <K extends keyof ProposalsFiltersState>(
		key: K,
		value: ProposalsFiltersState[K],
	) => {
		setFilters({
			...filters,
			[key]: value,
		});
	};

	// Count active filters
	const activeFilterCount =
		filters.selectedCategories.length +
		(filters.minRating > 0 ? 1 : 0) +
		(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0) +
		(filters.showOnlyNew ? 1 : 0) +
		(filters.showOnlyFavorites ? 1 : 0);

	// Filter proposals by tab
	const getFilteredProposals = () => {
		let filtered = proposals;

		// Filter by status tab
		if (activeTab !== "all") {
			filtered = filtered.filter((p) => p.status === activeTab);
		}

		// Filter by search query
		if (searchQuery) {
			filtered = filtered.filter(
				(p) =>
					p.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.category.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// Filter by category
		if (filters.selectedCategories.length > 0) {
			filtered = filtered.filter((p) =>
				filters.selectedCategories.includes(p.category),
			);
		}

		// Filter by rating
		if (filters.minRating > 0) {
			filtered = filtered.filter((p) => p.rating >= filters.minRating);
		}

		// Filter by price range
		filtered = filtered.filter(
			(p) =>
				p.totalCost >= filters.priceRange[0] &&
				p.totalCost <= filters.priceRange[1],
		);

		// Filter by new proposals
		if (filters.showOnlyNew) {
			filtered = filtered.filter((p) => p.isNew === true);
		}

		// Filter by favorites
		if (filters.showOnlyFavorites) {
			filtered = filtered.filter((p) => p.isFavorite === true);
		}

		// Sort by date
		filtered = [...filtered].sort((a, b) => {
			if (sortOrder === "newest") {
				return (
					new Date(b.submitted).getTime() - new Date(a.submitted).getTime()
				);
			} else {
				return (
					new Date(a.submitted).getTime() - new Date(b.submitted).getTime()
				);
			}
		});

		return filtered;
	};

	const filteredProposals = getFilteredProposals();
	const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
	const paginatedProposals = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredProposals.slice(startIndex, endIndex);
	}, [filteredProposals, currentPage, itemsPerPage]);

	// Get counts for each tab
	const getCounts = () => {
		return {
			all: proposals.length,
			shortlisted: proposals.filter((p) => p.status === "shortlisted").length,
			negotiation: proposals.filter((p) => p.status === "negotiation").length,
			hired: proposals.filter((p) => p.status === "hired").length,
			archived: proposals.filter((p) => p.status === "archived").length,
		};
	};

	const counts = getCounts();

	const handleStatusChange = (
		proposalId: string,
		newStatus: Proposal["status"],
	) => {
		setProposals(
			proposals.map((p) =>
				p.id === proposalId ? { ...p, status: newStatus } : p,
			),
		);
		setSelectedProposal(null);
	};

	const handleArchive = (proposal: Proposal) => {
		setArchivingProposal(proposal);
	};

	const handleConfirmArchive = () => {
		if (archivingProposal) {
			handleStatusChange(archivingProposal.id, "archived");
			toast.success("Proposal Archived", {
				description: `${archivingProposal.vendorName}'s proposal has been moved to the Archived tab.`,
				duration: 3000,
			});
			setArchivingProposal(null);
		}
	};

	const handleViewVendor = (proposal: Proposal, initialTab: string = "overview") => {
		// Find matching vendor from mockVendors based on proposal vendor name
		const vendor = mockVendors.find(v => v.name === proposal.vendorName);
		if (vendor) {
			setSelectedVendor(vendor);
			setVendorDialogTab(initialTab);
		} else {
			toast.error("Vendor not found", {
				description: "Unable to find vendor details for this proposal.",
				duration: 3000,
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Tabs */}
			{!hideTabs && (
			<div className="flex flex-wrap gap-2 border-b pb-4">
				<Button
					variant="ghost"
					onClick={() => setActiveTab("all")}
					className={cn(
						activeTab === "all" &&
							"bg-white text-black hover:bg-white hover:text-black dark:bg-[#020617] dark:text-white dark:hover:bg-[#020617] dark:hover:text-white",
					)}
				>
					All Proposals ({counts.all})
					{counts.all > 0 && (
						<div className="flex items-center gap-2">
							New
							<Badge
								variant="destructive"
								className="h-5 w-5 rounded-full p-0 text-xs"
							>
								{counts.all}
							</Badge>
						</div>
					)}
				</Button>

				<Button
					variant="ghost"
					onClick={() => setActiveTab("shortlisted")}
					className={cn(
						activeTab === "shortlisted" &&
							"bg-white text-black hover:bg-white hover:text-black dark:bg-[#020617] dark:text-white dark:hover:bg-[#020617] dark:hover:text-white",
					)}
				>
					Shortlisted ({counts.shortlisted})
				</Button>

				<Button
					variant="ghost"
					className={cn(
						activeTab === "negotiation" &&
							"bg-white text-black hover:bg-white hover:text-black dark:bg-[#020617] dark:text-white dark:hover:bg-[#020617] dark:hover:text-white",
					)}
					onClick={() => setActiveTab("negotiation")}
				>
					In Negotiations ({counts.negotiation})
				</Button>

				<Button
					variant="ghost"
					className={cn(
						activeTab === "hired" &&
							"bg-white text-black hover:bg-white hover:text-black dark:bg-[#020617] dark:text-white dark:hover:bg-[#020617] dark:hover:text-white",
					)}
					onClick={() => setActiveTab("hired")}
				>
					Hired ({counts.hired})
				</Button>

				<Button
					variant="ghost"
					className={cn(
						activeTab === "archived" &&
							"bg-white text-black hover:bg-white hover:text-black dark:bg-[#020617] dark:text-white dark:hover:bg-[#020617] dark:hover:text-white",
					)}
					onClick={() => setActiveTab("archived")}
				>
					Archived ({counts.archived})
				</Button>
			</div>
			)}

			{/* Search and Filters */}
			{!hideFilters && (
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				{/* Search Bar */}
				<div className="relative flex-1 max-w-md rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search proposals, vendors, or budget items..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8 pr-2 py-2 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
					/>
				</div>

				{/* Filters */}
				<div className="flex gap-2">
					{/* Sort Order */}
					<Select
						value={sortOrder}
						onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}
					>
						<SelectTrigger className="w-[180px] bg-white dark:bg-[#020617]">
							<ArrowUpDown className="mr-2 h-4 w-4" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest First</SelectItem>
							<SelectItem value="oldest">Oldest First</SelectItem>
						</SelectContent>
					</Select>

					{/* Filters Button */}
					<ProposalsFilters
						categories={allCategories}
						maxPrice={maxPrice}
						filters={filters}
						onFiltersChange={setFilters}
						isOpen={isFiltersOpen}
						onOpenChange={setIsFiltersOpen}
					/>
				</div>
			</div>
			)}

			{/* Collapsible Filters Bar */}
			{!hideFilters && (
			<Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
				<CollapsibleContent>
					<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 space-y-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
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

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{/* Category Filter */}
							<div className="flex h-full flex-col justify-between rounded-xl !bg-white dark:!bg-[#020617] backdrop-blur-sm p-4 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
								<div className="space-y-3 h-full justify-between flex flex-col">
									<Label className="text-sm font-semibold">
										Budget Category
									</Label>
									<div className="space-y-2">
										{allCategories.map((category) => (
											<div
												key={category}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={`category-${category}`}
													checked={filters.selectedCategories.includes(
														category,
													)}
													onCheckedChange={() => toggleCategory(category)}
												/>
												<Label
													htmlFor={`category-${category}`}
													className="text-sm font-normal cursor-pointer"
												>
													{category}
												</Label>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Vendor Rating */}
							<div className="flex h-full flex-col justify-between rounded-xl !bg-white dark:!bg-[#020617] backdrop-blur-sm p-4 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
								<div className="space-y-3 h-full justify-between flex flex-col">
									<Label className="text-sm font-semibold">
										Vendor Rating:{" "}
										{filters.minRating > 0
											? filters.minRating.toFixed(1)
											: "Any"}
									</Label>

									<div className="h-full justify-end gap-3 flex flex-col">
										<Slider
											value={[filters.minRating]}
											onValueChange={(value) =>
												updateFilter("minRating", value[0])
											}
											max={5}
											min={0}
											step={0.1}
											className="w-full"
										/>
										<div className="flex justify-between text-xs text-muted-foreground">
											<span>0</span>
											<span>5</span>
										</div>
									</div>
								</div>
							</div>

							{/* Budget Variance */}
							<div className="flex h-full flex-col justify-between rounded-xl !bg-white dark:!bg-[#020617] backdrop-blur-sm p-4 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
								<div className="space-y-3">
									<Label className="text-sm font-semibold">
										Max Price ($): ${filters.priceRange[0].toLocaleString()} - $
										{filters.priceRange[1].toLocaleString()}
									</Label>
									<PriceHistogram
										events={priceHistogramEvents}
										minPrice={minPrice}
										maxPrice={maxPrice}
										selectedMin={filters.priceRange[0]}
										selectedMax={filters.priceRange[1]}
										className="mt-1"
									/>
									<Slider
										value={filters.priceRange}
										onValueChange={(value) =>
											updateFilter("priceRange", [value[0], value[1]])
										}
										max={maxPrice}
										min={0}
										step={100}
										className="w-full"
									/>
									<div className="flex justify-between text-xs text-muted-foreground">
										<span>$0</span>
										<span>${maxPrice.toLocaleString()}</span>
									</div>
								</div>
							</div>

							{/* Expiry Status */}
							<div className="flex h-full flex-col justify-between rounded-xl !bg-white dark:!bg-[#020617] backdrop-blur-sm p-4 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
								<div className="space-y-3 h-full justify-between flex flex-col">
									<Label className="text-sm font-semibold">Expiry Status</Label>
									<div className="space-y-2">
										<div className="flex items-center space-x-2">
											<Checkbox
												id="show-only-new"
												checked={filters.showOnlyNew}
												onCheckedChange={(checked) =>
													updateFilter("showOnlyNew", checked === true)
												}
											/>
											<Label
												htmlFor="show-only-new"
												className="text-sm font-normal cursor-pointer"
											>
												Show only new
											</Label>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox
												id="show-only-favorites"
												checked={filters.showOnlyFavorites}
												onCheckedChange={(checked) =>
													updateFilter("showOnlyFavorites", checked === true)
												}
											/>
											<Label
												htmlFor="show-only-favorites"
												className="text-sm font-normal cursor-pointer"
											>
												Show only favorites
											</Label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>
			)}

			{/* Proposals List */}
			<div className="space-y-4">
				{filteredProposals.length === 0 ? (
					<div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
						<div className="text-center">
							<p className="text-lg font-semibold text-muted-foreground">
								No proposals found
							</p>
							<p className="text-sm text-muted-foreground">
								{searchQuery
									? "Try adjusting your search criteria"
									: "Proposals will appear here once vendors submit them"}
							</p>
						</div>
					</div>
				) : (
					paginatedProposals.map((proposal) => (
						<ProposalCard
							key={proposal.id}
							proposal={proposal}
							onViewDetails={() => setSelectedProposal(proposal)}
							onArchive={() => handleArchive(proposal)}
							onViewVendorOverview={() => handleViewVendor(proposal, "overview")}
							onViewVendorCommunications={() => handleViewVendor(proposal, "communications")}
							onViewVendorProposals={() => handleViewVendor(proposal, "proposals")}
						/>
					))
				)}
			</div>

			{/* Pagination */}
			{filteredProposals.length > 0 && (
				<div className="mt-6">
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={filteredProposals.length}
						itemsPerPage={itemsPerPage}
						onPageChange={setCurrentPage}
						onItemsPerPageChange={(newItemsPerPage) => {
							setItemsPerPage(newItemsPerPage);
							setCurrentPage(1);
						}}
					/>
				</div>
			)}

			{/* Proposal Detail Modal */}
			{selectedProposal && (
				<ProposalDetailModal
					proposal={selectedProposal}
					open={!!selectedProposal}
					onOpenChange={(open) => !open && setSelectedProposal(null)}
					onStatusChange={handleStatusChange}
				/>
			)}

			{/* Archive Confirmation Dialog */}
			<ConfirmationDialog
				open={!!archivingProposal}
				onOpenChange={(open) => !open && setArchivingProposal(null)}
				onConfirm={handleConfirmArchive}
				title="Archive Proposal?"
				description={
					archivingProposal
						? `Are you sure you want to archive ${archivingProposal.vendorName}'s proposal? This will move the proposal to the Archived tab.`
						: ""
				}
				confirmText="Archive Proposal"
				variant="warning"
			/>

			{/* Vendor Detail Dialog */}
			<VendorDetailDialog
				vendor={selectedVendor}
				open={!!selectedVendor}
				onOpenChange={(open) => !open && setSelectedVendor(null)}
				initialTab={vendorDialogTab}
			/>
		</div>
	);
}
