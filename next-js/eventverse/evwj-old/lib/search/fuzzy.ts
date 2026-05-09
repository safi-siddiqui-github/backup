import Fuse from "fuse.js";
import { MockEventData } from "@/type";

/**
 * Fuzzy filter events by searching across name, category, and location
 * @param events - Array of events to filter
 * @param query - Search query string
 * @returns Filtered array of events matching the query
 */
export function fuzzyFilterEvents(
	events: MockEventData[],
	query: string,
): MockEventData[] {
	const trimmedQuery = query?.trim();

	if (!trimmedQuery) {
		return events;
	}

	const fuse = new Fuse(events, {
		keys: ["name", "category", "locationMap"],
		threshold: 0.35, // 0 = exact match, 1 = match anything
		ignoreLocation: true,
		minMatchCharLength: 2,
		includeScore: true,
	});

	const results = fuse.search(trimmedQuery);
	return results.map((result) => result.item);
}
