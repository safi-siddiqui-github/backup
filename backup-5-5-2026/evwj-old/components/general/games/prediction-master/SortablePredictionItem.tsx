"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import PredictionQuestionCard from "./PredictionQuestionCard";
import { PredictionQuestion } from "./PredictionMasterBuilderBoard";

export default function SortablePredictionItem({
	question,
	index,
	onChange,
	onDelete,
	compact,
}: {
	question: PredictionQuestion;
	index: number;
	onChange: (q: PredictionQuestion) => void;
	onDelete?: () => void;
	compact: boolean;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: question.id });
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.85 : 1,
	};
	return (
		<PredictionQuestionCard
			question={question}
			index={index}
			onChange={onChange}
			onDelete={onDelete}
			compact={compact}
			setNodeRef={setNodeRef}
			style={style}
			handleProps={{ ...attributes, ...listeners }}
		/>
	);
}
