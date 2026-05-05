import { MOCK_EVENTS_PATIAL, MockEventData } from "./EventsMockData";

 

 

export const getOrganizerIdFromUsername = (username: string): string => {
  return slugifyOrganizerName(username);
};

export const slugifyOrganizerName = (username: string): string => {
  return username
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const MOCK_EVENTS: MockEventData[] = MOCK_EVENTS_PATIAL;

// export const MOCK_EVENTS: MockEventData[] = MOCK_EVENTS_PATIAL;

export const getAllEvents = (): MockEventData[] => {
  return MOCK_EVENTS;
};

export const getFeaturedEvents = (): MockEventData[] => {
  return MOCK_EVENTS.filter((event) => event.featured === true);
};

export const getEventsByCategory = (category: string): MockEventData[] => {
  const normalized = (category || "").trim().toLowerCase();
  return MOCK_EVENTS.filter(
    (event) => (event.category || "").trim().toLowerCase() === normalized,
  );
};

export const getEventCategories = (): string[] => {
  const categories = MOCK_EVENTS.map((event) => event.category).filter(
    Boolean,
  ) as string[];
  return Array.from(new Set(categories));
};

export const parseEventDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};

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

export const getRecommendedEvents = (limit: number = 12): MockEventData[] => {
  const now = new Date();
  return [...MOCK_EVENTS]
    .filter((event) => {
      const d = parseEventDate(event.startDate);
      return d !== null && d >= now;
    })
    .sort((a, b) => {
      const fa = a.featured ? 0 : 1;
      const fb = b.featured ? 0 : 1;
      if (fa !== fb) return fa - fb;

      const da = parseEventDate(a.startDate)?.getTime() || 0;
      const db = parseEventDate(b.startDate)?.getTime() || 0;
      return da - db;
    })
    .slice(0, limit);
};

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

export const getThisWeekEvents = (): MockEventData[] => {
  return getUpcomingEvents(7);
};

export const getThisMonthEvents = (): MockEventData[] => {
  return getUpcomingEvents(30);
};

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

  return similarEvents
    .sort((a, b) => {
      const da = parseEventDate(a.startDate)?.getTime() || 0;
      const db = parseEventDate(b.startDate)?.getTime() || 0;
      return da - db;
    })
    .slice(0, limit);
};

export const getEventsByOrganizer = (
  organizerUsername: string,
  excludeSlug?: string,
  limit: number = 10,
): MockEventData[] => {
  const organizerEvents = MOCK_EVENTS.filter(
    (event) =>
      event.username === organizerUsername && event.slug !== excludeSlug,
  );

  return organizerEvents
    .sort((a, b) => {
      const da = parseEventDate(a.startDate)?.getTime() || 0;
      const db = parseEventDate(b.startDate)?.getTime() || 0;
      return da - db;
    })
    .slice(0, limit);
};