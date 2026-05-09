"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FilterSection from "./FilterSection";
import { BIRTHDAY_MONTHS } from "./types";
import { GuestFilters } from "./types";

interface BirthdayTargetingFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function BirthdayTargetingFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: BirthdayTargetingFilterProps) {
	return (
		<FilterSection
			title="Birthday Targeting"
			isOpen={isOpen}
			onToggle={onToggle}
		>
			<div className="grid grid-cols-3 gap-2 pt-2">
				{BIRTHDAY_MONTHS.map((month) => (
					<div key={month} className="flex items-center space-x-2">
						<Checkbox
							id={`month-${month}`}
							checked={filters.birthdayMonths.includes(month)}
							onCheckedChange={(checked) => {
								if (checked) {
									onUpdate("birthdayMonths", [
										...filters.birthdayMonths,
										month,
									]);
								} else {
									onUpdate(
										"birthdayMonths",
										filters.birthdayMonths.filter((m) => m !== month),
									);
								}
							}}
						/>
						<Label
							htmlFor={`month-${month}`}
							className="text-sm cursor-pointer"
						>
							{month}
						</Label>
					</div>
				))}
			</div>
		</FilterSection>
	);
}
