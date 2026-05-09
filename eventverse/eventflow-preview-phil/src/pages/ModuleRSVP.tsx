
import { useState } from "react";
import RSVPModule from "@/components/RSVPModule";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ModuleRSVP = () => {
  // Mock event data for demonstration with proper date structure
  const mockEvent = {
    id: "demo-event",
    eventName: "Demo Event",
    eventType: "Wedding",
    description: "This is a demo event for testing the RSVP module",
    eventDates: {
      startDate: "2024-06-15",
      endDate: "2024-06-15"
    },
    // Add the fields expected by RSVPForm
    startDate: new Date("2024-06-15"),
    time: "6:00 PM",
    locations: [
      {
        name: "Demo Venue",
        address: "123 Demo Street, Demo City, DC 12345"
      }
    ]
  };

  const handleBack = () => {
    // Navigation handled by Link component
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Module Header */}
      <div className="gradient-header bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/modules">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">RSVP Management</h1>
            <p className="text-sm text-muted-foreground">Manage guest lists and track responses</p>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <RSVPModule event={mockEvent} onBack={handleBack} />
    </div>
  );
};

export default ModuleRSVP;
