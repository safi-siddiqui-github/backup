"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface LifetimeValueFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function LifetimeValueFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: LifetimeValueFilterProps) {
	return (
		<FilterSection title="Lifetime Value" isOpen={isOpen} onToggle={onToggle}>
			<div className="space-y-4 pt-2">
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						LTV Range
					</Label>
					<Slider
						value={filters.ltvRange}
						onValueChange={(value) =>
							onUpdate("ltvRange", value as [number, number])
						}
						min={0}
						max={10000}
						step={100}
						className="mb-2"
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>${filters.ltvRange[0]}</span>
						<span>${filters.ltvRange[1]}</span>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2">
					{[
						{ value: "high", label: "High ($5K+)" },
						{ value: "medium", label: "Medium" },
						{ value: "low", label: "Low (<$1K)" },
					].map((btn) => (
						<Button
							key={btn.value}
							variant={filters.ltvLevel === btn.value ? "default" : "outline"}
							size="sm"
							onClick={() => {
								const range: [number, number] =
									btn.value === "high"
										? [5000, 10000]
										: btn.value === "medium"
											? [1000, 4999]
											: [0, 999];
								onUpdate("ltvRange", range);
								onUpdate("ltvLevel", btn.value);
							}}
							className="text-xs"
						>
							{btn.label}
						</Button>
					))}
				</div>
			</div>
		</FilterSection>
	);
}
