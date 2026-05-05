"use client";

import React from "react";
import { Bookmark, Car as CarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CarItem } from "./types";
import CarTag from "./CarTag";
import FeatureTag from "./FeatureTag";

type Props = {
	car: CarItem;
	onReserve: (c: CarItem) => void;
	onToggleSave: (c: CarItem) => void;
	isSaved: boolean;
};

export default function CarCard({
	car,
	onReserve,
	onToggleSave,
	isSaved,
}: Props) {
	return (
		<Card className="overflow-hidden !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl">
			<CardContent className="p-4 sm:p-6 border-b border-gray-200 dark:border-slate-600">
				<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
					<div className="flex items-center space-x-3">
						<div className=" shrink-0 flex items-center justify-center h-12 w-12 rounded-lg !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<CarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						</div>
						<div>
							<h4 className="text-lg font-semibold text-foreground">
								{car.name}
							</h4>
							<div className="flex items-center gap-2 mt-1.5">
								{car.tags.map((tag) => (
									<CarTag key={tag} text={tag} />
								))}
							</div>
						</div>
					</div>
					<div className=" shrink-0 text-left sm:text-right">
						<p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
							${car.pricePerDay}
						</p>
						<p className="text-sm text-muted-foreground -mt-1">per day</p>
						<p className="text-xs text-muted-foreground mt-1">
							${car.priceTotal} total ({car.totalDays} days)
						</p>
					</div>
				</div>
			</CardContent>

			<CardContent className="p-4 sm:p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase">
							Pick-up
						</p>
						<p className="text-sm font-semibold text-foreground mt-1">
							{car.pickupLocation}
						</p>
						<p className="text-sm text-muted-foreground">{car.pickupDate}</p>
					</div>
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase">
							Drop-off
						</p>
						<p className="text-sm font-semibold text-foreground mt-1">
							{car.dropoffLocation}
						</p>
						<p className="text-sm text-muted-foreground">{car.dropoffDate}</p>
					</div>
				</div>
				<div>
					<p className="text-xs font-medium text-muted-foreground uppercase mb-2">
						Features
					</p>
					<div className="flex items-center gap-4">
						{car.features.map((feat) => (
							<FeatureTag key={feat} text={feat} />
						))}
					</div>
				</div>
			</CardContent>

			<CardContent className="p-4 !bg-white dark:!bg-slate-700/50 border-t border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="flex items-center justify-between gap-4">
					<button
						onClick={() => onReserve(car)}
						className=" grow w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2"
					>
						<span>Reserve Now</span>
					</button>
					<button
						onClick={() => onToggleSave(car)}
						className={` shrink-0 flex items-center justify-center gap-2 rounded-md border px-3 py-2 transition duration-200 cursor-pointer ${isSaved ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600" : "!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] text-foreground border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"}`}
					>
						<Bookmark className="h-5 w-5" />
						<span className="text-sm font-medium">
							{isSaved ? "Saved" : "Save"}
						</span>
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
