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
import SortablePredictionItem from "./SortablePredictionItem";
import ImportTemplateDialog from "../ImportTemplateDialog";
import { PREDICTION_PACKS } from "../game-data";

export type PredictionQuestion = {
	id: string;
	question: string;
	explanation: string;
	duration: number; // seconds
	options: string[]; // length 4
	correctIndex: number; // 0-3
	selectAnswerLater: boolean; // if true, host selects answer after event
};

function createEmptyQuestion(index: number): PredictionQuestion {
	return {
		id: `${Date.now()}-${index}`,
		question: "",
		explanation: "",
		duration: 15,
		options: ["", "", "", ""],
		correctIndex: 0,
		selectAnswerLater: true,
	};
}

export default function PredictionMasterBuilderBoard() {
	const [questions, setQuestions] = useState<PredictionQuestion[]>([
		createEmptyQuestion(0),
	]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [importDialogOpen, setImportDialogOpen] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	const onChangeQuestion = useCallback(
		(id: string, next: PredictionQuestion) => {
			setQuestions((prev) => prev.map((q) => (q.id === id ? next : q)));
		},
		[],
	);

	const addQuestion = useCallback(() => {
		const newQuestion = createEmptyQuestion(questions.length);
		setQuestions((prev) => [...prev, newQuestion]);
		// Auto-scroll to new question after a short delay
		setTimeout(() => {
			const element = document.querySelector(
				`[data-question-id="${newQuestion.id}"]`,
			);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 100);
	}, [questions.length]);

	const deleteQuestion = useCallback((id: string) => {
		setQuestions((prev) => {
			const filtered = prev.filter((q) => q.id !== id);
			return filtered.length > 0 ? filtered : [createEmptyQuestion(0)];
		});
	}, []);

	const shuffleQuestions = useCallback(() => {
		setQuestions((prev) => {
			const copy = [...prev];
			for (let i = copy.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[copy[i], copy[j]] = [copy[j], copy[i]];
			}
			return copy;
		});
	}, []);

	const handleImportTemplate = (template: any) => {
		// Convert template to PredictionQuestion format
		// This is a placeholder - actual conversion depends on template structure
		const newQuestions: PredictionQuestion[] = [];
		// Add imported questions to existing questions
		setQuestions((prev) => [...prev, ...newQuestions]);
	};

	const items = useMemo(() => questions.map((q) => q.id), [questions]);

	const footer = useMemo(
		() => (
			<div className="sticky bottom-2 mt-6 flex w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white! dark:bg-slate-800/95! backdrop-blur-sm p-2 shadow">
				<Button variant="outline" size="sm" onClick={addQuestion}>
					Add Question
				</Button>
				<Button variant="outline" size="sm" onClick={shuffleQuestions}>
					Shuffle
				</Button>
				<Button size="sm" className="bg-orange-500 text-white">
					Done
				</Button>
			</div>
		),
		[addQuestion, shuffleQuestions],
	);

	const compact = activeId !== null;

	return (
		<div className="mx-auto w-full max-w-5xl">
			{/* Header with Import button */}
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-bold sm:text-2xl">
					Prediction Master Builder
				</h2>
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
				templates={PREDICTION_PACKS}
				gameType="prediction-master"
			/>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={(event) => setActiveId(String(event.active.id))}
				onDragEnd={(event) => {
					const { active, over } = event;
					setActiveId(null);
					if (!over || active.id === over.id) return;
					setQuestions((prev) => {
						const oldIndex = prev.findIndex((q) => q.id === String(active.id));
						const newIndex = prev.findIndex((q) => q.id === String(over.id));
						return arrayMove(prev, oldIndex, newIndex);
					});
				}}
				onDragCancel={() => setActiveId(null)}
			>
				<SortableContext items={items} strategy={verticalListSortingStrategy}>
					<div className="flex flex-col gap-6">
						{questions.map((question, idx) => (
							<div key={question.id} data-question-id={question.id}>
								<SortablePredictionItem
									question={question}
									index={idx}
									compact={compact}
									onChange={(next) => onChangeQuestion(question.id, next)}
									onDelete={
										questions.length > 1
											? () => deleteQuestion(question.id)
											: undefined
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
