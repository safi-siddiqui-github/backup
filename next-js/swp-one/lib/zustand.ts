import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WebinarStoreType = {
   isModalOpen: boolean;
  isComplete: boolean;
  isSubmitting: boolean;
  setModalOpen: (value: boolean) => void;
  setComplete: (value: boolean) => void;
  setSubmitting: (value: boolean) => void;
};

export const useWebinarStore = create<WebinarStoreType>()(
  persist(
    (set) => ({
      isModalOpen: false,
      isComplete: false,
      isSubmitting: false,
      setModalOpen: (value) => set({ isModalOpen: value }),
      setComplete: (value) => set({ isComplete: value }),
      setSubmitting: (value) => set({ isSubmitting: value }),
    }),
    { name: "webinar-storage" }
  )
);
