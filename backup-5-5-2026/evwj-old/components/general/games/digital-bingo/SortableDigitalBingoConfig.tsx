"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import DigitalBingoConfigCard from "./DigitalBingoConfigCard";
import { DigitalBingoConfig } from "./DigitalBingoBuilderBoard";

export default function SortableDigitalBingoConfig({
	config,
	index,
	onChange,
	onDelete,
	compact,
}: {
	config: DigitalBingoConfig;
	index: number;
	onChange: (config: DigitalBingoConfig) => void;
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
		<DigitalBingoConfigCard
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
