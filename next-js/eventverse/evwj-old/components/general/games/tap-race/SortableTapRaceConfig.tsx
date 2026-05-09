"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import TapRaceConfigCard from "./TapRaceConfigCard";
import { TapRaceConfig } from "./TapRaceBuilderBoard";

export default function SortableTapRaceConfig({
	config,
	index,
	onChange,
	onDelete,
	compact,
}: {
	config: TapRaceConfig;
	index: number;
	onChange: (config: TapRaceConfig) => void;
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
		<TapRaceConfigCard
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
