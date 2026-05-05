"use client";

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DocumentStatCardProps {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export default function DocumentStatCard({
  label,
  value,
  icon: Icon,
  iconBgColor = "bg-blue-100 dark:bg-blue-900/30",
  iconColor = "text-blue-600",
  className,
}: DocumentStatCardProps) {
  return (
    <div className={cn("flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-white dark:bg-slate-800", className)}>
      <div className={cn("rounded-lg p-1.5 sm:p-2 shrink-0", iconBgColor)}>
        <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", iconColor)} />
      </div>
      <div className="min-w-0">
        <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
        <div className="text-sm sm:text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

