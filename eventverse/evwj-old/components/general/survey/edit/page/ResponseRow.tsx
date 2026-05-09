"use client";

import { Respondent } from "../../types/survey-types";

type Props = {
	respondent: Respondent;
	timestamp: string;
	answer: React.ReactNode;
};

export default function ResponseRow({ respondent, timestamp, answer }: Props) {
	return (
		<div className="flex flex-col sm:flex-row justify-between sm:items-center p-4">
			<div className="flex items-center gap-3 mb-2 sm:mb-0">
				<div
					className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold ${respondent.avatarColor || "bg-indigo-500"}`}
				>
					{respondent.initials || "AN"}
				</div>
				<div>
					<p className="font-semibold text-sm text-gray-900 dark:text-slate-200">
						{respondent.name}
					</p>
					<p className="text-xs text-gray-500 dark:text-slate-400">
						{timestamp}
					</p>
				</div>
			</div>
			<div className="sm:pl-12">{answer}</div>
		</div>
	);
}
