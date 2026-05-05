import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import { ResponseDataType } from "@/lib/lib-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useEventVenueStore = create<{
  eventVenues?: ResponseDataType["eventVenues"];
  addEventVenue: (eventVenue?: ResponseDataType["eventVenue"]) => Promise<void>;
  updateEventVenue: (
    eventVenue?: ResponseDataType["eventVenue"],
  ) => Promise<void>;
  removeEventVenue: (slug?: string | undefined) => Promise<void>;
}>()(
  persist(
    immer((set, get) => ({
      eventVenues: [],

      addEventVenue: async (eventVenue) => {
        if (!eventVenue) return;

        const timestamp = LibDateCurrentTimestampHelper();
        const slug = `event-Venue-${timestamp}`;

        const eventVenueModified = {
          ...eventVenue,
          slug,
        };

        set((state) => {
          state.eventVenues = [
            ...(state?.eventVenues || []),
            eventVenueModified,
          ];
        });
      },

      updateEventVenue: async (eventVenue) => {
        if (!eventVenue) return;

        const { id } = eventVenue;
        if (!id) return;

        const { eventVenues } = get();
        if (!eventVenues) return;

        const currentId = id - 1;
        const current = eventVenues?.at(currentId);
        if (!current) return;

        const { slug: currentSlug } = current;
        if (!currentSlug) return;

        set((state) => {
          const { eventVenues } = state;
          if (!eventVenues) return;

          eventVenues[currentId] = {
            ...current,
            ...eventVenue,
            slug: currentSlug,
            id: undefined,
          };
        });
      },

      removeEventVenue: async (slug) => {
        if (!slug) return;

        set((state) => {
          state.eventVenues = state?.eventVenues?.filter(
            (a) => a.slug !== slug,
          );
        });
      },
    })),
    { name: "event-venue-store" },
  ),
);
