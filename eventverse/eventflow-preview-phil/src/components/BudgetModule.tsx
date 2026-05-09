import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
  onBack 
}: BudgetModuleProps) => {
  const eventDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days from now

  return (
    <div className="h-full flex flex-col">
      {/* Integration Notice */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <p className="text-sm font-medium">Enhanced with AI-Powered Vendor Portal Integration</p>
            <p className="text-xs text-purple-100">Seamless communication and automated workflows with your vendors</p>
          </div>
          <Button variant="secondary" size="sm" asChild>
            <a href="/vendor" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
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
