import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  Plane, 
  Car, 
  MapPin, 
  UtensilsCrossed, 
  Navigation, 
  BookmarkCheck,
  Search,
  Edit2
} from "lucide-react";
import TravelHotelsTab from "./TravelHotelsTab";
import TravelFlightsTab from "./TravelFlightsTab";
import TravelCarRentalsTab from "./TravelCarRentalsTab";
import TravelActivitiesTab from "./TravelActivitiesTab";
import TravelRestaurantsTab from "./TravelRestaurantsTab";
import TravelRideshareTab from "./TravelRideshareTab";
import TravelBookingsTab from "./TravelBookingsTab";
import { TravelBooking } from "@/types/modules";

interface GuestTravelViewProps {
  eventId: string;
  eventLocation: string;
  eventAddress: string;
  eventStartDate: Date;
  eventEndDate?: Date;
  guestId: string;
}

const GuestTravelView = ({ 
  eventId, 
  eventLocation, 
  eventAddress, 
  eventStartDate, 
  eventEndDate,
  guestId 
}: GuestTravelViewProps) => {
  const [activeTab, setActiveTab] = useState("hotels");
  const [guestLocation, setGuestLocation] = useState("");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [bookings, setBookings] = useState<TravelBooking[]>([]);

  // Load bookings from localStorage or initialize with mock data
  useEffect(() => {
    const savedBookings = localStorage.getItem(`travel_bookings_v4_${eventId}_${guestId}`);
    const hasInitialized = localStorage.getItem(`travel_initialized_v4_${eventId}_${guestId}`);
    
    if (savedBookings) {
      const parsedBookings = JSON.parse(savedBookings, (key, value) => {
        // Parse date strings back to Date objects
        if (key === 'checkIn' || key === 'checkOut' || key === 'departureTime' || key === 'arrivalTime' || 
            key === 'pickupDate' || key === 'dropoffDate' || key === 'pickupTime' || key === 'createdAt') {
          return new Date(value);
        }
        return value;
      });
      
      // Only use saved bookings if they're not empty
      if (parsedBookings.length > 0) {
        setBookings(parsedBookings);
        return;
      }
      // If empty, clear the initialized flag and fall through to create mock data
      localStorage.removeItem(`travel_initialized_v4_${eventId}_${guestId}`);
    }
    
    // Initialize with mock data if not already done
    if (!hasInitialized) {
      // Create realistic travel timeline with past and future bookings
      const now = new Date();
      const mockBookings: TravelBooking[] = [
        // COMPLETED: Flight Arrival (5 days ago)
        {
          id: `flight_demo_arrival_${Date.now()}`,
          guestId,
          eventId,
          type: 'flight',
          data: {
            ticketId: "DL-1234-ABC123",
            airline: "Delta Airlines",
            flightNumber: "DL1234",
            from: "New York, NY (JFK)",
            to: `${eventLocation} Airport`,
            departureAirport: "John F. Kennedy International Airport",
            departureAirportAddress: "Queens, NY 11430",
            departureAirportCode: "JFK",
            arrivalAirport: `${eventLocation} International Airport`,
            arrivalAirportAddress: `${eventLocation}, CA 90045`,
            arrivalAirportCode: "SFO",
            departureTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
            arrivalTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000),
            duration: "5h",
            stops: 0,
            price: 289,
            class: "Economy",
            bookingUrl: "https://delta.com"
          },
          status: 'completed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // COMPLETED: Airport Rideshare (5 days ago)
        {
          id: `rideshare_demo_airport_${Date.now()}`,
          guestId,
          eventId,
          type: 'rideshare',
          data: {
            service: "UberXL",
            pickupLocation: `${eventLocation} International Airport - Terminal A`,
            dropoffLocation: `Grand Plaza Hotel, 123 Main Street, ${eventLocation}`,
            pickupTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
            estimatedPrice: 35,
            vehicleType: "SUV",
            bookingUrl: "https://uber.com"
          },
          status: 'completed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // COMPLETED: Hotel Check-in (5 days ago, ongoing stay)
        {
          id: `hotel_demo_1_${Date.now()}`,
          guestId,
          eventId,
          type: 'hotel',
          data: {
            name: "Grand Plaza Hotel",
            address: `123 Main Street, ${eventLocation}`,
            rating: 4.5,
            startingPrice: 189,
            pricePerNight: 189,
            checkIn: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            checkOut: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
            roomType: "Deluxe King Room",
            roomTypes: [{
              id: "gph-deluxe",
              name: "Deluxe King Room",
              description: "Spacious room with premium bedding",
              price: 189,
              maxOccupancy: 2,
              bedConfiguration: "1 King Bed",
              squareFeet: 350,
              features: ["Free WiFi", "Mini Bar", "Coffee Maker", "Smart TV"],
              amenities: ["Air Conditioning", "Bathrobe", "Premium Toiletries"],
              available: 8,
              images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"]
            }],
            amenities: ["Free WiFi", "Breakfast", "Parking", "Pool", "Gym"],
            distance: 0.3,
            imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
            bookingUrl: "https://booking.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // COMPLETED: Car Rental Pickup (3 days ago)
        {
          id: `car_demo_1_${Date.now()}`,
          guestId,
          eventId,
          type: 'car',
          data: {
            company: "Enterprise Rent-A-Car",
            vehicleType: "Sedan",
            model: "Toyota Corolla",
            pickupLocation: `${eventLocation} International Airport - Terminal A`,
            dropoffLocation: `${eventLocation} International Airport - Terminal A`,
            pickupDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            dropoffDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
            pricePerDay: 45,
            features: ["Automatic", "AC", "Bluetooth", "Backup Camera"],
            bookingUrl: "https://enterprise.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // COMPLETED: Walking Tour (Yesterday)
        {
          id: `activity_demo_past_${Date.now()}`,
          guestId,
          eventId,
          type: 'activity',
          data: {
            name: "Historic Downtown Walking Tour",
            companyName: "City Tours & Adventures Inc.",
            address: `123 Downtown Plaza, ${eventLocation}, CA 90012`,
            category: "Sightseeing",
            description: "Explore the city's historic landmarks and hidden gems",
            rating: 4.7,
            price: 45,
            duration: "3 hours",
            distance: 0.5,
            date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
            imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
            bookingUrl: "https://viator.com"
          },
          status: 'completed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // TODAY: Lunch Reservation
        {
          id: `restaurant_demo_today_${Date.now()}`,
          guestId,
          eventId,
          type: 'restaurant',
          data: {
            name: "The Gourmet Bistro",
            cuisine: "French",
            rating: 4.7,
            priceRange: "$$$",
            address: `456 Culinary Ave, ${eventLocation}`,
            distance: 0.4,
            phoneNumber: "(555) 123-4567",
            reservationTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0, 0),
            imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
            reservationUrl: "https://opentable.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // TODAY: Event Rideshare
        {
          id: `rideshare_demo_today_${Date.now()}`,
          guestId,
          eventId,
          type: 'rideshare',
          data: {
            service: "UberX",
            pickupLocation: `Grand Plaza Hotel, 123 Main Street, ${eventLocation}`,
            dropoffLocation: eventAddress,
            pickupTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0),
            estimatedPrice: 18,
            vehicleType: "Standard",
            bookingUrl: "https://uber.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // TOMORROW: Wine Tasting Activity
        {
          id: `activity_demo_tomorrow_${Date.now()}`,
          guestId,
          eventId,
          type: 'activity',
          data: {
            name: "Sunset Wine Tasting Experience",
            companyName: "Vineyard Tours Ltd.",
            address: `789 Wine Country Road, ${eventLocation}, CA 94558`,
            category: "Food & Drink",
            description: "Sample premium local wines with stunning sunset views",
            rating: 4.9,
            price: 85,
            duration: "2.5 hours",
            distance: 8.2,
            date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
            imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
            bookingUrl: "https://viator.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // UPCOMING: Dinner Reservation (In 2 days)
        {
          id: `restaurant_demo_upcoming_${Date.now()}`,
          guestId,
          eventId,
          type: 'restaurant',
          data: {
            name: "Oceanview Fine Dining",
            cuisine: "Seafood",
            rating: 4.8,
            priceRange: "$$$$",
            address: `88 Harbor Boulevard, ${eventLocation}`,
            distance: 2.1,
            phoneNumber: "(555) 987-6543",
            reservationTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000),
            imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
            reservationUrl: "https://opentable.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // UPCOMING: Hotel Check-out (In 3 days)
        // Already covered in the hotel booking above

        // UPCOMING: Museum Activity (In 4 days)
        {
          id: `activity_demo_future_${Date.now()}`,
          guestId,
          eventId,
          type: 'activity',
          data: {
            name: "Modern Art Museum Tour",
            companyName: "Museum Tours Pro",
            address: `321 Culture Street, ${eventLocation}, CA 90015`,
            category: "Cultural",
            description: "Guided tour of contemporary masterpieces",
            rating: 4.6,
            price: 35,
            duration: "2 hours",
            distance: 1.2,
            date: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
            imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400",
            bookingUrl: "https://viator.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        },

        // UPCOMING: Car Drop-off (In 5 days)
        // Already covered in the car rental booking above

        // UPCOMING: Return Flight (In 6 days)
        {
          id: `flight_demo_return_${Date.now()}`,
          guestId,
          eventId,
          type: 'flight',
          data: {
            ticketId: "DL-5678-XYZ789",
            airline: "Delta Airlines",
            flightNumber: "DL5678",
            from: `${eventLocation} Airport`,
            to: "New York, NY (JFK)",
            departureAirport: `${eventLocation} International Airport`,
            departureAirportAddress: `${eventLocation}, CA 90045`,
            departureAirportCode: "SFO",
            arrivalAirport: "John F. Kennedy International Airport",
            arrivalAirportAddress: "Queens, NY 11430",
            arrivalAirportCode: "JFK",
            departureTime: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000),
            arrivalTime: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000),
            duration: "5h 15m",
            stops: 0,
            price: 315,
            class: "Economy",
            bookingUrl: "https://delta.com"
          },
          status: 'confirmed',
          createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          bookedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)
        }
      ];
      
      setBookings(mockBookings);
      localStorage.setItem(`travel_initialized_v4_${eventId}_${guestId}`, 'true');
    }
  }, [eventId, guestId, eventLocation, eventAddress, eventStartDate, eventEndDate]);

  // Save bookings to localStorage
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem(`travel_bookings_v4_${eventId}_${guestId}`, JSON.stringify(bookings));
    } else {
      // If all bookings are removed, clear both localStorage items to allow re-initialization
      localStorage.removeItem(`travel_bookings_v4_${eventId}_${guestId}`);
      localStorage.removeItem(`travel_initialized_v4_${eventId}_${guestId}`);
    }
  }, [bookings, eventId, guestId]);

  // Load guest location from localStorage or use default
  useEffect(() => {
    const savedLocation = localStorage.getItem(`guest_location_${guestId}`);
    setGuestLocation(savedLocation || "New York, NY");
  }, [guestId]);

  const handleLocationSave = () => {
    localStorage.setItem(`guest_location_${guestId}`, guestLocation);
    setIsEditingLocation(false);
  };

  const handleAddBooking = (booking: TravelBooking) => {
    setBookings([...bookings, booking]);
  };

  const handleRemoveBooking = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const, cancelledAt: new Date() }
        : booking
    ));
  };

  const bookingCounts = {
    hotel: bookings.filter(b => b.type === 'hotel').length,
    flight: bookings.filter(b => b.type === 'flight').length,
    car: bookings.filter(b => b.type === 'car').length,
    activity: bookings.filter(b => b.type === 'activity').length,
    restaurant: bookings.filter(b => b.type === 'restaurant').length,
    rideshare: bookings.filter(b => b.type === 'rideshare').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Plane className="w-8 h-8" />
            Travel & Accommodation
          </CardTitle>
          <CardDescription className="text-white/90 text-base">
            Plan your trip to {eventLocation} • All recommendations near event venue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Event Location</span>
              </div>
              <p className="text-sm text-white/90">{eventAddress}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-5 h-5" />
                <span className="font-semibold">Your Location</span>
              </div>
              {isEditingLocation ? (
                <div className="flex gap-2">
                  <Input 
                    value={guestLocation}
                    onChange={(e) => setGuestLocation(e.target.value)}
                    className="h-8 text-sm bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Enter your city"
                  />
                  <Button size="sm" variant="secondary" onClick={handleLocationSave} className="h-8">
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/90">{guestLocation}</p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setIsEditingLocation(true)}
                    className="h-6 w-6 p-0 hover:bg-white/20"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7 h-auto">
          <TabsTrigger value="hotels" className="flex flex-col items-center gap-1 py-3">
            <Hotel className="w-5 h-5" />
            <span className="text-xs">Hotels</span>
            {bookingCounts.hotel > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookingCounts.hotel}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="flights" className="flex flex-col items-center gap-1 py-3">
            <Plane className="w-5 h-5" />
            <span className="text-xs">Flights</span>
            {bookingCounts.flight > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookingCounts.flight}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="cars" className="flex flex-col items-center gap-1 py-3">
            <Car className="w-5 h-5" />
            <span className="text-xs">Cars</span>
            {bookingCounts.car > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookingCounts.car}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex flex-col items-center gap-1 py-3">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Activities</span>
            {bookingCounts.activity > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookingCounts.activity}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex flex-col items-center gap-1 py-3">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Dining</span>
            {bookingCounts.restaurant > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookingCounts.restaurant}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rideshare" className="flex flex-col items-center gap-1 py-3">
            <Navigation className="w-5 h-5" />
            <span className="text-xs">Rides</span>
            {bookingCounts.rideshare > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookingCounts.rideshare}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex flex-col items-center gap-1 py-3">
            <BookmarkCheck className="w-5 h-5" />
            <span className="text-xs">My Bookings</span>
            {bookings.length > 0 && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">{bookings.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hotels">
          <TravelHotelsTab 
            eventLocation={eventLocation}
            eventAddress={eventAddress}
            eventStartDate={eventStartDate}
            eventEndDate={eventEndDate}
            onAddBooking={handleAddBooking}
            eventId={eventId}
            guestId={guestId}
          />
        </TabsContent>

        <TabsContent value="flights">
          <TravelFlightsTab 
            fromLocation={guestLocation}
            toLocation={eventLocation}
            eventStartDate={eventStartDate}
            eventEndDate={eventEndDate}
            onAddBooking={handleAddBooking}
            eventId={eventId}
            guestId={guestId}
          />
        </TabsContent>

        <TabsContent value="cars">
          <TravelCarRentalsTab 
            eventLocation={eventLocation}
            eventStartDate={eventStartDate}
            eventEndDate={eventEndDate}
            onAddBooking={handleAddBooking}
            eventId={eventId}
            guestId={guestId}
          />
        </TabsContent>

        <TabsContent value="activities">
          <TravelActivitiesTab 
            eventLocation={eventLocation}
            eventAddress={eventAddress}
            onAddBooking={handleAddBooking}
            eventId={eventId}
            guestId={guestId}
          />
        </TabsContent>

        <TabsContent value="restaurants">
          <TravelRestaurantsTab 
            eventLocation={eventLocation}
            eventAddress={eventAddress}
            onAddBooking={handleAddBooking}
            eventId={eventId}
            guestId={guestId}
          />
        </TabsContent>

        <TabsContent value="rideshare">
          <TravelRideshareTab 
            eventLocation={eventLocation}
            eventAddress={eventAddress}
            eventStartDate={eventStartDate}
            onAddBooking={handleAddBooking}
            eventId={eventId}
            guestId={guestId}
          />
        </TabsContent>

        <TabsContent value="bookings">
          <TravelBookingsTab 
            bookings={bookings}
            onRemoveBooking={handleRemoveBooking}
            onCancelBooking={handleCancelBooking}
            eventId={eventId}
            guestId={guestId}
            eventStartDate={eventStartDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestTravelView;
