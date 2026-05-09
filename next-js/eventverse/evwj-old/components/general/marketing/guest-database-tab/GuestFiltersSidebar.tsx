"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { GuestFilters } from "./guest-filters/types";
import SegmentsFilter from "./guest-filters/SegmentsFilter";
import EventTypeFilter from "./guest-filters/EventTypeFilter";
import DemographicsFilter from "./guest-filters/DemographicsFilter";
import SpendingFilter from "./guest-filters/SpendingFilter";
import AttendanceFilter from "./guest-filters/AttendanceFilter";
import LastEventDateFilter from "./guest-filters/LastEventDateFilter";
import OptOutsFilter from "./guest-filters/OptOutsFilter";
import TicketPurchaseBehaviorFilter from "./guest-filters/TicketPurchaseBehaviorFilter";
import PurchaseFrequencyFilter from "./guest-filters/PurchaseFrequencyFilter";
import BirthdayTargetingFilter from "./guest-filters/BirthdayTargetingFilter";
import EngagementRecencyFilter from "./guest-filters/EngagementRecencyFilter";
import LifetimeValueFilter from "./guest-filters/LifetimeValueFilter";
import RSVPReliabilityFilter from "./guest-filters/RSVPReliabilityFilter";
import PlusOnePatternsFilter from "./guest-filters/PlusOnePatternsFilter";

export type { GuestFilters };

interface GuestFiltersSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	filters: GuestFilters;
	onFiltersChange: (filters: GuestFilters) => void;
	matchCount: number;
}

export default function GuestFiltersSidebar({
	isOpen,
	onClose,
	filters,
	onFiltersChange,
	matchCount,
}: GuestFiltersSidebarProps) {
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({
		segments: false,
		eventTypes: false,
		demographics: false,
		spending: false,
		attendance: false,
		lastEventDate: false,
		optOuts: false,
		ticketPurchase: false,
		purchaseFrequency: false,
		birthdayTargeting: false,
		engagementRecency: false,
		lifetimeValue: false,
		rsvpReliability: false,
		plusOnePatterns: false,
	});

	const toggleSection = (section: string) => {
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const updateFilter = <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => {
		onFiltersChange({ ...filters, [key]: value });
	};

	const clearAllFilters = () => {
		onFiltersChange({
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
		});
	};

	const hasActiveFilters = () => {
		return (
			filters.segments.length > 0 ||
			filters.eventTypes.length > 0 ||
			filters.ageRange[0] !== 18 ||
			filters.ageRange[1] !== 65 ||
			filters.location !== "" ||
			filters.spendingRange[0] !== 0 ||
			filters.spendingRange[1] !== 10000 ||
			filters.spendingLevel !== "all" ||
			filters.attendance !== "all" ||
			filters.lastEventDate !== "all" ||
			filters.optOuts.length > 0 ||
			filters.avgTicketPrice[0] !== 0 ||
			filters.avgTicketPrice[1] !== 500 ||
			filters.totalTicketsPurchased[0] !== 0 ||
			filters.totalTicketsPurchased[1] !== 20 ||
			filters.multiTicketBuyersOnly ||
			filters.purchaseFrequency !== "all" ||
			filters.birthdayMonths.length > 0 ||
			filters.daysSinceLastEvent !== 365 ||
			filters.engagementRecency !== "" ||
			filters.ltvRange[0] !== 0 ||
			filters.ltvRange[1] !== 10000 ||
			filters.ltvLevel !== "" ||
			filters.rsvpReliability !== "all" ||
			filters.avgPlusOnes[0] !== 0 ||
			filters.avgPlusOnes[1] !== 5 ||
			filters.frequentlyBringsPlusOnes
		);
	};

	if (!isOpen) return null;

	return (
		<div className="w-80 border bg-white dark:bg-slate-900 overflow-y-auto p-4 space-y-6 sticky top-0 h-full rounded-lg">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h3 className="font-semibold">Filters</h3>
					<span className="text-sm text-muted-foreground">
						{matchCount} guests match
					</span>
				</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={onClose}
					className="h-6 w-6"
				>
					<X className="h-4 w-4" />
				</Button>
			</div>

			{hasActiveFilters() && (
				<Button variant="outline" onClick={clearAllFilters} className="w-full">
					Clear All Filters
				</Button>
			)}

			<div className="space-y-2">
				<SegmentsFilter
					isOpen={openSections.segments}
					onToggle={() => toggleSection("segments")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<EventTypeFilter
					isOpen={openSections.eventTypes}
					onToggle={() => toggleSection("eventTypes")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<DemographicsFilter
					isOpen={openSections.demographics}
					onToggle={() => toggleSection("demographics")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<SpendingFilter
					isOpen={openSections.spending}
					onToggle={() => toggleSection("spending")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<AttendanceFilter
					isOpen={openSections.attendance}
					onToggle={() => toggleSection("attendance")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<LastEventDateFilter
					isOpen={openSections.lastEventDate}
					onToggle={() => toggleSection("lastEventDate")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<OptOutsFilter
					isOpen={openSections.optOuts}
					onToggle={() => toggleSection("optOuts")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<TicketPurchaseBehaviorFilter
					isOpen={openSections.ticketPurchase}
					onToggle={() => toggleSection("ticketPurchase")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<PurchaseFrequencyFilter
					isOpen={openSections.purchaseFrequency}
					onToggle={() => toggleSection("purchaseFrequency")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<BirthdayTargetingFilter
					isOpen={openSections.birthdayTargeting}
					onToggle={() => toggleSection("birthdayTargeting")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<EngagementRecencyFilter
					isOpen={openSections.engagementRecency}
					onToggle={() => toggleSection("engagementRecency")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<LifetimeValueFilter
					isOpen={openSections.lifetimeValue}
					onToggle={() => toggleSection("lifetimeValue")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<RSVPReliabilityFilter
					isOpen={openSections.rsvpReliability}
					onToggle={() => toggleSection("rsvpReliability")}
					filters={filters}
					onUpdate={updateFilter}
				/>
				<PlusOnePatternsFilter
					isOpen={openSections.plusOnePatterns}
					onToggle={() => toggleSection("plusOnePatterns")}
					filters={filters}
					onUpdate={updateFilter}
				/>
			</div>
		</div>
	);
}
