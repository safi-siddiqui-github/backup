"use client";

import { Routes } from "@/lib/lib-routes";
import { getEventCategories } from "@/lib/mock-events";
import {
  getHottestOrganizers,
  getOrganizersByEventType,
  getOrganizersNearYou,
  getTrendingOrganizers,
} from "@/lib/mock-events/organizer";
import { useMemo } from "react";
import { useUserLocation } from "../events/hooks/useUserLocation";
import OrganizerCarouselComponent from "./OrganizerCarouselComponent";

export default function OrganizersPageComponent() {
  const { userLocation } = useUserLocation();

  // Memoize organizer data
  const trendingOrganizers = useMemo(() => getTrendingOrganizers(10), []);
  const hottestOrganizers = useMemo(() => getHottestOrganizers(10), []);
  const nearbyOrganizers = useMemo(
    () =>
      getOrganizersNearYou(
        userLocation
          ? { latitude: userLocation.lat, longitude: userLocation.lng }
          : null,
        10,
      ),
    [userLocation],
  );

  // Get event categories for event type sections
  const eventCategories = useMemo(() => getEventCategories(), []);

  // Event type categories to display (subset of all categories)
  // Use original category names for filtering
  const displayedCategories = useMemo(() => {
    return eventCategories.slice(0, 6); // Limit to 6 categories for initial display
  }, [eventCategories]);

  // Get organizers by event type for each category
  const organizersByCategory = useMemo(() => {
    const result: Record<
      string,
      ReturnType<typeof getOrganizersByEventType>
    > = {};
    displayedCategories.forEach((category) => {
      result[category] = getOrganizersByEventType(category, 10);
    });
    return result;
  }, [displayedCategories]);

  // Map category names for display
  const getCategoryDisplayName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      Music: "Music & Concerts",
      "Food & Drink": "Food & Dining",
      "Art & Culture": "Art & Culture",
      Business: "Business & Networking",
      Sports: "Sports & Fitness",
      Entertainment: "Entertainment",
      Education: "Education & Learning",
      Social: "Social Events",
      Technology: "Tech & Innovation",
      Halloween: "Halloween Events",
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
          Discover Organizers
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Connect with event organizers and discover amazing experiences. Follow
          your favorites to stay updated on their latest events.
        </p>
      </div>

      {/* Trending Organizers */}
      {trendingOrganizers.length > 0 && (
        <OrganizerCarouselComponent
          title="Trending Organizers"
          organizers={trendingOrganizers}
          seeMoreLink={`${Routes.web.general.organizers}?filter=trending`}
          id="trending"
        />
      )}

      {/* Hottest List */}
      {hottestOrganizers.length > 0 && (
        <OrganizerCarouselComponent
          title="Hottest List"
          organizers={hottestOrganizers}
          seeMoreLink={`${Routes.web.general.organizers}?filter=hottest`}
          id="hottest"
        />
      )}

      {/* Top 10 Organizers Near You */}
      {nearbyOrganizers.length > 0 && (
        <OrganizerCarouselComponent
          title="Top 10 Organizers Near You"
          organizers={nearbyOrganizers}
          seeMoreLink={`${Routes.web.general.organizers}?filter=nearby`}
          id="nearby"
        />
      )}

      {/* Organizers by Event Type */}
      {displayedCategories.map((category) => {
        const organizers = organizersByCategory[category];
        if (!organizers || organizers.length === 0) return null;

        // Sanitize category name for CSS selector (remove special characters)
        const sanitizedId = category
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen

        return (
          <OrganizerCarouselComponent
            key={category}
            title={`${getCategoryDisplayName(category)} Organizers`}
            organizers={organizers}
            seeMoreLink={`${Routes.web.general.organizers}?filter=category&category=${encodeURIComponent(category)}`}
            id={`category-${sanitizedId}`}
          />
        );
      })}
    </div>
  );
}
