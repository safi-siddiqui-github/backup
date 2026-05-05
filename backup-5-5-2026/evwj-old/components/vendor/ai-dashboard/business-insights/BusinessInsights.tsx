"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Target, Clock, TrendingUp, ArrowRight, Brain, LucideIcon } from "lucide-react";
import RecommendationCard from "./RecommendationCard";
import { useActivityNavigationStore, ActivityType } from "@/lib/activity-navigation-store";

interface RecommendationData {
  type: ActivityType;
  icon: LucideIcon;
  title: string;
  confidence: number;
  priority: "high" | "medium" | "urgent";
  description: string;
  actionLabel: string;
  metadata?: Record<string, any>;
}

export default function BusinessInsights() {
  const { navigateToActivity } = useActivityNavigationStore();
  
  const recommendations: RecommendationData[] = [
    {
      type: "generate-proposal",
      icon: Target,
      title: "High-value lead detected",
      confidence: 92,
      priority: "high" as const,
      description: "Johnson Wedding ($15K budget) matches your specialty perfectly",
      actionLabel: "Generate Proposal",
      metadata: { leadId: "1" }, // Lead ID for generating proposal
    },
    {
      type: "send-messages",
      icon: Clock,
      title: "Response time alert",
      confidence: 95,
      priority: "urgent" as const,
      description: "3 leads haven't received responses in 48+ hours",
      actionLabel: "Send Messages",
      metadata: { leadId: "1" }, // Lead ID for sending messages
    },
    {
      type: "review-pricing",
      icon: TrendingUp,
      title: "Pricing optimization",
      confidence: 78,
      priority: "medium" as const,
      description: "Market analysis suggests 8% price increase opportunity for wedding photography",
      actionLabel: "Review Pricing",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4 mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400 shrink-0" />
            <CardTitle className="text-xl sm:text-2xl font-bold">AI Business Insights</CardTitle>
          </div>
        </div>
        <CardDescription className="mt-1">Top 3 recommendations to grow your business</CardDescription>
        <CardAction className="mt-2 sm:mt-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-0 pb-4 sm:pb-6">
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={index}
              icon={rec.icon}
              title={rec.title}
              confidence={rec.confidence}
              priority={rec.priority}
              description={rec.description}
              actionLabel={rec.actionLabel}
              onAction={() => navigateToActivity(rec.type, rec.metadata)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

