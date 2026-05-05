"use client";

interface TabHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function TabHeader({ title, subtitle, className }: TabHeaderProps) {
  return (
    <div className={className || "mb-6"}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-1">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}

