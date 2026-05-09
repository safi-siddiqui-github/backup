"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { LayoutData } from "@/types/venue";

// Dynamically import KonvaVenueDesigner to avoid SSR issues with canvas
const KonvaVenueDesigner = dynamic(() => import("./KonvaVenueDesigner"), {
	ssr: false,
	loading: () => (
		<div className="flex min-h-96 w-full items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
				<p className="text-muted-foreground text-sm">Loading Venue Designer...</p>
			</div>
		</div>
	),
});

interface RoomLayoutDesignerProps {
	onSave?: (layout: LayoutData) => void;
	onExport?: () => void;
	onUseAsBackground?: (layout: LayoutData) => void;
	initialLayout?: LayoutData;
	viewMode?: "design" | "preview";
	ticketMode?: boolean;
}

/**
 * RoomLayoutDesigner - Professional venue floor plan designer
 * 
 * Features:
 * - Draw walls (exterior, interior, glass)
 * - Add doors and windows
 * - Create chair rows by dragging (with rotation and multiple rows)
 * - Place tables (round, rectangular, square, oval)
 * - Add venue objects (stage, podium, bar, booth, etc.)
 * - Snap to grid
 * - Undo/Redo
 * - Export to PNG
 * 
 * Built with Konva.js for high-performance canvas rendering
 */
const RoomLayoutDesigner: React.FC<RoomLayoutDesignerProps> = ({
	onSave,
	onExport,
	onUseAsBackground,
	initialLayout,
	viewMode = "design",
	ticketMode = false,
}) => {
	const handleSave = (layout: LayoutData) => {
		onSave?.(layout);
		onUseAsBackground?.(layout);
	};

	if (viewMode === "preview") {
		return (
			<div className="h-full w-full">
				<KonvaVenueDesigner
					onSave={handleSave}
					onExport={onExport}
					initialLayout={initialLayout}
					ticketMode={ticketMode}
				/>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen w-full flex-col">
			<KonvaVenueDesigner
				onSave={handleSave}
				onExport={onExport}
				initialLayout={initialLayout}
				ticketMode={ticketMode}
			/>
		</div>
	);
};

export default RoomLayoutDesigner;
