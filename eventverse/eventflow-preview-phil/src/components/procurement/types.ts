
export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: string;
  budgetAllocated: number;
  specifications: string;
  quantity: number;
  deadline: Date;
  status: "draft" | "published" | "bidding" | "evaluation" | "awarded" | "completed";
  hostId: string;
  createdAt: Date;
  attachments?: string[];
  specialInstructions?: string;
  deliveryLocation?: string;
}

export interface Proposal {
  id: string;
  requirementId: string;
  vendorId: string;
  vendorName: string;
  priceQuote: number;
  deliveryTimeline: string;
  description: string;
  status: "submitted" | "under_review" | "accepted" | "declined" | "negotiating";
  submittedAt: Date;
  attachments?: string[];
  notes?: string;
  counterOffers?: CounterOffer[];
  costBreakdown?: ProposalLineItem[];
  deliverables?: string[];
}

export interface ProposalLineItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface NegotiationLineItemEdit {
  originalItem: ProposalLineItem;
  proposedItem: ProposalLineItem;
  reason: string;
}

export interface NegotiationDeliverableEdit {
  type: 'original' | 'modified' | 'added' | 'removed';
  originalText?: string;
  proposedText: string;
  reason: string;
}

export interface DetailedNegotiationData {
  proposalId: string;
  counterOffer?: number;
  lineItemEdits: NegotiationLineItemEdit[];
  deliverableEdits: NegotiationDeliverableEdit[];
  timelineChanges?: string;
  additionalRequests?: string;
  message: string;
}

export interface CounterOffer {
  id: string;
  fromVendor: boolean;
  priceQuote: number;
  message: string;
  createdAt: Date;
}

export interface VendorBid {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  proposal: Proposal;
  communicationThread: Message[];
}

export interface Message {
  id: string;
  fromVendor: boolean;
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export interface ProcurementSummary {
  totalRequirements: number;
  totalProposals: number;
  totalAwarded: number;
  budgetAllocated: number;
  actualCost: number;
  savings: number;
}
