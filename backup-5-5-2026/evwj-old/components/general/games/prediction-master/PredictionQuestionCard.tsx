"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { PredictionQuestion } from "./PredictionMasterBuilderBoard";

export type PredictionQuestionCardProps = {
	question: PredictionQuestion;
	index: number;
	onChange: (question: PredictionQuestion) => void;
	onDelete?: () => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function PredictionQuestionCard({
	question,
	index,
	onChange,
	onDelete,
	compact,
	setNodeRef,
	style,
	handleProps,
}: PredictionQuestionCardProps) {
	const setDuration = (v: number) => onChange({ ...question, duration: v });
	const setQuestion = (v: string) => onChange({ ...question, question: v });
	const setExplanation = (v: string) =>
		onChange({ ...question, explanation: v });
	const setOption = (i: number, v: string) => {
		const next = question.options.map((o, idx) => (idx === i ? v : o));
		onChange({ ...question, options: next });
	};

	return (
		<div
			className="rounded-xl border bg-white"
			ref={setNodeRef}
			style={style}
			data-id={question.id}
		>
			<Card className="p-4 md:p-6">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span
							className="cursor-move text-gray-400"
							title="Drag to reorder"
							{...handleProps}
						>
							⋮⋮
						</span>
						<h2 className="text-lg font-bold">Question {index + 1}</h2>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-xs text-gray-400">Type: Prediction</span>
						{onDelete && (
							<Button
								variant="ghost"
								size="sm"
								onClick={onDelete}
								className="text-red-600 hover:text-red-700"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>

				{compact ? null : (
					<>
						{/* Preview */}
						<div className="mb-4 overflow-hidden rounded-xl border bg-linear-to-br from-fuchsia-600 via-purple-600 to-pink-500">
							<div className="p-6 md:p-8">
								<div className="mb-6 text-center text-lg font-bold text-white md:text-xl">
									{question.question || "Enter question here"}
								</div>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									{[0, 1, 2, 3].map((i) => (
										<button
											key={i}
											className={
												"rounded-lg py-3 font-semibold text-white shadow " +
												(i === 0
													? "bg-orange-500/90"
													: i === 1
														? "bg-fuchsia-600/90"
														: i === 2
															? "bg-purple-600/90"
															: "bg-rose-600/90")
											}
											type="button"
										>
											{question.options[i] || "Enter option"}
										</button>
									))}
								</div>
								<div className="mt-6 flex items-center justify-center">
									<div className="w-full max-w-xs">
										<Slider
											value={[question.duration]}
											min={5}
											max={60}
											step={1}
											onValueChange={([val]) => setDuration(val)}
										/>
										<div className="mt-1 text-center text-xs text-white">
											{question.duration} sec
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Form */}
						<div className="space-y-4">
							<div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
								<input
									type="checkbox"
									id={`selectAnswerLater-${question.id}`}
									checked={question.selectAnswerLater}
									onChange={(e) => {
										onChange({
											...question,
											selectAnswerLater: e.target.checked,
										});
									}}
									className="h-4 w-4 rounded border-gray-300"
								/>
								<label
									htmlFor={`selectAnswerLater-${question.id}`}
									className="text-sm font-medium text-blue-900 dark:text-blue-200"
								>
									Select correct answer later (after the event)
								</label>
							</div>

							{!question.selectAnswerLater && (
								<div>
									<label className="text-xs font-semibold text-gray-500">
										Correct Answer
									</label>
									<select
										value={question.correctIndex}
										onChange={(e) => {
											onChange({
												...question,
												correctIndex: Number(e.target.value),
											});
										}}
										className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
									>
										<option value="0">Option 1</option>
										<option value="1">Option 2</option>
										<option value="2">Option 3</option>
										<option value="3">Option 4</option>
									</select>
								</div>
							)}

							<div>
								<label className="text-xs font-semibold text-gray-500">
									Question
								</label>
								<Input
									placeholder="Enter question here"
									value={question.question}
									onChange={(e) => setQuestion(e.target.value)}
								/>
							</div>

							<div>
								<label className="text-xs font-semibold text-gray-500">
									Explanation
								</label>
								<Textarea
									placeholder="(Optional) Add explanation after answer is revealed"
									value={question.explanation}
									onChange={(e) => setExplanation(e.target.value)}
								/>
							</div>

							{[0, 1, 2, 3].map((i) => (
								<div key={i}>
									<label className="text-xs font-semibold text-gray-500">
										Option {i + 1}
									</label>
									<Input
										placeholder="Enter option"
										value={question.options[i]}
										onChange={(e) => setOption(i, e.target.value)}
									/>
								</div>
							))}
						</div>
					</>
				)}
			</Card>
		</div>
	);
}
