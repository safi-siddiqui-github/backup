"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FilterSection from "./FilterSection";
import { SEGMENTS } from "./types";
import { GuestFilters } from "./types";

interface SegmentsFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function SegmentsFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: SegmentsFilterProps) {
	return (
		<FilterSection title="Segments" isOpen={isOpen} onToggle={onToggle}>
			<div className="space-y-2 pt-2">
				{SEGMENTS.map((segment) => (
					<div key={segment} className="flex items-center space-x-2">
						<Checkbox
							id={`segment-${segment}`}
							checked={filters.segments.includes(segment)}
							onCheckedChange={(checked) => {
								if (checked) {
									onUpdate("segments", [...filters.segments, segment]);
								} else {
									onUpdate(
										"segments",
										filters.segments.filter((s) => s !== segment),
									);
								}
							}}
						/>
						<Label
							htmlFor={`segment-${segment}`}
							className="text-sm cursor-pointer"
						>
							{segment} (45)
						</Label>
					</div>
				))}
			</div>
		</FilterSection>
	);
}
