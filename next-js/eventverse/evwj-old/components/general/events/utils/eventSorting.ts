import { parseEventDate } from "@/lib/mock-events";
import { EventWithDistance } from "./eventFiltering";

export type SortOption = "date" | "name" | "price" | "distance";

/**
 * Sort events by the specified criteria
 */
export function sortEvents(
	events: EventWithDistance[],
	sortBy: SortOption,
): EventWithDistance[] {
	return [...events].sort((a, b) => {
		switch (sortBy) {
			case "date": {
				const dateA = parseEventDate(a.startDate)?.getTime() || 0;
				const dateB = parseEventDate(b.startDate)?.getTime() || 0;
				return dateA - dateB;
			}
			case "name": {
				return a.name.localeCompare(b.name);
			}
			case "price": {
				return a.price - b.price;
			}
			case "distance": {
				const distA = a.distanceKm ?? Infinity;
				const distB = b.distanceKm ?? Infinity;
				return distA - distB;
			}
			default:
				return 0;
		}
	});
}
