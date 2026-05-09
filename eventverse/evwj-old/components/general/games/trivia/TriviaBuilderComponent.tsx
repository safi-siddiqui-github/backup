"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function TriviaBuilderComponent() {
	const [question, setQuestion] = useState("");
	const [explanation, setExplanation] = useState("");
	const [duration, setDuration] = useState<number>(15);
	const [options, setOptions] = useState<string[]>(["", "", "", ""]);
	const [correctIndex, setCorrectIndex] = useState<number>(0);
	//
	useEffect(() => {
		setCorrectIndex(0);
	}, []);
	//
	const updateOption = (idx: number, value: string) => {
		setOptions((prev) => prev.map((o, i) => (i === idx ? value : o)));
	};
	//
	return (
		<div className="mx-auto w-full max-w-5xl">
			<Card className="p-4 md:p-6 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">
						Round 1
					</h2>
					<span className="text-xs text-gray-400 dark:text-slate-400">
						Type: Trivia
					</span>
				</div>

				{/* Preview */}
				<div className="mb-4 overflow-hidden rounded-xl border bg-linear-to-br from-sky-700 via-indigo-600 to-teal-500">
					<div className="p-6 md:p-8">
						<div className="mb-6 text-center text-lg font-bold text-white md:text-xl">
							{question || "Enter question here"}
						</div>
						<div className="grid grid-cols-2 gap-4">
							<button className="rounded-lg bg-orange-500/90 py-3 font-semibold text-white shadow">
								{options[0] || "Enter option"}
							</button>
							<button className="rounded-lg bg-fuchsia-600/90 py-3 font-semibold text-white shadow">
								{options[1] || "Enter option"}
							</button>
							<button className="rounded-lg bg-indigo-600/90 py-3 font-semibold text-white shadow">
								{options[2] || "Enter option"}
							</button>
							<button className="rounded-lg bg-rose-600/90 py-3 font-semibold text-white shadow">
								{options[3] || "Enter option"}
							</button>
						</div>
						<div className="mt-6 flex items-center justify-center">
							<div className="w-full max-w-xs">
								<Slider
									value={[duration]}
									min={5}
									max={60}
									step={1}
									onValueChange={([val]) => setDuration(val)}
								/>
								<div className="mt-1 text-center text-xs text-white">
									{duration} sec
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className="mb-4 text-sm text-gray-600 dark:text-slate-300">
					Players who guess the correct answer are awarded points!
				</p>

				{/* Form */}
				<div className="space-y-4">
					<div>
						<label className="text-xs font-semibold text-gray-500 dark:text-slate-300">
							Duration
						</label>
						<div className="flex items-center gap-2">
							<span className="text-xs text-indigo-600 dark:text-indigo-400">
								{duration} sec
							</span>
						</div>
					</div>

					<div>
						<label className="text-xs font-semibold text-gray-500 dark:text-slate-300">
							Question
						</label>
						<Input
							placeholder="Enter question here"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
						/>
					</div>

					<div>
						<label className="text-xs font-semibold text-gray-500 dark:text-slate-300">
							Explanation
						</label>
						<Textarea
							placeholder="(Optional) Add explanation after answer is revealed"
							value={explanation}
							onChange={(e) => setExplanation(e.target.value)}
						/>
					</div>

					<div>
						<label className="text-xs font-semibold text-gray-500 dark:text-slate-300">
							Correct Answer
						</label>
						<Input
							placeholder="Enter option"
							value={options[correctIndex]}
							onChange={(e) => updateOption(correctIndex, e.target.value)}
						/>
					</div>

					{[1, 2, 3].map((i) => (
						<div key={i}>
							<label className="text-xs font-semibold text-gray-500 dark:text-slate-300">
								Option {i + 1}
							</label>
							<Input
								placeholder="Enter option"
								value={options[i]}
								onChange={(e) => updateOption(i, e.target.value)}
							/>
						</div>
					))}
				</div>

				{/* Footer actions */}
				<div className="sticky bottom-2 mt-6 flex w-full items-center justify-center gap-2 rounded-full !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)] p-2 shadow backdrop-blur">
					<Button variant="outline" size="sm">
						Add Round
					</Button>
					<Button variant="outline" size="sm">
						Add All Rounds
					</Button>
					<Button variant="outline" size="sm">
						Shuffle
					</Button>
					<Button size="sm" className="bg-orange-500 text-white">
						Done
					</Button>
				</div>
			</Card>
		</div>
	);
}
