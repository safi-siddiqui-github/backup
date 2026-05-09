"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocationContext } from "@/hooks/useLocationContext";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import { VenueSection } from "@/types/venue";
import { Building2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type SecitonToDeleteType = {
  name?: string;
};

const SectionNavigation = () => {
  const { hierarchy, addSection, navigateToArrangement } = useVenueHierarchy();
  const { selectedLocationId, currentLocationData } = useLocationContext();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [sectionToDelete, setSectionToDelete] = useState<VenueSection | null>(
    null,
  );

  if (!selectedLocationId || !currentLocationData) {
    return (
      <div className="py-8 text-center text-gray-500">
        Please select a location first
      </div>
    );
  }

  const { location, sections, currentSection } = currentLocationData;

  const handleAddSection = () => {
    if (newSectionName.trim() && selectedLocationId) {
      addSection(selectedLocationId, {
        name: newSectionName.trim(),
        locationId: selectedLocationId,
        description: `Section: ${newSectionName.trim()}`,
      });
      setNewSectionName("");
      setShowAddDialog(false);
    }
  };

  const handleDeleteSection = () => {
    if (sectionToDelete) {
      // TODO: Implement section deletion in useVenueHierarchy
      console.log("Deleting section:", sectionToDelete.name);
      setSectionToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const handleSectionSelect = (section: VenueSection) => {
    if (section.arrangements.length > 0) {
      navigateToArrangement(
        selectedLocationId,
        section.id,
        section.arrangements[0].id,
      );
    }
  };

  return (
    <div className="border-b bg-gray-50 px-4 py-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-gray-700">
          Sections in {location.name}
        </h3>
        <Button
          size="sm"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Section
        </Button>
      </div>

      {sections.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          <Building2 className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <p>No sections yet. Add your first section to get started.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 ${
                currentSection?.id === section.id
                  ? "border-blue-200 bg-blue-100 text-blue-800"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
              onClick={() => handleSectionSelect(section)}
            >
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{section.name}</span>
              <span className="text-xs text-gray-500">
                ({section.arrangements.length})
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSectionToDelete(section);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Section
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {/* Add Section Dialog */}
      <Dialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>
              Create a new section in {location.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="section-name">Section Name</Label>
              <Input
                id="section-name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g., Main Floor, Balcony"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSection}
              disabled={!newSectionName.trim()}
            >
              Add Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Section Dialog */}
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Section</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{sectionToDelete?.name}
              &quot;? This will delete all{" "}
              {sectionToDelete?.arrangements.length || 0} arrangements within
              it. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSection}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SectionNavigation;
