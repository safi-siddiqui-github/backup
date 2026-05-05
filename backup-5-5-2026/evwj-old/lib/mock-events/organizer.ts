import { MockEventData } from "@/type";
import { MOCK_EVENTS } from "./index";
import { parseEventDate } from "./index";

// Helper function to slugify a username for URL
export const slugifyOrganizerName = (username: string): string => {
	return username
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "") // Remove special characters
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

// Helper function to get organizer ID from username
export const getOrganizerIdFromUsername = (username: string): string => {
	return slugifyOrganizerName(username);
};

// Helper function to get organizer username from ID
export const getOrganizerUsernameFromId = (organizerId: string): string => {
	// Reverse the slugification
	return organizerId
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

// Get all unique organizers from events
export const getAllOrganizers = (): Array<{
	id: string;
	username: string;
	userProfilePicture?: string;
}> => {
	const organizerMap = new Map<
		string,
		{ username: string; userProfilePicture?: string }
	>();

	MOCK_EVENTS.forEach((event) => {
		if (event.username && !organizerMap.has(event.username)) {
			organizerMap.set(event.username, {
				username: event.username,
				userProfilePicture: event.userProfilePicture,
			});
		}
	});

	return Array.from(organizerMap.entries()).map(([username, data]) => ({
		id: getOrganizerIdFromUsername(username),
		...data,
	}));
};

// Get organizer by ID
export const getOrganizerById = (
	organizerId: string,
): { id: string; username: string; userProfilePicture?: string } | null => {
	const organizers = getAllOrganizers();
	return organizers.find((org) => org.id === organizerId) || null;
};

// Get all PUBLIC events by organizer (excludes private/draft events)
export const getPublicEventsByOrganizer = (
	organizerId: string,
): MockEventData[] => {
	const username = getOrganizerUsernameFromId(organizerId);

	return MOCK_EVENTS.filter((event) => {
		// For mock data, we assume all events are public
		// In real implementation, this would check event.isPublic === true && event.isDraft === false
		return event.username === username;
	});
};

// Get organizer statistics
export const getOrganizerStats = (organizerId: string) => {
	const events = getPublicEventsByOrganizer(organizerId);
	const now = new Date();

	// Separate upcoming and past events
	const upcomingEvents = events.filter((event) => {
		const eventDate = parseEventDate(event.startDate);
		return eventDate !== null && eventDate >= now;
	});

	const pastEvents = events.filter((event) => {
		const eventDate = parseEventDate(event.startDate);
		return eventDate !== null && eventDate < now;
	});

	// Calculate total attendees (mock: estimate based on event price and category)
	// In real implementation, this would come from RSVP/ticket module data
	const totalAttendees = events.reduce((sum, event) => {
		// Mock calculation: higher price events tend to have fewer attendees
		// Lower price events tend to have more attendees
		const estimatedAttendees =
			event.price > 100 ? 50 : event.price > 50 ? 100 : 200;
		return sum + estimatedAttendees;
	}, 0);

	// Calculate average rating (mock: random between 4.0 and 5.0)
	// In real implementation, this would come from event ratings/reviews
	const averageRating =
		events.length > 0
			? events.reduce((sum, event, idx) => {
					// Generate consistent rating based on organizer ID
					const rating = 4.0 + ((organizerId.charCodeAt(0) + idx) % 10) / 10;
					return sum + Math.min(rating, 5.0);
				}, 0) / events.length
			: 0;

	// Get most common category
	const categoryCount = events.reduce(
		(acc, event) => {
			const cat = event.category || "Uncategorized";
			acc[cat] = (acc[cat] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	const primaryCategory =
		Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0]?.[0] ||
		"Events";

	return {
		totalEvents: events.length,
		totalAttendees,
		averageRating: Math.round(averageRating * 10) / 10,
		primaryCategory,
		upcomingCount: upcomingEvents.length,
		pastCount: pastEvents.length,
		upcomingEvents,
		pastEvents,
	};
};

// Extended organizer type with stats
export type OrganizerWithStats = {
	id: string;
	username: string;
	userProfilePicture?: string;
	followers: number;
	upcomingCount: number;
	eventTypes: string[];
	stats: ReturnType<typeof getOrganizerStats>;
};

// Get organizer followers (mock data - consistent per organizer)
export const getOrganizerFollowers = (organizerId: string): number => {
	// Generate consistent follower count based on organizer ID
	const hash = organizerId
		.split("")
		.reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return 100 + (hash % 9000); // Between 100 and 9100 followers
};

// Get unique event types/categories for an organizer
export const getOrganizerEventTypes = (organizerId: string): string[] => {
	const events = getPublicEventsByOrganizer(organizerId);
	const categories = new Set<string>();

	events.forEach((event) => {
		if (event.category) {
			categories.add(event.category);
		}
	});

	return Array.from(categories);
};

// Get organizer with stats
export const getOrganizerWithStats = (
	organizerId: string,
): OrganizerWithStats | null => {
	const organizer = getOrganizerById(organizerId);
	if (!organizer) return null;

	const stats = getOrganizerStats(organizerId);
	const eventTypes = getOrganizerEventTypes(organizerId);
	const followers = getOrganizerFollowers(organizerId);

	return {
		...organizer,
		followers,
		upcomingCount: stats.upcomingCount,
		eventTypes,
		stats,
	};
};

// Get trending organizers (based on events created in last 30 days)
export const getTrendingOrganizers = (
	limit: number = 10,
): OrganizerWithStats[] => {
	const organizers = getAllOrganizers();
	const now = new Date();
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

	const organizersWithRecentActivity = organizers
		.map((org) => {
			const events = getPublicEventsByOrganizer(org.id);
			const recentEvents = events.filter((event) => {
				const eventDate = parseEventDate(event.startDate);
				return eventDate !== null && eventDate >= thirtyDaysAgo;
			});

			return {
				organizer: org,
				recentEventCount: recentEvents.length,
			};
		})
		.filter((item) => item.recentEventCount > 0)
		.sort((a, b) => b.recentEventCount - a.recentEventCount)
		.slice(0, limit)
		.map((item) => getOrganizerWithStats(item.organizer.id))
		.filter((org): org is OrganizerWithStats => org !== null);

	return organizersWithRecentActivity;
};

// Get hottest organizers (most upcoming events)
export const getHottestOrganizers = (
	limit: number = 10,
): OrganizerWithStats[] => {
	const organizers = getAllOrganizers();

	const organizersWithUpcoming = organizers
		.map((org) => getOrganizerWithStats(org.id))
		.filter(
			(org): org is OrganizerWithStats => org !== null && org.upcomingCount > 0,
		)
		.sort((a, b) => b.upcomingCount - a.upcomingCount)
		.slice(0, limit);

	return organizersWithUpcoming;
};

// Get organizers near you (based on event locations)
export const getOrganizersNearYou = (
	userLocation: { latitude: number; longitude: number } | null,
	limit: number = 10,
): OrganizerWithStats[] => {
	if (!userLocation) {
		// If no location, return hottest organizers as fallback
		return getHottestOrganizers(limit);
	}

	const organizers = getAllOrganizers();
	const MAX_DISTANCE_KM = 50; // 50km radius

	// Helper to calculate distance between two coordinates (Haversine formula)
	const calculateDistance = (
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number,
	): number => {
		const R = 6371; // Earth's radius in km
		const dLat = ((lat2 - lat1) * Math.PI) / 180;
		const dLon = ((lon2 - lon1) * Math.PI) / 180;
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((lat2 * Math.PI) / 180) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	const organizersWithDistance = organizers
		.map((org) => {
			const events = getPublicEventsByOrganizer(org.id);
			const nearbyEvents = events.filter((event) => {
				if (!event.latitude || !event.longitude) return false;
				const distance = calculateDistance(
					userLocation.latitude,
					userLocation.longitude,
					event.latitude,
					event.longitude,
				);
				return distance <= MAX_DISTANCE_KM;
			});

			if (nearbyEvents.length === 0) return null;

			// Calculate average distance
			const avgDistance =
				nearbyEvents.reduce((sum, event) => {
					if (!event.latitude || !event.longitude) return sum;
					return (
						sum +
						calculateDistance(
							userLocation.latitude,
							userLocation.longitude,
							event.latitude,
							event.longitude,
						)
					);
				}, 0) / nearbyEvents.length;

			return {
				organizerId: org.id,
				nearbyEventCount: nearbyEvents.length,
				avgDistance,
			};
		})
		.filter((item): item is NonNullable<typeof item> => item !== null)
		.sort((a, b) => {
			// Sort by nearby event count first, then by distance
			if (b.nearbyEventCount !== a.nearbyEventCount) {
				return b.nearbyEventCount - a.nearbyEventCount;
			}
			return a.avgDistance - b.avgDistance;
		})
		.slice(0, limit)
		.map((item) => getOrganizerWithStats(item.organizerId))
		.filter((org): org is OrganizerWithStats => org !== null);

	return organizersWithDistance;
};

// Get organizers by event type/category
export const getOrganizersByEventType = (
	category: string,
	limit?: number,
): OrganizerWithStats[] => {
	const organizers = getAllOrganizers();

	const organizersInCategory = organizers
		.map((org) => {
			const events = getPublicEventsByOrganizer(org.id);
			const categoryEvents = events.filter(
				(event) => event.category?.toLowerCase() === category.toLowerCase(),
			);

			if (categoryEvents.length === 0) return null;

			return {
				organizerId: org.id,
				eventCount: categoryEvents.length,
			};
		})
		.filter((item): item is NonNullable<typeof item> => item !== null)
		.sort((a, b) => b.eventCount - a.eventCount)
		.map((item) => getOrganizerWithStats(item.organizerId))
		.filter((org): org is OrganizerWithStats => org !== null);

	return limit ? organizersInCategory.slice(0, limit) : organizersInCategory;
};

// Get all organizers with stats
export const getAllOrganizersWithStats = (): OrganizerWithStats[] => {
	const organizers = getAllOrganizers();
	return organizers
		.map((org) => getOrganizerWithStats(org.id))
		.filter((org): org is OrganizerWithStats => org !== null);
};
