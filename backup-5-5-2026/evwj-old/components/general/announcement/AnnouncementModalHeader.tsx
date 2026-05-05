"use client";

import { FaExclamationCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import type { AnnouncementModalHeaderProps } from "./announcement-types";

export default function AnnouncementModalHeader({
	item,
	onDuplicate,
	onResend,
	onClose,
}: AnnouncementModalHeaderProps) {
	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 dark:border-slate-600 pb-3 sm:pb-4 gap-3 sm:gap-4">
			<div className="min-w-0 flex-1">
				<h2 className="flex items-start sm:items-center gap-2 text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-slate-200">
					<FaExclamationCircle className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" size={18} />
					<span className="break-words">{item.title}</span>
				</h2>
				<p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-1 break-words">
					Sent {item.sentAt} by Sarah Johnson
				</p>
			</div>
			<div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
				<button
					onClick={onDuplicate}
					className="cursor-pointer rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-slate-200 transition-all duration-300 ease-linear hover:bg-gray-50 dark:hover:bg-slate-600 flex-1 sm:flex-initial whitespace-nowrap [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Duplicate
				</button>
				<button
					onClick={onResend}
					className="cursor-pointer rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 dark:text-slate-200 transition-all duration-300 ease-linear hover:bg-gray-50 dark:hover:bg-slate-600 flex-1 sm:flex-initial whitespace-nowrap [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Resend
				</button>
				<button
					onClick={onClose}
					className="cursor-pointer rounded-full !bg-white dark:!bg-slate-700/50 p-1.5 sm:p-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200 flex-shrink-0 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					aria-label="Close"
				>
					<FiX size={18} className="sm:w-5 sm:h-5" />
				</button>
			</div>
		</div>
	);
}
