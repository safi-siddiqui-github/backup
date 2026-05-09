import { Link, useNavigate } from "react-router-dom";
import GuestTravelView from "@/components/travel/GuestTravelView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuleTravel = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/modules");
  };

  // Demo event data for the travel module
  const demoEventData = {
    eventId: "demo-event",
    eventLocation: "San Francisco, CA",
    eventAddress: "Golden Gate Park, San Francisco, CA 94118",
    eventStartDate: new Date("2024-07-20"),
    eventEndDate: new Date("2024-07-22"),
    guestId: "demo-guest"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Module Header */}
      <div className="gradient-header bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/modules">
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Travel & Accommodation</h1>
            <p className="text-sm text-muted-foreground">
              Complete travel advisor for event guests
            </p>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="container mx-auto px-4 py-8">
        <GuestTravelView
          eventId={demoEventData.eventId}
          eventLocation={demoEventData.eventLocation}
          eventAddress={demoEventData.eventAddress}
          eventStartDate={demoEventData.eventStartDate}
          eventEndDate={demoEventData.eventEndDate}
          guestId={demoEventData.guestId}
        />
      </div>
    </div>
  );
};

export default ModuleTravel;
