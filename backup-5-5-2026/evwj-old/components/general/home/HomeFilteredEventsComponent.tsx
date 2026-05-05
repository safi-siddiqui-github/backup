"use client";

import {
	getAllEvents,
	getCommunityEvents,
	getEventCategories,
	getEventsByCategory,
	getRecommendedEvents,
	getSeasonalEvents,
	getSportsFitnessEvents,
	getThisMonthEvents,
	getThisWeekEvents,
	getTodayEvents,
	parseEventDate,
} from "@/lib/mock-events";
import { MockEventData } from "@/type";
import { HomePageProp } from "@/types/home";
import { Box, Calendar, Clock } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import HomeFilterSectionOneComponent from "./HomeFilterSectionOneComponent";
import HomeFilterSectionTwoComponent from "./HomeFilterSectionTwoComponent";

const eventData = {
	allEvents: getAllEvents(),
	todayEvents: getTodayEvents(),
	weekEvents: getThisWeekEvents(),
	monthEvents: getThisMonthEvents(),
	recommendedEvents: getRecommendedEvents(),
	seasonalEvents: getSeasonalEvents(28),
	communityEvents: getCommunityEvents(),
	sportsFitnessEvents: getSportsFitnessEvents(),
};

const eventCategoryData = {
	categories: getEventCategories(),
};

export default function HomeFilteredEventsComponent() {
	const [upcomingEvents, setUpcomingEvents] = useState<
		Partial<MockEventData>[]
	>(eventData?.allEvents);
	const [embraceEvents, setEmbraceEvents] = useState<Partial<MockEventData>[]>(
		eventData?.allEvents,
	);
	const [familyEvents, setFamilyEvents] = useState<Partial<MockEventData>[]>(
		eventData?.allEvents,
	);
	const [followingOrganizerEvents, setFollowingOrganizerEvents] = useState<
		Partial<MockEventData>[]
	>(eventData?.allEvents);
	const [recommendedEvents, setRecommendedEvents] = useState<
		Partial<MockEventData>[]
	>(eventData.recommendedEvents);
	const [seasonalEvents, setSeasonalEvents] = useState<
		Partial<MockEventData>[]
	>(eventData.seasonalEvents);
	const [communityEvents, setCommunityEvents] = useState<
		Partial<MockEventData>[]
	>(eventData.communityEvents);
	const [sportsFitnessEvents, setSportsFitnessEvents] = useState<
		Partial<MockEventData>[]
	>(eventData.sportsFitnessEvents);
	const handleClickFN = useCallback((prop: HomePageProp["handleClickProp"]) => {
		let eveda = [];
		switch (prop?.btnFilter) {
			case "today":
				eveda = eventData?.todayEvents;
				break;
			case "week":
				eveda = eventData?.weekEvents;
				break;
			case "month":
				eveda = eventData?.monthEvents;
				break;
			default:
				eveda = eventData?.allEvents;
				break;
		}
		// Common simple heuristics for curated rails
		const seasonalCategories = ["Halloween", "Food & Drink", "Entertainment"];
		const communityCategories = ["Social", "Education", "Art & Culture"];
		const sportsCategories = ["Sports"];

		switch (prop?.sectionType) {
			case "upcoming":
				setUpcomingEvents(eveda);
				break;
			case "embrace":
				setEmbraceEvents(eveda);
				break;
			case "family":
				setFamilyEvents(eveda);
				break;
			case "following-organizer":
				setFollowingOrganizerEvents(eveda);
				break;
			case "recommended": {
				// Upcoming-ish in this window, featured first then by date
				const sorted = [...eveda].sort((a, b) => {
					const fa = a.featured ? 0 : 1;
					const fb = b.featured ? 0 : 1;
					if (fa !== fb) return fa - fb;
					const da = parseEventDate(a.startDate)?.getTime() || 0;
					const db = parseEventDate(b.startDate)?.getTime() || 0;
					return da - db;
				});
				setRecommendedEvents(sorted);
				break;
			}
			case "seasonal": {
				const filtered = (eveda as MockEventData[]).filter((event) =>
					seasonalCategories.includes((event.category || "").trim()),
				);
				const sorted = filtered.sort((a, b) => {
					const da = parseEventDate(a.startDate)?.getTime() || 0;
					const db = parseEventDate(b.startDate)?.getTime() || 0;
					return da - db;
				});
				setSeasonalEvents(sorted);
				break;
			}
			case "community": {
				const filtered = (eveda as MockEventData[]).filter((event) =>
					communityCategories.includes((event.category || "").trim()),
				);
				const sorted = filtered.sort((a, b) => {
					const da = parseEventDate(a.startDate)?.getTime() || 0;
					const db = parseEventDate(b.startDate)?.getTime() || 0;
					return da - db;
				});
				setCommunityEvents(sorted);
				break;
			}
			case "sports-fitness": {
				const filtered = (eveda as MockEventData[]).filter((event) =>
					sportsCategories.includes((event.category || "").trim()),
				);
				const sorted = filtered.sort((a, b) => {
					const da = parseEventDate(a.startDate)?.getTime() || 0;
					const db = parseEventDate(b.startDate)?.getTime() || 0;
					return da - db;
				});
				setSportsFitnessEvents(sorted);
				break;
			}
			default:
				break;
		}
	}, []);
	const upcomingFilters = useMemo<HomePageProp["filterButtons"]>(
		() => [
			{
				btnText: "All",
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
		[],
	);
	//
	const handleCategoryClick = useCallback(
		(prop: HomePageProp["handleClickProp"]) => {
			const eveda = getEventsByCategory(prop?.btnFilter ?? "");
			setCategoryEvents(eveda);
		},
		[],
	);
	const categoryFilters = useMemo<HomePageProp["filterButtons"]>(
		() =>
			eventCategoryData?.categories?.map((item) => ({
				btnText: item,
				BtnIcon: Box,
				btnFilter: item,
				handleClick: handleCategoryClick,
			})),
		[],
	);
	const defaultCategoryFilter = useMemo(
		() =>
			categoryFilters
				? categoryFilters[0]?.btnFilter
					? categoryFilters[0].btnFilter
					: "all"
				: "all",
		[],
	);
	const defaultCategoryEvents = useMemo<Partial<MockEventData>[]>(
		() => getEventsByCategory(defaultCategoryFilter),
		[],
	);
	const [categoryEvents, setCategoryEvents] = useState<
		Partial<MockEventData>[]
	>(defaultCategoryEvents);
	return (
		<div className="whatsapp-doodle-bg flex flex-col">
			<div className="relative flex flex-col">
				<div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
					{/* Primary center orbs */}
					<div className="sticky top-50 flex w-full justify-center gap-4">
						<div className="h-44 max-w-96 flex-1 bg-blue-300/30 blur-3xl dark:bg-blue-600/30 2xl:max-w-xl" />
						<div className="h-44 max-w-96 flex-1 bg-purple-300/30 blur-3xl dark:bg-purple-600/30 2xl:max-w-xl" />
					</div>

					{/* Mid-page side orbs */}
					<div className="mt-[35vh] flex w-full justify-between px-6 md:px-12">
						<div className="h-36 w-36 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-600/25" />
						<div className="h-36 w-36 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-600/25" />
					</div>

					{/* Lower ambient orbs */}
					<div className="mt-auto mb-24 flex w-full justify-center gap-8">
						<div className="h-40 w-40 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/25" />
						<div className="h-40 w-40 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/25" />
					</div>
				</div>
				<div className="4xl:max-w-[1992px] 4xl:mx-auto 3xl:p-28 3xl:gap-28 z-10 flex flex-col gap-16 px-4 py-10 md:px-6 md:py-16 lg:px-10 xl:gap-20 xl:px-20 xl:py-20 2xl:gap-24 2xl:p-24">
					<HomeFilterSectionOneComponent
						heading="Upcoming Events"
						sectionType="upcoming"
						events={upcomingEvents}
						filterButtons={upcomingFilters}
						defaultFilter="all"
					/>
					{/* Move Recommended directly under Upcoming */}
					<HomeFilterSectionOneComponent
						sectionType="recommended"
						heading="Recommended for you"
						events={recommendedEvents}
						filterButtons={upcomingFilters}
						defaultFilter="all"
					/>
					<HomeFilterSectionOneComponent
						sectionType="following-organizer"
						heading="From Organizers You Follow"
						events={followingOrganizerEvents}
						filterButtons={upcomingFilters}
						defaultFilter="all"
					/>
					<HomeFilterSectionTwoComponent
						sectionType="event-category"
						heading="Explore Event Categories"
						description="Whatever your vibe, we've got you covered"
						events={categoryEvents}
						filterButtons={categoryFilters}
						defaultFilter={defaultCategoryFilter}
					/>
				</div>
			</div>
		</div>
	);
}
