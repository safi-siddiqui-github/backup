"use client";

import { X } from "lucide-react";
import { ANNOUNCEMENT_TYPES, PRIORITY_PREVIEW_STYLES } from "./constants";

type Props = {
	open: boolean;
	onClose: () => void;
	selectedType: string;
	title: string;
	message: string;
	priority: "low" | "medium" | "high";
	audienceText: string;
};

export default function PreviewModal({
	open,
	onClose,
	selectedType,
	title,
	message,
	priority,
	audienceText,
}: Props) {
	if (!open) return null;
	const activeType =
		ANNOUNCEMENT_TYPES.find((t) => t.name === selectedType) ||
		ANNOUNCEMENT_TYPES[0];
	return (
		<div
			onClick={onClose}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-6 shadow-2xl"
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 cursor-pointer rounded-full p-1 text-gray-600 dark:text-slate-400 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700/50"
				>
					<X size={20} />
				</button>
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-slate-200">
					Announcement Preview
				</h2>
				<div className="rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 p-5 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
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
					<p className="mt-1 text-sm wrap-break-word text-gray-700 dark:text-slate-400">
						{message || "Your message will appear here..."}
					</p>
					<p className="mt-4 text-xs text-gray-500 dark:text-slate-400">
						Just now • To: {audienceText}
					</p>
				</div>
			</div>
		</div>
	);
}
