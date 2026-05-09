"use client";
import { FiCopy } from "react-icons/fi";

type SurveyLinkInputProps = {
	surveyLink: string;
	onCopy: () => void;
};

export default function SurveyLinkInput({
	surveyLink,
	onCopy,
}: SurveyLinkInputProps) {
	return (
		<div>
			<label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-3">
				Direct Survey Link
			</label>
			<div className="flex gap-2">
				<input
					type="text"
					readOnly
					value={surveyLink}
					className="flex-1 p-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200 [background-color:white] dark:[background-color:#020617]"
				/>
				<button
					onClick={onCopy}
					className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
				>
					<FiCopy className="w-5 h-5" />
					<span className="hidden sm:inline">Copy</span>
				</button>
			</div>
		</div>
	);
}
