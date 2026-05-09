import { create } from "zustand";

interface LeadNavigationState {
  leadToOpen: { leadId: string; initialTab?: string } | null;
  setLeadToOpen: (leadToOpen: { leadId: string; initialTab?: string } | null) => void;
  navigateToLead: (leadId: string, initialTab?: string) => void;
  clearLeadToOpen: () => void;
}

export const useVendorNavigationStore = create<LeadNavigationState>((set) => ({
  leadToOpen: null,
  setLeadToOpen: (leadToOpen) => set({ leadToOpen }),
  navigateToLead: (leadId: string, initialTab?: string) => {
    set({ leadToOpen: { leadId, initialTab } });
  },
  clearLeadToOpen: () => set({ leadToOpen: null }),
}));

