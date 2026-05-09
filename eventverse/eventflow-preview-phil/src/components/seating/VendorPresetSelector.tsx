import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Users, DollarSign, Eye, Search, Filter } from "lucide-react";
import { useVendorPresets } from "@/hooks/useVendorPresets";
import PresetPreviewCanvas from "./PresetPreviewCanvas";
import type { VenuePreset, VendorProfile } from "@/types/venue";

interface VendorPresetSelectorProps {
  onSelectPreset: (preset: VenuePreset, usageType: "as-is" | "template" | "modified" | "hybrid") => void;
  onClose: () => void;
}

const VendorPresetSelector = ({ onSelectPreset, onClose }: VendorPresetSelectorProps) => {
  const { venueVendors, selectedVendor, setSelectedVendor, getPresetsByVendor, searchPresets, loading } = useVendorPresets();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedPreset, setSelectedPreset] = useState<VenuePreset | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredPresets = selectedVendor
    ? getPresetsByVendor(selectedVendor.id)
    : searchQuery
    ? searchPresets(searchQuery)
    : [];

  const finalPresets = categoryFilter === "all" 
    ? filteredPresets 
    : filteredPresets.filter(preset => preset.category.id === categoryFilter);

  const categories = Array.from(new Set(filteredPresets.map(preset => preset.category.id)))
    .map(id => filteredPresets.find(preset => preset.category.id === id)?.category)
    .filter(Boolean);

  const handlePresetSelect = (preset: VenuePreset, usageType: "as-is" | "template" | "modified" | "hybrid") => {
    onSelectPreset(preset, usageType);
    onClose();
  };

  const PresetCard = ({ preset }: { preset: VenuePreset }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{preset.name}</CardTitle>
            <CardDescription className="text-sm">{preset.vendorBusinessName}</CardDescription>
          </div>
          <Badge variant="secondary">{preset.category.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{preset.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{preset.capacity} guests</span>
          </div>
          {preset.pricingInfo && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>From ${preset.pricingInfo.basePrice}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {preset.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {preset.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{preset.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedPreset(preset);
              setShowPreview(true);
            }}
            className="flex-1"
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1">
                Use Preset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How would you like to use this preset?</DialogTitle>
                <DialogDescription>
                  Choose how you want to apply "{preset.name}" to your event seating arrangement.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full text-left h-auto p-4 flex flex-col items-start"
                  onClick={() => handlePresetSelect(preset, "as-is")}
                >
                  <span className="font-medium">Use As-Is</span>
                  <span className="text-sm text-muted-foreground">
                    Import the exact layout without any modifications
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-left h-auto p-4 flex flex-col items-start"
                  onClick={() => handlePresetSelect(preset, "template")}
                >
                  <span className="font-medium">Use as Template</span>
                  <span className="text-sm text-muted-foreground">
                    Copy the structure and customize freely
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-left h-auto p-4 flex flex-col items-start"
                  onClick={() => handlePresetSelect(preset, "modified")}
                >
                  <span className="font-medium">Modify Layout</span>
                  <span className="text-sm text-muted-foreground">
                    Import and make changes while keeping vendor connection
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-left h-auto p-4 flex flex-col items-start"
                  onClick={() => handlePresetSelect(preset, "hybrid")}
                >
                  <span className="font-medium">Hybrid Approach</span>
                  <span className="text-sm text-muted-foreground">
                    Lock vendor elements, allow custom additions
                  </span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading venue presets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Vendor Selection */}
      {!selectedVendor && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Select a Venue Vendor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose from our marketplace of verified venue vendors who offer pre-designed layouts.
            </p>
          </div>

          <div className="grid gap-3">
            {venueVendors.map((vendor) => (
              <Card 
                key={vendor.id} 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedVendor(vendor)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-muted-foreground">{vendor.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{vendor.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{vendor.reviewCount} reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Preset Selection */}
      {selectedVendor && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedVendor.name} - Venue Presets</h3>
              <p className="text-sm text-muted-foreground">
                Choose from their available pre-designed layouts
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedVendor(null)}>
              Change Vendor
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search presets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category!.id} value={category!.id}>
                    {category!.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Presets Grid */}
          {finalPresets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {finalPresets.map((preset) => (
                <PresetCard key={preset.id} preset={preset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No presets found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedPreset?.name}</DialogTitle>
            <DialogDescription>{selectedPreset?.description}</DialogDescription>
          </DialogHeader>
          {selectedPreset && (
            <div className="space-y-4">
              <PresetPreviewCanvas 
                preset={selectedPreset}
                width={600}
                height={400}
              />
              
              {selectedPreset.pricingInfo && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Pricing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span className="font-medium">${selectedPreset.pricingInfo.basePrice}</span>
                    </div>
                    {selectedPreset.pricingInfo.pricePerGuest && (
                      <div className="flex justify-between">
                        <span>Per Guest:</span>
                        <span className="font-medium">${selectedPreset.pricingInfo.pricePerGuest}</span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground pt-2">
                      <p>Includes: {selectedPreset.pricingInfo.includes.join(", ")}</p>
                      <p>Excludes: {selectedPreset.pricingInfo.excludes.join(", ")}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorPresetSelector;