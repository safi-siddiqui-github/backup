import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";

interface AgeRestrictionsData {
  hasRestrictions: boolean;
  minAge?: number;
  maxAge?: number;
  requiresGuardian?: boolean;
  customMessage?: string;
  restrictionType?: 'minimum' | 'maximum' | 'range' | 'exact';
}

interface Props {
  data?: AgeRestrictionsData;
  onUpdate: (data: AgeRestrictionsData) => void;
}

const AgeRestrictionsField = ({ data = { hasRestrictions: false }, onUpdate }: Props) => {
  const [localData, setLocalData] = useState<AgeRestrictionsData>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleUpdate = (updates: Partial<AgeRestrictionsData>) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    onUpdate(newData);
  };

  const commonAgeRestrictions = [
    { label: "18+ Adults Only", minAge: 18, type: 'minimum' },
    { label: "21+ Adults Only", minAge: 21, type: 'minimum' },
    { label: "13+ Teenagers & Adults", minAge: 13, type: 'minimum' },
    { label: "All Ages Welcome", type: 'none' },
    { label: "Kids Event (Under 12)", maxAge: 12, type: 'maximum' },
    { label: "Family Friendly", type: 'family' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Users className="w-5 h-5 text-muted-foreground" />
        <Label htmlFor="age-restrictions" className="text-base font-medium">
          Age Restrictions
        </Label>
        <Switch
          id="age-restrictions"
          checked={localData.hasRestrictions}
          onCheckedChange={(checked) => handleUpdate({ hasRestrictions: checked })}
        />
      </div>

      {localData.hasRestrictions && (
        <Card className="bg-muted/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Configure Age Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Presets */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {commonAgeRestrictions.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-left p-3 text-sm border rounded-lg hover:bg-muted transition-colors"
                    onClick={() => {
                      if (preset.type === 'none') {
                        handleUpdate({ 
                          restrictionType: undefined,
                          minAge: undefined,
                          maxAge: undefined,
                          requiresGuardian: false 
                        });
                      } else if (preset.type === 'family') {
                        handleUpdate({
                          restrictionType: 'minimum',
                          minAge: undefined,
                          requiresGuardian: true,
                          customMessage: "Children must be accompanied by an adult"
                        });
                      } else {
                        handleUpdate({
                          restrictionType: preset.type as any,
                          minAge: preset.minAge,
                          maxAge: preset.maxAge,
                          requiresGuardian: preset.minAge ? preset.minAge < 18 : false
                        });
                      }
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Configuration */}
            <div className="border-t pt-4">
              <Label className="text-sm font-medium mb-3 block">Custom Configuration</Label>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Restriction Type</Label>
                  <Select 
                    value={localData.restrictionType || ""}
                    onValueChange={(value) => handleUpdate({ restrictionType: value as any })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select restriction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimum">Minimum Age</SelectItem>
                      <SelectItem value="maximum">Maximum Age</SelectItem>
                      <SelectItem value="range">Age Range</SelectItem>
                      <SelectItem value="exact">Exact Age</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(localData.restrictionType === 'minimum' || localData.restrictionType === 'range' || localData.restrictionType === 'exact') && (
                  <div>
                    <Label className="text-sm">
                      {localData.restrictionType === 'exact' ? 'Required Age' : 'Minimum Age'}
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={localData.minAge || ""}
                      onChange={(e) => handleUpdate({ minAge: parseInt(e.target.value) || undefined })}
                      placeholder="Enter age"
                      className="mt-1"
                    />
                  </div>
                )}

                {(localData.restrictionType === 'maximum' || localData.restrictionType === 'range') && (
                  <div>
                    <Label className="text-sm">Maximum Age</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={localData.maxAge || ""}
                      onChange={(e) => handleUpdate({ maxAge: parseInt(e.target.value) || undefined })}
                      placeholder="Enter age"
                      className="mt-1"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="requires-guardian"
                    checked={localData.requiresGuardian || false}
                    onCheckedChange={(checked) => handleUpdate({ requiresGuardian: checked })}
                  />
                  <Label htmlFor="requires-guardian" className="text-sm">
                    Minors must be accompanied by guardian
                  </Label>
                </div>

                <div>
                  <Label className="text-sm">Custom Message (Optional)</Label>
                  <Textarea
                    value={localData.customMessage || ""}
                    onChange={(e) => handleUpdate({ customMessage: e.target.value })}
                    placeholder="e.g., 'Valid ID required for verification'"
                    className="mt-1"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgeRestrictionsField;