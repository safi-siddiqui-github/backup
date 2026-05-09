"use client";

import { useVendorNavigationStore } from "@/lib/lib-vendor-navigation-store";
import LeadCard from "./LeadCard";
import { Lead } from "./mockLeads";

interface LeadsListProps {
  leads: Lead[];
  allLeads: Lead[];
  onChat: (leadId: string) => void;
  onAccept: (leadId: string) => void;
  onReject: (leadId: string) => void;
}

export default function LeadsList({
  leads,
  allLeads,
  onChat,
  onAccept,
  onReject,
}: LeadsListProps) {
  const { leadToOpen } = useVendorNavigationStore();
  if (leads.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 sm:py-12 dark:text-gray-400">
        <p className="text-sm sm:text-base">No leads found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          allLeads={allLeads}
          onChat={() => onChat(lead.id)}
          onAccept={() => onAccept(lead.id)}
          onReject={() => onReject(lead.id)}
        />
      ))}
    </div>
  );
}
