"use client";
import { BsTrash, BsGripVertical, BsX, BsPlus } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import Switch from "../common/Switch";
import type { QuestionCardProps } from "../types/survey-types";

export default function QuestionCard({
	question,
	index,
	onUpdate,
	onDelete,
	onAddOption,
	onUpdateOption,
	onDeleteOption,
	inputRef,
}: QuestionCardProps) {
	return (
		<div className="!bg-white dark:!bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-xl p-4 sm:p-5 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-300 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0 mt-1 cursor-grab active:cursor-grabbing">
					<BsGripVertical
						className="text-gray-400 dark:text-slate-500"
						size={20}
					/>
				</div>

				<div className="flex-1 space-y-4">
					<div className="flex items-start justify-between gap-3">
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded">
									Q{index + 1}
								</span>
								<span className="text-xs font-medium text-gray-500 dark:text-slate-400 capitalize">
									{question.type.replace("-", " ")}
								</span>
							</div>
							<input
								type="text"
								value={question.title}
								onChange={(e) =>
									onUpdate(question.id, { title: e.target.value })
								}
								placeholder="Enter your question..."
								className="w-full p-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 [background-color:white] dark:[background-color:#020617]"
								ref={inputRef}
							/>
						</div>
						<button
							onClick={() => onDelete(question.id)}
							className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
							aria-label="Delete question"
						>
							<BsTrash size={18} />
						</button>
					</div>

					{question.type === "rating" && (
						<div className="space-y-3">
							<div className="flex gap-2 py-2">
								{Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
									<FiStar
										key={star}
										className="w-8 h-8 text-yellow-400 fill-yellow-400"
									/>
								))}
							</div>
							<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
								<span>Scale: 1 - 5 stars</span>
							</div>
						</div>
					)}

					{question.type === "multiple-choice" && question.options && (
						<div className="space-y-2">
							{question.options.map((option: string, optionIndex: number) => (
								<div key={optionIndex} className="flex items-center gap-2">
									<input
										type="radio"
										disabled
										className="cursor-not-allowed w-4 h-4 text-indigo-600"
									/>
									<input
										type="text"
										value={option}
										onChange={(e) =>
											onUpdateOption(question.id, optionIndex, e.target.value)
										}
										placeholder={`Option ${optionIndex + 1}`}
										className="flex-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 [background-color:white] dark:[background-color:#020617]"
									/>
									{question.options!.length > 2 && (
										<button
											onClick={() => onDeleteOption(question.id, optionIndex)}
											className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
										>
											<BsX size={20} />
										</button>
									)}
								</div>
							))}
							<button
								onClick={() => onAddOption(question.id)}
								className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 mt-2 cursor-pointer"
							>
								<BsPlus size={18} /> Add Option
							</button>
						</div>
					)}

					{question.type === "checkboxes" && question.options && (
						<div className="space-y-2">
							{question.options.map((option: string, optionIndex: number) => (
								<div key={optionIndex} className="flex items-center gap-2">
									<input
										type="checkbox"
										disabled
										className="cursor-not-allowed w-4 h-4 text-indigo-600 rounded"
									/>
									<input
										type="text"
										value={option}
										onChange={(e) =>
											onUpdateOption(question.id, optionIndex, e.target.value)
										}
										placeholder={`Option ${optionIndex + 1}`}
										className="flex-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#020617] text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 [background-color:white] dark:[background-color:#020617]"
									/>
									{question.options!.length > 2 && (
										<button
											onClick={() => onDeleteOption(question.id, optionIndex)}
											className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
										>
											<BsX size={20} />
										</button>
									)}
								</div>
							))}
							<button
								onClick={() => onAddOption(question.id)}
								className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 mt-2 cursor-pointer"
							>
								<BsPlus size={18} /> Add Option
							</button>
						</div>
					)}

					{question.type === "text" && (
						<textarea
							disabled
							placeholder="Guest's answer will appear here..."
							rows={3}
							className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-[#020617]/70 text-gray-500 dark:text-slate-400 resize-none cursor-not-allowed"
						/>
					)}

					<div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-600">
						<span className="text-sm font-medium text-gray-700 dark:text-slate-200">
							Required question
						</span>
						<Switch
							checked={question.required}
							onChange={(checked) =>
								onUpdate(question.id, { required: checked })
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
