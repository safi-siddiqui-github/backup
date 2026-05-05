"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, Target, Clock, Star } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  indicator?: {
    text: string;
    color: string;
  };
  progress?: number;
}

function MetricCard({ icon, label, value, indicator, progress }: MetricCardProps) {
  // Parse indicator text to highlight the green part
  const renderIndicator = () => {
    if (!indicator) return null;
    
    // Check if indicator text starts with + or - followed by a number
    const match = indicator.text.match(/^([+-]\d+[^\s]*)(.*)$/);
    if (match && indicator.color.includes('green')) {
      const [, greenPart, restPart] = match;
      return (
        <p className="text-xs text-gray-900 dark:text-white">
          <span className="text-green-600 dark:text-green-400">{greenPart}</span>
          <span className="text-gray-600 dark:text-gray-400">{restPart}</span>
        </p>
      );
    }
    
    return <p className={`text-xs ${indicator.color}`}>{indicator.text}</p>;
  };

  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1">{label}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
            {renderIndicator()}
          </div>
          <div className="shrink-0">
            {icon}
          </div>
        </div>
        {progress !== undefined && (
          <div className="mt-3">
            <Progress 
              value={progress} 
              className="h-1.5 bg-gray-100 dark:bg-blue-900/30 [&>div]:bg-blue-600 dark:[&>div]:bg-blue-500"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function PerformanceMetrics() {
  const metrics = [
    {
      icon: <Bell className="h-5 w-5" />,
      label: "New Leads",
      value: "5",
      indicator: {
        text: "+2 from last week",
        color: "text-green-600 dark:text-green-400",
      }
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Conversion Rate",
      value: "32%",
      indicator: {
        text: "+5% this month",
        color: "text-green-600 dark:text-green-400",
      },
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Response Time",
      value: "2.5 hours",
      indicator: {
        text: "-30min improvement",
        color: "text-green-600 dark:text-green-400",
      },
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: "Satisfaction",
      value: "4.8/5.0",
      indicator: {
        text: "Based on 23 reviews",
        color: "text-gray-600 dark:text-gray-400",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          label={metric.label}
          value={metric.value}
          indicator={metric.indicator}
        />
      ))}
    </div>
  );
}

