import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  iconClassName?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName
}: StatCardProps) => {
  return (
    <Card className={cn("bg-card border-border hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={cn(
                  "text-sm font-medium",
                  trend.value > 0 ? "text-success" : "text-destructive"
                )}>
                  {trend.value > 0 ? "+" : ""}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br",
            iconClassName || "from-primary/20 to-primary/10"
          )}>
            <Icon className="w-7 h-7 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
