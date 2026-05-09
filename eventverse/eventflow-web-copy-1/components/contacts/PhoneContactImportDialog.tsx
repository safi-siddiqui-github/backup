"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContactPhone, PhoneContact } from "@/types/contacts";
import {
  Briefcase,
  CheckCircle,
  Download,
  Heart,
  Home,
  Phone,
  Search,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

interface PhoneContactImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (contacts: string[]) => void;
}

const PhoneContactImportDialog = ({
  isOpen,
  onClose,
  onImport,
}: PhoneContactImportDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<PhoneContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set(),
  );
  const [importStep, setImportStep] = useState<
    "permission" | "select" | "success"
  >("permission");

  // Mock phone contacts data
  const mockPhoneContacts: PhoneContact[] = [
    {
      id: "1",
      name: "John Smith",
      phoneNumbers: [
        { number: "+1 (555) 123-4567", type: "mobile", isPrimary: true },
        { number: "+1 (555) 123-4568", type: "work" },
      ],
      email: "john.smith@example.com",
      organization: "ABC Corp",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Jane Doe",
      phoneNumbers: [
        { number: "+1 (555) 987-6543", type: "mobile", isPrimary: true },
      ],
      email: "jane.doe@company.com",
      organization: "XYZ Inc",
    },
    {
      id: "3",
      name: "Mike Johnson",
      phoneNumbers: [
        { number: "+1 (555) 456-7890", type: "mobile", isPrimary: true },
        { number: "+1 (555) 456-7891", type: "home" },
      ],
      isFavorite: true,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      phoneNumbers: [
        { number: "+1 (555) 321-0987", type: "mobile", isPrimary: true },
      ],
      email: "sarah.wilson@freelance.com",
    },
    {
      id: "5",
      name: "David Brown",
      phoneNumbers: [
        { number: "+1 (555) 654-3210", type: "work", isPrimary: true },
        { number: "+1 (555) 654-3211", type: "mobile" },
      ],
      organization: "Creative Agency",
    },
    {
      id: "6",
      name: "Lisa Chen",
      phoneNumbers: [
        { number: "+1 (555) 789-0123", type: "mobile", isPrimary: true },
      ],
      organization: "Tech Solutions",
    },
    {
      id: "7",
      name: "Mom",
      phoneNumbers: [
        { number: "+1 (555) 111-2222", type: "mobile", isPrimary: true },
      ],
      isFavorite: true,
      group: "Family",
    },
    {
      id: "8",
      name: "Emma Davis",
      phoneNumbers: [
        { number: "+1 (555) 333-4444", type: "mobile", isPrimary: true },
      ],
      organization: "Design Studio",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumbers.some((phone) => phone.number.includes(searchTerm)) ||
      (contact.organization &&
        contact.organization.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleRequestAccess = async () => {
    setIsLoading(true);

    // Simulate permission request and contact fetching
    setTimeout(() => {
      setContacts(mockPhoneContacts);
      setIsLoading(false);
      setImportStep("select");
    }, 2000);
  };

  const handleContactToggle = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedContacts.size === filteredContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(filteredContacts.map((c) => c.id)));
    }
  };

  const getPhoneTypeIcon = (type: ContactPhone["type"]) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-3 w-3" />;
      case "work":
        return <Briefcase className="h-3 w-3" />;
      case "home":
        return <Home className="h-3 w-3" />;
      default:
        return <Phone className="h-3 w-3" />;
    }
  };

  const handleImport = () => {
    const selectedPhones = contacts
      .filter((contact) => selectedContacts.has(contact.id))
      .map(
        (contact) =>
          contact.phoneNumbers.find((p) => p.isPrimary)?.number ||
          contact.phoneNumbers[0]?.number,
      )
      .filter(Boolean);

    onImport(selectedPhones);

    // Reset state and show success
    setImportStep("success");
    setTimeout(() => {
      onClose();
      resetDialog();
    }, 1500);
  };

  const resetDialog = () => {
    setImportStep("permission");
    setContacts([]);
    setSelectedContacts(new Set());
    setSearchTerm("");
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    resetDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="max-h-[80vh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Import Phone Contacts
          </DialogTitle>
          <DialogDescription>
            {importStep === "permission" &&
              "Access your phone contacts to import guest phone numbers"}
            {importStep === "select" &&
              "Select the contacts you want to add as guests"}
            {importStep === "success" &&
              "Successfully imported your selected contacts!"}
          </DialogDescription>
        </DialogHeader>

        {importStep === "permission" && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-muted-foreground text-sm">
                  Accessing your contacts...
                </p>
                <p className="text-muted-foreground text-xs">
                  This may take a moment
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                    <Phone className="text-primary h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Access Phone Contacts</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    We&apos;ll import your phone contacts so you can easily add
                    guests to your event. Your contact data will be processed
                    securely and not stored.
                  </p>
                </div>
                <Button
                  onClick={handleRequestAccess}
                  className="w-full"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Access Phone Contacts
                </Button>
              </div>
            )}
          </div>
        )}

        {importStep === "select" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  <Phone className="mr-1 h-3 w-3" />
                  {contacts.length} contacts found
                </Badge>
                <Badge variant="outline">
                  {selectedContacts.size} selected
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedContacts.size === filteredContacts.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="h-64">
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="hover:bg-accent flex cursor-pointer items-start space-x-3 rounded-lg border p-3"
                    onClick={() => handleContactToggle(contact.id)}
                  >
                    <Checkbox
                      checked={selectedContacts.has(contact.id)}
                      onCheckedChange={() => handleContactToggle(contact.id)}
                      className="mt-1"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {contact.name}
                        </p>
                        {contact.isFavorite && (
                          <Heart className="h-3 w-3 fill-current text-red-500" />
                        )}
                        {contact.organization && (
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {contact.organization}
                          </Badge>
                        )}
                        {contact.group && (
                          <Badge
                            variant="secondary"
                            className="text-xs"
                          >
                            {contact.group}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        {contact.phoneNumbers.map((phone, index) => (
                          <div
                            key={index}
                            className="text-muted-foreground flex items-center gap-2 text-xs"
                          >
                            {getPhoneTypeIcon(phone.type)}
                            <span>{phone.number}</span>
                            {phone.isPrimary && (
                              <Badge
                                variant="outline"
                                className="text-xs"
                              >
                                Primary
                              </Badge>
                            )}
                            <span className="capitalize">({phone.type})</span>
                          </div>
                        ))}
                        {contact.email && (
                          <p className="text-muted-foreground text-xs">
                            {contact.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {importStep === "success" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">
              Contacts Imported Successfully!
            </p>
            <p className="text-muted-foreground text-sm">
              {selectedContacts.size} contacts have been added to your guest
              list
            </p>
          </div>
        )}

        <DialogFooter>
          {importStep === "select" && (
            <>
              <Button
                variant="outline"
                onClick={() => setImportStep("permission")}
              >
                Back
              </Button>
              <Button
                onClick={handleImport}
                disabled={selectedContacts.size === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Import {selectedContacts.size} Contact
                {selectedContacts.size !== 1 ? "s" : ""}
              </Button>
            </>
          )}
          {importStep === "permission" && (
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneContactImportDialog;
