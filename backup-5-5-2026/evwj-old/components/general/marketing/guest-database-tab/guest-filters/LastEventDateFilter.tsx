"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface LastEventDateFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function LastEventDateFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: LastEventDateFilterProps) {
	return (
		<FilterSection title="Last Event Date" isOpen={isOpen} onToggle={onToggle}>
			<div className="pt-2">
				<RadioGroup
					value={filters.lastEventDate}
					onValueChange={(value) => onUpdate("lastEventDate", value)}
				>
					<div className="space-y-2">
						{["all", "30", "180", "365", "365+"].map((period) => (
							<div key={period} className="flex items-center space-x-2">
								<RadioGroupItem value={period} id={`date-${period}`} />
								<Label
									htmlFor={`date-${period}`}
									className="text-sm cursor-pointer"
								>
									{period === "all"
										? "All time"
										: period === "30"
											? "Last 30 days"
											: period === "180"
												? "Last 6 months"
												: period === "365"
													? "Last year"
													: "More than 1 year ago"}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
			</div>
		</FilterSection>
	);
}
