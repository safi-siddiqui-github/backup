"use client";

import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  statusOptions?: { value: string; label: string }[];
  onExport?: () => void;
  showExport?: boolean;
}

export default function SearchAndFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  statusFilter,
  onStatusFilterChange,
  statusOptions,
  onExport,
  showExport = true,
}: SearchAndFilterBarProps) {
  return (
    <Card className="bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20">
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 !bg-white dark:!bg-slate-800/95 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {statusFilter !== undefined && onStatusFilterChange && statusOptions && (
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-[150px] !bg-white dark:!bg-slate-800/95 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {showExport && onExport && (
            <Button
              variant="outline"
              onClick={onExport}
              className="!bg-white dark:!bg-slate-800/95 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

