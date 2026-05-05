import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import { ResponseDataType } from "@/lib/lib-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useEventDayStore = create<{
  eventDays?: ResponseDataType["eventDays"];
  addEventDay: (eventDay?: ResponseDataType["eventDay"]) => Promise<void>;
  updateEventDay: (eventDay?: ResponseDataType["eventDay"]) => Promise<void>;
  removeEventDay: (slug?: string | undefined) => Promise<void>;
}>()(
  persist(
    immer((set, get) => ({
      eventDays: [],

      addEventDay: async (eventDay) => {
        if (!eventDay) return;

        const timestamp = LibDateCurrentTimestampHelper();
        const slug = `event-day-${timestamp}`;

        const eventDayModified = {
          ...eventDay,
          slug,
        };

        set((state) => {
          state.eventDays = [...(state?.eventDays || []), eventDayModified];
        });
      },

      updateEventDay: async (eventDay) => {
        if (!eventDay) return;

        const { id } = eventDay;
        if (!id) return;

        const { eventDays } = get();
        if (!eventDays) return;

        const currentId = id - 1;
        const current = eventDays?.at(currentId);
        if (!current) return;

        const { slug: currentSlug } = current;
        if (!currentSlug) return;

        set((state) => {
          const { eventDays } = state;
          if (!eventDays) return;

          eventDays[currentId] = {
            ...current,
            ...eventDay,
            slug: currentSlug,
            id: undefined,
          };
        });
      },

      removeEventDay: async (slug) => {
        if (!slug) return;

        set((state) => {
          state.eventDays = state?.eventDays?.filter((a) => a.slug !== slug);
        });
      },
    })),
    { name: "event-day-store" },
  ),
);
