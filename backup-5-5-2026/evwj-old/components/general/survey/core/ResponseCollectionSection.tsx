"use client";
import { BsInfoCircle } from "react-icons/bs";
import Switch from "../common/Switch";
import type { ResponseCollectionSectionProps } from "../types/survey-types";

export default function ResponseCollectionSection({
	anonymize,
	onAnonymizeChange,
}: ResponseCollectionSectionProps) {
	return (
		<section className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600 rounded-xl p-4 sm:p-6 shadow-sm">
			<h3 className="text-lg font-bold text-gray-900 dark:text-slate-200 mb-4 flex items-center gap-2">
				<span className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
					2
				</span>
				Response Collection
			</h3>
			<div className="!bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-xl p-4 space-y-4 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
					<div className="flex-1">
						<span className="font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-1.5">
							Anonymize Responses
							<BsInfoCircle
								className="text-gray-400 dark:text-slate-400 cursor-help"
								title="Hide respondent identity from results"
							/>
						</span>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
							Hide respondent identity from results
						</p>
					</div>
					<Switch checked={anonymize} onChange={onAnonymizeChange} />
				</div>
			</div>
		</section>
	);
}
