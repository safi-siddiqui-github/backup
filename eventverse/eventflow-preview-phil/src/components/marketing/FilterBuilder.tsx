import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SegmentFilter } from "@/types/marketing";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBuilderProps {
  filters: SegmentFilter[];
  onFiltersChange: (filters: SegmentFilter[]) => void;
}

const filterFieldLabels: Record<SegmentFilter['field'], string> = {
  eventType: "Event Type",
  ticketTier: "Ticket Tier",
  ageRange: "Age Range",
  location: "Location",
  totalSpent: "Total Spent",
  attendanceCount: "Event Attendance",
  lastEventDate: "Last Event Date",
  rsvpPattern: "RSVP Pattern"
};

const operatorLabels: Record<SegmentFilter['operator'], string> = {
  equals: "Equals",
  contains: "Contains",
  greaterThan: "Greater Than",
  lessThan: "Less Than",
  between: "Between",
  in: "Is One Of"
};

const eventTypeOptions = ["Wedding", "Corporate", "Festival", "Concert", "Fundraiser", "Conference"];
const ticketTierOptions = ["VIP", "General Admission", "Early Bird", "Premium", "Standard"];
const rsvpPatternOptions = ["Always Confirms", "Late Responder", "Brings Plus Ones", "Often Declines"];

export const FilterBuilder = ({ filters, onFiltersChange }: FilterBuilderProps) => {
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const addFilter = () => {
    const newFilter: SegmentFilter = {
      field: "eventType",
      operator: "equals",
      value: ""
    };
    onFiltersChange([...filters, newFilter]);
    setExpandedFilter(filters.length);
  };

  const updateFilter = (index: number, updates: Partial<SegmentFilter>) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    onFiltersChange(newFilters);
  };

  const removeFilter = (index: number) => {
    onFiltersChange(filters.filter((_, i) => i !== index));
    if (expandedFilter === index) setExpandedFilter(null);
  };

  const applyTemplate = (template: 'vip' | 'engaged' | 'inactive') => {
    const templates: Record<string, SegmentFilter[]> = {
      vip: [
        { field: "ticketTier", operator: "equals", value: "VIP" },
        { field: "totalSpent", operator: "greaterThan", value: 1000 }
      ],
      engaged: [
        { field: "attendanceCount", operator: "greaterThan", value: 2 },
        { field: "lastEventDate", operator: "greaterThan", value: "6 months ago" }
      ],
      inactive: [
        { field: "lastEventDate", operator: "lessThan", value: "1 year ago" }
      ]
    };
    onFiltersChange(templates[template]);
  };

  const renderValueInput = (filter: SegmentFilter, index: number) => {
    if (filter.field === "eventType") {
      return (
        <Select
          value={filter.value as string}
          onValueChange={(value) => updateFilter(index, { value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypeOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (filter.field === "ticketTier") {
      return (
        <Select
          value={filter.value as string}
          onValueChange={(value) => updateFilter(index, { value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select ticket tier" />
          </SelectTrigger>
          <SelectContent>
            {ticketTierOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (filter.field === "rsvpPattern") {
      return (
        <Select
          value={filter.value as string}
          onValueChange={(value) => updateFilter(index, { value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select pattern" />
          </SelectTrigger>
          <SelectContent>
            {rsvpPatternOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (filter.field === "totalSpent" || filter.field === "attendanceCount") {
      return (
        <Input
          type="number"
          value={filter.value as number}
          onChange={(e) => updateFilter(index, { value: parseInt(e.target.value) || 0 })}
          placeholder={`Enter ${filter.field === "totalSpent" ? "amount" : "count"}`}
        />
      );
    }

    return (
      <Input
        value={filter.value as string}
        onChange={(e) => updateFilter(index, { value: e.target.value })}
        placeholder="Enter value"
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick Templates */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applyTemplate('vip')}
          className="gap-2"
        >
          <Sparkles className="w-3 h-3" />
          VIP High Spenders
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applyTemplate('engaged')}
          className="gap-2"
        >
          <Sparkles className="w-3 h-3" />
          Engaged Attendees
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applyTemplate('inactive')}
          className="gap-2"
        >
          <Sparkles className="w-3 h-3" />
          Inactive Guests
        </Button>
      </div>

      {/* Filters List */}
      <div className="space-y-3">
        {filters.map((filter, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 transition-all duration-200",
              expandedFilter === index && "ring-2 ring-primary/20"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Field</Label>
                    <Select
                      value={filter.field}
                      onValueChange={(value) => updateFilter(index, { field: value as SegmentFilter['field'] })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(filterFieldLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Operator</Label>
                    <Select
                      value={filter.operator}
                      onValueChange={(value) => updateFilter(index, { operator: value as SegmentFilter['operator'] })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(operatorLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Value</Label>
                    <div className="mt-1">
                      {renderValueInput(filter, index)}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilter(index)}
                  className="mt-5 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Filter Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addFilter}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Filter
      </Button>
    </div>
  );
};
