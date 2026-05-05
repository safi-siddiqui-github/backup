"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { BattleOfOpinionsQuestion } from "./BattleOfOpinionsBuilderBoard";

export type BattleOfOpinionsQuestionCardProps = {
	question: BattleOfOpinionsQuestion;
	index: number;
	onChange: (question: BattleOfOpinionsQuestion) => void;
	onDelete?: () => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function BattleOfOpinionsQuestionCard({
	question,
	index,
	onChange,
	onDelete,
	compact,
	setNodeRef,
	style,
	handleProps,
}: BattleOfOpinionsQuestionCardProps) {
	const setDuration = (v: number) => onChange({ ...question, duration: v });
	const setQuestion = (v: string) => onChange({ ...question, question: v });
	const setExplanation = (v: string) =>
		onChange({ ...question, explanation: v });
	const setOptionA = (v: string) => onChange({ ...question, optionA: v });
	const setOptionB = (v: string) => onChange({ ...question, optionB: v });

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
						<span className="text-xs text-gray-400">
							Type: Would You Rather
						</span>
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
						<div className="mb-4 overflow-hidden rounded-xl border bg-linear-to-br from-orange-500 via-pink-500 to-rose-500">
							<div className="p-6 md:p-8">
								<div className="mb-6 text-center text-lg font-extrabold text-white md:text-xl">
									{question.question}
								</div>
								<div className="grid grid-cols-2 gap-4">
									<button
										className="rounded-lg bg-orange-500/90 py-3 font-semibold text-white shadow"
										type="button"
									>
										{question.optionA || "Option A"}
									</button>
									<button
										className="rounded-lg bg-pink-500/90 py-3 font-semibold text-white shadow"
										type="button"
									>
										{question.optionB || "Option B"}
									</button>
								</div>
								<div className="mt-6">
									<div className="mb-2 h-2 w-full overflow-hidden rounded bg-white/30">
										<div className="h-full w-1/2 bg-orange-400/90" />
									</div>
									<div className="mb-2 h-2 w-full overflow-hidden rounded bg-white/30">
										<div className="h-full w-1/2 bg-pink-400/90" />
									</div>
									<div className="mt-2 flex items-center justify-center">
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
						</div>

						{/* Form */}
						<div className="space-y-4">
							<div>
								<label className="text-xs font-semibold text-gray-500">
									Question
								</label>
								<Input
									placeholder="Enter would-you-rather prompt (without 'Would you rather')"
									value={question.question}
									onChange={(e) => setQuestion(e.target.value)}
								/>
							</div>

							<div>
								<label className="text-xs font-semibold text-gray-500">
									Explanation
								</label>
								<Textarea
									placeholder="(Optional) Add context or reveal after voting"
									value={question.explanation}
									onChange={(e) => setExplanation(e.target.value)}
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<label className="text-xs font-semibold text-gray-500">
										Option A
									</label>
									<Input
										placeholder="Enter option A"
										value={question.optionA}
										onChange={(e) => setOptionA(e.target.value)}
									/>
								</div>
								<div>
									<label className="text-xs font-semibold text-gray-500">
										Option B
									</label>
									<Input
										placeholder="Enter option B"
										value={question.optionB}
										onChange={(e) => setOptionB(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</>
				)}
			</Card>
		</div>
	);
}
