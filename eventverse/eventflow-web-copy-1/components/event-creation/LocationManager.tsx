
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Plus, Info, DollarSign, Users, Clock, Trash2, Building2 } from "lucide-react";
import { EventFormData, EventLocation } from "../EnhancedEventCreationDialog";
import LocationSectionManager from "./LocationSectionManager";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const LocationManager = ({ formData, onUpdate }: Props) => {
  const [skipVenue, setSkipVenue] = useState(false);
  const [showVenueForm, setShowVenueForm] = useState(false);

  const updateLocation = (locationId: string, updates: Partial<EventLocation>) => {
    onUpdate({
      locations: formData.locations.map(location =>
        location.id === locationId ? { ...location, ...updates } : location
      )
    });
  };

  const addNewVenue = () => {
    const newVenue: EventLocation = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      address: "",
      type: "physical",
      source: "manual",
      sections: []
    };
    
    onUpdate({
      locations: [...formData.locations, newVenue]
    });
  };

  const removeVenue = (locationId: string) => {
    onUpdate({
      locations: formData.locations.filter(location => location.id !== locationId)
    });
  };

  const handleSkipVenue = () => {
    setSkipVenue(true);
    if (formData.locations.length === 0) {
      onUpdate({
        locations: [{
          id: "1",
          name: "To be determined",
          address: "Will be added later",
          type: "physical",
          source: "manual"
        }]
      });
    }
  };

  const handleAddVenueNow = () => {
    setSkipVenue(false);
    setShowVenueForm(true);
    if (formData.locations.length === 0) {
      onUpdate({
        locations: [{
          id: "1",
          name: "",
          address: "",
          type: "physical",
          source: "manual",
          sections: []
        }]
      });
    }
  };

  const hasValidVenues = formData.locations.some(location => location.name && location.name !== "To be determined");
  const hasAnyVenues = formData.locations.length > 0;
  const hasEmptyVenues = formData.locations.length > 0 && !formData.locations.some(location => location.name && location.name.trim() !== "");

  return (
    <div className="space-y-6">
      {/* Quick Venue Decision */}
      {!skipVenue && !showVenueForm && hasEmptyVenues && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <MapPin className="w-5 h-5" />
              Where will your event take place?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-blue-700 text-sm">
              You can either add your venue details now or skip this step and add them later.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAddVenueNow}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Add Venue Details Now
              </Button>
              
              <Button 
                onClick={handleSkipVenue}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 flex-1"
              >
                <Clock className="w-4 h-4 mr-2" />
                Add Venue Later
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Venues List */}
      {!skipVenue && (showVenueForm || hasValidVenues) && hasAnyVenues && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Event Venues</h3>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleSkipVenue}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-700"
              >
                <Clock className="w-4 h-4 mr-2" />
                Skip for Now
              </Button>
              <Button onClick={addNewVenue} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Venue
              </Button>
            </div>
          </div>

          {formData.locations.map((location, index) => (
            <Card key={location.id} className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Venue {index + 1}</span>
                  </div>
                  {formData.locations.length > 1 && (
                    <Button
                      onClick={() => removeVenue(location.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Venue Name *</Label>
                    <Input
                      placeholder="e.g., The Grand Ballroom, My Backyard"
                      value={location.name}
                      onChange={(e) => updateLocation(location.id, { name: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Venue Type</Label>
                    <Select
                      value={location.type}
                      onValueChange={(value: 'physical' | 'virtual' | 'hybrid') => 
                        updateLocation(location.id, { type: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical Location</SelectItem>
                        <SelectItem value="virtual">Virtual Event</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Physical + Virtual)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {location.type !== 'virtual' && (
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea
                      placeholder="Enter the full address..."
                      value={location.address}
                      onChange={(e) => updateLocation(location.id, { address: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>
                )}

                {(location.type === 'virtual' || location.type === 'hybrid') && (
                  <div className="space-y-2">
                    <Label>Virtual Meeting Link</Label>
                    <Input
                      placeholder="https://zoom.us/j/... or will be provided later"
                      value={location.virtualLink || ""}
                      onChange={(e) => updateLocation(location.id, { virtualLink: e.target.value })}
                      className="h-12"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expected Capacity (Optional)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 150"
                      value={location.capacity || ""}
                      onChange={(e) => updateLocation(location.id, { 
                        capacity: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Special Features (Optional)</Label>
                    <Input
                      placeholder="e.g., Parking, WiFi, Kitchen"
                      value={location.features?.join(", ") || ""}
                      onChange={(e) => updateLocation(location.id, { 
                        features: e.target.value ? e.target.value.split(",").map(f => f.trim()) : [] 
                      })}
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Section Management */}
                {location.name && location.name !== "To be determined" && (
                  <LocationSectionManager
                    sections={location.sections || []}
                    onSectionsUpdate={(sections) => updateLocation(location.id, { sections })}
                    venueName={location.name}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Skipped Venue Notice */}
      {skipVenue && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Venue details saved for later</h3>
                <p className="text-green-700 text-sm">You can add venue information anytime in your event dashboard.</p>
              </div>
            </div>
            
            <Button 
              onClick={handleAddVenueNow}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Add Venue Details Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Vendor Partnership Info */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Venue Partner Network</h3>
              </div>
              <p className="text-purple-700 text-sm mb-3">
                When you add budgeting to your event, we can connect you with verified venue partners in your area 
                who offer exclusive discounts to EventFlow users.
              </p>
              <div className="flex items-center gap-4 text-xs text-purple-600">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  1,200+ Verified Venues
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Average 15% Savings
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationManager;
