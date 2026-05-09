import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, subtitle, children, className }: PageHeaderProps) => {
  return (
    <div className={cn(
      "relative py-20 px-4 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10",
      className
    )}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl animate-fade-in">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
