
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  Search, 
  Filter,
  Grid,
  List,
  Clock,
  CheckCircle
} from "lucide-react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";
import VendorRelationshipCard from "./VendorRelationshipCard";
import VendorDetailView from "./VendorDetailView";
import ContractManagement from "./ContractManagement";
import VendorTimelineTracker from "./VendorTimelineTracker";
import VendorPaymentSchedule from "./VendorPaymentSchedule";
import VendorCommunicationCenter from "./VendorCommunicationCenter";

export interface VendorContract {
  id: string;
  vendorId: string;
  proposalId: string;
  status: 'draft' | 'pending_signature' | 'signed' | 'active' | 'completed' | 'terminated';
  signedDate?: Date;
  startDate: Date;
  completionDate: Date;
  value: number;
  terms: string;
  deliverables: string[];
  documents: string[];
  amendments: {
    id: string;
    date: Date;
    description: string;
    valueChange?: number;
  }[];
}

export interface VendorMilestone {
  id: string;
  vendorId: string;
  contractId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  dependencies?: string[];
}

export interface VendorCommunication {
  id: string;
  vendorId: string;
  type: 'email' | 'call' | 'meeting' | 'message';
  subject: string;
  content: string;
  date: Date;
  sender: 'host' | 'vendor';
  attachments?: string[];
}

export interface VendorDocument {
  id: string;
  vendorId: string;
  name: string;
  type: 'contract' | 'proposal' | 'invoice' | 'receipt' | 'image' | 'report' | 'other';
  fileType: string;
  size: number;
  uploadedBy: 'host' | 'vendor';
  uploadedDate: Date;
  viewedBy?: Array<'host' | 'vendor'>;
  lastViewed?: {
    host?: Date;
    vendor?: Date;
  };
  relatedTo?: string;
  status?: 'draft' | 'final' | 'pending_review' | 'approved';
  description?: string;
  url: string;
  tags?: string[];
}

export interface TopicMessage {
  id: string;
  topicId: string;
  sender: 'host' | 'vendor';
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  reactions?: {
    emoji: string;
    count: number;
  }[];
}

export interface CommunicationTopic {
  id: string;
  vendorId: string;
  title: string;
  category: 'contract' | 'planning' | 'logistics' | 'payment' | 'general';
  createdBy: 'host' | 'vendor';
  createdAt: Date;
  lastMessageAt: Date;
  messageCount: number;
  unreadCount: number;
  status: 'active' | 'resolved' | 'archived';
  messages: TopicMessage[];
}

interface VendorManagementHubProps {
  vendors: VendorProfile[];
  acceptedProposals: Proposal[];
  onContactVendor: (vendorId: string, message: string) => void;
  onProcessPayment: (proposalId: string, amount: number) => void;
}

const VendorManagementHub = ({
  vendors,
  acceptedProposals,
  onContactVendor,
  onProcessPayment
}: VendorManagementHubProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(null);

  // Mock data for contracts, milestones, and communications
  const contracts: VendorContract[] = acceptedProposals.map(proposal => ({
    id: `contract-${proposal.id}`,
    vendorId: proposal.vendorId,
    proposalId: proposal.id,
    status: 'active',
    signedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    value: proposal.totalCost,
    terms: "Standard service agreement with milestone payments",
    deliverables: proposal.deliverables,
    documents: [`contract-${proposal.id}.pdf`, `proposal-${proposal.id}.pdf`],
    amendments: []
  }));

  const milestones: VendorMilestone[] = contracts.flatMap(contract => [
    {
      id: `milestone-${contract.id}-1`,
      vendorId: contract.vendorId,
      contractId: contract.id,
      title: "Initial Setup",
      description: "Begin service setup and initial preparations",
      dueDate: new Date(contract.startDate.getTime() + 3 * 24 * 60 * 60 * 1000),
      status: 'pending',
      priority: 'high'
    },
    {
      id: `milestone-${contract.id}-2`,
      vendorId: contract.vendorId,
      contractId: contract.id,
      title: "Mid-point Review",
      description: "Review progress and make adjustments",
      dueDate: new Date(contract.startDate.getTime() + 14 * 24 * 60 * 60 * 1000),
      status: 'pending',
      priority: 'medium'
    },
    {
      id: `milestone-${contract.id}-3`,
      vendorId: contract.vendorId,
      contractId: contract.id,
      title: "Final Delivery",
      description: "Complete service delivery",
      dueDate: contract.completionDate,
      status: 'pending',
      priority: 'high'
    }
  ]);

  const communications: VendorCommunication[] = contracts.map(contract => ({
    id: `comm-${contract.id}`,
    vendorId: contract.vendorId,
    type: 'email',
    subject: 'Contract Confirmation',
    content: 'Thank you for accepting our proposal. Looking forward to working with you!',
    date: contract.signedDate || new Date(),
    sender: 'vendor'
  }));

  // Mock communication topics data
  const communicationTopics: CommunicationTopic[] = contracts.flatMap(contract => {
    const vendor = vendors.find(v => v.id === contract.vendorId);
    return [
      {
        id: `topic-contract-${contract.id}`,
        vendorId: contract.vendorId,
        title: 'Contract Terms Discussion',
        category: 'contract',
        createdBy: 'host',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        messageCount: 5,
        unreadCount: 1,
        status: 'active',
        messages: [
          {
            id: `msg-1-${contract.id}`,
            topicId: `topic-contract-${contract.id}`,
            sender: 'host',
            senderName: 'You',
            content: 'Can you clarify the payment terms in section 3?',
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            attachments: []
          },
          {
            id: `msg-2-${contract.id}`,
            topicId: `topic-contract-${contract.id}`,
            sender: 'vendor',
            senderName: vendor?.name || 'Vendor',
            content: 'Of course! The payment is split into three milestones: 30% deposit, 40% at mid-point, and 30% upon completion.',
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            attachments: [
              {
                name: 'Payment_Schedule.pdf',
                url: '/documents/payment-schedule.pdf',
                type: 'pdf'
              }
            ]
          },
          {
            id: `msg-3-${contract.id}`,
            topicId: `topic-contract-${contract.id}`,
            sender: 'host',
            senderName: 'You',
            content: 'Perfect, that makes sense. Thank you for the detailed breakdown!',
            timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
            attachments: []
          },
          {
            id: `msg-4-${contract.id}`,
            topicId: `topic-contract-${contract.id}`,
            sender: 'vendor',
            senderName: vendor?.name || 'Vendor',
            content: 'You\'re welcome! Let me know if you have any other questions.',
            timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
            attachments: []
          },
          {
            id: `msg-5-${contract.id}`,
            topicId: `topic-contract-${contract.id}`,
            sender: 'host',
            senderName: 'You',
            content: 'One more thing - can we adjust the completion date to be 2 weeks later?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            attachments: []
          }
        ]
      },
      {
        id: `topic-planning-${contract.id}`,
        vendorId: contract.vendorId,
        title: 'Event Planning & Setup',
        category: 'planning',
        createdBy: 'vendor',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        messageCount: 3,
        unreadCount: 0,
        status: 'active',
        messages: [
          {
            id: `msg-p1-${contract.id}`,
            topicId: `topic-planning-${contract.id}`,
            sender: 'vendor',
            senderName: vendor?.name || 'Vendor',
            content: 'I wanted to discuss the setup timeline. When would be the best time to arrive for setup?',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            attachments: []
          },
          {
            id: `msg-p2-${contract.id}`,
            topicId: `topic-planning-${contract.id}`,
            sender: 'host',
            senderName: 'You',
            content: 'You can arrive the day before, around 2 PM. The venue will be available then.',
            timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            attachments: []
          },
          {
            id: `msg-p3-${contract.id}`,
            topicId: `topic-planning-${contract.id}`,
            sender: 'vendor',
            senderName: vendor?.name || 'Vendor',
            content: 'Great! That gives us plenty of time. I\'ve attached the setup plan for your review.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            attachments: [
              {
                name: 'Setup_Plan.pdf',
                url: '/documents/setup-plan.pdf',
                type: 'pdf'
              }
            ]
          }
        ]
      }
    ];
  });

  // Mock documents data
  const vendorDocuments: VendorDocument[] = contracts.flatMap(contract => [
    // Contract document (viewed)
    {
      id: `doc-contract-${contract.id}`,
      vendorId: contract.vendorId,
      name: `Service_Contract_${contract.id}.pdf`,
      type: 'contract',
      fileType: 'pdf',
      size: 2548000,
      uploadedBy: 'host',
      uploadedDate: contract.signedDate || new Date(),
      viewedBy: ['host', 'vendor'],
      lastViewed: {
        host: new Date(),
        vendor: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      relatedTo: contract.id,
      status: 'final',
      description: 'Final signed service contract with terms and conditions',
      url: `/documents/contract-${contract.id}.pdf`,
      tags: ['legal', 'contract']
    },
    // Proposal document (unopened by host)
    {
      id: `doc-proposal-${contract.proposalId}`,
      vendorId: contract.vendorId,
      name: `Proposal_${contract.proposalId}.pdf`,
      type: 'proposal',
      fileType: 'pdf',
      size: 1850000,
      uploadedBy: 'vendor',
      uploadedDate: new Date(contract.signedDate!.getTime() - 7 * 24 * 60 * 60 * 1000),
      viewedBy: ['vendor'],
      lastViewed: {
        vendor: new Date(contract.signedDate!.getTime() - 7 * 24 * 60 * 60 * 1000)
      },
      relatedTo: contract.proposalId,
      status: 'approved',
      description: 'Initial service proposal with pricing and deliverables',
      url: `/documents/proposal-${contract.proposalId}.pdf`,
      tags: ['proposal', 'pricing']
    },
    // Invoice (viewed)
    {
      id: `doc-invoice-${contract.id}`,
      vendorId: contract.vendorId,
      name: `Invoice_${contract.id}_Initial.pdf`,
      type: 'invoice',
      fileType: 'pdf',
      size: 450000,
      uploadedBy: 'vendor',
      uploadedDate: new Date(),
      viewedBy: ['host', 'vendor'],
      lastViewed: {
        host: new Date(Date.now() - 1 * 60 * 60 * 1000),
        vendor: new Date()
      },
      relatedTo: contract.id,
      status: 'pending_review',
      description: 'Initial deposit invoice',
      url: `/documents/invoice-${contract.id}.pdf`,
      tags: ['invoice', 'payment']
    },
    // Sample image (unopened by host)
    {
      id: `doc-image-${contract.id}`,
      vendorId: contract.vendorId,
      name: `Setup_Preview_${contract.id}.jpg`,
      type: 'image',
      fileType: 'jpg',
      size: 3200000,
      uploadedBy: 'vendor',
      uploadedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      viewedBy: ['vendor'],
      relatedTo: contract.id,
      description: 'Preview of proposed setup and layout',
      url: `/documents/image-${contract.id}.jpg`,
      tags: ['preview', 'visual']
    },
    // Report (viewed)
    {
      id: `doc-report-${contract.id}`,
      vendorId: contract.vendorId,
      name: `Progress_Report_${contract.id}.pdf`,
      type: 'report',
      fileType: 'pdf',
      size: 850000,
      uploadedBy: 'vendor',
      uploadedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      viewedBy: ['host'],
      lastViewed: {
        host: new Date(Date.now() - 30 * 60 * 1000)
      },
      relatedTo: contract.id,
      status: 'draft',
      description: 'Weekly progress report and updates',
      url: `/documents/report-${contract.id}.pdf`,
      tags: ['progress', 'report']
    }
  ]);

  // Get contracted vendors (those with accepted proposals)
  const contractedVendors = vendors.filter(vendor => 
    acceptedProposals.some(proposal => proposal.vendorId === vendor.id)
  );

  // Filter vendors based on search and status
  const filteredVendors = contractedVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    
    const vendorContracts = contracts.filter(c => c.vendorId === vendor.id);
    const matchesStatus = vendorContracts.some(c => c.status === statusFilter);
    
    return matchesSearch && matchesStatus;
  });

  // Calculate overview statistics
  const totalContractValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const overdueMilestones = milestones.filter(m => 
    m.status === 'overdue' || (m.status === 'pending' && m.dueDate < new Date())
  ).length;
  const upcomingDeadlines = milestones.filter(m => 
    m.dueDate >= new Date() && m.dueDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;

  // If a vendor is selected, show the detail view
  if (selectedVendor) {
    const vendorContracts = contracts.filter(c => c.vendorId === selectedVendor.id);
    const vendorMilestones = milestones.filter(m => m.vendorId === selectedVendor.id);
    const vendorTopics = communicationTopics.filter(t => t.vendorId === selectedVendor.id);
    const vendorDocs = vendorDocuments.filter(d => d.vendorId === selectedVendor.id);

    return (
      <VendorDetailView
        vendor={selectedVendor}
        contracts={vendorContracts}
        milestones={vendorMilestones}
        topics={vendorTopics}
        documents={vendorDocs}
        onBack={() => setSelectedVendor(null)}
        onContactVendor={onContactVendor}
        onProcessPayment={onProcessPayment}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Vendor Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Vendors</span>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendors Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {filteredVendors.map(vendor => {
              const vendorContracts = contracts.filter(c => c.vendorId === vendor.id);
              const vendorMilestones = milestones.filter(m => m.vendorId === vendor.id);
              const vendorCommunications = communications.filter(c => c.vendorId === vendor.id);
              
              return (
                <VendorRelationshipCard
                  key={vendor.id}
                  vendor={vendor}
                  contracts={vendorContracts}
                  milestones={vendorMilestones}
                  communications={vendorCommunications}
                  onContactVendor={onContactVendor}
                  onViewDetails={() => setSelectedVendor(vendor)}
                  viewMode={viewMode}
                />
              );
            })}
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No vendors found</h3>
              <p className="text-gray-500">
                {contractedVendors.length === 0 
                  ? "No vendors have been contracted yet" 
                  : "Try adjusting your search criteria"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorManagementHub;
