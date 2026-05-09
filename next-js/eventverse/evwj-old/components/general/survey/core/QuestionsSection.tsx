"use client";
import { BsInfoCircle, BsPlus } from "react-icons/bs";
import QuestionTypeDropdown from "../questions/QuestionTypeDropdown";
import QuestionCard from "../questions/QuestionCard";
import type { QuestionsSectionProps } from "../types/survey-types";

export default function QuestionsSection({
	questions,
	showDropdown,
	questionsError,
	onToggleDropdown,
	onAddQuestion,
	onUpdateQuestion,
	onDeleteQuestion,
	onAddOption,
	onUpdateOption,
	onDeleteOption,
	hideAddButton = false,
	questionRefs,
}: QuestionsSectionProps) {
	return (
		<section className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] border border-gray-200 dark:border-slate-600 rounded-xl p-0 shadow-sm">
			<div className="sticky top-0 z-10 px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-[#020617] backdrop-blur supports-[backdrop-filter]:backdrop-blur rounded-t-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
				<h3 className="text-lg font-bold text-gray-900 dark:text-slate-200 flex items-center gap-2">
					<span className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
						4
					</span>
					Questions ({questions.length})
				</h3>
				{!hideAddButton && (
					<QuestionTypeDropdown
						isOpen={showDropdown}
						onToggle={onToggleDropdown}
						onSelectType={(type) => {
							onAddQuestion(type);
							// Ensure dropdown closes after selecting a type
							onToggleDropdown();
						}}
					/>
				)}
			</div>

			{questionsError && (
				<div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
					<BsInfoCircle />
					<span className="text-sm font-medium">{questionsError}</span>
				</div>
			)}

			{questions.length === 0 ? (
				<div className="mx-4 sm:mx-6 my-4 text-center py-12 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-[#020617]/70">
					<div className="flex justify-center mb-3">
						<div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
							<BsPlus
								size={32}
								className="text-indigo-600 dark:text-indigo-400"
							/>
						</div>
					</div>
					<p className="text-sm font-medium text-gray-600 dark:text-slate-400">
						No questions yet
					</p>
					<p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
						Click &quot;Add Question&quot; to get started
					</p>
				</div>
			) : (
				<div className="px-4 sm:px-6 py-4 space-y-4">
					{questions.map((question, index) => (
						<QuestionCard
							key={question.id}
							question={question}
							index={index}
							onUpdate={onUpdateQuestion}
							onDelete={onDeleteQuestion}
							onAddOption={onAddOption}
							onUpdateOption={onUpdateOption}
							onDeleteOption={onDeleteOption}
							inputRef={(el) =>
								questionRefs?.current && (questionRefs.current[index] = el)
							}
						/>
					))}
				</div>
			)}
		</section>
	);
}
