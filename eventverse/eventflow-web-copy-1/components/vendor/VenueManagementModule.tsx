"use client";

import EnhancedSeatingModule from "@/components/EnhancedSeatingModule";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { VenueHierarchyProvider } from "@/hooks/useVenueHierarchy";
import {
  ArrowLeft,
  Building2,
  Edit3,
  Layout,
  MapPin,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

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
  floorPlans: FloorPlan[];
}

interface FloorPlan {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

interface VenueManagementModuleProps {
  vendor: VendorUser;
  onBack: () => void;
}

const VenueManagementModule = ({
  vendor,
  onBack,
}: VenueManagementModuleProps) => {
  const [venueLocations, setVenueLocations] = useState<VenueLocation[]>([
    {
      id: "venue-1",
      name: "Main Reception Hall",
      description:
        "Elegant main hall perfect for weddings and corporate events",
      address: "123 Venue Street, City, ST 12345",
      capacity: 200,
      amenities: [
        "Dance Floor",
        "Sound System",
        "Catering Kitchen",
        "Bridal Suite",
      ],
      floorPlans: [
        {
          id: "plan-1",
          name: "Wedding Setup",
          description: "Formal dinner arrangement",
          isActive: true,
          createdAt: "2024-01-15",
        },
        {
          id: "plan-2",
          name: "Cocktail Layout",
          description: "Reception style setup",
          isActive: false,
          createdAt: "2024-01-20",
        },
      ],
    },
  ]);

  const [selectedVenue, setSelectedVenue] = useState<VenueLocation | null>(
    null,
  );
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<FloorPlan | null>(
    null,
  );
  const [showDesigner, setShowDesigner] = useState(false);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [newVenueName, setNewVenueName] = useState("");
  const [newVenueDescription, setNewVenueDescription] = useState("");
  const [newVenueAddress, setNewVenueAddress] = useState("");
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
      floorPlans: [],
    };

    setVenueLocations((prev) => [...prev, newVenue]);
    setNewVenueName("");
    setNewVenueDescription("");
    setNewVenueAddress("");
    setShowAddVenue(false);

    toast({
      title: "Venue added",
      description: "New venue location has been added to your portfolio.",
    });
  };

  const handleDesignFloorPlan = (
    venue: VenueLocation,
    floorPlan?: FloorPlan,
  ) => {
    setSelectedVenue(venue);
    setSelectedFloorPlan(floorPlan || null);
    setShowDesigner(true);
  };

  const handleCreateNewFloorPlan = (venue: VenueLocation) => {
    const newPlan: FloorPlan = {
      id: `plan-${Date.now()}`,
      name: "New Floor Plan",
      description: "Custom venue layout",
      isActive: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setVenueLocations((prev) =>
      prev.map((v) =>
        v.id === venue.id
          ? { ...v, floorPlans: [...v.floorPlans, newPlan] }
          : v,
      ),
    );

    handleDesignFloorPlan(venue, newPlan);
  };

  if (showDesigner && selectedVenue) {
    return (
      <VenueHierarchyProvider>
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
                  {selectedVenue.name} - Floor Plan Designer
                </h1>
                <p className="text-muted-foreground text-sm">
                  {selectedFloorPlan
                    ? selectedFloorPlan.name
                    : "New Floor Plan"}
                </p>
              </div>
            </div>
          </div>
          <EnhancedSeatingModule
            eventId={`venue-${selectedVenue.id}-${selectedFloorPlan?.id || "new"}`}
            onBack={() => setShowDesigner(false)}
          />
        </div>
      </VenueHierarchyProvider>
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
            <h2 className="text-2xl font-bold">Venue Management</h2>
            <p className="text-muted-foreground">
              Manage your venue locations and floor plans
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddVenue(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Venue Location
        </Button>
      </div>

      {/* Add Venue Dialog */}
      {showAddVenue && (
        <Card className="border-primary border-2">
          <CardHeader>
            <CardTitle>Add New Venue Location</CardTitle>
            <CardDescription>
              Create a new venue for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      )}

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
                  {venue.floorPlans.length} floor plan
                  {venue.floorPlans.length !== 1 ? "s" : ""}
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

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Floor Plans</h4>
                {venue.floorPlans.length > 0 ? (
                  <div className="space-y-2">
                    {venue.floorPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-center justify-between rounded border p-2"
                      >
                        <div>
                          <p className="text-sm font-medium">{plan.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {plan.description}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDesignFloorPlan(venue, plan)}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No floor plans created yet
                  </p>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleCreateNewFloorPlan(venue)}
                    className="flex-1"
                  >
                    <Layout className="mr-2 h-4 w-4" />
                    Design Floor Plan
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {venueLocations.length === 0 && !showAddVenue && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No venues added yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first venue location to showcase your spaces
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

export default VenueManagementModule;
