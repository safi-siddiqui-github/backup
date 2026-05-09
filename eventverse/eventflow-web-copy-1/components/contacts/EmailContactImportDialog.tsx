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
import { EmailContact, EmailProvider } from "@/types/contacts";
import { CheckCircle, Download, Mail, Search, Users } from "lucide-react";
import { useState } from "react";

interface EmailContactImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (contacts: string[]) => void;
}

const mockEmailProviders: EmailProvider[] = [
  { id: "gmail", name: "Gmail", icon: "📧", isConnected: false },
  { id: "outlook", name: "Outlook", icon: "📮", isConnected: false },
  { id: "yahoo", name: "Yahoo Mail", icon: "📫", isConnected: false },
  { id: "apple", name: "Apple Mail", icon: "✉️", isConnected: false },
];

const EmailContactImportDialog = ({
  isOpen,
  onClose,
  onImport,
}: EmailContactImportDialogProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<EmailContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set(),
  );
  const [importStep, setImportStep] = useState<
    "provider" | "select" | "success"
  >("provider");

  // Mock contacts data
  const mockContacts: EmailContact[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      organization: "ABC Corp",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane.doe@company.com",
      organization: "XYZ Inc",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.j@startup.co",
      organization: "Startup Co",
    },
    { id: "4", name: "Sarah Wilson", email: "sarah.wilson@freelance.com" },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@agency.net",
      organization: "Creative Agency",
    },
    {
      id: "6",
      name: "Lisa Chen",
      email: "lisa.chen@tech.com",
      organization: "Tech Solutions",
    },
    {
      id: "7",
      name: "Robert Taylor",
      email: "robert.t@consulting.biz",
      organization: "Business Consulting",
    },
    {
      id: "8",
      name: "Emma Davis",
      email: "emma.davis@design.studio",
      organization: "Design Studio",
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.organization &&
        contact.organization.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleProviderSelect = async (providerId: string) => {
    setSelectedProvider(providerId);
    setIsLoading(true);

    // Simulate OAuth flow and contact fetching
    setTimeout(() => {
      setContacts(mockContacts);
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

  const handleImport = () => {
    const selectedEmails = contacts
      .filter((contact) => selectedContacts.has(contact.id))
      .map((contact) => contact.email);

    onImport(selectedEmails);

    // Reset state and show success
    setImportStep("success");
    setTimeout(() => {
      onClose();
      resetDialog();
    }, 1500);
  };

  const resetDialog = () => {
    setImportStep("provider");
    setSelectedProvider("");
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
            <Mail className="h-5 w-5" />
            Import Email Contacts
          </DialogTitle>
          <DialogDescription>
            {importStep === "provider" &&
              "Choose your email provider to import contacts"}
            {importStep === "select" &&
              "Select the contacts you want to add as guests"}
            {importStep === "success" &&
              "Successfully imported your selected contacts!"}
          </DialogDescription>
        </DialogHeader>

        {importStep === "provider" && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-muted-foreground text-sm">
                  Connecting to {selectedProvider}...
                </p>
                <p className="text-muted-foreground text-xs">
                  Fetching your contacts securely
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {mockEmailProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    variant="outline"
                    className="flex h-16 flex-col items-center gap-2"
                    onClick={() => handleProviderSelect(provider.id)}
                  >
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="text-sm">{provider.name}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {importStep === "select" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
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
                    className="hover:bg-accent flex cursor-pointer items-center space-x-3 rounded-lg border p-3"
                    onClick={() => handleContactToggle(contact.id)}
                  >
                    <Checkbox
                      checked={selectedContacts.has(contact.id)}
                      onCheckedChange={() => handleContactToggle(contact.id)}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {contact.name}
                        </p>
                        {contact.organization && (
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {contact.organization}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground truncate text-sm">
                        {contact.email}
                      </p>
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
                onClick={() => setImportStep("provider")}
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
          {importStep === "provider" && (
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

export default EmailContactImportDialog;
