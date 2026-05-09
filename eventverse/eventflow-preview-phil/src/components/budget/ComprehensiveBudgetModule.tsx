import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  Calculator,
  Store,
  MessageSquare,
  FileText,
  CreditCard,
  Users,
  TrendingUp,
  Sparkles,
  Target,
  Handshake,
  Calendar,
  Lock,
  CheckCircle,
  Zap
} from "lucide-react";
import AIExpensePlanner from "./AIExpensePlanner";
import EnhancedVendorMarketplaceHub from "./EnhancedVendorMarketplaceHub";
import ProposalManagementCenter from "./ProposalManagementCenter";
import CommunicationHub from "./CommunicationHub";
import VendorPaymentCenter from "./VendorPaymentCenter";
import BudgetAnalyticsDashboard from "./BudgetAnalyticsDashboard";
import VendorManagementHub from "./VendorManagementHub";
import { EVENT_TEMPLATES, MOCK_VENDORS, MOCK_PROPOSALS, WEDDING_EXPENSE_ITEMS } from "@/data/mockBudgetData";
import { VendorProfile } from "@/types/budget";
import CompactAIExpensePlanner from "./CompactAIExpensePlanner";

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
  priority: 'high' | 'medium' | 'low';
  status: 'planning' | 'rfp_sent' | 'proposals_received' | 'vendor_selected' | 'contracted' | 'completed';
  aiSuggested: boolean;
  requirements?: string;
  deadline?: Date;
  vendorRequirements?: {
    experience: string;
    portfolio: boolean;
    insurance: boolean;
    references: boolean;
  };
  milestones?: Array<{
    id: string;
    name: string;
    description?: string;
    paymentAmount: number;
    dueDate: Date;
    deliverables: Array<{
      id: string;
      description: string;
      completed: boolean;
      completedDate?: Date;
    }>;
    status: 'pending' | 'in_progress' | 'completed' | 'overdue';
    completedDate?: Date;
  }>;
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
  status: 'pending' | 'under_review' | 'accepted' | 'declined' | 'negotiating';
  submittedAt: Date;
  attachments?: string[];
  paymentSchedule?: {
    milestone: string;
    percentage: number;
    amount: number;
    dueDate: Date;
  }[];
  viewed?: boolean;
  shortlisted?: boolean;
  archived?: boolean;
  viewedAt?: Date;
}

const ComprehensiveBudgetModule = ({
  eventId,
  eventType,
  eventSize,
  eventDate,
  onBack
}: ComprehensiveBudgetModuleProps) => {
  const [activeTab, setActiveTab] = useState("planner");
  const [expenseItems, setExpenseItems] = useState<BudgetExpenseItem[]>([]);
  const [vendors, setVendors] = useState<VendorProfile[]>(MOCK_VENDORS);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [totalBudget, setTotalBudget] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false);
  const [commitDate, setCommitDate] = useState<Date | null>(null);
  const [pendingMessageVendor, setPendingMessageVendor] = useState<{
    vendorId: string;
    proposalId: string;
  } | null>(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  // Calculate budget statistics
  const allocatedBudget = expenseItems.reduce((sum, item) => sum + item.allocatedBudget, 0);
  const estimatedCost = expenseItems.reduce((sum, item) => sum + item.estimatedCost, 0);
  const actualCost = expenseItems.reduce((sum, item) => sum + item.actualCost, 0);
  const acceptedProposals = proposals.filter(p => p.status === 'accepted');
  const proposalCost = acceptedProposals.reduce((sum, proposal) => sum + proposal.totalCost, 0);
  const pendingProposals = proposals.filter(p => p.status === 'pending').length;
  
  const remainingBudget = totalBudget - allocatedBudget;

  const addExpenseItem = (item: Omit<BudgetExpenseItem, 'id'>) => {
    if (isCommitted) return;
    const newItem: BudgetExpenseItem = {
      id: Date.now().toString(),
      actualCost: 0,
      ...item
    };
    setExpenseItems([...expenseItems, newItem]);
  };

  const updateExpenseItem = (id: string, updates: Partial<BudgetExpenseItem>) => {
    if (isCommitted) return;
    setExpenseItems(items => 
      items.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const deleteExpenseItem = (id: string) => {
    if (isCommitted) return;
    setExpenseItems(items => items.filter(item => item.id !== id));
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

  const handleMessageVendor = (vendorId: string, proposalId: string) => {
    // Store which vendor/proposal we want to message
    setPendingMessageVendor({ vendorId, proposalId });
    
    // Switch to messages tab
    setActiveTab("communication");
    
    // Update proposal status to 'negotiating' if it's currently 'pending'
    setProposals(prevProposals => 
      prevProposals.map(p => 
        p.id === proposalId && p.status === 'pending'
          ? { ...p, status: 'negotiating' }
          : p
      )
    );
  };

  const handleAcceptProposal = (proposalId: string) => {
    setProposals(proposals => 
      proposals.map(proposal => 
        proposal.id === proposalId 
          ? { ...proposal, status: 'accepted' as const }
          : proposal
      )
    );
    
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      updateExpenseItem(proposal.expenseItemId, { 
        status: 'contracted',
        actualCost: proposal.totalCost 
      });
    }
  };

  const canCommitBudget = totalBudget > 0 && expenseItems.length > 0;

  const LockedStateMessage = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center py-12">
      <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      
      <Card className="max-w-md mx-auto bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="text-sm text-blue-800 mb-4">
            <div className="font-medium mb-2">To access this feature:</div>
            <div className="space-y-1 text-left">
              <div>1. Go to the Budget tab</div>
              <div>2. Set your total budget</div>
              <div>3. Add expense items</div>
              <div>4. Click "Commit Budget"</div>
            </div>
          </div>
          <Button 
            onClick={handleQuickDemoSetup}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Quick Demo Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex-1 overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-sm text-gray-600">Committed Budget</div>
                <div className="text-xl font-bold text-gray-900">
                  {totalBudget > 0 ? `$${totalBudget.toLocaleString()}` : 'Not Set'}
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <div className="text-sm text-gray-600">Event Date</div>
                <div className="text-xl font-bold text-gray-900">
                  {eventDate.toLocaleDateString()}
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <div className="text-sm text-gray-600">Guests</div>
                <div className="text-xl font-bold text-gray-900">
                  {eventSize}
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <div className="text-sm text-gray-600">Event Type</div>
                <div className="text-xl font-bold text-gray-900">
                  {eventType}
                </div>
              </div>
            </div>
            <div>
              {canCommitBudget && !isCommitted && (
                <Button 
                  onClick={handleCommitBudget}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Commit Budget
                </Button>
              )}
              {isCommitted && (
                <Button 
                  onClick={handleUncommitBudget}
                  variant="outline"
                  className="mt-2 text-orange-600 border-orange-600 hover:bg-orange-50"
                  size="sm"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Uncommit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="bg-white border-b px-6 py-3">
          <div className="grid grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{expenseItems.length}</div>
              <div className="text-xs text-gray-600">Expense Items</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">${allocatedBudget.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Planned</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">${actualCost.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Actual Cost</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{acceptedProposals.length}</div>
              <div className="text-xs text-gray-600">Vendors Selected</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{pendingProposals}</div>
              <div className="text-xs text-gray-600">Pending Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">
                {totalBudget > 0 ? Math.round((allocatedBudget / totalBudget) * 100) : 0}%
              </div>
              <div className="text-xs text-gray-600">Budget Used</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2" disabled={!isCommitted}>
              <Store className="w-4 h-4" />
              Marketplace
              {!isCommitted && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="proposals" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Proposals ({proposals.length})
            </TabsTrigger>
            <TabsTrigger value="vendor-management" className="flex items-center gap-2" disabled={!isCommitted}>
              <Handshake className="w-4 h-4" />
              Vendor Mgmt
              {!isCommitted && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2 relative" disabled={!isCommitted}>
              <MessageSquare className="w-4 h-4" />
              Messages
              {unreadMessageCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white h-5 min-w-[20px] px-1.5 rounded-full">
                  {unreadMessageCount}
                </Badge>
              )}
              {!isCommitted && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2" disabled={!isCommitted}>
              <CreditCard className="w-4 h-4" />
              Payments
              {!isCommitted && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="mt-0 h-full">
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

          <TabsContent value="marketplace" className="flex-1 mt-0">
            {isCommitted ? (
              <EnhancedVendorMarketplaceHub
                expenseItems={expenseItems}
                vendors={vendors}
                onContactVendor={(vendorId, message) => console.log('Contact vendor:', vendorId, message)}
                onRequestProposal={(requestData) => console.log('Request proposal:', requestData)}
              />
            ) : (
              <LockedStateMessage
                title="Marketplace Access Restricted"
                description="Commit your budget first to browse and contact vendors in the marketplace"
              />
            )}
          </TabsContent>

          <TabsContent value="proposals" className="flex-1 mt-0">
            {isCommitted ? (
              <ProposalManagementCenter
                expenseItems={expenseItems}
                proposals={proposals}
                vendors={vendors}
                onAcceptProposal={handleAcceptProposal}
                onDeclineProposal={(proposalId) => {
                  setProposals(proposals => 
                    proposals.map(p => p.id === proposalId ? { ...p, status: 'declined' as const } : p)
                  );
                }}
                onNegotiateProposal={(proposalId) => {
                  setProposals(proposals => 
                    proposals.map(p => p.id === proposalId ? { ...p, status: 'negotiating' as const } : p)
                  );
                }}
                onShortlistProposal={(proposalId) => {
                  setProposals(proposals => 
                    proposals.map(p => p.id === proposalId ? { ...p, shortlisted: !p.shortlisted } : p)
                  );
                }}
                onArchiveProposal={(proposalId) => {
                  setProposals(proposals => 
                    proposals.map(p => p.id === proposalId ? { ...p, archived: true } : p)
                  );
                }}
                onMarkProposalViewed={(proposalId) => {
                  setProposals(proposals => 
                    proposals.map(p => p.id === proposalId && !p.viewed ? { ...p, viewed: true, viewedAt: new Date() } : p)
                  );
                }}
                onMessageVendor={handleMessageVendor}
              />
            ) : (
              <LockedStateMessage
                title="Proposals Available After Budget Commitment"
                description="Vendors can only submit proposals once your budget is committed and visible to the marketplace"
              />
            )}
          </TabsContent>

          <TabsContent value="vendor-management" className="flex-1 mt-0">
            {isCommitted ? (
              <VendorManagementHub
                vendors={vendors}
                acceptedProposals={acceptedProposals}
                onContactVendor={(vendorId, message) => console.log('Contact vendor:', vendorId, message)}
                onProcessPayment={(proposalId, amount) => console.log('Process payment:', proposalId, amount)}
              />
            ) : (
              <LockedStateMessage
                title="Vendor Management Unavailable"
                description="Access vendor management tools after committing your budget and selecting vendors"
              />
            )}
          </TabsContent>

          <TabsContent value="communication" className="flex-1 mt-0">
            {isCommitted ? (
              <CommunicationHub
                vendors={vendors}
                proposals={proposals}
                onSendMessage={(vendorId, message) => console.log('Send message:', vendorId, message)}
                pendingMessageVendor={pendingMessageVendor}
                onUnreadCountChange={setUnreadMessageCount}
              />
            ) : (
              <LockedStateMessage
                title="Communication Hub Locked"
                description="Start communicating with vendors after committing your budget and receiving proposals"
              />
            )}
          </TabsContent>

          <TabsContent value="payments" className="flex-1 mt-0">
            {isCommitted ? (
              <VendorPaymentCenter
                acceptedProposals={acceptedProposals}
                vendors={vendors}
                onProcessPayment={(proposalId, amount) => console.log('Process payment:', proposalId, amount)}
              />
            ) : (
              <LockedStateMessage
                title="Payment Center Restricted"
                description="Process vendor payments after accepting proposals and finalizing contracts"
              />
            )}
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 mt-0">
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
