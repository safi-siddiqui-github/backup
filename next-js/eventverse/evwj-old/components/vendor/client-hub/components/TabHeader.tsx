"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface TabHeaderProps {
  title: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  actionClassName?: string;
}

export default function TabHeader({
  title,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  actionClassName,
}: TabHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className={`bg-blue-600 hover:bg-blue-700 text-white ${actionClassName || ""}`}
        >
          {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

