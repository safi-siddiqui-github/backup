"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_PROPOSALS, MOCK_VENDORS } from "@/data/mockBudgetData";
import { VendorProfile } from "@/types/budget";
import {
  Calculator,
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  Handshake,
  Lock,
  MessageSquare,
  Store,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import BudgetAnalyticsDashboard from "./BudgetAnalyticsDashboard";
import CommunicationHub from "./CommunicationHub";
import CompactAIExpensePlanner from "./CompactAIExpensePlanner";
import EnhancedVendorMarketplaceHub from "./EnhancedVendorMarketplaceHub";
import ProposalManagementCenter from "./ProposalManagementCenter";
import VendorManagementHub from "./VendorManagementHub";
import VendorPaymentCenter from "./VendorPaymentCenter";

interface ComprehensiveBudgetModuleProps {
  eventId: string;
  eventType: string;
  eventSize: number;
  eventDate: Date;
  onBack?: () => void;
}

export interface BudgetExpenseItem {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  estimatedCost: number;
  allocatedBudget: number;
  actualCost: number;
  priority: "high" | "medium" | "low";
  status:
    | "planning"
    | "rfp_sent"
    | "proposals_received"
    | "vendor_selected"
    | "contracted"
    | "completed";
  aiSuggested: boolean;
  requirements?: string;
  deadline?: Date;
  vendorRequirements?: {
    experience: string;
    portfolio: boolean;
    insurance: boolean;
    references: boolean;
  };
}

export interface Proposal {
  id: string;
  vendorId: string;
  expenseItemId: string;
  title: string;
  description: string;
  totalCost: number;
  breakdown: {
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  timeline: string;
  deliverables: string[];
  terms: string;
  validUntil: Date;
  status: "pending" | "under_review" | "accepted" | "declined" | "negotiating";
  submittedAt: Date;
  attachments?: string[];
  paymentSchedule?: {
    milestone: string;
    percentage: number;
    amount: number;
    dueDate: Date;
  }[];
  confidence: number;
}

const ComprehensiveBudgetModule = ({
  eventId,
  eventType,
  eventSize,
  eventDate,
  onBack,
}: ComprehensiveBudgetModuleProps) => {
  const [activeTab, setActiveTab] = useState("planner");
  const [expenseItems, setExpenseItems] = useState<BudgetExpenseItem[]>([]);
  const [vendors, setVendors] = useState<VendorProfile[]>(MOCK_VENDORS);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [totalBudget, setTotalBudget] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false);
  const [commitDate, setCommitDate] = useState<Date | null>(null);

  // Calculate budget statistics
  const allocatedBudget = expenseItems.reduce(
    (sum, item) => sum + item.allocatedBudget,
    0,
  );
  const estimatedCost = expenseItems.reduce(
    (sum, item) => sum + item.estimatedCost,
    0,
  );
  const actualCost = expenseItems.reduce(
    (sum, item) => sum + item.actualCost,
    0,
  );
  const acceptedProposals = proposals.filter((p) => p.status === "accepted");
  const proposalCost = acceptedProposals.reduce(
    (sum, proposal) => sum + proposal.totalCost,
    0,
  );
  const pendingProposals = proposals.filter(
    (p) => p.status === "pending",
  ).length;

  const remainingBudget = totalBudget - allocatedBudget;

  const addExpenseItem = (item: Omit<BudgetExpenseItem, "id">) => {
    if (isCommitted) return;
    const newItem: BudgetExpenseItem = {
      id: Date.now().toString(),
      ...item,
      actualCost: 0,
    };
    setExpenseItems([...expenseItems, newItem]);
  };

  const updateExpenseItem = (
    id: string,
    updates: Partial<BudgetExpenseItem>,
  ) => {
    if (isCommitted) return;
    setExpenseItems((items) =>
      items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteExpenseItem = (id: string) => {
    if (isCommitted) return;
    setExpenseItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCommitBudget = () => {
    setIsCommitted(true);
    setCommitDate(new Date());
  };

  const handleUncommitBudget = () => {
    setIsCommitted(false);
    setCommitDate(null);
  };

  const handleQuickDemoSetup = () => {
    // Set demo budget if not set
    if (totalBudget === 0) {
      setTotalBudget(35000);
    }
    // Automatically commit the budget
    setIsCommitted(true);
    setCommitDate(new Date());
    // Switch to proposals tab to show the results
    setActiveTab("proposals");
  };

  const handleAcceptProposal = (proposalId: string) => {
    setProposals((proposals) =>
      proposals.map((proposal) =>
        proposal.id === proposalId
          ? { ...proposal, status: "accepted" as const }
          : proposal,
      ),
    );

    const proposal = proposals.find((p) => p.id === proposalId);
    if (proposal) {
      updateExpenseItem(proposal.expenseItemId, {
        status: "contracted",
        actualCost: proposal.totalCost,
      });
    }
  };

  const canCommitBudget = totalBudget > 0 && expenseItems.length > 0;

  const LockedStateMessage = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div className="py-12 text-center">
      <Lock className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      <h3 className="mb-2 text-lg font-medium text-gray-600">{title}</h3>
      <p className="mb-6 text-gray-500">{description}</p>

      <Card className="mx-auto max-w-md border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="mb-4 text-sm text-blue-800">
            <div className="mb-2 font-medium">To access this feature:</div>
            <div className="space-y-1 text-left">
              <div>1. Go to the Budget tab</div>
              <div>2. Set your total budget</div>
              <div>3. Add expense items</div>
              <div>4. Click &quot;Commit Budget&quot;</div>
            </div>
          </div>
          <Button
            onClick={handleQuickDemoSetup}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Zap className="mr-2 h-4 w-4" />
            Quick Demo Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex-1 overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex h-full flex-col"
      >
        {/* Header */}
        <div className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                Comprehensive Budget Management
                {isCommitted && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Committed
                  </Badge>
                )}
                {!isCommitted && expenseItems.length > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700"
                  >
                    <Lock className="mr-1 h-3 w-3" />
                    Draft
                  </Badge>
                )}
              </h1>
              <p className="text-gray-600">
                {isCommitted
                  ? `Budget committed on ${commitDate?.toLocaleDateString()} - Vendors can now submit proposals`
                  : "AI-powered planning, vendor marketplace, and payment management"}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700"
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  {eventType}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700"
                >
                  <Users className="mr-1 h-3 w-3" />
                  {eventSize} guests
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  {eventDate.toLocaleDateString()}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Budget</div>
              <div className="text-3xl font-bold text-green-600">
                {totalBudget > 0
                  ? `$${totalBudget.toLocaleString()}`
                  : "Not Set"}
              </div>
              <div className="text-sm text-gray-500">
                {totalBudget > 0
                  ? `$${remainingBudget.toLocaleString()} remaining`
                  : "Set a budget to continue"}
              </div>
              {canCommitBudget && !isCommitted && (
                <Button
                  onClick={handleCommitBudget}
                  className="mt-2 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Commit Budget
                </Button>
              )}
              {isCommitted && (
                <Button
                  onClick={handleUncommitBudget}
                  variant="outline"
                  className="mt-2 border-orange-600 text-orange-600 hover:bg-orange-50"
                  size="sm"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Uncommit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="border-b bg-white px-6 py-3">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {expenseItems.length}
              </div>
              <div className="text-xs text-gray-600">Expense Items</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                ${allocatedBudget.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Planned</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                ${actualCost.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Actual Cost</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {acceptedProposals.length}
              </div>
              <div className="text-xs text-gray-600">Vendors Selected</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                {pendingProposals}
              </div>
              <div className="text-xs text-gray-600">Pending Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">
                {totalBudget > 0
                  ? Math.round((allocatedBudget / totalBudget) * 100)
                  : 0}
                %
              </div>
              <div className="text-xs text-gray-600">Budget Used</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <TabsList className="mb-6 grid w-full grid-cols-7">
            <TabsTrigger
              value="planner"
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Budget
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="flex items-center gap-2"
              disabled={!isCommitted}
            >
              <Store className="h-4 w-4" />
              Marketplace
              {!isCommitted && <Lock className="ml-1 h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger
              value="proposals"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Proposals ({proposals.length})
            </TabsTrigger>
            <TabsTrigger
              value="vendor-management"
              className="flex items-center gap-2"
              disabled={!isCommitted}
            >
              <Handshake className="h-4 w-4" />
              Vendor Mgmt
              {!isCommitted && <Lock className="ml-1 h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="flex items-center gap-2"
              disabled={!isCommitted}
            >
              <MessageSquare className="h-4 w-4" />
              Messages
              {!isCommitted && <Lock className="ml-1 h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex items-center gap-2"
              disabled={!isCommitted}
            >
              <CreditCard className="h-4 w-4" />
              Payments
              {!isCommitted && <Lock className="ml-1 h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="planner"
            className="mt-0 h-full"
          >
            <CompactAIExpensePlanner
              eventType={eventType}
              eventSize={eventSize}
              eventDate={eventDate}
              totalBudget={totalBudget}
              expenseItems={expenseItems}
              isCommitted={isCommitted}
              onAddExpenseItem={addExpenseItem}
              onUpdateExpenseItem={updateExpenseItem}
              onDeleteExpenseItem={deleteExpenseItem}
              onTotalBudgetChange={setTotalBudget}
              onCommitBudget={handleCommitBudget}
            />
          </TabsContent>

          <TabsContent
            value="marketplace"
            className="mt-0 flex-1"
          >
            {isCommitted ? (
              <EnhancedVendorMarketplaceHub
                expenseItems={expenseItems}
                vendors={vendors}
                onContactVendor={(vendorId, message) =>
                  console.log("Contact vendor:", vendorId, message)
                }
                onRequestProposal={(requestData) =>
                  console.log("Request proposal:", requestData)
                }
              />
            ) : (
              <LockedStateMessage
                title="Marketplace Access Restricted"
                description="Commit your budget first to browse and contact vendors in the marketplace"
              />
            )}
          </TabsContent>

          <TabsContent
            value="proposals"
            className="mt-0 flex-1"
          >
            {isCommitted ? (
              <ProposalManagementCenter
                expenseItems={expenseItems}
                proposals={proposals}
                vendors={vendors}
                onAcceptProposal={handleAcceptProposal}
                onDeclineProposal={(proposalId) => {
                  setProposals((proposals) =>
                    proposals.map((p) =>
                      p.id === proposalId
                        ? { ...p, status: "declined" as const }
                        : p,
                    ),
                  );
                }}
                onNegotiateProposal={(proposalId) => {
                  setProposals((proposals) =>
                    proposals.map((p) =>
                      p.id === proposalId
                        ? { ...p, status: "negotiating" as const }
                        : p,
                    ),
                  );
                }}
              />
            ) : (
              <LockedStateMessage
                title="Proposals Available After Budget Commitment"
                description="Vendors can only submit proposals once your budget is committed and visible to the marketplace"
              />
            )}
          </TabsContent>

          <TabsContent
            value="vendor-management"
            className="mt-0 flex-1"
          >
            {isCommitted ? (
              <VendorManagementHub
                vendors={vendors}
                acceptedProposals={acceptedProposals}
                onContactVendor={(vendorId, message) =>
                  console.log("Contact vendor:", vendorId, message)
                }
                onProcessPayment={(proposalId, amount) =>
                  console.log("Process payment:", proposalId, amount)
                }
              />
            ) : (
              <LockedStateMessage
                title="Vendor Management Unavailable"
                description="Access vendor management tools after committing your budget and selecting vendors"
              />
            )}
          </TabsContent>

          <TabsContent
            value="communication"
            className="mt-0 flex-1"
          >
            {isCommitted ? (
              <CommunicationHub
                vendors={vendors}
                proposals={proposals}
                onSendMessage={(vendorId, message) =>
                  console.log("Send message:", vendorId, message)
                }
              />
            ) : (
              <LockedStateMessage
                title="Communication Hub Locked"
                description="Start communicating with vendors after committing your budget and receiving proposals"
              />
            )}
          </TabsContent>

          <TabsContent
            value="payments"
            className="mt-0 flex-1"
          >
            {isCommitted ? (
              <VendorPaymentCenter
                acceptedProposals={acceptedProposals}
                vendors={vendors}
                onProcessPayment={(proposalId, amount) =>
                  console.log("Process payment:", proposalId, amount)
                }
              />
            ) : (
              <LockedStateMessage
                title="Payment Center Restricted"
                description="Process vendor payments after accepting proposals and finalizing contracts"
              />
            )}
          </TabsContent>

          <TabsContent
            value="analytics"
            className="mt-0 flex-1"
          >
            <BudgetAnalyticsDashboard
              expenseItems={expenseItems}
              proposals={proposals}
              vendors={vendors}
              totalBudget={totalBudget}
              actualCost={actualCost}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ComprehensiveBudgetModule;
