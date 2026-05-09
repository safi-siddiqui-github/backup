"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ComprehensiveBudgetModule from "./budget/ComprehensiveBudgetModule";

interface BudgetModuleProps {
  eventId?: string;
  eventType?: string;
  eventSize?: number;
  onBack?: () => void;
}

const BudgetModule = ({
  eventId = "demo-event",
  eventType = "Wedding",
  eventSize = 100,
  onBack,
}: BudgetModuleProps) => {
  const eventDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days from now

  return (
    <div className="flex h-full flex-col">
      {/* Integration Notice */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Enhanced with AI-Powered Vendor Portal Integration
            </p>
            <p className="text-xs text-purple-100">
              Seamless communication and automated workflows with your vendors
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            asChild
          >
            <a
              href="/vendor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Vendor Portal
            </a>
          </Button>
        </div>
      </div>

      <ComprehensiveBudgetModule
        eventId={eventId}
        eventType={eventType}
        eventSize={eventSize}
        eventDate={eventDate}
        onBack={onBack}
      />
    </div>
  );
};

export default BudgetModule;
