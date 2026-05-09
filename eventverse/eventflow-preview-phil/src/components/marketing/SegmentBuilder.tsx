import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Users } from "lucide-react";
import { SegmentFilter } from "@/types/marketing";

interface SegmentBuilderProps {
  onClose: () => void;
  onSave: () => void;
  guests: any[];
}

const SegmentBuilder = ({ onClose, onSave }: SegmentBuilderProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState<SegmentFilter[]>([]);
  const [estimatedCount] = useState(0);

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        field: "eventType",
        operator: "equals",
        value: ""
      }
    ]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, updates: Partial<SegmentFilter>) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    setFilters(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Create New Segment</CardTitle>
            <CardDescription>Define filters to create a targeted audience</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="segment-name">Segment Name</Label>
            <Input
              id="segment-name"
              placeholder="e.g., VIP Wedding Guests"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="segment-description">Description</Label>
            <Textarea
              id="segment-description"
              placeholder="Describe this audience segment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Filters</Label>
            <Button variant="outline" size="sm" onClick={addFilter}>
              <Plus className="w-4 h-4 mr-2" />
              Add Filter
            </Button>
          </div>

          {filters.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No filters added yet. Click "Add Filter" to start building your segment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filters.map((filter, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Field</Label>
                          <Select
                            value={filter.field}
                            onValueChange={(value) => updateFilter(index, { field: value as any })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eventType">Event Type</SelectItem>
                              <SelectItem value="ticketTier">Ticket Tier</SelectItem>
                              <SelectItem value="ageRange">Age Range</SelectItem>
                              <SelectItem value="location">Location</SelectItem>
                              <SelectItem value="totalSpent">Total Spent</SelectItem>
                              <SelectItem value="attendanceCount">Attendance Count</SelectItem>
                              <SelectItem value="lastEventDate">Last Event Date</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-xs">Operator</Label>
                          <Select
                            value={filter.operator}
                            onValueChange={(value) => updateFilter(index, { operator: value as any })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greaterThan">Greater Than</SelectItem>
                              <SelectItem value="lessThan">Less Than</SelectItem>
                              <SelectItem value="between">Between</SelectItem>
                              <SelectItem value="in">In</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-xs">Value</Label>
                          <Input
                            placeholder="Enter value..."
                            value={typeof filter.value === 'string' ? filter.value : ''}
                            onChange={(e) => updateFilter(index, { value: e.target.value })}
                          />
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-6"
                        onClick={() => removeFilter(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Estimated Count */}
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Estimated Audience Size</p>
                <p className="text-2xl font-bold">{estimatedCount} guests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button className="flex-1" onClick={onSave}>
            Create Segment
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentBuilder;
