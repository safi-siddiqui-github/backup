"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface EngagementRecencyFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function EngagementRecencyFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: EngagementRecencyFilterProps) {
	return (
		<FilterSection
			title="Engagement Recency"
			isOpen={isOpen}
			onToggle={onToggle}
		>
			<div className="space-y-4 pt-2">
				<div>
					<Label className="text-xs text-muted-foreground mb-2 block">
						Days Since Last Event
					</Label>
					<Slider
						value={[filters.daysSinceLastEvent]}
						onValueChange={(value) => onUpdate("daysSinceLastEvent", value[0])}
						min={0}
						max={365}
						step={1}
						className="mb-2"
					/>
					<div className="text-xs text-muted-foreground text-right">
						{filters.daysSinceLastEvent}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{[
						{ value: "active", label: "Active (0-30)" },
						{ value: "recent", label: "Recent (31-90)" },
						{ value: "at-risk", label: "At Risk (91-180)" },
						{ value: "inactive", label: "Inactive (180+)" },
					].map((btn) => (
						<Button
							key={btn.value}
							variant={
								filters.engagementRecency === btn.value ? "default" : "outline"
							}
							size="sm"
							onClick={() => {
								const days =
									btn.value === "active"
										? 30
										: btn.value === "recent"
											? 90
											: btn.value === "at-risk"
												? 180
												: 365;
								onUpdate("daysSinceLastEvent", days);
								onUpdate("engagementRecency", btn.value);
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
