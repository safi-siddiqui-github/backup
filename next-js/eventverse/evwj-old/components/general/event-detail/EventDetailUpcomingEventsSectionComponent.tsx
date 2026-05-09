"use client";

import {
	getAllEvents,
	getThisMonthEvents,
	getThisWeekEvents,
	getTodayEvents,
} from "@/lib/mock-events";
import { MockEventData } from "@/type";
import { HomePageProp } from "@/types/home";
import { Calendar, Clock } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import HomeFilterSectionOneComponent from "../home/HomeFilterSectionOneComponent";

const eventData = {
	allEvents: getAllEvents(),
	todayEvents: getTodayEvents(),
	weekEvents: getThisWeekEvents(),
	monthEvents: getThisMonthEvents(),
};

type Props = {
	slug?: string;
};

export default function EventDetailUpcomingEventsSectionComponent({
	slug,
}: Props) {
	// Identify the current event and its category
	const currentEvent = useMemo<MockEventData | undefined>(() => {
		if (!slug) return undefined;
		return eventData.allEvents.find((event) => event.slug === slug);
	}, [slug]);

	const normalizedCategory = useMemo(
		() => currentEvent?.category?.trim().toLowerCase() || "",
		[currentEvent],
	);

	// Initial similar events: same category as current, excluding current
	const initialSimilarEvents = useMemo<Partial<MockEventData>[]>(() => {
		if (!normalizedCategory) return eventData.allEvents;
		return eventData.allEvents.filter(
			(event) =>
				(event.category || "").trim().toLowerCase() === normalizedCategory &&
				event.slug !== currentEvent?.slug,
		);
	}, [normalizedCategory, currentEvent?.slug]);

	const [upcomingEvents, setUpcomingEvents] =
		useState<Partial<MockEventData>[]>(initialSimilarEvents);

	// Keep state in sync if slug/category changes
	useEffect(() => {
		setUpcomingEvents(initialSimilarEvents);
	}, [initialSimilarEvents]);

	const handleClickFN = useCallback(
		(prop: HomePageProp["handleClickProp"]) => {
			let eveda: Partial<MockEventData>[] = [];
			switch (prop?.btnFilter) {
				case "today":
					eveda = eventData.todayEvents;
					break;
				case "week":
					eveda = eventData.weekEvents;
					break;
				case "month":
					eveda = eventData.monthEvents;
					break;
				default:
					eveda = eventData.allEvents;
					break;
			}
			// Restrict to events similar to the current one (same category, exclude current)
			if (normalizedCategory) {
				eveda = (eveda as MockEventData[]).filter(
					(event) =>
						(event.category || "").trim().toLowerCase() ===
							normalizedCategory && event.slug !== currentEvent?.slug,
				);
			}

			setUpcomingEvents(eveda);
		},
		[currentEvent?.slug, normalizedCategory],
	);

	const upcomingFilters = useMemo<HomePageProp["filterButtons"]>(
		() => [
			{
				btnText: "All Events",
				BtnIcon: Calendar,
				btnFilter: "all",
				handleClick: handleClickFN,
			},
			{
				btnText: "Today",
				BtnIcon: Clock,
				btnFilter: "today",
				handleClick: handleClickFN,
			},
			{
				btnText: "This Week",
				BtnIcon: Clock,
				btnFilter: "week",
				handleClick: handleClickFN,
			},
			{
				btnText: "This Month",
				BtnIcon: Clock,
				btnFilter: "month",
				handleClick: handleClickFN,
			},
		],
		[handleClickFN],
	);

	return (
		<div className="flex flex-col gap-5">
			<HomeFilterSectionOneComponent
				heading="Similar events you may like"
				sectionType="upcoming"
				events={upcomingEvents}
				filterButtons={upcomingFilters}
				defaultFilter="all"
			/>
		</div>
	);
}
