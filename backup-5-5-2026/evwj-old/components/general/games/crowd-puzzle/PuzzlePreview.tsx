"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2, Grid3x3 } from "lucide-react";

interface PuzzlePreviewProps {
	imageUrl: string;
	rows?: number;
	columns?: number;
	showControls?: boolean;
	onComplete?: () => void;
}

interface PuzzlePiece {
	id: number;
	row: number;
	col: number;
	placed: boolean;
	x: number;
	y: number;
}

export default function PuzzlePreview({
	imageUrl,
	rows = 4,
	columns = 4,
	showControls = true,
	onComplete,
}: PuzzlePreviewProps) {
	const [isComplete, setIsComplete] = useState(false);
	const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
	const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageDimensions, setImageDimensions] = useState({
		width: 0,
		height: 0,
	});
	const onCompleteRef = useRef(onComplete);
	const solvedRef = useRef(false);

	useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	useEffect(() => {
		setImageLoaded(false);
		setIsComplete(false);
		solvedRef.current = false;
		const img = new Image();
		img.onload = () => {
			setImageLoaded(true);
			setImageDimensions({ width: img.width, height: img.height });
		};
		img.onerror = () => setImageLoaded(false);
		if (imageUrl) {
			img.src = imageUrl;
		}
	}, [imageUrl, rows, columns]);

	useEffect(() => {
		// Initialize pieces in staging area
		const pieceCount = rows * columns;
		const newPieces: PuzzlePiece[] = [];
		for (let i = 0; i < pieceCount; i++) {
			const row = Math.floor(i / columns);
			const col = i % columns;
			newPieces.push({
				id: i,
				row,
				col,
				placed: false,
				x: 0,
				y: 0,
			});
		}
		// Shuffle pieces
		for (let i = newPieces.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
		}
		setPieces(newPieces);
	}, [rows, columns, imageUrl]);

	const handleSolved = useCallback(() => {
		setTimeout(() => {
			if (!solvedRef.current) {
				solvedRef.current = true;
				setIsComplete(true);
				if (onCompleteRef.current) {
					onCompleteRef.current();
				}
			}
		}, 0);
	}, []);

	useEffect(() => {
		// Check if puzzle is complete
		const allPlaced = pieces.every((p) => p.placed);
		const correctPositions = pieces.every((p) => {
			if (!p.placed) return false;
			const expectedRow = Math.floor(p.id / columns);
			const expectedCol = p.id % columns;
			return p.row === expectedRow && p.col === expectedCol;
		});
		if (allPlaced && correctPositions && !isComplete) {
			handleSolved();
		}
	}, [pieces, rows, columns, isComplete, handleSolved]);

	const handleReset = () => {
		setIsComplete(false);
		solvedRef.current = false;
		setPieces((prev) => {
			const reset = prev.map((p) => ({ ...p, placed: false, x: 0, y: 0 }));
			// Shuffle
			for (let i = reset.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[reset[i], reset[j]] = [reset[j], reset[i]];
			}
			return reset;
		});
	};

	const handlePieceDragStart = useCallback((pieceId: number) => {
		setDraggedPiece(pieceId);
	}, []);

	const handlePieceDrop = useCallback(
		(targetRow: number, targetCol: number) => {
			if (draggedPiece === null) return;
			setPieces((prev) => {
				const updated = prev.map((p) => {
					if (p.id === draggedPiece) {
						return { ...p, placed: true, row: targetRow, col: targetCol };
					}
					// Remove piece from previous position if it was placed
					if (
						p.placed &&
						p.row === targetRow &&
						p.col === targetCol &&
						p.id !== draggedPiece
					) {
						return { ...p, placed: false, x: 0, y: 0 };
					}
					return p;
				});
				return updated;
			});
			setDraggedPiece(null);
		},
		[draggedPiece],
	);

	const pieceCount = rows * columns;
	const pieceWidth = 100 / columns;
	const pieceHeight = 100 / rows;

	return (
		<Card className="p-4 md:p-6 border-2">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-lg font-bold text-gray-900 dark:text-white">
						Puzzle Preview
					</h3>
					<p className="text-sm text-gray-500 dark:text-slate-300 sm:text-base">
						{pieceCount} pieces ({rows} × {columns})
					</p>
				</div>
				{showControls && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleReset}
						className="gap-2"
					>
						<RotateCcw className="h-4 w-4" />
						Reset
					</Button>
				)}
			</div>

			{isComplete && (
				<div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
					<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
					<span className="text-sm font-semibold text-green-800 dark:text-green-200">
						Puzzle solved! Great job!
					</span>
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Staging Area - Pieces not yet placed */}
				<div className="lg:col-span-1">
					<div className="flex items-center gap-2 mb-3">
						<Grid3x3 className="h-4 w-4 text-gray-600 dark:text-slate-400" />
						<h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300">
							Staging Area
						</h4>
					</div>
					<div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-slate-600 min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2">
							{pieces
								.filter((p) => !p.placed)
								.map((piece) => (
									<div
										key={piece.id}
										draggable
										onDragStart={() => handlePieceDragStart(piece.id)}
										className="relative aspect-square cursor-move hover:scale-105 transition-transform border-2 border-gray-300 dark:border-slate-600 rounded overflow-hidden bg-white dark:bg-slate-700"
										style={{
											backgroundImage:
												imageLoaded && imageUrl ? `url(${imageUrl})` : "none",
											backgroundSize: `${columns * 100}% ${rows * 100}%`,
											backgroundPosition: `${(piece.id % columns) * (100 / (columns - 1))}% ${Math.floor(piece.id / columns) * (100 / (rows - 1))}%`,
										}}
									>
										{!imageLoaded && (
											<div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
												{piece.id + 1}
											</div>
										)}
									</div>
								))}
						</div>
						{pieces.filter((p) => !p.placed).length === 0 && (
							<div className="text-center text-sm text-gray-400 dark:text-slate-500 py-8">
								All pieces placed!
							</div>
						)}
					</div>
				</div>

				{/* Puzzle Grid - Where pieces are placed */}
				<div className="lg:col-span-2">
					<h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">
						Puzzle Grid
					</h4>
					<div className="w-full overflow-hidden bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border-2 border-gray-300 dark:border-slate-600">
						<div
							className="relative mx-auto"
							style={{
								width: "100%",
								maxWidth: "min(500px, 90vw)",
								aspectRatio: `${columns} / ${rows}`,
								border: "3px solid #059669",
								borderRadius: "8px",
								backgroundColor: "#f9fafb",
								display: "grid",
								gridTemplateColumns: `repeat(${columns}, 1fr)`,
								gridTemplateRows: `repeat(${rows}, 1fr)`,
								gap: "2px",
							}}
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								e.preventDefault();
								const rect = e.currentTarget.getBoundingClientRect();
								const x = e.clientX - rect.left;
								const y = e.clientY - rect.top;
								const col = Math.floor((x / rect.width) * columns);
								const row = Math.floor((y / rect.height) * rows);
								if (draggedPiece !== null) {
									handlePieceDrop(row, col);
								}
							}}
						>
							{Array.from({ length: pieceCount }).map((_, index) => {
								const row = Math.floor(index / columns);
								const col = index % columns;
								const placedPiece = pieces.find(
									(p) => p.placed && p.row === row && p.col === col,
								);
								return (
									<div
										key={`cell-${index}`}
										className="border border-dashed border-green-300/40 dark:border-green-700/40 relative overflow-hidden"
										style={{
											backgroundColor: placedPiece
												? "rgba(209, 250, 229, 0.3)"
												: "rgba(209, 250, 229, 0.1)",
										}}
									>
										{placedPiece && imageLoaded && imageUrl && (
											<div
												draggable
												onDragStart={() => handlePieceDragStart(placedPiece.id)}
												className="absolute inset-0 cursor-move"
												style={{
													backgroundImage: `url(${imageUrl})`,
													backgroundSize: `${columns * 100}% ${rows * 100}%`,
													backgroundPosition: `${(placedPiece.id % columns) * (100 / (columns - 1))}% ${Math.floor(placedPiece.id / columns) * (100 / (rows - 1))}%`,
												}}
											/>
										)}
										{!placedPiece && (
											<div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 dark:text-slate-500">
												Drop here
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
