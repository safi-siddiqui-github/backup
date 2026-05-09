import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuestTicket, TicketReceipt, PurchaseHistory as PurchaseHistoryType, TransferRecord } from "@/types/ticketing";
import TicketCard from "./TicketCard";
import TransferTicketDialog from "./TransferTicketDialog";
import ReceiptModal from "./ReceiptModal";
import PurchaseHistory from "./PurchaseHistory";
import { Ticket, Receipt, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedGuestTicketingViewProps {
  event: any;
  guest: { name: string; email: string; isCheckedIn: boolean };
}

const EnhancedGuestTicketingView = ({ event, guest }: EnhancedGuestTicketingViewProps) => {
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState<GuestTicket | null>(null);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<TicketReceipt | null>(null);

  // Initialize tickets with state so they can be updated
  const initialTickets: GuestTicket[] = useMemo(() => {
    const ticketDetails = event.ticketDetails || {
      quantity: 3,
      type: "Premium All-Access Pass",
      ticketNumbers: ["TKT-SHOW-001", "TKT-SHOW-002", "TKT-SHOW-003"],
      qrCode: "QR-SHOWCASE2025-001",
      purchaseDate: "2024-12-15",
      totalPaid: 1497
    };

    return Array.from({ length: ticketDetails.quantity }, (_, i) => ({
      id: `ticket-${i + 1}`,
      ticketNumber: ticketDetails.ticketNumbers[i] || `TKT-${String(i + 1).padStart(3, '0')}`,
      type: ticketDetails.type,
      qrCode: `${ticketDetails.qrCode}-${i + 1}`,
      status: i === 0 ? 'valid' : i === 1 ? 'valid' : 'valid' as const,
      purchaseDate: new Date(ticketDetails.purchaseDate),
      price: ticketDetails.totalPaid / ticketDetails.quantity,
      seatAssignment: event.moduleUsage?.seating?.tableNumber ? {
        table: event.moduleUsage.seating.tableNumber,
        seat: `${String.fromCharCode(65 + i)}${event.moduleUsage.seating.seatNumber || (i + 1)}`,
        section: event.accessInfo?.vipAccess ? "VIP Section" : "General Admission"
      } : undefined,
      transferHistory: undefined,
      holder: {
        name: guest.name,
        email: guest.email
      },
      eventDetails: {
        eventId: event.id,
        eventName: event.eventName || event.name,
        date: new Date(event.startDate),
        time: event.time,
        location: event.locations?.[0]?.name || event.location,
        address: event.locations?.[0]?.address || event.address
      }
    }));
  }, [event, guest]);

  // Use stateful tickets that can be updated
  const [tickets, setTickets] = useState<GuestTicket[]>(initialTickets);

  // Update tickets when initial data changes
  useEffect(() => {
    setTickets(initialTickets);
  }, [initialTickets]);

  // Mock receipt
  const mockReceipt: TicketReceipt = useMemo(() => ({
    receiptNumber: `RCP-${event.id.toUpperCase()}-001`,
    purchaseDate: new Date(event.ticketDetails?.purchaseDate || Date.now()),
    tickets: [{
      type: event.ticketDetails?.type || "General Admission",
      quantity: event.ticketDetails?.quantity || 1,
      pricePerTicket: (event.ticketDetails?.totalPaid || event.ticketPrice) / (event.ticketDetails?.quantity || 1),
      subtotal: event.ticketDetails?.totalPaid || event.ticketPrice
    }],
    subtotal: event.ticketDetails?.totalPaid || event.ticketPrice,
    fees: {
      serviceFee: ((event.ticketDetails?.totalPaid || event.ticketPrice) * 0.05),
      processingFee: 2.50,
      tax: ((event.ticketDetails?.totalPaid || event.ticketPrice) * 0.08)
    },
    total: (event.ticketDetails?.totalPaid || event.ticketPrice) * 1.13 + 2.50,
    paymentMethod: {
      type: 'credit-card',
      last4: '4242',
      brand: 'Visa'
    },
    transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
    billingAddress: {
      name: guest.name,
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    }
  }), [event, guest]);

  // Mock purchase history
  const mockHistory: PurchaseHistoryType = useMemo(() => ({
    purchases: [
      {
        id: 'purchase-1',
        eventName: event.eventName || event.name,
        eventDate: new Date(event.startDate),
        purchaseDate: new Date(event.ticketDetails?.purchaseDate || Date.now()),
        ticketCount: event.ticketDetails?.quantity || 1,
        totalAmount: event.ticketDetails?.totalPaid || event.ticketPrice,
        status: 'completed',
        receiptNumber: mockReceipt.receiptNumber
      },
      {
        id: 'purchase-2',
        eventName: 'Tech Conference 2024',
        eventDate: new Date('2024-11-15'),
        purchaseDate: new Date('2024-09-20'),
        ticketCount: 1,
        totalAmount: 299,
        status: 'completed',
        receiptNumber: 'RCP-TECH2024-045'
      },
      {
        id: 'purchase-3',
        eventName: 'Music Festival Summer',
        eventDate: new Date('2024-08-22'),
        purchaseDate: new Date('2024-06-10'),
        ticketCount: 2,
        totalAmount: 370,
        status: 'completed',
        receiptNumber: 'RCP-MUSIC2024-123'
      }
    ]
  }), [event, mockReceipt]);

  const handleTransferTicket = (ticket: GuestTicket) => {
    setSelectedTicket(ticket);
    setTransferDialogOpen(true);
  };

  const handleConfirmTransfer = (ticketId: string, toEmail: string, toName: string, message: string) => {
    // Update the ticket status and add transfer record
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id === ticketId) {
          const newTransfer: TransferRecord = {
            id: `transfer-${Date.now()}`,
            fromEmail: guest.email,
            fromName: guest.name,
            toEmail,
            toName,
            timestamp: new Date(),
            status: 'pending',
            message
          };

          return {
            ...ticket,
            status: 'transferred' as const,
            transferHistory: [...(ticket.transferHistory || []), newTransfer],
            holder: {
              name: toName,
              email: toEmail
            }
          };
        }
        return ticket;
      })
    );

    toast({
      title: "Transfer Initiated",
      description: `Ticket transfer to ${toEmail} has been initiated. They will receive an email shortly.`,
      variant: "default"
    });
  };

  const handleDownloadTicket = (ticket: GuestTicket) => {
    toast({
      title: "Downloading Ticket",
      description: `Downloading ${ticket.ticketNumber}...`
    });
  };

  const handleViewTicketDetails = (ticket: GuestTicket) => {
    toast({
      title: "Ticket Details",
      description: `Viewing details for ${ticket.ticketNumber}`
    });
  };

  const handleViewReceipt = (receiptNumber?: string) => {
    setSelectedReceipt(mockReceipt);
    setReceiptModalOpen(true);
  };

  const validTickets = tickets.filter(t => t.status === 'valid');
  const transferredTickets = tickets.filter(t => t.status === 'transferred');
  const usedTickets = tickets.filter(t => t.status === 'used');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Tickets</h2>
              <p className="text-white/90">
                {validTickets.length} {validTickets.length === 1 ? 'ticket' : 'tickets'} available
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Ticket className="w-8 h-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets" className="gap-2">
            <Ticket className="w-4 h-4" />
            My Tickets ({tickets.length})
          </TabsTrigger>
          <TabsTrigger value="receipt" className="gap-2">
            <Receipt className="w-4 h-4" />
            Receipt
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          {validTickets.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Active Tickets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {validTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onTransfer={handleTransferTicket}
                    onDownload={handleDownloadTicket}
                    onViewDetails={handleViewTicketDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {transferredTickets.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Transferred Tickets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {transferredTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onTransfer={handleTransferTicket}
                    onDownload={handleDownloadTicket}
                    onViewDetails={handleViewTicketDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {usedTickets.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Used Tickets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {usedTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onTransfer={handleTransferTicket}
                    onDownload={handleDownloadTicket}
                    onViewDetails={handleViewTicketDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {tickets.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Tickets Yet</h3>
                <p className="text-muted-foreground">
                  You haven't purchased any tickets for this event yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="receipt">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Purchase Receipt
              </CardTitle>
              <CardDescription>
                View and download your purchase receipt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 space-y-4">
                <Receipt className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-semibold mb-1">Receipt #{mockReceipt.receiptNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    Purchased on {mockReceipt.purchaseDate.toLocaleDateString()}
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    ${mockReceipt.total.toFixed(2)}
                  </p>
                </div>
                <Button 
                  onClick={() => handleViewReceipt()}
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  View Full Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <PurchaseHistory 
            history={mockHistory}
            onViewReceipt={handleViewReceipt}
          />
        </TabsContent>
      </Tabs>

      <TransferTicketDialog
        open={transferDialogOpen}
        onOpenChange={setTransferDialogOpen}
        ticket={selectedTicket}
        onConfirmTransfer={handleConfirmTransfer}
      />

      <ReceiptModal
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
        receipt={selectedReceipt}
      />
    </div>
  );
};

export default EnhancedGuestTicketingView;