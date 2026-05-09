"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface RSVPReliabilityFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function RSVPReliabilityFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: RSVPReliabilityFilterProps) {
	return (
		<FilterSection title="RSVP Reliability" isOpen={isOpen} onToggle={onToggle}>
			<div className="pt-2">
				<RadioGroup
					value={filters.rsvpReliability}
					onValueChange={(value) => onUpdate("rsvpReliability", value)}
				>
					<div className="space-y-2">
						{["all", "reliable", "moderate", "unreliable"].map((rel) => (
							<div key={rel} className="flex items-center space-x-2">
								<RadioGroupItem value={rel} id={`rsvp-${rel}`} />
								<Label
									htmlFor={`rsvp-${rel}`}
									className="text-sm cursor-pointer"
								>
									{rel === "all"
										? "All"
										: rel === "reliable"
											? "Reliable (always shows up)"
											: rel === "moderate"
												? "Moderate (sometimes no-shows)"
												: "Unreliable (frequent no-shows)"}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
			</div>
		</FilterSection>
	);
}
