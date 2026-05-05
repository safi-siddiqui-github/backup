"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeFilterComponentProps {
	dateRange: DateRange | undefined;
	onDateRangeChange: (range: DateRange | undefined) => void;
}

export default function DateRangeFilterComponent({
	dateRange,
	onDateRangeChange,
}: DateRangeFilterComponentProps) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-lg font-medium">Date Range</p>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="justify-start text-left font-normal"
					>
						<CalendarIcon />
						{dateRange?.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, "LLL dd, y")} -{" "}
									{format(dateRange.to, "LLL dd, y")}
								</>
							) : (
								format(dateRange.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date range</span>
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
			{dateRange && (
				<Button
					variant="ghost"
					size="sm"
					onClick={() => onDateRangeChange(undefined)}
					className="w-fit"
				>
					<X className="h-4 w-4 mr-1" />
					Clear dates
				</Button>
			)}
		</div>
	);
}
