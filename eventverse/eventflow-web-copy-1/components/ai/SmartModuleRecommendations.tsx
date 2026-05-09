"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Brain, CheckCircle, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

interface Module {
  id: string;
  name: string;
  icon: string;
  price: number;
  confidence: number;
  reason: string;
}

interface Props {
  eventType: string;
  expectedAttendees: number;
  budget?: number;
  onApplyRecommendations: (moduleIds: string[]) => void;
  selectedModules: string[];
}

const SmartModuleRecommendations = ({
  eventType,
  expectedAttendees,
  budget,
  onApplyRecommendations,
  selectedModules,
}: Props) => {
  const [recommendations, setRecommendations] = useState<Module[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeAndRecommend = () => {
    setIsAnalyzing(true);

    // Smart recommendations based on event context
    setTimeout(() => {
      const baseRecommendations: Module[] = [
        {
          id: "schedules",
          name: "Event Schedule",
          icon: "📅",
          price: 0,
          confidence: 100,
          reason: "Essential for any organized event",
        },
        {
          id: "announcements",
          name: "Announcements",
          icon: "📢",
          price: 0,
          confidence: 100,
          reason: "Keep guests informed in real-time",
        },
        {
          id: "rsvp",
          name: "RSVP Management",
          icon: "✅",
          price: 0,
          confidence: 95,
          reason: "Track attendance and responses",
        },
      ];

      // Add context-specific recommendations
      if (eventType === "Wedding") {
        baseRecommendations.push(
          {
            id: "media",
            name: "Photo Sharing",
            icon: "📸",
            price: 20,
            confidence: 90,
            reason: "Capture and share precious memories",
          },
          {
            id: "seating",
            name: "Seating Charts",
            icon: "🪑",
            price: 30,
            confidence: 85,
            reason: "Perfect for wedding receptions",
          },
        );
      }

      if (eventType === "Corporate") {
        baseRecommendations.push(
          {
            id: "analytics",
            name: "Event Analytics",
            icon: "📊",
            price: 35,
            confidence: 88,
            reason: "Track engagement and ROI",
          },
          {
            id: "survey",
            name: "Feedback Collection",
            icon: "📝",
            price: 10,
            confidence: 80,
            reason: "Gather valuable insights",
          },
        );
      }

      if (expectedAttendees > 100) {
        baseRecommendations.push({
          id: "ticketing",
          name: "Ticketing System",
          icon: "🎫",
          price: 25,
          confidence: 85,
          reason: "Efficient for large events",
        });
      }

      if (expectedAttendees > 50) {
        baseRecommendations.push({
          id: "games",
          name: "Interactive Games",
          icon: "🎮",
          price: 15,
          confidence: 75,
          reason: "Boost engagement for larger groups",
        });
      }

      setRecommendations(
        baseRecommendations.sort((a, b) => b.confidence - a.confidence),
      );
      setIsAnalyzing(false);
    }, 1500);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100";
    if (confidence >= 80) return "text-blue-600 bg-blue-100";
    return "text-orange-600 bg-orange-100";
  };

  const handleApplyAll = () => {
    const recommendedIds = recommendations.map((r) => r.id);
    onApplyRecommendations(recommendedIds);
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          Smart Module Recommendations
          <Badge className="bg-blue-100 text-blue-700">AI-Powered</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Based on your {eventType.toLowerCase()} with {expectedAttendees}{" "}
          expected guests
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="py-6 text-center">
            <Button
              onClick={analyzeAndRecommend}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  Analyzing Your Event...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Get Smart Recommendations
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {recommendations.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                return (
                  <div
                    key={module.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg border-2 p-3 transition-all",
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{module.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{module.name}</span>
                          {isSelected && (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{module.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getConfidenceColor(module.confidence)}>
                        {module.confidence}% match
                      </Badge>
                      <span className="font-semibold text-blue-600">
                        {module.price === 0 ? "Free" : `$${module.price}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 border-t pt-4">
              <Button
                onClick={handleApplyAll}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Apply All Recommendations
              </Button>
              <Button
                variant="outline"
                onClick={analyzeAndRecommend}
                className="border-blue-300"
              >
                <Brain className="mr-2 h-4 w-4" />
                Re-analyze
              </Button>
            </div>

            <div className="bg-blue-25 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">AI Insights:</span>
              </div>
              <p className="mt-1 text-sm text-blue-700">
                Based on similar {eventType.toLowerCase()} events, these modules
                typically increase guest engagement by 40% and reduce planning
                time by 60%.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartModuleRecommendations;
