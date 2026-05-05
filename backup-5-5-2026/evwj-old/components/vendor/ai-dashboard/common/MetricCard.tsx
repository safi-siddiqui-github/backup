"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface MetricCardProps {
  label: string;
  value: string;
  detail?: ReactNode;
  detailClassName?: string;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  showEyeButton?: boolean;
}

export default function MetricCard({
  label,
  value,
  detail,
  detailClassName = "text-sm text-green-200",
  isVisible = true,
  onToggleVisibility,
  showEyeButton = false,
}: MetricCardProps) {
  const displayValue = showEyeButton && !isVisible ? "••••••" : value;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-sm text-white/90">{label}</p>
        {showEyeButton && onToggleVisibility && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
            className="h-5 w-5 p-0 hover:bg-transparent shrink-0"
          >
            {isVisible ? (
              <Eye className="h-3 w-3 text-white/70" />
            ) : (
              <EyeOff className="h-3 w-3 text-white/70" />
            )}
          </Button>
        )}
      </div>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-white">{displayValue}</span>
        {detail && isVisible && (
          <div className={`flex items-end gap-1 ${detailClassName}`}>
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

