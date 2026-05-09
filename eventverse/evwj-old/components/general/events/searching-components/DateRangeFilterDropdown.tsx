"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeFilterDropdownProps {
	dateRange: DateRange | undefined;
	onDateRangeChange: (range: DateRange | undefined) => void;
}

export default function DateRangeFilterDropdown({
	dateRange,
	onDateRangeChange,
}: DateRangeFilterDropdownProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="justify-between gap-1.5 text-xs sm:text-sm whitespace-nowrap shrink-0">
					<div className="flex items-center gap-1.5">
						<CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
						<span className="truncate">
							{dateRange?.from
								? dateRange.to
									? `${format(dateRange.from, "LLL dd")} - ${format(dateRange.to, "LLL dd")}`
									: format(dateRange.from, "LLL dd, y")
								: "Date"}
						</span>
					</div>
					{dateRange ? (
						<X
							className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50 hover:opacity-100 shrink-0"
							onClick={(e) => {
								e.stopPropagation();
								onDateRangeChange(undefined);
							}}
						/>
					) : (
						<ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50 shrink-0" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="range"
					selected={dateRange}
					onSelect={onDateRangeChange}
					numberOfMonths={2}
				/>
			</PopoverContent>
		</Popover>
	);
}

