"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CrowdPuzzleConfig } from "./CrowdPuzzleBuilderBoard";
import PuzzlePreview from "./PuzzlePreview";
import React, { useState, useCallback } from "react";
import {
	Upload,
	Link as LinkIcon,
	Image as ImageIcon,
	Settings,
	Puzzle,
	Trash2,
} from "lucide-react";

const DIFFICULTY_PRESETS = {
	Easy: { rows: 3, columns: 3, pieces: 9 },
	Medium: { rows: 4, columns: 4, pieces: 16 },
	Hard: { rows: 5, columns: 5, pieces: 25 },
};

export type CrowdPuzzleConfigCardProps = {
	config: CrowdPuzzleConfig;
	index: number;
	onChange: (config: CrowdPuzzleConfig) => void;
	onDelete?: () => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function CrowdPuzzleConfigCard({
	config,
	index,
	onChange,
	onDelete,
	compact,
	setNodeRef,
	style,
	handleProps,
}: CrowdPuzzleConfigCardProps) {
	const [customUrl, setCustomUrl] = useState("");

	const handleFileUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();
					reader.onload = (e) => {
						const result = e.target?.result as string;
						onChange({
							...config,
							imageUrl: result,
							imageSource: "upload",
						});
					};
					reader.readAsDataURL(file);
				} else {
					alert("Please upload an image file");
				}
			}
			event.target.value = "";
		},
		[config, onChange],
	);

	const handleUrlSubmit = useCallback(() => {
		if (customUrl.trim()) {
			onChange({
				...config,
				imageUrl: customUrl.trim(),
				imageSource: "url",
			});
			setCustomUrl("");
		}
	}, [customUrl, config, onChange]);

	const handleDifficultyChange = useCallback(
		(difficulty: "Easy" | "Medium" | "Hard") => {
			const preset = DIFFICULTY_PRESETS[difficulty];
			onChange({
				...config,
				difficulty,
				rows: preset.rows,
				columns: preset.columns,
			});
		},
		[config, onChange],
	);

	const pieceCount = config.rows * config.columns;

	if (compact) {
		return (
			<div ref={setNodeRef} style={style} data-config-id={config.id}>
				<Card className="p-4">
					<div className="flex items-center gap-3">
						<span className="cursor-move text-gray-400" {...handleProps}>
							⋮⋮
						</span>
						<h2 className="text-lg font-bold">
							Puzzle Configuration {index + 1}
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
			<Card className="rounded-xl border bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-4 md:p-6">
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
							Puzzle Configuration {index + 1}
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

				{/* Image Upload Section */}
				<section className="mb-6">
					<div className="flex items-center gap-2 mb-4">
						<ImageIcon className="h-5 w-5 text-green-600" />
						<h3 className="text-base font-bold text-gray-900 dark:text-white">
							Puzzle Image
						</h3>
					</div>

					<div className="space-y-4">
						{/* Upload Option */}
						<Card className="p-4 border-2 bg-white! dark:bg-slate-800/95! backdrop-blur-sm">
							<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<Upload className="h-8 w-8 text-gray-400 dark:text-slate-400 mb-2" />
									<p className="mb-2 text-sm text-gray-500 dark:text-slate-300">
										<span className="font-semibold">Click to upload</span> or
										drag and drop
									</p>
									<p className="text-xs text-gray-500 dark:text-slate-400">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
								<input
									type="file"
									className="hidden"
									accept="image/*"
									onChange={handleFileUpload}
								/>
							</label>
						</Card>

						{/* Or URL Input */}
						<div className="flex items-center gap-2">
							<div className="flex-1">
								<Input
									type="url"
									placeholder="Or paste image URL here..."
									value={customUrl}
									onChange={(e) => setCustomUrl(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											handleUrlSubmit();
										}
									}}
									className="w-full"
								/>
							</div>
							<Button onClick={handleUrlSubmit} className="gap-2">
								<LinkIcon className="h-4 w-4" />
								Load URL
							</Button>
						</div>

						{/* Current Image Preview Thumbnail */}
						{config.imageUrl && (
							<div className="mt-4 p-4 bg-white! dark:bg-slate-800/95! backdrop-blur-sm rounded-lg">
								<p className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
									Current Image:
								</p>
								<div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
									<img
										src={config.imageUrl}
										alt="Puzzle preview"
										className="w-full h-full object-contain"
										onError={() => {
											alert(
												"Failed to load image. Please check the URL or upload a new image.",
											);
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</section>

				{/* Puzzle Settings */}
				<section className="mb-6 space-y-4">
					<div className="flex items-center gap-2">
						<Settings className="h-5 w-5 text-green-600" />
						<h3 className="text-base font-bold text-gray-900 dark:text-white">
							Puzzle Settings
						</h3>
					</div>

					{/* Difficulty Selection */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
							Difficulty Level
						</label>
						<div className="grid grid-cols-3 gap-3">
							{(["Easy", "Medium", "Hard"] as const).map((diff) => {
								const preset = DIFFICULTY_PRESETS[diff];
								return (
									<button
										key={diff}
										onClick={() => handleDifficultyChange(diff)}
										className={`p-3 rounded-lg border-2 transition-all text-sm ${
											config.difficulty === diff
												? "border-green-500 bg-green-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<div className="text-sm font-semibold text-gray-900 dark:text-white">
											{diff}
										</div>
										<div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
											{preset.rows} × {preset.columns} = {preset.pieces} pieces
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Custom Rows/Columns */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
								Rows: {config.rows}
							</label>
							<Slider
								value={[config.rows]}
								onValueChange={(values) => {
									onChange({ ...config, rows: values[0] });
								}}
								min={2}
								max={8}
								step={1}
							/>
							<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
								<span>2</span>
								<span>8</span>
							</div>
						</div>

						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
								Columns: {config.columns}
							</label>
							<Slider
								value={[config.columns]}
								onValueChange={(values) => {
									onChange({ ...config, columns: values[0] });
								}}
								min={2}
								max={8}
								step={1}
							/>
							<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
								<span>2</span>
								<span>8</span>
							</div>
						</div>
					</div>

					<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<p className="text-sm text-blue-800 dark:text-blue-200">
							<strong>Total Pieces:</strong> {pieceCount} pieces ({config.rows}{" "}
							rows × {config.columns} columns)
						</p>
					</div>

					{/* Additional Options */}
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id={`allowHints-${config.id}`}
								checked={config.allowHints}
								onChange={(e) => {
									onChange({ ...config, allowHints: e.target.checked });
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor={`allowHints-${config.id}`}
								className="text-sm font-medium text-gray-700 dark:text-slate-300"
							>
								Allow Hints
							</label>
						</div>
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id={`collaborativeMode-${config.id}`}
								checked={config.collaborativeMode}
								onChange={(e) => {
									onChange({ ...config, collaborativeMode: e.target.checked });
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor={`collaborativeMode-${config.id}`}
								className="text-sm font-medium text-gray-700 dark:text-slate-300"
							>
								Collaborative Mode
							</label>
						</div>
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id={`showPreview-${config.id}`}
								checked={config.showPreview}
								onChange={(e) => {
									onChange({ ...config, showPreview: e.target.checked });
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor={`showPreview-${config.id}`}
								className="text-sm font-medium text-gray-700 dark:text-slate-300"
							>
								Show Preview Image
							</label>
						</div>
					</div>
				</section>

				{/* Live Puzzle Preview */}
				{config.imageUrl && (
					<section>
						<div className="flex items-center gap-2 mb-4">
							<Puzzle className="h-5 w-5 text-green-600" />
							<h3 className="text-base font-bold text-gray-900 dark:text-white">
								Live Preview
							</h3>
						</div>
						<PuzzlePreview
							imageUrl={config.imageUrl}
							rows={config.rows}
							columns={config.columns}
							showControls={true}
						/>
					</section>
				)}
			</Card>
		</div>
	);
}
