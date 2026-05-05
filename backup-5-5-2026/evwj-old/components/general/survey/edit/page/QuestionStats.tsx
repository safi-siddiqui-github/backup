"use client";

import { FiStar } from "react-icons/fi";

type RatingStats = { averageRating: number; totalRatings: number };
type Distribution = { option: string; count: number; percent: number };

type Props =
	| { kind: "rating"; stats: RatingStats }
	| { kind: "multiple-choice"; stats: { distribution: Distribution[] } }
	| { kind: "text"; stats: { totalResponses: number } }
	| { kind: "none" };

export default function QuestionStats(props: Props) {
	if (props.kind === "none") return null;
	if (props.kind === "rating") {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
				<div className="p-5 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl border border-gray-200 dark:border-slate-600">
					<p className="mb-1 text-sm font-medium text-gray-500 dark:text-slate-400">
						Average Rating
					</p>
					<div className="flex items-center space-x-2">
						<span className="text-3xl font-bold text-gray-900 dark:text-slate-200">
							{props.stats.averageRating.toFixed(1)}
						</span>
						<FiStar className="w-5 h-5 text-yellow-400" />
					</div>
				</div>
				<div className="p-5 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] rounded-xl border border-gray-200 dark:border-slate-600">
					<p className="mb-1 text-sm font-medium text-gray-500 dark:text-slate-400">
						Total Ratings
					</p>
					<span className="text-3xl font-bold text-gray-900 dark:text-slate-200">
						{props.stats.totalRatings}
					</span>
				</div>
			</div>
		);
	}
	if (props.kind === "multiple-choice") {
		return (
			<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 my-6">
				<div className="space-y-4">
					{props.stats.distribution.map((item) => (
						<div key={item.option}>
							<div className="flex justify-between mb-1 text-sm">
								<span className="font-medium text-gray-800 dark:text-slate-200">
									{item.option}
								</span>
								<span className="text-gray-500 dark:text-slate-400">
									{item.count} ({item.percent}%)
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-[#020617]">
								<div
									className="bg-blue-600 h-1.5 rounded-full"
									style={{ width: `${item.percent}%` }}
								></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
	return (
		<div className="p-5 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] rounded-xl border border-gray-200 dark:border-slate-600 my-6">
			<p className="mb-1 text-sm font-medium text-gray-500 dark:text-slate-400">
				Total Responses
			</p>
			<span className="text-3xl font-bold text-gray-900 dark:text-slate-200">
				{props.stats.totalResponses}
			</span>
		</div>
	);
}
