import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Plane, ExternalLink, BookmarkPlus, Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import { TravelBooking, CarRentalBooking } from "@/types/modules";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { getAirportsNearLocation } from "@/data/airports";
import BookingDialog from "./booking/BookingDialog";
import { useToast } from "@/hooks/use-toast";

interface TravelCarRentalsTabProps {
  eventLocation: string;
  eventStartDate: Date;
  eventEndDate?: Date;
  onAddBooking: (booking: TravelBooking) => void;
  eventId: string;
  guestId: string;
}

const TravelCarRentalsTab = ({ 
  eventLocation, 
  eventStartDate, 
  eventEndDate,
  onAddBooking,
  eventId,
  guestId 
}: TravelCarRentalsTabProps) => {
  const [vehicleType, setVehicleType] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [company, setCompany] = useState("all");
  const [selectedAirport, setSelectedAirport] = useState("all");
  const [pickupDate, setPickupDate] = useState<Date>(addDays(eventStartDate, -1));
  const [dropoffDate, setDropoffDate] = useState<Date>(addDays(eventEndDate || eventStartDate, 1));
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarRentalBooking | null>(null);
  const { toast } = useToast();

  // Get airports within 70 miles
  const nearbyAirports = getAirportsNearLocation(eventLocation, 70);

  const isEventDate = (date: Date) => {
    const endDate = eventEndDate || eventStartDate;
    return date >= eventStartDate && date <= endDate;
  };

  const resetToEventDates = () => {
    setPickupDate(addDays(eventStartDate, -1));
    setDropoffDate(addDays(eventEndDate || eventStartDate, 1));
  };

  // Generate cars for all nearby airports
  const generateCarsForAirports = (): CarRentalBooking[] => {
    const cars: CarRentalBooking[] = [];
    const companies = [
      { name: "Enterprise", types: ["Economy", "Compact SUV"], priceMultiplier: 1.0 },
      { name: "Hertz", types: ["Mid-size", "Full-size SUV"], priceMultiplier: 1.1 },
      { name: "Budget", types: ["Economy", "Full-size"], priceMultiplier: 0.9 },
      { name: "Avis", types: ["Luxury", "Premium SUV"], priceMultiplier: 1.5 },
      { name: "National", types: ["Mid-size", "Compact SUV"], priceMultiplier: 1.05 },
    ];

    const models: Record<string, string[]> = {
      "Economy": ["Toyota Corolla", "Honda Civic", "Hyundai Elantra"],
      "Mid-size": ["Toyota Camry", "Honda Accord", "Nissan Altima"],
      "Full-size": ["Chevrolet Malibu", "Ford Fusion", "Nissan Maxima"],
      "Compact SUV": ["Honda CR-V", "Toyota RAV4", "Mazda CX-5"],
      "Full-size SUV": ["Chevrolet Tahoe", "Ford Explorer", "Toyota Highlander"],
      "Luxury": ["BMW 5 Series", "Mercedes E-Class", "Audi A6"],
      "Premium SUV": ["BMW X5", "Mercedes GLE", "Audi Q7"],
    };

    nearbyAirports.forEach((airport) => {
      companies.forEach((company) => {
        company.types.forEach((type) => {
          const basePrice = type.includes("Luxury") || type.includes("Premium") ? 100 : 
                           type.includes("SUV") ? 60 : 40;
          const adjustedPrice = Math.round((basePrice + airport.distanceFromLocation * 0.5) * company.priceMultiplier);
          const model = models[type][Math.floor(Math.random() * models[type].length)];

          cars.push({
            company: company.name,
            vehicleType: type,
            model: `${model} or similar`,
            pickupLocation: `${airport.name} (${airport.code})`,
            dropoffLocation: `${airport.name} (${airport.code})`,
            pickupDate: pickupDate,
            dropoffDate: dropoffDate,
            pricePerDay: adjustedPrice,
            features: type.includes("Luxury") || type.includes("Premium") 
              ? ["Automatic", "A/C", "GPS", "Leather", "Premium Audio"]
              : ["Automatic", "A/C", type.includes("SUV") ? "5 Seats" : "4 Seats"],
            bookingUrl: `https://${company.name.toLowerCase()}.com`
          });
        });
      });
    });

    return cars;
  };

  const mockCars = generateCarsForAirports();

  const handleAddToBookings = (car: CarRentalBooking) => {
    const booking: TravelBooking = {
      id: `car_${Date.now()}`,
      guestId,
      eventId,
      type: 'car',
      data: car,
      status: 'pending',
      createdAt: new Date(),
      bookedAt: new Date()
    };
    onAddBooking(booking);
    toast({
      title: "Saved to My Trips",
      description: "Car rental saved to your wishlist",
    });
  };

  const handleBookNow = (car: CarRentalBooking) => {
    setSelectedCar(car);
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (booking: TravelBooking) => {
    onAddBooking(booking);
    toast({
      title: "Booking Confirmed!",
      description: `Your car rental is confirmed. Reference: ${booking.bookingReference}`,
    });
  };

  const filteredCars = mockCars
    .filter(car => {
      if (selectedAirport !== "all" && !car.pickupLocation.includes(selectedAirport)) return false;
      if (vehicleType !== "all" && car.vehicleType !== vehicleType) return false;
      if (company !== "all" && car.company !== company) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.pricePerDay - b.pricePerDay;
      return a.company.localeCompare(b.company);
    });

  const rentalDays = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Event Date Info */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-semibold">Event: {format(eventStartDate, "MMM d, yyyy")}{eventEndDate && ` - ${format(eventEndDate, "MMM d, yyyy")}`}</span>
            </div>
            <Badge variant="secondary">{rentalDays} day{rentalDays > 1 ? 's' : ''} rental</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Search Rental Cars</CardTitle>
            <Badge variant="secondary" className="text-xs">
              <Plane className="w-3 h-3 mr-1" />
              Airport Rentals Only
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Airport Location</Label>
              <Select value={selectedAirport} onValueChange={setSelectedAirport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Airports</SelectItem>
                  {nearbyAirports.map(airport => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.code} - {airport.name.replace(/Airport|International/g, '').trim()} ({airport.distanceFromLocation} mi)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(pickupDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date) => date && setPickupDate(date)}
                    modifiers={{ eventDate: isEventDate }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Dropoff Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dropoffDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={(date) => date && setDropoffDate(date)}
                    disabled={(date) => date < pickupDate}
                    modifiers={{ eventDate: isEventDate }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Rental Company</Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Hertz">Hertz</SelectItem>
                  <SelectItem value="Budget">Budget</SelectItem>
                  <SelectItem value="Avis">Avis</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Mid-size">Mid-size</SelectItem>
                  <SelectItem value="Full-size">Full-size</SelectItem>
                  <SelectItem value="Compact SUV">Compact SUV</SelectItem>
                  <SelectItem value="Full-size SUV">Full-size SUV</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="Premium SUV">Premium SUV</SelectItem>
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
                    <SelectItem value="company">Company</SelectItem>
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
              {filteredCars.length} cars • {rentalDays} days
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Cars List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCars.map((car, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{car.model}</h3>
                    <p className="text-sm text-muted-foreground">{car.company}</p>
                    <Badge variant="outline" className="mt-2">{car.vehicleType}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">${car.pricePerDay}</p>
                  <p className="text-sm text-muted-foreground">per day</p>
                  <p className="text-sm font-medium mt-1">
                    ${car.pricePerDay * rentalDays} total ({rentalDays} days)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pick-up</p>
                  <p className="font-medium">{car.pickupLocation}</p>
                  <p className="text-sm text-muted-foreground">{format(car.pickupDate, "MMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Drop-off</p>
                  <p className="font-medium">{car.dropoffLocation}</p>
                  <p className="text-sm text-muted-foreground">{format(car.dropoffDate, "MMM d, yyyy")}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  onClick={() => handleBookNow(car)}
                >
                  Reserve Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleAddToBookings(car)}
                >
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCar && (
        <BookingDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          type="car"
          item={selectedCar}
          eventId={eventId}
          guestId={guestId}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default TravelCarRentalsTab;
