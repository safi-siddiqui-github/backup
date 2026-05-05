"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import BattleOfOpinionsQuestionCard from "./BattleOfOpinionsQuestionCard";
import { BattleOfOpinionsQuestion } from "./BattleOfOpinionsBuilderBoard";

export default function SortableBattleOfOpinionsItem({
	question,
	index,
	onChange,
	onDelete,
	compact,
}: {
	question: BattleOfOpinionsQuestion;
	index: number;
	onChange: (q: BattleOfOpinionsQuestion) => void;
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
		<BattleOfOpinionsQuestionCard
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
