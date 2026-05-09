"use client";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export default function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div className={`flex min-h-[200px] items-center justify-center rounded-lg border border-dashed ${className || ""}`}>
      <div className="text-center">
        <p className="text-lg font-semibold text-muted-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

