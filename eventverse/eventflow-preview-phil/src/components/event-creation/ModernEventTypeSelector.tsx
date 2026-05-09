import { useState } from "react";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Plus, Zap, Star, Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { predefinedEventTypes, customEventTypeSuggestions, eventCategories, EventTypeOption } from "./constants/eventTypes";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsPerPage = 8;

  // Filter event types based on search query and category
  const filteredEventTypes = predefinedEventTypes.filter(type => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = (
        type.label.toLowerCase().includes(query) ||
        type.description.toLowerCase().includes(query) ||
        type.tags.some(tag => tag.toLowerCase().includes(query)) ||
        type.examples.some(example => example.toLowerCase().includes(query))
      );
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory === "all") return true;
    if (selectedCategory === "popular") return type.popular || type.trending;
    return type.category === selectedCategory;
  });

  // Apply pagination only for "All Events" category
  const shouldPaginate = selectedCategory === "all" && !searchQuery;
  const totalPages = shouldPaginate ? Math.ceil(filteredEventTypes.length / itemsPerPage) : 1;
  const startIndex = shouldPaginate ? (currentPage - 1) * itemsPerPage : 0;
  const endIndex = shouldPaginate ? startIndex + itemsPerPage : filteredEventTypes.length;
  const paginatedEventTypes = filteredEventTypes.slice(startIndex, endIndex);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleCustomTypeChange = (value: string) => {
    setCustomType(value);
    if (value.length > 0) {
      const filtered = customEventTypeSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
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
    const category = eventCategories.find(cat => cat.id === type.category);
    
    return (
      <Card
        key={type.value}
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative group",
          "border-2 hover:border-primary/40",
          isSelected && "ring-2 ring-primary shadow-lg -translate-y-1 border-primary",
          // Category color indicator
          `border-l-4 border-l-${category?.color || 'primary'}`
        )}
        onClick={() => onTypeSelect(type.value)}
      >
        {/* Trending/Popular badges */}
        {type.trending && (
          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 z-10">
            <Zap className="w-3 h-3 mr-1" />
            Hot
          </Badge>
        )}
        {type.popular && !type.trending && (
          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 z-10">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 transition-transform duration-300",
              isSelected && "scale-110 from-primary/20 to-primary/10"
            )}>
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                {type.label}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs line-clamp-2">
                {type.description}
              </CardDescription>
            </div>
            {isSelected && (
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {type.examples.slice(0, 2).map((example, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5">
                {example}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const isCustomType = selectedType && !predefinedEventTypes.find(t => t.value === selectedType);

  // Common event types for collapsed view
  const commonTypes = predefinedEventTypes.filter(t => 
    ['wedding', 'birthday-party', 'corporate-event', 'conference', 'workshop', 'festival', 'charity-fundraiser', 'networking-event'].includes(t.value)
  ).slice(0, 8);

  // Auto-expand when searching
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0 && !isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search event types..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 h-11 text-base"
        />
      </div>

      {/* Collapsed View - Common Types */}
      {!isExpanded && !searchQuery && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {commonTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.value;
              
              return (
                <Card
                  key={type.value}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] relative",
                    "border-2 hover:border-primary/40",
                    isSelected && "ring-2 ring-primary shadow-lg border-primary"
                  )}
                  onClick={() => onTypeSelect(type.value)}
                >
                  <CardHeader className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={cn(
                        "p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5",
                        isSelected && "scale-110 from-primary/20 to-primary/10"
                      )}>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-semibold">{type.label}</CardTitle>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-primary absolute top-2 right-2" />
                      )}
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(true)}
              className="w-full sm:w-auto"
            >
              <ChevronRight className="w-4 h-4 mr-2 rotate-90" />
              Show All Event Types
            </Button>
          </div>
        </div>
      )}

      {/* Expanded View - Full Interface */}
      {(isExpanded || searchQuery) && (
        <>
          {isExpanded && !searchQuery && (
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">All Event Types</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <ChevronRight className="w-4 h-4 mr-1 -rotate-90" />
                Show Less
              </Button>
            </div>
          )}

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === "all" ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm",
            selectedCategory === "all" && "shadow-sm"
          )}
          onClick={() => setSelectedCategory("all")}
        >
          All Events
        </Badge>
        <Badge
          variant={selectedCategory === "popular" ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm",
            selectedCategory === "popular" && "shadow-sm"
          )}
          onClick={() => setSelectedCategory("popular")}
        >
          <Star className="w-3 h-3 mr-1" />
          Popular
        </Badge>
        {eventCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm",
              selectedCategory === category.id && "shadow-sm"
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Badge>
          ))}
          </div>

          {/* Unified Event Types Grid */}
          <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedEventTypes.map(renderEventTypeCard)}
          {filteredEventTypes.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <div className="space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-lg font-medium">No events found</p>
              <p className="text-sm">
                {searchQuery 
                  ? `No events match "${searchQuery}" in ${selectedCategory === "all" ? "any category" : selectedCategory === "popular" ? "popular events" : eventCategories.find(c => c.id === selectedCategory)?.name}`
                  : `No events in ${selectedCategory === "all" ? "any category" : selectedCategory === "popular" ? "popular events" : eventCategories.find(c => c.id === selectedCategory)?.name}`
                }
              </p>
            </div>
          </div>
        )}
        </div>

        {/* Pagination Controls - Only show for "All Events" */}
        {shouldPaginate && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredEventTypes.length)} of {filteredEventTypes.length} event types
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-3"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
          </div>
        </>
      )}

      {/* Custom Event Type */}
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-dashed border-2",
          "bg-gradient-to-br from-muted/30 to-muted/10 border-muted-foreground/30 hover:border-primary/50",
          (showCustomInput || isCustomType) && "ring-2 ring-primary shadow-lg scale-[1.02] border-primary"
        )}
        onClick={() => {
          if (!showCustomInput) {
            setShowCustomInput(true);
          }
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base font-semibold">
                {isCustomType ? "Custom Event" : "Create Custom Type"}
              </CardTitle>
              <CardDescription>
                {isCustomType ? `Selected: ${selectedType}` : "Define your unique event type"}
              </CardDescription>
            </div>
            {isCustomType && (
              <CheckCircle className="w-5 h-5 text-primary" />
            )}
          </div>
        </CardHeader>
        
        {showCustomInput && (
          <CardContent className="pt-0 space-y-3">
            <Input
              placeholder="Enter your event type..."
              value={customType}
              onChange={(e) => handleCustomTypeChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomTypeSubmit()}
              className="border-primary/30 focus:border-primary"
              autoFocus
            />
            
            {filteredSuggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {filteredSuggestions.map((suggestion, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary/10 border-primary/30"
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
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">Custom Event Type Selected</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            "{selectedType}" - We'll customize the perfect setup for your unique event.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModernEventTypeSelector;