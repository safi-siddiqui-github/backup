import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Download, CheckCircle, Heart, Briefcase, Home, Smartphone } from "lucide-react";
import { PhoneContact, ContactPhone } from "@/types/contacts";

interface PhoneContactImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (contacts: string[]) => void;
}

const PhoneContactImportDialog = ({ isOpen, onClose, onImport }: PhoneContactImportDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<PhoneContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [importStep, setImportStep] = useState<'permission' | 'select' | 'success'>('permission');

  // Mock phone contacts data
  const mockPhoneContacts: PhoneContact[] = [
    {
      id: '1',
      name: 'John Smith',
      phoneNumbers: [
        { number: '+1 (555) 123-4567', type: 'mobile', isPrimary: true },
        { number: '+1 (555) 123-4568', type: 'work' }
      ],
      email: 'john.smith@example.com',
      organization: 'ABC Corp',
      isFavorite: true
    },
    {
      id: '2',
      name: 'Jane Doe',
      phoneNumbers: [
        { number: '+1 (555) 987-6543', type: 'mobile', isPrimary: true }
      ],
      email: 'jane.doe@company.com',
      organization: 'XYZ Inc'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      phoneNumbers: [
        { number: '+1 (555) 456-7890', type: 'mobile', isPrimary: true },
        { number: '+1 (555) 456-7891', type: 'home' }
      ],
      isFavorite: true
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      phoneNumbers: [
        { number: '+1 (555) 321-0987', type: 'mobile', isPrimary: true }
      ],
      email: 'sarah.wilson@freelance.com'
    },
    {
      id: '5',
      name: 'David Brown',
      phoneNumbers: [
        { number: '+1 (555) 654-3210', type: 'work', isPrimary: true },
        { number: '+1 (555) 654-3211', type: 'mobile' }
      ],
      organization: 'Creative Agency'
    },
    {
      id: '6',
      name: 'Lisa Chen',
      phoneNumbers: [
        { number: '+1 (555) 789-0123', type: 'mobile', isPrimary: true }
      ],
      organization: 'Tech Solutions'
    },
    {
      id: '7',
      name: 'Mom',
      phoneNumbers: [
        { number: '+1 (555) 111-2222', type: 'mobile', isPrimary: true }
      ],
      isFavorite: true,
      group: 'Family'
    },
    {
      id: '8',
      name: 'Emma Davis',
      phoneNumbers: [
        { number: '+1 (555) 333-4444', type: 'mobile', isPrimary: true }
      ],
      organization: 'Design Studio'
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phoneNumbers.some(phone => phone.number.includes(searchTerm)) ||
    (contact.organization && contact.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRequestAccess = async () => {
    setIsLoading(true);
    
    // Simulate permission request and contact fetching
    setTimeout(() => {
      setContacts(mockPhoneContacts);
      setIsLoading(false);
      setImportStep('select');
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
      setSelectedContacts(new Set(filteredContacts.map(c => c.id)));
    }
  };

  const getPhoneTypeIcon = (type: ContactPhone['type']) => {
    switch (type) {
      case 'mobile': return <Smartphone className="w-3 h-3" />;
      case 'work': return <Briefcase className="w-3 h-3" />;
      case 'home': return <Home className="w-3 h-3" />;
      default: return <Phone className="w-3 h-3" />;
    }
  };

  const handleImport = () => {
    const selectedPhones = contacts
      .filter(contact => selectedContacts.has(contact.id))
      .map(contact => contact.phoneNumbers.find(p => p.isPrimary)?.number || contact.phoneNumbers[0]?.number)
      .filter(Boolean);
    
    onImport(selectedPhones);
    
    // Reset state and show success
    setImportStep('success');
    setTimeout(() => {
      onClose();
      resetDialog();
    }, 1500);
  };

  const resetDialog = () => {
    setImportStep('permission');
    setContacts([]);
    setSelectedContacts(new Set());
    setSearchTerm('');
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    resetDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Import Phone Contacts
          </DialogTitle>
          <DialogDescription>
            {importStep === 'permission' && "Access your phone contacts to import guest phone numbers"}
            {importStep === 'select' && "Select the contacts you want to add as guests"}
            {importStep === 'success' && "Successfully imported your selected contacts!"}
          </DialogDescription>
        </DialogHeader>

        {importStep === 'permission' && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Accessing your contacts...</p>
                <p className="text-xs text-muted-foreground">This may take a moment</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Access Phone Contacts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We'll import your phone contacts so you can easily add guests to your event. 
                    Your contact data will be processed securely and not stored.
                  </p>
                </div>
                <Button onClick={handleRequestAccess} className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Access Phone Contacts
                </Button>
              </div>
            )}
          </div>
        )}

        {importStep === 'select' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  <Phone className="w-3 h-3 mr-1" />
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
                {selectedContacts.size === filteredContacts.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                    className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                    onClick={() => handleContactToggle(contact.id)}
                  >
                    <Checkbox
                      checked={selectedContacts.has(contact.id)}
                      onCheckedChange={() => handleContactToggle(contact.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium truncate">{contact.name}</p>
                        {contact.isFavorite && (
                          <Heart className="w-3 h-3 text-red-500 fill-current" />
                        )}
                        {contact.organization && (
                          <Badge variant="outline" className="text-xs">
                            {contact.organization}
                          </Badge>
                        )}
                        {contact.group && (
                          <Badge variant="secondary" className="text-xs">
                            {contact.group}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        {contact.phoneNumbers.map((phone, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                            {getPhoneTypeIcon(phone.type)}
                            <span>{phone.number}</span>
                            {phone.isPrimary && (
                              <Badge variant="outline" className="text-xs">Primary</Badge>
                            )}
                            <span className="capitalize">({phone.type})</span>
                          </div>
                        ))}
                        {contact.email && (
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {importStep === 'success' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-lg font-medium">Contacts Imported Successfully!</p>
            <p className="text-sm text-muted-foreground">
              {selectedContacts.size} contacts have been added to your guest list
            </p>
          </div>
        )}

        <DialogFooter>
          {importStep === 'select' && (
            <>
              <Button variant="outline" onClick={() => setImportStep('permission')}>
                Back
              </Button>
              <Button 
                onClick={handleImport}
                disabled={selectedContacts.size === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Import {selectedContacts.size} Contact{selectedContacts.size !== 1 ? 's' : ''}
              </Button>
            </>
          )}
          {importStep === 'permission' && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneContactImportDialog;