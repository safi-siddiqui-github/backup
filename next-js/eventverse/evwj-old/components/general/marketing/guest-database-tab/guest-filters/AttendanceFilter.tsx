"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterSection from "./FilterSection";
import { GuestFilters } from "./types";

interface AttendanceFilterProps {
	isOpen: boolean;
	onToggle: () => void;
	filters: GuestFilters;
	onUpdate: <K extends keyof GuestFilters>(
		key: K,
		value: GuestFilters[K],
	) => void;
}

export default function AttendanceFilter({
	isOpen,
	onToggle,
	filters,
	onUpdate,
}: AttendanceFilterProps) {
	return (
		<FilterSection title="Attendance" isOpen={isOpen} onToggle={onToggle}>
			<div className="pt-2">
				<RadioGroup
					value={filters.attendance}
					onValueChange={(value) => onUpdate("attendance", value)}
				>
					<div className="space-y-2">
						{["all", "frequent", "occasional", "first-time"].map((att) => (
							<div key={att} className="flex items-center space-x-2">
								<RadioGroupItem value={att} id={`attendance-${att}`} />
								<Label
									htmlFor={`attendance-${att}`}
									className="text-sm cursor-pointer"
								>
									{att === "all"
										? "All"
										: att === "frequent"
											? "Frequent (3+ events)"
											: att === "occasional"
												? "Occasional (2-3 events)"
												: "First-time (1 event)"}
								</Label>
							</div>
						))}
					</div>
				</RadioGroup>
			</div>
		</FilterSection>
	);
}
