import type { TableGroup, WallType } from "../types";

// Wall configuration
export const WALL_THICKNESS: Record<WallType, number> = {
	exterior: 12,
	interior: 8,
	glass: 6,
};

export const WALL_COLORS: Record<WallType, string> = {
	exterior: "#1f2937",
	interior: "#6b7280",
	glass: "#93c5fd",
};

// Object types for venue
export const OBJECT_TYPES = [
	{ type: "stage", name: "Stage", color: "#8b5cf6", icon: "square" },
	{ type: "dj-booth", name: "DJ Booth", color: "#ec4899", icon: "square" },
	{ type: "bar", name: "Bar", color: "#f59e0b", icon: "square" },
	{
		type: "buffet",
		name: "Buffet Table",
		color: "#10b981",
		icon: "square",
	},
	{
		type: "photo-booth",
		name: "Photo Booth",
		color: "#06b6d4",
		icon: "square",
	},
	{ type: "speaker", name: "Speaker", color: "#6366f1", icon: "circle" },
	{ type: "lighting", name: "Lighting", color: "#eab308", icon: "circle" },
	{
		type: "decoration",
		name: "Plant/Decoration",
		color: "#22c55e",
		icon: "circle",
	},
];

// Table groups for assignment
export const TABLE_GROUPS: TableGroup[] = [
	{ id: "vip", name: "VIP", color: "#a855f7" },
	{ id: "family", name: "Family", color: "#22c55e" },
	{ id: "friends", name: "Friends", color: "#3b82f6" },
	{ id: "business", name: "Business", color: "#f97316" },
	{ id: "general", name: "General", color: "#eab308" },
];

// Default configurations
export const DEFAULT_TABLE_CONFIG = {
	shape: "round" as const,
	seats: 8,
	width: 100,
	height: 100,
};

export const DEFAULT_CHAIR_ROW_CONFIG = {
	spacing: 50,
	count: 5,
	curved: false,
};

export const DEFAULT_TEXT_CONFIG = {
	fontSize: 24,
	fontFamily: "Arial",
	fill: "#000000",
	fontStyle: "normal",
	align: "left",
};

// Grid settings
export const DEFAULT_GRID_SIZE = 20;
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 3;
export const ZOOM_SPEED = 0.1;

// Canvas settings
export const DEFAULT_CANVAS_WIDTH = 1200;
export const DEFAULT_CANVAS_HEIGHT = 800;

