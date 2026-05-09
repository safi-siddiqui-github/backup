
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Presentation, Speaker, DoorOpen, Music, Tent, Store, TreePine, Columns3, Droplets, Sofa } from "lucide-react";
import type { VenueObject, VenueObjectType } from "./VenueObject";

const venueObjectTypes: VenueObjectType[] = [
  {
    type: "stage",
    name: "Stage",
    icon: Presentation,
    defaultSize: { width: 200, height: 100 },
    color: "#8B5CF6"
  },
  {
    type: "podium",
    name: "Podium", 
    icon: Speaker,
    defaultSize: { width: 80, height: 80 },
    color: "#06B6D4"
  },
  {
    type: "exit",
    name: "Exit",
    icon: DoorOpen,
    defaultSize: { width: 60, height: 100 },
    color: "#EF4444"
  },
  {
    type: "dancefloor",
    name: "Dance Floor",
    icon: Music,
    defaultSize: { width: 150, height: 150 },
    color: "#F59E0B"
  },
  {
    type: "tent",
    name: "Vendor Tent",
    icon: Tent,
    defaultSize: { width: 150, height: 100 },
    color: "#F97316"
  },
  {
    type: "booth",
    name: "Vendor Booth",
    icon: Store,
    defaultSize: { width: 100, height: 80 },
    color: "#10B981"
  },
  {
    type: "plant",
    name: "Plant",
    icon: TreePine,
    defaultSize: { width: 60, height: 60 },
    color: "#22C55E"
  },
  {
    type: "pillar",
    name: "Pillar",
    icon: Columns3,
    defaultSize: { width: 50, height: 50 },
    color: "#6B7280"
  },
  {
    type: "fountain",
    name: "Fountain",
    icon: Droplets,
    defaultSize: { width: 80, height: 80 },
    color: "#06B6D4"
  },
  {
    type: "lounge",
    name: "Lounge Area",
    icon: Sofa,
    defaultSize: { width: 120, height: 100 },
    color: "#A855F7"
  }
];

interface VenueObjectDialogProps {
  venueObject?: VenueObject;
  onSave: (config: Partial<VenueObject>) => void;
  onClose: () => void;
  isCreating: boolean;
}

const VenueObjectDialog = ({ venueObject, onSave, onClose, isCreating }: VenueObjectDialogProps) => {
  const [config, setConfig] = useState({
    name: "",
    type: "stage" as VenueObject["type"],
    width: 200,
    height: 100,
    rotation: 0,
    color: "#8B5CF6"
  });

  useEffect(() => {
    if (venueObject) {
      setConfig({
        name: venueObject.name,
        type: venueObject.type,
        width: venueObject.width,
        height: venueObject.height,
        rotation: venueObject.rotation || 0,
        color: venueObject.color || "#8B5CF6"
      });
    } else {
      const defaultType = venueObjectTypes[0];
      setConfig({
        name: defaultType.name,
        type: defaultType.type,
        width: defaultType.defaultSize.width,
        height: defaultType.defaultSize.height,
        rotation: 0,
        color: defaultType.color
      });
    }
  }, [venueObject]);

  const handleTypeChange = (type: VenueObject["type"]) => {
    const objectType = venueObjectTypes.find(t => t.type === type);
    if (objectType) {
      setConfig(prev => ({
        ...prev,
        type,
        name: objectType.name,
        width: objectType.defaultSize.width,
        height: objectType.defaultSize.height,
        color: objectType.color
      }));
    }
  };

  const handleSave = () => {
    onSave(config);
  };

  const selectedType = venueObjectTypes.find(t => t.type === config.type);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? "Add Venue Object" : "Edit Venue Object"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={config.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {venueObjectTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.type} value={type.type}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={config.name}
              onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter object name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={config.width}
                onChange={(e) => setConfig(prev => ({ ...prev, width: parseInt(e.target.value) || 100 }))}
                min="20"
                max="500"
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                value={config.height}
                onChange={(e) => setConfig(prev => ({ ...prev, height: parseInt(e.target.value) || 100 }))}
                min="20"
                max="500"
              />
            </div>
          </div>

          <div>
            <Label>Rotation: {config.rotation}°</Label>
            <Slider
              value={[config.rotation]}
              onValueChange={([value]) => setConfig(prev => ({ ...prev, rotation: value }))}
              max={360}
              step={15}
              className="mt-2"
            />
          </div>

          {selectedType && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <selectedType.icon className="w-4 h-4" style={{ color: config.color }} />
                Preview: {config.name}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isCreating ? "Add Object" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VenueObjectDialog;
export { venueObjectTypes };
