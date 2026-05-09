"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
}

export default function AnalyticsCard({
  icon: Icon,
  label,
  value,
  iconColor,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${iconColor} shrink-0`} />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {label}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

