import { MockEventData } from "@/type";
import { MOCK_EVENTS_PATIAL } from "./partial";

export const MOCK_EVENTS: MockEventData[] = MOCK_EVENTS_PATIAL;

// Helper function to get all events
export const getAllEvents = (): MockEventData[] => {
	return MOCK_EVENTS;
};

// Helper function to get featured events
export const getFeaturedEvents = (): MockEventData[] => {
	// return MOCK_EVENTS;
	return MOCK_EVENTS.filter((event) => event.featured === true);
};

// Helper function to get events by category (case-insensitive)
export const getEventsByCategory = (category: string): MockEventData[] => {
	const normalized = (category || "").trim().toLowerCase();
	return MOCK_EVENTS.filter(
		(event) => (event.category || "").trim().toLowerCase() === normalized,
	);
};

// Helper function to get all unique categories
export const getEventCategories = (): string[] => {
	const categories = MOCK_EVENTS.map((event) => event.category).filter(
		Boolean,
	) as string[];
	return Array.from(new Set(categories));
};

// Helper: parse event start date safely
export const parseEventDate = (dateStr?: string): Date | null => {
	if (!dateStr) return null;
	const d = new Date(dateStr);
	return isNaN(d.getTime()) ? null : d;
};

// Helper function to get upcoming events within N days from now
export const getUpcomingEvents = (days: number): MockEventData[] => {
	const now = new Date();
	const cutoff = new Date(
		now.getTime() + Math.max(0, days) * 24 * 60 * 60 * 1000,
	);
	return MOCK_EVENTS.filter((event) => {
		const d = parseEventDate(event.startDate);
		return d !== null && d >= now && d <= cutoff;
	}).sort((a, b) => {
		const da = parseEventDate(a.startDate)?.getTime() || 0;
		const db = parseEventDate(b.startDate)?.getTime() || 0;
		return da - db;
	});
};

// ---- Home page curated rails ----

// Recommended for you: upcoming events, prioritizing featured, then by date
export const getRecommendedEvents = (limit: number = 12): MockEventData[] => {
	const now = new Date();
	return [...MOCK_EVENTS]
		.filter((event) => {
			const d = parseEventDate(event.startDate);
			return d !== null && d >= now;
		})
		.sort((a, b) => {
			// Featured first
			const fa = a.featured ? 0 : 1;
			const fb = b.featured ? 0 : 1;
			if (fa !== fb) return fa - fb;

			// Then by soonest date
			const da = parseEventDate(a.startDate)?.getTime() || 0;
			const db = parseEventDate(b.startDate)?.getTime() || 0;
			return da - db;
		})
		.slice(0, limit);
};

// T'is the season: upcoming in next N days, from seasonal categories
const SEASONAL_CATEGORIES = ["Halloween", "Food & Drink", "Entertainment"];

export const getSeasonalEvents = (
	daysAhead: number = 28,
	limit: number = 12,
): MockEventData[] => {
	const upcoming = getUpcomingEvents(daysAhead);
	return upcoming
		.filter((event) =>
			SEASONAL_CATEGORIES.includes((event.category || "").trim()),
		)
		.slice(0, limit);
};

// Community: social / community-style categories
const COMMUNITY_CATEGORIES = ["Social", "Education", "Art & Culture"];

export const getCommunityEvents = (limit: number = 12): MockEventData[] => {
	return [...MOCK_EVENTS]
		.filter((event) =>
			COMMUNITY_CATEGORIES.includes((event.category || "").trim()),
		)
		.sort((a, b) => {
			const da = parseEventDate(a.startDate)?.getTime() || 0;
			const db = parseEventDate(b.startDate)?.getTime() || 0;
			return da - db;
		})
		.slice(0, limit);
};

// Sports & fitness: sports / wellness style categories (currently "Sports")
const SPORTS_FITNESS_CATEGORIES = ["Sports"];

export const getSportsFitnessEvents = (limit: number = 12): MockEventData[] => {
	return [...MOCK_EVENTS]
		.filter((event) =>
			SPORTS_FITNESS_CATEGORIES.includes((event.category || "").trim()),
		)
		.sort((a, b) => {
			const da = parseEventDate(a.startDate)?.getTime() || 0;
			const db = parseEventDate(b.startDate)?.getTime() || 0;
			return da - db;
		})
		.slice(0, limit);
};

// Helper function to get events happening today
export const getTodayEvents = (): MockEventData[] => {
	const now = new Date();
	const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const endOfDay = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		23,
		59,
		59,
		999,
	);

	return MOCK_EVENTS.filter((event) => {
		const d = parseEventDate(event.startDate);
		return d !== null && d >= startOfDay && d <= endOfDay;
	}).sort((a, b) => {
		const da = parseEventDate(a.startDate)?.getTime() || 0;
		const db = parseEventDate(b.startDate)?.getTime() || 0;
		return da - db;
	});
};

// Helper function to get events happening this week (next 7 days)
export const getThisWeekEvents = (): MockEventData[] => {
	return getUpcomingEvents(7);
};

// Helper function to get events happening this month (next 30 days)
export const getThisMonthEvents = (): MockEventData[] => {
	return getUpcomingEvents(30);
};

// Helper function to get similar events (same category, excluding current event)
export const getSimilarEvents = (
	currentEventSlug: string,
	limit: number = 10,
): MockEventData[] => {
	const currentEvent = MOCK_EVENTS.find(
		(event) => event.slug === currentEventSlug,
	);
	if (!currentEvent) return [];

	const similarEvents = MOCK_EVENTS.filter(
		(event) =>
			event.slug !== currentEventSlug &&
			event.category === currentEvent.category,
	);

	// Sort by date (upcoming first) and limit results
	return similarEvents
		.sort((a, b) => {
			const da = parseEventDate(a.startDate)?.getTime() || 0;
			const db = parseEventDate(b.startDate)?.getTime() || 0;
			return da - db;
		})
		.slice(0, limit);
};

// Helper function to get events from the same organizer (excluding current event)
export const getEventsByOrganizer = (
	organizerUsername: string,
	excludeSlug?: string,
	limit: number = 10,
): MockEventData[] => {
	const organizerEvents = MOCK_EVENTS.filter(
		(event) =>
			event.username === organizerUsername && event.slug !== excludeSlug,
	);

	// Sort by date (upcoming first) and limit results
	return organizerEvents
		.sort((a, b) => {
			const da = parseEventDate(a.startDate)?.getTime() || 0;
			const db = parseEventDate(b.startDate)?.getTime() || 0;
			return da - db;
		})
		.slice(0, limit);
};
