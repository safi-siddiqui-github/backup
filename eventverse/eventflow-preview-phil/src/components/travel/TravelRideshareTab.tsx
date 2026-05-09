import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation, Clock, DollarSign, Users, ExternalLink, BookmarkPlus, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { TravelBooking, RideshareBooking } from "@/types/modules";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import BookingDialog from "./booking/BookingDialog";
import { useToast } from "@/hooks/use-toast";

interface TravelRideshareTabProps {
  eventLocation: string;
  eventAddress: string;
  eventStartDate: Date;
  onAddBooking: (booking: TravelBooking) => void;
  eventId: string;
  guestId: string;
}

const TravelRideshareTab = ({ 
  eventLocation, 
  eventAddress, 
  eventStartDate,
  onAddBooking,
  eventId,
  guestId 
}: TravelRideshareTabProps) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [rideDate, setRideDate] = useState<Date>(eventStartDate);
  const [pickupTime, setPickupTime] = useState("18:00");
  const [service, setService] = useState("all");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<RideshareBooking | null>(null);
  const { toast } = useToast();

  const isEventDay = isSameDay(rideDate, eventStartDate);

  const mockRideOptions: RideshareBooking[] = [
    {
      service: "UberX",
      pickupLocation: pickupLocation || "Your Location",
      dropoffLocation: eventAddress,
      pickupTime: new Date(rideDate.getFullYear(), rideDate.getMonth(), rideDate.getDate(), parseInt(pickupTime.split(':')[0]), parseInt(pickupTime.split(':')[1])),
      estimatedPrice: 18,
      vehicleType: "Economy",
      bookingUrl: "https://uber.com"
    },
    {
      service: "UberXL",
      pickupLocation: pickupLocation || "Your Location",
      dropoffLocation: eventAddress,
      pickupTime: new Date(rideDate.getFullYear(), rideDate.getMonth(), rideDate.getDate(), parseInt(pickupTime.split(':')[0]), parseInt(pickupTime.split(':')[1])),
      estimatedPrice: 28,
      vehicleType: "SUV (up to 6 passengers)",
      bookingUrl: "https://uber.com"
    },
    {
      service: "Uber Comfort",
      pickupLocation: pickupLocation || "Your Location",
      dropoffLocation: eventAddress,
      pickupTime: new Date(rideDate.getFullYear(), rideDate.getMonth(), rideDate.getDate(), parseInt(pickupTime.split(':')[0]), parseInt(pickupTime.split(':')[1])),
      estimatedPrice: 24,
      vehicleType: "Newer, spacious cars",
      bookingUrl: "https://uber.com"
    },
    {
      service: "Lyft",
      pickupLocation: pickupLocation || "Your Location",
      dropoffLocation: eventAddress,
      pickupTime: new Date(rideDate.getFullYear(), rideDate.getMonth(), rideDate.getDate(), parseInt(pickupTime.split(':')[0]), parseInt(pickupTime.split(':')[1])),
      estimatedPrice: 17,
      vehicleType: "Standard",
      bookingUrl: "https://lyft.com"
    },
    {
      service: "Lyft XL",
      pickupLocation: pickupLocation || "Your Location",
      dropoffLocation: eventAddress,
      pickupTime: new Date(rideDate.getFullYear(), rideDate.getMonth(), rideDate.getDate(), parseInt(pickupTime.split(':')[0]), parseInt(pickupTime.split(':')[1])),
      estimatedPrice: 27,
      vehicleType: "SUV (up to 6 passengers)",
      bookingUrl: "https://lyft.com"
    }
  ];

  const handleAddToBookings = (ride: RideshareBooking) => {
    const booking: TravelBooking = {
      id: `rideshare_${Date.now()}`,
      guestId,
      eventId,
      type: 'rideshare',
      data: ride,
      status: 'pending',
      createdAt: new Date(),
      bookedAt: new Date()
    };
    onAddBooking(booking);
    toast({
      title: "Saved to My Trips",
      description: "Ride saved to your wishlist",
    });
  };

  const handleBookNow = (ride: RideshareBooking) => {
    setSelectedRide(ride);
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (booking: TravelBooking) => {
    onAddBooking(booking);
    toast({
      title: "Ride Scheduled!",
      description: `Your ride is confirmed. Reference: ${booking.bookingReference}`,
    });
  };

  const filteredRides = service === "all" 
    ? mockRideOptions 
    : mockRideOptions.filter(ride => ride.service.toLowerCase().includes(service));

  return (
    <div className="space-y-6">
      {/* Trip Details */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Schedule Your Ride
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ride-date">Ride Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(rideDate, "MMM d, yyyy")}
                    {isEventDay && <Badge variant="secondary" className="ml-2">Event Day</Badge>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={rideDate}
                    onSelect={(date) => date && setRideDate(date)}
                    modifiers={{ eventDate: (date) => isSameDay(date, eventStartDate) }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Input 
                id="pickup"
                placeholder="Enter pickup address"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Pickup Time</Label>
              <Input 
                id="time"
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-sm font-medium mb-1">Destination</p>
            <p className="text-sm text-muted-foreground">{eventAddress}</p>
          </div>
        </CardContent>
      </Card>

      {/* Service Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label>Service</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="uber">Uber</SelectItem>
                <SelectItem value="lyft">Lyft</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="ml-auto">
              {filteredRides.length} options
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Ride Options */}
      <div className="space-y-4">
        {filteredRides.map((ride, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${
                    ride.service.includes('Uber') ? 'bg-gradient-to-br from-black to-gray-800' : 'bg-gradient-to-br from-pink-500 to-purple-500'
                  } rounded-lg flex items-center justify-center`}>
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{ride.service}</h3>
                    <p className="text-sm text-muted-foreground">{ride.vehicleType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">${ride.estimatedPrice}</p>
                  <p className="text-sm text-muted-foreground">Estimated fare</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pickup</p>
                  <p className="font-medium text-sm">{ride.pickupLocation}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(ride.pickupTime, "MMM d, yyyy • h:mm a")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dropoff</p>
                  <p className="font-medium text-sm">{ride.dropoffLocation}</p>
                  <p className="text-xs text-muted-foreground mt-1">Event venue</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  onClick={() => handleBookNow(ride)}
                >
                  Schedule Ride
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleAddToBookings(ride)}
                >
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Schedule your ride 30 minutes before the event start time to ensure you arrive on time.
          </p>
        </CardContent>
      </Card>

      {selectedRide && (
        <BookingDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          type="rideshare"
          item={selectedRide}
          eventId={eventId}
          guestId={guestId}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default TravelRideshareTab;
