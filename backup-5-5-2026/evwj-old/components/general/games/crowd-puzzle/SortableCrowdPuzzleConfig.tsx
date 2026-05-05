"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import CrowdPuzzleConfigCard from "./CrowdPuzzleConfigCard";
import { CrowdPuzzleConfig } from "./CrowdPuzzleBuilderBoard";

export default function SortableCrowdPuzzleConfig({
	config,
	index,
	onChange,
	onDelete,
	compact,
}: {
	config: CrowdPuzzleConfig;
	index: number;
	onChange: (config: CrowdPuzzleConfig) => void;
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
	} = useSortable({ id: config.id });
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.85 : 1,
	};
	return (
		<CrowdPuzzleConfigCard
			config={config}
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
