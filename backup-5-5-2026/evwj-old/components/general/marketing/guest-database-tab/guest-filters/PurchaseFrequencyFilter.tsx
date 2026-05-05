"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface PurchaseFrequencyFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function PurchaseFrequencyFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: PurchaseFrequencyFilterProps) {
	return (
		<FilterSection
			title="Purchase Frequency"
			isOpen={isOpen}
			onToggle={onToggle}
		>
			<div className="pt-2">
				<RadioGroup
					value={filters.purchaseFrequency}
					onValueChange={(value) => onUpdate("purchaseFrequency", value)}
				>
					<div className="space-y-2">
						{["all", "monthly", "quarterly", "annual", "rarely"].map((freq) => (
							<div key={freq} className="flex items-center space-x-2">
								<RadioGroupItem value={freq} id={`freq-${freq}`} />
								<Label
									htmlFor={`freq-${freq}`}
									className="text-sm cursor-pointer"
								>
									{freq === "all"
										? "All"
										: freq === "monthly"
											? "Monthly attenders"
											: freq === "quarterly"
												? "Quarterly attenders"
												: freq === "annual"
													? "Annual attenders"
													: "Rarely (<1/year)"}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
			</div>
		</FilterSection>
	);
}
