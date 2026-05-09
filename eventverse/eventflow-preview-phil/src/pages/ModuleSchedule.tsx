
import { Link } from "react-router-dom";
import { useState } from "react";
import ScheduleModule from "@/components/ScheduleModule";
import EnhancedScheduleModule from "@/components/EnhancedScheduleModule";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ToggleLeft, ToggleRight } from "lucide-react";

const ModuleSchedule = () => {
  const [useEnhancedMode, setUseEnhancedMode] = useState(false);

  const handleBack = () => {
    // Navigation handled by Link component
  };

  // Mock event data for demonstration
  const mockEvent = {
    eventName: "Tech Innovation Conference 2024",
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 3 days
    locations: [
      { name: "Main Hall", address: "123 Event Street" },
      { name: "Conference Room A", address: "123 Event Street" },
      { name: "Conference Room B", address: "123 Event Street" },
      { name: "Workshop Room A", address: "123 Event Street" },
      { name: "Workshop Room B", address: "123 Event Street" },
      { name: "Garden Pavilion", address: "123 Event Street" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Module Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/modules">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Modules
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Schedule & Timeline</h1>
              <p className="text-sm text-gray-600">Event scheduling and timeline management</p>
            </div>
          </div>
          
          {/* Enhanced Mode Toggle */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-2 border">
            <span className="text-sm text-gray-700 font-medium">Simple Event</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUseEnhancedMode(!useEnhancedMode)}
              className="p-2 hover:bg-gray-100 transition-colors rounded-md"
            >
              {useEnhancedMode ? (
                <ToggleRight className="w-7 h-7 text-purple-600" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-400 hover:text-gray-600" />
              )}
            </Button>
            <span className="text-sm text-gray-700 font-medium">Conference Mode</span>
          </div>
        </div>
      </div>

      {/* Module Content */}
      {useEnhancedMode ? (
        <EnhancedScheduleModule
          event={mockEvent}
          onBack={handleBack}
        />
      ) : (
        <ScheduleModule
          event={mockEvent}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default ModuleSchedule;
