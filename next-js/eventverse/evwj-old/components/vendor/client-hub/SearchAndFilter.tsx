"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { ClientStatus } from "./mockClients";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ClientStatus | "all";
  onStatusChange: (status: ClientStatus | "all") => void;
}

export default function SearchAndFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: SearchAndFilterProps) {
  return (
    <Card className="bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 text-sm sm:text-base"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              onStatusChange(value as ClientStatus | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[180px] shrink-0">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

