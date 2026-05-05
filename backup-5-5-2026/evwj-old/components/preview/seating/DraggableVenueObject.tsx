import type { VenueObject } from "@/types/venue";
import { Settings, Trash2 } from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";

interface DraggableVenueObjectProps {
	venueObject: VenueObject;
	isSelected: boolean;
	onUpdate: (updates: Partial<VenueObject>) => void;
	onSelect: () => void;
	onDelete: () => void;
	onConfigure: () => void;
	viewMode: "design" | "preview";
}

const DraggableVenueObject = ({
	venueObject,
	isSelected,
	onUpdate,
	onSelect,
	onDelete,
	onConfigure,
	viewMode,
}: DraggableVenueObjectProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (viewMode !== "design") return;

			e.stopPropagation();
			onSelect();

			if ((e.target as HTMLElement).classList.contains("resize-handle")) {
				setIsResizing(true);
			} else {
				setIsDragging(true);
				setDragStart({
					x: e.clientX - venueObject.x,
					y: e.clientY - venueObject.y,
				});
			}
		},
		[viewMode, onSelect, venueObject.x, venueObject.y],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isDragging) {
				const newX = e.clientX - dragStart.x;
				const newY = e.clientY - dragStart.y;
				onUpdate({ x: Math.max(0, newX), y: Math.max(0, newY) });
			} else if (isResizing) {
				const deltaX = e.clientX - dragStart.x;
				const deltaY = e.clientY - dragStart.y;
				onUpdate({
					width: Math.max(50, venueObject.width + deltaX),
					height: Math.max(30, venueObject.height + deltaY),
				});
			}
		},
		[isDragging, isResizing, dragStart.x, dragStart.y, onUpdate, venueObject.width, venueObject.height],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		setIsResizing(false);
	}, []);

	React.useEffect(() => {
		if (isDragging || isResizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

	const getIcon = useMemo(() => {
		switch (venueObject.type) {
			case "stage":
				return "🎭";
			case "podium":
				return "🎤";
			case "exit":
				return "🚪";
			case "dancefloor":
				return "💃";
			case "tent":
				return "⛺";
			case "booth":
				return "🏪";
			default:
				return "📦";
		}
	}, [venueObject.type]);

	const isTentOrBooth =
		venueObject.type === "tent" || venueObject.type === "booth";
	const hasVendorAssigned = venueObject.assignedVendor;

	return (
		<div
			className={`absolute select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
			style={{
				left: venueObject.x,
				top: venueObject.y,
				width: venueObject.width,
				height: venueObject.height,
				transform: `rotate(${venueObject.rotation || 0}deg)`,
				transformOrigin: "center center",
			}}
			onMouseDown={handleMouseDown}
		>
			<div
				className={`h-full w-full rounded-lg border-2 shadow-sm transition-all hover:shadow-md ${
					isSelected
						? "border-blue-500 ring-2 ring-blue-200"
						: isTentOrBooth && !hasVendorAssigned
							? "border-dashed border-orange-300"
							: "border-gray-300"
				} ${isTentOrBooth && !hasVendorAssigned ? "bg-orange-50" : ""}`}
				style={{
					backgroundColor:
						isTentOrBooth && !hasVendorAssigned
							? undefined
							: venueObject.color || "#8B5CF6",
				}}
			>
				<div
					className={`flex h-full w-full flex-col items-center justify-center p-2 ${isTentOrBooth && !hasVendorAssigned ? "text-gray-600" : "text-white"}`}
				>
					<div className="text-2xl">{getIcon}</div>
					<div className="text-center text-xs font-medium">
						{venueObject.name}
					</div>

					{/* Vendor assignment indicator */}
					{isTentOrBooth && hasVendorAssigned && (
						<div className="absolute right-0 bottom-0 left-0 truncate bg-black/70 px-1 py-0.5 text-center text-[10px] text-white">
							{venueObject?.assignedVendor?.vendorBusinessName}
						</div>
					)}

					{isTentOrBooth && !hasVendorAssigned && (
						<div className="absolute right-0 bottom-0 left-0 bg-gray-200 px-1 py-0.5 text-center text-[10px] text-gray-600">
							Unassigned
						</div>
					)}
				</div>
			</div>

			{/* Resize handle */}
			{viewMode === "design" && isSelected && (
				<div
					className="resize-handle absolute h-3 w-3 cursor-se-resize rounded-full border border-white bg-blue-500"
					style={{
						right: -6,
						bottom: -6,
					}}
				/>
			)}

			{viewMode === "design" && isSelected && (
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
							onDelete();
						}}
						className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white transition-colors hover:bg-red-600"
						title="Delete"
					>
						<Trash2 className="h-3 w-3" />
					</button>
				</div>
			)}
		</div>
	);
};

export default React.memo(DraggableVenueObject);
