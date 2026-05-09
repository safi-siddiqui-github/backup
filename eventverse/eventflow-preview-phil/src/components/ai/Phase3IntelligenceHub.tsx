
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Brain, Bot, TrendingUp, Zap, MessageSquare } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import EventOptimizationEngine from "./EventOptimizationEngine";
import PredictiveAnalyticsDashboard from "./PredictiveAnalyticsDashboard";
import AutoPilotSystem from "./AutoPilotSystem";
import ConversationalPlanningCopilot from "./ConversationalPlanningCopilot";

interface Props {
  eventData: EventFormData;
  onUpdateEvent: (updates: Partial<EventFormData>) => void;
}

const Phase3IntelligenceHub = ({ eventData, onUpdateEvent }: Props) => {
  const [activeTab, setActiveTab] = useState("optimization");

  const handleApplyOptimization = (suggestion: any) => {
    console.log('Applying optimization:', suggestion);
    // This would integrate with the actual event update logic
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Phase 3: Advanced Intelligence & Automation
            <Badge variant="outline" className="bg-purple-100 text-purple-700">
              AI Powered
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Experience the future of event planning with advanced AI optimization, predictive analytics, and automation.
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Optimization
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Predictive Analytics
          </TabsTrigger>
          <TabsTrigger value="autopilot" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AutoPilot
          </TabsTrigger>
          <TabsTrigger value="copilot" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Copilot
          </TabsTrigger>
        </TabsList>

        <TabsContent value="optimization" className="space-y-6">
          <EventOptimizationEngine
            eventData={eventData}
            onApplySuggestion={handleApplyOptimization}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <PredictiveAnalyticsDashboard eventData={eventData} />
        </TabsContent>

        <TabsContent value="autopilot" className="space-y-6">
          <AutoPilotSystem
            eventData={eventData}
            onUpdateEvent={onUpdateEvent}
          />
        </TabsContent>

        <TabsContent value="copilot" className="space-y-6">
          <ConversationalPlanningCopilot
            eventData={eventData}
            onUpdateEvent={onUpdateEvent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase3IntelligenceHub;
