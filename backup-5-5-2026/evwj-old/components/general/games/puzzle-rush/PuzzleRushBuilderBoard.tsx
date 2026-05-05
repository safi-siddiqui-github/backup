"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PUZZLE_TEMPLATES } from "@/components/general/games/game-data";
import PuzzleRushRoundCard from "./PuzzleRushRoundCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ImportTemplateDialog from "../ImportTemplateDialog";

export type PuzzleRushRound = {
	id: string;
	imageUrl: string;
	imageSource: "template" | "upload" | "url";
	duration: number; // seconds
	title?: string;
	showPreview: boolean;
};

function createEmptyRound(index: number): PuzzleRushRound {
	return {
		id: `${Date.now()}-${index}`,
		imageUrl: "",
		imageSource: "url",
		duration: 30,
		title: "",
		showPreview: true,
	};
}

export default function PuzzleRushBuilderBoard() {
	const searchParams = useSearchParams();
	const templateId = searchParams.get("template");

	const selectedTemplate = templateId
		? PUZZLE_TEMPLATES.find((t) => t.id === templateId)
		: null;

	const initialRound: PuzzleRushRound = selectedTemplate
		? {
				id: `${Date.now()}-0`,
				imageUrl: selectedTemplate.imageUrl,
				imageSource: "template",
				duration: 30,
				title: selectedTemplate.title,
				showPreview: true,
			}
		: createEmptyRound(0);

	const [rounds, setRounds] = useState<PuzzleRushRound[]>([initialRound]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [importDialogOpen, setImportDialogOpen] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	const onChangeRound = useCallback((id: string, next: PuzzleRushRound) => {
		setRounds((prev) => prev.map((r) => (r.id === id ? next : r)));
	}, []);

	const deleteRound = useCallback((id: string) => {
		setRounds((prev) => prev.filter((r) => r.id !== id));
	}, []);

	const addRound = useCallback(
		() => setRounds((prev) => [...prev, createEmptyRound(prev.length)]),
		[],
	);

	const shuffleRounds = useCallback(
		() =>
			setRounds((prev) => {
				const copy = [...prev];
				for (let i = copy.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[copy[i], copy[j]] = [copy[j], copy[i]];
				}
				return copy;
			}),
		[],
	);

	const handleImportTemplate = (template: any) => {
		// Convert template to PuzzleRushRound format
		const newRound: PuzzleRushRound = {
			id: `${Date.now()}-${rounds.length}`,
			imageUrl: template.imageUrl || "",
			imageSource: "template",
			duration: 30,
			title: template.title,
			showPreview: true,
		};
		setRounds((prev) => [...prev, newRound]);
	};

	const items = useMemo(() => rounds.map((r) => r.id), [rounds]);

	const footer = useMemo(
		() => (
			<div className="sticky bottom-2 mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-2 shadow">
				<Button variant="outline" size="sm" onClick={addRound}>
					Add Round
				</Button>
				<Button variant="outline" size="sm" onClick={shuffleRounds}>
					Shuffle
				</Button>
				<Button variant="outline" size="sm">
					Save Draft
				</Button>
				<Button size="sm" className="bg-indigo-600 text-white">
					Done
				</Button>
			</div>
		),
		[],
	);

	const compact = activeId !== null;

	return (
		<div className="mx-auto w-full max-w-5xl">
			<Card className="mb-4 rounded-xl border bg-white p-6 shadow-lg md:p-8">
				<div className="mb-2 flex items-start justify-between">
					<div>
						<h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
							Configure Puzzle Rush
						</h1>
						<p className="mt-2 text-sm text-gray-500">
							Build a sequence of timed 2×2 puzzles. Drag to reorder rounds, set
							durations, and add titles.
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
			</Card>

			<ImportTemplateDialog
				open={importDialogOpen}
				onClose={() => setImportDialogOpen(false)}
				onImport={handleImportTemplate}
				templates={PUZZLE_TEMPLATES}
				gameType="puzzle-rush"
			/>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={(event) => setActiveId(String(event.active.id))}
				onDragEnd={(event) => {
					const { active, over } = event;
					setActiveId(null);
					if (!over || active.id === over.id) return;
					setRounds((prev) => {
						const oldIndex = prev.findIndex((r) => r.id === String(active.id));
						const newIndex = prev.findIndex((r) => r.id === String(over.id));
						return arrayMove(prev, oldIndex, newIndex);
					});
				}}
				onDragCancel={() => setActiveId(null)}
			>
				<SortableContext items={items} strategy={verticalListSortingStrategy}>
					<div className="flex flex-col gap-6">
						{rounds.map((round, idx) => (
							<SortableItem key={round.id} id={round.id}>
								{(dnd) => (
									<PuzzleRushRoundCard
										round={round}
										index={idx}
										compact={compact}
										onChange={(next) => onChangeRound(round.id, next)}
										setNodeRef={dnd.setNodeRef}
										style={dnd.style}
										handleProps={dnd.handleProps}
										onDelete={() => deleteRound(round.id)}
									/>
								)}
							</SortableItem>
						))}
					</div>
				</SortableContext>

				<DragOverlay dropAnimation={null}>
					{activeId ? (
						<Card className="rounded-xl border bg-white p-4 shadow-lg md:p-6">
							<div className="flex items-center gap-3">
								<span className="text-gray-400">⋮⋮</span>
								<h2 className="text-lg font-bold">Reordering…</h2>
							</div>
						</Card>
					) : null}
				</DragOverlay>
			</DndContext>

			{footer}
		</div>
	);
}

// Minimal wrapper to avoid a separate file, matching dnd-kit usage pattern

function SortableItem({
	id,
	children,
}: {
	id: string;
	children: (args: {
		setNodeRef: (node: HTMLElement | null) => void;
		style: React.CSSProperties;
		handleProps: React.HTMLAttributes<HTMLSpanElement>;
	}) => React.ReactNode;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.85 : 1,
	};
	return (
		<div ref={setNodeRef} style={style} data-id={id}>
			{children({
				setNodeRef,
				style,
				handleProps: { ...attributes, ...listeners },
			})}
		</div>
	);
}
