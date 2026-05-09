"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Building2,
  Copy,
  Edit3,
  Layers,
  MapPin,
  Palette,
  Plus,
  Users,
} from "lucide-react";
import { useState } from "react";
import VenueDrawingCanvas from "../venue/VenueDrawingCanvas";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VenueLocation {
  id: string;
  name: string;
  description?: string;
  address?: string;
  capacity?: number;
  amenities: string[];
  floors: VenueFloor[];
}

interface VenueFloor {
  id: string;
  venueId: string;
  name: string;
  description?: string;
  canvasData?: string;
  isActive: boolean;
  createdAt: string;
}

interface EnhancedVenueManagementProps {
  vendor: VendorUser;
  onBack: () => void;
}

const EnhancedVenueManagement = ({
  vendor,
  onBack,
}: EnhancedVenueManagementProps) => {
  const [venueLocations, setVenueLocations] = useState<VenueLocation[]>([
    {
      id: "venue-1",
      name: "Grand Reception Hall",
      description:
        "Elegant multi-level venue perfect for weddings and corporate events",
      address: "123 Venue Street, City, ST 12345",
      capacity: 300,
      amenities: [
        "Dance Floor",
        "Sound System",
        "Catering Kitchen",
        "Bridal Suite",
        "Elevator Access",
      ],
      floors: [
        {
          id: "floor-1",
          venueId: "venue-1",
          name: "Main Floor",
          description: "Primary reception area with dance floor",
          isActive: true,
          createdAt: "2024-01-15",
        },
        {
          id: "floor-2",
          venueId: "venue-1",
          name: "Mezzanine Level",
          description: "Elevated seating area with bar",
          isActive: false,
          createdAt: "2024-01-16",
        },
      ],
    },
  ]);

  const [selectedVenue, setSelectedVenue] = useState<VenueLocation | null>(
    null,
  );
  const [selectedFloor, setSelectedFloor] = useState<VenueFloor | null>(null);
  const [showDesigner, setShowDesigner] = useState(false);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [showAddFloor, setShowAddFloor] = useState(false);
  const [newVenueName, setNewVenueName] = useState("");
  const [newVenueDescription, setNewVenueDescription] = useState("");
  const [newVenueAddress, setNewVenueAddress] = useState("");
  const [newFloorName, setNewFloorName] = useState("");
  const [newFloorDescription, setNewFloorDescription] = useState("");
  const { toast } = useToast();

  const handleAddVenue = () => {
    if (!newVenueName.trim()) return;

    const newVenue: VenueLocation = {
      id: `venue-${Date.now()}`,
      name: newVenueName,
      description: newVenueDescription,
      address: newVenueAddress,
      capacity: 100,
      amenities: [],
      floors: [
        {
          id: `floor-${Date.now()}`,
          venueId: `venue-${Date.now()}`,
          name: "Main Floor",
          description: "Primary level",
          isActive: true,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ],
    };

    setVenueLocations((prev) => [...prev, newVenue]);
    setNewVenueName("");
    setNewVenueDescription("");
    setNewVenueAddress("");
    setShowAddVenue(false);

    toast({
      title: "Venue added",
      description: "New venue location with default floor has been created.",
    });
  };

  const handleAddFloor = (venueId: string) => {
    if (!newFloorName.trim()) return;

    const newFloor: VenueFloor = {
      id: `floor-${Date.now()}`,
      venueId,
      name: newFloorName,
      description: newFloorDescription,
      isActive: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setVenueLocations((prev) =>
      prev.map((venue) =>
        venue.id === venueId
          ? { ...venue, floors: [...venue.floors, newFloor] }
          : venue,
      ),
    );

    setNewFloorName("");
    setNewFloorDescription("");
    setShowAddFloor(false);

    toast({
      title: "Floor added",
      description: `${newFloor.name} has been added to the venue.`,
    });
  };

  const handleDesignFloor = (venue: VenueLocation, floor: VenueFloor) => {
    setSelectedVenue(venue);
    setSelectedFloor(floor);
    setShowDesigner(true);
  };

  const handleSaveFloorLayout = (canvasData: string) => {
    if (!selectedVenue || !selectedFloor) return;

    setVenueLocations((prev) =>
      prev.map((venue) =>
        venue.id === selectedVenue.id
          ? {
              ...venue,
              floors: venue.floors.map((floor) =>
                floor.id === selectedFloor.id
                  ? { ...floor, canvasData }
                  : floor,
              ),
            }
          : venue,
      ),
    );
  };

  const duplicateFloor = (venue: VenueLocation, floor: VenueFloor) => {
    const duplicatedFloor: VenueFloor = {
      ...floor,
      id: `floor-${Date.now()}`,
      name: `${floor.name} (Copy)`,
      isActive: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setVenueLocations((prev) =>
      prev.map((v) =>
        v.id === venue.id
          ? { ...v, floors: [...v.floors, duplicatedFloor] }
          : v,
      ),
    );

    toast({
      title: "Floor duplicated",
      description: `${duplicatedFloor.name} has been created.`,
    });
  };

  const floorTemplates = [
    { name: "Blank Canvas", description: "Start from scratch", icon: "⬜" },
    { name: "Reception Hall", description: "Formal dining setup", icon: "🍽️" },
    {
      name: "Cocktail Space",
      description: "Standing reception layout",
      icon: "🍸",
    },
    {
      name: "Conference Room",
      description: "Business meeting setup",
      icon: "💼",
    },
    {
      name: "Wedding Ceremony",
      description: "Aisle and altar layout",
      icon: "💒",
    },
    { name: "Theater Style", description: "Presentation seating", icon: "🎭" },
  ];

  const createFloorFromTemplate = (
    venue: VenueLocation,
    template: (typeof floorTemplates)[0],
  ) => {
    const newFloor: VenueFloor = {
      id: `floor-${Date.now()}`,
      venueId: venue.id,
      name: template.name,
      description: template.description,
      isActive: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setVenueLocations((prev) =>
      prev.map((v) =>
        v.id === venue.id ? { ...v, floors: [...v.floors, newFloor] } : v,
      ),
    );

    // Immediately open designer for new floor
    handleDesignFloor(venue, newFloor);
  };

  if (showDesigner && selectedVenue && selectedFloor) {
    return (
      <div className="bg-background min-h-screen">
        <div className="bg-card border-border border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowDesigner(false)}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Venues
            </Button>
            <div>
              <h1 className="text-foreground text-xl font-semibold">
                {selectedVenue.name} - {selectedFloor.name}
              </h1>
              <p className="text-muted-foreground text-sm">
                Design your venue layout with drawing tools
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <VenueDrawingCanvas
            venueId={selectedVenue.id}
            floorName={selectedFloor.name}
            initialData={selectedFloor.canvasData}
            onSave={handleSaveFloorLayout}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Enhanced Venue Management</h2>
            <p className="text-muted-foreground">
              Design and manage your venue layouts with advanced drawing tools
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddVenue(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Venue Location
        </Button>
      </div>

      {/* Add Venue Dialog */}
      <Dialog
        open={showAddVenue}
        onOpenChange={setShowAddVenue}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Venue Location</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="venueName">Venue Name</Label>
              <Input
                id="venueName"
                value={newVenueName}
                onChange={(e) => setNewVenueName(e.target.value)}
                placeholder="e.g., Grand Ballroom"
              />
            </div>
            <div>
              <Label htmlFor="venueDescription">Description</Label>
              <Input
                id="venueDescription"
                value={newVenueDescription}
                onChange={(e) => setNewVenueDescription(e.target.value)}
                placeholder="Brief description of the venue"
              />
            </div>
            <div>
              <Label htmlFor="venueAddress">Address</Label>
              <Input
                id="venueAddress"
                value={newVenueAddress}
                onChange={(e) => setNewVenueAddress(e.target.value)}
                placeholder="Full venue address"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddVenue}>Add Venue</Button>
              <Button
                variant="outline"
                onClick={() => setShowAddVenue(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Venue Locations Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {venueLocations.map((venue) => (
          <Card key={venue.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {venue.name}
                  </CardTitle>
                  <CardDescription>{venue.description}</CardDescription>
                </div>
                <Badge variant="secondary">
                  <Layers className="mr-1 h-3 w-3" />
                  {venue.floors.length} floor
                  {venue.floors.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {venue.address && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  {venue.address}
                </div>
              )}

              {venue.capacity && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  Capacity: {venue.capacity} guests
                </div>
              )}

              {venue.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {venue.amenities.map((amenity, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              )}

              <Tabs
                defaultValue="floors"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="floors">Floor Plans</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="floors"
                  className="space-y-3"
                >
                  {venue.floors.length > 0 ? (
                    <div className="space-y-2">
                      {venue.floors.map((floor) => (
                        <div
                          key={floor.id}
                          className="bg-muted/30 flex items-center justify-between rounded border p-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">
                                {floor.name}
                              </p>
                              {floor.canvasData && (
                                <Badge
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Palette className="mr-1 h-3 w-3" />
                                  Designed
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground text-xs">
                              {floor.description}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDesignFloor(venue, floor)}
                              title="Design floor layout"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => duplicateFloor(venue, floor)}
                              title="Duplicate floor"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground py-4 text-center text-sm">
                      No floor plans created yet
                    </p>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Custom Floor
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Custom Floor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Floor Name</Label>
                          <Input
                            value={newFloorName}
                            onChange={(e) => setNewFloorName(e.target.value)}
                            placeholder="e.g., Second Floor, Basement, Mezzanine"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={newFloorDescription}
                            onChange={(e) =>
                              setNewFloorDescription(e.target.value)
                            }
                            placeholder="Brief description"
                          />
                        </div>
                        <Button
                          onClick={() => handleAddFloor(venue.id)}
                          className="w-full"
                        >
                          Add Floor
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TabsContent>

                <TabsContent
                  value="templates"
                  className="space-y-2"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {floorTemplates.map((template) => (
                      <Button
                        key={template.name}
                        variant="outline"
                        size="sm"
                        onClick={() => createFloorFromTemplate(venue, template)}
                        className="flex h-auto flex-col items-center py-3 text-center"
                      >
                        <span className="mb-1 text-lg">{template.icon}</span>
                        <span className="text-xs font-medium">
                          {template.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {template.description}
                        </span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {venueLocations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No venues added yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first venue location to showcase your spaces
              with advanced drawing tools
            </p>
            <Button onClick={() => setShowAddVenue(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Venue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedVenueManagement;
