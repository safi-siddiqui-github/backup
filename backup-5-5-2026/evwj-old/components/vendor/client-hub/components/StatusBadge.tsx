"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClientStatus, ClientStage, InvoiceStatus, TaskPriority, TaskStatus } from "../mockClients";
import {
  getClientStatusColor,
  getStageColor,
  getInvoiceStatusColor,
  getPriorityColor,
  getTaskStatusColor,
} from "../utils/statusColors";

interface StatusBadgeProps {
  status: ClientStatus | ClientStage | InvoiceStatus | TaskPriority | TaskStatus | string;
  type?: "client" | "stage" | "invoice" | "priority" | "task";
  className?: string;
  size?: "sm" | "md";
}

export default function StatusBadge({
  status,
  type = "client",
  className,
  size = "md",
}: StatusBadgeProps) {
  const getColor = () => {
    switch (type) {
      case "client":
        return getClientStatusColor(status);
      case "stage":
        return getStageColor(status);
      case "invoice":
        return getInvoiceStatusColor(status);
      case "priority":
        return getPriorityColor(status);
      case "task":
        return getTaskStatusColor(status);
      default:
        return getClientStatusColor(status);
    }
  };

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-0.5";

  return (
    <Badge
      variant="secondary"
      className={cn(sizeClasses, getColor(), className)}
    >
      {status}
    </Badge>
  );
}

