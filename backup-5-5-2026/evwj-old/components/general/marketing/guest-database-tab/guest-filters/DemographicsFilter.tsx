"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface DemographicsFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function DemographicsFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: DemographicsFilterProps) {
	return (
		<FilterSection title="Demographics" isOpen={isOpen} onToggle={onToggle}>
			<div className="space-y-4 pt-2">
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Age Range
					</Label>
					<Slider
						value={filters.ageRange}
						onValueChange={(value) =>
							onUpdate("ageRange", value as [number, number])
						}
						min={18}
						max={100}
						step={1}
						className="mb-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>{filters.ageRange[0]}</span>
						<span>{filters.ageRange[1]}+</span>
					</div>
				</div>
				<div>
					<Label
						htmlFor="location"
						className="text-xs text-muted-foreground mb-2 block"
					>
						Location
					</Label>
					<Input
						id="location"
						placeholder="City, State"
						value={filters.location}
						onChange={(e) => onUpdate("location", e.target.value)}
					/>
				</div>
			</div>
		</FilterSection>
	);
}
