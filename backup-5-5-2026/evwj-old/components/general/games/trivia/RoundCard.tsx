"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React from "react";
import { TriviaRound } from "./TriviaBuilderBoard";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type RoundCardProps = {
	round: TriviaRound;
	index: number;
	onChange: (round: TriviaRound) => void;
	onDelete?: () => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function RoundCard({
	round,
	index,
	onChange,
	onDelete,
	compact,
	setNodeRef,
	style,
	handleProps,
}: RoundCardProps) {
	const setDuration = (v: number) => onChange({ ...round, duration: v });
	const setQuestion = (v: string) => onChange({ ...round, question: v });
	const setExplanation = (v: string) => onChange({ ...round, explanation: v });
	const setCorrect = (i: number) => onChange({ ...round, correctIndex: i });
	const setOption = (i: number, v: string) => {
		const next = round.options.map((o, idx) => (idx === i ? v : o));
		onChange({ ...round, options: next });
	};

	return (
		<div
			className="rounded-xl border bg-white"
			ref={setNodeRef}
			style={style}
			data-id={round.id}
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
						<h2 className="text-lg font-bold">Round {index + 1}</h2>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-xs text-gray-400">Type: Trivia</span>
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
						<div className="mb-4 overflow-hidden rounded-xl border bg-linear-to-br from-sky-700 via-indigo-600 to-teal-500">
							<div className="p-6 md:p-8">
								<div className="mb-6 text-center text-lg font-bold text-white md:text-xl">
									{round.question || "Enter question here"}
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
															? "bg-indigo-600/90"
															: "bg-rose-600/90") +
												(round.correctIndex === i ? " ring-2 ring-white" : "")
											}
											onClick={() => setCorrect(i)}
											type="button"
										>
											{round.options[i] || "Enter option"}
										</button>
									))}
								</div>
								<div className="mt-6 flex items-center justify-center">
									<div className="w-full max-w-xs">
										<Slider
											value={[round.duration]}
											min={5}
											max={60}
											step={1}
											onValueChange={([val]) => setDuration(val)}
										/>
										<div className="mt-1 text-center text-xs text-white">
											{round.duration} sec
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
									placeholder="Enter question here"
									value={round.question}
									onChange={(e) => setQuestion(e.target.value)}
								/>
							</div>

							<div>
								<label className="text-xs font-semibold text-gray-500">
									Explanation
								</label>
								<Textarea
									placeholder="(Optional) Add explanation after answer is revealed"
									value={round.explanation}
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
										value={round.options[i]}
										onChange={(e) => setOption(i, e.target.value)}
									/>
								</div>
							))}

							<div>
								<label className="text-xs font-semibold text-gray-500">
									Correct Answer
								</label>
								<Select
									value={String(round.correctIndex)}
									onValueChange={(v) => setCorrect(Number(v))}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select correct option" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0">Option 1</SelectItem>
										<SelectItem value="1">Option 2</SelectItem>
										<SelectItem value="2">Option 3</SelectItem>
										<SelectItem value="3">Option 4</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</>
				)}
			</Card>
		</div>
	);
}
