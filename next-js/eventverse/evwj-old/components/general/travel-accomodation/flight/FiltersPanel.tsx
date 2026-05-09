"use client";

import React, { useState } from "react";
import { CalendarDays, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "../../../ui/input";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../../../ui/select";
import { toast } from "sonner";
import { Button } from "../../../ui/button";

type Props = {
	flightsCount: number;
};

export default function FiltersPanel({ flightsCount }: Props) {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
		from: new Date("2024-07-18"),
		to: new Date("2024-07-23"),
	}));

	// Helper to compare dates without time
	const isBeforeToday = (date: Date): boolean => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const compareDate = new Date(date);
		compareDate.setHours(0, 0, 0, 0);
		return compareDate < today;
	};

	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<CardContent className="p-5 sm:p-6">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<h3 className="text-lg font-semibold text-foreground">
						Find Flights
					</h3>
					<div className="flex flex-wrap items-center gap-3">
						<div className="w-full sm:w-56">
							<label className="sr-only">Travel Dates</label>
							<Popover>
								<PopoverTrigger asChild>
									<button
										type="button"
										className="w-full text-left rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none flex justify-between items-center [background-color:white] dark:[background-color:#020617] hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
									>
										<span className="truncate">
											<span className="font-medium">
												{dateRange && dateRange.from
													? format(dateRange.from, "MMM d, yyyy")
													: "Departure"}
											</span>
											<span className="mx-2 text-gray-400">—</span>
											<span className="font-medium">
												{dateRange && dateRange.to
													? format(dateRange.to, "MMM d, yyyy")
													: "Return"}
											</span>
										</span>
										<CalendarDays className="h-5 w-5 text-gray-500 dark:text-gray-300 flex-shrink-0 ml-2" />
									</button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
									align="start"
								>
									<Calendar
										mode="range"
										selected={dateRange}
										onSelect={(r) => {
											const newRange = r as DateRange | undefined;
											setDateRange(newRange);
										}}
										disabled={isBeforeToday}
										numberOfMonths={2}
										className="rounded-md border-0"
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="w-full sm:w-48">
							<label className="sr-only">Departure Airport</label>
							<Select>
								<SelectTrigger className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm text-gray-900 dark:text-gray-100 [background-color:white] dark:[background-color:#020617]">
									<SelectValue placeholder="All Airports" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Airports</SelectLabel>
										<SelectItem value="all">All Airports</SelectItem>
										<SelectItem value="jfk">JFK</SelectItem>
										<SelectItem value="lga">LGA</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* Arrival airport select removed to avoid duplicate 'All Airports' - using single airport selector above */}

						<div className="w-full sm:w-44">
							<label className="sr-only">Airline</label>
							<Select>
								<SelectTrigger className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm text-gray-900 dark:text-gray-100 [background-color:white] dark:[background-color:#020617]">
									<SelectValue placeholder="Any Airline" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Airlines</SelectLabel>
										<SelectItem value="all">All Airlines</SelectItem>
										<SelectItem value="united">United Airlines</SelectItem>
										<SelectItem value="delta">Delta</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<button
							onClick={() => toast("Filters reset to event dates")}
							className="mt-2 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground hover:bg-gray-50 dark:hover:bg-[#020617] lg:mt-0"
						>
							<RefreshCcw className="h-4 w-4" /> Reset
						</button>

						{/* search removed from filter panel per request */}
					</div>
				</div>
				<div className="mt-4 text-sm text-muted-foreground">
					{flightsCount} flights found
				</div>
			</CardContent>
		</Card>
	);
}
