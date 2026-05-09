import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { Table } from "@/types/venue";

export interface TableConfig {
  name: string;
  seats: number;
  shape: "round" | "rectangular" | "long-rectangular";
  targetGroup?: string;
  scale: number;
  notes?: string;
  rotation: number;
}

interface EnhancedTableConfigDialogProps {
  table?: Table;
  onSave: (config: TableConfig) => void;
  onClose: () => void;
  isCreating?: boolean;
  availableGroups: string[];
  existingTables?: Table[];
}

const generateNextTableName = (existingTables: Table[] = []): string => {
  // Get all existing table names that follow the "Table X" pattern
  const existingTableNumbers = existingTables
    .map(t => t.name)
    .filter(name => name.startsWith('Table '))
    .map(name => parseInt(name.replace('Table ', '')))
    .filter(num => !isNaN(num));
  
  // Find the next available number starting from 1
  let nextNumber = 1;
  while (existingTableNumbers.includes(nextNumber)) {
    nextNumber++;
  }
  
  return `Table ${nextNumber}`;
};

const EnhancedTableConfigDialog = ({ 
  table, 
  onSave, 
  onClose, 
  isCreating = false,
  availableGroups,
  existingTables = []
}: EnhancedTableConfigDialogProps) => {
  const [config, setConfig] = useState<TableConfig>({
    name: table?.name || (isCreating ? generateNextTableName(existingTables) : "Table"),
    seats: table?.seats || 8,
    shape: table?.shape || "round",
    targetGroup: table?.targetGroup || "all",
    scale: table?.scale || 1,
    notes: table?.notes || "",
    rotation: table?.rotation || 0,
  });

  const handleSave = () => {
    onSave(config);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isCreating ? "Create New Table" : "Configure Table"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="tableName">Table Name</Label>
            <Input
              id="tableName"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="Enter table name"
            />
          </div>
          
          <div>
            <Label htmlFor="shape">Table Shape</Label>
            <Select value={config.shape} onValueChange={(value: "round" | "rectangular" | "long-rectangular") => setConfig({ ...config, shape: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round">Round</SelectItem>
                <SelectItem value="rectangular">Rectangular</SelectItem>
                <SelectItem value="long-rectangular">Long Rectangular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="seats">Number of Seats: {config.seats}</Label>
            <Slider
              value={[config.seats]}
              onValueChange={(value) => setConfig({ ...config, seats: value[0] })}
              max={20}
              min={2}
              step={1}
              className="mt-2"
            />
          </div>

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
            <Label htmlFor="scale">Table Size: {Math.round(config.scale * 100)}%</Label>
            <Slider
              value={[config.scale]}
              onValueChange={(value) => setConfig({ ...config, scale: value[0] })}
              max={2}
              min={0.5}
              step={0.1}
              className="mt-2"
            />
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
          <Button onClick={handleSave}>{isCreating ? "Create Table" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedTableConfigDialog;
