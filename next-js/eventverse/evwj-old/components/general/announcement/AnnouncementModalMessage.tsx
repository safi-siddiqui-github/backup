"use client";

import { FiDownload } from "react-icons/fi";
import type { AnnouncementModalMessageProps } from "./announcement-types";

export default function AnnouncementModalMessage({
	item,
}: AnnouncementModalMessageProps) {
	return (
		<div>
			<h3 className="text-sm sm:text-base mb-2 font-semibold text-gray-900 dark:text-slate-200">
				Message Content
			</h3>
			<p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-gray-700 dark:text-slate-400 break-words">
				{item.description}
			</p>
			<div className="flex items-center justify-between gap-2 rounded-md border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-2 sm:p-3 text-xs sm:text-sm text-gray-600 dark:text-slate-400 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="min-w-0 flex-1">
					<p className="font-medium text-gray-900 dark:text-slate-200 truncate">
						Updated_Venue_Map.pdf
					</p>
					<span className="text-xs text-gray-500 dark:text-slate-500">
						PDF · 239 KB
					</span>
				</div>
				<button className="cursor-pointer p-1.5 sm:p-2 hover:text-gray-900 dark:hover:text-slate-200 flex-shrink-0">
					<FiDownload size={18} />
				</button>
			</div>
		</div>
	);
}
