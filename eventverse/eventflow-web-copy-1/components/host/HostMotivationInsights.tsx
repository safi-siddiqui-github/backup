"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUp,
  Award,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

interface Insight {
  id: string;
  type: "milestone" | "improvement" | "opportunity" | "celebration";
  title: string;
  description: string;
  metric?: string;
  impact: "high" | "medium" | "low";
  actionable: boolean;
  cta?: string;
}

interface HostMotivationInsightsProps {
  totalEvents: number;
  totalGuests: number;
  avgRating: number;
  recentReviews: Array<{
    rating: number;
    comment: string;
    eventName: string;
    date: string;
  }>;
}

const HostMotivationInsights = ({
  totalEvents,
  totalGuests,
  avgRating,
  recentReviews,
}: HostMotivationInsightsProps) => {
  // Generate dynamic insights based on host performance
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // Milestone celebrations
    if (totalGuests >= 1000000) {
      insights.push({
        id: "million_guests",
        type: "celebration",
        title: "🎉 Million Guest Milestone!",
        description: `Incredible! You've been part of hosting over ${totalGuests.toLocaleString()} guests globally. You're in the top 1% of hosts worldwide!`,
        metric: "1M+ guests",
        impact: "high",
        actionable: false,
      });
    }

    // Performance insights
    if (avgRating >= 4.8) {
      insights.push({
        id: "excellent_rating",
        type: "celebration",
        title: "⭐ Exceptional Host Rating",
        description: `Your ${avgRating} average rating puts you among the elite hosts. Guests absolutely love your events!`,
        metric: `${avgRating}/5.0`,
        impact: "high",
        actionable: false,
      });
    }

    // Improvement opportunities
    if (avgRating < 4.5 && recentReviews.length > 5) {
      const commonIssues = analyzeReviewFeedback(recentReviews);
      insights.push({
        id: "rating_improvement",
        type: "improvement",
        title: "🚀 Boost Your Rating",
        description: `Based on recent feedback, focusing on ${commonIssues[0]} could improve your rating by 15-20%.`,
        impact: "high",
        actionable: true,
        cta: "View Detailed Feedback",
      });
    }

    // Growth opportunities
    if (totalEvents < 50) {
      insights.push({
        id: "growth_opportunity",
        type: "opportunity",
        title: "📈 Accelerate Your Growth",
        description:
          "Hosts who create 5+ events per month see 3x faster growth. You're on track for amazing success!",
        impact: "medium",
        actionable: true,
        cta: "Get Growth Tips",
      });
    }

    // Milestone progress
    const nextMilestone = getNextMilestone(totalGuests);
    if (nextMilestone) {
      insights.push({
        id: "next_milestone",
        type: "milestone",
        title: `🎯 Next Milestone: ${nextMilestone.title}`,
        description: `You're ${nextMilestone.remaining} guests away from ${nextMilestone.title}. Keep up the momentum!`,
        metric: `${nextMilestone.remaining} to go`,
        impact: "medium",
        actionable: true,
        cta: "Plan Next Event",
      });
    }

    return insights;
  };

  const analyzeReviewFeedback = (reviews: unknown[]) => {
    // Simple feedback analysis (in real app, this would use AI)
    const issues = [
      "communication",
      "venue setup",
      "timing",
      "catering",
      "entertainment",
    ];
    return issues.slice(0, 2); // Return top 2 areas for improvement
  };

  const getNextMilestone = (guests: number) => {
    const milestones = [
      { guests: 500, title: "500 Guest Milestone" },
      { guests: 1000, title: "1K Guest Club" },
      { guests: 5000, title: "5K Community Builder" },
      { guests: 10000, title: "10K Master Host" },
      { guests: 50000, title: "50K Event Legend" },
      { guests: 100000, title: "100K Celebrity Host" },
      { guests: 1000000, title: "Million Guest Milestone" },
    ];

    const next = milestones.find((m) => m.guests > guests);
    if (next) {
      return {
        title: next.title,
        remaining: next.guests - guests,
      };
    }
    return null;
  };

  const insights = generateInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "celebration":
        return Sparkles;
      case "improvement":
        return TrendingUp;
      case "opportunity":
        return Target;
      case "milestone":
        return Award;
      default:
        return Lightbulb;
    }
  };

  const getInsightColor = (type: string, impact: string) => {
    if (type === "celebration") return "from-yellow-500 to-orange-500";
    if (type === "improvement") return "from-blue-500 to-purple-500";
    if (type === "opportunity") return "from-green-500 to-emerald-500";
    if (type === "milestone") return "from-purple-500 to-pink-500";
    return "from-gray-500 to-slate-500";
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    };
    return colors[impact as keyof typeof colors] || colors.low;
  };

  // Motivational stats
  const comparisonStats = [
    {
      label: "vs Similar Hosts",
      value: "+23%",
      description: "Guest satisfaction rate",
      icon: Star,
      positive: true,
    },
    {
      label: "Industry Average",
      value: "4.2/5.0",
      description: `Your ${avgRating}/5.0 rating`,
      icon: Users,
      positive: avgRating > 4.2,
    },
    {
      label: "This Month",
      value: "+15%",
      description: "Growth in bookings",
      icon: ArrowUp,
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-primary h-5 w-5" />
            Smart Insights & Opportunities
          </CardTitle>
          <CardDescription>
            AI-powered recommendations to boost your hosting success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div
                  key={insight.id}
                  className={`rounded-lg bg-gradient-to-r p-4 ${getInsightColor(insight.type, insight.impact)} text-white`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 items-start gap-3">
                      <div className="mt-1 rounded-full bg-white/20 p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold">{insight.title}</h3>
                        <p className="text-sm leading-relaxed text-white/90">
                          {insight.description}
                        </p>
                        {insight.metric && (
                          <div className="mt-2">
                            <Badge className="bg-white/20 text-xs text-white">
                              {insight.metric}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        className={`text-xs ${getImpactBadge(insight.impact)}`}
                      >
                        {insight.impact} impact
                      </Badge>
                      {insight.actionable && insight.cta && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="text-xs"
                        >
                          {insight.cta}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            How You&apos;re Performing
          </CardTitle>
          <CardDescription>
            See how you stack up against other successful hosts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {comparisonStats.map((stat, index) => (
              <div
                key={index}
                className="from-muted/50 to-muted/30 rounded-lg bg-gradient-to-br p-4 text-center"
              >
                <div className="mb-2 flex justify-center">
                  <div
                    className={`rounded-full p-2 ${stat.positive ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-900/20"}`}
                  >
                    <stat.icon
                      className={`h-5 w-5 ${stat.positive ? "text-green-600" : "text-gray-600"}`}
                    />
                  </div>
                </div>
                <div
                  className={`text-xl font-bold ${stat.positive ? "text-green-600" : "text-foreground"}`}
                >
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback Highlights */}
      {recentReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              What Guests Are Saying
            </CardTitle>
            <CardDescription>
              Latest feedback from your recent events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReviews.slice(0, 3).map((review, index) => (
                <div
                  key={index}
                  className="bg-muted/30 border-border rounded-lg border p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {review.eventName}
                    </span>
                  </div>
                  <p className="text-foreground text-sm italic">
                    &quot;{review.comment}&quot;
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {review.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HostMotivationInsights;
