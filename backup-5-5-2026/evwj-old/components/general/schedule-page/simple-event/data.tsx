import { ScheduleItem } from "../types";

export const mockScheduleData: { [key: number]: ScheduleItem[] } = {
	1: [
		{
			id: "item-1",
			tag: "Registration",
			title: "Registration & Welcome",
			time: "09:00 - 09:30",
			description: "Guest registration and welcome reception",
			location: "Main Hall",
			notification: "Welcome! Please proceed to registration.",
			color: "purple",
		},
		{
			id: "item-2",
			tag: "Keynote",
			title: "Opening Keynote",
			time: "10:00 - 11:00",
			description: "Opening ceremony and keynote presentation",
			location: "Main Hall",
			notification: "Keynote starting in 5 minutes. Please take your seats.",
			color: "purple",
		},
	],
	2: [],
	3: [],
};
