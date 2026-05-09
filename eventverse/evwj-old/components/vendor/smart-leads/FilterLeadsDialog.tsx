"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LeadFilters } from "./types/filters";
import { X, Filter, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterLeadsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: LeadFilters;
  onFiltersChange: (filters: LeadFilters) => void;
  onApplyFilters: () => void;
  activeFiltersCount: number;
  onSavePreset: () => void;
}

const CATEGORIES = [
  "Wedding",
  "Corporate",
  "Birthday",
  "Anniversary",
  "Graduation",
  "Baby Shower",
  "Retirement",
  "Holiday Party",
  "Fundraiser",
  "Other",
];

const SERVICE_TYPES = [
  "Catering",
  "Photography",
  "Videography",
  "DJ/Entertainment",
  "Florals",
  "Decoration",
  "Venue",
  "Transportation",
  "Rentals",
  "Lighting",
  "Cake/Desserts",
  "Hair & Makeup",
  "Wedding Planner",
  "Other",
];

export default function FilterLeadsDialog({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onApplyFilters,
  activeFiltersCount,
  onSavePreset,
}: FilterLeadsDialogProps) {
  const [localFilters, setLocalFilters] = useState<LeadFilters>(filters);

  // Update localFilters when filters prop changes
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onOpenChange(false);
  };

  const toggleCategory = (category: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleServiceType = (serviceType: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(serviceType)
        ? prev.serviceTypes.filter((s) => s !== serviceType)
        : [...prev.serviceTypes, serviceType],
    }));
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="destructive"
              className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] sm:w-[600px] max-h-[80vh] overflow-y-auto" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-base mb-1">Filter Leads</h4>
            <p className="text-sm text-muted-foreground">
              Apply filters to find the perfect leads for your business
            </p>
          </div>

        <div className="space-y-4">
          {/* Priority and Distance Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={localFilters.priority}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, priority: value as any })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Distance</Label>
              <Select
                value={localFilters.distance}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, distance: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any distance</SelectItem>
                  <SelectItem value="10">Within 10 miles</SelectItem>
                  <SelectItem value="25">Within 25 miles</SelectItem>
                  <SelectItem value="50">Within 50 miles</SelectItem>
                  <SelectItem value="100">Within 100 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget Range and Guest Count Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Select
                value={localFilters.budgetRange}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, budgetRange: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any budget</SelectItem>
                  <SelectItem value="$0-$2k">Under $2k</SelectItem>
                  <SelectItem value="$2k-$5k">$2k - $5k</SelectItem>
                  <SelectItem value="$5k-$10k">$5k - $10k</SelectItem>
                  <SelectItem value="$10k-$25k">$10k - $25k</SelectItem>
                  <SelectItem value="$25k+">$25k+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Guest Count</Label>
              <Select
                value={localFilters.guestCount}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, guestCount: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any count</SelectItem>
                  <SelectItem value="1-50">1-50</SelectItem>
                  <SelectItem value="51-100">51-100</SelectItem>
                  <SelectItem value="101-200">101-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="500+">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Event Category */}
          <div className="space-y-2">
            <Label>Event Category</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={
                    localFilters.categories.includes(category)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-primary/90 hover:text-white transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  {localFilters.categories.includes(category) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label>Service Type</Label>
            <div className="flex flex-wrap gap-2">
              {SERVICE_TYPES.map((serviceType) => (
                <Badge
                  key={serviceType}
                  variant={
                    localFilters.serviceTypes.includes(serviceType)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-primary/90 hover:text-white transition-colors"
                  onClick={() => toggleServiceType(serviceType)}
                >
                  {serviceType}
                  {localFilters.serviceTypes.includes(serviceType) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Event Date Range */}
          <div className="space-y-2">
            <Label>Event Date</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">From date</Label>
                <Input
                  type="date"
                  className="w-full"
                  value={localFilters.eventDateFrom}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      eventDateFrom: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">To date</Label>
                <Input
                  type="date"
                  className="w-full"
                  value={localFilters.eventDateTo}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      eventDateTo: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Minimum Match Score */}
          <div className="space-y-2">
            <Label>Minimum Match Score</Label>
            <Select
              value={localFilters.matchScore}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, matchScore: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="50">50+</SelectItem>
                <SelectItem value="65">65+</SelectItem>
                <SelectItem value="75">75+</SelectItem>
                <SelectItem value="85">85+</SelectItem>
                <SelectItem value="90">90+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-2 border-t">
          <Button
            variant="outline"
            onClick={onSavePreset}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save as Preset
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply Filters</Button>
          </div>
        </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

