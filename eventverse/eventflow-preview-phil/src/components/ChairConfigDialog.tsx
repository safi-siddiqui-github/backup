
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Chair } from "@/types/venue";

interface ChairConfig {
  name: string;
  layoutType: "single" | "grid";
  rows: number;
  columns: number;
  targetGroup?: string;
  notes?: string;
  rotation: number;
}

interface ChairConfigDialogProps {
  chair?: Chair;
  onSave: (config: ChairConfig) => void;
  onClose: () => void;
  isCreating?: boolean;
  availableGroups: string[];
}

const ChairConfigDialog = ({ 
  chair, 
  onSave, 
  onClose, 
  isCreating = false,
  availableGroups 
}: ChairConfigDialogProps) => {
  const [config, setConfig] = useState<ChairConfig>({
    name: chair?.name || `Chair ${Date.now()}`,
    layoutType: "single",
    rows: 1,
    columns: 1,
    targetGroup: chair?.targetGroup || "all",
    notes: chair?.notes || "",
    rotation: chair?.rotation || 0,
  });

  const handleSave = () => {
    onSave(config);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isCreating ? "Create Chairs" : "Configure Chair"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="chairName">Chair Name</Label>
            <Input
              id="chairName"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="Enter chair name"
            />
          </div>

          {isCreating && (
            <div>
              <Label>Chair Layout</Label>
              <RadioGroup
                value={config.layoutType}
                onValueChange={(value: "single" | "grid") => setConfig({ ...config, layoutType: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">Single Chair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="grid" id="grid" />
                  <Label htmlFor="grid">Grid Layout (Multiple Chairs)</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {config.layoutType === "grid" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  min="1"
                  max="20"
                  value={config.rows}
                  onChange={(e) => setConfig({ ...config, rows: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="columns">Columns</Label>
                <Input
                  id="columns"
                  type="number"
                  min="1"
                  max="20"
                  value={config.columns}
                  onChange={(e) => setConfig({ ...config, columns: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="targetGroup">Target Group</Label>
            <Select value={config.targetGroup || "all"} onValueChange={(value) => setConfig({ ...config, targetGroup: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {availableGroups.filter(group => group && group.trim()).map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Rotation: {config.rotation}°</Label>
            <Slider
              value={[config.rotation]}
              onValueChange={([value]) => setConfig({ ...config, rotation: value })}
              max={360}
              step={15}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={config.notes}
              onChange={(e) => setConfig({ ...config, notes: e.target.value })}
              placeholder="Special requirements, accessibility needs, etc."
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{isCreating ? "Create Chairs" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChairConfigDialog;
