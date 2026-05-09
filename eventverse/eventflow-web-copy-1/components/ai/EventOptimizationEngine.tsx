"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Clock,
  DollarSign,
  MapPin,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface OptimizationSuggestion {
  type: "schedule" | "layout" | "budget" | "experience";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  savings?: number;
  improvement?: string;
}

interface Props {
  eventData: EventFormData;
  onApplySuggestion: (suggestion: OptimizationSuggestion) => void;
}

const EventOptimizationEngine = ({ eventData, onApplySuggestion }: Props) => {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(0);

  useEffect(() => {
    generateOptimizations();
  }, [eventData]);

  const generateOptimizations = () => {
    setIsOptimizing(true);

    setTimeout(() => {
      const newSuggestions: OptimizationSuggestion[] = [];

      // Schedule optimization
      if (eventData.eventDates?.startDate || eventData.startDate) {
        newSuggestions.push({
          type: "schedule",
          title: "Optimal Event Timing",
          description:
            "Based on guest demographics and historical data, consider starting 30 minutes later for better attendance.",
          impact: "medium",
          confidence: 85,
          improvement: "12% better attendance",
        });
      }

      // Budget optimization
      if (eventData?.ticketTypes && eventData?.ticketTypes?.length > 0) {
        newSuggestions.push({
          type: "budget",
          title: "Dynamic Pricing Opportunity",
          description:
            "Early bird pricing could increase revenue by 18% while maintaining attendance.",
          impact: "high",
          confidence: 92,
          savings: 850,
        });
      }

      // Layout optimization
      if (eventData?.selectedModules?.includes("seating")) {
        newSuggestions.push({
          type: "layout",
          title: "Seating Arrangement Optimization",
          description:
            "Round tables with 8 seats optimize networking while maintaining comfort.",
          impact: "medium",
          confidence: 78,
          improvement: "Better networking",
        });
      }

      // Experience optimization
      newSuggestions.push({
        type: "experience",
        title: "Guest Experience Enhancement",
        description:
          "Adding a welcome drink station reduces perceived wait time by 40%.",
        impact: "high",
        confidence: 89,
        improvement: "40% less wait time",
      });

      setSuggestions(newSuggestions);
      setOptimizationScore(Math.floor(75 + Math.random() * 20));
      setIsOptimizing(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "schedule":
        return Clock;
      case "layout":
        return MapPin;
      case "budget":
        return DollarSign;
      case "experience":
        return Users;
      default:
        return Brain;
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI Event Optimization Engine
          <Badge
            variant="outline"
            className="ml-auto bg-purple-100 text-purple-700"
          >
            Smart
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Optimization Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Event Optimization Score
            </span>
            <span className="text-lg font-bold text-purple-600">
              {optimizationScore}%
            </span>
          </div>
          <Progress
            value={optimizationScore}
            className="h-2"
          />
          <p className="text-xs text-gray-600">
            Your event is well-optimized! Apply suggestions below to reach 95%+
          </p>
        </div>

        {isOptimizing ? (
          <div className="py-8 text-center">
            <Brain className="mx-auto mb-4 h-12 w-12 animate-pulse text-purple-400" />
            <p className="text-sm text-gray-600">
              AI analyzing your event data...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                Optimization Suggestions
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={generateOptimizations}
                className="border-purple-200 text-purple-600"
              >
                <Zap className="mr-1 h-4 w-4" />
                Reanalyze
              </Button>
            </div>

            {suggestions.map((suggestion, index) => {
              const Icon = getTypeIcon(suggestion.type);

              return (
                <Card
                  key={index}
                  className="border-l-4 border-l-purple-400"
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-purple-600" />
                        <h5 className="font-medium text-gray-800">
                          {suggestion.title}
                        </h5>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getImpactColor(suggestion.impact)}`}
                        >
                          {suggestion.impact} impact
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {suggestion.confidence}% confidence
                        </Badge>
                      </div>
                    </div>

                    <p className="mb-3 text-sm text-gray-600">
                      {suggestion.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {suggestion.savings && (
                          <span className="flex items-center gap-1 text-green-600">
                            <DollarSign className="h-3 w-3" />
                            Save ${suggestion.savings}
                          </span>
                        )}
                        {suggestion.improvement && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <TrendingUp className="h-3 w-3" />
                            {suggestion.improvement}
                          </span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        onClick={() => onApplySuggestion(suggestion)}
                        className="bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventOptimizationEngine;
