"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Lead, LeadPriority } from "../mockLeads";
import { cn } from "@/lib/utils";
import OverviewTabContent from "./OverviewTabContent";
import CommunicationsTabContent from "./CommunicationsTabContent";
import ProposalsTabContent from "./proposals/ProposalsTabContent";

interface LeadDetailDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: string;
  allLeads?: Lead[];
  onServiceClick?: (leadId: string) => void;
}

export default function LeadDetailDialog({
  lead,
  open,
  onOpenChange,
  initialTab = "overview",
  allLeads = [],
  onServiceClick = () => {},
}: LeadDetailDialogProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update activeTab when initialTab prop changes or when dialog opens
  useEffect(() => {
    if (open && initialTab) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  if (!lead) return null;

  const priorityConfig = {
    high: {
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      label: "high priority",
    },
    medium: {
      className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      label: "medium priority",
    },
    low: {
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      label: "low priority",
    },
  };

  const priority = priorityConfig[lead.priority];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-6xl! w-[95vw]! h-[95vh]! flex flex-col p-6 overflow-hidden"
      >
        <DialogHeader className="space-y-4 shrink-0 pb-0 mb-0">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {lead.eventTitle}
              </DialogTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Client: {lead.clientName}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge
                variant="secondary"
                className={cn("text-xs px-3 py-1", priority.className)}
              >
                {priority.label}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{lead.matchPercentage}% match</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1 min-h-0 overflow-hidden gap-0">
            <TabsList className="flex w-full shrink-0 flex-wrap sm:grid sm:grid-cols-3 gap-1 sm:gap-0">
              <TabsTrigger value="overview" className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="communications" className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-2">
                Communications
              </TabsTrigger>
              <TabsTrigger value="proposals" className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-2">
                Proposal History
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="overview" className="mt-4 flex-1 min-h-0 flex flex-col overflow-y-auto">
              <OverviewTabContent 
                lead={lead} 
                allLeads={allLeads}
                onServiceClick={onServiceClick}
              />
            </TabsContent>

            <TabsContent value="communications" className="mt-0 flex-1 min-h-0 max-h-full flex flex-col ">
              <CommunicationsTabContent lead={lead} />
            </TabsContent>

            <TabsContent value="proposals" className="mt-4 flex-1 min-h-0 flex flex-col">
              <div 
                className="h-full overflow-y-auto overflow-x-hidden pr-2 -mr-2 md:pr-0 md:mr-0" 
              >
                <ProposalsTabContent lead={lead} />
              </div>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

