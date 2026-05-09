"use client";

import { FaSearch } from "react-icons/fa";
import type { AnnouncementModalSearchFilterProps } from "./announcement-types";

export default function AnnouncementModalSearchFilter({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
}: AnnouncementModalSearchFilterProps) {
	return (
		<div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
			<div className="flex w-full sm:flex-grow items-center overflow-hidden rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search by name, email, or group..."
					className="flex-grow bg-transparent px-3 py-2 text-xs sm:text-sm text-foreground outline-none placeholder:text-muted-foreground"
				/>
				<button className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200">
					<FaSearch />
				</button>
			</div>
			<div className="w-full sm:w-auto sm:min-w-[180px]">
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="w-full rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-3 py-2 text-xs sm:text-sm text-gray-700 dark:text-slate-300 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					<option>All Statuses</option>
					<option>Delivered</option>
					<option>Opened</option>
					<option>Clicked</option>
					<option>Failed</option>
					<option>Pending</option>
				</select>
			</div>
		</div>
	);
}
