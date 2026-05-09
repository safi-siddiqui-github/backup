
import { Link } from "react-router-dom";
import TicketingModule from "@/components/TicketingModule";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuleTicketing = () => {
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
            <h1 className="text-xl font-semibold text-foreground">Ticketing System</h1>
            <p className="text-sm text-muted-foreground">Ticket sales and check-in management</p>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <TicketingModule
        eventId="demo-event"
        onBack={handleBack}
      />
    </div>
  );
};

export default ModuleTicketing;
