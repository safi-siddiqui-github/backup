import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg";
}

export const GlassCard = ({ children, className, blur = "md" }: GlassCardProps) => {
  const blurClass = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg"
  }[blur];

  return (
    <Card className={cn(
      "bg-card/40 border-border/50",
      blurClass,
      "shadow-xl",
      className
    )}>
      {children}
    </Card>
  );
};
