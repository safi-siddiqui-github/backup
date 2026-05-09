import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children?: ReactNode;
  className?: string;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true, 
  children,
  className 
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};
