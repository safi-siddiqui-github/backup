"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FilterSection from "./FilterSection";
import { EVENT_TYPES } from "./types";
import { GuestFilters } from "./types";

interface EventTypeFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function EventTypeFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: EventTypeFilterProps) {
	return (
		<FilterSection title="Event Type" isOpen={isOpen} onToggle={onToggle}>
			<div className="space-y-2 pt-2">
				{EVENT_TYPES.map((type) => (
					<div key={type} className="flex items-center space-x-2">
						<Checkbox
							id={`event-${type}`}
							checked={filters.eventTypes.includes(type)}
							onCheckedChange={(checked) => {
								if (checked) {
									onUpdate("eventTypes", [...filters.eventTypes, type]);
								} else {
									onUpdate(
										"eventTypes",
										filters.eventTypes.filter((t) => t !== type),
									);
								}
							}}
						/>
						<Label htmlFor={`event-${type}`} className="text-sm cursor-pointer">
							{type}
						</Label>
					</div>
				))}
			</div>
		</FilterSection>
	);
}
