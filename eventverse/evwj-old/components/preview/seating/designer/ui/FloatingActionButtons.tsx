import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, Trash2 } from "lucide-react";
import type {
	VenueTable,
	ChairRow,
	Door,
	Window,
	VenueObjectItem,
	TextElement,
} from "../types";

export interface FloatingActionButtonsProps {
	selectedIds: string[];
	isDragging: boolean;
	scale: number;
	position: { x: number; y: number };
	tables: VenueTable[];
	chairRows: ChairRow[];
	doors: Door[];
	windows: Window[];
	objects: VenueObjectItem[];
	textElements: TextElement[];
	containerRef: React.RefObject<HTMLDivElement>;
	stageRef: React.RefObject<any>;
	onOpenTableSettings: (id: string) => void;
	onOpenChairSettings: (id: string) => void;
	onOpenTextSettings: (id: string) => void;
	onDeleteClick: (id: string, type: string) => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
	selectedIds,
	isDragging,
	scale,
	position,
	tables,
	chairRows,
	doors,
	windows,
	objects,
	textElements,
	containerRef,
	stageRef,
	onOpenTableSettings,
	onOpenChairSettings,
	onOpenTextSettings,
	onDeleteClick,
}) => {
	if (isDragging || selectedIds.length !== 1) return null;

	const selectedId = selectedIds[0];
	const selectedTable = tables.find((t) => t.id === selectedId);
	const selectedChairRow = chairRows.find((row) => row.id === selectedId);
	const selectedDoor = doors.find((d) => d.id === selectedId);
	const selectedWindow = windows.find((w) => w.id === selectedId);
	const selectedObject = objects.find((o) => o.id === selectedId);
	const selectedText = textElements.find((txt) => txt.id === selectedId);

	const selectedItem =
		selectedTable ||
		selectedChairRow ||
		selectedDoor ||
		selectedWindow ||
		selectedObject ||
		selectedText;
	if (!selectedItem) return null;

	const stage = stageRef.current;
	const container = containerRef.current;
	if (!stage || !container) return null;

	// Get container bounds
	const containerRect = container.getBoundingClientRect();

	// Calculate position for buttons relative to container
	const buttonX = selectedItem.x * scale + position.x;
	const buttonY = selectedItem.y * scale + position.y - 60;

	// Make sure buttons are visible within container
	const clampedX = Math.max(10, Math.min(buttonX, containerRect.width - 100));
	const clampedY = Math.max(10, buttonY);

	// Determine if item has settings (tables, booths, chair rows, and text)
	const hasSettings = selectedTable || selectedChairRow || selectedText;

	return (
		<div
			className="absolute z-50 flex gap-2 pointer-events-auto"
			style={{
				left: `${clampedX}px`,
				top: `${clampedY}px`,
			}}
		>
			{hasSettings && (
				<Button
					size="sm"
					variant="secondary"
					className="h-9 w-9 p-0 shadow-lg bg-white hover:bg-gray-100"
					onClick={(e) => {
						e.stopPropagation();
						if (selectedTable) {
							onOpenTableSettings(selectedTable.id);
						} else if (selectedChairRow) {
							onOpenChairSettings(selectedChairRow.id);
						} else if (selectedText) {
							onOpenTextSettings(selectedText.id);
						}
					}}
					title="Settings"
				>
					<Settings className="h-4 w-4" />
				</Button>
			)}
			<Button
				size="sm"
				variant="destructive"
				className="h-9 w-9 p-0 shadow-lg"
				onClick={(e) => {
					e.stopPropagation();
					if (selectedTable) {
						onDeleteClick(
							selectedTable.id,
							selectedTable.shape === "booth" ? "booth" : "table"
						);
					} else if (selectedChairRow) {
						onDeleteClick(selectedChairRow.id, "chair-row");
					} else if (selectedDoor) {
						onDeleteClick(selectedDoor.id, "door");
					} else if (selectedWindow) {
						onDeleteClick(selectedWindow.id, "window");
					} else if (selectedObject) {
						onDeleteClick(selectedObject.id, "object");
					} else if (selectedText) {
						onDeleteClick(selectedText.id, "text");
					}
				}}
				title="Delete"
			>
				<Trash2 className="h-4 w-4" />
			</Button>
		</div>
	);
};

