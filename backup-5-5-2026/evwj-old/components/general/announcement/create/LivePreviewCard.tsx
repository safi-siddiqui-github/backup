"use client";

import { Eye } from "lucide-react";
import { ANNOUNCEMENT_TYPES, PRIORITY_PREVIEW_STYLES } from "./constants";

type Props = {
	selectedType: string;
	title: string;
	message: string;
	priority: "low" | "medium" | "high";
	audienceText: string;
};

export default function LivePreviewCard({
	selectedType,
	title,
	message,
	priority,
	audienceText,
}: Props) {
	const activeType =
		ANNOUNCEMENT_TYPES.find((t) => t.name === selectedType) ||
		ANNOUNCEMENT_TYPES[0];
	return (
		<div className="sticky top-8">
			<h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-slate-200">
				<Eye size={20} /> Live Preview
			</h2>
			<div className="rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-5 shadow-sm">
				<div className="mb-3 flex items-center gap-3">
					<div className={`rounded-full p-1.5 ${activeType.selectedBgColor}`}>
						<div className={activeType.textColor}>{activeType.icon}</div>
					</div>
					<span
						className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${PRIORITY_PREVIEW_STYLES[priority]}`}
					>
						{priority} priority
					</span>
				</div>
				<h3 className="font-bold wrap-break-word text-gray-900 dark:text-slate-200">
					{title || "Important Event Update"}
				</h3>
				<p className="mt-1 text-sm wrap-break-word text-gray-600 dark:text-slate-400">
					{message || "Your message will appear here..."}
				</p>
				<p className="mt-4 text-xs text-gray-500 dark:text-slate-400">
					Just now • To: {audienceText}
				</p>
			</div>
			<p className="mt-3 text-center text-xs text-gray-500 dark:text-slate-400">
				This is how your announcement will appear to attendees in their event
				updates.
			</p>
		</div>
	);
}
