import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, 
  QrCode, 
  ArrowRightLeft, 
  Download,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { GuestTicket } from "@/types/ticketing";
import { format } from "date-fns";

interface TicketCardProps {
  ticket: GuestTicket;
  onTransfer: (ticket: GuestTicket) => void;
  onDownload: (ticket: GuestTicket) => void;
  onViewDetails: (ticket: GuestTicket) => void;
}

const TicketCard = ({ ticket, onTransfer, onDownload, onViewDetails }: TicketCardProps) => {
  const getStatusBadge = () => {
    switch (ticket.status) {
      case 'valid':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" /> Valid</Badge>;
      case 'used':
        return <Badge className="bg-blue-500 text-white"><CheckCircle className="w-3 h-3 mr-1" /> Used</Badge>;
      case 'transferred':
        return <Badge className="bg-orange-500 text-white"><ArrowRightLeft className="w-3 h-3 mr-1" /> Transferred</Badge>;
      case 'refunded':
        return <Badge className="bg-red-500 text-white"><XCircle className="w-3 h-3 mr-1" /> Refunded</Badge>;
      default:
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  const canTransfer = ticket.status === 'valid' && new Date(ticket.eventDetails.date) > new Date();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-purple-600 rounded-lg p-3">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{ticket.type}</h3>
              <p className="text-sm text-muted-foreground">{ticket.ticketNumber}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white p-3 rounded-lg">
              <QrCode className="w-16 h-16 text-primary" />
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            QR Code: {ticket.qrCode}
          </p>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(ticket.eventDetails.date, "EEEE, MMMM d, yyyy")} at {ticket.eventDetails.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{ticket.eventDetails.location}</span>
          </div>
          {ticket.seatAssignment && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ticket className="w-4 h-4" />
              <span>
                {ticket.seatAssignment.section && `${ticket.seatAssignment.section} - `}
                {ticket.seatAssignment.table && `Table ${ticket.seatAssignment.table}, `}
                {ticket.seatAssignment.seat && `Seat ${ticket.seatAssignment.seat}`}
              </span>
            </div>
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Purchased</span>
            <span className="font-semibold">{format(ticket.purchaseDate, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground">Price</span>
            <span className="font-semibold text-green-600">${ticket.price.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(ticket)}
            >
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDownload(ticket)}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
          
          {canTransfer && (
            <Button 
              className="w-full mt-2 bg-gradient-to-r from-primary to-purple-600"
              size="sm"
              onClick={() => onTransfer(ticket)}
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Transfer Ticket
            </Button>
          )}
        </div>

        {ticket.transferHistory && ticket.transferHistory.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Transfer History</p>
            <div className="space-y-1">
              {ticket.transferHistory.slice(-2).map((transfer) => (
                <div key={transfer.id} className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3" />
                  <span>
                    {transfer.fromName} → {transfer.toName || transfer.toEmail}
                  </span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {transfer.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
