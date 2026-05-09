import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Hotel, Star, MapPin, Wifi, Coffee, Car as CarIcon, ExternalLink, BookmarkPlus, Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import { TravelBooking, HotelBooking } from "@/types/modules";
import { format, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import BookingDialog from "./booking/BookingDialog";
import { useToast } from "@/hooks/use-toast";

interface TravelHotelsTabProps {
  eventLocation: string;
  eventAddress: string;
  eventStartDate: Date;
  eventEndDate?: Date;
  onAddBooking: (booking: TravelBooking) => void;
  eventId: string;
  guestId: string;
}

const TravelHotelsTab = ({ 
  eventLocation, 
  eventAddress, 
  eventStartDate, 
  eventEndDate,
  onAddBooking,
  eventId,
  guestId 
}: TravelHotelsTabProps) => {
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [hotelChain, setHotelChain] = useState("all");
  const [checkInDate, setCheckInDate] = useState<Date>(addDays(eventStartDate, -1));
  const [checkOutDate, setCheckOutDate] = useState<Date>(addDays(eventEndDate || eventStartDate, 1));
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelBooking | null>(null);
  const { toast } = useToast();

  const resetToEventDates = () => {
    setCheckInDate(addDays(eventStartDate, -1));
    setCheckOutDate(addDays(eventEndDate || eventStartDate, 1));
  };

  const isEventDate = (date: Date) => {
    const endDate = eventEndDate || eventStartDate;
    return date >= eventStartDate && date <= endDate;
  };

  // Mock hotel data with hotel chains and room types
  const mockHotels: (HotelBooking & { chain: string })[] = [
    {
      name: "Grand Plaza Hotel",
      chain: "Marriott",
      address: "123 Main Street, " + eventLocation,
      rating: 4.5,
      startingPrice: 159,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amenities: ["Free WiFi", "Breakfast", "Parking", "Pool", "Gym", "Business Center"],
      distance: 0.3,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      bookingUrl: "https://booking.com",
      roomTypes: [
        {
          id: "gph-standard",
          name: "Standard Queen Room",
          description: "Comfortable room with modern amenities and city views",
          price: 159,
          maxOccupancy: 2,
          bedConfiguration: "1 Queen Bed",
          squareFeet: 300,
          features: ["Free WiFi", "Mini Fridge", "Coffee Maker", "Work Desk", "Smart TV"],
          amenities: ["Air Conditioning", "Iron & Board", "Hair Dryer"],
          available: 5,
          images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"]
        },
        {
          id: "gph-deluxe",
          name: "Deluxe King Room",
          description: "Spacious room with premium bedding and enhanced amenities",
          price: 189,
          maxOccupancy: 2,
          bedConfiguration: "1 King Bed",
          squareFeet: 350,
          features: ["Free WiFi", "Mini Bar", "Coffee Maker", "Work Desk", "Smart TV", "City View"],
          amenities: ["Air Conditioning", "Bathrobe", "Premium Toiletries", "Iron & Board"],
          available: 8,
          images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"]
        },
        {
          id: "gph-suite",
          name: "Executive Suite",
          description: "Luxury suite with separate living area and stunning views",
          price: 299,
          maxOccupancy: 4,
          bedConfiguration: "1 King Bed + Sofa Bed",
          squareFeet: 550,
          features: ["Free WiFi", "Full Kitchen", "Dining Area", "Living Room", "Smart TV", "Balcony"],
          amenities: ["Air Conditioning", "Washer/Dryer", "Premium Toiletries", "Bathrobe"],
          available: 2,
          images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"]
        }
      ]
    },
    {
      name: "Comfort Inn & Suites",
      chain: "IHG",
      address: "456 Oak Avenue, " + eventLocation,
      rating: 4.2,
      startingPrice: 99,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amenities: ["Free WiFi", "Breakfast", "Parking", "Fitness Center"],
      distance: 0.8,
      imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400",
      bookingUrl: "https://booking.com",
      roomTypes: [
        {
          id: "ci-standard",
          name: "Standard Double",
          description: "Cozy room perfect for budget-conscious travelers",
          price: 99,
          maxOccupancy: 2,
          bedConfiguration: "2 Double Beds",
          squareFeet: 280,
          features: ["Free WiFi", "Mini Fridge", "Microwave", "Cable TV"],
          amenities: ["Air Conditioning", "Hair Dryer"],
          available: 10,
          images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400"]
        },
        {
          id: "ci-queen",
          name: "Queen Room",
          description: "Comfortable room with quality amenities",
          price: 129,
          maxOccupancy: 2,
          bedConfiguration: "1 Queen Bed",
          squareFeet: 300,
          features: ["Free WiFi", "Mini Fridge", "Microwave", "Coffee Maker", "Cable TV"],
          amenities: ["Air Conditioning", "Iron & Board", "Hair Dryer"],
          available: 7,
          images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"]
        }
      ]
    },
    {
      name: "Luxury Resort & Spa",
      chain: "Hilton",
      address: "789 Beach Road, " + eventLocation,
      rating: 4.8,
      startingPrice: 249,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amenities: ["Free WiFi", "Breakfast", "Valet Parking", "Spa", "Pool", "Beach Access", "Fine Dining"],
      distance: 1.2,
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      bookingUrl: "https://booking.com",
      roomTypes: [
        {
          id: "lr-deluxe",
          name: "Deluxe Resort View",
          description: "Elegant room overlooking resort grounds",
          price: 249,
          maxOccupancy: 2,
          bedConfiguration: "1 King Bed",
          squareFeet: 400,
          features: ["Free WiFi", "Premium Bedding", "Smart TV", "Balcony", "Mini Bar"],
          amenities: ["Air Conditioning", "Bathrobe", "Luxury Toiletries", "Turn-down Service"],
          available: 6,
          images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"]
        },
        {
          id: "lr-ocean",
          name: "Ocean View Suite",
          description: "Breathtaking ocean views with premium amenities",
          price: 349,
          maxOccupancy: 3,
          bedConfiguration: "1 King Bed + Daybed",
          squareFeet: 500,
          features: ["Free WiFi", "Ocean View", "Premium Bedding", "Smart TV", "Private Balcony", "Mini Bar"],
          amenities: ["Air Conditioning", "Bathrobe", "Luxury Toiletries", "Turn-down Service", "Welcome Amenity"],
          available: 4,
          images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"]
        },
        {
          id: "lr-presidential",
          name: "Presidential Suite",
          description: "Ultimate luxury with panoramic ocean views",
          price: 599,
          maxOccupancy: 6,
          bedConfiguration: "2 King Beds + Living Area",
          squareFeet: 1200,
          features: ["Free WiFi", "Ocean View", "Full Kitchen", "Dining Room", "Living Room", "2 Bathrooms", "Private Terrace"],
          amenities: ["Air Conditioning", "Bathrobe", "Luxury Toiletries", "Turn-down Service", "Butler Service", "Welcome Champagne"],
          available: 1,
          images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"]
        }
      ]
    },
    {
      name: "Budget Stay Inn",
      chain: "Independent",
      address: "321 South Street, " + eventLocation,
      rating: 3.8,
      startingPrice: 69,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amenities: ["Free WiFi", "Parking"],
      distance: 1.5,
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400",
      bookingUrl: "https://booking.com",
      roomTypes: [
        {
          id: "bs-economy",
          name: "Economy Room",
          description: "Simple, clean room with basic amenities",
          price: 69,
          maxOccupancy: 1,
          bedConfiguration: "1 Double Bed",
          squareFeet: 200,
          features: ["Free WiFi", "Cable TV"],
          amenities: ["Air Conditioning"],
          available: 8,
          images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"]
        },
        {
          id: "bs-standard",
          name: "Standard Room",
          description: "Comfortable room at an affordable price",
          price: 79,
          maxOccupancy: 2,
          bedConfiguration: "1 Queen Bed",
          squareFeet: 250,
          features: ["Free WiFi", "Mini Fridge", "Cable TV"],
          amenities: ["Air Conditioning", "Hair Dryer"],
          available: 12,
          images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400"]
        }
      ]
    },
    {
      name: "Hyatt Place Downtown",
      chain: "Hyatt",
      address: "555 Center Plaza, " + eventLocation,
      rating: 4.4,
      startingPrice: 149,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      amenities: ["Free WiFi", "Breakfast", "Parking", "Gym", "24/7 Market"],
      distance: 0.5,
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      bookingUrl: "https://booking.com",
      roomTypes: [
        {
          id: "hp-king",
          name: "King Room",
          description: "Modern room with separated spaces for sleeping and working",
          price: 149,
          maxOccupancy: 2,
          bedConfiguration: "1 King Bed",
          squareFeet: 325,
          features: ["Free WiFi", "Cozy Corner Sofa", "Work Desk", "Smart TV", "Coffee Maker"],
          amenities: ["Air Conditioning", "Iron & Board", "Hair Dryer"],
          available: 9,
          images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400"]
        },
        {
          id: "hp-double",
          name: "Double Queen Room",
          description: "Spacious room perfect for families or groups",
          price: 169,
          maxOccupancy: 4,
          bedConfiguration: "2 Queen Beds",
          squareFeet: 350,
          features: ["Free WiFi", "Cozy Corner Sofa", "Work Desk", "Smart TV", "Coffee Maker", "Mini Fridge"],
          amenities: ["Air Conditioning", "Iron & Board", "Hair Dryer"],
          available: 6,
          images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"]
        }
      ]
    }
  ];

  const handleAddToBookings = (hotel: HotelBooking) => {
    const booking: TravelBooking = {
      id: `hotel_${Date.now()}`,
      guestId,
      eventId,
      type: 'hotel',
      data: hotel,
      status: 'pending',
      createdAt: new Date(),
      bookedAt: new Date()
    };
    onAddBooking(booking);
    toast({
      title: "Saved to My Trips",
      description: "Hotel saved to your wishlist",
    });
  };

  const handleBookNow = (hotel: HotelBooking) => {
    setSelectedHotel(hotel);
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (booking: TravelBooking) => {
    onAddBooking(booking);
    toast({
      title: "Booking Confirmed!",
      description: `Your hotel reservation is confirmed. Reference: ${booking.bookingReference}`,
    });
  };

  const filteredHotels = mockHotels
    .filter(hotel => {
      if (priceRange === "budget") return hotel.startingPrice < 100;
      if (priceRange === "moderate") return hotel.startingPrice >= 100 && hotel.startingPrice < 200;
      if (priceRange === "luxury") return hotel.startingPrice >= 200;
      return true;
    })
    .filter(hotel => {
      if (hotelChain === "all") return true;
      return hotel.chain === hotelChain;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.startingPrice - b.startingPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.distance - b.distance;
    });

  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

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
            <Badge variant="secondary">{nights} night{nights > 1 ? 's' : ''} selected</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Hotels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(checkInDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={(date) => date && setCheckInDate(date)}
                    modifiers={{ eventDate: isEventDate }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(checkOutDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={(date) => date && setCheckOutDate(date)}
                    disabled={(date) => date < checkInDate}
                    modifiers={{ eventDate: isEventDate }}
                    modifiersClassNames={{ eventDate: "bg-purple-100 border-2 border-purple-500 font-bold" }}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Hotel Chain</Label>
              <Select value={hotelChain} onValueChange={setHotelChain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  <SelectItem value="Marriott">Marriott</SelectItem>
                  <SelectItem value="Hilton">Hilton</SelectItem>
                  <SelectItem value="Hyatt">Hyatt</SelectItem>
                  <SelectItem value="IHG">IHG</SelectItem>
                  <SelectItem value="Independent">Independent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget (&lt;$100)</SelectItem>
                  <SelectItem value="moderate">Moderate ($100-$200)</SelectItem>
                  <SelectItem value="luxury">Luxury ($200+)</SelectItem>
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
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
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
              {filteredHotels.length} hotels found
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Hotels List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredHotels.map((hotel, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative h-48 md:h-full">
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.startingPrice < 100 && (
                  <Badge className="absolute top-2 left-2 bg-green-500">Best Value</Badge>
                )}
                <Badge className="absolute top-2 right-2 bg-background/90 text-foreground">
                  {hotel.roomTypes.length} Room Types
                </Badge>
              </div>
              <div className="md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {hotel.distance} miles from venue
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {hotel.rating} rating
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{hotel.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-3xl font-bold text-primary">${hotel.startingPrice}</p>
                      <p className="text-sm text-muted-foreground">per night</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Hotel Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 6).map((amenity, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{hotel.amenities.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    <p>Check-in: {format(hotel.checkIn, "MMM d, yyyy")}</p>
                    <p>Check-out: {format(hotel.checkOut, "MMM d, yyyy")}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBookNow(hotel)}
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleAddToBookings(hotel)}
                    >
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedHotel && (
        <BookingDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          type="hotel"
          item={selectedHotel}
          eventId={eventId}
          guestId={guestId}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default TravelHotelsTab;
