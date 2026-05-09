"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../client-hub/utils/formatCurrency";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingStatCardProps {
  label: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  valueColor: string;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}

export default function BillingStatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  valueColor,
  isVisible = true,
  onToggleVisibility,
}: BillingStatCardProps) {
  const displayValue = isVisible ? formatCurrency(value) : "••••••";

  return (
    <Card className="bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onToggleVisibility}
                className="h-5 w-5 p-0 hover:bg-transparent"
              >
                {isVisible ? (
                  <Eye className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-3 w-3 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className={cn("text-lg font-bold mb-0.5", valueColor)}>
              {displayValue}
            </p>
            <p className="text-[10px] text-muted-foreground line-clamp-1">{subtitle}</p>
          </div>
          <div className={cn("p-2 rounded-lg shrink-0")}>
            <Icon className={cn("h-4 w-4", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

