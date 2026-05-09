"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Bookmark, Trash2, Save } from "lucide-react";
import { SortField, SortDirection, FilterPreset } from "./types/filters";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenFilters: () => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  presets: FilterPreset[];
  activePreset: FilterPreset | null;
  onPresetSelect: (preset: FilterPreset | null) => void;
  onPresetDelete: (presetId: string) => void;
  onSavePreset: () => void;
  activeFiltersCount: number;
  filterButtonTrigger?: React.ReactNode;
}

export default function SearchAndFilter({
  searchQuery,
  onSearchChange,
  onOpenFilters,
  sortField,
  sortDirection,
  onSortChange,
  presets,
  activePreset,
  onPresetSelect,
  onPresetDelete,
  onSavePreset,
  activeFiltersCount,
  filterButtonTrigger,
}: SearchAndFilterProps) {
  const toggleSortDirection = () => {
    onSortChange(sortField, sortDirection === "asc" ? "desc" : "asc");
  };

  const getSortLabel = (field: SortField) => {
    const labels: Record<SortField, string> = {
      eventDate: "Event Date",
      createdDate: "Created Date",
      budget: "Budget",
      guestCount: "Guest Count",
      matchScore: "Match Score",
      distance: "Distance",
    };
    return labels[field];
  };

  return (
    <Card className="bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20">
      <CardContent className="p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={sortField}
              onValueChange={(value) => onSortChange(value as SortField, sortDirection)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdDate">Created Date</SelectItem>
                <SelectItem value="eventDate">Event Date</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="guestCount">Guest Count</SelectItem>
                <SelectItem value="matchScore">Match Score</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Direction Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSortDirection}
              title={sortDirection === "asc" ? "Ascending" : "Descending"}
            >
              {sortDirection === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Presets Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Bookmark className="h-4 w-4 mr-2" />
                Presets
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px]">
              <DropdownMenuLabel>Quick Filters</DropdownMenuLabel>
              {presets.filter(p => p.isSystem).map((preset) => (
                <DropdownMenuItem
                  key={preset.id}
                  onClick={() => onPresetSelect(preset)}
                  className={activePreset?.id === preset.id ? "bg-accent" : ""}
                >
                  {preset.name}
                </DropdownMenuItem>
              ))}
              
              {presets.some(p => !p.isSystem) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>My Presets</DropdownMenuLabel>
                  {presets.filter(p => !p.isSystem).map((preset) => (
                    <DropdownMenuItem
                      key={preset.id}
                      className={`flex justify-between items-center ${activePreset?.id === preset.id ? "bg-accent" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPresetSelect(preset);
                      }}
                    >
                      <span>{preset.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPresetDelete(preset.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSavePreset}>
                <Save className="h-4 w-4 mr-2" />
                Save Current Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filters Button */}
          {filterButtonTrigger}
        </div>

        {/* Active Preset Badge */}
        {activePreset && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bookmark className="h-3 w-3" />
              Active Preset: {activePreset.name}
              <button
                onClick={() => onPresetSelect(null)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

