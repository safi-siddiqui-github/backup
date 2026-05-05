import { MockEventData } from "@/type";
import { Coordinates, haversineKm } from "@/lib/geo";
import { fuzzyFilterEvents } from "@/lib/search/fuzzy";
import { parseEventDate } from "@/lib/mock-events";
import { DateRange } from "react-day-picker";

export type EventWithDistance = MockEventData & { distanceKm?: number };

/**
 * Filter events by search query using fuzzy search
 */
export function filterEventsBySearch(
	events: MockEventData[],
	query: string,
): MockEventData[] {
	if (!query) return events;
	return fuzzyFilterEvents(events, query);
}

/**
 * Filter events by category (supports multiple categories)
 */
export function filterEventsByCategory(
	events: MockEventData[],
	categories: string | string[],
): MockEventData[] {
	const categoryArray = Array.isArray(categories) ? categories : categories ? [categories] : [];
	if (categoryArray.length === 0) return events;
	return events.filter((e) =>
		categoryArray.some(
			(cat) => e.category?.toLowerCase() === cat.toLowerCase(),
		),
	);
}

/**
 * Filter events by date range
 */
export function filterEventsByDateRange(
	events: MockEventData[],
	dateRange: DateRange | undefined,
): MockEventData[] {
	if (!dateRange?.from && !dateRange?.to) return events;

	return events.filter((e) => {
		const eventDate = parseEventDate(e.startDate);
		if (!eventDate) return false;
		if (dateRange.from && eventDate < dateRange.from) return false;
		if (dateRange.to && eventDate > dateRange.to) return false;
		return true;
	});
}

/**
 * Filter events by price range
 */
export function filterEventsByPriceRange(
	events: MockEventData[],
	priceRange: [number, number],
): MockEventData[] {
	return events.filter(
		(e) => e.price >= priceRange[0] && e.price <= priceRange[1],
	);
}

/**
 * Filter events by location string
 */
export function filterEventsByLocation(
	events: MockEventData[],
	location: string,
): MockEventData[] {
	if (!location) return events;
	return events.filter((e) =>
		e.locationMap?.toLowerCase().includes(location.toLowerCase()),
	);
}

/**
 * Calculate distances for events and add distanceKm property
 */
export function calculateEventDistances(
	events: MockEventData[],
	userLocation: Coordinates | null,
): EventWithDistance[] {
	if (!userLocation) {
		return events.map((e) => ({ ...e, distanceKm: undefined }));
	}

	return events.map((e): EventWithDistance => {
		if (e.latitude && e.longitude) {
			const distance = haversineKm(userLocation, {
				lat: e.latitude,
				lng: e.longitude,
			});
			return { ...e, distanceKm: distance };
		}
		return { ...e, distanceKm: undefined };
	});
}

/**
 * Filter events by distance radius
 */
export function filterEventsByDistance(
	events: EventWithDistance[],
	userLocation: Coordinates | null,
	radiusKm: number,
	anyDistance: boolean,
): EventWithDistance[] {
	if (!userLocation || anyDistance) return events;

	return events.filter((e) => {
		return e.distanceKm === undefined || e.distanceKm <= radiusKm;
	});
}

/**
 * Apply all filters to events in sequence
 */
export function applyAllFilters(
	events: MockEventData[],
	filters: {
		query: string;
		category: string | string[];
		dateRange: DateRange | undefined;
		priceRange: [number, number];
		location: string;
		userLocation: Coordinates | null;
		radiusKm: number;
		anyDistance: boolean;
	},
): EventWithDistance[] {
	let filteredEvents = [...events];

	// Apply filters in sequence
	filteredEvents = filterEventsBySearch(filteredEvents, filters.query);
	filteredEvents = filterEventsByCategory(filteredEvents, filters.category);
	filteredEvents = filterEventsByDateRange(filteredEvents, filters.dateRange);
	filteredEvents = filterEventsByPriceRange(filteredEvents, filters.priceRange);
	filteredEvents = filterEventsByLocation(filteredEvents, filters.location);

	// Calculate distances and apply distance filter
	const eventsWithDistance = calculateEventDistances(
		filteredEvents,
		filters.userLocation,
	);
	return filterEventsByDistance(
		eventsWithDistance,
		filters.userLocation,
		filters.radiusKm,
		filters.anyDistance,
	);
}
