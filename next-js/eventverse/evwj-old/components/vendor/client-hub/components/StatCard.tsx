"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: ReactNode;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  showEyeButton?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-gray-600 dark:text-gray-400",
  className,
  isVisible = true,
  onToggleVisibility,
  showEyeButton = false,
}: StatCardProps) {
  const displayValue = showEyeButton && !isVisible ? "••••••" : value;

  return (
    <Card className={`bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 ${className || ""}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm text-muted-foreground">{title}</p>
              {showEyeButton && onToggleVisibility && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onToggleVisibility}
                  className="h-5 w-5 p-0 hover:bg-transparent shrink-0"
                >
                  {isVisible ? (
                    <Eye className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <EyeOff className="h-3 w-3 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
            <p className="text-2xl font-bold">{displayValue}</p>
          </div>
          <Icon className={cn("h-7 w-7 shrink-0", iconColor)} />
        </div>
      </CardContent>
    </Card>
  );
}

