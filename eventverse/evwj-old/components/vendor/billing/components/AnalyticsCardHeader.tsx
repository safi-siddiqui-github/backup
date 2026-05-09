"use client";

interface AnalyticsCardHeaderProps {
  title: string;
  subtitle: string;
}

export default function AnalyticsCardHeader({ title, subtitle }: AnalyticsCardHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-1">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}

