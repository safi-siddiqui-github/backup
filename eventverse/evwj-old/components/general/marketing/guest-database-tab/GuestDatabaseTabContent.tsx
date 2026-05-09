"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Search,
	Filter,
	ArrowUpDown,
	Download,
	Trash2,
	Plus,
	FileText,
	ChevronDown,
	Code,
	Table as TableIcon,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GuestProfileDrawer from "./GuestProfileDrawer";
import GuestTable, { GuestRecord, GuestSortField } from "./GuestTable";
import GuestFiltersSidebar from "./GuestFiltersSidebar";
import { GuestFilters } from "./guest-filters/types";
import { cn } from "@/lib/utils";

type Guest = GuestRecord & {
	age: number;
	birthdayMonth?: string;
	avgTicketPrice: number;
	totalTicketsPurchased: number;
	purchaseFrequency: "monthly" | "quarterly" | "annual" | "rarely";
	rsvpReliability: "reliable" | "moderate" | "unreliable";
	lifetimeValue: number;
	daysSinceLastEvent: number;
	avgPlusOnes: number;
	optedOutEmail?: boolean;
	optedOutSMS?: boolean;
	optedOutPhysical?: boolean;
};

type SortField = GuestSortField;

const guests: Guest[] = [
	{
		id: "david-kim",
		name: "David Kim",
		initials: "DK",
		color: "bg-blue-500",
		email: "david.kim@email.com",
		phone: "+1-555-0104",
		location: "Austin, TX",
		ageRange: "18-24",
		age: 22,
		gender: "Male",
		occupation: "Student",
		eventsAttended: 1,
		totalSpent: 199,
		plusOnes: 0,
		avgPlusOnes: 0,
		segments: ["Festival Goers", "Young Adults (18-34)"],
		lastEventLabel: "Festival",
		lastEventDate: "2024-07-20",
		daysSinceLastEvent: 150,
		avgTicketPrice: 199,
		totalTicketsPurchased: 1,
		purchaseFrequency: "rarely",
		rsvpReliability: "reliable",
		lifetimeValue: 199,
		birthdayMonth: "Mar",
		optedOutPhysical: true,
		eventHistory: [
			{
				name: "Music Festival 2024",
				date: "Jul 20, 2024",
				type: "Festival",
				ticketType: "General Admission",
				amount: 199,
			},
		],
		communicationPreferences: ["Opted out of physical mail"],
	},
	{
		id: "sarah-johnson",
		name: "Sarah Johnson",
		initials: "SJ",
		color: "bg-green-500",
		email: "sarah.johnson@email.com",
		phone: "+1-555-0101",
		location: "New York, NY",
		ageRange: "25-34",
		age: 29,
		gender: "Female",
		occupation: "Marketing Manager",
		eventsAttended: 1,
		totalSpent: 500,
		plusOnes: 0,
		avgPlusOnes: 0,
		segments: ["VIP Guests", "Wedding Attendees"],
		lastEventLabel: "Wedding",
		lastEventDate: "2024-06-15",
		daysSinceLastEvent: 186,
		avgTicketPrice: 500,
		totalTicketsPurchased: 1,
		purchaseFrequency: "rarely",
		rsvpReliability: "reliable",
		lifetimeValue: 500,
		birthdayMonth: "Jun",
		eventHistory: [
			{
				name: "Johnson Wedding",
				date: "Jun 15, 2024",
				type: "Wedding",
				ticketType: "VIP Admission",
				amount: 500,
			},
		],
		communicationPreferences: ["Prefers email communication"],
	},
	{
		id: "emily-rodriguez",
		name: "Emily Rodriguez",
		initials: "ER",
		color: "bg-pink-500",
		email: "emily.r@email.com",
		phone: "+1-555-0103",
		location: "Los Angeles, CA",
		ageRange: "45-54",
		age: 48,
		gender: "Female",
		occupation: "Event Director",
		eventsAttended: 1,
		totalSpent: 2000,
		plusOnes: 0,
		avgPlusOnes: 0,
		segments: ["VIP Guests", "High Spenders"],
		lastEventLabel: "Fundraiser",
		lastEventDate: "2024-05-05",
		daysSinceLastEvent: 227,
		avgTicketPrice: 2000,
		totalTicketsPurchased: 2,
		purchaseFrequency: "annual",
		rsvpReliability: "reliable",
		lifetimeValue: 2000,
		birthdayMonth: "Nov",
		optedOutSMS: true,
		eventHistory: [
			{
				name: "Charity Fundraiser LA",
				date: "May 5, 2024",
				type: "Fundraiser",
				ticketType: "Executive Table",
				amount: 2000,
			},
		],
		communicationPreferences: ["Prefers SMS", "Opted out of phone calls"],
	},
	{
		id: "michael-chen",
		name: "Michael Chen",
		initials: "MC",
		color: "bg-orange-500",
		email: "michael.chen@email.com",
		phone: "+1-555-0102",
		location: "San Francisco, CA",
		ageRange: "35-44",
		age: 38,
		gender: "Male",
		occupation: "Product Manager",
		eventsAttended: 2,
		totalSpent: 1049,
		plusOnes: 1,
		avgPlusOnes: 0.5,
		segments: ["Corporate Event Attendees", "Frequent Attendees"],
		lastEventLabel: "Corporate",
		lastEventDate: "2024-10-03",
		daysSinceLastEvent: 45,
		avgTicketPrice: 524.5,
		totalTicketsPurchased: 3,
		purchaseFrequency: "quarterly",
		rsvpReliability: "moderate",
		lifetimeValue: 1049,
		birthdayMonth: "Feb",
		eventHistory: [
			{
				name: "Tech Corporate Summit",
				date: "Oct 3, 2024",
				type: "Corporate",
				ticketType: "Corporate Pass",
				amount: 850,
			},
			{
				name: "Innovation Meetup",
				date: "Mar 12, 2024",
				type: "Conference",
				ticketType: "Standard",
				amount: 199,
			},
		],
		communicationPreferences: ["Subscribed to all channels"],
	},
	// Adding more mock guests for better filtering
	{
		id: "jennifer-williams",
		name: "Jennifer Williams",
		initials: "JW",
		color: "bg-purple-500",
		email: "jennifer.w@email.com",
		phone: "+1-555-0105",
		location: "Chicago, IL",
		ageRange: "25-34",
		age: 31,
		gender: "Female",
		occupation: "Designer",
		eventsAttended: 3,
		totalSpent: 750,
		plusOnes: 2,
		avgPlusOnes: 0.67,
		segments: ["Frequent Attendees", "Wedding Attendees"],
		lastEventLabel: "Wedding",
		lastEventDate: "2024-09-10",
		daysSinceLastEvent: 68,
		avgTicketPrice: 250,
		totalTicketsPurchased: 5,
		purchaseFrequency: "monthly",
		rsvpReliability: "reliable",
		lifetimeValue: 750,
		birthdayMonth: "Apr",
		eventHistory: [
			{
				name: "Summer Wedding",
				date: "Sep 10, 2024",
				type: "Wedding",
				ticketType: "Standard",
				amount: 250,
			},
			{
				name: "Spring Gala",
				date: "May 15, 2024",
				type: "Fundraiser",
				ticketType: "Standard",
				amount: 250,
			},
			{
				name: "Winter Ball",
				date: "Dec 20, 2023",
				type: "Fundraiser",
				ticketType: "Standard",
				amount: 250,
			},
		],
		communicationPreferences: [],
	},
	{
		id: "robert-taylor",
		name: "Robert Taylor",
		initials: "RT",
		color: "bg-indigo-500",
		email: "robert.t@email.com",
		phone: "+1-555-0106",
		location: "Seattle, WA",
		ageRange: "55-64",
		age: 58,
		gender: "Male",
		occupation: "Executive",
		eventsAttended: 4,
		totalSpent: 3500,
		plusOnes: 3,
		avgPlusOnes: 0.75,
		segments: ["VIP Guests", "High Spenders", "Frequent Attendees"],
		lastEventLabel: "Corporate",
		lastEventDate: "2024-11-15",
		daysSinceLastEvent: 8,
		avgTicketPrice: 875,
		totalTicketsPurchased: 8,
		purchaseFrequency: "monthly",
		rsvpReliability: "reliable",
		lifetimeValue: 3500,
		birthdayMonth: "Jan",
		eventHistory: [
			{
				name: "Executive Summit",
				date: "Nov 15, 2024",
				type: "Corporate",
				ticketType: "VIP",
				amount: 1200,
			},
			{
				name: "Tech Conference",
				date: "Aug 20, 2024",
				type: "Conference",
				ticketType: "Premium",
				amount: 800,
			},
			{
				name: "Business Gala",
				date: "Jun 5, 2024",
				type: "Corporate",
				ticketType: "VIP",
				amount: 1000,
			},
			{
				name: "Spring Networking",
				date: "Apr 12, 2024",
				type: "Corporate",
				ticketType: "Standard",
				amount: 500,
			},
		],
		communicationPreferences: [],
	},
];

const sortOptions: { value: SortField; label: string }[] = [
	{ value: "name", label: "Name" },
	{ value: "lastEvent", label: "Last Event" },
	{ value: "totalSpent", label: "Total Spent" },
	{ value: "events", label: "Attendance" },
	{ value: "segments", label: "Segments" },
];

const exportOptions = [
	{ value: "csv", label: "CSV" },
	{ value: "json", label: "JSON" },
	{ value: "xlsx", label: "Excel" },
];

const defaultFilters: GuestFilters = {
	segments: [],
	eventTypes: [],
	ageRange: [18, 65],
	location: "",
	spendingRange: [0, 10000],
	spendingLevel: "all",
	attendance: "all",
	lastEventDate: "all",
	optOuts: [],
	avgTicketPrice: [0, 500],
	totalTicketsPurchased: [0, 20],
	multiTicketBuyersOnly: false,
	purchaseFrequency: "all",
	birthdayMonths: [],
	daysSinceLastEvent: 365,
	engagementRecency: "",
	ltvRange: [0, 10000],
	ltvLevel: "",
	rsvpReliability: "all",
	avgPlusOnes: [0, 5],
	frequentlyBringsPlusOnes: false,
};

export default function GuestDatabaseTabContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortField, setSortField] = useState<SortField>("lastEvent");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
	const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);
	const [activeDrawerGuest, setActiveDrawerGuest] = useState<Guest | null>(
		null,
	);
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState<GuestFilters>(defaultFilters);

	const getAgeFromRange = (ageRange: string): number => {
		const [min] = ageRange.split("-").map(Number);
		return min || 18;
	};

	const filteredGuests = useMemo(() => {
		let result = [...guests];

		// Search filter
		if (searchTerm) {
			const query = searchTerm.toLowerCase();
			result = result.filter((guest) => {
				return (
					guest.name.toLowerCase().includes(query) ||
					guest.email.toLowerCase().includes(query) ||
					guest.segments.some((segment) =>
						segment.toLowerCase().includes(query),
					)
				);
			});
		}

		// Segment filter
		if (filters.segments.length > 0) {
			result = result.filter((guest) =>
				filters.segments.some((segment) => guest.segments.includes(segment)),
			);
		}

		// Event type filter
		if (filters.eventTypes.length > 0) {
			result = result.filter((guest) =>
				guest.eventHistory.some((event) =>
					filters.eventTypes.includes(event.type),
				),
			);
		}

		// Age range filter
		result = result.filter((guest) => {
			const age = guest.age;
			return age >= filters.ageRange[0] && age <= filters.ageRange[1];
		});

		// Location filter
		if (filters.location) {
			const locationLower = filters.location.toLowerCase();
			result = result.filter((guest) =>
				guest.location.toLowerCase().includes(locationLower),
			);
		}

		// Spending range filter
		result = result.filter((guest) => {
			return (
				guest.totalSpent >= filters.spendingRange[0] &&
				guest.totalSpent <= filters.spendingRange[1]
			);
		});

		// Spending level filter
		if (filters.spendingLevel !== "all") {
			result = result.filter((guest) => {
				if (filters.spendingLevel === "high") return guest.totalSpent >= 1000;
				if (filters.spendingLevel === "medium")
					return guest.totalSpent >= 500 && guest.totalSpent < 1000;
				if (filters.spendingLevel === "low") return guest.totalSpent < 500;
				return true;
			});
		}

		// Attendance filter
		if (filters.attendance !== "all") {
			result = result.filter((guest) => {
				if (filters.attendance === "frequent") return guest.eventsAttended >= 3;
				if (filters.attendance === "occasional")
					return guest.eventsAttended >= 2 && guest.eventsAttended <= 3;
				if (filters.attendance === "first-time")
					return guest.eventsAttended === 1;
				return true;
			});
		}

		// Last event date filter
		if (filters.lastEventDate !== "all") {
			const now = new Date();
			result = result.filter((guest) => {
				const lastEventDate = new Date(guest.lastEventDate);
				const daysDiff = Math.floor(
					(now.getTime() - lastEventDate.getTime()) / (1000 * 60 * 60 * 24),
				);
				if (filters.lastEventDate === "30") return daysDiff <= 30;
				if (filters.lastEventDate === "180") return daysDiff <= 180;
				if (filters.lastEventDate === "365") return daysDiff <= 365;
				if (filters.lastEventDate === "365+") return daysDiff > 365;
				return true;
			});
		}

		// Opt-outs filter
		if (filters.optOuts.length > 0) {
			result = result.filter((guest) => {
				if (filters.optOuts.includes("email") && !guest.optedOutEmail)
					return false;
				if (filters.optOuts.includes("sms") && !guest.optedOutSMS) return false;
				if (filters.optOuts.includes("physical") && !guest.optedOutPhysical)
					return false;
				return true;
			});
		}

		// Avg ticket price filter
		result = result.filter((guest) => {
			return (
				guest.avgTicketPrice >= filters.avgTicketPrice[0] &&
				guest.avgTicketPrice <= filters.avgTicketPrice[1]
			);
		});

		// Total tickets purchased filter
		result = result.filter((guest) => {
			return (
				guest.totalTicketsPurchased >= filters.totalTicketsPurchased[0] &&
				guest.totalTicketsPurchased <= filters.totalTicketsPurchased[1]
			);
		});

		// Multi-ticket buyers only
		if (filters.multiTicketBuyersOnly) {
			result = result.filter((guest) => guest.totalTicketsPurchased >= 2);
		}

		// Purchase frequency filter
		if (filters.purchaseFrequency !== "all") {
			result = result.filter(
				(guest) => guest.purchaseFrequency === filters.purchaseFrequency,
			);
		}

		// Birthday months filter
		if (filters.birthdayMonths.length > 0) {
			result = result.filter(
				(guest) =>
					guest.birthdayMonth &&
					filters.birthdayMonths.includes(guest.birthdayMonth),
			);
		}

		// Days since last event filter
		result = result.filter(
			(guest) => guest.daysSinceLastEvent <= filters.daysSinceLastEvent,
		);

		// Engagement recency filter
		if (filters.engagementRecency) {
			result = result.filter((guest) => {
				if (filters.engagementRecency === "active")
					return guest.daysSinceLastEvent <= 30;
				if (filters.engagementRecency === "recent")
					return (
						guest.daysSinceLastEvent > 30 && guest.daysSinceLastEvent <= 90
					);
				if (filters.engagementRecency === "at-risk")
					return (
						guest.daysSinceLastEvent > 90 && guest.daysSinceLastEvent <= 180
					);
				if (filters.engagementRecency === "inactive")
					return guest.daysSinceLastEvent > 180;
				return true;
			});
		}

		// LTV range filter
		result = result.filter((guest) => {
			return (
				guest.lifetimeValue >= filters.ltvRange[0] &&
				guest.lifetimeValue <= filters.ltvRange[1]
			);
		});

		// LTV level filter
		if (filters.ltvLevel) {
			result = result.filter((guest) => {
				if (filters.ltvLevel === "high") return guest.lifetimeValue >= 5000;
				if (filters.ltvLevel === "medium")
					return guest.lifetimeValue >= 1000 && guest.lifetimeValue < 5000;
				if (filters.ltvLevel === "low") return guest.lifetimeValue < 1000;
				return true;
			});
		}

		// RSVP reliability filter
		if (filters.rsvpReliability !== "all") {
			result = result.filter(
				(guest) => guest.rsvpReliability === filters.rsvpReliability,
			);
		}

		// Avg plus-ones filter
		result = result.filter((guest) => {
			return (
				guest.avgPlusOnes >= filters.avgPlusOnes[0] &&
				guest.avgPlusOnes <= filters.avgPlusOnes[1]
			);
		});

		// Frequently brings plus-ones
		if (filters.frequentlyBringsPlusOnes) {
			result = result.filter((guest) => guest.avgPlusOnes >= 1);
		}

		return result;
	}, [searchTerm, filters]);

	const sortedGuests = useMemo(() => {
		const data = [...filteredGuests];
		data.sort((a, b) => {
			const multiplier = sortDirection === "asc" ? 1 : -1;
			switch (sortField) {
				case "name":
					return (
						a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) *
						multiplier
					);
				case "lastEvent":
					return (
						(new Date(a.lastEventDate).getTime() -
							new Date(b.lastEventDate).getTime()) *
						multiplier
					);
				case "totalSpent":
					return (a.totalSpent - b.totalSpent) * multiplier;
				case "events":
					return (a.eventsAttended - b.eventsAttended) * multiplier;
				case "segments":
					return (
						(a.segments[0] || "").localeCompare(b.segments[0] || "") *
						multiplier
					);
				default:
					return 0;
			}
		});
		return data;
	}, [filteredGuests, sortDirection, sortField]);

	const selectedCount = selectedGuestIds.length;
	const allVisibleIds = sortedGuests.map((guest) => guest.id);
	const allVisibleSelected =
		allVisibleIds.length > 0 &&
		allVisibleIds.every((id) => selectedGuestIds.includes(id));

	const toggleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedGuestIds(allVisibleIds);
		} else {
			setSelectedGuestIds([]);
		}
	};

	const toggleSelectGuest = (guestId: string, checked: boolean) => {
		setSelectedGuestIds((prev) =>
			checked ? [...prev, guestId] : prev.filter((id) => id !== guestId),
		);
	};

	const handleSortFieldChange = (field: SortField) => {
		if (field === sortField) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortField(field);
			setSortDirection(field === "name" ? "asc" : "desc");
		}
	};

	const handleExport = (format: string) => {
		console.log("Export guests as", format, selectedGuestIds);
	};

	return (
		<>
			<div className="flex gap-4 relative">
				{/* Filter Sidebar */}
				{showFilters && (
					<div className="w-80 shrink-0">
						<GuestFiltersSidebar
							isOpen={showFilters}
							onClose={() => setShowFilters(false)}
							filters={filters}
							onFiltersChange={setFilters}
							matchCount={filteredGuests.length}
						/>
					</div>
				)}

				{/* Main Content */}
				<Card
					className={cn("flex-1 overflow-hidden flex flex-col transition-all")}
				>
					<CardContent className="p-4 sm:p-6 space-y-4 flex-1 flex flex-col overflow-hidden">
						<div>
							<h2 className="text-xl font-semibold">Guest Database</h2>
							<p className="text-sm text-muted-foreground">
								Browse and filter all historical guests
							</p>
						</div>

						<div className="space-y-3">
							<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search guests by name or email..."
										className="pl-10"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								<div className="flex flex-wrap items-center gap-2">
									<Button
										variant="outline"
										className="flex items-center gap-2"
										onClick={() => setShowFilters(!showFilters)}
									>
										<Filter className="h-4 w-4" />
										Filters
									</Button>

									<div className="relative">
										<ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Select
											value={sortField}
											onValueChange={(value: SortField) =>
												handleSortFieldChange(value)
											}
										>
											<SelectTrigger className="w-[170px] pl-9">
												<SelectValue placeholder="Sort by" />
											</SelectTrigger>
											<SelectContent>
												{sortOptions.map((option) => {
													const isActive = sortField === option.value;
													const indicator = isActive;
													return (
														<SelectItem key={option.value} value={option.value}>
															<div className="flex w-full items-center justify-between">
																<span>{option.label}</span>
																{indicator && (
																	<span className="text-xs text-muted-foreground">
																		{indicator}
																	</span>
																)}
															</div>
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							{selectedCount > 0 && (
								<div className="flex flex-col gap-3 rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20 p-4 sm:flex-row sm:items-center sm:justify-between">
									<span className="text-sm font-medium text-blue-900 dark:text-blue-100">
										{selectedCount} guests selected
									</span>
									<div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end">
										<Button
											variant="secondary"
											className="flex items-center gap-2"
										>
											<Plus className="h-4 w-4" />
											Add to Segment
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													className="flex items-center gap-2 bg-white text-blue-900 dark:text-blue-100 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50"
												>
													<FileText className="h-4 w-4" />
													Export
													<ChevronDown className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-44">
												<DropdownMenuItem
													onSelect={() => handleExport("csv")}
													className="flex items-center gap-2"
												>
													<FileText className="h-4 w-4" />
													Export as CSV
												</DropdownMenuItem>
												<DropdownMenuItem
													onSelect={() => handleExport("json")}
													className="flex items-center gap-2"
												>
													<Code className="h-4 w-4" />
													Export as JSON
												</DropdownMenuItem>
												<DropdownMenuItem
													onSelect={() => handleExport("xlsx")}
													className="flex items-center gap-2"
												>
													<TableIcon className="h-4 w-4" />
													Export as Excel
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										<Button
											variant="outline"
											className="border-destructive text-destructive hover:bg-destructive/10"
										>
											<Trash2 className="mr-2 h-4 w-4" />
											Remove
										</Button>
									</div>
								</div>
							)}
						</div>

						<div className="flex-1 overflow-auto">
							<GuestTable
								guests={sortedGuests}
								selectedIds={selectedGuestIds}
								allVisibleSelected={allVisibleSelected}
								onSelectGuest={toggleSelectGuest}
								onSelectAll={toggleSelectAll}
								sortField={sortField}
								sortDirection={sortDirection}
								onSortFieldChange={handleSortFieldChange}
								onRowClick={(guest) => setActiveDrawerGuest(guest as Guest)}
							/>
						</div>
					</CardContent>
				</Card>
			</div>

			<GuestProfileDrawer
				guest={activeDrawerGuest}
				onClose={() => setActiveDrawerGuest(null)}
			/>
		</>
	);
}
