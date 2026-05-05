"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ProposalCard from "./ProposalCard";
import ProposalDetailModal from "./ProposalDetailModal";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Proposal } from "./types";

export interface ProposalsFiltersState {
  status?: Proposal["status"] | "all";
  category?: string;
  search?: string;
}

interface ProposalsListViewProps {
  initialProposals?: Proposal[];
}

export default function ProposalsListView({ initialProposals }: ProposalsListViewProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [archivingProposal, setArchivingProposal] = useState<Proposal | null>(null);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);

  // Use proposals from lead if available, otherwise use empty array
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals || []);

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

  const handleCreateProposal = () => {
    setIsCreatingProposal(true);
  };

  const handleSaveNewProposal = (proposalData: Partial<Proposal>) => {
    const newProposal: Proposal = {
      id: `proposal-${Date.now()}`,
      vendorName: proposalData.vendorName || "",
      vendorCompany: proposalData.vendorCompany || "",
      category: proposalData.category || "",
      totalCost: proposalData.totalCost || 0,
      budget: proposalData.budget || 0,
      status: "pending",
      rating: 0,
      isNew: true,
      description: proposalData.description || "",
      timeline: proposalData.timeline || "",
      validUntil: proposalData.validUntil || "",
      submitted: new Date().toISOString().split("T")[0],
      costBreakdown: proposalData.costBreakdown || [],
      deliverables: proposalData.deliverables || [],
      termsAndConditions: proposalData.termsAndConditions || "",
      paymentSchedule: proposalData.paymentSchedule || [],
      version: 1,
      editedBy: "vendor",
      editedAt: new Date().toISOString(),
    };
    
    setProposals([newProposal, ...proposals]);
    setIsCreatingProposal(false);
  };

  const handleEditProposal = (proposalId: string, updatedData: Partial<Proposal>) => {
    const originalProposal = proposals.find((p) => p.id === proposalId);
    if (!originalProposal) return;

    // Create a new version of the proposal
    const newVersion: Proposal = {
      ...originalProposal,
      ...updatedData,
      id: `proposal-${Date.now()}`,
      version: (originalProposal.version || 1) + 1,
      parentProposalId: originalProposal.parentProposalId || originalProposal.id,
      editedBy: "vendor",
      editedAt: new Date().toISOString(),
      isNew: true,
    };

    // Add the new version at the top
    setProposals([newVersion, ...proposals]);
    setSelectedProposal(null);
  };

  // Check if a proposal already exists (only count version 1 proposals)
  const hasProposal = proposals.some((p) => !p.parentProposalId);

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
      {/* Header with Create Button */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-xl font-semibold">Proposal History</h2>
        <Button
          onClick={handleCreateProposal}
          disabled={hasProposal}
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Proposal
        </Button>
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
                Proposal will appear here once created
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

      {/* Create Proposal Modal */}
      {isCreatingProposal && (
        <ProposalDetailModal
          proposal={null}
          open={isCreatingProposal}
          onOpenChange={(open) => !open && setIsCreatingProposal(false)}
          onStatusChange={handleStatusChange}
          onSaveNew={handleSaveNewProposal}
          isCreateMode={true}
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

