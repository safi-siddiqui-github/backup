import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Mail, 
  Phone, 
  UserPlus, 
  Send, 
  X, 
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

interface Guest {
  id: string;
  name: string;
  email: string;
  selected: boolean;
  source: 'contacts' | 'recent' | 'manual';
  lastEventDate?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitations: (guests: string[]) => void;
  eventName: string;
}

const QuickInvitationModal = ({ isOpen, onClose, onSendInvitations, eventName }: Props) => {
  const [selectedTab, setSelectedTab] = useState("contacts");
  const [emailInput, setEmailInput] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [contactsLoaded, setContactsLoaded] = useState(false);

  // Mock recent guests for demo
  const recentGuests: Guest[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      selected: false,
      source: "recent",
      lastEventDate: "2024-01-15"
    },
    {
      id: "2", 
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      selected: false,
      source: "recent",
      lastEventDate: "2024-02-20"
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike.wilson@example.com", 
      selected: false,
      source: "recent",
      lastEventDate: "2024-01-30"
    }
  ];

  const loadContacts = async () => {
    if (contactsLoaded) return;
    
    setIsProcessing(true);
    try {
      // Mock contact loading - in real app would use Contact Picker API
      const mockContacts: Guest[] = [
        {
          id: "c1",
          name: "Emily Davis",
          email: "emily.davis@example.com",
          selected: false,
          source: "contacts"
        },
        {
          id: "c2",
          name: "Alex Rodriguez", 
          email: "alex.r@example.com",
          selected: false,
          source: "contacts"
        },
        {
          id: "c3",
          name: "Lisa Chen",
          email: "lisa.chen@example.com",
          selected: false,
          source: "contacts"
        },
        {
          id: "c4",
          name: "David Park",
          email: "david.park@example.com",
          selected: false,
          source: "contacts"
        }
      ];

      setTimeout(() => {
        setGuests(mockContacts);
        setContactsLoaded(true);
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to load contacts:", error);
      setIsProcessing(false);
    }
  };

  const toggleGuestSelection = (guestId: string) => {
    setGuests(prev => prev.map(guest => 
      guest.id === guestId 
        ? { ...guest, selected: !guest.selected }
        : guest
    ));
  };

  const addEmailGuests = () => {
    const emails = emailInput
      .split(/[,;\n]/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    const newGuests: Guest[] = emails.map((email, index) => ({
      id: `manual-${Date.now()}-${index}`,
      name: email.split('@')[0],
      email,
      selected: true,
      source: 'manual'
    }));

    setGuests(prev => [...prev, ...newGuests]);
    setEmailInput("");
  };

  const getSelectedGuests = () => {
    const fromTabs = guests.filter(guest => guest.selected);
    const recentSelected = recentGuests.filter(guest => guest.selected);
    return [...fromTabs, ...recentSelected];
  };

  const handleSendInvitations = () => {
    const selectedGuests = getSelectedGuests();
    const emails = selectedGuests.map(guest => guest.email);
    
    if (emails.length === 0) {
      return;
    }

    onSendInvitations(emails);
    onClose();
  };

  const selectedCount = getSelectedGuests().length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Send Invitations for "{eventName}"
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 flex-1 overflow-hidden">
              <TabsContent value="contacts" className="h-full overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      Phone Contacts
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={loadContacts}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Loading..." : contactsLoaded ? "Reload" : "Load Contacts"}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    {!contactsLoaded && !isProcessing && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Phone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Click "Load Contacts" to import from your phone</p>
                      </div>
                    )}

                    {isProcessing && (
                      <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-muted-foreground">Loading your contacts...</p>
                      </div>
                    )}

                    {contactsLoaded && (
                      <div className="space-y-2">
                        {guests.map((guest) => (
                          <div
                            key={guest.id}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => toggleGuestSelection(guest.id)}
                          >
                            <Checkbox 
                              checked={guest.selected}
                              onChange={() => {}}
                            />
                            <div className="flex-1">
                              <p className="font-medium">{guest.name}</p>
                              <p className="text-sm text-muted-foreground">{guest.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recent" className="h-full overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Recently Invited Guests
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-2">
                      {recentGuests.map((guest) => (
                        <div
                          key={guest.id}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                            const updatedGuests = recentGuests.map(g => 
                              g.id === guest.id ? { ...g, selected: !g.selected } : g
                            );
                            // Update recentGuests selection state
                          }}
                        >
                          <Checkbox 
                            checked={guest.selected}
                            onChange={() => {}}
                          />
                          <div className="flex-1">
                            <p className="font-medium">{guest.name}</p>
                            <p className="text-sm text-muted-foreground">{guest.email}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              Last invited: {guest.lastEventDate}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email" className="h-full overflow-hidden">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Add Email Addresses</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      <Label>Email Addresses</Label>
                      <Textarea
                        placeholder="Enter email addresses separated by commas, semicolons, or new lines&#10;example@email.com, another@email.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="min-h-[100px] mt-1"
                      />
                      <Button
                        onClick={addEmailGuests}
                        disabled={!emailInput.trim()}
                        className="mt-2"
                        size="sm"
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        Add Emails
                      </Button>
                    </div>

                    {guests.filter(g => g.source === 'manual').length > 0 && (
                      <div>
                        <Label>Added Guests</Label>
                        <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                          {guests.filter(g => g.source === 'manual').map((guest) => (
                            <div key={guest.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm">{guest.email}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setGuests(prev => prev.filter(g => g.id !== guest.id))}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <Label>Custom Message (Optional)</Label>
              <Textarea
                placeholder="Add a personal message to your invitations..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {selectedCount > 0 ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {selectedCount} guest{selectedCount !== 1 ? 's' : ''} selected
                  </span>
                ) : (
                  "No guests selected"
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Skip for Now
                </Button>
                <Button 
                  onClick={handleSendInvitations}
                  disabled={selectedCount === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickInvitationModal;