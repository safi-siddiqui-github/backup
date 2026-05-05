"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadStatus } from "./mockLeads";

interface LeadCounts {
  new: number;
  contacted: number;
  quoted: number;
  won: number;
  lost: number;
}

interface LeadStatusTabsProps {
  activeStatusTab: LeadStatus;
  onStatusChange: (status: LeadStatus) => void;
  leadCounts: LeadCounts;
  children: React.ReactNode;
}

export default function LeadStatusTabs({
  activeStatusTab,
  onStatusChange,
  leadCounts,
  children,
}: LeadStatusTabsProps) {
  return (
    <Tabs
      className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] border rounded-xl shadow-sm p-1 sm:p-2"
      value={activeStatusTab}
      onValueChange={(value) => onStatusChange(value as LeadStatus)}
    >
      <div className="overflow-x-auto sm:overflow-visible -mx-1 sm:mx-0">
        <TabsList className="flex sm:grid sm:grid-cols-5 w-full h-auto gap-2 sm:gap-2 min-w-max sm:min-w-0 px-1 sm:px-0 bg-transparent">
          <TabsTrigger
            value="new"
            className="text-xs sm:text-sm px-4 sm:px-3 py-2 sm:py-1.5 whitespace-nowrap shrink-0"
          >
            New ({leadCounts.new})
          </TabsTrigger>
          <TabsTrigger
            value="contacted"
            className="text-xs sm:text-sm px-4 sm:px-3 py-2 sm:py-1.5 whitespace-nowrap shrink-0"
          >
            Contacted ({leadCounts.contacted})
          </TabsTrigger>
          <TabsTrigger
            value="quoted"
            className="text-xs sm:text-sm px-4 sm:px-3 py-2 sm:py-1.5 whitespace-nowrap shrink-0"
          >
            Sent Proposal ({leadCounts.quoted})
          </TabsTrigger>
          <TabsTrigger
            value="won"
            className="text-xs sm:text-sm px-4 sm:px-3 py-2 sm:py-1.5 whitespace-nowrap shrink-0"
          >
            Won ({leadCounts.won})
          </TabsTrigger>
          <TabsTrigger
            value="lost"
            className="text-xs sm:text-sm px-4 sm:px-3 py-2 sm:py-1.5 whitespace-nowrap shrink-0"
          >
            Lost ({leadCounts.lost})
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={activeStatusTab} className="mt-4 sm:mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}

