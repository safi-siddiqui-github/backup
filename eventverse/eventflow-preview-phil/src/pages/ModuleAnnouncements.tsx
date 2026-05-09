
import { Link } from "react-router-dom";
import AnnouncementModule from "@/components/AnnouncementModule";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuleAnnouncements = () => {
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
            <h1 className="text-xl font-semibold text-foreground">Announcements</h1>
            <p className="text-sm text-muted-foreground">Event announcements and updates</p>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <AnnouncementModule
        eventId="demo-event"
        onBack={handleBack}
      />
    </div>
  );
};

export default ModuleAnnouncements;
