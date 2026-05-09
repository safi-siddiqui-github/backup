"use client";

import React from "react";
import { Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Flight } from "./data";

type Props = {
	flight: Flight;
	onBook: (f: Flight) => void;
	onToggleSave: (f: Flight) => void;
	isSaved: boolean;
};

export default function FlightCard({
	flight,
	onBook,
	onToggleSave,
	isSaved,
}: Props) {
	return (
		<Card className="group overflow-hidden !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01]">
			<CardContent className="flex items-start justify-between gap-4 border-b border-gray-200 dark:border-slate-600 p-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						<Plane className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
					</div>
					<div>
						<div className="text-base font-semibold text-foreground">
							{flight.airline}
						</div>
						<div className="text-sm text-muted-foreground">{flight.code}</div>
					</div>
				</div>
				<div className="text-right">
					<div className="inline-flex items-center gap-2">
						<div className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 font-semibold text-white">
							{flight.price}
						</div>
					</div>
					<div className="text-sm text-muted-foreground">{flight.cabin}</div>
				</div>
			</CardContent>

			<CardContent className="p-4">
				<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
					<div className="text-center sm:text-left">
						<div className="text-sm text-muted-foreground">
							{flight.depCode}
						</div>
						<div className="text-2xl font-bold text-foreground">
							{flight.depTime}
						</div>
						<div className="text-sm text-muted-foreground">
							{flight.depDate}
						</div>
						<div className="mt-1 truncate text-xs text-muted-foreground">
							{flight.depAirport}
						</div>
					</div>

					<div className="flex-1 text-center">
						<div className="mb-2 text-sm text-muted-foreground">
							{flight.duration}
						</div>
						<div className="relative mx-auto h-0.5 w-24 bg-gray-200 dark:bg-slate-700">
							<div
								className={`absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gray-500 dark:bg-slate-400 ${flight.stops === "Non-stop" ? "hidden" : ""}`}
							/>
						</div>
						<div className="mt-2 text-sm font-medium text-foreground">
							{flight.stops}
						</div>
					</div>

					<div className="text-center sm:text-right">
						<div className="text-sm text-muted-foreground">
							{flight.arrCode}
						</div>
						<div className="text-2xl font-bold text-foreground">
							{flight.arrTime}
						</div>
						<div className="text-sm text-muted-foreground">
							{flight.arrDate}
						</div>
						<div className="mt-1 truncate text-xs text-muted-foreground">
							{flight.arrAirport}
						</div>
					</div>
				</div>
			</CardContent>

			<CardContent className="flex items-center gap-3 border-t border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<button
					onClick={(e) => {
						e.stopPropagation();
						onBook(flight);
					}}
					className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 font-semibold text-white hover:from-indigo-700 hover:to-purple-700"
				>
					<Plane className="h-4 w-4 text-white" />
					Book Flight
				</button>
				<button
					onClick={(e) => {
						e.stopPropagation();
						onToggleSave(flight);
					}}
					className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 ${isSaved ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600" : "!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
				>
					{isSaved ? "Saved" : "Save"}
				</button>
			</CardContent>
		</Card>
	);
}
