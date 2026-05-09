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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { PresetCategory, VenuePreset } from "@/types/venue";
import {
  Copy,
  DollarSign,
  Edit3,
  Eye,
  Plus,
  Settings,
  Star,
  Tag,
  Trash2,
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

interface VenuePresetManagerProps {
  vendor: VendorUser;
  venueFloors: unknown[]; // Floor layouts from enhanced venue management
  onBack: () => void;
}

const VenuePresetManager = ({
  vendor,
  venueFloors,
  onBack,
}: VenuePresetManagerProps) => {
  const { toast } = useToast();

  // Mock existing presets
  const [presets, setPresets] = useState<VenuePreset[]>([
    {
      id: "preset-1",
      vendorId: vendor.id,
      vendorBusinessName: vendor.businessName,
      name: "Elegant Wedding Setup",
      description: "Classic wedding reception with round tables for 150 guests",
      category: {
        id: "wedding",
        name: "Wedding",
        description: "Wedding receptions and ceremonies",
      },
      venueType: "table-based",
      capacity: 150,
      pricingInfo: {
        basePrice: 2500,
        pricePerGuest: 15,
        currency: "USD",
        includes: ["Tables", "Chairs", "Basic linens", "Stage setup"],
        excludes: ["Catering", "Decorations", "Entertainment"],
      },
      tags: ["wedding", "formal", "elegant", "round-tables"],
      tables: [],
      chairs: [],
      seats: [],
      seatSections: [],
      venueObjects: [],
      isPublic: true,
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      version: 1,
    },
  ]);

  const [selectedPreset, setSelectedPreset] = useState<VenuePreset | null>(
    null,
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Form state for creating/editing presets
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    capacity: 50,
    venueType: "table-based" as "table-based" | "seat-based",
    basePrice: 0,
    pricePerGuest: 0,
    includes: "",
    excludes: "",
    tags: "",
    isPublic: true,
    isActive: true,
  });

  const presetCategories: PresetCategory[] = [
    {
      id: "wedding",
      name: "Wedding",
      description: "Wedding receptions and ceremonies",
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Business events and conferences",
    },
    {
      id: "birthday",
      name: "Birthday",
      description: "Birthday parties and celebrations",
    },
    {
      id: "cocktail",
      name: "Cocktail",
      description: "Standing receptions and mixers",
    },
    { id: "gala", name: "Gala", description: "Formal evening events" },
    {
      id: "conference",
      name: "Conference",
      description: "Professional conferences and seminars",
    },
  ];

  const handleCreatePreset = () => {
    const newPreset: VenuePreset = {
      id: `preset-${Date.now()}`,
      vendorId: vendor.id,
      vendorBusinessName: vendor.businessName,
      name: formData.name,
      description: formData.description,
      category:
        presetCategories.find((c) => c.id === formData.category) ||
        presetCategories[0],
      venueType: formData.venueType,
      capacity: formData.capacity,
      pricingInfo: {
        basePrice: formData.basePrice,
        pricePerGuest: formData.pricePerGuest,
        currency: "USD",
        includes: formData.includes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        excludes: formData.excludes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
      tags: formData.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tables: [],
      chairs: [],
      seats: [],
      seatSections: [],
      venueObjects: [],
      isPublic: formData.isPublic,
      isActive: formData.isActive,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      version: 1,
    };

    setPresets((prev) => [...prev, newPreset]);
    setShowCreateDialog(false);
    resetForm();

    toast({
      title: "Preset created",
      description:
        "Your venue preset has been created successfully. You can now design the layout.",
    });
  };

  const handleEditPreset = () => {
    if (!selectedPreset) return;

    const updatedPreset: VenuePreset = {
      ...selectedPreset,
      name: formData.name,
      description: formData.description,
      category:
        presetCategories.find((c) => c.id === formData.category) ||
        selectedPreset.category,
      capacity: formData.capacity,
      pricingInfo: {
        ...selectedPreset.pricingInfo!,
        basePrice: formData.basePrice,
        pricePerGuest: formData.pricePerGuest,
        includes: formData.includes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        excludes: formData.excludes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
      tags: formData.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isPublic: formData.isPublic,
      isActive: formData.isActive,
      updatedAt: new Date().toISOString().split("T")[0],
      version: selectedPreset.version + 1,
    };

    setPresets((prev) =>
      prev.map((p) => (p.id === selectedPreset.id ? updatedPreset : p)),
    );
    setShowEditDialog(false);
    setSelectedPreset(null);
    resetForm();

    toast({
      title: "Preset updated",
      description: "Your venue preset has been updated successfully.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      capacity: 50,
      venueType: "table-based",
      basePrice: 0,
      pricePerGuest: 0,
      includes: "",
      excludes: "",
      tags: "",
      isPublic: true,
      isActive: true,
    });
  };

  const openEditDialog = (preset: VenuePreset) => {
    setSelectedPreset(preset);
    setFormData({
      name: preset.name,
      description: preset.description || "",
      category: preset.category.id,
      capacity: preset.capacity,
      venueType: preset.venueType,
      basePrice: preset.pricingInfo?.basePrice || 0,
      pricePerGuest: preset.pricingInfo?.pricePerGuest || 0,
      includes: preset.pricingInfo?.includes.join(", ") || "",
      excludes: preset.pricingInfo?.excludes.join(", ") || "",
      tags: preset.tags.join(", "),
      isPublic: preset.isPublic,
      isActive: preset.isActive,
    });
    setShowEditDialog(true);
  };

  const duplicatePreset = (preset: VenuePreset) => {
    const duplicatedPreset: VenuePreset = {
      ...preset,
      id: `preset-${Date.now()}`,
      name: `${preset.name} (Copy)`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      version: 1,
    };

    setPresets((prev) => [...prev, duplicatedPreset]);

    toast({
      title: "Preset duplicated",
      description: "A copy of the preset has been created.",
    });
  };

  const deletePreset = (presetId: string) => {
    setPresets((prev) => prev.filter((p) => p.id !== presetId));
    toast({
      title: "Preset deleted",
      description: "The venue preset has been permanently deleted.",
    });
  };

  const FormFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Preset Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Elegant Wedding Setup"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {presetCategories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your venue setup..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                capacity: parseInt(e.target.value) || 0,
              })
            }
            min="1"
          />
        </div>
        <div>
          <Label htmlFor="basePrice">Base Price ($)</Label>
          <Input
            id="basePrice"
            type="number"
            value={formData.basePrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                basePrice: parseFloat(e.target.value) || 0,
              })
            }
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <Label htmlFor="pricePerGuest">Price per Guest ($)</Label>
          <Input
            id="pricePerGuest"
            type="number"
            value={formData.pricePerGuest}
            onChange={(e) =>
              setFormData({
                ...formData,
                pricePerGuest: parseFloat(e.target.value) || 0,
              })
            }
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="includes">Includes (comma-separated)</Label>
        <Input
          id="includes"
          value={formData.includes}
          onChange={(e) =>
            setFormData({ ...formData, includes: e.target.value })
          }
          placeholder="Tables, Chairs, Linens, Stage setup"
        />
      </div>

      <div>
        <Label htmlFor="excludes">Excludes (comma-separated)</Label>
        <Input
          id="excludes"
          value={formData.excludes}
          onChange={(e) =>
            setFormData({ ...formData, excludes: e.target.value })
          }
          placeholder="Catering, Decorations, Entertainment"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="wedding, formal, elegant, round-tables"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="isPublic"
            checked={formData.isPublic}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isPublic: checked })
            }
          />
          <Label htmlFor="isPublic">Public (visible to hosts)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked })
            }
          />
          <Label htmlFor="isActive">Active</Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Venue Preset Management</h2>
          <p className="text-muted-foreground">
            Create and manage your venue layout presets for host bookings
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Preset
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Presets</p>
                <p className="text-2xl font-bold">{presets.length}</p>
              </div>
              <Settings className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Presets</p>
                <p className="text-2xl font-bold">
                  {presets.filter((p) => p.isActive).length}
                </p>
              </div>
              <Eye className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Public Presets</p>
                <p className="text-2xl font-bold">
                  {presets.filter((p) => p.isPublic).length}
                </p>
              </div>
              <Star className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg. Capacity</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    presets.reduce((sum, p) => sum + p.capacity, 0) /
                      presets.length,
                  ) || 0}
                </p>
              </div>
              <Users className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => (
          <Card
            key={preset.id}
            className="transition-shadow hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{preset.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {preset.category.name} • v{preset.version}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  {preset.isPublic && (
                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >
                      Public
                    </Badge>
                  )}
                  {preset.isActive && (
                    <Badge
                      variant="default"
                      className="text-xs"
                    >
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {preset.description}
              </p>

              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{preset.capacity}</span>
                </div>
                {preset.pricingInfo && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${preset.pricingInfo.basePrice}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {preset.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-1 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(preset)}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => duplicatePreset(preset)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deletePreset(preset.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {presets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Settings className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">
              No presets created yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Create your first venue preset to offer pre-designed layouts to
              event hosts.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Preset
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Preset Dialog */}
      <Dialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Venue Preset</DialogTitle>
            <DialogDescription>
              Define the basic information for your venue preset. You&apos;ll
              design the layout next.
            </DialogDescription>
          </DialogHeader>
          <FormFields />
          <div className="flex gap-2">
            <Button
              onClick={handleCreatePreset}
              disabled={!formData.name || !formData.category}
            >
              Create Preset
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Preset Dialog */}
      <Dialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Venue Preset</DialogTitle>
            <DialogDescription>
              Update the information for your venue preset.
            </DialogDescription>
          </DialogHeader>
          <FormFields />
          <div className="flex gap-2">
            <Button
              onClick={handleEditPreset}
              disabled={!formData.name || !formData.category}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VenuePresetManager;
