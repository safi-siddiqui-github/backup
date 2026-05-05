"use client";
import { BsChevronDown, BsPlus } from "react-icons/bs";
import { questionTypes } from "../types/survey-question-types";
import type { QuestionTypeDropdownProps } from "../types/survey-types";

export default function QuestionTypeDropdown({
	isOpen,
	onToggle,
	onSelectType,
	floating = false,
}: QuestionTypeDropdownProps) {
	return (
		<div
			className={`relative ${floating ? "absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60]" : ""}`}
		>
			<button
				onClick={onToggle}
				className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto justify-center"
			>
				<BsPlus size={20} />
				Add Question
				<BsChevronDown
					size={14}
					className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-72 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:rgb(30_41_59/0.95)] border border-gray-200 dark:border-slate-600 rounded-xl shadow-2xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
					<div className="p-2">
						{questionTypes.map((questionType) => (
							<button
								key={questionType.type}
								onClick={() => onSelectType(questionType.type)}
								className="w-full flex items-start gap-3 px-4 py-3 text-left text-gray-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors cursor-pointer group"
							>
								<div className="flex items-center justify-center w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
									{questionType.icon}
								</div>
								<div className="flex-1">
									<div className="font-semibold">{questionType.label}</div>
									<div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
										{questionType.description}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
