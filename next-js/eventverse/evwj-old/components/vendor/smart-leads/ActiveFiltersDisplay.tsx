"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { LeadFilters } from "./types/filters";

interface ActiveFiltersDisplayProps {
  filters: LeadFilters;
  onRemoveFilter: (filterKey: keyof LeadFilters, value?: string) => void;
  onClearAll: () => void;
}

export default function ActiveFiltersDisplay({
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersDisplayProps) {
  const activeFilters: { key: keyof LeadFilters; label: string; value?: string }[] = [];

  // Priority
  if (filters.priority !== "all") {
    activeFilters.push({
      key: "priority",
      label: `Priority: ${filters.priority.charAt(0).toUpperCase() + filters.priority.slice(1)}`,
    });
  }

  // Distance
  if (filters.distance !== "all") {
    activeFilters.push({
      key: "distance",
      label: `Distance: Within ${filters.distance} miles`,
    });
  }

  // Budget Range
  if (filters.budgetRange !== "all") {
    activeFilters.push({
      key: "budgetRange",
      label: `Budget: ${filters.budgetRange}`,
    });
  }

  // Guest Count
  if (filters.guestCount !== "all") {
    activeFilters.push({
      key: "guestCount",
      label: `Guests: ${filters.guestCount}`,
    });
  }

  // Categories
  filters.categories.forEach((category) => {
    activeFilters.push({
      key: "categories",
      label: `Category: ${category}`,
      value: category,
    });
  });

  // Service Types
  filters.serviceTypes.forEach((serviceType) => {
    activeFilters.push({
      key: "serviceTypes",
      label: `Service: ${serviceType}`,
      value: serviceType,
    });
  });

  // Event Date
  if (filters.eventDateFrom || filters.eventDateTo) {
    const dateLabel = filters.eventDateFrom && filters.eventDateTo
      ? `Event: ${filters.eventDateFrom} to ${filters.eventDateTo}`
      : filters.eventDateFrom
      ? `Event: From ${filters.eventDateFrom}`
      : `Event: Until ${filters.eventDateTo}`;
    activeFilters.push({
      key: "eventDateFrom",
      label: dateLabel,
    });
  }

  // Match Score
  if (filters.matchScore !== "all") {
    activeFilters.push({
      key: "matchScore",
      label: `Match Score: ${filters.matchScore}+`,
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Active Filters ({activeFilters.length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs"
          >
            Clear All
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge
              key={`${filter.key}-${filter.value || index}`}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              {filter.label}
              <button
                onClick={() => onRemoveFilter(filter.key, filter.value)}
                className="ml-1 hover:text-destructive rounded-full hover:bg-background p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

