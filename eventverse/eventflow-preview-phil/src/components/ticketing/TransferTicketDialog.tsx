import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GuestTicket } from "@/types/ticketing";
import { ArrowRightLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransferTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: GuestTicket | null;
  onConfirmTransfer: (ticketId: string, toEmail: string, toName: string, message: string) => void;
}

const TransferTicketDialog = ({ 
  open, 
  onOpenChange, 
  ticket,
  onConfirmTransfer 
}: TransferTicketDialogProps) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!ticket) return;
    
    if (!recipientEmail.trim() || !recipientName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onConfirmTransfer(ticket.id, recipientEmail, recipientName, message);
      
      // Reset form
      setRecipientEmail("");
      setRecipientName("");
      setMessage("");
      setIsSubmitting(false);
      
      onOpenChange(false);
    }, 1000);
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Transfer Ticket
          </DialogTitle>
          <DialogDescription>
            Transfer your ticket to another person. They will receive an email with instructions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Ticket Info */}
          <div className="bg-muted rounded-lg p-3 space-y-1">
            <p className="font-semibold text-sm">{ticket.type}</p>
            <p className="text-xs text-muted-foreground">{ticket.ticketNumber}</p>
            <p className="text-xs text-muted-foreground">{ticket.eventDetails.eventName}</p>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-900 dark:text-orange-200">
              Once transferred, you will no longer have access to this ticket. The transfer cannot be undone.
            </p>
          </div>

          {/* Recipient Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="recipient@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          {/* Recipient Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Recipient Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message to the recipient..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary to-purple-600"
          >
            {isSubmitting ? "Transferring..." : "Confirm Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferTicketDialog;
