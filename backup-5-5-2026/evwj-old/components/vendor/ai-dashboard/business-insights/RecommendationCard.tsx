"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecommendationCardProps {
  icon: LucideIcon;
  title: string;
  confidence: number;
  priority: "high" | "urgent" | "medium";
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

export default function RecommendationCard({
  icon: Icon,
  title,
  confidence,
  priority,
  description,
  actionLabel,
  onAction,
}: RecommendationCardProps) {
  const priorityConfig = {
    high: {
      className: "bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
      label: "high",
    },
    urgent: {
      className: "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
      label: "urgent",
    },
    medium: {
      className: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
      label: "medium",
    },
  };

  const config = priorityConfig[priority];

  return (
    <div className="rounded-lg border bg-linear-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 pt-4 pb-4 px-4 sm:pt-5 sm:pb-5 sm:px-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-800">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 flex-wrap mb-2">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {confidence}% confidence
              </Badge>
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-0.5 border", config.className)}
              >
                {config.label}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
            {description}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="w-full sm:w-auto border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {actionLabel}
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

