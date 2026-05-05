import type { Chair as ChairType } from "@/types/venue";
import { Grid3X3, Settings, Trash2 } from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";
import { GuestAvatar, getAvatarColor } from "./GuestAvatar";

interface DraggableChairProps {
	chair: ChairType;
	isSelected: boolean;
	onUpdate: (updates: Partial<ChairType>) => void;
	onSelect: () => void;
	onDelete: () => void;
	onConfigure: () => void;
	onAssign: () => void;
	onDeleteGrid?: () => void;
	onUpdateGrid?: (gridId: string, updates: Partial<ChairType>) => void;
	gridChairs?: ChairType[];
	viewMode: "design" | "preview";
	isGridSelected?: boolean;
	onSelectGrid?: () => void;
}

const DraggableChair = ({
	chair,
	isSelected,
	onUpdate,
	onSelect,
	onDelete,
	onConfigure,
	onAssign,
	onDeleteGrid,
	onUpdateGrid,
	gridChairs = [],
	viewMode,
	isGridSelected = false,
	onSelectGrid,
}: DraggableChairProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [initialPositions, setInitialPositions] = useState<{
		[id: number]: { x: number; y: number };
	}>({});

	const isPartOfGrid = chair.gridId && gridChairs.length > 1;
	const gridSize = gridChairs.length;

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (viewMode !== "design") return;

			e.stopPropagation();

			// If this chair is part of a grid, select the entire grid
			if (isPartOfGrid && onSelectGrid) {
				onSelectGrid();
			} else {
				onSelect();
			}

			setIsDragging(true);
			setDragStart({
				x: e.clientX - chair.x,
				y: e.clientY - chair.y,
			});

			// Store initial positions for all chairs that will be moved
			if (isPartOfGrid) {
				const positions: { [id: number]: { x: number; y: number } } = {};
				gridChairs.forEach((gridChair) => {
					positions[gridChair.id] = { x: gridChair.x, y: gridChair.y };
				});
				setInitialPositions(positions);
			}
		},
		[viewMode, isPartOfGrid, onSelectGrid, onSelect, chair.x, chair.y, gridChairs],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isDragging) {
				const newX = e.clientX - dragStart.x;
				const newY = e.clientY - dragStart.y;

				if (isPartOfGrid) {
					// Calculate the delta movement from this chair's original position
					const deltaX = newX - chair.x;
					const deltaY = newY - chair.y;

					// Update all chairs in the grid by applying the same delta
					gridChairs.forEach((gridChair) => {
						const initialPos = initialPositions[gridChair.id];
						if (initialPos) {
							const newGridX = Math.max(0, initialPos.x + deltaX);
							const newGridY = Math.max(0, initialPos.y + deltaY);

							// Update each chair individually using the onUpdate function
							onUpdate({
								x: newGridX,
								y: newGridY,
								gridId: chair.gridId, // Ensure gridId is maintained
							});
						}
					});
				} else {
					// Individual chair movement
					onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
				}
			}
		},
		[isDragging, dragStart.x, dragStart.y, isPartOfGrid, chair.x, chair.y, chair.gridId, gridChairs, initialPositions, onUpdate],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		setInitialPositions({});
	}, []);

	React.useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp]);

	return (
		<div
			className={`absolute select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
			style={{
				left: chair.x,
				top: chair.y,
				transform: `rotate(${chair.rotation || 0}deg)`,
				transformOrigin: "center center",
			}}
			onMouseDown={handleMouseDown}
		>
			{/* Grid highlight background for all chairs in selected grid */}
			{isPartOfGrid && isGridSelected && (
				<div className="absolute inset-0 -z-10 scale-125 transform rounded-lg bg-blue-100 opacity-40" />
			)}

			{/* Grid connection lines - show when grid is selected */}
			{isPartOfGrid && isGridSelected && (
				<div className="absolute inset-0 -z-5 scale-110 transform rounded-lg border-2 border-dashed border-blue-300 opacity-60" />
			)}

			<div
				className={`h-10 w-10 rounded-lg border-2 bg-gray-100 shadow-sm transition-all hover:shadow-md ${
					isSelected || isGridSelected
						? "border-blue-500 ring-2 ring-blue-200"
						: "border-gray-300"
				} ${isPartOfGrid ? "border-dashed" : ""}`}
			>
				<div className="flex h-full w-full items-center justify-center">
					<div className="text-xs font-medium text-gray-800">🪑</div>
				</div>
			</div>

			{chair.guest && (
				<div
					className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 transform"
					title={chair.guest.name}
				>
					<GuestAvatar
						name={chair.guest.name}
						initials={chair.guest.initials}
						avatarColor={getAvatarColor(chair.guest.id)}
						size="sm"
						showStatus={true}
						status="assigned"
					/>
				</div>
			)}

			{/* Enhanced grid indicator */}
			{isPartOfGrid && (
				<div className="absolute -right-3 -bottom-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white shadow-md">
					{gridSize}
				</div>
			)}

			{/* Grid size badge */}
			{isPartOfGrid && isGridSelected && (
				<div className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-blue-500 px-2 py-1 text-xs whitespace-nowrap text-white">
					Grid {gridSize} chairs
				</div>
			)}

			{viewMode === "design" && (isSelected || isGridSelected) && (
				<div className="absolute -top-8 left-0 flex gap-1">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onConfigure();
						}}
						className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-white transition-colors hover:bg-blue-600"
						title="Configure"
					>
						<Settings className="h-3 w-3" />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onAssign();
						}}
						className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-white transition-colors hover:bg-green-600"
						title="Assign Guest"
					>
						👤
					</button>
					{isPartOfGrid && onDeleteGrid && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDeleteGrid();
							}}
							className="flex h-6 w-6 items-center justify-center rounded bg-purple-500 text-white transition-colors hover:bg-purple-600"
							title={`Delete Grid (${gridSize} chairs)`}
						>
							<Grid3X3 className="h-3 w-3" />
						</button>
					)}
					<button
						onClick={(e) => {
							e.stopPropagation();
							onDelete();
						}}
						className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white transition-colors hover:bg-red-600"
						title={isPartOfGrid ? "Delete Single Chair" : "Delete"}
					>
						<Trash2 className="h-3 w-3" />
					</button>
				</div>
			)}
		</div>
	);
};

export default React.memo(DraggableChair);
