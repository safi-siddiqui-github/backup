"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { CalendarDays, RefreshCcw } from "lucide-react";
import { format, parse } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from "../../../ui/select";

type Props = {
	checkIn?: string;
	checkOut?: string;
	query?: string;
	setQuery?: (v: string) => void;
	onDateChange?: (checkIn: string, checkOut: string) => void;
};

export default function HotelFilters({
	checkIn = "Jul 19, 2024",
	checkOut = "Jul 23, 2024",
	query,
	setQuery,
	onDateChange,
}: Props) {
	const [chain, setChain] = useState<string | undefined>(undefined);
	const [price, setPrice] = useState<string | undefined>(undefined);
	const [sortBy, setSortBy] = useState<string | undefined>(undefined);
	// parse incoming default dates to yyyy-MM-dd for native date inputs
	const parseDateSafe = (s: string) => {
		try {
			const d = parse(s, "MMM d, yyyy", new Date());
			if (isNaN(d.getTime())) return "";
			return format(d, "yyyy-MM-dd");
		} catch {
			// fallback
			const d = new Date(s);
			return isNaN(d.getTime()) ? "" : format(d, "yyyy-MM-dd");
		}
	};

	// We use `range` (from react-day-picker) as the source of truth for selected dates.
	const [range, setRange] = useState<DateRange | undefined>(() => {
		const ci = parseDateSafe(checkIn);
		const co = parseDateSafe(checkOut);
		return ci || co
			? {
					from: ci ? new Date(ci) : undefined,
					to: co ? new Date(co) : undefined,
				}
			: undefined;
	});

	return (
		<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<CardContent className="p-6">
				<h3 className="text-xl font-semibold text-foreground mb-5">
					Search Hotels
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="relative">
						<label className="block text-sm font-medium text-foreground mb-1">
							Dates
						</label>
						<Popover>
							<PopoverTrigger asChild>
								<button
									type="button"
									className="w-full text-left rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none flex justify-between items-center [background-color:white] dark:[background-color:#020617] hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
								>
									<span className="truncate">
										<span className="font-medium">
											{range && range.from
												? format(range.from, "MMM d, yyyy")
												: "Check-in"}
										</span>
										<span className="mx-2 text-gray-400">—</span>
										<span className="font-medium">
											{range && range.to
												? format(range.to, "MMM d, yyyy")
												: "Check-out"}
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
									selected={range}
									onSelect={(r) => {
										const newRange = r as DateRange | undefined;
										setRange(newRange);
										const ci = newRange?.from;
										const co = newRange?.to;
										const ciLabel = ci ? format(ci, "MMM d, yyyy") : "";
										const coLabel = co ? format(co, "MMM d, yyyy") : "";
										onDateChange?.(ciLabel, coLabel);
									}}
									numberOfMonths={2}
									className="rounded-md border-0"
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Hotel Chain
						</label>
						<Select value={chain} onValueChange={(v) => setChain(v)}>
							<SelectTrigger className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground [background-color:white] dark:[background-color:#020617]">
								<SelectValue placeholder="All Hotels" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Chains</SelectLabel>
									<SelectItem value="all">All Hotels</SelectItem>
									<SelectItem value="Marriott">Marriott</SelectItem>
									<SelectItem value="Hyatt">Hyatt</SelectItem>
									<SelectItem value="Hilton">Hilton</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium text-foreground mb-1">
							Price Range
						</label>
						<Select value={price} onValueChange={(v) => setPrice(v)}>
							<SelectTrigger className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground [background-color:white] dark:[background-color:#020617]">
								<SelectValue placeholder="All Prices" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Price Range</SelectLabel>
									<SelectItem value="all">All Prices</SelectItem>
									<SelectItem value="under-100">Under $100</SelectItem>
									<SelectItem value="100-149">$100 - $149</SelectItem>
									<SelectItem value="150-199">$150 - $199</SelectItem>
									<SelectItem value="200-plus">$200+</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
					<div className="flex items-center gap-4 w-full sm:w-auto">
						<div className="w-48">
							<label className="block text-sm font-medium text-foreground mb-1">
								Sort By
							</label>
							<Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
								<SelectTrigger className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm text-foreground [background-color:white] dark:[background-color:#020617]">
									<SelectValue placeholder="Distance" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Distance">Distance</SelectItem>
									<SelectItem value="Price">Price</SelectItem>
									<SelectItem value="Rating">Rating</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<button
							onClick={() => {
								setChain(undefined);
								setPrice(undefined);
								setSortBy(undefined);
								setQuery?.("");
								toast("Filters reset to event dates");
							}}
							className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 mt-7 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
						>
							<RefreshCcw className="h-4 w-4" />
							Reset to Event Dates
						</button>
					</div>

					<div className="flex items-center gap-3 mt-4 sm:mt-0">
						{/* Search inside filter section removed as requested */}
						<span className="text-sm font-semibold text-foreground">
							{query ? `Filtering: ${query}` : "All filters"}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
