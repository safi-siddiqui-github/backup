import React from "react";
import type { Tool } from "../types";

export interface StatusBarProps {
	walls: number;
	doors: number;
	windows: number;
	chairs: number;
	tables: number;
	objects: number;
	textElements: number;
	currentTool: Tool;
	scale: number;
	selectedCount: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({
	walls,
	doors,
	windows,
	chairs,
	tables,
	objects,
	textElements,
	currentTool,
	scale,
	selectedCount,
}) => {
	return (
		<div className="bg-muted/50 text-muted-foreground flex h-8 items-center justify-between border-t px-4 text-xs shrink-0">
			<div className="flex items-center gap-4">
				<span>{walls} walls</span>
				<span>{doors} doors</span>
				<span>{windows} windows</span>
				<span>{chairs} chairs</span>
				<span>{tables} tables</span>
				<span>{objects} objects</span>
				<span>{textElements} text labels</span>
			</div>
			<div className="flex items-center gap-4">
				<span>
					Tool: <strong>{currentTool}</strong>
				</span>
				<span>
					Zoom: <strong>{Math.round(scale * 100)}%</strong>
				</span>
				{selectedCount > 0 && (
					<span>
						Selected: <strong>{selectedCount}</strong>
					</span>
				)}
			</div>
		</div>
	);
};

