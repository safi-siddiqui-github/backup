"use client";

import type { AnnouncementModalAudienceProps } from "./announcement-types";

export default function AnnouncementModalAudience({
	recipients,
}: AnnouncementModalAudienceProps) {
	return (
		<div className="border-t border-gray-200 dark:border-slate-600 pt-3 sm:pt-4">
			<h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg dark:text-slate-200">
				Target Audience
			</h3>
			<div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 sm:gap-2 sm:text-sm dark:text-slate-400">
				<span className="rounded-full !bg-white dark:!bg-slate-700/50 px-2.5 py-1 sm:px-3 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					{recipients}
				</span>
				<span>• 57 total recipients</span>
			</div>
		</div>
	);
}
