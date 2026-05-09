
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, Plus, Zap, Star, DollarSign, Users, Search, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { predefinedEventTypes, customEventTypeSuggestions, eventCategories, EventTypeOption } from "./constants/eventTypes";

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
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter event types based on search query
  const filteredEventTypes = predefinedEventTypes.filter(type => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      type.label.toLowerCase().includes(query) ||
      type.description.toLowerCase().includes(query) ||
      type.tags.some(tag => tag.toLowerCase().includes(query)) ||
      type.examples.some(example => example.toLowerCase().includes(query))
    );
  });

  // Group filtered types by category
  const groupedTypes = eventCategories.reduce((acc, category) => {
    acc[category.id] = filteredEventTypes.filter(type => type.category === category.id);
    return acc;
  }, {} as Record<string, EventTypeOption[]>);

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

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCustomType = selectedType && !predefinedEventTypes.find(t => t.value === selectedType);

  // Common event types for collapsed view
  const commonTypes = predefinedEventTypes.filter(t => 
    ['wedding', 'birthday-party', 'corporate-event', 'conference', 'workshop', 'festival', 'charity-fundraiser', 'networking-event'].includes(t.value)
  ).slice(0, 8);

  // Auto-expand when user searches
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
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search event types (e.g., wedding, conference, workshop...)"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 h-12 text-base"
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
                    type.color,
                    isSelected && "ring-2 ring-purple-500 shadow-lg"
                  )}
                  onClick={() => onTypeSelect(type.value)}
                >
                  <CardHeader className="p-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={cn(
                        "p-2 rounded-lg bg-white shadow-sm",
                        isSelected && "scale-110"
                      )}>
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-sm font-semibold text-gray-900">{type.label}</CardTitle>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-purple-600 absolute top-2 right-2" />
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
              <ChevronDown className="w-4 h-4 mr-2" />
              Show All Event Types
            </Button>
          </div>
        </div>
      )}

      {/* Expanded View - All Categories */}
      {(isExpanded || searchQuery) && (
        <>
          {isExpanded && !searchQuery && (
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">All Event Types</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <ChevronRight className="w-4 h-4 mr-1 rotate-90" />
                Show Less
              </Button>
            </div>
          )}

          {/* Event Type Categories */}
          <div className="space-y-4">
        {eventCategories.map((category) => {
          const categoryTypes = groupedTypes[category.id];
          const hasResults = categoryTypes.length > 0;
          const isOpen = openCategories.includes(category.id);
          
          if (!hasResults && searchQuery) return null;

          return (
            <Collapsible key={category.id} open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto text-left hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", category.color.replace("bg-", "bg-").replace("-50", "-400"))} />
                    <span className="font-semibold text-gray-800">{category.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {categoryTypes.length}
                    </Badge>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-2 pt-1 overflow-visible">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {categoryTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.value;
                    
                    return (
                      <Card
                        key={type.value}
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] relative group min-h-[140px] flex flex-col",
                          type.color,
                          isSelected && "ring-2 ring-purple-500 shadow-lg scale-[1.02]"
                        )}
                        onClick={() => onTypeSelect(type.value)}
                      >
                        {type.trending && (
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                            <Zap className="w-2.5 h-2.5" />
                            <span className="text-xs">Hot</span>
                          </div>
                        )}
                        {type.popular && !type.trending && (
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                            <Star className="w-2.5 h-2.5" />
                            <span className="text-xs">Pop</span>
                          </div>
                        )}

                        <CardHeader className="pb-2 p-4 flex-shrink-0">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "p-2 rounded-lg bg-white shadow-sm transition-transform duration-300 flex-shrink-0",
                              isSelected && "scale-110"
                            )}>
                              <Icon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm font-semibold text-gray-900 leading-tight mb-1">{type.label}</CardTitle>
                              <CardDescription className="text-gray-600 text-xs leading-relaxed">{type.description}</CardDescription>
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0 p-4 flex flex-col justify-between flex-1">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {type.examples.slice(0, 3).map((example, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-white/50 px-2 py-1 h-5">
                                {example}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center text-xs text-gray-600 mt-auto pt-2 border-t border-gray-200/50">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Users className="w-3 h-3 flex-shrink-0" />
                              <span className="text-xs">{type.suggestedGuests}</span>
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                              <DollarSign className="w-3 h-3 flex-shrink-0" />
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
        </>
      )}

      {/* Custom Event Type */}
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] border-dashed border-2 min-h-[120px] flex flex-col",
          "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300 hover:border-purple-400",
          (showCustomInput || isCustomType) && "ring-2 ring-purple-500 shadow-lg scale-[1.02]"
        )}
        onClick={() => {
          if (!showCustomInput) {
            setShowCustomInput(true);
          }
        }}
      >
        <CardHeader className="pb-2 p-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-sm flex-shrink-0">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold text-gray-900">{isCustomType ? "Custom Event" : "Create Custom"}</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                {isCustomType ? `Selected: ${selectedType}` : "Create your own event type"}
              </CardDescription>
            </div>
            {isCustomType && (
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
            )}
          </div>
        </CardHeader>
        
        {showCustomInput && (
          <CardContent className="pt-0 p-4 space-y-3 flex-1">
            <Input
              placeholder="Enter your event type..."
              value={customType}
              onChange={(e) => handleCustomTypeChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCustomTypeSubmit()}
              className="border-purple-300 focus:border-purple-500 h-9"
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
                      className="text-xs cursor-pointer hover:bg-purple-100 border-purple-300 h-6 px-2"
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">Custom Event Type Selected</span>
          </div>
          <p className="text-sm text-purple-600 mt-1">
            "{selectedType}" - We'll help you configure the best settings for your unique event.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypeSelector;
