import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Mail, Calendar } from "lucide-react";
import { TravelBooking } from "@/types/modules";
import { generateBookingReference, formatCurrency } from "@/utils/bookingUtils";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ConfirmationStepProps {
  bookingData: any;
  item: any;
  type: string;
  eventId: string;
  guestId: string;
  onComplete: (booking: TravelBooking) => void;
}

const ConfirmationStep = ({ bookingData, item, type, eventId, guestId, onComplete }: ConfirmationStepProps) => {
  const { toast } = useToast();
  const bookingReference = generateBookingReference(type);

  const handleComplete = () => {
    const booking: TravelBooking = {
      id: `${type}_${Date.now()}`,
      guestId,
      eventId,
      type: type as any,
      data: item,
      status: 'confirmed',
      createdAt: new Date(),
      bookedAt: new Date(),
      bookingReference,
      guestInfo: bookingData.guestInfo,
      paymentInfo: bookingData.paymentInfo,
      pricingBreakdown: bookingData.pricing,
      bookingData: bookingData.categoryData,
    };
    
    onComplete(booking);
  };

  const handleEmailConfirmation = () => {
    toast({
      title: "Email Sent!",
      description: `Confirmation email sent to ${bookingData.guestInfo?.email || 'your email'}`,
    });
  };

  const handleDownloadReceipt = () => {
    toast({
      title: "Downloading Receipt",
      description: "Your receipt is being downloaded...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground">Your reservation has been successfully processed</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Booking Reference</p>
          <p className="text-3xl font-bold font-mono tracking-wider">{bookingReference}</p>
          <Badge variant="secondary" className="mt-2">Save this reference</Badge>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Booking Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item</span>
            <span className="font-medium">{item.name || item.airline || `${item.vehicleType}`}</span>
          </div>
          
          {type === 'hotel' && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span>{format(item.checkIn, 'MMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span>{format(item.checkOut, 'MMM d, yyyy')}</span>
              </div>
            </>
          )}
          
          {type === 'flight' && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flight</span>
                <span>{item.flightNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Departure</span>
                <span>{item.departureAirportCode} - {format(item.departureTime, 'MMM d, HH:mm')}</span>
              </div>
            </>
          )}
          
          <div className="flex justify-between border-t pt-3">
            <span className="font-semibold">Total Paid</span>
            <span className="font-bold text-lg text-primary">
              {formatCurrency(bookingData.pricing?.total || 0)}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Guest Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span>{bookingData.guestInfo?.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span>{bookingData.guestInfo?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone</span>
            <span>{bookingData.guestInfo?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span>{bookingData.paymentInfo?.paymentMethod} •••• {bookingData.paymentInfo?.lastFourDigits}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button variant="outline" onClick={handleEmailConfirmation}>
          <Mail className="w-4 h-4 mr-2" />
          Email Confirmation
        </Button>
        <Button variant="outline" onClick={handleDownloadReceipt}>
          <Download className="w-4 h-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Add to Calendar
        </Button>
      </div>

      <Button onClick={handleComplete} size="lg" className="w-full">
        View in My Trips
      </Button>
    </div>
  );
};

export default ConfirmationStep;
