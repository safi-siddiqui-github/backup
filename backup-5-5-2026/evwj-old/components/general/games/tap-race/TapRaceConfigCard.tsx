"use client";

import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TapRaceConfig } from "./TapRaceBuilderBoard";
import TapRaceAnimationPreview from "./TapRaceAnimationPreview";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export type TapRaceConfigCardProps = {
	config: TapRaceConfig;
	index: number;
	onChange: (config: TapRaceConfig) => void;
	onDelete?: () => void;
	compact?: boolean;
	setNodeRef?: (node: HTMLElement | null) => void;
	style?: React.CSSProperties;
	handleProps?: React.HTMLAttributes<HTMLSpanElement>;
};

export default function TapRaceConfigCard({
	config,
	index,
	onChange,
	onDelete,
	compact,
	setNodeRef,
	style,
	handleProps,
}: TapRaceConfigCardProps) {
	const [progress, setProgress] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [tapCount, setTapCount] = useState(0);

	const handleTap = () => {
		setTapCount((prev) => {
			const newCount = prev + 1;
			const newProgress = Math.min((newCount / config.tapGoal) * 100, 100);
			setProgress(newProgress);
			return newCount;
		});
		setIsActive(true);
		setTimeout(() => setIsActive(false), 150);
	};

	const handleReset = () => {
		setProgress(0);
		setTapCount(0);
		setIsActive(false);
	};

	if (compact) {
		return (
			<div ref={setNodeRef} style={style} data-config-id={config.id}>
				<Card className="p-4">
					<div className="flex items-center gap-3">
						<span className="cursor-move text-gray-400" {...handleProps}>
							⋮⋮
						</span>
						<h2 className="text-lg font-bold">Round {index + 1}</h2>
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
						<h2 className="text-lg font-bold">Round {index + 1}</h2>
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

				{/* Live animation preview section */}
				<div className="mb-6">
					<h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">
						Live Preview
					</h3>
					<TapRaceAnimationPreview
						animationType={config.animationType}
						progress={progress}
						onTap={handleTap}
						isActive={isActive}
					/>
					<div className="mt-4 flex items-center justify-between">
						<Button
							variant="outline"
							size="sm"
							onClick={handleReset}
							className="text-xs"
						>
							Reset Preview
						</Button>
						<div className="text-sm text-gray-600 dark:text-slate-300">
							Goal: {config.tapGoal} taps | Duration: {config.duration}s
						</div>
					</div>
				</div>

				{/* Settings form */}
				<div className="space-y-4">
					{/* Animation type selector */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
							Animation Type
						</label>
						<Select
							value={config.animationType}
							onValueChange={(value: "car" | "ball" | "rocket" | "runner") => {
								onChange({ ...config, animationType: value });
								handleReset();
							}}
						>
							<SelectTrigger className="w-full md:w-[300px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="car">🏎️ Racing Car</SelectItem>
								<SelectItem value="ball">⚽ Rolling Ball</SelectItem>
								<SelectItem value="rocket">🚀 Space Rocket</SelectItem>
								<SelectItem value="runner">🏃 Sprint Runner</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Duration slider */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
							Duration: {config.duration} seconds
						</label>
						<Slider
							value={[config.duration]}
							onValueChange={(values) => {
								onChange({ ...config, duration: values[0] });
							}}
							min={15}
							max={120}
							step={5}
							className="w-full md:w-[400px]"
						/>
						<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
							<span>15s</span>
							<span>120s</span>
						</div>
					</div>

					{/* Tap goal slider */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
							Tap Goal: {config.tapGoal} taps
						</label>
						<Slider
							value={[config.tapGoal]}
							onValueChange={(values) => {
								onChange({ ...config, tapGoal: values[0] });
								handleReset();
							}}
							min={50}
							max={500}
							step={10}
							className="w-full md:w-[400px]"
						/>
						<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
							<span>50 taps</span>
							<span>500 taps</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
