import { ElementType } from "react";
import { MockEventData } from "../type";

export type HomePageProp = {
	heading?: string;
	description?: string;
	event?: Partial<MockEventData>;
	events?: HomePageProp["event"][];
	upcomingFilterType?: "all" | "today" | "week" | "month";
	eventCategoryFilterType?: string;
	filters?:
		| HomePageProp["upcomingFilterType"]
		| HomePageProp["eventCategoryFilterType"];
	sectionType?:
		| "upcoming"
		| "embrace"
		| "family"
		| "following-organizer"
		| "event-category"
		| "recommended"
		| "seasonal"
		| "community"
		| "sports-fitness";
	defaultFilter?: HomePageProp["filters"];
	handleClickProp?: {
		sectionType?: HomePageProp["sectionType"];
		btnFilter?: HomePageProp["filters"];
	};
	handleClick?: (prop: HomePageProp["handleClickProp"]) => void;
	filterButton?: {
		btnText?: string;
		BtnIcon?: ElementType;
		btnFilter?: HomePageProp["filters"];
		handleClick?: HomePageProp["handleClick"];
	};
	filterButtons?: HomePageProp["filterButton"][];
	//
};
