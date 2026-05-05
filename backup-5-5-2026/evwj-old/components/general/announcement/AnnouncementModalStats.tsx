"use client";

import { FaExclamationCircle, FaEye } from "react-icons/fa";
import type { AnnouncementModalStatsProps } from "./announcement-types";

export default function AnnouncementModalStats({
	item,
}: AnnouncementModalStatsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-gray-200 dark:border-slate-600 pt-4">
			<div className="flex flex-col items-center rounded-lg !bg-white dark:!bg-slate-700/50 p-3 sm:p-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<FaExclamationCircle className="mb-2 text-gray-500 dark:text-slate-400" />
				<h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-200">
					{item.delivered}
				</h4>
				<p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 text-center">
					Total Sent
				</p>
			</div>
			<div className="flex flex-col items-center rounded-lg !bg-white dark:!bg-slate-700/50 p-3 sm:p-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<FaExclamationCircle className="mb-2 text-green-400" />
				<h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-200">
					{item.percentage}%
				</h4>
				<p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 text-center">
					Delivered ({item.delivered})
				</p>
			</div>
			<div className="flex flex-col items-center rounded-lg !bg-white dark:!bg-slate-700/50 p-3 sm:p-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<FaEye className="mb-2 text-blue-400" />
				<h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-200">
					{item.opened}%
				</h4>
				<p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 text-center">
					Opened ({item.opened})
				</p>
			</div>
		</div>
	);
}
