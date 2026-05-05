"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface BingoCardPreviewProps {
	cardSize: "5x5" | "4x4" | "3x3";
	numbers: number[][];
	customWords: string[];
	pattern: string;
}

const COLUMN_LETTERS = ["B", "I", "N", "G", "O"];

export default function BingoCardPreview({
	cardSize,
	numbers,
	customWords,
	pattern,
}: BingoCardPreviewProps) {
	const size = cardSize === "5x5" ? 5 : cardSize === "4x4" ? 4 : 3;

	const getPatternCells = () => {
		const cells: Set<string> = new Set();
		const center = Math.floor(size / 2);

		switch (pattern) {
			case "line":
				// First horizontal line
				for (let col = 0; col < size; col++) {
					cells.add(`0-${col}`);
				}
				break;
			case "full-house":
				// All cells
				for (let row = 0; row < size; row++) {
					for (let col = 0; col < size; col++) {
						cells.add(`${row}-${col}`);
					}
				}
				break;
			case "four-corners":
				cells.add(`0-0`);
				cells.add(`0-${size - 1}`);
				cells.add(`${size - 1}-0`);
				cells.add(`${size - 1}-${size - 1}`);
				break;
			case "t-shape":
				// Top horizontal + vertical through center
				for (let col = 0; col < size; col++) {
					cells.add(`0-${col}`);
				}
				for (let row = 0; row < size; row++) {
					cells.add(`${row}-${center}`);
				}
				break;
			case "x-pattern":
				// Both diagonals
				for (let i = 0; i < size; i++) {
					cells.add(`${i}-${i}`);
					cells.add(`${i}-${size - 1 - i}`);
				}
				break;
			case "frame":
				// Outside border
				for (let col = 0; col < size; col++) {
					cells.add(`0-${col}`);
					cells.add(`${size - 1}-${col}`);
				}
				for (let row = 1; row < size - 1; row++) {
					cells.add(`${row}-0`);
					cells.add(`${row}-${size - 1}`);
				}
				break;
		}
		return cells;
	};

	const patternCells = getPatternCells();

	return (
		<Card className="p-6 border-2">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-bold text-gray-900">
					Sample Bingo Card ({cardSize})
				</h3>
				<span className="text-xs text-gray-500 sm:text-sm">
					Pattern: {pattern}
				</span>
			</div>

			<div className="overflow-x-auto">
				<div className="inline-block">
					{/* Column Headers for 5x5 */}
					{cardSize === "5x5" && (
						<div className="grid grid-cols-5 gap-1 mb-1">
							{COLUMN_LETTERS.map((letter) => (
								<div
									key={letter}
									className="w-16 h-8 flex items-center justify-center bg-red-600 text-white font-bold text-sm sm:text-base rounded"
								>
									{letter}
								</div>
							))}
						</div>
					)}

					{/* Bingo Card Grid */}
					<div
						className={`grid gap-1 ${cardSize === "5x5" ? "grid-cols-5" : cardSize === "4x4" ? "grid-cols-4" : "grid-cols-3"}`}
					>
						{numbers.map((row, rowIndex) =>
							row.map((cell, colIndex) => {
								const cellKey = `${rowIndex}-${colIndex}`;
								const isPattern = patternCells.has(cellKey);

								return (
									<div
										key={cellKey}
										className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center border-2 rounded font-semibold text-sm relative ${
											isPattern
												? "bg-green-100 border-green-500"
												: "bg-gray-50 border-gray-300"
										}`}
									>
										{customWords.length > rowIndex * size + colIndex ? (
											<span className="text-xs sm:text-sm text-center px-1">
												{customWords[rowIndex * size + colIndex]}
											</span>
										) : (
											<span className="text-gray-400">?</span>
										)}
										{isPattern && (
											<CheckCircle2 className="absolute top-0.5 right-0.5 h-3 w-3 text-green-600" />
										)}
									</div>
								);
							}),
						)}
					</div>
				</div>
			</div>

			<p className="mt-4 text-xs text-gray-500 sm:text-sm">
				Green highlighted cells show the winning pattern. FREE space is always
				marked.
			</p>
		</Card>
	);
}
