import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";

interface CheckInTimeData {
  hasCustomCheckIn: boolean;
  checkInTime?: string;
  bufferTime?: number;
  checkInInstructions?: string;
  earlyCheckIn?: boolean;
  lateCheckIn?: boolean;
}

interface Props {
  data?: CheckInTimeData;
  onUpdate: (data: CheckInTimeData) => void;
}

const CheckInTimeField = ({ data = { hasCustomCheckIn: false }, onUpdate }: Props) => {
  const [localData, setLocalData] = useState<CheckInTimeData>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleUpdate = (updates: Partial<CheckInTimeData>) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    onUpdate(newData);
  };

  const bufferTimeOptions = [
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "45 minutes", value: 45 },
    { label: "1 hour", value: 60 },
    { label: "1.5 hours", value: 90 },
    { label: "2 hours", value: 120 }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <Label htmlFor="check-in-time" className="text-base font-medium">
          Check-in Time & Instructions
        </Label>
        <Switch
          id="check-in-time"
          checked={localData.hasCustomCheckIn}
          onCheckedChange={(checked) => handleUpdate({ hasCustomCheckIn: checked })}
        />
      </div>

      {localData.hasCustomCheckIn && (
        <Card className="bg-muted/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Configure Check-in Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Check-in Start Time</Label>
                <Input
                  type="time"
                  value={localData.checkInTime || ""}
                  onChange={(e) => handleUpdate({ checkInTime: e.target.value })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  When attendees can start checking in
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Buffer Time Before Event</Label>
                <Select 
                  value={localData.bufferTime?.toString() || ""}
                  onValueChange={(value) => handleUpdate({ bufferTime: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select buffer time" />
                  </SelectTrigger>
                  <SelectContent>
                    {bufferTimeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  How early guests can arrive
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="early-check-in"
                  checked={localData.earlyCheckIn || false}
                  onCheckedChange={(checked) => handleUpdate({ earlyCheckIn: checked })}
                />
                <Label htmlFor="early-check-in" className="text-sm">
                  Allow early check-in (before scheduled time)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="late-check-in"
                  checked={localData.lateCheckIn || false}
                  onCheckedChange={(checked) => handleUpdate({ lateCheckIn: checked })}
                />
                <Label htmlFor="late-check-in" className="text-sm">
                  Allow late check-in (after event starts)
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Check-in Instructions</Label>
              <Textarea
                value={localData.checkInInstructions || ""}
                onChange={(e) => handleUpdate({ checkInInstructions: e.target.value })}
                placeholder="e.g., 'Please bring a valid ID and your ticket confirmation. Check-in is located at the main entrance.'"
                className="mt-1"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide clear instructions for attendees about the check-in process
              </p>
            </div>

            {/* Preview */}
            {(localData.checkInTime || localData.bufferTime || localData.checkInInstructions) && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-4">
                <h4 className="text-sm font-medium text-primary mb-2">Check-in Preview</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  {localData.checkInTime && (
                    <p>• Check-in opens at {localData.checkInTime}</p>
                  )}
                  {localData.bufferTime && (
                    <p>• Arrive {bufferTimeOptions.find(opt => opt.value === localData.bufferTime)?.label} before event start</p>
                  )}
                  {localData.earlyCheckIn && (
                    <p>• Early arrival permitted</p>
                  )}
                  {localData.lateCheckIn && (
                    <p>• Late check-in available</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CheckInTimeField;