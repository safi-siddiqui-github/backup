// Shared types for session components
export type Attendee = {
	name: string;
	title: string;
	tag: string;
	status: "pending" | "confirmed";
};

export type SessionColors = {
	border: string;
	bg: string;
	darkBg: string;
	tagBg: string;
	tagText: string;
	darkTagBg: string;
	darkTagText: string;
	progress?: string;
};

export type Session = {
	id: number | string;
	title: string;
	type: string;
	track: string;
	status: string;
	description: string;
	date: string;
	time: string;
	location: string;
	registered: number;
	capacity: number;
	checkedIn: number;
	attendees: Attendee[];
	skillLevel: string;
	speakers: string[];
	tags: string;
	colors: SessionColors;
};
