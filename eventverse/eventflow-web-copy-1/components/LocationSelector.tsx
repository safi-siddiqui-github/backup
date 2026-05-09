
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useVenueHierarchy } from '@/hooks/useVenueHierarchy';
import { useLocationContext } from '@/hooks/useLocationContext';

const LocationSelector = () => {
  const { hierarchy, addLocation } = useVenueHierarchy();
  const { selectedLocationId, setSelectedLocationId, currentLocationData } = useLocationContext();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');

  const selectedLocation = hierarchy.locations.find(l => l.id === selectedLocationId);

  const handleAddLocation = () => {
    if (newLocationName.trim()) {
      addLocation({
        name: newLocationName.trim(),
        description: `Location: ${newLocationName.trim()}`
      });
      setNewLocationName('');
      setShowAddDialog(false);
    }
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(locationId);
    // Navigate to first available arrangement in this location
    const location = hierarchy.locations.find(l => l.id === locationId);
    if (location && location.sections.length > 0) {
      const firstSection = location.sections[0];
      if (firstSection.arrangements.length > 0) {
        // The actual navigation will be handled by the parent component
      }
    }
  };

  if (hierarchy.locations.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add First Location
        </Button>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>
                Create a new venue location for your event
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location-name">Location Name</Label>
                <Input
                  id="location-name"
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  placeholder="e.g., Main Reception Hall"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLocation} disabled={!newLocationName.trim()}>
                Add Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="font-medium text-lg">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            {selectedLocation ? selectedLocation.name : 'Select Location'}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {hierarchy.locations.map(location => (
            <DropdownMenuItem
              key={location.id}
              onClick={() => handleLocationSelect(location.id)}
              className={selectedLocationId === location.id ? 'bg-blue-50' : ''}
            >
              <MapPin className="w-4 h-4 mr-2" />
              <div className="flex-1">
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-gray-500">
                  {location.sections.length} sections
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedLocation && (
        <Badge variant="outline" className="text-xs">
          {currentLocationData?.sections.length || 0} sections
        </Badge>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Create a new venue location for your event
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="location-name">Location Name</Label>
              <Input
                id="location-name"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                placeholder="e.g., Main Reception Hall"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLocation} disabled={!newLocationName.trim()}>
              Add Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationSelector;
