import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Clock, MapPin, ExternalLink, BookmarkPlus, Calendar as CalendarIcon, RefreshCw, ArrowRight } from "lucide-react";
import { TravelBooking, FlightBooking } from "@/types/modules";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { getAirportsNearLocation } from "@/data/airports";
import BookingDialog from "./booking/BookingDialog";
import { useToast } from "@/hooks/use-toast";

interface TravelFlightsTabProps {
  fromLocation: string;
  toLocation: string;
  eventStartDate: Date;
  eventEndDate?: Date;
  onAddBooking: (booking: TravelBooking) => void;
  eventId: string;
  guestId: string;
}

const TravelFlightsTab = ({ 
  fromLocation, 
  toLocation, 
  eventStartDate, 
  eventEndDate,
  onAddBooking,
  eventId,
  guestId 
}: TravelFlightsTabProps) => {
  const [flightClass, setFlightClass] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [airline, setAirline] = useState("all");
  const [departureDate, setDepartureDate] = useState<Date>(addDays(eventStartDate, -2));
  const [returnDate, setReturnDate] = useState<Date | undefined>(addDays(eventEndDate || eventStartDate, 1));
  const [departureAirport, setDepartureAirport] = useState("all");
  const [arrivalAirport, setArrivalAirport] = useState("all");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightBooking | null>(null);
  const { toast } = useToast();

  // Get airports within 70 miles
  const departureAirports = getAirportsNearLocation(fromLocation, 70);
  const arrivalAirports = getAirportsNearLocation(toLocation, 70);

  const isEventDate = (date: Date) => {
    const endDate = eventEndDate || eventStartDate;
    return date >= eventStartDate && date <= endDate;
  };

  const resetToEventDates = () => {
    setDepartureDate(addDays(eventStartDate, -2));
    setReturnDate(addDays(eventEndDate || eventStartDate, 1));
  };

  // Mock flight data with multiple airport variations
  const generateFlightsForAirports = (): FlightBooking[] => {
    const flights: FlightBooking[] = [];
    const airlines = [
      { name: "Delta Airlines", code: "DL", priceMultiplier: 1.0 },
      { name: "United Airlines", code: "UA", priceMultiplier: 0.9 },
      { name: "American Airlines", code: "AA", priceMultiplier: 1.1 },
    ];

    const commonLayoverAirports = [
      "Dallas/Fort Worth International Airport (DFW)",
      "Chicago O'Hare International Airport (ORD)",
      "Denver International Airport (DEN)",
      "Atlanta Hartsfield-Jackson Airport (ATL)",
      "Phoenix Sky Harbor Airport (PHX)",
      "Charlotte Douglas Airport (CLT)"
    ];

    departureAirports.forEach((depAirport, depIdx) => {
      arrivalAirports.forEach((arrAirport, arrIdx) => {
        airlines.forEach((airline, airlineIdx) => {
          const basePrice = 250 + (depAirport.distanceFromLocation * 2) + (arrAirport.distanceFromLocation * 2);
          const timeOffset = (depIdx * 2 + arrIdx + airlineIdx * 3) % 12;
          const stops = airlineIdx % 2;
          const stopLocations = stops > 0 
            ? [commonLayoverAirports[(depIdx + arrIdx + airlineIdx) % commonLayoverAirports.length]]
            : undefined;
          
          flights.push({
            ticketId: `${airline.code}-${depAirport.code}${arrAirport.code}-${Date.now().toString().slice(-4)}`,
            airline: airline.name,
            flightNumber: `${airline.code}${1000 + depIdx * 100 + arrIdx * 10 + airlineIdx}`,
            from: fromLocation,
            to: toLocation,
            departureAirport: depAirport.name,
            departureAirportAddress: depAirport.address,
            departureAirportCode: depAirport.code,
            arrivalAirport: arrAirport.name,
            arrivalAirportAddress: arrAirport.address,
            arrivalAirportCode: arrAirport.code,
            departureTime: new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate(), 6 + timeOffset, 30),
            arrivalTime: new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate(), 11 + timeOffset, 30),
            duration: "5h",
            stops,
            stopLocations,
            price: Math.round(basePrice * airline.priceMultiplier),
            class: "Economy",
            bookingUrl: `https://${airline.name.toLowerCase().split(' ')[0]}.com`
          });
        });
      });
    });

    return flights;
  };

  const mockFlights = generateFlightsForAirports();

  const handleAddToBookings = (flight: FlightBooking) => {
    const booking: TravelBooking = {
      id: `flight_${Date.now()}`,
      guestId,
      eventId,
      type: 'flight',
      data: flight,
      status: 'pending',
      createdAt: new Date(),
      bookedAt: new Date()
    };
    onAddBooking(booking);
    toast({
      title: "Saved to My Trips",
      description: "Flight saved to your wishlist",
    });
  };

  const handleBookNow = (flight: FlightBooking) => {
    setSelectedFlight(flight);
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (booking: TravelBooking) => {
    onAddBooking(booking);
    toast({
      title: "Booking Confirmed!",
      description: `Your flight is confirmed. Reference: ${booking.bookingReference}`,
    });
  };

  const filteredFlights = mockFlights.filter(flight => {
    if (airline !== "all" && !flight.airline.includes(airline)) return false;
    if (departureAirport !== "all" && flight.departureAirportCode !== departureAirport) return false;
    if (arrivalAirport !== "all" && flight.arrivalAirportCode !== arrivalAirport) return false;
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "duration") {
      const durationA = parseInt(a.duration);
      const durationB = parseInt(b.duration);
      return durationA - durationB;
    }
    return a.departureTime.getTime() - b.departureTime.getTime();
  });

  return (
    <div className="space-y-6">
      {/* Event Date Info */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
        <CardContent className="py-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-semibold">Event: {format(eventStartDate, "MMM d, yyyy")}{eventEndDate && ` - ${format(eventEndDate, "MMM d, yyyy")}`}</span>
          </div>
        </CardContent>
      </Card>

      {/* Trip Info */}
      <Card className="bg-gradient-to-r from-blue-500 to-sky-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">From</p>
              <p className="text-xl font-semibold">{fromLocation}</p>
            </div>
            <Plane className="w-8 h-8" />
            <div className="text-right">
              <p className="text-sm text-white/80 mb-1">To</p>
              <p className="text-xl font-semibold">{toLocation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filter Flights</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Plane className="w-3 h-3 mr-1" />
              Airports within 70 miles
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(departureDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => date && setDepartureDate(date)}
                    modifiers={{ eventDate: isEventDate }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Return Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => date < departureDate}
                    modifiers={{ eventDate: isEventDate }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Departure Airport</Label>
              <Select value={departureAirport} onValueChange={setDepartureAirport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Airports</SelectItem>
                  {departureAirports.map(airport => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name.replace(/Airport|International/g, '').trim()} ({airport.distanceFromLocation} mi)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Arrival Airport</Label>
              <Select value={arrivalAirport} onValueChange={setArrivalAirport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Airports</SelectItem>
                  {arrivalAirports.map(airport => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name.replace(/Airport|International/g, '').trim()} ({airport.distanceFromLocation} mi)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Airline</Label>
              <Select value={airline} onValueChange={setAirline}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Airlines</SelectItem>
                  <SelectItem value="Delta">Delta</SelectItem>
                  <SelectItem value="United">United</SelectItem>
                  <SelectItem value="American">American</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end h-full">
                <Button variant="outline" onClick={resetToEventDates} className="h-10">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Event Dates
                </Button>
              </div>
            </div>
            <Badge variant="secondary" className="h-10 px-4 text-sm">
              {sortedFlights.length} flights found
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Flights List */}
      <div className="space-y-4">
        {sortedFlights.map((flight, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{flight.airline}</h3>
                    <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">${flight.price}</p>
                  <p className="text-sm text-muted-foreground">{flight.class}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="font-mono font-bold">{flight.departureAirportCode}</Badge>
                  </div>
                  <p className="text-2xl font-semibold">{format(flight.departureTime, "HH:mm")}</p>
                  <p className="text-sm text-muted-foreground">{format(flight.departureTime, "MMM d")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{flight.departureAirport.split(' ').slice(0, 3).join(' ')}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{flight.duration}</span>
                  </div>
                  <div className="w-full h-0.5 bg-gray-300 relative">
                    <ArrowRight className="w-4 h-4 absolute -top-2 left-1/2 -translate-x-1/2 text-gray-400" />
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <Badge variant="outline" className="font-mono font-bold">{flight.arrivalAirportCode}</Badge>
                  </div>
                  <p className="text-2xl font-semibold">{format(flight.arrivalTime, "HH:mm")}</p>
                  <p className="text-sm text-muted-foreground">{format(flight.arrivalTime, "MMM d")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{flight.arrivalAirport.split(' ').slice(0, 3).join(' ')}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  onClick={() => handleBookNow(flight)}
                >
                  Book Flight
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleAddToBookings(flight)}
                >
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFlight && (
        <BookingDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          type="flight"
          item={selectedFlight}
          eventId={eventId}
          guestId={guestId}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default TravelFlightsTab;
