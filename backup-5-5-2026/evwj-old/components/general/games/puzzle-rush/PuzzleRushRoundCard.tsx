"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import { Upload, Link as LinkIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import PuzzlePreview from "@/components/general/games/crowd-puzzle/PuzzlePreview";
import { PuzzleRushRound } from "./PuzzleRushBuilderBoard";

export type PuzzleRushRoundCardProps = {
	round: PuzzleRushRound;
	index: number;
	onChange: (round: PuzzleRushRound) => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
	onDelete: () => void;
};

export default function PuzzleRushRoundCard({
	round,
	index,
	onChange,
	compact,
	setNodeRef,
	style,
	handleProps,
	onDelete,
}: PuzzleRushRoundCardProps) {
	const [customUrl, setCustomUrl] = useState("");

	const setDuration = useCallback(
		(v: number) => onChange({ ...round, duration: v }),
		[onChange, round],
	);
	const setTitle = useCallback(
		(v: string) => onChange({ ...round, title: v }),
		[onChange, round],
	);
	const setImageUrl = useCallback(
		(v: string, source: "template" | "upload" | "url") =>
			onChange({ ...round, imageUrl: v, imageSource: source }),
		[onChange, round],
	);

	const handleFileUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();
					reader.onload = (e) => {
						const result = e.target?.result as string;
						setImageUrl(result, "upload");
					};
					reader.readAsDataURL(file);
				} else {
					alert("Please upload an image file");
				}
			}
			event.target.value = "";
		},
		[onChange, round, setImageUrl],
	);

	const handleUrlSubmit = useCallback(() => {
		if (customUrl.trim()) {
			setImageUrl(customUrl.trim(), "url");
		}
	}, [customUrl, onChange, round, setImageUrl]);

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
						<span className="text-xs text-gray-400 sm:text-sm">
							Type: 2x2 Puzzle
						</span>
						<Button
							type="button"
							size="sm"
							className="bg-red-600 text-white hover:bg-red-700"
							onClick={() => onDelete?.()}
						>
							<Trash2 className="mr-1 h-4 w-4" />
							Delete
						</Button>
					</div>
				</div>

				{compact ? null : (
					<>
						{/* Preview */}
						<div className="mb-4 overflow-hidden rounded-xl border bg-linear-to-br from-indigo-700 via-purple-600 to-fuchsia-500">
							<div className="p-6 md:p-8">
								<div className="mb-6 text-center text-lg font-bold text-white md:text-xl">
									{round.title || "(Optional) Round title for host"}
								</div>
								<div className="grid gap-4 md:grid-cols-2">
									{round.showPreview && (
										<div className="rounded-lg bg-white/5 p-4">
											{round.imageUrl ? (
												<div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-white/20">
													<Image
														src={round.imageUrl}
														alt="Round image"
														fill
														className="object-cover"
														sizes="(max-width: 768px) 100vw, 400px"
														quality={75}
													/>
												</div>
											) : (
												<div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-white/30 text-sm text-white/80">
													Upload or paste an image URL
												</div>
											)}
										</div>
									)}
									<div className="rounded-lg bg-white/5 p-4">
										<PuzzlePreview
											imageUrl={round.imageUrl}
											rows={2}
											columns={2}
											showControls={true}
										/>
										<div className="mt-4">
											<div className="mx-auto w-full max-w-xs">
												<Slider
													value={[round.duration]}
													min={5}
													max={120}
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
							</div>
						</div>

						{/* Form */}
						<div className="space-y-4">
							<div>
								<label className="text-xs font-semibold text-gray-500">
									Round Title (optional)
								</label>
								<Input
									placeholder="Title for host reference"
									value={round.title || ""}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>

							<div>
								<label className="text-xs font-semibold text-gray-500">
									Upload Image
								</label>
								<Card className="border-2 p-4">
									<label className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:bg-gray-50">
										<div className="flex flex-col items-center justify-center pb-2 pt-3">
											<Upload className="mb-2 h-6 w-6 text-gray-400" />
											<p className="text-sm text-gray-500">
												<span className="font-semibold">Click to upload</span>{" "}
												or drag and drop
											</p>
											<p className="text-xs text-gray-500">
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
							</div>

							<div className="flex items-center gap-2">
								<div className="flex-1">
									<label className="text-xs font-semibold text-gray-500">
										Or paste image URL
									</label>
									<Input
										type="url"
										placeholder="https://example.com/image.jpg"
										value={customUrl}
										onChange={(e) => setCustomUrl(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleUrlSubmit();
											}
										}}
									/>
								</div>
								<Button onClick={handleUrlSubmit} className="gap-2">
									<LinkIcon className="h-4 w-4" />
									Load URL
								</Button>
							</div>

							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									id={`showPreview-${round.id}`}
									checked={round.showPreview}
									onChange={(e) =>
										onChange({ ...round, showPreview: e.target.checked })
									}
									className="h-4 w-4 rounded border-gray-300"
								/>
								<label
									htmlFor={`showPreview-${round.id}`}
									className="text-sm font-medium text-gray-700"
								>
									Show image preview
								</label>
							</div>
						</div>
					</>
				)}
			</Card>
		</div>
	);
}
