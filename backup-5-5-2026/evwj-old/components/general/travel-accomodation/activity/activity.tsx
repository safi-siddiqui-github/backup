"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import ActivityCard from "./ActivityCard";
import StyledSelect from "./StyledSelect";
import activities from "./data";

export default function ActivityTab() {
	const [query, setQuery] = useState("");

	const filteredActivities = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return activities;
		return activities.filter((a) => {
			if (a.title.toLowerCase().includes(q)) return true;
			if (a.description.toLowerCase().includes(q)) return true;
			if (a.category.toLowerCase().includes(q)) return true;
			return false;
		});
	}, [query]);

	return (
		<div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 lg:p-8 dark:bg-black">
			<div className="mx-auto w-full max-w-7xl space-y-6">
				<div className="rounded-xl bg-white p-5 shadow-lg sm:p-6 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-100">
						Discover Activities
					</h3>

					<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
						<div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
							<div className="w-full sm:w-48">
								<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
									Category
								</label>
								<StyledSelect label="Category" defaultValue="all">
									<option value="all">All Categories</option>
									<option value="tours">Tours</option>
									<option value="cultural">Cultural</option>
									<option value="outdoor">Outdoor</option>
								</StyledSelect>
							</div>

							<div className="w-full sm:w-48">
								<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
									Sort By
								</label>
								<StyledSelect label="Sort By" defaultValue="distance">
									<option value="distance">Distance</option>
									<option value="price">Price</option>
									<option value="rating">Rating</option>
								</StyledSelect>
							</div>
						</div>
						<div className="flex items-center gap-3 pt-0 md:pt-5">
							<div className="hidden md:block">
								<label htmlFor="activity-filter-search" className="sr-only">
									Filter search
								</label>
								<div className="relative w-44">
									<Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<Input
										id="activity-filter-search"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										placeholder="Search in filters"
										className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-10 pr-3 text-xs text-gray-800 shadow-sm focus:outline-none dark:bg-[#020617] dark:text-gray-100 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]"
									/>
								</div>
							</div>

							<div className="shrink-0">
								<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 dark:bg-[#020617] dark:text-gray-200">
									{filteredActivities.length} activities
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-4 flex items-center gap-3">
					<label htmlFor="activity-search" className="sr-only">
						Search activities
					</label>
					<div className="relative w-full">
						<Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							id="activity-search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search activities, description or category"
							className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:bg-[#020617] dark:text-gray-100 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]"
						/>
						{query && (
							<button
								onClick={() => setQuery("")}
								aria-label="Clear search"
								className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{filteredActivities.map((activity) => (
						<ActivityCard key={activity.id} activity={activity} />
					))}
				</div>
			</div>
		</div>
	);
}
