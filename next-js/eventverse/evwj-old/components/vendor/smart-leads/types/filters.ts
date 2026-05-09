export interface LeadFilters {
  priority: "all" | "high" | "medium" | "low";
  distance: "all" | string;
  budgetRange: "all" | string;
  guestCount: "all" | string;
  categories: string[];
  serviceTypes: string[];
  eventDateFrom: string;
  eventDateTo: string;
  matchScore: "all" | string;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: LeadFilters;
  isSystem: boolean;
}

export type SortField = "eventDate" | "createdDate" | "budget" | "guestCount" | "matchScore" | "distance";
export type SortDirection = "asc" | "desc";

export const DEFAULT_FILTERS: LeadFilters = {
  priority: "all",
  distance: "all",
  budgetRange: "all",
  guestCount: "all",
  categories: [],
  serviceTypes: [],
  eventDateFrom: "",
  eventDateTo: "",
  matchScore: "all",
};

export const SYSTEM_PRESETS: FilterPreset[] = [
  {
    id: "high-budget",
    name: "High Budget",
    filters: {
      ...DEFAULT_FILTERS,
      budgetRange: "$25k+",
    },
    isSystem: true,
  },
  {
    id: "local-only",
    name: "Local Only",
    filters: {
      ...DEFAULT_FILTERS,
      distance: "25",
    },
    isSystem: true,
  },
  {
    id: "hot-leads",
    name: "Hot Leads",
    filters: {
      ...DEFAULT_FILTERS,
      priority: "high",
      matchScore: "85",
    },
    isSystem: true,
  },
  {
    id: "weddings",
    name: "Weddings",
    filters: {
      ...DEFAULT_FILTERS,
      categories: ["Wedding"],
    },
    isSystem: true,
  },
  {
    id: "corporate-events",
    name: "Corporate Events",
    filters: {
      ...DEFAULT_FILTERS,
      categories: ["Corporate"],
    },
    isSystem: true,
  },
  {
    id: "large-events",
    name: "Large Events",
    filters: {
      ...DEFAULT_FILTERS,
      guestCount: "200+",
    },
    isSystem: true,
  },
];

