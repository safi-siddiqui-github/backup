import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export type PreferenceCookieConsentType = {
  improvedExperience: boolean;
  personalizedExperience: boolean;
  behaviouralSharing: boolean;
  profileBasedSharing: boolean;
  closeDivForever: boolean;
  setImprovedExperience: (value: boolean) => void;
  setPersonalizedExperience: (value: boolean) => void;
  setBehaviouralSharing: (value: boolean) => void;
  setProfileBasedSharing: (value: boolean) => void;
  setCloseDivForever: (value: boolean) => void;
}

export const usePreferenceCookieConsentStore = create<PreferenceCookieConsentType>()(
  persist(
    (set) => ({
      improvedExperience: false,
      personalizedExperience: false,
      behaviouralSharing: false,
      profileBasedSharing: false,
      closeDivForever: false,
      setImprovedExperience: (value: boolean) => set({ improvedExperience: value }),
      setPersonalizedExperience: (value: boolean) => set({ personalizedExperience: value }),
      setBehaviouralSharing: (value: boolean) => set({ behaviouralSharing: value }),
      setProfileBasedSharing: (value: boolean) => set({ profileBasedSharing: value }),
      setCloseDivForever: (value: boolean) => set({ closeDivForever: value }),
    }),
    { name: 'preference-consent-cookie-storage' },
  ),
)
