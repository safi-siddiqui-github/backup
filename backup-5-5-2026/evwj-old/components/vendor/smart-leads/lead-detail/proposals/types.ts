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
  // Version tracking fields
  version?: number;
  parentProposalId?: string; // ID of the original proposal if this is an edited version
  editedBy?: "vendor" | "host";
  editedAt?: string;
}

