
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  FileText, 
  Users, 
  TrendingUp,
  ArrowLeft,
  Plus,
  Search,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import RequirementsList from "./RequirementsList";
import RequirementForm from "./RequirementForm";
import ProposalsList from "./ProposalsList";
import type { Requirement, Proposal, ProcurementSummary } from "./types";

interface ProcurementModuleProps {
  onBack?: () => void;
}

const ProcurementModule = ({ onBack }: ProcurementModuleProps) => {
  const [activeTab, setActiveTab] = useState("requirements");
  const [showRequirementForm, setShowRequirementForm] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [viewingProposals, setViewingProposals] = useState<Requirement | null>(null);

  // Sample data - in real app this would come from a backend
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      title: "Wedding Photography Services",
      description: "Professional wedding photography for 8-hour coverage including ceremony and reception",
      category: "Photography",
      budgetAllocated: 3000,
      specifications: "Must include 2 photographers, edited photos delivered within 4 weeks, minimum 500 edited photos",
      quantity: 1,
      deadline: new Date("2024-02-15"),
      status: "bidding",
      hostId: "host1",
      createdAt: new Date("2024-01-15"),
      deliveryLocation: "Grand Ballroom, 123 Main St"
    },
    {
      id: "2", 
      title: "Catering Services for 150 Guests",
      description: "Full catering service including appetizers, main course, dessert and beverages",
      category: "Catering",
      budgetAllocated: 8000,
      specifications: "3-course meal, vegetarian and gluten-free options, professional wait staff",
      quantity: 150,
      deadline: new Date("2024-02-10"),
      status: "evaluation",
      hostId: "host1",
      createdAt: new Date("2024-01-10")
    }
  ]);

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "1",
      requirementId: "1",
      vendorId: "vendor1",
      vendorName: "Elite Photography Studio",
      priceQuote: 2800,
      deliveryTimeline: "Photos delivered within 3 weeks",
      description: "Award-winning wedding photographers with 10+ years experience. Package includes engagement session.",
      status: "submitted",
      submittedAt: new Date("2024-01-18"),
      notes: "We offer a complimentary engagement session and can provide additional hours if needed."
    },
    {
      id: "2",
      requirementId: "1", 
      vendorId: "vendor2",
      vendorName: "Moments Photography",
      priceQuote: 3200,
      deliveryTimeline: "Photos delivered within 2 weeks",
      description: "Professional wedding photography with cinematic style and same-day preview gallery.",
      status: "submitted",
      submittedAt: new Date("2024-01-19")
    },
    {
      id: "3",
      requirementId: "2",
      vendorId: "vendor3", 
      vendorName: "Gourmet Catering Co",
      priceQuote: 7500,
      deliveryTimeline: "Setup 2 hours before event",
      description: "Premium catering with locally sourced ingredients and award-winning chefs.",
      status: "accepted",
      submittedAt: new Date("2024-01-12")
    }
  ]);

  const categories = ["Photography", "Catering", "Venue", "Entertainment", "Decorations", "Transportation", "Other"];

  const handleAddRequirement = (requirementData: Partial<Requirement>) => {
    const newRequirement: Requirement = {
      id: Date.now().toString(),
      title: requirementData.title || "",
      description: requirementData.description || "",
      category: requirementData.category || "",
      budgetAllocated: requirementData.budgetAllocated || 0,
      specifications: requirementData.specifications || "",
      quantity: requirementData.quantity || 1,
      deadline: requirementData.deadline || new Date(),
      status: "draft",
      hostId: "host1",
      createdAt: new Date(),
      specialInstructions: requirementData.specialInstructions,
      deliveryLocation: requirementData.deliveryLocation
    };
    setRequirements([...requirements, newRequirement]);
    setShowRequirementForm(false);
  };

  const handleUpdateRequirement = (id: string, updates: Partial<Requirement>) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, ...updates } : req
    ));
    setEditingRequirement(null);
    setShowRequirementForm(false);
  };

  const handleDeleteRequirement = (id: string) => {
    setRequirements(requirements.filter(req => req.id !== id));
  };

  const handleAcceptProposal = (proposalId: string) => {
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId ? { ...proposal, status: "accepted" as const } : proposal
    ));
    
    // Update requirement status
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      setRequirements(requirements.map(req => 
        req.id === proposal.requirementId ? { ...req, status: "awarded" as const } : req
      ));
    }
  };

  const handleDeclineProposal = (proposalId: string) => {
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId ? { ...proposal, status: "declined" as const } : proposal
    ));
  };

  const handleContactVendor = (proposal: Proposal) => {
    console.log("Contact vendor:", proposal.vendorName);
    // This would open a communication interface
  };

  // Calculate summary stats
  const totalBudget = requirements.reduce((sum, req) => sum + req.budgetAllocated, 0);
  const acceptedProposals = proposals.filter(p => p.status === "accepted");
  const actualCost = acceptedProposals.reduce((sum, proposal) => sum + proposal.priceQuote, 0);
  const savings = totalBudget - actualCost;

  const summary: ProcurementSummary = {
    totalRequirements: requirements.length,
    totalProposals: proposals.length,
    totalAwarded: acceptedProposals.length,
    budgetAllocated: totalBudget,
    actualCost,
    savings
  };

  if (viewingProposals) {
    const requirementProposals = proposals.filter(p => p.requirementId === viewingProposals.id);
    return (
      <div className="h-full flex flex-col">
        <ProposalsList
          requirement={viewingProposals}
          proposals={requirementProposals}
          onAcceptProposal={handleAcceptProposal}
          onDeclineProposal={handleDeclineProposal}
          onContactVendor={handleContactVendor}
          onBack={() => setViewingProposals(null)}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <Package className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Vendor Procurement</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{summary.totalRequirements} requirements</span>
              <span>{summary.totalProposals} proposals</span>
              <span className="text-green-600">${summary.savings.toLocaleString()} saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{summary.totalRequirements}</div>
          <div className="text-xs text-gray-600">Total Requirements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{summary.totalProposals}</div>
          <div className="text-xs text-gray-600">Proposals Received</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{summary.totalAwarded}</div>
          <div className="text-xs text-gray-600">Awarded</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${summary.savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summary.savings.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Budget Savings</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requirements" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Requirements
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Vendor Board
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="flex-1 mt-4">
            <RequirementsList
              requirements={requirements}
              onAddRequirement={() => setShowRequirementForm(true)}
              onEditRequirement={(req) => {
                setEditingRequirement(req);
                setShowRequirementForm(true);
              }}
              onDeleteRequirement={handleDeleteRequirement}
              onViewProposals={setViewingProposals}
              categories={categories}
            />
          </TabsContent>

          <TabsContent value="vendors" className="flex-1 mt-4">
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Public Vendor Board</h3>
              <p className="text-gray-500 mb-4">This will show a public-facing board where vendors can browse and bid on requirements</p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 mt-4">
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Procurement Analytics</h3>
              <p className="text-gray-500 mb-4">Detailed analytics and reporting on procurement performance</p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Requirement Form Dialog */}
      {showRequirementForm && (
        <RequirementForm
          requirement={editingRequirement || undefined}
          onSave={editingRequirement ? 
            (updates) => handleUpdateRequirement(editingRequirement.id, updates) : 
            handleAddRequirement
          }
          onClose={() => {
            setShowRequirementForm(false);
            setEditingRequirement(null);
          }}
          isEditing={!!editingRequirement}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ProcurementModule;
