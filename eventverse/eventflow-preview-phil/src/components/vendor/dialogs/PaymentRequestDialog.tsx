
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, CreditCard, Calendar, Send, Clock } from "lucide-react";

interface PaymentRequestDialogProps {
  children: React.ReactNode;
}

const PaymentRequestDialog = ({ children }: PaymentRequestDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const mockClients = [
    { id: "1", name: "Johnson Wedding", balance: 5000, nextPayment: "Final Payment" },
    { id: "2", name: "Elite Events Corp", balance: 3200, nextPayment: "Milestone 2" },
    { id: "3", name: "Sarah & Michael", balance: 2500, nextPayment: "Deposit Due" }
  ];

  const paymentTypes = [
    { id: "deposit", label: "Deposit", description: "Initial payment to secure services" },
    { id: "milestone", label: "Milestone Payment", description: "Progress-based payment" },
    { id: "final", label: "Final Payment", description: "Completion payment" },
    { id: "additional", label: "Additional Services", description: "Extra services or changes" }
  ];

  const handleSendRequest = () => {
    // Here you would integrate with payment processing
    console.log("Payment request sent:", {
      client: selectedClient,
      amount,
      description,
      dueDate,
      paymentType
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Request Payment
          </DialogTitle>
          <DialogDescription>
            Send a payment request to your client with automated tracking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label>Select Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose client to request payment from" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="font-medium">{client.name}</span>
                        <span className="text-sm text-gray-600 ml-2">- {client.nextPayment}</span>
                      </div>
                      <Badge variant="outline">${client.balance.toLocaleString()}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Type */}
          <div className="space-y-2">
            <Label>Payment Type</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                {paymentTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount and Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe the services or milestone this payment covers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Payment Methods Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Available Payment Methods
            </h4>
            <div className="flex gap-2">
              <Badge variant="secondary">Credit Card</Badge>
              <Badge variant="secondary">Bank Transfer</Badge>
              <Badge variant="secondary">PayPal</Badge>
              <Badge variant="secondary">Check</Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Client will receive a secure payment link with multiple options
            </p>
          </div>

          {/* Auto-reminders */}
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Automatic reminders will be sent 3 days and 1 day before due date
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={handleSendRequest}
              disabled={!selectedClient || !amount || !paymentType}
              className="flex-1"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Payment Request
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRequestDialog;
