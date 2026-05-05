"use client";

export const tracks = [
	{
		title: "AI & Machine Learning",
		count: 12,
		description:
			"Sessions on modern ML techniques, applied research, and tooling.",
		attendees: 152,
		utilization: 76,
		colors: {
			bg: "bg-white dark:bg-gray-900",
			border: "border-gray-200 dark:border-gray-700",
			text: "text-blue-700 dark:text-blue-300",
			progress: "bg-blue-500",
		},
	},
	{
		title: "Security & Privacy",
		count: 8,
		description:
			"Panels and workshops covering security best practices and privacy design.",
		attendees: 98,
		utilization: 64,
		colors: {
			bg: "bg-white dark:bg-gray-900",
			border: "border-gray-200 dark:border-gray-700",
			text: "text-orange-600 dark:text-orange-300",
			progress: "bg-orange-500",
		},
	},
	{
		title: "Web & UX",
		count: 13,
		description:
			"Talks and workshops about frontend engineering and user experience.",
		attendees: 201,
		utilization: 88,
		colors: {
			bg: "bg-white dark:bg-gray-900",
			border: "border-gray-200 dark:border-gray-700",
			text: "text-indigo-600 dark:text-indigo-300",
			progress: "bg-indigo-500",
		},
	},
];

export const highDemandSessions = [
	{
		title: "Session 4: Workshop on Frontend",
		status: "FULL",
		track: "AI & Machine Learning",
		type: "session",
		time: "10:00 - 11:30 • Room C",
		capacity: "56/33",
		waitlist: "+1 waitlist",
		attendees: ["AJ", "SW", "MC", "ED", "JS", "+51"],
		utilization: 170,
	},
	{
		title: "Morning Track 9: Designing React",
		status: "FULL",
		track: "Security & Privacy",
		type: "workshop",
		time: "09:00 - 10:30 • Auditorium",
		capacity: "43/29",
		waitlist: "",
		attendees: ["AJ", "SW", "MC", "ED", "JS", "+38"],
		utilization: 148,
	},
	{
		title: "Morning Track 6: Understanding Serverless",
		status: "FULL",
		track: "Security & Privacy",
		type: "panel",
		time: "09:00 - 10:30 • Workshop 1",
		capacity: "37/27",
		waitlist: "+10 waitlist",
		attendees: ["AJ", "SW", "MC", "ED", "JS", "+32"],
		utilization: 137,
	},
];

export type Track = (typeof tracks)[number];
export type Session = (typeof highDemandSessions)[number];
