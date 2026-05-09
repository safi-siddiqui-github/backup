"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Star,
  Zap,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import {
  customEventTypeSuggestions,
  eventCategories,
  EventTypeOption,
  predefinedEventTypes,
} from "./constants/eventTypes";

interface Props {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const ModernEventTypeSelector = ({ selectedType, onTypeSelect }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customType, setCustomType] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter event types based on search query and category
  const filteredEventTypes = predefinedEventTypes.filter((type) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        type.label.toLowerCase().includes(query) ||
        type.description.toLowerCase().includes(query) ||
        type.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        type.examples.some((example) => example.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory === "all") return true;
    if (selectedCategory === "popular") return type.popular || type.trending;
    return type.category === selectedCategory;
  });

  // Apply pagination only for "All Events" category
  const shouldPaginate = selectedCategory === "all" && !searchQuery;
  const totalPages = shouldPaginate
    ? Math.ceil(filteredEventTypes.length / itemsPerPage)
    : 1;
  const startIndex = shouldPaginate ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = shouldPaginate
    ? startIndex + itemsPerPage
    : filteredEventTypes.length;
  const paginatedEventTypes = filteredEventTypes.slice(startIndex, endIndex);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleCustomTypeChange = (value: string) => {
    setCustomType(value);
    if (value.length > 0) {
      const filtered = customEventTypeSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestions(filtered.slice(0, 5));
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleCustomTypeSubmit = () => {
    if (customType.trim()) {
      onTypeSelect(customType.trim());
      setShowCustomInput(false);
      setCustomType("");
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setCustomType(suggestion);
    onTypeSelect(suggestion);
    setShowCustomInput(false);
    setFilteredSuggestions([]);
  };

  const renderEventTypeCard = (type: EventTypeOption) => {
    const Icon = type.icon;
    const isSelected = selectedType === type.value;
    const category = eventCategories.find((cat) => cat.id === type.category);

    return (
      <Card
        key={type.value}
        className={cn(
          "group relative cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
          "hover:border-primary/40 border-2",
          isSelected &&
            "ring-primary border-primary -translate-y-1 shadow-lg ring-2",
          // Category color indicator
          `border-l-4 border-l-${category?.color || "primary"}`,
        )}
        onClick={() => onTypeSelect(type.value)}
      >
        {/* Trending/Popular badges */}
        {type.trending && (
          <Badge className="absolute -top-2 -right-2 z-10 border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <Zap className="mr-1 h-3 w-3" />
            Hot
          </Badge>
        )}
        {type.popular && !type.trending && (
          <Badge className="absolute -top-2 -right-2 z-10 border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Star className="mr-1 h-3 w-3" />
            Popular
          </Badge>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "from-primary/10 to-primary/5 rounded-lg bg-gradient-to-br p-3 transition-transform duration-300",
                isSelected && "from-primary/20 to-primary/10 scale-110",
              )}
            >
              <Icon className="text-primary h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-foreground mb-1 line-clamp-1 text-sm font-semibold">
                {type.label}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-2 text-xs">
                {type.description}
              </CardDescription>
            </div>
            {isSelected && (
              <CheckCircle className="text-primary h-4 w-4 flex-shrink-0" />
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {type.examples.slice(0, 2).map((example, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-1.5 py-0.5 text-xs"
              >
                {example}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const isCustomType =
    selectedType && !predefinedEventTypes.find((t) => t.value === selectedType);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
        <Input
          placeholder="Search event types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 pl-10 text-base"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === "all" ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-3 py-1.5 text-sm transition-all duration-200",
            selectedCategory === "all" && "shadow-sm",
          )}
          onClick={() => setSelectedCategory("all")}
        >
          All Events
        </Badge>
        <Badge
          variant={selectedCategory === "popular" ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-3 py-1.5 text-sm transition-all duration-200",
            selectedCategory === "popular" && "shadow-sm",
          )}
          onClick={() => setSelectedCategory("popular")}
        >
          <Star className="mr-1 h-3 w-3" />
          Popular
        </Badge>
        {eventCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-sm transition-all duration-200",
              selectedCategory === category.id && "shadow-sm",
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Unified Event Types Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedEventTypes.map(renderEventTypeCard)}
          {filteredEventTypes.length === 0 && (
            <div className="text-muted-foreground col-span-full py-12 text-center">
              <div className="space-y-2">
                <Search className="mx-auto h-8 w-8 opacity-50" />
                <p className="text-lg font-medium">No events found</p>
                <p className="text-sm">
                  {searchQuery
                    ? `No events match "${searchQuery}" in ${selectedCategory === "all" ? "any category" : selectedCategory === "popular" ? "popular events" : eventCategories.find((c) => c.id === selectedCategory)?.name}`
                    : `No events in ${selectedCategory === "all" ? "any category" : selectedCategory === "popular" ? "popular events" : eventCategories.find((c) => c.id === selectedCategory)?.name}`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls - Only show for "All Events" */}
        {shouldPaginate && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredEventTypes.length)} of{" "}
              {filteredEventTypes.length} event types
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="h-8 px-3"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Event Type */}
      <Card
        className={cn(
          "cursor-pointer border-2 border-dashed transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
          "from-muted/30 to-muted/10 border-muted-foreground/30 hover:border-primary/50 bg-gradient-to-br",
          (showCustomInput || isCustomType) &&
            "ring-primary border-primary scale-[1.02] shadow-lg ring-2",
        )}
        onClick={() => {
          if (!showCustomInput) {
            setShowCustomInput(true);
          }
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-xl p-3">
              <Plus className="text-primary h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base font-semibold">
                {isCustomType ? "Custom Event" : "Create Custom Type"}
              </CardTitle>
              <CardDescription>
                {isCustomType
                  ? `Selected: ${selectedType}`
                  : "Define your unique event type"}
              </CardDescription>
            </div>
            {isCustomType && <CheckCircle className="text-primary h-5 w-5" />}
          </div>
        </CardHeader>

        {showCustomInput && (
          <CardContent className="space-y-3 pt-0">
            <Input
              placeholder="Enter your event type..."
              value={customType}
              onChange={(e) => handleCustomTypeChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCustomTypeSubmit()}
              className="border-primary/30 focus:border-primary"
              autoFocus
            />

            {filteredSuggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {filteredSuggestions.map((suggestion, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="hover:bg-primary/10 border-primary/30 cursor-pointer text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSuggestionSelect(suggestion);
                      }}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleCustomTypeSubmit}
              disabled={!customType.trim()}
              className="w-full"
              size="sm"
            >
              Select Custom Type
            </Button>
          </CardContent>
        )}
      </Card>

      {isCustomType && (
        <div className="bg-primary/5 border-primary/20 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-primary h-5 w-5" />
            <span className="text-primary font-medium">
              Custom Event Type Selected
            </span>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            &quot;{selectedType}&quot; - We&apos;ll customize the perfect setup
            for your unique event.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModernEventTypeSelector;
