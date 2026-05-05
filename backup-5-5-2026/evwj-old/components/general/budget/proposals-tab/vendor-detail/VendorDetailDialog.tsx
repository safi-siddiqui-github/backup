"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Vendor } from "../../vendor-mgmt-tab/VendorListView";
import { cn } from "@/lib/utils";
import VendorOverviewTabContent from "./VendorOverviewTabContent";
import VendorCommunicationsTabContent from "./VendorCommunicationsTabContent";
import VendorProposalsTabContent from "./VendorProposalsTabContent";

interface VendorDetailDialogProps {
  vendor: Vendor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: string;
}

export default function VendorDetailDialog({
  vendor,
  open,
  onOpenChange,
  initialTab = "overview",
}: VendorDetailDialogProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update activeTab when initialTab prop changes
  useEffect(() => {
    if (open && initialTab) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  if (!vendor) return null;

  const statusConfig = {
    active: {
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      label: "active",
    },
    pending: {
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      label: "pending",
    },
    completed: {
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      label: "completed",
    },
    blocked: {
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      label: "blocked",
    },
  };

  const status = statusConfig[vendor.status];

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
                {vendor.name}
              </DialogTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {vendor.category} • {vendor.activeEvents} Active Event{vendor.activeEvents !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge
                variant="secondary"
                className={cn("text-xs px-3 py-1", status.className)}
              >
                {status.label}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{vendor.rating} rating</span>
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
              <VendorOverviewTabContent vendor={vendor} />
            </TabsContent>

            <TabsContent value="communications" className="mt-0 flex-1 min-h-0 max-h-full flex flex-col ">
              <VendorCommunicationsTabContent vendor={vendor} />
            </TabsContent>

            <TabsContent value="proposals" className="mt-4 flex-1 min-h-0 flex flex-col">
              <div 
                className="h-full overflow-y-auto overflow-x-hidden pr-2 -mr-2 md:pr-0 md:mr-0" 
              >
                <VendorProposalsTabContent vendor={vendor} />
              </div>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

