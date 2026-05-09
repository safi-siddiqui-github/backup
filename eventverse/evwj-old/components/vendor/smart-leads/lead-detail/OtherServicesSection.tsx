"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package } from "lucide-react";
import { Lead, RelatedService } from "../mockLeads";
import { cn } from "@/lib/utils";

interface OtherServicesSectionProps {
  relatedServices: RelatedService[];
  allLeads: Lead[];
  onServiceClick: (leadId: string) => void;
}

export default function OtherServicesSection({
  relatedServices,
  allLeads,
  onServiceClick,
}: OtherServicesSectionProps) {
  if (!relatedServices || relatedServices.length === 0) {
    return null;
  }

  // Find the full lead data for each related service
  const relatedLeads = relatedServices
    .map((service) => allLeads.find((lead) => lead.id === service.leadId))
    .filter((lead): lead is Lead => lead !== undefined);

  if (relatedLeads.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Other Services Needed for This Event
        </h3>
      </div>

      <div className="space-y-3">
        {relatedLeads.map((relatedLead) => (
          <div
            key={relatedLead.id}
            onClick={() => onServiceClick(relatedLead.id)}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
              "hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-primary",
              "border-gray-200 dark:border-gray-700"
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {relatedLead.serviceType}
                </span>
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5"
                >
                  {relatedLead.category}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {relatedLead.description}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Budget: <span className="font-semibold">{relatedLead.price}</span>
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    relatedLead.status === "new" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
                    relatedLead.status === "contacted" && "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
                    relatedLead.status === "quoted" && "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
                    relatedLead.status === "won" && "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300",
                    relatedLead.status === "lost" && "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300"
                  )}
                >
                  {relatedLead.status}
                </Badge>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0 ml-3" />
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        Click on a service to view its details and manage separately
      </p>
    </div>
  );
}
