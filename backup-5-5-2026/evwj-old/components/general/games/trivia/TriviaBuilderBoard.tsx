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
import { useMemo, useRef, useState, useCallback } from "react";
import SortableRoundItem from "./SortableRoundItem";
import ImportTemplateDialog from "../ImportTemplateDialog";
import { TRIVIA_PACKS } from "../game-data";

export type TriviaRound = {
	id: string;
	question: string;
	explanation: string;
	duration: number;
	options: string[]; // length 4
	correctIndex: number;
};

function createEmptyRound(index: number): TriviaRound {
	return {
		id: `${Date.now()}-${index}`,
		question: "",
		explanation: "",
		duration: 15,
		options: ["", "", "", ""],
		correctIndex: 0,
	};
}

export default function TriviaBuilderBoard() {
	const [rounds, setRounds] = useState<TriviaRound[]>([createEmptyRound(0)]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const lastRoundRef = useRef<HTMLDivElement | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	const onChangeRound = useCallback((id: string, next: TriviaRound) => {
		setRounds((prev) => prev.map((r) => (r.id === id ? next : r)));
	}, []);

	const addRound = useCallback(() => {
		const newRound = createEmptyRound(rounds.length);
		setRounds((prev) => [...prev, newRound]);
		// Auto-scroll to new round after a short delay
		setTimeout(() => {
			const element = document.querySelector(
				`[data-round-id="${newRound.id}"]`,
			);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 100);
	}, [rounds.length]);

	const deleteRound = useCallback((id: string) => {
		setRounds((prev) => {
			const filtered = prev.filter((r) => r.id !== id);
			return filtered.length > 0 ? filtered : [createEmptyRound(0)];
		});
	}, []);

	const shuffleRounds = useCallback(() => {
		setRounds((prev) => {
			const copy = [...prev];
			for (let i = copy.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[copy[i], copy[j]] = [copy[j], copy[i]];
			}
			return copy;
		});
	}, []);

	const handleImportTemplate = (template: any) => {
		// Convert template to TriviaRound format
		// This is a placeholder - actual conversion depends on template structure
		const newRounds: TriviaRound[] = [];
		// Add imported rounds to existing rounds
		setRounds((prev) => [...prev, ...newRounds]);
	};

	const items = useMemo(() => rounds.map((r) => r.id), [rounds]);

	const footer = useMemo(
		() => (
			<div className="sticky bottom-2 mt-6 flex w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-2 shadow">
				<Button variant="outline" size="sm" onClick={addRound}>
					Add Round
				</Button>
				<Button variant="outline" size="sm" onClick={shuffleRounds}>
					Shuffle
				</Button>
				<Button size="sm" className="bg-orange-500 text-white">
					Done
				</Button>
			</div>
		),
		[addRound, shuffleRounds],
	);

	const compact = activeId !== null;

	return (
		<div className="mx-auto w-full max-w-5xl">
			{/* Header with Import button */}
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-bold sm:text-2xl">Trivia Builder</h2>
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
				templates={TRIVIA_PACKS}
				gameType="trivia"
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
							<div key={round.id} data-round-id={round.id}>
								<SortableRoundItem
									round={round}
									index={idx}
									compact={compact}
									onChange={(next) => onChangeRound(round.id, next)}
									onDelete={
										rounds.length > 1 ? () => deleteRound(round.id) : undefined
									}
								/>
							</div>
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
