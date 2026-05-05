import { create } from "zustand";

export type ActivityType =
  | "message"
  | "payment"
  | "new-lead"
  | "contract"
  | "upcoming-event"
  | "generate-proposal"
  | "send-messages"
  | "review-pricing";

export type ActivityNavigationTarget =
  | { type: "main-tab"; tab: "communications" | "billing" | "smart-leads" | "client-hub" }
  | { type: "lead"; leadId: string; initialTab?: string }
  | { type: "client"; clientId: string; initialTab?: string };

interface ActivityNavigationState {
  navigationTarget: ActivityNavigationTarget | null;
  setNavigationTarget: (target: ActivityNavigationTarget | null) => void;
  navigateToActivity: (activityType: ActivityType, metadata?: Record<string, any>) => void;
  clearNavigation: () => void;
}

export const useActivityNavigationStore = create<ActivityNavigationState>((set) => ({
  navigationTarget: null,
  setNavigationTarget: (target) => set({ navigationTarget: target }),
  navigateToActivity: (activityType: ActivityType, metadata = {}) => {
    switch (activityType) {
      case "message":
        set({ navigationTarget: { type: "main-tab", tab: "communications" } });
        break;
      case "payment":
        set({ navigationTarget: { type: "main-tab", tab: "billing" } });
        break;
      case "new-lead":
        set({ navigationTarget: { type: "main-tab", tab: "smart-leads" } });
        break;
      case "contract":
        // Navigate to specific lead with contract/communications tab
        if (metadata.leadId) {
          set({
            navigationTarget: {
              type: "lead",
              leadId: metadata.leadId,
              initialTab: "communications",
            },
          });
        } else {
          set({ navigationTarget: { type: "main-tab", tab: "smart-leads" } });
        }
        break;
      case "upcoming-event":
        // Navigate to client hub and open specific client
        if (metadata.clientId) {
          set({
            navigationTarget: {
              type: "client",
              clientId: metadata.clientId,
            },
          });
        } else {
          set({ navigationTarget: { type: "main-tab", tab: "client-hub" } });
        }
        break;
      case "generate-proposal":
        // Navigate to specific lead with proposals tab
        if (metadata.leadId) {
          set({
            navigationTarget: {
              type: "lead",
              leadId: metadata.leadId,
              initialTab: "proposals",
            },
          });
        } else {
          set({ navigationTarget: { type: "main-tab", tab: "smart-leads" } });
        }
        break;
      case "send-messages":
        // Navigate to specific lead with communications tab
        if (metadata.leadId) {
          set({
            navigationTarget: {
              type: "lead",
              leadId: metadata.leadId,
              initialTab: "communications",
            },
          });
        } else {
          set({ navigationTarget: { type: "main-tab", tab: "communications" } });
        }
        break;
      case "review-pricing":
        // Navigate to billing tab
        set({ navigationTarget: { type: "main-tab", tab: "billing" } });
        break;
      default:
        set({ navigationTarget: null });
    }
  },
  clearNavigation: () => set({ navigationTarget: null }),
}));

