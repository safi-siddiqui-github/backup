export type ProposalStatus = "all" | "shortlisted" | "negotiation" | "hired" | "archived";

export interface Proposal {
  id: string;
  vendorName: string;
  vendorCompany: string;
  category: string;
  totalCost: number;
  budget: number;
  status: "pending" | "shortlisted" | "negotiation" | "hired" | "archived";
  rating: number;
  isNew?: boolean;
  isFavorite?: boolean;
  description: string;
  timeline: string;
  validUntil: string;
  submitted: string;
  costBreakdown: {
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  deliverables: string[];
  termsAndConditions: string;
  paymentSchedule: {
    milestone: string;
    percentage: number;
    amount: number;
    date: string;
  }[];
}

export interface ProposalsFiltersState {
  selectedCategories: string[];
  minRating: number;
  priceRange: [number, number];
  showOnlyNew: boolean;
  showOnlyFavorites: boolean;
}

