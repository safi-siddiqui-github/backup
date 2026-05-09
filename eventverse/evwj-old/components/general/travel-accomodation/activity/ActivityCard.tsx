"use client";

import React from "react";
import { BookOpen, Bookmark, Star, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useSaved } from "../saved/SavedContext";

export type Activity = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	categoryColor: string;
	rating: number;
	duration: string;
	distance: string;
	price: number;
};

export default function ActivityCard({ activity }: { activity: Activity }) {
	{
		const { add, remove, byKind } = useSaved();
		const isSaved = byKind("activity").some((i) => i.id === activity.id);

		return (
			<div className="overflow-hidden rounded-lg bg-white shadow-lg transform-gpu transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<div className="relative">
					<Image
						height={100}
						width={100}
						src={activity.imageUrl}
						alt={activity.title}
						className="h-48 w-full object-cover"
					/>
					<span
						className={`absolute top-3 left-3 text-xs font-semibold text-white ${activity.categoryColor} rounded-full px-2.5 py-1`}
					>
						{activity.category}
					</span>
					<span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-sm font-semibold text-gray-800 dark:bg-gray-900/90 dark:text-white">
						<Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
						{activity.rating.toFixed(1)}
					</span>
				</div>

				<div className="p-4">
					<h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						{activity.title}
					</h4>
					<p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
						{activity.description}
					</p>
					<div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
						<span className="flex items-center gap-1.5">
							<Clock className="h-4 w-4" />
							{activity.duration}
						</span>
						<span className="flex items-center gap-1.5">
							<MapPin className="h-4 w-4" />
							{activity.distance}
						</span>
					</div>
					<div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
						<span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
							${activity.price}
						</span>
						<span className="ml-1.5 text-sm text-gray-600 dark:text-gray-400">
							per person
						</span>
					</div>
				</div>

				<div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700/50 dark:bg-[#020617]/70">
					<div className="flex items-center justify-between gap-4">
						<button
							onClick={() => toast.success(`Booking ${activity.title}`)}
							className="flex w-full grow cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800"
						>
							<BookOpen className="h-5 w-5" />
							<span>Book</span>
						</button>
						<button
							onClick={() => {
								if (isSaved) {
									remove(activity.id, "activity");
									toast("Removed from saved");
								} else {
									add({
										id: activity.id,
										kind: "activity",
										title: activity.title,
										payload: activity,
									});
									toast.info(`${activity.title} saved!`);
								}
							}}
							className={`flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg transition duration-200 ${isSaved ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"}`}
						>
							<Bookmark className="h-6 w-6" />
							<span className="sr-only">Save</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
