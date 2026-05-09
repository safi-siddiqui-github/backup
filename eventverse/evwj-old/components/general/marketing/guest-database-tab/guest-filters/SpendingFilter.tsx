"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface SpendingFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function SpendingFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: SpendingFilterProps) {
	return (
		<FilterSection title="Spending" isOpen={isOpen} onToggle={onToggle}>
			<div className="space-y-4 pt-2">
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Range
					</Label>
					<Slider
						value={filters.spendingRange}
						onValueChange={(value) =>
							onUpdate("spendingRange", value as [number, number])
						}
						min={0}
						max={10000}
						step={100}
						className="mb-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>${filters.spendingRange[0]}</span>
						<span>${filters.spendingRange[1]}</span>
					</div>
				</div>
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Spending Level
					</Label>
					<RadioGroup
						value={filters.spendingLevel}
						onValueChange={(value) => onUpdate("spendingLevel", value)}
					>
						<div className="space-y-2">
							{["all", "high", "medium", "low"].map((level) => (
								<div key={level} className="flex items-center space-x-2">
									<RadioGroupItem value={level} id={`spending-${level}`} />
									<Label
										htmlFor={`spending-${level}`}
										className="text-sm cursor-pointer"
									>
										{level === "all"
											? "All"
											: level === "high"
												? "High ($1000+)"
												: level === "medium"
													? "Medium ($500-$999)"
													: "Low (<$500)"}
									</Label>
								</div>
							))}
						</div>
					</RadioGroup>
				</div>
			</div>
		</FilterSection>
	);
}
