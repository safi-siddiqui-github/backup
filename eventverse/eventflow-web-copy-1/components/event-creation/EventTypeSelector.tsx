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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Plus,
  Search,
  Star,
  Users,
  Zap,
} from "lucide-react";
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

const EventTypeSelector = ({ selectedType, onTypeSelect }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customType, setCustomType] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Filter event types based on search query
  const filteredEventTypes = predefinedEventTypes.filter((type) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      type.label.toLowerCase().includes(query) ||
      type.description.toLowerCase().includes(query) ||
      type.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      type.examples.some((example) => example.toLowerCase().includes(query))
    );
  });

  // Group filtered types by category
  const groupedTypes = eventCategories.reduce(
    (acc, category) => {
      acc[category.id] = filteredEventTypes.filter(
        (type) => type.category === category.id,
      );
      return acc;
    },
    {} as Record<string, EventTypeOption[]>,
  );

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

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const isCustomType =
    selectedType && !predefinedEventTypes.find((t) => t.value === selectedType);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search event types (e.g., wedding, conference, workshop...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-10 text-base"
        />
      </div>

      {/* Event Type Categories */}
      <div className="space-y-4">
        {eventCategories.map((category) => {
          const categoryTypes = groupedTypes[category.id];
          const hasResults = categoryTypes.length > 0;
          const isOpen = openCategories.includes(category.id);

          if (!hasResults && searchQuery) return null;

          return (
            <Collapsible
              key={category.id}
              open={isOpen}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-3 w-3 rounded-full",
                        category.color
                          .replace("bg-", "bg-")
                          .replace("-50", "-400"),
                      )}
                    />
                    <span className="font-semibold text-gray-800">
                      {category.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="ml-2"
                    >
                      {categoryTypes.length}
                    </Badge>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2 overflow-visible pt-1">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {categoryTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.value;

                    return (
                      <Card
                        key={type.value}
                        className={cn(
                          "group relative flex min-h-[140px] cursor-pointer flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                          type.color,
                          isSelected &&
                            "scale-[1.02] shadow-lg ring-2 ring-purple-500",
                        )}
                        onClick={() => onTypeSelect(type.value)}
                      >
                        {type.trending && (
                          <div className="absolute -top-1 -right-1 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 text-xs text-white">
                            <Zap className="h-2.5 w-2.5" />
                            <span className="text-xs">Hot</span>
                          </div>
                        )}
                        {type.popular && !type.trending && (
                          <div className="absolute -top-1 -right-1 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 text-xs text-white">
                            <Star className="h-2.5 w-2.5" />
                            <span className="text-xs">Pop</span>
                          </div>
                        )}

                        <CardHeader className="flex-shrink-0 p-4 pb-2">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "flex-shrink-0 rounded-lg bg-white p-2 shadow-sm transition-transform duration-300",
                                isSelected && "scale-110",
                              )}
                            >
                              <Icon className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="mb-1 text-sm leading-tight font-semibold text-gray-900">
                                {type.label}
                              </CardTitle>
                              <CardDescription className="text-xs leading-relaxed text-gray-600">
                                {type.description}
                              </CardDescription>
                            </div>
                            {isSelected && (
                              <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col justify-between p-4 pt-0">
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {type.examples.slice(0, 3).map((example, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="h-5 bg-white/50 px-2 py-1 text-xs"
                              >
                                {example}
                              </Badge>
                            ))}
                          </div>

                          <div className="mt-auto flex items-center justify-between border-t border-gray-200/50 pt-2 text-xs text-gray-600">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Users className="h-3 w-3 flex-shrink-0" />
                              <span className="text-xs">
                                {type.suggestedGuests}
                              </span>
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                              <DollarSign className="h-3 w-3 flex-shrink-0" />
                              <span className="text-xs">{type.avgBudget}</span>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {/* Custom Event Type */}
      <Card
        className={cn(
          "flex min-h-[120px] cursor-pointer flex-col border-2 border-dashed transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
          "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 hover:border-purple-400",
          (showCustomInput || isCustomType) &&
            "scale-[1.02] shadow-lg ring-2 ring-purple-500",
        )}
        onClick={() => {
          if (!showCustomInput) {
            setShowCustomInput(true);
          }
        }}
      >
        <CardHeader className="flex-shrink-0 p-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 rounded-xl bg-white p-2 shadow-sm">
              <Plus className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-semibold text-gray-900">
                {isCustomType ? "Custom Event" : "Create Custom"}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {isCustomType
                  ? `Selected: ${selectedType}`
                  : "Create your own event type"}
              </CardDescription>
            </div>
            {isCustomType && (
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-600" />
            )}
          </div>
        </CardHeader>

        {showCustomInput && (
          <CardContent className="flex-1 space-y-3 p-4 pt-0">
            <Input
              placeholder="Enter your event type..."
              value={customType}
              onChange={(e) => handleCustomTypeChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCustomTypeSubmit()}
              className="h-9 border-purple-300 focus:border-purple-500"
              autoFocus
            />

            {filteredSuggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {filteredSuggestions.map((suggestion, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="h-6 cursor-pointer border-purple-300 px-2 text-xs hover:bg-purple-100"
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
          </CardContent>
        )}
      </Card>

      {isCustomType && (
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">
              Custom Event Type Selected
            </span>
          </div>
          <p className="mt-1 text-sm text-purple-600">
            &quot;{selectedType}&quot; - We&apos;ll help you configure the best
            settings for your unique event.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypeSelector;
