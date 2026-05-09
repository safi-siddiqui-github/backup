import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export type NikeCookieConsentType = {
  improvedExperience: boolean;
  personalizedExperience: boolean;
  behaviouralSharing: boolean;
  profileBasedSharing: boolean;
  closeDialogForever: boolean;
  setImprovedExperience: (value: boolean) => void;
  setPersonalizedExperience: (value: boolean) => void;
  setBehaviouralSharing: (value: boolean) => void;
  setProfileBasedSharing: (value: boolean) => void;
  setCloseDialogForever: (value: boolean) => void;
}

export const useNikeCookieConsentStore = create<NikeCookieConsentType>()(
  persist(
    (set) => ({
      improvedExperience: false,
      personalizedExperience: false,
      behaviouralSharing: false,
      profileBasedSharing: false,
      closeDialogForever: false,
      setImprovedExperience: (value: boolean) => set({ improvedExperience: value }),
      setPersonalizedExperience: (value: boolean) => set({ personalizedExperience: value }),
      setBehaviouralSharing: (value: boolean) => set({ behaviouralSharing: value }),
      setProfileBasedSharing: (value: boolean) => set({ profileBasedSharing: value }),
      setCloseDialogForever: (value: boolean) => set({ closeDialogForever: value }),
    }),
    { name: 'nike-consent-cookie-storage' },
  ),
)
