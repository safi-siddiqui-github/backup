export type DayCard = {
	id: number;
	title: string;
	date: string;
	items: number;
	duration: string;
	color: "purple" | "orange" | "green" | string;
};

export type ScheduleItem = {
	id: string;
	tag: string;
	title: string;
	time: string;
	description: string;
	location: string;
	notification: string | null;
	color: "purple" | "orange" | "green" | string;
};
