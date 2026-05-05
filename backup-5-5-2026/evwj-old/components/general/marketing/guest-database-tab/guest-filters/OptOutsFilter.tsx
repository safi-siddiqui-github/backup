"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface OptOutsFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function OptOutsFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: OptOutsFilterProps) {
	return (
		<FilterSection title="Opt-outs" isOpen={isOpen} onToggle={onToggle}>
			<div className="space-y-2 pt-2">
				{["email", "sms", "physical"].map((opt) => (
					<div key={opt} className="flex items-center space-x-2">
						<Checkbox
							id={`opt-${opt}`}
							checked={filters.optOuts.includes(opt)}
							onCheckedChange={(checked) => {
								if (checked) {
									onUpdate("optOuts", [...filters.optOuts, opt]);
								} else {
									onUpdate(
										"optOuts",
										filters.optOuts.filter((o) => o !== opt),
									);
								}
							}}
						/>
						<Label htmlFor={`opt-${opt}`} className="text-sm cursor-pointer">
							Opted out of{" "}
							{opt === "email"
								? "email"
								: opt === "sms"
									? "SMS"
									: "physical mail"}
						</Label>
					</div>
				))}
			</div>
		</FilterSection>
	);
}
