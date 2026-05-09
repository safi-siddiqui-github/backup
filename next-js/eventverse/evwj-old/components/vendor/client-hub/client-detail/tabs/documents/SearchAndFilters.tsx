"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchAndFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    typeFilter: string;
    onTypeFilterChange: (value: string) => void;
    uploadedByFilter: string;
    onUploadedByFilterChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    sortOrder: "newest" | "oldest";
    onSortOrderChange: (value: "newest" | "oldest") => void;
}

export default function SearchAndFilters({
    searchQuery,
    onSearchChange,
    typeFilter,
    onTypeFilterChange,
    uploadedByFilter,
    onUploadedByFilterChange,
    statusFilter,
    onStatusFilterChange,
    sortOrder,
    onSortOrderChange,
}: SearchAndFiltersProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-white dark:bg-slate-800"
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                <Select value={typeFilter} onValueChange={onTypeFilterChange}>
                    <SelectTrigger className="w-full sm:w-[140px] bg-white dark:bg-slate-800">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={uploadedByFilter} onValueChange={onUploadedByFilterChange}>
                    <SelectTrigger className="w-full sm:w-[120px] bg-white dark:bg-slate-800">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="vendor">By Me</SelectItem>
                        <SelectItem value="client">By Client</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger className="w-full sm:w-[140px] bg-white dark:bg-slate-800">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="viewed">Viewed</SelectItem>
                        <SelectItem value="unopened">Unopened</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={(v) => onSortOrderChange(v as "newest" | "oldest")}>
                    <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-slate-800">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest first</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

