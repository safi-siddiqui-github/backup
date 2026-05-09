import { Link } from "react-router-dom";
import MarketingModule from "@/components/MarketingModule";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuleMarketing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-header bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/modules">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Marketing & Campaigns</h1>
            <p className="text-sm text-muted-foreground">Multi-channel advertising with guest segmentation</p>
          </div>
        </div>
      </div>

      <MarketingModule eventId="demo-event" />
    </div>
  );
};

export default ModuleMarketing;
