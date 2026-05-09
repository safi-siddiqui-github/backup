
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import MediaModule from "@/components/MediaModule";
import MediaLandingPage from "@/components/media/MediaLandingPage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuleMedia = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showModule = searchParams.get("view") === "module";

  const handleNavigateToModule = () => {
    navigate("/modules/media?view=module");
  };

  const handleBack = () => {
    navigate("/modules/media");
  };

  if (!showModule) {
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
              <h1 className="text-xl font-semibold text-foreground">Media Management</h1>
              <p className="text-sm text-muted-foreground">Photo galleries and media management</p>
            </div>
          </div>
        </div>

        {/* Landing Page */}
        <MediaLandingPage 
          eventId="demo-event" 
          onNavigateToModule={handleNavigateToModule}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Module Content */}
      <MediaModule
        eventId="demo-event"
        onBack={handleBack}
      />
    </div>
  );
};

export default ModuleMedia;
