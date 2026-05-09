"use client";

import { useVendorNavigationStore } from "@/lib/lib-vendor-navigation-store";
import { useMemo, useState, useCallback, useEffect } from "react";
import LeadStatusTabs from "./LeadStatusTabs";
import LeadsList from "./LeadsList";
import SearchAndFilter from "./SearchAndFilter";
import { Lead, LeadStatus, mockLeads } from "./mockLeads";
import {
  LeadFilters,
  FilterPreset,
  SortField,
  SortDirection,
  DEFAULT_FILTERS,
  SYSTEM_PRESETS,
} from "./types/filters";
import FilterLeadsDialog from "./FilterLeadsDialog";
import SavePresetDialog from "./SavePresetDialog";
import ActiveFiltersDisplay from "./ActiveFiltersDisplay";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SmartLeadsContent() {
  const { leadToOpen, clearLeadToOpen } = useVendorNavigationStore();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusTab, setActiveStatusTab] = useState<LeadStatus>("new");
  const [filters, setFilters] = useState<LeadFilters>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<SortField>("createdDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isSavePresetDialogOpen, setIsSavePresetDialogOpen] = useState(false);
  const [presets, setPresets] = useState<FilterPreset[]>(SYSTEM_PRESETS);
  const [activePreset, setActivePreset] = useState<FilterPreset | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Load presets from localStorage
  useEffect(() => {
    const savedPresets = localStorage.getItem("leadFilterPresets");
    if (savedPresets) {
      try {
        const userPresets = JSON.parse(savedPresets);
        setPresets([...SYSTEM_PRESETS, ...userPresets]);
      } catch (e) {
        console.error("Failed to load presets:", e);
      }
    }
  }, []);

  // Save user presets to localStorage
  const saveUserPresets = useCallback((allPresets: FilterPreset[]) => {
    const userPresets = allPresets.filter((p) => !p.isSystem);
    localStorage.setItem("leadFilterPresets", JSON.stringify(userPresets));
  }, []);

  // Apply filters to leads
  const applyFilters = useCallback(
    (lead: Lead, currentFilters: LeadFilters) => {
      // Priority filter
      if (
        currentFilters.priority !== "all" &&
        lead.priority !== currentFilters.priority
      ) {
        return false;
      }

      // Distance filter
      if (currentFilters.distance !== "all" && lead.distance) {
        const maxDistance = parseInt(currentFilters.distance);
        if (lead.distance > maxDistance) return false;
      }

      // Budget range filter
      if (currentFilters.budgetRange !== "all") {
        const budget = lead.budget;
        const range = currentFilters.budgetRange;
        if (range === "$0-$2k" && (budget < 0 || budget > 2000)) return false;
        if (range === "$2k-$5k" && (budget < 2000 || budget > 5000))
          return false;
        if (range === "$5k-$10k" && (budget < 5000 || budget > 10000))
          return false;
        if (range === "$10k-$25k" && (budget < 10000 || budget > 25000))
          return false;
        if (range === "$25k+" && budget < 25000) return false;
      }

      // Guest count filter
      if (currentFilters.guestCount !== "all") {
        const guests = lead.guests;
        const range = currentFilters.guestCount;
        if (range === "1-50" && (guests < 1 || guests > 50)) return false;
        if (range === "51-100" && (guests < 51 || guests > 100)) return false;
        if (range === "101-200" && (guests < 101 || guests > 200)) return false;
        if (range === "201-500" && (guests < 201 || guests > 500))
          return false;
        if (range === "500+" && guests < 500) return false;
      }

      // Categories filter
      if (
        currentFilters.categories.length > 0 &&
        !currentFilters.categories.includes(lead.category)
      ) {
        return false;
      }

      // Service types filter
      if (
        currentFilters.serviceTypes.length > 0 &&
        !currentFilters.serviceTypes.includes(lead.serviceType)
      ) {
        return false;
      }

      // Event date filter
      if (currentFilters.eventDateFrom || currentFilters.eventDateTo) {
        // Parse lead event date (format: DD/MM/YYYY)
        const [day, month, year] = lead.eventDate.split("/");
        const leadDate = new Date(`${year}-${month}-${day}`);

        if (currentFilters.eventDateFrom) {
          const fromDate = new Date(currentFilters.eventDateFrom);
          if (leadDate < fromDate) return false;
        }

        if (currentFilters.eventDateTo) {
          const toDate = new Date(currentFilters.eventDateTo);
          if (leadDate > toDate) return false;
        }
      }

      // Match score filter
      if (currentFilters.matchScore !== "all") {
        const minScore = parseInt(currentFilters.matchScore);
        if (lead.matchPercentage < minScore) return false;
      }

      return true;
    },
    []
  );

  // Filter and sort leads
  const filteredLeads = useMemo(() => {
    let result = leads.filter((lead) => {
      // Status filter
      if (lead.status !== activeStatusTab) return false;

      // Apply all filters
      if (!applyFilters(lead, filters)) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          lead.eventTitle.toLowerCase().includes(query) ||
          lead.clientName.toLowerCase().includes(query) ||
          lead.description.toLowerCase().includes(query) ||
          lead.location.toLowerCase().includes(query) ||
          lead.category.toLowerCase().includes(query) ||
          lead.serviceType.toLowerCase().includes(query)
        );
      }

      return true;
    });

    // Sort results
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "createdDate": {
          const [dayA, monthA, yearA] = a.createdAt.split("/");
          const [dayB, monthB, yearB] = b.createdAt.split("/");
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
          comparison = dateA.getTime() - dateB.getTime();
          break;
        }
        case "eventDate": {
          const [dayA, monthA, yearA] = a.eventDate.split("/");
          const [dayB, monthB, yearB] = b.eventDate.split("/");
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
          comparison = dateA.getTime() - dateB.getTime();
          break;
        }
        case "budget":
          comparison = a.budget - b.budget;
          break;
        case "guestCount":
          comparison = a.guests - b.guests;
          break;
        case "matchScore":
          comparison = a.matchPercentage - b.matchPercentage;
          break;
        case "distance":
          comparison = (a.distance || 0) - (b.distance || 0);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [leads, searchQuery, filters, activeStatusTab, sortField, sortDirection, applyFilters]);

  // Paginated leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLeads.slice(startIndex, endIndex);
  }, [filteredLeads, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeStatusTab, searchQuery, filters, sortField, sortDirection]);

  // Count leads by status (considering filters)
  const leadCounts = useMemo(() => {
    const counts = {
      new: 0,
      contacted: 0,
      quoted: 0,
      won: 0,
      lost: 0,
    };

    leads.forEach((lead) => {
      if (!applyFilters(lead, filters)) return;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          lead.eventTitle.toLowerCase().includes(query) ||
          lead.clientName.toLowerCase().includes(query) ||
          lead.description.toLowerCase().includes(query) ||
          lead.location.toLowerCase().includes(query) ||
          lead.category.toLowerCase().includes(query) ||
          lead.serviceType.toLowerCase().includes(query);
        if (!matches) return;
      }

      if (lead.status in counts) {
        counts[lead.status as keyof typeof counts]++;
      }
    });

    return counts;
  }, [leads, filters, searchQuery, applyFilters]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priority !== "all") count++;
    if (filters.distance !== "all") count++;
    if (filters.budgetRange !== "all") count++;
    if (filters.guestCount !== "all") count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.serviceTypes.length > 0) count += filters.serviceTypes.length;
    if (filters.eventDateFrom || filters.eventDateTo) count++;
    if (filters.matchScore !== "all") count++;
    return count;
  }, [filters]);

  // Handle lead status change
  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  // Handle chat action (moves to contacted)
  const handleChat = (leadId: string) => {
    handleStatusChange(leadId, "contacted");
  };

  // Handle accept action (moves to won)
  const handleAccept = (leadId: string) => {
    handleStatusChange(leadId, "won");
  };

  // Handle reject action (moves to lost)
  const handleReject = (leadId: string) => {
    handleStatusChange(leadId, "lost");
  };

  // Handle preset selection
  const handlePresetSelect = (preset: FilterPreset | null) => {
    if (preset) {
      setFilters(preset.filters);
      setActivePreset(preset);
      toast.success("Preset Applied", {
        description: `Filters from "${preset.name}" have been applied.`,
      });
    } else {
      setActivePreset(null);
    }
  };

  // Handle preset deletion
  const handlePresetDelete = (presetId: string) => {
    const updatedPresets = presets.filter((p) => p.id !== presetId);
    setPresets(updatedPresets);
    saveUserPresets(updatedPresets);
    if (activePreset?.id === presetId) {
      setActivePreset(null);
    }
    toast.success("Preset Deleted", {
      description: "The preset has been removed.",
    });
  };

  // Handle save preset
  const handleSavePreset = (name: string) => {
    const newPreset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name,
      filters: { ...filters },
      isSystem: false,
    };
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    saveUserPresets(updatedPresets);
    toast.success("Preset Saved", {
      description: `"${name}" has been saved to your presets.`,
    });
  };

  // Handle remove individual filter
  const handleRemoveFilter = (filterKey: keyof LeadFilters, value?: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterKey === "categories" && value) {
        newFilters.categories = prev.categories.filter((c) => c !== value);
      } else if (filterKey === "serviceTypes" && value) {
        newFilters.serviceTypes = prev.serviceTypes.filter((s) => s !== value);
      } else if (filterKey === "eventDateFrom" || filterKey === "eventDateTo") {
        newFilters.eventDateFrom = "";
        newFilters.eventDateTo = "";
      } else {
        (newFilters[filterKey] as any) =
          filterKey === "categories" || filterKey === "serviceTypes"
            ? []
            : "all";
      }

      return newFilters;
    });
    setActivePreset(null);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setActivePreset(null);
    toast.success("Filters Cleared", {
      description: "All filters have been removed.",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filter Section */}
      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFilters={() => setIsFilterDialogOpen(true)}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={(field, direction) => {
          setSortField(field);
          setSortDirection(direction);
        }}
        presets={presets}
        activePreset={activePreset}
        onPresetSelect={handlePresetSelect}
        onPresetDelete={handlePresetDelete}
        onSavePreset={() => setIsSavePresetDialogOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filterButtonTrigger={
          <FilterLeadsDialog
            open={isFilterDialogOpen}
            onOpenChange={setIsFilterDialogOpen}
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={() => setActivePreset(null)}
            activeFiltersCount={activeFiltersCount}
            onSavePreset={() => setIsSavePresetDialogOpen(true)}
          />
        }
      />

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <ActiveFiltersDisplay
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
      )}

      {/* Status Tabs */}
      <LeadStatusTabs
        activeStatusTab={activeStatusTab}
        onStatusChange={setActiveStatusTab}
        leadCounts={leadCounts}
      >
        <LeadsList
          leads={paginatedLeads}
          allLeads={leads}
          onChat={handleChat}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </LeadStatusTabs>

      {/* Pagination */}
      {filteredLeads.length > 0 && (
        <Card className="!bg-white/95 [background-color:rgb(255_255_255/0.95)] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Items per page:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="dark:bg-background rounded-md border px-3 py-1.5 text-sm !bg-white dark:!bg-slate-700/50 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredLeads.length)} of{" "}
                  {filteredLeads.length}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-2 text-sm text-gray-600 dark:text-slate-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages, prev + 1),
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Preset Dialog */}
      <SavePresetDialog
        open={isSavePresetDialogOpen}
        onOpenChange={setIsSavePresetDialogOpen}
        onSave={handleSavePreset}
      />
    </div>
  );
}
