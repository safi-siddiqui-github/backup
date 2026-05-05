"use client";

import { Button } from "@/components/ui/button";
import {
	closestCenter,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ImportTemplateDialog from "../ImportTemplateDialog";
import { TAP_RACE_ANIMATIONS } from "../game-data";
import SortableTapRaceConfig from "./SortableTapRaceConfig";

export type TapRaceConfig = {
	id: string;
	animationType: "car" | "ball" | "rocket" | "runner";
	duration: number;
	tapGoal: number;
	themeColor?: string;
};

function createEmptyConfig(index: number): TapRaceConfig {
	return {
		id: `tap-race-${Date.now()}-${index}`,
		animationType: "car",
		duration: 30,
		tapGoal: 100,
		themeColor: "#6366f1",
	};
}

export default function TapRaceBuilderBoard() {
	const searchParams = useSearchParams();
	const animationTypeParam = searchParams.get("animationType") as
		| "car"
		| "ball"
		| "rocket"
		| "runner"
		| null;
	const [configs, setConfigs] = useState<TapRaceConfig[]>([
		createEmptyConfig(0),
	]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const lastConfigRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (
			animationTypeParam &&
			["car", "ball", "rocket", "runner"].includes(animationTypeParam) &&
			configs.length > 0
		) {
			setConfigs((prev) => {
				const updated = [...prev];
				updated[0] = {
					...updated[0],
					animationType: animationTypeParam,
				};
				return updated;
			});
		}
	}, [animationTypeParam]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const items = useMemo(() => configs.map((c) => c.id), [configs]);

	const onChangeConfig = useCallback((id: string, next: TapRaceConfig) => {
		setConfigs((prev) => prev.map((c) => (c.id === id ? next : c)));
	}, []);

	const addConfig = useCallback(() => {
		const newConfig = createEmptyConfig(configs.length);
		setConfigs((prev) => [...prev, newConfig]);
		setTimeout(() => {
			const element = document.querySelector(
				`[data-config-id="${newConfig.id}"]`,
			);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 100);
	}, [configs.length]);

	const deleteConfig = useCallback((id: string) => {
		setConfigs((prev) => {
			const filtered = prev.filter((c) => c.id !== id);
			return filtered.length > 0 ? filtered : [createEmptyConfig(0)];
		});
	}, []);

	const shuffleConfigs = useCallback(() => {
		setConfigs((prev) => {
			const copy = [...prev];
			for (let i = copy.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[copy[i], copy[j]] = [copy[j], copy[i]];
			}
			return copy;
		});
	}, []);

	const handleImportTemplate = useCallback((template: any) => {
		const newConfig: TapRaceConfig = {
			id: `tap-race-${Date.now()}`,
			animationType: template.animationType || "car",
			duration: 30,
			tapGoal: 100,
			themeColor: "#6366f1",
		};
		setConfigs((prev) => [...prev, newConfig]);
	}, []);

	const footer = useMemo(
		() => (
			<div className="sticky bottom-2 mt-6 flex w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-2 shadow">
				<Button variant="outline" size="sm" onClick={addConfig}>
					Add Round
				</Button>
				<Button variant="outline" size="sm" onClick={shuffleConfigs}>
					Shuffle
				</Button>
				<Button size="sm" className="bg-orange-500 text-white">
					Done
				</Button>
			</div>
		),
		[addConfig, shuffleConfigs],
	);

	const compact = activeId !== null;

	return (
		<div className="mx-auto w-full max-w-5xl">
			{/* Header with Import button */}
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
						Tap Race Builder
					</h1>
					<p className="mt-2 text-sm text-gray-500 dark:text-slate-300">
						Configure multiple tap race rounds for your game.
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
				templates={TAP_RACE_ANIMATIONS}
				gameType="tap-race"
			/>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={(event) => setActiveId(String(event.active.id))}
				onDragEnd={(event) => {
					const { active, over } = event;
					setActiveId(null);
					if (!over || active.id === over.id) return;
					setConfigs((prev) => {
						const oldIndex = prev.findIndex((c) => c.id === String(active.id));
						const newIndex = prev.findIndex((c) => c.id === String(over.id));
						return arrayMove(prev, oldIndex, newIndex);
					});
				}}
				onDragCancel={() => setActiveId(null)}
			>
				<SortableContext items={items} strategy={verticalListSortingStrategy}>
					<div className="flex flex-col gap-6">
						{configs.map((config, idx) => (
							<div key={config.id} data-config-id={config.id}>
								<SortableTapRaceConfig
									config={config}
									index={idx}
									onChange={(next) => onChangeConfig(config.id, next)}
									onDelete={
										configs.length > 1
											? () => deleteConfig(config.id)
											: undefined
									}
									compact={compact}
								/>
							</div>
						))}
					</div>
				</SortableContext>

				<DragOverlay dropAnimation={null}>
					{activeId ? (
						<div className="opacity-50">
							<SortableTapRaceConfig
								config={configs.find((c) => c.id === activeId)!}
								index={configs.findIndex((c) => c.id === activeId)}
								onChange={() => {}}
								compact={true}
							/>
						</div>
					) : null}
				</DragOverlay>
			</DndContext>

			{footer}
		</div>
	);
}
