"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface StyledDateInputProps {
	label: string;
	value: string;
}

export default function StyledDateInput({
	label,
	value,
}: StyledDateInputProps) {
	// Parse the initial value string to Date
	const parseDate = (dateString: string): Date | undefined => {
		try {
			const parsed = parse(dateString, "MMM d, yyyy", new Date());
			return isNaN(parsed.getTime()) ? undefined : parsed;
		} catch {
			return undefined;
		}
	};

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		parseDate(value),
	);
	const [isOpen, setIsOpen] = useState(false);

	// Helper to compare dates without time
	const isBeforeToday = (date: Date): boolean => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const compareDate = new Date(date);
		compareDate.setHours(0, 0, 0, 0);
		return compareDate < today;
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="w-full justify-start text-left font-normal pl-10 pr-3 !bg-white dark:!bg-slate-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-blue-500 dark:hover:border-blue-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)] relative"
				>
					<CalendarIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
					<span className="block truncate">
						{selectedDate ? format(selectedDate, "MMM d, yyyy") : value}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600"
				align="start"
			>
				<Calendar
					mode="single"
					selected={selectedDate}
					onSelect={(date) => {
						setSelectedDate(date);
						if (date) {
							setIsOpen(false);
						}
					}}
					disabled={isBeforeToday}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
