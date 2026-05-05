"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import PaginationControls from "@/components/ui/pagination-controls";
import { Grid3x3, List, Search } from "lucide-react";
import { useState, useMemo } from "react";
import VendorCard from "./VendorCard";

export type VendorStatus = "active" | "pending" | "completed" | "blocked";

export interface Milestone {
	id: string;
	title: string;
	description: string;
	status: "completed" | "in_progress" | "pending" | "blocked";
	startDate?: string;
	dueDate?: string;
	estimatedStart?: string;
	completedDate?: string;
	daysRemaining?: number;
	progress?: number;
	amount?: number;
	amountDue?: number;
	payment?: {
		amount: number;
		required: boolean;
	};
	requirements?: string[];
	deliverables?: string[];
	actionItems?: {
		id: string;
		text: string;
		assignee: string;
		completed: boolean;
	}[];
	projectId?: string; // Link milestone to specific project
	eventId?: string; // Link milestone to specific event
}

export type ProjectCategory = 
	| "Catering"
	| "Photography"
	| "Videography"
	| "Venue"
	| "Decoration"
	| "Entertainment"
	| "Music/DJ"
	| "Florist"
	| "Transportation"
	| "Other";

export interface VendorProject {
	id: string;
	name: string;
	category: ProjectCategory;
	amount: number;
	status: "pending" | "in_progress" | "completed" | "cancelled";
	startDate?: string;
	endDate?: string;
	description?: string;
	milestones?: Milestone[];
}

export interface VendorEvent {
	id: string;
	name: string;
	date: string;
	totalBudget: number;
	projects: VendorProject[];
	status: "upcoming" | "ongoing" | "completed" | "cancelled";
	description?: string;
}

export interface Vendor {
	id: string;
	name: string;
	category: string;
	rating: number;
	avatar: string;
	totalValue: number;
	activeEvents: number; // Changed from activeContracts
	upcomingCount: number;
	completedCount: number;
	status: VendorStatus;
	events?: VendorEvent[]; // Changed from milestones
}

// Mock vendors data (exported so other tabs like Messages can reuse the same list)
export const mockVendors: Vendor[] = [
	{
		id: "1",
		name: "Gourmet Catering Services",
		category: "Catering",
		rating: 4.6,
		avatar: "https://ui-avatars.com/api/?name=G&background=10b981&color=fff",
		totalValue: 15000,
		activeEvents: 1,
		upcomingCount: 2,
		completedCount: 1,
		status: "active",
		events: [
			{
				id: "ve1",
				name: "Sarah's Wedding",
				date: "15/08/2024",
				totalBudget: 15000,
				status: "ongoing",
				description: "Wedding catering and decoration services",
				projects: [
					{
						id: "vp1-1",
						name: "Wedding Catering Service",
						category: "Catering",
						amount: 7500,
						status: "in_progress",
						startDate: "15/08/2024",
						description: "Full catering service for 100 guests",
		milestones: [
			{
								id: "m1",
				title: "Initial Consultation",
				description: "Meet with clients to understand their vision and requirements",
				status: "completed",
				completedDate: "01/11/2025",
				startDate: "25/10/2025",
				dueDate: "01/11/2025",
				progress: 100,
				amount: 1875,
				payment: {
					amount: 1875,
					required: false,
				},
				requirements: ["Deposit payment", "Signed consultation agreement"],
				deliverables: [
					"Initial questionnaire completed",
					"Menu preferences documented",
					"Budget discussion finalized",
				],
				actionItems: [],
								projectId: "vp1-1",
								eventId: "ve1",
			},
			{
								id: "m2",
				title: "Menu Planning & Tasting",
				description: "Finalize menu selections and conduct tasting session",
				status: "in_progress",
				startDate: "02/11/2025",
				dueDate: "15/12/2025",
				progress: 60,
				amount: 0,
				deliverables: [
					"Menu tasting scheduled",
					"Final menu approved",
					"Dietary restrictions confirmed",
				],
				actionItems: [],
								projectId: "vp1-1",
								eventId: "ve1",
			},
			{
								id: "m3",
				title: "Final Menu Confirmation",
				description: "Confirm final guest count and menu details",
				status: "pending",
				estimatedStart: "10/12/2025",
				dueDate: "16/11/2025",
				amount: 5625,
				payment: {
					amount: 5625,
					required: true,
				},
				requirements: ["Final guest count", "Payment of remaining balance"],
				deliverables: [
					"Final menu confirmed",
					"Service staff scheduled",
					"Equipment and setup arranged",
				],
				actionItems: [],
								projectId: "vp1-1",
								eventId: "ve1",
							},
						],
					},
					{
						id: "vp1-2",
						name: "Wedding Decoration & Setup",
						category: "Decoration",
						amount: 7500,
						status: "in_progress",
						startDate: "14/08/2024",
						description: "Floral arrangements and venue decoration",
						milestones: [
							{
								id: "m4",
								title: "Decoration Consultation",
								description: "Discuss decoration theme and floral arrangements",
								status: "completed",
								completedDate: "05/11/2025",
								startDate: "28/10/2025",
								dueDate: "05/11/2025",
								progress: 100,
								amount: 1875,
								payment: {
									amount: 1875,
									required: false,
								},
								requirements: ["Deposit payment", "Theme selection"],
								deliverables: [
									"Decoration theme approved",
									"Color scheme finalized",
									"Floral preferences documented",
								],
								actionItems: [],
								projectId: "vp1-2",
								eventId: "ve1",
							},
							{
								id: "m5",
								title: "Floral Order & Preparation",
								description: "Order flowers and prepare decoration materials",
								status: "in_progress",
								startDate: "06/11/2025",
								dueDate: "12/12/2025",
								progress: 45,
								amount: 0,
								deliverables: [
									"Flowers ordered",
									"Decoration materials prepared",
									"Setup timeline confirmed",
								],
								actionItems: [],
								projectId: "vp1-2",
								eventId: "ve1",
							},
							{
								id: "m6",
								title: "Venue Decoration Setup",
								description: "Complete venue decoration on event day",
								status: "pending",
								estimatedStart: "14/08/2024",
								dueDate: "15/08/2024",
								amount: 5625,
								payment: {
									amount: 5625,
									required: true,
								},
								requirements: ["Final payment", "Access to venue confirmed"],
								deliverables: [
									"Venue fully decorated",
									"Floral arrangements installed",
									"All decoration elements in place",
								],
								actionItems: [],
								projectId: "vp1-2",
								eventId: "ve1",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "2",
		name: "Elegant Venues Inc.",
		category: "Venue",
		rating: 4.8,
		avatar: "https://ui-avatars.com/api/?name=E&background=3b82f6&color=fff",
		totalValue: 8500,
		activeEvents: 1,
		upcomingCount: 1,
		completedCount: 1,
		status: "active",
		events: [
			{
				id: "ve2",
				name: "Sarah's Wedding",
				date: "15/08/2024",
				totalBudget: 8500,
				status: "ongoing",
				description: "Wedding venue rental",
				projects: [
					{
						id: "vp2-1",
						name: "Venue Rental & Setup",
						category: "Venue",
						amount: 8500,
						status: "in_progress",
						startDate: "15/08/2024",
						description: "Complete venue rental with setup",
		milestones: [
			{
								id: "m4",
				title: "Venue Booking & Deposit",
				description: "Secure venue booking with initial deposit",
				status: "completed",
				completedDate: "10/11/2025",
				startDate: "02/11/2025",
				dueDate: "10/11/2025",
				progress: 100,
				amount: 4250,
				payment: {
					amount: 4250,
					required: false,
				},
				requirements: ["Booking deposit paid", "Contract signed"],
				deliverables: [
					"Venue reserved for event date",
					"Access times confirmed",
					"Setup requirements documented",
				],
				actionItems: [],
								projectId: "vp2-1",
								eventId: "ve2",
			},
			{
								id: "m5",
				title: "Final Venue Setup",
				description: "Complete venue setup with tables, chairs, and lighting",
				status: "pending",
				estimatedStart: "19/11/2025",
				dueDate: "20/11/2025",
				amount: 4250,
				payment: {
					amount: 4250,
					required: true,
				},
				requirements: ["Final payment", "Setup timeline confirmed"],
				deliverables: [
					"Tables and chairs arranged",
					"Lighting setup completed",
					"Sound system tested",
					"Bridal suite prepared",
				],
				actionItems: [],
								projectId: "vp2-1",
								eventId: "ve2",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "3",
		name: "Sonic Boom Entertainment",
		category: "Entertainment",
		rating: 4.5,
		avatar: "https://ui-avatars.com/api/?name=S&background=6366f1&color=fff",
		totalValue: 1800,
		activeEvents: 1,
		upcomingCount: 0,
		completedCount: 0,
		status: "blocked",
		events: [
			{
				id: "ve3",
				name: "Corporate Gala 2024",
				date: "20/09/2024",
				totalBudget: 1800,
				status: "ongoing",
				description: "Entertainment services for corporate event",
				projects: [
					{
						id: "vp3-1",
						name: "DJ & Sound System",
						category: "Music/DJ",
						amount: 1800,
						status: "in_progress",
						startDate: "20/09/2024",
						description: "DJ services and sound system setup",
		milestones: [
			{
								id: "m6",
				title: "Initial Consultation",
								description: "Meet with clients to understand their vision and requirements",
				status: "completed",
				completedDate: "22/10/2025",
				startDate: "15/10/2025",
				dueDate: "22/10/2025",
				progress: 100,
				amount: 500,
				payment: {
					amount: 500,
					required: false,
				},
				requirements: ["Deposit payment", "Signed consultation agreement"],
				deliverables: [
					"Initial questionnaire completed",
									"Music preferences documented",
					"Budget discussion finalized",
				],
								actionItems: [],
								projectId: "vp3-1",
								eventId: "ve3",
			},
			{
								id: "m7",
								title: "Equipment Setup Planning",
								description: "Plan DJ equipment and sound system setup",
				status: "blocked",
				startDate: "13/11/2025",
				dueDate: "30/11/2025",
				estimatedStart: "16/11/2025",
				daysRemaining: 21,
								amount: 1300,
								amountDue: 1300,
				payment: {
									amount: 1300,
					required: true,
				},
				requirements: ["Deposit payment", "Signed consultation agreement"],
								actionItems: [],
								projectId: "vp3-1",
								eventId: "ve3",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "4",
		name: "Pixel Perfect Photography",
		category: "Photography",
		rating: 4.9,
		avatar: "https://ui-avatars.com/api/?name=P&background=f59e0b&color=fff",
		totalValue: 3500,
		activeEvents: 1,
		upcomingCount: 2,
		completedCount: 0,
		status: "pending",
		events: [
			{
				id: "ve4",
				name: "Sarah's Wedding",
				date: "15/08/2024",
				totalBudget: 3500,
				status: "ongoing",
				description: "Wedding photography coverage",
				projects: [
					{
						id: "vp4-1",
						name: "Wedding Photography Package",
						category: "Photography",
						amount: 3500,
						status: "in_progress",
						startDate: "15/08/2024",
						description: "Full day wedding photography",
		milestones: [
			{
								id: "m8",
				title: "Contract Signing",
				description: "Review and sign photography contract",
				status: "completed",
				completedDate: "25/10/2025",
				progress: 100,
				amount: 1000,
				payment: {
					amount: 1000,
					required: false,
				},
				deliverables: ["Signed contract", "Shot list preferences"],
				actionItems: [],
								projectId: "vp4-1",
								eventId: "ve4",
			},
			{
								id: "m9",
				title: "Pre-event Consultation",
				description: "Discuss timeline and key moments",
				status: "pending",
				estimatedStart: "01/12/2025",
				daysRemaining: 25,
								actionItems: [],
								projectId: "vp4-1",
								eventId: "ve4",
			},
			{
								id: "m10",
				title: "Event Day Coverage",
				description: "Full day photography coverage",
				status: "pending",
				estimatedStart: "20/12/2025",
				daysRemaining: 1,
				amount: 2500,
								payment: {
									amount: 2500,
									required: true,
								},
								actionItems: [],
								projectId: "vp4-1",
								eventId: "ve4",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "5",
		name: "Gourmet Catering Services",
		category: "Catering",
		rating: 4.6,
		avatar: "https://ui-avatars.com/api/?name=G&background=ec4899&color=fff",
		totalValue: 5000,
		activeEvents: 1,
		upcomingCount: 0,
		completedCount: 3,
		status: "completed",
		events: [
			{
				id: "ve5",
				name: "Corporate Gala 2024",
				date: "20/09/2024",
				totalBudget: 5000,
				status: "completed",
				description: "Corporate event catering",
				projects: [
					{
						id: "vp5-1",
						name: "Corporate Catering Service",
						category: "Catering",
						amount: 5000,
						status: "completed",
						startDate: "20/09/2024",
						endDate: "20/09/2024",
						description: "Corporate gala catering",
		milestones: [
			{
								id: "m11",
				title: "Menu Selection",
				description: "Choose and confirm menu items",
				status: "completed",
				completedDate: "15/09/2025",
				progress: 100,
				amount: 1000,
				payment: {
					amount: 1000,
					required: false,
				},
				deliverables: ["Menu finalized", "Dietary requirements noted"],
				actionItems: [],
								projectId: "vp5-1",
								eventId: "ve5",
			},
			{
								id: "m12",
				title: "Tasting Session",
				description: "Sample selected menu items",
				status: "completed",
				completedDate: "30/09/2025",
				progress: 100,
				deliverables: ["Tasting completed", "Final adjustments made"],
				actionItems: [],
								projectId: "vp5-1",
								eventId: "ve5",
			},
			{
								id: "m13",
				title: "Service Complete",
				description: "Event catering completed successfully",
				status: "completed",
				completedDate: "20/10/2025",
				progress: 100,
				amount: 4000,
				payment: {
					amount: 4000,
					required: false,
				},
				deliverables: ["Food served", "Cleanup completed"],
				actionItems: [],
								projectId: "vp5-1",
								eventId: "ve5",
							},
						],
					},
				],
			},
		],
	},
];

interface VendorListViewProps {
	onSelectVendor: (vendor: Vendor) => void;
}

export default function VendorListView({
	onSelectVendor,
}: VendorListViewProps) {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [vendors] = useState<Vendor[]>(mockVendors);

	// Get filtered vendors
	const getFilteredVendors = () => {
		let filtered = vendors;

		// Search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(v) =>
					v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					v.category.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// Status filter
		if (statusFilter !== "all") {
			filtered = filtered.filter((v) => v.status === statusFilter);
		}

		return filtered;
	};

	const filteredVendors = getFilteredVendors();
	const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
	const paginatedVendors = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredVendors.slice(startIndex, endIndex);
	}, [filteredVendors, currentPage, itemsPerPage]);

	return (
		<div className="space-y-6">
			{/* Search and Controls */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				{/* Search Bar */}
				<div className="relative max-w-md flex-1 rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
					<Input
						placeholder="Search vendors..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8 pr-2 py-2 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
					/>
				</div>

				{/* Controls */}
				<div className="flex gap-2">
					{/* Status Filter */}
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-[180px] bg-white dark:bg-[#020617]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="blocked">Blocked</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
						</SelectContent>
					</Select>

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

			{/* Results Count */}
			<div className="text-muted-foreground text-sm">
				{filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""}{" "}
				found
			</div>

			{/* Vendors Grid/List */}
			<div
				className={cn(
					viewMode === "grid"
						? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
						: "space-y-4",
				)}
			>
				{filteredVendors.length === 0 ? (
					<div className="col-span-full flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
						<div className="text-center">
							<p className="text-muted-foreground text-lg font-semibold">
								No vendors found
							</p>
							<p className="text-muted-foreground text-sm">
								{searchQuery || statusFilter !== "all"
									? "Try adjusting your search or filters"
									: "Vendors will appear here"}
							</p>
						</div>
					</div>
				) : (
					paginatedVendors.map((vendor) => (
						<VendorCard
							key={vendor.id}
							vendor={vendor}
							viewMode={viewMode}
							onClick={() => onSelectVendor(vendor)}
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
		</div>
	);
}
