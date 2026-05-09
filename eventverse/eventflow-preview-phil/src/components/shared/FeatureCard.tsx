import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  iconClassName 
}: FeatureCardProps) => {
  return (
    <Card className={cn(
      "border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <CardContent className="p-6">
        <div className={cn(
          "w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4",
          iconClassName
        )}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};
