"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Trash2, Camera, Settings } from "lucide-react";
import {
	ScavengerHuntItem,
	SCAVENGER_HUNT_TEMPLATES,
} from "@/components/general/games/game-data";
import { Textarea } from "@/components/ui/textarea";
import ImportTemplateDialog from "../ImportTemplateDialog";

export type ScavengerHuntConfig = {
	id: string;
	judgeType: "ai" | "host";
	items: ScavengerHuntItem[];
	totalDuration: number; // seconds
	defaultItemTimer: number; // seconds
	maxSubmissionsPerItem: number;
	pointsPerItem: number;
	teamMode: boolean;
	allowRetakes: boolean;
};

function createEmptyItem(index: number): ScavengerHuntItem {
	return {
		id: `item-${Date.now()}-${index}`,
		title: "",
		description: "",
		category: "General",
		difficulty: "Medium",
		estimatedTime: 60,
	};
}

export default function ScavengerHuntBuilderBoard() {
	const searchParams = useSearchParams();
	const judgeTypeParam = searchParams.get("judgeType") as "ai" | "host" | null;

	const [items, setItems] = useState<ScavengerHuntItem[]>([createEmptyItem(0)]);
	const [importDialogOpen, setImportDialogOpen] = useState(false);

	const [config, setConfig] = useState<ScavengerHuntConfig>({
		id: `scavenger-hunt-${Date.now()}`,
		judgeType: judgeTypeParam || "ai",
		items: [],
		totalDuration: 1800, // 30 minutes default
		defaultItemTimer: 300, // 5 minutes per item
		maxSubmissionsPerItem: 3,
		pointsPerItem: 10,
		teamMode: false,
		allowRetakes: true,
	});

	useEffect(() => {
		if (judgeTypeParam && ["ai", "host"].includes(judgeTypeParam)) {
			setConfig((prev) => ({
				...prev,
				judgeType: judgeTypeParam,
			}));
		}
	}, [judgeTypeParam]);

	const removeItem = useCallback((id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	}, []);

	const updateItem = useCallback(
		(id: string, updates: Partial<ScavengerHuntItem>) => {
			setItems((prev) =>
				prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
			);
		},
		[],
	);

	const handleImportTemplate = useCallback(
		(template: any) => {
			// Convert template to ScavengerHuntItem format
			const newItem: ScavengerHuntItem = {
				id: `item-${Date.now()}-${items.length}`,
				title: template.title || "",
				description: template.description || "",
				category: template.category || "General",
				difficulty: template.difficulty || "Medium",
				estimatedTime: template.estimatedTime || 60,
				image: template.image,
			};
			setItems((prev) => [...prev, newItem]);
		},
		[items.length],
	);

	const shuffleItems = useCallback(() => {
		setItems((prev) => {
			const copy = [...prev];
			for (let i = copy.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[copy[i], copy[j]] = [copy[j], copy[i]];
			}
			return copy;
		});
	}, []);

	const addItem = useCallback(() => {
		const newItem = createEmptyItem(items.length);
		setItems((prev) => [...prev, newItem]);
		// Auto-scroll to new item after a short delay
		setTimeout(() => {
			const element = document.querySelector(`[data-item-id="${newItem.id}"]`);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 100);
	}, [items.length]);

	const footer = useMemo(
		() => (
			<div className="sticky bottom-2 mt-6 flex w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-2 shadow">
				<Button variant="outline" size="sm" onClick={addItem}>
					Add Item
				</Button>
				<Button variant="outline" size="sm" onClick={shuffleItems}>
					Shuffle
				</Button>
				<Button variant="outline" size="sm">
					Save Draft
				</Button>
				<Button size="sm" className="bg-orange-500 text-white">
					Done
				</Button>
			</div>
		),
		[addItem, shuffleItems],
	);

	return (
		<div className="mx-auto w-full max-w-5xl">
			<Card className="rounded-xl border bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-6 shadow-lg md:p-8">
				{/* Header */}
				<div className="mb-6 flex items-start justify-between">
					<div>
						<h1 className="text-xl font-extrabold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
							Scavenger Hunt Configuration
						</h1>
						<p className="mt-2 text-sm text-gray-500 dark:text-slate-300">
							Set up photo challenges, timers, and game rules for your scavenger
							hunt.
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setImportDialogOpen(true)}
					>
						Import from Template
					</Button>
				</div>

				<ImportTemplateDialog
					open={importDialogOpen}
					onClose={() => setImportDialogOpen(false)}
					onImport={handleImportTemplate}
					templates={SCAVENGER_HUNT_TEMPLATES}
					gameType="scavenger-hunt"
				/>

				{/* Game Settings */}
				<section className="mb-8 space-y-6">
					<div className="flex items-center gap-2 mb-4">
						<Settings className="h-5 w-5 text-purple-600" />
						<h2 className="text-lg font-bold text-gray-900 dark:text-white">
							Game Settings
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Total Duration */}
						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
								Total Game Duration: {Math.floor(config.totalDuration / 60)}{" "}
								minutes
							</label>
							<Slider
								value={[config.totalDuration]}
								onValueChange={(values) => {
									setConfig((prev) => ({ ...prev, totalDuration: values[0] }));
								}}
								min={300}
								max={7200}
								step={60}
							/>
							<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
								<span>5 min</span>
								<span>120 min</span>
							</div>
						</div>

						{/* Default Item Timer */}
						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
								Default Timer per Item:{" "}
								{Math.floor(config.defaultItemTimer / 60)} min{" "}
								{config.defaultItemTimer % 60}s
							</label>
							<Slider
								value={[config.defaultItemTimer]}
								onValueChange={(values) => {
									setConfig((prev) => ({
										...prev,
										defaultItemTimer: values[0],
									}));
								}}
								min={30}
								max={1800}
								step={30}
							/>
							<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
								<span>30s</span>
								<span>30 min</span>
							</div>
						</div>

						{/* Points per Item */}
						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
								Points per Item
							</label>
							<Slider
								value={[config.pointsPerItem]}
								onValueChange={(values) => {
									setConfig((prev) => ({ ...prev, pointsPerItem: values[0] }));
								}}
								min={1}
								max={100}
								step={1}
							/>
							<div className="mt-1 text-xs text-gray-500 dark:text-slate-400">
								{config.pointsPerItem} points
							</div>
						</div>

						{/* Max Submissions */}
						<div>
							<label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
								Max Submissions per Item
							</label>
							<Slider
								value={[config.maxSubmissionsPerItem]}
								onValueChange={(values) => {
									setConfig((prev) => ({
										...prev,
										maxSubmissionsPerItem: values[0],
									}));
								}}
								min={1}
								max={10}
								step={1}
							/>
							<div className="mt-1 text-xs text-gray-500 dark:text-slate-400">
								{config.maxSubmissionsPerItem} attempts
							</div>
						</div>
					</div>

					{/* Additional Options */}
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id="teamMode"
								checked={config.teamMode}
								onChange={(e) => {
									setConfig((prev) => ({
										...prev,
										teamMode: e.target.checked,
									}));
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor="teamMode"
								className="text-sm font-medium text-gray-700 dark:text-slate-300"
							>
								Enable Team Mode (guests work in teams)
							</label>
						</div>
						<div className="flex items-center gap-3">
							<input
								type="checkbox"
								id="allowRetakes"
								checked={config.allowRetakes}
								onChange={(e) => {
									setConfig((prev) => ({
										...prev,
										allowRetakes: e.target.checked,
									}));
								}}
								className="h-4 w-4 rounded border-gray-300"
							/>
							<label
								htmlFor="allowRetakes"
								className="text-sm font-medium text-gray-700"
							>
								Allow Photo Retakes
							</label>
						</div>
					</div>
				</section>

				{/* Items Section */}
				<section>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<Camera className="h-5 w-5 text-purple-600" />
							<h2 className="text-lg font-bold text-gray-900 dark:text-white">
								Challenge Items ({items.length})
							</h2>
						</div>
						<Button onClick={addItem} size="sm" className="gap-2">
							<Plus className="h-4 w-4" />
							Add Item
						</Button>
					</div>

					<div className="space-y-4">
						{items.map((item, index) => (
							<Card
								key={item.id}
								data-item-id={item.id}
								className="p-5 border-2 hover:border-purple-200 transition-colors"
							>
								<div className="flex items-start justify-between mb-4">
									<h3 className="text-base font-semibold text-gray-900 dark:text-white">
										Item {index + 1}
									</h3>
									{items.length > 1 && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => removeItem(item.id)}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									)}
								</div>

								<div className="space-y-4">
									{/* Title */}
									<div>
										<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
											Challenge Title *
										</label>
										<Input
											value={item.title}
											onChange={(e) =>
												updateItem(item.id, { title: e.target.value })
											}
											placeholder="e.g., Find a red car"
											className="w-full"
										/>
									</div>

									{/* Description */}
									<div>
										<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
											Description
										</label>
										<Textarea
											value={item.description}
											onChange={(e) =>
												updateItem(item.id, { description: e.target.value })
											}
											placeholder="Additional instructions for guests..."
											className="w-full min-h-[80px]"
										/>
									</div>

									{/* Difficulty and Timer */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="mb-2 block text-sm font-medium text-gray-700">
												Difficulty
											</label>
											<Select
												value={item.difficulty}
												onValueChange={(value: "Easy" | "Medium" | "Hard") =>
													updateItem(item.id, { difficulty: value })
												}
											>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Easy">Easy</SelectItem>
													<SelectItem value="Medium">Medium</SelectItem>
													<SelectItem value="Hard">Hard</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div>
											<label className="mb-2 block text-sm font-medium text-gray-700">
												Timer: {Math.floor(item.estimatedTime / 60)} min{" "}
												{item.estimatedTime % 60}s
											</label>
											<Slider
												value={[item.estimatedTime]}
												onValueChange={(values) =>
													updateItem(item.id, { estimatedTime: values[0] })
												}
												min={30}
												max={900}
												step={30}
											/>
											<div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-slate-400">
												<span>30s</span>
												<span>15 min</span>
											</div>
										</div>
									</div>

									{/* Category */}
									<div>
										<label className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
											Category (optional)
										</label>
										<Input
											value={item.category}
											onChange={(e) =>
												updateItem(item.id, { category: e.target.value })
											}
											placeholder="e.g., Nature, Food, Urban"
											className="w-full"
										/>
									</div>
								</div>
							</Card>
						))}
					</div>

					{items.length === 0 && (
						<div className="text-center py-12 text-gray-400 dark:text-slate-400">
							<Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
							<p>No items yet. Add your first challenge item to get started!</p>
						</div>
					)}
				</section>
			</Card>

			{footer}
		</div>
	);
}
