export type SessionStatus = "Available" | "Full" | "Almost Full";

export type SessionCardData = {
	id: string;
	title: string;
	type: "keynote" | "workshop" | "panel" | "break" | "session";
	track: string;
	time: string;
	location: string;
	registered: number;
	capacity: number;
	status: SessionStatus;
	speakers?: string[];
	description?: string;
	date?: string;
	colors: {
		border: string;
		bg: string;
		darkBg: string;
		tagBg: string;
		tagText: string;
		darkTagBg: string;
		darkTagText: string;
		progress: string;
	};
};

export type TimeSlot = {
	time: string;
	label: string;
	concurrentSessions: number;
	density: "low" | "high";
	sessions: SessionCardData[];
};
