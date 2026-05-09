export type LayoutType =
	| "banquet-hall"
	| "conference-room"
	| "theater"
	| "classroom"
	| "default";

export const buildingLayouts = {
	"banquet-hall": {
		name: "Banquet Hall",
		description: "Large open space with stage area",
		features: ["stage", "main-entrance", "side-doors"],
		defaultCapacity: 200,
	},
	"conference-room": {
		name: "Conference Room",
		description: "Professional meeting space with windows",
		features: ["windows", "side-door"],
		defaultCapacity: 50,
	},
	theater: {
		name: "Theater Style",
		description: "Auditorium layout with stage and aisles",
		features: ["stage", "aisles", "rear-entrance"],
		defaultCapacity: 300,
	},
	classroom: {
		name: "Classroom",
		description: "Educational space with front board",
		features: ["board", "door"],
		defaultCapacity: 40,
	},
	default: {
		name: "General Purpose",
		description: "Flexible multipurpose space",
		features: ["entrance"],
		defaultCapacity: 100,
	},
} as const;

export const inferLayoutType = (
	arrangementName: string,
	venueType?: string,
): LayoutType => {
	const name = arrangementName.toLowerCase();

	if (
		name.includes("banquet") ||
		name.includes("gala") ||
		name.includes("reception")
	) {
		return "banquet-hall";
	}
	if (
		name.includes("conference") ||
		name.includes("meeting") ||
		name.includes("board")
	) {
		return "conference-room";
	}
	if (
		name.includes("theater") ||
		name.includes("auditorium") ||
		name.includes("stage")
	) {
		return "theater";
	}
	if (
		name.includes("classroom") ||
		name.includes("training") ||
		name.includes("workshop")
	) {
		return "classroom";
	}

	return "default";
};
