"use client";

import EmailContactImportDialog from "@/components/contacts/EmailContactImportDialog";
import PhoneContactImportDialog from "@/components/contacts/PhoneContactImportDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Mail, Phone, Plus } from "lucide-react";
import { useState } from "react";

interface Guest {
  name: string;
  email: string;
  phone?: string;
  group?: string;
  status: "pending" | "attending" | "declined" | "maybe";
  plusOnes: number;
  dietaryRestrictions?: string;
  notes?: string;
}

interface RSVPGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  guestCount: number;
}

interface AddGuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (guest: Guest) => void;
  groups: RSVPGroup[];
}

const AddGuestDialog = ({
  isOpen,
  onClose,
  onAddGuest,
  groups,
}: AddGuestDialogProps) => {
  const [formData, setFormData] = useState<Guest>({
    name: "",
    email: "",
    phone: "",
    group: "",
    status: "pending",
    plusOnes: 0,
    dietaryRestrictions: "",
    notes: "",
  });

  const [bulkMode, setBulkMode] = useState(false);
  const [bulkContactMethod, setBulkContactMethod] = useState<"email" | "phone">(
    "email",
  );
  const [bulkEmails, setBulkEmails] = useState("");
  const [bulkPhones, setBulkPhones] = useState("");
  const [showEmailImport, setShowEmailImport] = useState(false);
  const [showPhoneImport, setShowPhoneImport] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for single guest mode
    if (!bulkMode) {
      if (!formData.name.trim()) {
        alert("Name is required");
        return;
      }
      if (!formData.phone?.trim()) {
        alert("Phone number is required");
        return;
      }
    }

    if (bulkMode) {
      if (bulkContactMethod === "email") {
        // Handle bulk email input
        const emails = bulkEmails.split("\n").filter((email) => email.trim());
        emails.forEach((email) => {
          const trimmedEmail = email.trim();
          if (trimmedEmail) {
            onAddGuest({
              ...formData,
              email: trimmedEmail,
              phone: "", // No phone for bulk email
              name: trimmedEmail.split("@")[0], // Use email prefix as default name
            });
          }
        });
      } else {
        // Handle bulk phone input
        const phones = bulkPhones.split("\n").filter((phone) => phone.trim());
        phones.forEach((phone) => {
          const trimmedPhone = phone.trim();
          if (trimmedPhone) {
            onAddGuest({
              ...formData,
              phone: trimmedPhone,
              email: "", // No email for bulk phone
              name: `Guest ${trimmedPhone}`, // Use phone as default name
            });
          }
        });
      }
    } else {
      onAddGuest(formData);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      group: "",
      status: "pending",
      plusOnes: 0,
      dietaryRestrictions: "",
      notes: "",
    });
    setBulkEmails("");
    setBulkPhones("");
    setBulkMode(false);
    setBulkContactMethod("email");
    setShowEmailImport(false);
    setShowPhoneImport(false);
    onClose();
  };

  const handleInputChange = (field: keyof Guest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailImport = (emails: string[]) => {
    const currentEmails = bulkEmails
      .split("\n")
      .filter((email) => email.trim());
    const newEmails = [...currentEmails, ...emails].join("\n");
    setBulkEmails(newEmails);
    setShowEmailImport(false);
  };

  const handlePhoneImport = (phones: string[]) => {
    const currentPhones = bulkPhones
      .split("\n")
      .filter((phone) => phone.trim());
    const newPhones = [...currentPhones, ...phones].join("\n");
    setBulkPhones(newPhones);
    setShowPhoneImport(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Guest{bulkMode ? "s" : ""}</DialogTitle>
          <DialogDescription>
            {bulkMode
              ? `Add multiple guests by entering their ${bulkContactMethod === "email" ? "email addresses" : "phone numbers"} (one per line)`
              : "Add a new guest to your event's RSVP list"}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 flex gap-2">
          <Button
            variant={!bulkMode ? "default" : "outline"}
            size="sm"
            onClick={() => setBulkMode(false)}
          >
            Single Guest
          </Button>
          <Button
            variant={bulkMode ? "default" : "outline"}
            size="sm"
            onClick={() => setBulkMode(true)}
          >
            Bulk Add
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {bulkMode ? (
            <div className="space-y-4">
              {/* Bulk Contact Method Toggle */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={
                    bulkContactMethod === "email" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setBulkContactMethod("email")}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Bulk by Email
                </Button>
                <Button
                  type="button"
                  variant={
                    bulkContactMethod === "phone" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setBulkContactMethod("phone")}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Bulk by Phone
                </Button>
              </div>

              {bulkContactMethod === "email" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bulk-emails">Email Addresses</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEmailImport(true)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Import from Email
                    </Button>
                  </div>
                  <Textarea
                    id="bulk-emails"
                    placeholder="Enter email addresses, one per line:&#10;john@example.com&#10;jane@example.com&#10;mike@example.com"
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-muted-foreground text-xs">
                    Names will be auto-generated from email addresses. You can
                    edit them later.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bulk-phones">Phone Numbers</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPhoneImport(true)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Import from Contacts
                    </Button>
                  </div>
                  <Textarea
                    id="bulk-phones"
                    placeholder="Enter phone numbers, one per line:&#10;+1 (555) 123-4567&#10;+1 (555) 987-6543&#10;+1 (555) 456-7890"
                    value={bulkPhones}
                    onChange={(e) => setBulkPhones(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-muted-foreground text-xs">
                    Names will be auto-generated from phone numbers. You can
                    edit them later.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-1"
                  >
                    Email
                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >
                      Important
                    </Badge>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                  <p className="text-muted-foreground text-xs">
                    Email helps with notifications and digital invitations
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plus-ones">Plus Ones</Label>
                  <Input
                    id="plus-ones"
                    type="number"
                    min="0"
                    max="5"
                    value={formData.plusOnes}
                    onChange={(e) =>
                      handleInputChange(
                        "plusOnes",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Restrictions</Label>
                <Input
                  id="dietary"
                  value={formData.dietaryRestrictions}
                  onChange={(e) =>
                    handleInputChange("dietaryRestrictions", e.target.value)
                  }
                  placeholder="Vegetarian, Vegan, Gluten-free, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional notes about this guest..."
                  rows={3}
                />
              </div>
            </>
          )}

          {/* Common fields for both modes */}
          <div className="space-y-2">
            <Label>Group</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={!formData.group ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange("group", "")}
              >
                No Group
              </Button>
              {groups.map((group) => (
                <Button
                  key={group.id}
                  type="button"
                  variant={formData.group === group.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("group", group.id)}
                  className="flex items-center gap-2"
                >
                  <div className={`h-2 w-2 rounded-full ${group.color}`} />
                  {group.name}
                </Button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add Guest{bulkMode ? "s" : ""}
            </Button>
          </DialogFooter>
        </form>

        {/* Import Dialogs */}
        <EmailContactImportDialog
          isOpen={showEmailImport}
          onClose={() => setShowEmailImport(false)}
          onImport={handleEmailImport}
        />

        <PhoneContactImportDialog
          isOpen={showPhoneImport}
          onClose={() => setShowPhoneImport(false)}
          onImport={handlePhoneImport}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestDialog;
