"use client";

type Props = {
	title: string;
	description: string;
	totalResponses: number;
	completionRate: number;
	questions: number;
	completed: number;
	onShare: () => void;
};

export default function StatsHeader({
	title,
	description,
	totalResponses,
	completionRate,
	questions,
	completed,
	onShare,
}: Props) {
	return (
		<div className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] shadow-sm rounded-xl border border-gray-200 dark:border-slate-600 overflow-hidden">
			<div className="p-6">
				<div className="flex flex-col md:flex-row justify-between md:items-start mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-slate-200">
							{title}
						</h1>
						<p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
							{description}
						</p>
					</div>
					<button
						onClick={onShare}
						className="shrink-0 mt-4 md:mt-0 flex items-center px-4 py-2 text-sm font-medium text-gray-700 !bg-white dark:!bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					>
						Share
					</button>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
					<div>
						<div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
							{totalResponses}
						</div>
						<div className="text-sm font-medium text-gray-500 dark:text-slate-400">
							Total Responses
						</div>
					</div>
					<div>
						<div className="text-3xl font-bold text-green-600 dark:text-green-400">
							{completionRate}%
						</div>
						<div className="text-sm font-medium text-gray-500 dark:text-slate-400">
							Completion Rate
						</div>
					</div>
					<div>
						<div className="text-3xl font-bold text-gray-900 dark:text-slate-200">
							{questions}
						</div>
						<div className="text-sm font-medium text-gray-500 dark:text-slate-400">
							Questions
						</div>
					</div>
					<div>
						<div className="text-3xl font-bold text-gray-900 dark:text-slate-200">
							{completed}
						</div>
						<div className="text-sm font-medium text-gray-500 dark:text-slate-400">
							Completed
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
