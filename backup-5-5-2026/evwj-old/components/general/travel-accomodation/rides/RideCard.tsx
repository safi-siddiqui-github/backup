"use client";

import React from "react";
import { Bookmark, Send } from "lucide-react";
import type { RideOption } from "./data";

type Props = {
	ride: RideOption;
	onSchedule: (r: RideOption) => void;
	onToggleSave: (r: RideOption) => void;
	isSaved: boolean;
};

export default function RideCard({
	ride,
	onSchedule,
	onToggleSave,
	isSaved,
}: Props) {
	return (
		<div className="rounded-xl bg-white shadow-lg overflow-hidden !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			<div className="p-4 sm:p-6">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
							<Send className="h-5 w-5" />
						</div>
						<div>
							<p className="text-base font-semibold text-gray-800 dark:text-gray-100">
								{ride.service}
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{ride.description}
							</p>
						</div>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
							${ride.price}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Estimated fare
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
					<div>
						<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
							Pickup
						</p>
						<p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">
							{ride.pickupLocation}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							{ride.pickupTime}
						</p>
					</div>
					<div>
						<p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
							Dropoff
						</p>
						<p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-1">
							{ride.dropoffLocation}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							{ride.dropoffNote}
						</p>
					</div>
				</div>
			</div>

			<div className="p-4 bg-gray-50 dark:bg-[#020617]/70 border-t border-gray-200 dark:border-gray-700/50">
				<div className="flex items-center justify-between gap-4">
					<button
						onClick={() => onSchedule(ride)}
						className="grow w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white"
					>
						Schedule Ride
					</button>
					<button
						onClick={() => onToggleSave(ride)}
						className="ml-3 inline-flex items-center gap-2 text-gray-600 dark:text-gray-300"
					>
						<Bookmark className="h-5 w-5" />
						<span className="text-sm">{isSaved ? "Saved" : "Save"}</span>
					</button>
				</div>
			</div>
		</div>
	);
}
