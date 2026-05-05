"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface PlusOnePatternsFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function PlusOnePatternsFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: PlusOnePatternsFilterProps) {
	return (
		<FilterSection
			title="Plus-One Patterns"
			isOpen={isOpen}
			onToggle={onToggle}
		>
			<div className="space-y-4 pt-2">
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Avg Plus-Ones
					</Label>
					<Slider
						value={filters.avgPlusOnes}
						onValueChange={(value) =>
							onUpdate("avgPlusOnes", value as [number, number])
						}
						min={0}
						max={5}
						step={1}
						className="mb-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>{filters.avgPlusOnes[0]}</span>
						<span>{filters.avgPlusOnes[1]}</span>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox
						id="frequent-plus-ones"
						checked={filters.frequentlyBringsPlusOnes}
						onCheckedChange={(checked) =>
							onUpdate("frequentlyBringsPlusOnes", Boolean(checked))
						}
					/>
					<Label
						htmlFor="frequent-plus-ones"
						className="text-sm cursor-pointer"
					>
						Frequently brings plus-ones
					</Label>
				</div>
			</div>
		</FilterSection>
	);
}
