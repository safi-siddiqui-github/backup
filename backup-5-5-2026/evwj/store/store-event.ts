import { ResponseDataType } from "@/lib/lib-responses";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useEventStore = create<{
  event?: ResponseDataType["event"];
  // setEvent: (event?: ResponseDataType["event"]) => void;
  setEvent: (updater: (event: ResponseDataType["event"]) => void) => void;
  replaceEvent: (event: ResponseDataType["event"]) => void;
}>()(
  persist(
    immer((set) => ({
      event: {
        step: 1,
      },

      setEvent: (updater) =>
        set((state) => {
          if (!state.event) return;
          updater(state.event);
        }),

      replaceEvent: (event) =>
        set((state) => {
          state.event = event;
        }),
    })),
    { name: "event-store" },
  ),
);
