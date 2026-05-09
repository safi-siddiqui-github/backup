import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useVendorInvitations } from "@/hooks/useVendorInvitations";
import { VendorBoothSettings } from "@/types/venue";
import { Mail, Store, DollarSign, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockVendors } from "@/utils/mockVendorData";

interface VendorInvitationDialogProps {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  boothSettings: VendorBoothSettings;
  onInviteSent: () => void;
}

const VendorInvitationDialog = ({
  open,
  onClose,
  eventId,
  eventName,
  eventDate,
  eventLocation,
  hostId,
  hostName,
  hostEmail,
  boothSettings,
  onInviteSent,
}: VendorInvitationDialogProps) => {
  const { sendInvitation } = useVendorInvitations();
  const { toast } = useToast();
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorBusinessName, setVendorBusinessName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedBooths, setSelectedBooths] = useState<string[]>(
    boothSettings.boothTypes.map(b => b.id)
  );
  const [boothCapacities, setBoothCapacities] = useState<Record<string, number>>(
    boothSettings.boothTypes.reduce((acc, booth) => ({
      ...acc,
      [booth.id]: booth.capacity || 10
    }), {})
  );

  const handleSubmit = () => {
    if (!vendorEmail || !vendorName) {
      toast({
        title: "Missing Information",
        description: "Please fill in vendor email and name",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(vendorEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (selectedBooths.length === 0) {
      toast({
        title: "No Booth Types Selected",
        description: "Please select at least one booth type to offer",
        variant: "destructive",
      });
      return;
    }

    const availableBooths = boothSettings.boothTypes
      .filter(b => selectedBooths.includes(b.id))
      .map(b => ({
        ...b,
        capacity: boothCapacities[b.id]
      }));

    sendInvitation({
      eventId,
      eventName,
      eventDate,
      eventLocation,
      hostId,
      hostName,
      hostEmail,
      vendorEmail,
      vendorName,
      vendorBusinessName,
      message,
      availableBooths,
      maxQuantity: boothSettings.maxBoothsPerVendor,
    });

    toast({
      title: "Invitation Sent!",
      description: `Vendor invitation sent to ${vendorEmail}`,
    });

    onInviteSent();
    onClose();
    
    // Reset form
    setVendorEmail("");
    setVendorName("");
    setVendorBusinessName("");
    setMessage("");
    setSelectedBooths(boothSettings.boothTypes.map(b => b.id));
  };

  const toggleBooth = (boothId: string) => {
    setSelectedBooths(prev =>
      prev.includes(boothId)
        ? prev.filter(id => id !== boothId)
        : [...prev, boothId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Invite Vendor to {eventName}
          </DialogTitle>
          <DialogDescription>
            Send an invitation to a vendor to set up a booth at your event
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Recent Vendor Suggestions */}
          <div>
            <Label className="mb-2 block">Recent Vendors</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Click a vendor to quickly fill in their details
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-1">
              {mockVendors.slice(0, 6).map((vendor) => (
                <Button
                  key={vendor.id}
                  type="button"
                  variant="outline"
                  className="h-auto p-3 justify-start hover:bg-accent"
                  onClick={() => {
                    setVendorEmail(vendor.email);
                    setVendorBusinessName(vendor.businessName);
                    setVendorName('');
                  }}
                >
                  <div className="flex items-start gap-2 text-left w-full">
                    <Store className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{vendor.businessName}</p>
                      <p className="text-xs text-muted-foreground truncate">{vendor.category}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Vendor Email *</Label>
              <Input
                type="email"
                placeholder="vendor@example.com"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Vendor Name *</Label>
              <Input
                placeholder="John Doe"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Business Name (Optional)</Label>
            <Input
              placeholder="e.g., Tasty Tacos Food Truck"
              value={vendorBusinessName}
              onChange={(e) => setVendorBusinessName(e.target.value)}
            />
          </div>

          <div>
            <Label>Available Booth Options</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Select which booth types to offer to this vendor
            </p>
            <div className="space-y-2">
              {boothSettings.boothTypes.map((booth) => (
                <div
                  key={booth.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedBooths.includes(booth.id)}
                    onCheckedChange={() => toggleBooth(booth.id)}
                    id={booth.id}
                  />
                   <div className="flex-1">
                    <label
                      htmlFor={booth.id}
                      className="font-medium cursor-pointer flex items-center gap-2"
                    >
                      {booth.icon === 'tent' ? '⛺' : <Store className="w-4 h-4" />}
                      {booth.name}
                      <Badge variant="secondary" className="ml-2">
                        <DollarSign className="w-3 h-3" />
                        {booth.price} {booth.currency}
                      </Badge>
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {booth.dimensions.width}×{booth.dimensions.height} • Max: {booth.maxAvailable} available
                    </p>
                    {booth.description && (
                      <p className="text-xs text-muted-foreground mt-1">{booth.description}</p>
                    )}
                    <div className="mt-2">
                      <Label htmlFor={`capacity-${booth.id}`} className="text-xs">
                        Max People in Booth
                      </Label>
                      <Input
                        id={`capacity-${booth.id}`}
                        type="number"
                        min="1"
                        max="100"
                        value={boothCapacities[booth.id] || 10}
                        onChange={(e) => setBoothCapacities(prev => ({
                          ...prev,
                          [booth.id]: parseInt(e.target.value) || 10
                        }))}
                        className="h-8 mt-1"
                        placeholder="10"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Limits ticket reservations & RSVP for this booth
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Max booths vendor can select: {boothSettings.maxBoothsPerVendor}
            </p>
          </div>

          <div>
            <Label>Personal Message (Optional)</Label>
            <Textarea
              placeholder="Add a personal message to the vendor..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Mail className="w-4 h-4 mr-2" />
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorInvitationDialog;
