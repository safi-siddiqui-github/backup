import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { Table } from "@/types/venue";

interface TableConfig {
  name: string;
  seats: number;
  shape: "round" | "rectangular" | "long-rectangular";
}

interface TableConfigDialogProps {
  table: Table;
  onSave: (config: TableConfig) => void;
  onClose: () => void;
}

const TableConfigDialog = ({ table, onSave, onClose }: TableConfigDialogProps) => {
  const [config, setConfig] = useState<TableConfig>({
    name: table.name || "Table",
    seats: table.seats || 4,
    shape: table.shape || "round",
  });

  const handleSave = () => {
    // Ensure we have valid values before saving
    if (config.name.trim() && config.seats > 0 && config.shape) {
      onSave({
        ...config,
        name: config.name.trim()
      });
    }
  };

  const handleShapeChange = (value: string) => {
    // Only update if value is one of the allowed shapes and not empty
    if (value && (value === "round" || value === "rectangular" || value === "long-rectangular")) {
      setConfig({ ...config, shape: value as "round" | "rectangular" | "long-rectangular" });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Table</DialogTitle>
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
            <Label htmlFor="seats">Number of Seats</Label>
            <Input
              id="seats"
              type="number"
              min="2"
              max="20"
              value={config.seats}
              onChange={(e) => setConfig({ ...config, seats: parseInt(e.target.value) || 2 })}
            />
          </div>
          
          <div>
            <Label htmlFor="shape">Table Shape</Label>
            <Select value={config.shape} onValueChange={handleShapeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select table shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round">Round</SelectItem>
                <SelectItem value="rectangular">Rectangular</SelectItem>
                <SelectItem value="long-rectangular">Long Rectangular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!config.name.trim() || config.seats < 2}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TableConfigDialog;
