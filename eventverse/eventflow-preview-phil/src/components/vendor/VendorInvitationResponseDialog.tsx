import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVendorInvitations } from "@/hooks/useVendorInvitations";
import { VendorInvitation, BoothType } from "@/types/venue";
import { DollarSign, CreditCard, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorInvitationResponseDialogProps {
  open: boolean;
  onClose: () => void;
  invitation: VendorInvitation;
}

const VendorInvitationResponseDialog = ({
  open,
  onClose,
  invitation,
}: VendorInvitationResponseDialogProps) => {
  const { acceptInvitation, loading } = useVendorInvitations();
  const { toast } = useToast();
  const [selectedBooths, setSelectedBooths] = useState<Record<string, number>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const updateBoothQuantity = (boothId: string, quantity: number) => {
    setSelectedBooths(prev => ({
      ...prev,
      [boothId]: quantity,
    }));
  };

  const totalQuantity = Object.values(selectedBooths).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = invitation.availableBooths.reduce((sum, booth) => {
    const qty = selectedBooths[booth.id] || 0;
    return sum + (booth.price * qty);
  }, 0);

  const handleAccept = async () => {
    if (totalQuantity === 0) {
      toast({
        title: "No Booths Selected",
        description: "Please select at least one booth",
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    const boothSelections = Object.entries(selectedBooths)
      .filter(([_, qty]) => qty > 0)
      .map(([boothId, qty]) => {
        const booth = invitation.availableBooths.find(b => b.id === boothId)!;
        return {
          boothTypeId: boothId,
          quantity: qty,
          subtotal: booth.price * qty,
        };
      });

    try {
      await acceptInvitation(invitation.id, boothSelections, paymentMethod, termsAccepted);
      toast({
        title: "Success!",
        description: "Payment processed. Your booth reservation is confirmed!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Event Invitation: {invitation.eventName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Date:</span>
              <p className="font-medium">{invitation.eventDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-medium">{invitation.eventLocation}</p>
            </div>
          </div>

          {invitation.message && (
            <div className="p-4 bg-accent/30 rounded">
              <p className="text-sm font-medium mb-2">Message from {invitation.hostName}:</p>
              <p className="text-sm">{invitation.message}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3">Select Booth Type(s)</h3>
            <div className="space-y-3">
              {invitation.availableBooths.map((booth) => (
                <div key={booth.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{booth.name}</h4>
                      <p className="text-sm text-muted-foreground">{booth.description}</p>
                      <Badge variant="secondary" className="mt-1">
                        <DollarSign className="w-3 h-3" />
                        {booth.price} {booth.currency}
                      </Badge>
                    </div>
                    <Select
                      value={String(selectedBooths[booth.id] || 0)}
                      onValueChange={(val) => updateBoothQuantity(booth.id, Number(val))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: Math.min(invitation.maxQuantity + 1, booth.maxAvailable + 1) }, (_, i) => (
                          <SelectItem key={i} value={String(i)}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total Selected: {totalQuantity} / {invitation.maxQuantity} booths
            </p>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>{totalAmount} {invitation.availableBooths[0]?.currency || 'USD'}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              <CreditCard className="w-3 h-3 inline mr-1" />
              Mock payment - No actual charges will be made
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the terms and conditions for vendor participation at this event
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleAccept} disabled={loading || totalQuantity === 0 || !termsAccepted}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Pay & Accept ({totalAmount} {invitation.availableBooths[0]?.currency || 'USD'})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorInvitationResponseDialog;
