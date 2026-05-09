
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Settings,
  Monitor,
  User
} from "lucide-react";
import ShowcaseEventTypes from "@/components/showcase/ShowcaseEventTypes";
import ShowcaseGuestExperience from "@/components/showcase/ShowcaseGuestExperience";
import ShowcaseModuleConfigurations from "@/components/showcase/ShowcaseModuleConfigurations";
import GuestExperienceSimulator from "@/components/showcase/GuestExperienceSimulator";

const GuestShowcase = () => {
  const [selectedEventType, setSelectedEventType] = useState("wedding");
  const [selectedGuestPersona, setSelectedGuestPersona] = useState("regular");
  const [activeView, setActiveView] = useState("simulator");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Guest Experience Showcase
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Experience every possible guest interaction across all event types and module configurations.
              See real guest views with rich mock data and interactive demonstrations.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">6</div>
                <div className="text-white/80">Event Scenarios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">7</div>
                <div className="text-white/80">Module Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5</div>
                <div className="text-white/80">Guest Personas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-white/80">Combinations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Showcase Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Live Simulator
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Event Types
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Guest Journey
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Module Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator">
            <GuestExperienceSimulator />
          </TabsContent>

          <TabsContent value="overview">
            <ShowcaseEventTypes 
              selectedEventType={selectedEventType}
              onEventTypeChange={setSelectedEventType}
            />
          </TabsContent>

          <TabsContent value="experience">
            <ShowcaseGuestExperience 
              eventType={selectedEventType}
              guestPersona={selectedGuestPersona}
            />
          </TabsContent>

          <TabsContent value="modules">
            <ShowcaseModuleConfigurations 
              eventType={selectedEventType}
              guestPersona={selectedGuestPersona}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestShowcase;
