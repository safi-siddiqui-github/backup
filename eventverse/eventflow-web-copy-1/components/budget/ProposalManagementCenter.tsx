"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VendorProfile } from "@/types/budget";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  MessageSquare,
  Search,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { BudgetExpenseItem, Proposal } from "./ComprehensiveBudgetModule";
import NegotiationDialog, { NegotiationData } from "./NegotiationDialog";
import ProposalAcceptanceDialog from "./ProposalAcceptanceDialog";
import VendorProfileDialog from "./VendorProfileDialog";

interface ProposalManagementCenterProps {
  expenseItems: BudgetExpenseItem[];
  proposals: Proposal[];
  vendors: VendorProfile[];
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
  onNegotiateProposal: (proposalId: string) => void;
}

const ProposalManagementCenter = ({
  expenseItems,
  proposals,
  vendors,
  onAcceptProposal,
  onDeclineProposal,
  onNegotiateProposal,
}: ProposalManagementCenterProps) => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("all");
  const [budgetItemFilter, setBudgetItemFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAcceptanceDialog, setShowAcceptanceDialog] = useState(false);
  const [showNegotiationDialog, setShowNegotiationDialog] = useState(false);
  const [proposalForAcceptance, setProposalForAcceptance] =
    useState<Proposal | null>(null);
  const [proposalForNegotiation, setProposalForNegotiation] =
    useState<Proposal | null>(null);
  const [showVendorProfile, setShowVendorProfile] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(
    null,
  );

  // Calculate proposal statistics
  const pendingCount = proposals.filter((p) => p.status === "pending").length;
  const underReviewCount = proposals.filter(
    (p) => p.status === "under_review",
  ).length;
  const acceptedCount = proposals.filter((p) => p.status === "accepted").length;
  const negotiatingCount = proposals.filter(
    (p) => p.status === "negotiating",
  ).length;
  const declinedCount = proposals.filter((p) => p.status === "declined").length;
  const acceptedValue = proposals
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + p.totalCost, 0);

  // Get unique budget item categories for filtering
  const budgetItemCategories = Array.from(
    new Set(expenseItems.map((item) => item.category)),
  );

  // Filter proposals based on status, search query, and budget item filter
  const getFilteredProposals = (status: string) => {
    let filtered = proposals;

    console.log("All proposals:", proposals);
    console.log("Filtering by status:", status);

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((p) => p.status === status);
    }

    console.log("After status filter:", filtered);

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => {
        const vendor = getVendorById(p.vendorId);
        const expenseItem = getExpenseItemById(p.expenseItemId);
        return (
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          vendor?.name.toLowerCase().includes(query) ||
          expenseItem?.title.toLowerCase().includes(query) ||
          expenseItem?.category.toLowerCase().includes(query)
        );
      });
    }

    // Filter by budget item category
    if (budgetItemFilter !== "all") {
      filtered = filtered.filter((p) => {
        const expenseItem = getExpenseItemById(p.expenseItemId);
        return expenseItem?.category === budgetItemFilter;
      });
    }

    console.log("Final filtered proposals:", filtered);
    return filtered;
  };

  const getVendorById = (vendorId: string) => {
    return vendors.find((v) => v.id === vendorId);
  };

  const getExpenseItemById = (expenseItemId: string) => {
    // For now, create a mock expense item if not found to prevent filtering issues
    const foundItem = expenseItems.find((item) => item.id === expenseItemId);
    if (!foundItem) {
      // Create a mock expense item based on the expense item ID
      return {
        id: expenseItemId,
        category: "General",
        title: "Budget Item",
        allocatedBudget: 5000,
      };
    }
    return foundItem;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Venue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Catering":
        return "bg-red-100 text-red-800 border-red-200";
      case "Photography":
        return "bg-green-100 text-green-800 border-green-200";
      case "Florals":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Entertainment":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case "Venue":
        return "border-l-blue-500";
      case "Catering":
        return "border-l-red-500";
      case "Photography":
        return "border-l-green-500";
      case "Florals":
        return "border-l-yellow-500";
      case "Entertainment":
        return "border-l-purple-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getStatusColor = (status: Proposal["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
        return "bg-red-100 text-red-800 border-red-200";
      case "negotiating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "under_review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Proposal["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "declined":
        return <XCircle className="h-4 w-4" />;
      case "negotiating":
        return <MessageSquare className="h-4 w-4" />;
      case "under_review":
        return <Eye className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getDaysUntilExpiry = (validUntil: Date) => {
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleVendorClick = (vendorId: string) => {
    const vendor = getVendorById(vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorProfile(true);
    }
  };

  const handleAcceptClick = (proposal: Proposal) => {
    setProposalForAcceptance(proposal);
    setShowAcceptanceDialog(true);
  };

  const handleNegotiateClick = (proposal: Proposal) => {
    setProposalForNegotiation(proposal);
    setShowNegotiationDialog(true);
  };

  const handleConfirmAcceptance = () => {
    if (proposalForAcceptance) {
      onAcceptProposal(proposalForAcceptance.id);
      setShowAcceptanceDialog(false);
      setProposalForAcceptance(null);
    }
  };

  const handleNegotiationSubmit = (negotiationData: NegotiationData) => {
    if (proposalForNegotiation) {
      onNegotiateProposal(proposalForNegotiation.id);
      setShowNegotiationDialog(false);
      setProposalForNegotiation(null);
    }
  };

  const renderProposalCard = (proposal: Proposal) => {
    const vendor = getVendorById(proposal.vendorId);
    const expenseItem = getExpenseItemById(proposal.expenseItemId);
    const daysUntilExpiry = getDaysUntilExpiry(proposal.validUntil);
    const isExpiringSoon = daysUntilExpiry <= 3 && daysUntilExpiry > 0;
    const isExpired = daysUntilExpiry <= 0;

    if (!expenseItem) return null;

    return (
      <Card
        key={proposal.id}
        className={`border-l-4 transition-shadow hover:shadow-md ${getCategoryBorderColor(expenseItem?.category || "General")} ${
          isExpiringSoon
            ? "border-orange-200 bg-orange-50"
            : isExpired
              ? "border-red-200 bg-red-50"
              : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-lg font-semibold">{proposal.title}</h3>
                <Badge
                  className={`${getCategoryColor(expenseItem?.category || "General")} border font-medium`}
                >
                  <Target className="mr-1 h-3 w-3" />
                  {expenseItem?.category || "General"}
                </Badge>
                <Badge className={`${getStatusColor(proposal.status)} border`}>
                  {getStatusIcon(proposal.status)}
                  <span className="ml-1 capitalize">
                    {proposal.status.replace("_", " ")}
                  </span>
                </Badge>
                {isExpiringSoon && (
                  <Badge
                    variant="outline"
                    className="border-orange-600 text-orange-600"
                  >
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Expires in {daysUntilExpiry} days
                  </Badge>
                )}
                {isExpired && (
                  <Badge variant="destructive">
                    <XCircle className="mr-1 h-3 w-3" />
                    Expired
                  </Badge>
                )}
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <span className="text-sm text-gray-600">For:</span>
                  <div className="font-medium">
                    {expenseItem?.title || "Budget Item"}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Vendor:</span>
                  <div className="flex items-center gap-1 font-medium">
                    <button
                      onClick={() => handleVendorClick(proposal.vendorId)}
                      className="flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                      {vendor?.name || "Unknown Vendor"}
                      <ExternalLink className="h-3 w-3" />
                    </button>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-500">
                        {vendor?.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Submitted:</span>
                  <div className="font-medium">
                    {proposal.submittedAt.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Valid Until:</span>
                  <div className="font-medium">
                    {proposal.validUntil.toLocaleDateString()}
                  </div>
                </div>
              </div>

              <p className="mb-4 text-gray-600">{proposal.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{proposal.timeline}</span>
                </div>
              </div>
            </div>

            <div className="ml-6 text-right">
              <div className="mb-2 text-3xl font-bold text-green-600">
                ${proposal.totalCost.toLocaleString()}
              </div>
              <div className="mb-3 text-xs text-gray-500">
                Budget: $
                {(expenseItem?.allocatedBudget || 5000).toLocaleString()}
              </div>
              <div className="mb-3 text-sm">
                {proposal.totalCost > (expenseItem?.allocatedBudget || 5000) ? (
                  <span className="flex items-center gap-1 text-red-600">
                    <TrendingUp className="h-4 w-4" />
                    +$
                    {(
                      proposal.totalCost -
                      (expenseItem?.allocatedBudget || 5000)
                    ).toLocaleString()}{" "}
                    over budget
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-green-600">
                    <TrendingDown className="h-4 w-4" />$
                    {(
                      (expenseItem?.allocatedBudget || 5000) -
                      proposal.totalCost
                    ).toLocaleString()}{" "}
                    under budget
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>
                </Dialog>

                {proposal.status === "pending" && !isExpired && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptClick(proposal)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleNegotiateClick(proposal)}
                    >
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Negotiate
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDeclineProposal(proposal.id)}
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Proposal Overview */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-600 p-2">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">
                Proposal Management Center
              </div>
              <div className="text-sm font-normal text-gray-600">
                Review, compare, and manage vendor proposals with smart
                filtering
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            <div className="rounded-lg border bg-white p-3 text-center">
              <Clock className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
              <div className="font-semibold">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <Eye className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="font-semibold">{underReviewCount}</div>
              <div className="text-sm text-gray-600">Under Review</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <CheckCircle className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <div className="font-semibold">{acceptedCount}</div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <MessageSquare className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="font-semibold">{negotiatingCount}</div>
              <div className="text-sm text-gray-600">In Negotiation</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <DollarSign className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="font-semibold">
                ${acceptedValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Accepted Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All Proposals ({proposals.length})
          </TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedCount})</TabsTrigger>
          <TabsTrigger value="negotiating">
            Negotiating ({negotiatingCount})
          </TabsTrigger>
          <TabsTrigger value="declined">Declined ({declinedCount})</TabsTrigger>
        </TabsList>

        {/* Smart Filtering Controls */}
        <div className="mt-4 mb-6 flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search proposals, vendors, or budget items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select
            value={budgetItemFilter}
            onValueChange={setBudgetItemFilter}
          >
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by budget item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budget Items</SelectItem>
              {budgetItemCategories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Proposal Content */}
        {["all", "pending", "accepted", "negotiating", "declined"].map(
          (status) => (
            <TabsContent
              key={status}
              value={status}
              className="space-y-4"
            >
              {getFilteredProposals(status).length > 0 ? (
                <div className="space-y-4">
                  {getFilteredProposals(status).map(renderProposalCard)}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                  <h3 className="mb-2 text-lg font-medium text-gray-600">
                    No {status === "all" ? "" : status.replace("_", " ")}{" "}
                    proposals found
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery || budgetItemFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : status === "pending"
                        ? "Request proposals from vendors to see them here"
                        : status === "accepted"
                          ? "Accepted proposals will appear here"
                          : "Proposals will appear here when available"}
                  </p>
                </div>
              )}
            </TabsContent>
          ),
        )}
      </Tabs>

      {/* Proposal Details Dialog */}
      {selectedProposal && (
        <Dialog
          open={!!selectedProposal}
          onOpenChange={() => setSelectedProposal(null)}
        >
          <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedProposal.title}
                <Badge
                  className={`${getStatusColor(selectedProposal.status)} border`}
                >
                  {selectedProposal.status.charAt(0).toUpperCase() +
                    selectedProposal.status.slice(1).replace("_", " ")}
                </Badge>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3 font-medium">Proposal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Vendor:</strong>{" "}
                      {getVendorById(selectedProposal.vendorId)?.name}
                    </p>
                    <p>
                      <strong>Total Cost:</strong> $
                      {selectedProposal.totalCost.toLocaleString()}
                    </p>
                    <p>
                      <strong>Timeline:</strong> {selectedProposal.timeline}
                    </p>
                    <p>
                      <strong>Valid Until:</strong>{" "}
                      {selectedProposal.validUntil.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {selectedProposal.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-medium">Terms & Conditions</h4>
                  <p className="text-sm text-gray-700">
                    {selectedProposal.terms}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-medium">Cost Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full rounded-lg border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium">
                          Item
                        </th>
                        <th className="p-3 text-right text-sm font-medium">
                          Quantity
                        </th>
                        <th className="p-3 text-right text-sm font-medium">
                          Unit Price
                        </th>
                        <th className="p-3 text-right text-sm font-medium">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProposal.breakdown.map((item, index) => (
                        <tr
                          key={index}
                          className="border-t"
                        >
                          <td className="p-3 text-sm">{item.item}</td>
                          <td className="p-3 text-right text-sm">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-right text-sm">
                            ${item.unitPrice.toLocaleString()}
                          </td>
                          <td className="p-3 text-right text-sm font-medium">
                            ${item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t bg-gray-50">
                        <td
                          colSpan={3}
                          className="p-3 text-sm font-medium"
                        >
                          Total
                        </td>
                        <td className="p-3 text-right text-sm font-bold">
                          ${selectedProposal.totalCost.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-medium">Deliverables</h4>
                <ul className="space-y-2">
                  {selectedProposal.deliverables.map((deliverable, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProposal.paymentSchedule && (
                <div>
                  <h4 className="mb-3 font-medium">Payment Schedule</h4>
                  <div className="space-y-3">
                    {selectedProposal.paymentSchedule.map(
                      (milestone, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                        >
                          <div>
                            <div className="font-medium">
                              {milestone.milestone}
                            </div>
                            <div className="text-sm text-gray-600">
                              {milestone.percentage}% of total
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              ${milestone.amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {milestone.dueDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {selectedProposal.status === "pending" && (
                <div className="flex justify-end gap-3 border-t pt-4">
                  <Button
                    variant="outline"
                    onClick={() => onDeclineProposal(selectedProposal.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onNegotiateProposal(selectedProposal.id)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Negotiate
                  </Button>
                  <Button
                    onClick={() => onAcceptProposal(selectedProposal.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept Proposal
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Proposal Acceptance Dialog */}
      <ProposalAcceptanceDialog
        open={showAcceptanceDialog}
        onOpenChange={setShowAcceptanceDialog}
        proposal={proposalForAcceptance}
        vendor={
          proposalForAcceptance
            ? (getVendorById(proposalForAcceptance.vendorId) ?? null)
            : null
        }
        onConfirm={handleConfirmAcceptance}
      />

      {/* Negotiation Dialog */}
      <NegotiationDialog
        open={showNegotiationDialog}
        onOpenChange={setShowNegotiationDialog}
        proposal={proposalForNegotiation}
        vendor={
          proposalForNegotiation
            ? (getVendorById(proposalForNegotiation.vendorId) ?? null)
            : null
        }
        onSubmit={handleNegotiationSubmit}
      />

      {/* Vendor Profile Dialog */}
      <VendorProfileDialog
        open={showVendorProfile}
        onOpenChange={setShowVendorProfile}
        vendor={selectedVendor}
        onContactVendor={(vendorId) => console.log("Contact vendor:", vendorId)}
        onRequestProposal={(vendorId) =>
          console.log("Request proposal:", vendorId)
        }
      />
    </div>
  );
};

export default ProposalManagementCenter;
