"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Settings, Brain, Grid3x3, Plus, Shuffle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalBingoConfig } from "./DigitalBingoBuilderBoard";
import BingoCardPreview from "./BingoCardPreview";
import React from "react";

const CARD_SIZES = {
	"3x3": { rows: 3, cols: 3, total: 9 },
	"4x4": { rows: 4, cols: 4, total: 16 },
	"5x5": { rows: 5, cols: 5, total: 25 },
};

const RANDOM_WORDS = [
	"Party",
	"Dance",
	"Music",
	"Laugh",
	"Smile",
	"Cheers",
	"Friends",
	"Family",
	"Food",
	"Drinks",
	"Games",
	"Prize",
	"Fun",
	"Celebrate",
	"Joy",
	"Memory",
	"Photo",
	"Stage",
	"Lights",
	"DJ",
	"Toast",
	"Cake",
	"Balloon",
	"Confetti",
	"Sparkle",
	"Glam",
	"Style",
	"Fashion",
	"Theme",
	"Venue",
	"Ticket",
	"Host",
	"Guest",
	"Chair",
	"Table",
	"Centerpiece",
	"Banner",
	"Flower",
	"Gift",
	"Raffle",
	"Winner",
	"Clap",
	"Sing",
	"Show",
	"Screen",
	"Live",
	"Mic",
	"Quiz",
	"Bingo",
	"Round",
];

export type DigitalBingoConfigCardProps = {
	config: DigitalBingoConfig;
	index: number;
	onChange: (config: DigitalBingoConfig) => void;
	onDelete?: () => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function DigitalBingoConfigCard({
	config,
	index,
	onChange,
	onDelete,
	compact,
	setNodeRef,
	style,
	handleProps,
}: DigitalBingoConfigCardProps) {
	const [customWordInput, setCustomWordInput] = React.useState("");

	const handleAddWord = () => {
		if (
			customWordInput.trim() &&
			!config.customWords.includes(customWordInput.trim())
		) {
			const size = CARD_SIZES[config.cardSize];
			if (config.customWords.length < size.total) {
				onChange({
					...config,
					customWords: [...config.customWords, customWordInput.trim()],
				});
				setCustomWordInput("");
			}
		}
	};

	const handleRemoveWord = (wordIndex: number) => {
		onChange({
			...config,
			customWords: config.customWords.filter((_, i) => i !== wordIndex),
		});
	};

	const handleAddRandom = () => {
		const size = CARD_SIZES[config.cardSize];
		if (config.customWords.length >= size.total) return;
		let candidate = "";
		for (let attempts = 0; attempts < 20; attempts++) {
			const useNumber = Math.random() < 0.5;
			if (useNumber) {
				candidate = String(Math.floor(Math.random() * 999) + 1);
			} else {
				candidate =
					RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
			}
			if (!config.customWords.includes(candidate)) break;
		}
		if (!candidate) return;
		onChange({
			...config,
			customWords: [...config.customWords, candidate],
		});
	};

	const generateSampleCard = (): number[][] => {
		const { rows, cols } = CARD_SIZES[config.cardSize];
		const card: number[][] = [];
		for (let row = 0; row < rows; row++) {
			const cardRow: number[] = [];
			for (let col = 0; col < cols; col++) {
				cardRow.push(row * cols + col + 1);
			}
			card.push(cardRow);
		}
		return card;
	};

	const sampleCard = generateSampleCard();

	if (compact) {
		return (
			<div ref={setNodeRef} style={style} data-config-id={config.id}>
				<Card className="p-4">
					<div className="flex items-center gap-3">
						<span className="cursor-move text-gray-400" {...handleProps}>
							⋮⋮
						</span>
						<h2 className="text-lg font-bold">
							Card Configuration {index + 1}
						</h2>
						{onDelete && (
							<Button
								variant="ghost"
								size="sm"
								onClick={onDelete}
								className="ml-auto text-red-600 hover:text-red-700"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						)}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div ref={setNodeRef} style={style} data-config-id={config.id}>
			<Card className="rounded-xl border !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)] p-4 md:p-6">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span
							className="cursor-move text-gray-400"
							title="Drag to reorder"
							{...handleProps}
						>
							⋮⋮
						</span>
						<h2 className="text-lg font-bold">
							Card Configuration {index + 1}
						</h2>
					</div>
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

				{/* Card Settings */}
				<section className="mb-6 space-y-4">
					<div className="flex items-center gap-2">
						<Grid3x3 className="h-5 w-5 text-red-600" />
						<h3 className="text-base font-bold text-gray-900 dark:text-white">
							Bingo Card Settings
						</h3>
					</div>

					{/* Card Size */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
							Card Size
						</label>
						<div className="grid grid-cols-3 gap-3">
							{(["3x3", "4x4", "5x5"] as const).map((size) => {
								const cardInfo = CARD_SIZES[size];
								return (
									<button
										key={size}
										onClick={() => onChange({ ...config, cardSize: size })}
										className={`p-3 rounded-lg border-2 transition-all text-sm ${
											config.cardSize === size
												? "border-red-500 bg-red-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<div className="text-sm font-semibold text-gray-900 dark:text-white">
											{size}
										</div>
										<div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
											{cardInfo.total} squares
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Custom Words/Phrases */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
							Custom Words/Phrases
						</label>
						<p className="text-xs text-gray-500 dark:text-slate-300 mb-3">
							Add words or phrases for your bingo cards. You need at least{" "}
							{CARD_SIZES[config.cardSize].total} items.
						</p>
						<div className="flex gap-2 mb-3 flex-wrap">
							<Input
								type="text"
								placeholder="Enter word or phrase..."
								value={customWordInput}
								onChange={(e) => setCustomWordInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleAddWord();
									}
								}}
								className="flex-1 min-w-[200px]"
							/>
							<Button onClick={handleAddWord} size="sm" className="gap-2">
								<Plus className="h-4 w-4" />
								Add
							</Button>
							<Button
								onClick={handleAddRandom}
								variant="secondary"
								size="sm"
								className="gap-2"
							>
								<Shuffle className="h-4 w-4" />
								Add Random
							</Button>
						</div>
						{config.customWords.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{config.customWords.map((word, wordIndex) => (
									<div
										key={wordIndex}
										className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5"
									>
										<span className="text-sm text-gray-900 dark:text-white">
											{word}
										</span>
										<button
											onClick={() => handleRemoveWord(wordIndex)}
											className="text-red-600 hover:text-red-800 text-sm font-bold"
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
						{config.customWords.length < CARD_SIZES[config.cardSize].total && (
							<p className="text-xs text-amber-600 mt-2">
								Need{" "}
								{CARD_SIZES[config.cardSize].total - config.customWords.length}{" "}
								more items
							</p>
						)}
					</div>
				</section>

				{/* Game Settings */}
				<section className="mb-6 space-y-4">
					<div className="flex items-center gap-2">
						<Settings className="h-5 w-5 text-red-600" />
						<h3 className="text-base font-bold text-gray-900 dark:text-white">
							Game Settings
						</h3>
					</div>

					{/* Additional Options */}
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id={`winnerAnnouncement-${config.id}`}
								checked={config.winnerAnnouncement}
								onChange={(e) => {
									onChange({ ...config, winnerAnnouncement: e.target.checked });
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor={`winnerAnnouncement-${config.id}`}
								className="text-sm font-medium text-gray-700 dark:text-slate-300"
							>
								Winner Announcement
							</label>
						</div>
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id={`allowMultipleWinners-${config.id}`}
								checked={config.allowMultipleWinners}
								onChange={(e) => {
									onChange({
										...config,
										allowMultipleWinners: e.target.checked,
									});
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor={`allowMultipleWinners-${config.id}`}
								className="text-sm font-medium text-gray-700 dark:text-slate-300"
							>
								Allow Multiple Winners
							</label>
						</div>
					</div>
				</section>

				{/* Bingo Card Preview */}
				<section>
					<div className="flex items-center gap-2 mb-4">
						<Brain className="h-5 w-5 text-red-600" />
						<h3 className="text-base font-bold text-gray-900 dark:text-white">
							Card Preview
						</h3>
					</div>
					<BingoCardPreview
						cardSize={config.cardSize}
						numbers={sampleCard}
						customWords={config.customWords}
						pattern={config.pattern}
					/>
				</section>
			</Card>
		</div>
	);
}
