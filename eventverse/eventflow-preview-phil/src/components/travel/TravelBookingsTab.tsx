import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { 
  Hotel, 
  Plane, 
  Car, 
  MapPin, 
  UtensilsCrossed, 
  Navigation, 
  Trash2,
  Calendar,
  DollarSign,
  FileDown,
  Clock,
  Star,
  Phone,
  Ban,
  CheckCircle2,
  XCircle,
  Building,
  Ticket,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { TravelBooking } from "@/types/modules";
import { format, isPast, isFuture, isToday, isTomorrow, differenceInDays, startOfDay } from "date-fns";

interface TravelBookingsTabProps {
  bookings: TravelBooking[];
  onRemoveBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  eventId?: string;
  guestId?: string;
  eventStartDate: Date;
}

// Booking Card Component with expanded details
const BookingCard = ({ booking, Icon, data, getBookingColor, onRemoveBooking, onCancelBooking, canCancel }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Calculate totals and extras
  const hotelNights = booking.type === 'hotel' 
    ? Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
  const hotelTotal = booking.type === 'hotel' ? data.pricePerNight * hotelNights : 0;
  
  const carDays = booking.type === 'car'
    ? Math.ceil((data.dropoffDate.getTime() - data.pickupDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const carTotal = booking.type === 'car' ? data.pricePerDay * carDays : 0;

  // Get summary info for each booking type
  const getSummaryInfo = () => {
    switch (booking.type) {
      case 'hotel':
        return `${format(new Date(data.checkIn), "MMM d")} • ${hotelNights} ${hotelNights === 1 ? 'night' : 'nights'} • $${hotelTotal}`;
      case 'flight':
        return `${format(new Date(data.departureTime), "MMM d, HH:mm")} • ${data.departureAirport.split(',')[0]} → ${data.arrivalAirport.split(',')[0]} • $${data.price}`;
      case 'car':
        return `${format(new Date(data.pickupDate), "MMM d")} • ${carDays} ${carDays === 1 ? 'day' : 'days'} • ${data.model} • $${carTotal}`;
      case 'activity':
        return `${data.date ? format(new Date(data.date), "MMM d, HH:mm") : 'Date TBD'} • ${data.duration} • $${data.price}/person`;
      case 'restaurant':
        return `${data.reservationTime ? format(new Date(data.reservationTime), "MMM d, HH:mm") : 'Time TBD'} • ${data.partySize} ${data.partySize === 1 ? 'guest' : 'guests'} • ${data.cuisine}`;
      case 'rideshare':
        return `${format(new Date(data.pickupTime), "MMM d, HH:mm")} • ${data.vehicleType} • ~$${data.estimatedPrice}`;
      default:
        return '';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Clickable Summary Section */}
        <div 
          className="flex items-start justify-between mb-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4 flex-1">
            <div className={`w-12 h-12 bg-gradient-to-br ${getBookingColor(booking.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">
                  {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                </Badge>
                {booking.status === 'cancelled' && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Cancelled
                  </Badge>
                )}
                {booking.status === 'confirmed' && (
                  <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                    <CheckCircle2 className="w-3 h-3" />
                    Confirmed
                  </Badge>
                )}
                {booking.status === 'completed' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold truncate">
                {data.name || data.airline || data.service || data.company || 'Booking'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getSummaryInfo()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </div>
          <div className="flex gap-2 ml-2" onClick={(e) => e.stopPropagation()}>
            {canCancel && booking.status !== 'cancelled' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCancelDialog(true)}
                className="text-orange-600 hover:text-orange-700 border-orange-300 hover:bg-orange-50"
              >
                <Ban className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onRemoveBooking(booking.id)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Expanded Details Section */}
        {isExpanded && (
          <>
            <Separator className="my-4" />

        {/* HOTEL Details */}
        {booking.type === 'hotel' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Check-in
                </p>
                <p className="font-medium">{format(new Date(data.checkIn), "MMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Check-out
                </p>
                <p className="font-medium">{format(new Date(data.checkOut), "MMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Nights</p>
                <p className="font-medium">{hotelNights} {hotelNights === 1 ? 'night' : 'nights'}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Room Type</p>
                <p className="font-medium">{data.roomType}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  Rating
                </p>
                <p className="font-medium">{data.rating} stars</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Distance
                </p>
                <p className="font-medium">{data.distance} miles</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Price per Night</p>
                <p className="font-medium">${data.pricePerNight}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Total Cost
                </p>
                <p className="font-bold text-lg text-primary">
                  ${hotelTotal} <span className="text-sm text-muted-foreground font-normal">({hotelNights} × ${data.pricePerNight})</span>
                </p>
              </div>
            </div>
            
            {data.amenities && data.amenities.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {data.amenities.map((amenity: string, idx: number) => (
                    <Badge key={idx} variant="secondary">{amenity}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FLIGHT Details */}
        {booking.type === 'flight' && (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Ticket className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Ticket ID</p>
              </div>
              <p className="font-mono font-semibold">{data.ticketId}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Airline</p>
                <p className="font-medium">{data.airline}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Flight Number</p>
                <p className="font-medium">{data.flightNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Class</p>
                <p className="font-medium">{data.class}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Departure Airport
                </p>
                <p className="font-medium">{data.departureAirport}</p>
                <p className="text-xs text-muted-foreground mt-1">{data.departureAirportAddress}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Arrival Airport
                </p>
                <p className="font-medium">{data.arrivalAirport}</p>
                <p className="text-xs text-muted-foreground mt-1">{data.arrivalAirportAddress}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Duration
                </p>
                <p className="font-medium">{data.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Stops</p>
                <p className="font-medium">{data.stops === 0 ? 'Direct' : `${data.stops} stop${data.stops > 1 ? 's' : ''}`}</p>
              </div>
              <div></div>
              <div>
                <p className="text-muted-foreground mb-1">Departure</p>
                <p className="font-medium">{format(new Date(data.departureTime), "MMM d, yyyy HH:mm")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Arrival</p>
                <p className="font-medium">{format(new Date(data.arrivalTime), "MMM d, yyyy HH:mm")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Total Price
                </p>
                <p className="font-bold text-lg text-primary">${data.price}</p>
              </div>
            </div>
          </div>
        )}

        {/* CAR RENTAL Details */}
        {booking.type === 'car' && (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Building className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Rental Company</p>
              </div>
              <p className="font-semibold">{data.company}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Vehicle</p>
                <p className="font-medium">{data.model}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Type</p>
                <p className="font-medium">{data.vehicleType}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Price per Day</p>
                <p className="font-medium">${data.pricePerDay}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Pickup Location
                </p>
                <p className="font-medium">{data.pickupLocation}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Dropoff Location
                </p>
                <p className="font-medium">{data.dropoffLocation}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Pickup Date</p>
                <p className="font-medium">{format(new Date(data.pickupDate), "MMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Dropoff Date</p>
                <p className="font-medium">{format(new Date(data.dropoffDate), "MMM d, yyyy")}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Days</p>
                <p className="font-medium">{carDays} {carDays === 1 ? 'day' : 'days'}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Total Cost
                </p>
                <p className="font-bold text-lg text-primary">
                  ${carTotal} <span className="text-sm text-muted-foreground font-normal">({carDays} × ${data.pricePerDay})</span>
                </p>
              </div>
            </div>
            
            {data.features && data.features.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {data.features.map((feature: string, idx: number) => (
                    <Badge key={idx} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTIVITY Details */}
        {booking.type === 'activity' && (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Building className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Operated by</p>
              </div>
              <p className="font-semibold">{data.companyName}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Category</p>
                <p className="font-medium">{data.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Duration
                </p>
                <p className="font-medium">{data.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  Rating
                </p>
                <p className="font-medium">{data.rating} stars</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Distance from Venue
                </p>
                <p className="font-medium">{data.distance} miles</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Price
                </p>
                <p className="font-bold text-lg text-primary">${data.price}/person</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Activity Address
                </p>
                <p className="font-medium">{data.address}</p>
              </div>
            </div>
            
            {data.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{data.description}</p>
              </div>
            )}
          </div>
        )}

        {/* RESTAURANT Details */}
        {booking.type === 'restaurant' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Cuisine</p>
                <p className="font-medium">{data.cuisine}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Price Range</p>
                <p className="font-medium">{data.priceRange}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  Rating
                </p>
                <p className="font-medium">{data.rating} stars</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Distance
                </p>
                <p className="font-medium">{data.distance} miles</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="font-medium">{data.phoneNumber}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground mb-1">Full Address</p>
                <p className="font-medium">{data.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* RIDESHARE Details */}
        {booking.type === 'rideshare' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Service</p>
                <p className="font-medium">{data.service}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Vehicle Type</p>
                <p className="font-medium">{data.vehicleType}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Pickup Time
                </p>
                <p className="font-medium">{format(new Date(data.pickupTime), "MMM d, HH:mm")}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground mb-1">Pickup Location</p>
                <p className="font-medium">{data.pickupLocation}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground mb-1">Dropoff Location</p>
                <p className="font-medium">{data.dropoffLocation}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Estimate
                </p>
                <p className="font-bold text-lg text-primary">${data.estimatedPrice}</p>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </CardContent>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onCancelBooking(booking.id);
                setShowCancelDialog(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

const TravelBookingsTab = ({ bookings, onRemoveBooking, onCancelBooking, eventId, guestId, eventStartDate }: TravelBookingsTabProps) => {
  // Filter out cancelled bookings - we don't show them
  const activeBookings = bookings.filter(b => b.status !== 'cancelled');

  // Get the relevant date for each booking type
  const getBookingDate = (booking: TravelBooking): Date => {
    const data = booking.data as any;
    switch (booking.type) {
      case 'hotel':
        return new Date(data.checkIn);
      case 'flight':
        return new Date(data.departureTime);
      case 'car':
        return new Date(data.pickupDate);
      case 'activity':
        return new Date(data.date || eventStartDate);
      case 'restaurant':
        return new Date(data.reservationTime || eventStartDate);
      case 'rideshare':
        return new Date(data.pickupTime || eventStartDate);
      default:
        return eventStartDate;
    }
  };

  // Group bookings by date
  const groupBookingsByDate = () => {
    const grouped: { [key: string]: TravelBooking[] } = {};
    
    activeBookings.forEach(booking => {
      const date = getBookingDate(booking);
      const dateKey = format(startOfDay(date), 'yyyy-MM-dd');
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(booking);
    });

    // Sort dates chronologically
    return Object.entries(grouped).sort((a, b) => 
      new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
  };

  const groupedByDate = groupBookingsByDate();

  // Get relative date label
  const getRelativeDateLabel = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const days = differenceInDays(date, now);

    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (days > 0 && days <= 7) return `In ${days} days`;
    if (days < 0 && days >= -7) return `${Math.abs(days)} days ago`;
    if (days < 0) return "Completed";
    return "Upcoming";
  };
  const handleClearDemoBookings = () => {
    if (eventId && guestId) {
      const demoBookings = bookings.filter(b => b.id.includes('_demo_'));
      demoBookings.forEach(booking => onRemoveBooking(booking.id));
      localStorage.removeItem(`travel_initialized_v4_${eventId}_${guestId}`);
    }
  };
  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'hotel': return Hotel;
      case 'flight': return Plane;
      case 'car': return Car;
      case 'activity': return MapPin;
      case 'restaurant': return UtensilsCrossed;
      case 'rideshare': return Navigation;
      default: return MapPin;
    }
  };

  const getBookingColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'from-blue-500 to-blue-600';
      case 'flight': return 'from-sky-500 to-blue-600';
      case 'car': return 'from-orange-500 to-red-600';
      case 'activity': return 'from-purple-500 to-purple-600';
      case 'restaurant': return 'from-green-500 to-green-600';
      case 'rideshare': return 'from-indigo-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const calculateTotalCost = () => {
    return bookings.reduce((total, booking) => {
      const data = booking.data as any;
      if (booking.type === 'hotel') {
        const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24));
        return total + (data.pricePerNight * nights);
      }
      if (booking.type === 'car') {
        const days = Math.ceil((data.dropoffDate.getTime() - data.pickupDate.getTime()) / (1000 * 60 * 60 * 24));
        return total + (data.pricePerDay * days);
      }
      if (booking.type === 'flight') return total + data.price;
      if (booking.type === 'activity') return total + data.price;
      if (booking.type === 'rideshare') return total + data.estimatedPrice;
      return total;
    }, 0);
  };

  const handleExportBookings = () => {
    const bookingText = bookings.map(booking => {
      const data = booking.data as any;
      return `${booking.type.toUpperCase()}: ${data.name || data.airline || data.service} - $${
        booking.type === 'hotel' ? data.pricePerNight :
        booking.type === 'car' ? data.pricePerDay :
        booking.type === 'flight' ? data.price :
        booking.type === 'activity' ? data.price :
        booking.type === 'rideshare' ? data.estimatedPrice :
        0
      }`;
    }).join('\n');
    
    const blob = new Blob([bookingText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'travel-bookings.txt';
    a.click();
  };

  if (activeBookings.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Active Bookings</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Start planning your trip by exploring hotels, flights, activities, and more. Your saved bookings will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-xl">Your Trip Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-white/80 mb-1">Total Bookings</p>
              <p className="text-3xl font-bold">{activeBookings.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-white/80 mb-1">Estimated Cost</p>
              <p className="text-3xl font-bold">${calculateTotalCost()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-white/80 mb-1">Hotels</p>
              <p className="text-3xl font-bold">{activeBookings.filter(b => b.type === 'hotel').length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-white/80 mb-1">Activities</p>
              <p className="text-3xl font-bold">{activeBookings.filter(b => b.type === 'activity').length}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleExportBookings}
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export Bookings
            </Button>
            {bookings.some(b => b.id.includes('_demo_')) && (
              <Button 
                variant="outline" 
                className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
                onClick={handleClearDemoBookings}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Demo Data
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline View - Grouped by Date */}
      <div className="space-y-8">
        {groupedByDate.map(([dateKey, dateBookings]) => {
          const date = new Date(dateKey);
          const isPastDate = isPast(date) && !isToday(date);
          const relativeLabel = getRelativeDateLabel(dateKey);
          
          return (
            <div key={dateKey} className={`relative ${isPastDate ? 'opacity-60' : ''}`}>
              {/* Date Header with Timeline Marker */}
              <div className="flex items-center gap-4 mb-4 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    isPastDate ? 'bg-muted-foreground/50' : 'bg-primary'
                  }`} />
                  <div>
                    <h3 className="text-xl font-bold">
                      {format(date, "EEEE, MMMM d, yyyy")}
                    </h3>
                    <p className={`text-sm ${
                      isPastDate ? 'text-muted-foreground' : 'text-primary font-medium'
                    }`}>
                      {relativeLabel}
                    </p>
                  </div>
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Bookings for this date */}
              <div className="space-y-4 pl-7">
                {dateBookings.map((booking) => {
                  const Icon = getBookingIcon(booking.type);
                  const data = booking.data as any;
                  const canCancel = !isPastDate;
                  
                  return (
                    <BookingCard 
                      key={booking.id} 
                      booking={booking} 
                      Icon={Icon} 
                      data={data} 
                      getBookingColor={getBookingColor}
                      onRemoveBooking={onRemoveBooking}
                      onCancelBooking={onCancelBooking}
                      canCancel={canCancel}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TravelBookingsTab;
