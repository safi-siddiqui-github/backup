"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocationContext } from "@/hooks/useLocationContext";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import { VenueSection } from "@/types/venue";
import {
  Building2,
  Calendar,
  ChevronDown,
  MapPin,
  Plus,
  Slash,
} from "lucide-react";
import { useState } from "react";

const CompactNavigationHeader = () => {
  const {
    hierarchy,
    addLocation,
    addSection,
    addArrangement,
    navigateToArrangement,
    currentLocation,
    currentSection,
    currentArrangement,
  } = useVenueHierarchy();
  const { selectedLocationId, currentLocationData } = useLocationContext();

  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false);
  const [showAddSectionDialog, setShowAddSectionDialog] = useState(false);
  const [showAddArrangementDialog, setShowAddArrangementDialog] =
    useState(false);

  const [newLocationName, setNewLocationName] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [newArrangementName, setNewArrangementName] = useState("");
  const [newArrangementDescription, setNewArrangementDescription] =
    useState("");
  const [newArrangementStartTime, setNewArrangementStartTime] = useState("");
  const [newArrangementEndTime, setNewArrangementEndTime] = useState("");

  const selectedLocation = hierarchy.locations.find(
    (l) => l.id === selectedLocationId,
  );

  const handleAddLocation = () => {
    if (newLocationName.trim()) {
      const newLocation = {
        name: newLocationName.trim(),
        description: `Location: ${newLocationName.trim()}`,
      };
      addLocation(newLocation);
      setNewLocationName("");
      setShowAddLocationDialog(false);
    }
  };

  const handleAddSection = () => {
    if (newSectionName.trim() && selectedLocationId) {
      addSection(selectedLocationId, {
        name: newSectionName.trim(),
        locationId: selectedLocationId,
        description: `Section: ${newSectionName.trim()}`,
      });
      setNewSectionName("");
      setShowAddSectionDialog(false);
    }
  };

  const handleAddArrangement = () => {
    if (newArrangementName.trim() && currentSection) {
      addArrangement(currentSection.id, {
        name: newArrangementName.trim(),
        sectionId: currentSection.id,
        description: newArrangementDescription.trim(),
        startTime: newArrangementStartTime,
        endTime: newArrangementEndTime,
        venueType: "table-based",
        tables: [],
        chairs: [],
        seats: [],
        seatSections: [],
        venueObjects: [],
      });
      setNewArrangementName("");
      setNewArrangementDescription("");
      setNewArrangementStartTime("");
      setNewArrangementEndTime("");
      setShowAddArrangementDialog(false);
    }
  };

  const handleLocationSelect = (locationId: string) => {
    const location = hierarchy.locations.find((l) => l.id === locationId);
    if (!location) return;

    if (location.sections.length > 0) {
      const firstSection = location.sections[0];
      if (firstSection.arrangements.length > 0) {
        navigateToArrangement(
          locationId,
          firstSection.id,
          firstSection.arrangements[0].id,
        );
      } else {
        // Section exists but no arrangements
        navigateToArrangement(locationId, firstSection.id, "");
      }
    } else {
      // No sections exist
      navigateToArrangement(locationId, "", "");
    }
  };

  const handleSectionSelect = (section: VenueSection) => {
    if (!selectedLocationId) return;

    if (section.arrangements.length > 0) {
      navigateToArrangement(
        selectedLocationId,
        section.id,
        section.arrangements[0].id,
      );
    } else {
      // Section exists but no arrangements
      navigateToArrangement(selectedLocationId, section.id, "");
    }
  };

  const handleArrangementSelect = (arrangementId: string) => {
    if (!selectedLocationId || !currentSection) return;

    // Validate arrangement belongs to current section
    const arrangement = currentSection.arrangements.find(
      (a) => a.id === arrangementId,
    );
    if (arrangement) {
      navigateToArrangement(
        selectedLocationId,
        currentSection.id,
        arrangementId,
      );
    }
  };

  // Empty state
  if (hierarchy.locations.length === 0) {
    return (
      <div className="flex h-10 items-center border-b bg-white px-4">
        <Button
          size="sm"
          onClick={() => setShowAddLocationDialog(true)}
          className="h-7 text-xs"
        >
          <Plus className="mr-1 h-3 w-3" />
          Add First Location
        </Button>

        <Dialog
          open={showAddLocationDialog}
          onOpenChange={setShowAddLocationDialog}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Location</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="location-name">Name</Label>
                <Input
                  id="location-name"
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  placeholder="e.g., Main Hall"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddLocationDialog(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleAddLocation}
                disabled={!newLocationName.trim()}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex h-10 items-center gap-1 border-b bg-white px-4 text-sm">
      {/* Location Breadcrumb */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <MapPin className="mr-1 h-3 w-3" />
            {currentLocation ? currentLocation.name : "Select Location"}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-48"
        >
          {hierarchy.locations.map((location) => (
            <DropdownMenuItem
              key={location.id}
              onClick={() => handleLocationSelect(location.id)}
              className={selectedLocationId === location.id ? "bg-blue-50" : ""}
            >
              <MapPin className="mr-2 h-3 w-3" />
              {location.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowAddLocationDialog(true)}>
            <Plus className="mr-2 h-3 w-3" />
            Add Location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Separator */}
      {currentLocation && <Slash className="h-3 w-3 text-gray-400" />}

      {/* Section Breadcrumb */}
      {currentLocation && (
        <>
          {currentLocation.sections && currentLocation.sections.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs font-medium text-green-600 hover:text-green-700"
                >
                  <Building2 className="mr-1 h-3 w-3" />
                  {currentSection ? currentSection.name : "Select Section"}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48"
              >
                {currentLocation.sections.map((section) => (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => handleSectionSelect(section)}
                    className={
                      currentSection?.id === section.id ? "bg-green-50" : ""
                    }
                  >
                    <Building2 className="mr-2 h-3 w-3" />
                    {section.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowAddSectionDialog(true)}>
                  <Plus className="mr-2 h-3 w-3" />
                  Add Section
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAddSectionDialog(true)}
              className="h-7 px-2 text-xs text-gray-500"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Section
            </Button>
          )}
        </>
      )}

      {/* Separator */}
      {currentSection && <Slash className="h-3 w-3 text-gray-400" />}

      {/* Arrangement Breadcrumb */}
      {currentSection && (
        <>
          {currentSection.arrangements.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs font-medium text-purple-600 hover:text-purple-700"
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  {currentArrangement
                    ? currentArrangement.name
                    : "Select Arrangement"}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56"
              >
                {currentSection.arrangements.map((arrangement) => (
                  <DropdownMenuItem
                    key={arrangement.id}
                    onClick={() => handleArrangementSelect(arrangement.id)}
                    className={
                      currentArrangement?.id === arrangement.id
                        ? "bg-purple-50"
                        : ""
                    }
                  >
                    <Calendar className="mr-2 h-3 w-3" />
                    <div className="flex-1">
                      <div className="font-medium">{arrangement.name}</div>
                      {arrangement.startTime && (
                        <div className="text-xs text-gray-500">
                          {arrangement.startTime} - {arrangement.endTime}
                        </div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowAddArrangementDialog(true)}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Add Arrangement
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAddArrangementDialog(true)}
              className="h-7 px-2 text-xs text-gray-500"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Arrangement
            </Button>
          )}
        </>
      )}

      {/* Dialogs */}
      <Dialog
        open={showAddLocationDialog}
        onOpenChange={setShowAddLocationDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="location-name">Name</Label>
              <Input
                id="location-name"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                placeholder="e.g., Main Hall"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddLocationDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddLocation}
              disabled={!newLocationName.trim()}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showAddSectionDialog}
        onOpenChange={setShowAddSectionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Section</DialogTitle>
            <DialogDescription>in {currentLocation?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="section-name">Name</Label>
              <Input
                id="section-name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g., Main Floor"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddSectionDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddSection}
              disabled={!newSectionName.trim()}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showAddArrangementDialog}
        onOpenChange={setShowAddArrangementDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Arrangement</DialogTitle>
            <DialogDescription>in {currentSection?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="arrangement-name">Name</Label>
              <Input
                id="arrangement-name"
                value={newArrangementName}
                onChange={(e) => setNewArrangementName(e.target.value)}
                placeholder="e.g., Dinner Setup"
              />
            </div>
            <div>
              <Label htmlFor="arrangement-description">Description</Label>
              <Textarea
                id="arrangement-description"
                value={newArrangementDescription}
                onChange={(e) => setNewArrangementDescription(e.target.value)}
                placeholder="Describe this arrangement..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newArrangementStartTime}
                  onChange={(e) => setNewArrangementStartTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newArrangementEndTime}
                  onChange={(e) => setNewArrangementEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddArrangementDialog(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddArrangement}
              disabled={!newArrangementName.trim()}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompactNavigationHeader;
