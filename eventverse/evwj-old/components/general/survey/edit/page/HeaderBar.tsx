"use client";

import { BsArrowLeft, BsPencil } from "react-icons/bs";

type Props = { status: string; onBack: () => void; onEdit: () => void };

export default function HeaderBar({ status, onBack, onEdit }: Props) {
	return (
		<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border-b border-gray-200 dark:border-slate-600 px-4 sm:px-6 lg:px-8">
			<div className="flex justify-between items-center h-16">
				<button
					onClick={onBack}
					className="flex items-center text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-200"
				>
					<BsArrowLeft className="w-4 h-4 mr-2" />
					Back to Surveys
				</button>
				<div className="flex items-center space-x-4">
					<span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
						{status}
					</span>
					<button
						onClick={onEdit}
						className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 !bg-white dark:!bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					>
						<BsPencil className="w-4 h-4 mr-2" />
						Edit Survey
					</button>
				</div>
			</div>
		</div>
	);
}
