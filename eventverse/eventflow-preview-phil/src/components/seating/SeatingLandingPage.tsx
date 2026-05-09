import { useState } from "react";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import SeatingOverviewStats from "./SeatingOverviewStats";
import LocationCard from "./LocationCard";
import EmptySeatingState from "./EmptySeatingState";
import CreateArrangementDialog from "./CreateArrangementDialog";
import EventContextCard from "./EventContextCard";
import { Button } from "@/components/ui/button";
import { Plus, PackageOpen, Upload } from "lucide-react";

interface SeatingLandingPageProps {
  onNavigateToArrangement: (arrangementId: string) => void;
}

const SeatingLandingPage = ({ onNavigateToArrangement }: SeatingLandingPageProps) => {
  const { hierarchy, addLocation, addSection, addArrangement } = useVenueHierarchy();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCreateArrangement = (data: {
    locationId?: string;
    locationName?: string;
    sectionId?: string;
    sectionName?: string;
    arrangementName: string;
    venueType: "table-based" | "seat-based";
  }) => {
    let finalLocationId = data.locationId;
    let finalSectionId = data.sectionId;
    let newArrangementId = '';

    // Create location if needed
    if (!finalLocationId && data.locationName) {
      addLocation({ name: data.locationName, description: '' });
      // Get the newly created location ID
      const newLocation = hierarchy.locations[hierarchy.locations.length - 1];
      if (newLocation) {
        finalLocationId = newLocation.id;
      }
    }

    // Create section if needed
    if (finalLocationId && !finalSectionId && data.sectionName) {
      addSection(finalLocationId, { name: data.sectionName, description: '', locationId: finalLocationId });
      // Get the newly created section ID
      const location = hierarchy.locations.find(l => l.id === finalLocationId);
      const newSection = location?.sections[location.sections.length - 1];
      if (newSection) {
        finalSectionId = newSection.id;
      }
    }

    // Create arrangement
    if (finalLocationId && finalSectionId) {
      addArrangement(finalSectionId, {
        sectionId: finalSectionId,
        name: data.arrangementName,
        description: '',
        startTime: '',
        endTime: '',
        venueType: data.venueType,
        tables: [],
        chairs: [],
        seats: [],
        seatSections: [],
        venueObjects: [],
        isActive: true
      });
      
      // Get the newly created arrangement ID
      const location = hierarchy.locations.find(l => l.id === finalLocationId);
      const section = location?.sections.find(s => s.id === finalSectionId);
      const newArrangement = section?.arrangements[section.arrangements.length - 1];
      if (newArrangement) {
        newArrangementId = newArrangement.id;
      }
      
      // Small delay to allow state to update before navigating
      setTimeout(() => {
        onNavigateToArrangement(newArrangementId);
      }, 100);
    }

    setShowCreateDialog(false);
  };

  // Check if there are any locations
  const hasLocations = hierarchy.locations.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Seating Arrangements</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage all your venue layouts and seating plans
              </p>
            </div>
          </div>
        </div>
      </div>

      {!hasLocations ? (
        <EmptySeatingState onCreateFirst={() => setShowCreateDialog(true)} />
      ) : (
        <div className="container mx-auto px-6 py-8 space-y-8">
          {/* Event Context */}
          <EventContextCard />

          {/* Overview Stats */}
          <SeatingOverviewStats />

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button onClick={() => setShowCreateDialog(true)} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create New Arrangement
            </Button>
            <Button variant="outline" size="lg" disabled>
              <PackageOpen className="w-4 h-4 mr-2" />
              Browse Vendor Presets
            </Button>
            <Button variant="outline" size="lg" disabled>
              <Upload className="w-4 h-4 mr-2" />
              Import Layout
            </Button>
          </div>

          {/* Locations & Arrangements Grid */}
          <div className="space-y-6">
            {hierarchy.locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onNavigateToArrangement={onNavigateToArrangement}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Arrangement Dialog */}
      <CreateArrangementDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreate={handleCreateArrangement}
        locations={hierarchy.locations}
      />
    </div>
  );
};

export default SeatingLandingPage;
