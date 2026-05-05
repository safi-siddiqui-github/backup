"use client";

import { useState } from "react";
import { Vendor } from "../../vendor-mgmt-tab/VendorListView";
import { Proposal } from "../ProposalsListView";
import ProposalCard from "../ProposalCard";
import ProposalDetailModal from "../ProposalDetailModal";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { toast } from "sonner";

interface VendorProposalsTabContentProps {
  vendor: Vendor;
}

// Generate mock proposals from vendor data
const generateMockProposals = (vendor: Vendor): Proposal[] => {
  // Create a proposal based on vendor's events, projects, and milestones
  const proposals: Proposal[] = [];
  
  // Collect all milestones from all projects in all events
  const allMilestones = vendor.events?.flatMap(event => 
    event.projects.flatMap(project => project.milestones || [])
  ) || [];
  
  // Get the first milestone's dates if available
  const firstMilestone = allMilestones[0];
  const firstDueDate = allMilestones.find(m => m.dueDate)?.dueDate;
  const firstStartDate = allMilestones.find(m => m.startDate)?.startDate;
  
  // Calculate total from milestones or use vendor totalValue
  const calculatedTotal = allMilestones.reduce((sum, m) => sum + (m.amount || 0), 0) || vendor.totalValue;
  
  // Main proposal with version tracking
  const mainProposal: Proposal = {
    id: `proposal-${vendor.id}`,
    vendorName: vendor.name,
    vendorCompany: vendor.name,
    category: vendor.category,
    totalCost: vendor.totalValue,
    budget: vendor.totalValue * 0.9, // Assume budget is 90% of total
    status: vendor.status === "active" ? "hired" : vendor.status === "pending" ? "pending" : vendor.status === "completed" ? "hired" : "shortlisted",
    rating: vendor.rating,
    isNew: false,
    description: `Complete ${vendor.category.toLowerCase()} services with comprehensive milestone tracking and deliverables`,
    timeline: `${allMilestones.length} milestones over project duration`,
    validUntil: firstDueDate || "31/12/2025",
    submitted: firstStartDate || "01/10/2025",
    costBreakdown: allMilestones.length > 0 
      ? allMilestones.map((milestone) => ({
          item: milestone.title,
          quantity: 1,
          unitPrice: milestone.amount || calculatedTotal / allMilestones.length,
          total: milestone.amount || calculatedTotal / allMilestones.length,
        }))
      : [{
          item: "Service Package",
          quantity: 1,
          unitPrice: vendor.totalValue,
          total: vendor.totalValue,
        }],
    deliverables: allMilestones.flatMap(m => m.deliverables || []).slice(0, 5),
    termsAndConditions: `Standard terms and conditions apply. Payment schedule aligned with milestone completion. All deliverables subject to client approval.`,
    paymentSchedule: allMilestones
      .filter(m => m.payment?.amount)
      .map((milestone) => ({
        milestone: milestone.title,
        percentage: Math.round((milestone.payment!.amount / vendor.totalValue) * 100),
        amount: milestone.payment!.amount,
        date: milestone.dueDate || "",
      })),
    version: 1,
    editedBy: "vendor",
    editedAt: firstStartDate || new Date().toISOString(),
  };

  proposals.push(mainProposal);

  return proposals;
};

export default function VendorProposalsTabContent({ vendor }: VendorProposalsTabContentProps) {
  const [proposals, setProposals] = useState<Proposal[]>(generateMockProposals(vendor));
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [archivingProposal, setArchivingProposal] = useState<Proposal | null>(null);

  // Sort proposals by date (newest first)
  const sortedProposals = [...proposals].sort((a, b) => {
    return new Date(b.submitted).getTime() - new Date(a.submitted).getTime();
  });

  const handleStatusChange = (proposalId: string, newStatus: Proposal["status"]) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposalId ? { ...p, status: newStatus } : p
      )
    );
    setSelectedProposal(null);
  };

  const handleEditProposal = (proposalId: string, updatedData: Partial<Proposal>) => {
    const originalProposal = proposals.find((p) => p.id === proposalId);
    if (!originalProposal) return;

    // Create a new version of the proposal (v2)
    const newVersion: Proposal = {
      ...originalProposal,
      ...updatedData,
      id: `proposal-${Date.now()}`,
      version: (originalProposal.version || 1) + 1,
      parentProposalId: originalProposal.parentProposalId || originalProposal.id,
      editedBy: "host",
      editedAt: new Date().toISOString(),
      isNew: true,
    };

    // Add the new version at the top
    setProposals([newVersion, ...proposals]);
    setSelectedProposal(null);
    
    toast.success("Proposal Updated", {
      description: `A new version (v${newVersion.version}) of the proposal has been created.`,
      duration: 3000,
    });
  };

  const handleArchive = (proposal: Proposal) => {
    setArchivingProposal(proposal);
  };

  const handleConfirmArchive = () => {
    if (archivingProposal) {
      handleStatusChange(archivingProposal.id, "archived");
      toast.success("Proposal Archived", {
        description: `${archivingProposal.vendorName}'s proposal has been moved to the Archived tab.`,
        duration: 3000,
      });
      setArchivingProposal(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Header - No Create Button for Host */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-xl font-semibold">Proposal History</h2>
      </div>

      {/* Proposals List - Scrollable section */}
      <div className="space-y-4 touch-pan-y pb-8">
        {sortedProposals.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="text-lg font-semibold text-muted-foreground">
                No proposal found
              </p>
              <p className="text-sm text-muted-foreground">
                Proposal will appear here once vendors submit them
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 touch-pan-y pb-80 overflow-y-auto h-[calc(100vh-200px)] pr-2">
            {sortedProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onViewDetails={() => setSelectedProposal(proposal)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <ProposalDetailModal
          proposal={selectedProposal}
          open={!!selectedProposal}
          onOpenChange={(open) => !open && setSelectedProposal(null)}
          onStatusChange={handleStatusChange}
          onSaveEdit={handleEditProposal}
        />
      )}

      {/* Archive Confirmation Dialog */}
      <ConfirmationDialog
        open={!!archivingProposal}
        onOpenChange={(open) => !open && setArchivingProposal(null)}
        onConfirm={handleConfirmArchive}
        title="Archive Proposal?"
        description={
          archivingProposal
            ? `Are you sure you want to archive ${archivingProposal.vendorName}'s proposal? This will move the proposal to the Archived tab.`
            : ""
        }
        confirmText="Archive Proposal"
        variant="warning"
      />
    </div>
  );
}

