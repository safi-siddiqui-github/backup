import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import { ResponseDataType } from "@/lib/lib-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useEventFaqStore = create<{
  eventFaqs?: ResponseDataType["eventFaqs"];
  addEventFaq: (eventFaq?: ResponseDataType["eventFaq"]) => Promise<void>;
  updateEventFaq: (eventFaq?: ResponseDataType["eventFaq"]) => Promise<void>;
  removeEventFaq: (slug?: string | undefined) => Promise<void>;
}>()(
  persist(
    immer((set, get) => ({
      eventFaqs: [],

      addEventFaq: async (eventFaq) => {
        if (!eventFaq) return;

        const timestamp = LibDateCurrentTimestampHelper();
        const slug = `event-faq-${timestamp}`;

        const eventFaqModified = {
          ...eventFaq,
          slug,
        };

        set((state) => {
          state.eventFaqs = [...(state?.eventFaqs || []), eventFaqModified];
        });
      },

      updateEventFaq: async (eventFaq) => {
        if (!eventFaq) return;

        const { id } = eventFaq;
        if (!id) return;

        const { eventFaqs } = get();
        if (!eventFaqs) return;

        const currentId = id - 1;
        const current = eventFaqs?.at(currentId);
        if (!current) return;

        const { slug: currentSlug } = current;
        if (!currentSlug) return;

        set((state) => {
          const { eventFaqs } = state;
          if (!eventFaqs) return;

          eventFaqs[currentId] = {
            ...current,
            ...eventFaq,
            slug: currentSlug,
            id: undefined,
          };
        });
      },

      removeEventFaq: async (slug) => {
        if (!slug) return;

        set((state) => {
          state.eventFaqs = state?.eventFaqs?.filter((a) => a.slug !== slug);
        });
      },
    })),
    { name: "event-faq-store" },
  ),
);
