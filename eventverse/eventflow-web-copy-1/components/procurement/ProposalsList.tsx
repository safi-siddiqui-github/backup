"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  MessageSquare,
  MoreVertical,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import MessageDialog from "../vendor/dialogs/MessageDialog";
import ProposalDetailsDialog from "./ProposalDetailsDialog";
import type { Proposal, Requirement } from "./types";
import VendorProfileDialog from "./VendorProfileDialog";

interface ProposalsListProps {
  requirement: Requirement;
  proposals: Proposal[];
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
  onContactVendor: (proposal: Proposal) => void;
  onBack: () => void;
}

const ProposalsList = ({
  requirement,
  proposals,
  onAcceptProposal,
  onDeclineProposal,
  onContactVendor,
  onBack,
}: ProposalsListProps) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );
  const [showVendorProfile, setShowVendorProfile] = useState(false);
  const [showProposalDetails, setShowProposalDetails] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const getStatusColor = (status: Proposal["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "negotiating":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProposals = proposals.filter((proposal) => {
    if (selectedTab === "all") return true;
    return proposal.status === selectedTab;
  });

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setShowVendorProfile(true);
  };

  const handleViewProposalDetails = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setShowVendorProfile(false);
    setShowProposalDetails(true);
  };

  const handleContactVendor = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setShowMessageDialog(true);
    onContactVendor(proposal);
  };

  const handleNegotiate = (proposalId: string, counterOffer: number) => {
    console.log(
      `Negotiating proposal ${proposalId} with counter offer: $${counterOffer}`,
    );
    // In real app, this would send negotiation to backend
  };

  const renderProposal = (proposal: Proposal) => (
    <Card
      key={proposal.id}
      className="mb-4 cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => handleProposalClick(proposal)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <h4 className="font-medium">{proposal.vendorName}</h4>
              </div>
              <Badge className={getStatusColor(proposal.status)}>
                {proposal.status.replace("_", " ")}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-yellow-600">
                <Star className="h-3 w-3 fill-current" />
                <span>4.8</span>
              </div>
            </div>

            <p className="mb-3 text-sm text-gray-600">{proposal.description}</p>

            <div className="mb-3 flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1 font-medium text-green-600">
                <DollarSign className="h-3 w-3" />$
                {proposal.priceQuote.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {proposal.deliveryTimeline}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Submitted: {format(proposal.submittedAt, "MMM d, yyyy")}
              </span>
            </div>

            {proposal.notes && (
              <div className="rounded bg-gray-50 p-2 text-sm">
                <strong>Vendor Notes:</strong> {proposal.notes}
              </div>
            )}
          </div>

          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProposalDetails(proposal);
              }}
            >
              <Eye className="mr-1 h-4 w-4" />
              Details
            </Button>

            {proposal.status === "submitted" && (
              <>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAcceptProposal(proposal.id);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeclineProposal(proposal.id);
                  }}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  Decline
                </Button>
              </>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleContactVendor(proposal);
              }}
            >
              <MessageSquare className="mr-1 h-4 w-4" />
              Contact
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleContactVendor(proposal)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Vendor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleProposalClick(proposal)}>
                  <User className="mr-2 h-4 w-4" />
                  View Vendor Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleViewProposalDetails(proposal)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Proposal Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
          >
            ← Back to Requirements
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          {proposals.length} proposal{proposals.length !== 1 ? "s" : ""}{" "}
          received
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{requirement.title}</span>
            <div className="text-sm font-normal text-gray-600">
              Budget: ${requirement.budgetAllocated.toLocaleString()}
            </div>
          </CardTitle>
          <p className="text-sm text-gray-600">{requirement.description}</p>
        </CardHeader>
      </Card>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList>
          <TabsTrigger value="all">All ({proposals.length})</TabsTrigger>
          <TabsTrigger value="submitted">
            New ({proposals.filter((p) => p.status === "submitted").length})
          </TabsTrigger>
          <TabsTrigger value="under_review">
            Under Review (
            {proposals.filter((p) => p.status === "under_review").length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({proposals.filter((p) => p.status === "accepted").length})
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined ({proposals.filter((p) => p.status === "declined").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value={selectedTab}
          className="space-y-4"
        >
          {filteredProposals.length > 0 ? (
            <div className="space-y-4">
              <div className="mb-4 text-sm text-gray-600">
                Click on any proposal to view vendor profile and details
              </div>
              {filteredProposals.map(renderProposal)}
            </div>
          ) : (
            <div className="py-8 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-600">
                No proposals found
              </h3>
              <p className="text-gray-500">
                {selectedTab === "all"
                  ? "No vendors have submitted proposals yet"
                  : `No proposals with status: ${selectedTab.replace("_", " ")}`}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Vendor Profile Dialog */}
      <VendorProfileDialog
        proposal={selectedProposal}
        open={showVendorProfile}
        onOpenChange={setShowVendorProfile}
        onContactVendor={handleContactVendor}
        onViewProposalDetails={handleViewProposalDetails}
      />

      {/* Proposal Details Dialog */}
      <ProposalDetailsDialog
        proposal={selectedProposal}
        open={showProposalDetails}
        onOpenChange={setShowProposalDetails}
        onAcceptProposal={onAcceptProposal}
        onDeclineProposal={onDeclineProposal}
        onContactVendor={handleContactVendor}
        onNegotiate={handleNegotiate}
      />

      {/* Message Dialog */}
      {selectedProposal && (
        <MessageDialog
          open={showMessageDialog}
          onOpenChange={setShowMessageDialog}
        >
          <div />
        </MessageDialog>
      )}
    </div>
  );
};

export default ProposalsList;
