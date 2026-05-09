"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Filter, X } from "lucide-react";
import { useState } from "react";

interface EventSearchFiltersProps {
  onClose: () => void;
  onFiltersChange: (filters: FilterType) => void;
}

type FilterType = {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  priceRange: number[];
  categories: string[];
  eventTypes: string[];
  locationRadius: number;
  attendeeCount: number[];
};

const EventSearchFilters = ({
  onClose,
  onFiltersChange,
}: EventSearchFiltersProps) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [locationRadius, setLocationRadius] = useState([25]);
  const [attendeeCount, setAttendeeCount] = useState([50, 1000]);

  const categories = [
    "Entertainment",
    "Business",
    "Education",
    "Sports",
    "Food & Drink",
    "Arts & Culture",
    "Health & Wellness",
    "Technology",
  ];

  const types = [
    "Conference",
    "Workshop",
    "Concert",
    "Festival",
    "Networking",
    "Seminar",
    "Exhibition",
    "Party",
    "Competition",
    "Charity",
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleEventTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setEventTypes([...eventTypes, type]);
    } else {
      setEventTypes(eventTypes.filter((t) => t !== type));
    }
  };

  const handleApplyFilters = () => {
    const filters: FilterType = {
      dateRange,
      priceRange,
      categories: selectedCategories,
      eventTypes,
      locationRadius: locationRadius[0],
      attendeeCount,
    };
    onFiltersChange(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setDateRange({ from: null, to: null });
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setEventTypes([]);
    setLocationRadius([25]);
    setAttendeeCount([50, 1000]);
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Date Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Date Range</Label>
                <div className="space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from || new Date()}
                        selected={{
                          from: dateRange.from || undefined,
                          to: dateRange.to || undefined,
                        }}
                        onSelect={(range) => {
                          setDateRange({
                            from: range?.from || null,
                            to: range?.to || null,
                          });
                        }}
                        numberOfMonths={2}
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Price Range ($)</Label>
                <div className="px-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Location Radius */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Distance (miles)</Label>
                <div className="px-3">
                  <Slider
                    value={locationRadius}
                    onValueChange={setLocationRadius}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>5 mi</span>
                    <span>{locationRadius[0]} miles</span>
                    <span>100 mi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Categories */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={category}
                        className="cursor-pointer text-sm font-normal"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Types */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Event Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={type}
                        checked={eventTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleEventTypeChange(type, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={type}
                        className="cursor-pointer text-sm font-normal"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendee Count */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Expected Attendees</Label>
              <div className="px-3">
                <Slider
                  value={attendeeCount}
                  onValueChange={setAttendeeCount}
                  max={2000}
                  min={10}
                  step={50}
                  className="w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>{attendeeCount[0]} people</span>
                  <span>{attendeeCount[1]} people</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 border-t pt-4">
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventSearchFilters;
