// Designer Types
export type Tool =
	| "select"
	| "pan"
	| "wall"
	| "door"
	| "window"
	| "table"
	| "chair-row"
	| "chair-single"
	| "object"
	| "booth"
	| "text"
	| "draw";

export type WallType = "exterior" | "interior" | "glass";

export interface VenueTable {
	id: string;
	name: string;
	seats: number;
	shape: "round" | "rectangular" | "square" | "booth";
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	color: string;
	chairPositions?: Array<{
		x: number;
		y: number;
		rotation: number;
	}>;
	group?: string;
}

export interface ChairRow {
	id: string;
	name?: string;
	x: number;
	y: number;
	chairs: Array<{
		id: string;
		offsetX: number;
		offsetY: number;
		rotation: number;
	}>;
	spacing: number;
	curved: boolean;
	rotation: number;
	group?: string;
}

export interface Door {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	group?: string;
}

export interface Window {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	group?: string;
}

export interface VenueObjectItem {
	id: string;
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	color: string;
	group?: string;
}

export interface Wall {
	id: string;
	type: WallType;
	points: number[];
	thickness: number;
	color: string;
	group?: string;
}

export interface TextElement {
	id: string;
	text: string;
	x: number;
	y: number;
	fontSize: number;
	fontFamily: string;
	fill: string;
	fontStyle?: string;
	align?: string;
	rotation: number;
	group?: string;
}

export interface TableGroup {
	id: string;
	name: string;
	color: string;
}

export interface TableConfig {
	shape: "round" | "rectangular" | "square";
	seats: number;
	width: number;
	height: number;
}

export interface ChairRowConfig {
	spacing: number;
	count: number;
	curved: boolean;
}

export interface TextConfig {
	fontSize: number;
	fontFamily: string;
	fill: string;
	fontStyle: string;
	align: string;
}

