
import { Link } from "react-router-dom";
import AnalyticsIntelligenceHub from "@/components/analytics/AnalyticsIntelligenceHub";

const ModuleAnalytics = () => {
  return (
    <div className="min-h-screen">
      {/* Simple back button overlay */}
      <div className="absolute top-4 left-4 z-20">
        <Link 
          to="/modules"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20 rounded-md transition-colors"
        >
          ← Back to Modules
        </Link>
      </div>

      {/* Main Analytics Intelligence Hub */}
      <AnalyticsIntelligenceHub eventId="demo-event" />
    </div>
  );
};

export default ModuleAnalytics;
