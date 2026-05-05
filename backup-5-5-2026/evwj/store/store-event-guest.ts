import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import { ResponseDataType } from "@/lib/lib-responses";
import { del as deIldb, get as getIdb, set as setIdb } from "idb-keyval";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useEventGuestStore = create<{
  eventGuests?: ResponseDataType["eventGuests"];
  addEventGuest: (eventGuest?: ResponseDataType["eventGuest"]) => Promise<void>;
  updateEventGuest: (
    eventGuest?: ResponseDataType["eventGuest"],
  ) => Promise<void>;
  getEventGuestsWithFile: () => Promise<ResponseDataType["eventGuests"]>;
  removeEventGuest: (slug?: string) => Promise<void>;
}>()(
  persist(
    immer((set, get) => ({
      eventGuests: [],

      addEventGuest: async (eventGuest) => {
        if (!eventGuest || !eventGuest?.avatarFile) return;

        const timestamp = LibDateCurrentTimestampHelper();
        const slug = `event-guest-${timestamp}`;

        // store File/Blob directly in IndexedDB
        await setIdb(slug, eventGuest?.avatarFile);

        const eventGuestModified = {
          ...eventGuest,
          slug,
        };

        set((state) => {
          state.eventGuests = [
            ...(state?.eventGuests || []),
            eventGuestModified,
          ];
        });
      },

      updateEventGuest: async (eventGuest) => {
        if (!eventGuest) return;

        const { avatarFile, id } = eventGuest;
        if (!avatarFile || !id) return;

        const { eventGuests } = get();
        if (!eventGuests) return;

        const currentId = id - 1;
        const current = eventGuests?.at(currentId);
        if (!current) return;

        const { slug: currentSlug } = current;
        if (!currentSlug) return;

        await setIdb(currentSlug, avatarFile);

        set((state) => {
          const { eventGuests } = state;
          if (!eventGuests) return;

          eventGuests[currentId] = {
            ...current,
            ...eventGuest,
            slug: currentSlug,
            id: undefined,
          };
        });
      },

      getEventGuestsWithFile: async () => {
        const { eventGuests } = get();

        const eventGuestsWithFile: ResponseDataType["eventGuests"] = [];
        for (const eventGuest of eventGuests ?? []) {
          if (!eventGuest?.slug) continue;

          const avatarFile = await getIdb<File>(eventGuest?.slug);
          if (!avatarFile) continue;

          const avatarFileUrl = URL.createObjectURL(avatarFile);

          eventGuestsWithFile.push({
            ...eventGuest,
            avatarFile,
            avatarFileUrl,
          });
        }

        return eventGuestsWithFile;
      },

      removeEventGuest: async (slug) => {
        if (!slug) return;
        await deIldb(slug);

        set((state) => {
          state.eventGuests = state?.eventGuests?.filter(
            (a) => a.slug !== slug,
          );
        });
      },
    })),
    { name: "event-guest-store" },
  ),
);
