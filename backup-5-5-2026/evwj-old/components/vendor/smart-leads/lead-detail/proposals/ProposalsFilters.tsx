"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProposalsFiltersState } from "./ProposalsListView";

interface ProposalsFiltersProps {
  filters: ProposalsFiltersState;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeFilterCount: number;
}

export default function ProposalsFilters({
  filters,
  isOpen,
  onOpenChange,
  activeFilterCount,
}: ProposalsFiltersProps) {
  // Check if any filters are active
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onOpenChange(!isOpen)}
      className={cn(
        "relative bg-white dark:bg-black",
        hasActiveFilters && "bg-primary/10 border-primary"
      )}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {activeFilterCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
        >
          {activeFilterCount}
        </Badge>
      )}
    </Button>
  );
}

