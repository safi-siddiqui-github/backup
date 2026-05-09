
export interface EventBudgetCategory {
  id: string;
  name: string;
  plannedAmount: number;
  actualSpent: number;
  committed: number;
  color: string;
  priority: 'high' | 'medium' | 'low';
  eventType: string;
  subcategories: BudgetSubcategory[];
  vendors: VendorAssignment[];
  paymentSchedule: PaymentMilestone[];
}

export interface BudgetSubcategory {
  id: string;
  name: string;
  plannedAmount: number;
  actualSpent: number;
  description?: string;
}

export interface VendorAssignment {
  vendorId: string;
  categoryId: string;
  proposalId?: string;
  status: 'invited' | 'proposed' | 'negotiating' | 'contracted' | 'completed';
  contractValue?: number;
}

export interface PaymentMilestone {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue';
  vendorId?: string;
}

export interface VendorProposal {
  id: string;
  vendorId: string;
  categoryId: string;
  eventId: string;
  title: string;
  description: string;
  totalAmount: number;
  breakdown: ProposalLineItem[];
  validUntil: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  submittedAt: Date;
  notes?: string;
  attachments?: string[];
}

export interface ProposalLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface VendorProfile {
  id: string;
  name: string;
  category: string;
  subcategories: string[];
  description: string;
  location: string;
  badge?: 'top-rated' | 'host-favorite' | 'rising-star';
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  rating: number;
  reviewCount: number;
  portfolio: string[];
  services: string[];
  priceRange: 'budget' | 'mid-range' | 'premium' | 'luxury';
  availability: {
    busy: Date[];
    available: Date[];
  };
  verified: boolean;
  responseTime: string;
  completedEvents: number;
  certifications: string[];
  insurance: boolean;
  specialties: string[];
  yearEstablished: number;
  teamSize: number;
  awards: string[];
  sponsored?: boolean;
  sponsoredUntil?: Date;
  sponsoredCategories?: string[];
}

export interface BudgetTemplate {
  eventType: string;
  categories: {
    name: string;
    percentage: number;
    priority: 'high' | 'medium' | 'low';
    subcategories: string[];
  }[];
}

export interface SmartSuggestion {
  type: 'category' | 'vendor' | 'budget' | 'payment';
  title: string;
  description: string;
  confidence: number;
  action?: () => void;
}

export interface MilestoneDeliverable {
  id: string;
  description: string;
  completed: boolean;
  completedDate?: Date;
}

export interface ExpenseMilestone {
  id: string;
  name: string;
  description?: string;
  paymentAmount: number;
  dueDate: Date;
  deliverables: MilestoneDeliverable[];
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completedDate?: Date;
}

export interface MilestoneAdjustment {
  milestoneId: string;
  originalMilestone: ExpenseMilestone;
  proposedMilestone: ExpenseMilestone;
  changes: string[];
  reason: string;
}
