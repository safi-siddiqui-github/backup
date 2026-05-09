"use client";

import ProposalsListView from "./ProposalsListView";
import { Lead } from "../../mockLeads";

interface ProposalsTabContentProps {
  lead: Lead;
}

export default function ProposalsTabContent({ lead }: ProposalsTabContentProps) {
  return <ProposalsListView initialProposals={lead.proposals} />;
}

