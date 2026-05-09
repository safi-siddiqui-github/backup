"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RSVPGroup } from "@/types/rsvp";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface GroupManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  groups: RSVPGroup[];
  onUpdateGroups: (groups: RSVPGroup[]) => void;
}

const GroupManagementDialog = ({
  isOpen,
  onClose,
  groups,
  onUpdateGroups,
}: GroupManagementDialogProps) => {
  const [editingGroup, setEditingGroup] = useState<RSVPGroup | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "bg-blue-500",
    memberLimit: "",
  });

  const colorOptions = [
    { value: "bg-red-500", label: "Red" },
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-pink-500", label: "Pink" },
    { value: "bg-indigo-500", label: "Indigo" },
    { value: "bg-orange-500", label: "Orange" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newGroup: RSVPGroup = {
      id: editingGroup?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      color: formData.color,
      memberLimit: formData.memberLimit
        ? parseInt(formData.memberLimit)
        : undefined,
      guestCount: editingGroup?.guestCount ?? 0,
    };

    if (editingGroup) {
      onUpdateGroups(
        groups.map((g) => (g.id === editingGroup.id ? newGroup : g)),
      );
    } else {
      onUpdateGroups([...groups, newGroup]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "bg-blue-500",
      memberLimit: "",
    });
    setEditingGroup(null);
  };

  const handleEdit = (group: RSVPGroup) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      description: group.description || "",
      color: group.color,
      memberLimit: group.memberLimit?.toString() || "",
    });
  };

  const handleDelete = (groupId: string) => {
    onUpdateGroups(groups.filter((g) => g.id !== groupId));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Guest Groups</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add/Edit Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg bg-gray-50 p-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="group-name">Group Name *</Label>
                <Input
                  id="group-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., VIP Guests, Family, Friends"
                  required
                />
              </div>
              <div>
                <Label htmlFor="member-limit">Member Limit (optional)</Label>
                <Input
                  id="member-limit"
                  type="number"
                  value={formData.memberLimit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      memberLimit: e.target.value,
                    }))
                  }
                  placeholder="No limit"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of this group"
                rows={2}
              />
            </div>

            <div>
              <Label>Group Color</Label>
              <div className="mt-2 flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, color: color.value }))
                    }
                    className={`h-8 w-8 rounded-full ${color.value} ${
                      formData.color === color.value
                        ? "ring-2 ring-gray-900 ring-offset-2"
                        : ""
                    }`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingGroup ? "Update Group" : "Add Group"}
              </Button>
              {editingGroup && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          {/* Existing Groups */}
          <div className="space-y-3">
            <h4 className="font-medium">Existing Groups ({groups.length})</h4>
            {groups.length === 0 ? (
              <p className="py-4 text-center text-gray-500">
                No groups created yet
              </p>
            ) : (
              <div className="space-y-2">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full ${group.color}`} />
                      <div>
                        <div className="font-medium">{group.name}</div>
                        {group.description && (
                          <div className="text-sm text-gray-600">
                            {group.description}
                          </div>
                        )}
                        {group.memberLimit && (
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            Limit: {group.memberLimit}
                          </Badge>
                        )}
                        {group.guestCount !== undefined && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs"
                          >
                            {group.guestCount} members
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(group)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(group.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupManagementDialog;
