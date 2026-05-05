"use client";

import { Eye, Save, Send, X } from "lucide-react";

type Props = {
	onPreview: () => void;
	onSave: () => void;
	onSend: () => void;
	onCancel?: () => void;
};

export default function HeaderActions({
	onPreview,
	onSave,
	onSend,
	onCancel,
}: Props) {
	return (
		<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
			<button
				onClick={onPreview}
				className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full sm:w-auto [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
			>
				<Eye size={16} /> Preview
			</button>
			<button
				onClick={onSave}
				className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full sm:w-auto [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
			>
				<Save size={16} /> Save Draft
			</button>
			<button
				onClick={onSend}
				className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 w-full sm:w-auto"
			>
				<Send size={16} /> Send Now
			</button>
			{onCancel && (
				<button
					onClick={onCancel}
					className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full sm:w-auto [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					<X size={16} /> Cancel
				</button>
			)}
		</div>
	);
}
