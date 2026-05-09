
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalyticsIntelligenceHub from "./analytics/AnalyticsIntelligenceHub";

interface AnalyticsModuleProps {
  eventId: string;
  onBack: () => void;
}

const AnalyticsModule = ({ eventId, onBack }: AnalyticsModuleProps) => {
  return (
    <div className="min-h-screen">
      {/* Simple back button overlay */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Button>
      </div>

      {/* Main Analytics Intelligence Hub */}
      <AnalyticsIntelligenceHub eventId={eventId} />
    </div>
  );
};

export default AnalyticsModule;
