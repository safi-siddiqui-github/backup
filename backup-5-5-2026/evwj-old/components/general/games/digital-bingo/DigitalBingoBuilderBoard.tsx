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
import { BINGO_TEMPLATES } from "../game-data";
import SortableDigitalBingoConfig from "./SortableDigitalBingoConfig";

export type DigitalBingoConfig = {
	id: string;
	cardSize: "5x5" | "4x4" | "3x3";
	customWords: string[];
	pattern: string;
	maxCardsPerGuest: number;
	winnerAnnouncement: boolean;
	allowMultipleWinners: boolean;
	timeLimit?: number;
};

function createEmptyConfig(index: number): DigitalBingoConfig {
	return {
		id: `digital-bingo-${Date.now()}-${index}`,
		cardSize: "5x5",
		customWords: [],
		pattern: "line",
		maxCardsPerGuest: 3,
		winnerAnnouncement: true,
		allowMultipleWinners: true,
	};
}

export default function DigitalBingoBuilderBoard() {
	const searchParams = useSearchParams();
	const templateId = searchParams.get("template");
	const [configs, setConfigs] = useState<DigitalBingoConfig[]>([
		createEmptyConfig(0),
	]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const lastConfigRef = useRef<HTMLDivElement | null>(null);

	const selectedTemplate = templateId
		? BINGO_TEMPLATES.find((t) => t.id === templateId)
		: null;

	useEffect(() => {
		if (selectedTemplate && configs.length > 0) {
			setConfigs((prev) => {
				const updated = [...prev];
				updated[0] = {
					...updated[0],
					cardSize: selectedTemplate.cardSize,
					pattern: "line",
				};
				return updated;
			});
		}
	}, [selectedTemplate]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const items = useMemo(() => configs.map((c) => c.id), [configs]);

	const onChangeConfig = useCallback((id: string, next: DigitalBingoConfig) => {
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
		const newConfig: DigitalBingoConfig = {
			id: `digital-bingo-${Date.now()}`,
			cardSize: template.cardSize || "5x5",
			customWords: [],
			pattern: "line",
			maxCardsPerGuest: 3,
			winnerAnnouncement: true,
			allowMultipleWinners: true,
		};
		setConfigs((prev) => [...prev, newConfig]);
	}, []);

	const footer = useMemo(
		() => (
			<div className="sticky bottom-2 mt-6 flex w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-2 shadow">
				<Button variant="outline" size="sm" onClick={addConfig}>
					Add Card Configuration
				</Button>
				<Button variant="outline" size="sm" onClick={shuffleConfigs}>
					Shuffle
				</Button>
				<Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
					Done
				</Button>
			</div>
		),
		[addConfig, shuffleConfigs],
	);

	const compact = activeId !== null;

	return (
		<div className="mx-auto w-full max-w-6xl">
			{/* Header with Import button */}
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
						Digital Bingo Builder
					</h1>
					<p className="mt-2 text-sm text-gray-500 dark:text-slate-300">
						Configure multiple bingo card configurations for your game.
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
				templates={BINGO_TEMPLATES}
				gameType="digital-bingo"
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
								<SortableDigitalBingoConfig
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
							<SortableDigitalBingoConfig
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
