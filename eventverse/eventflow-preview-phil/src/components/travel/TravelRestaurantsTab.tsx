import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UtensilsCrossed, Star, MapPin, Phone, ExternalLink, BookmarkPlus } from "lucide-react";
import { TravelBooking, RestaurantBooking } from "@/types/modules";
import BookingDialog from "./booking/BookingDialog";
import { useToast } from "@/hooks/use-toast";

interface TravelRestaurantsTabProps {
  eventLocation: string;
  eventAddress: string;
  onAddBooking: (booking: TravelBooking) => void;
  eventId: string;
  guestId: string;
}

const TravelRestaurantsTab = ({ 
  eventLocation, 
  eventAddress,
  onAddBooking,
  eventId,
  guestId 
}: TravelRestaurantsTabProps) => {
  const [cuisine, setCuisine] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantBooking | null>(null);
  const { toast } = useToast();

  const mockRestaurants: RestaurantBooking[] = [
    {
      name: "The Waterfront Grill",
      cuisine: "Seafood",
      rating: 4.7,
      priceRange: "$$$",
      address: "789 Harbor Drive, " + eventLocation,
      distance: 0.4,
      phoneNumber: "(555) 123-4567",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
      reservationUrl: "https://opentable.com"
    },
    {
      name: "Bella Italia",
      cuisine: "Italian",
      rating: 4.6,
      priceRange: "$$",
      address: "456 Main Street, " + eventLocation,
      distance: 0.6,
      phoneNumber: "(555) 234-5678",
      imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400",
      reservationUrl: "https://opentable.com"
    },
    {
      name: "Sakura Sushi Bar",
      cuisine: "Japanese",
      rating: 4.8,
      priceRange: "$$$",
      address: "321 Oak Avenue, " + eventLocation,
      distance: 0.8,
      phoneNumber: "(555) 345-6789",
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
      reservationUrl: "https://opentable.com"
    },
    {
      name: "The Burger Joint",
      cuisine: "American",
      rating: 4.4,
      priceRange: "$",
      address: "654 Elm Street, " + eventLocation,
      distance: 1.0,
      phoneNumber: "(555) 456-7890",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      reservationUrl: "https://restaurant.com"
    },
    {
      name: "Le Petit Bistro",
      cuisine: "French",
      rating: 4.9,
      priceRange: "$$$$",
      address: "987 Park Lane, " + eventLocation,
      distance: 1.2,
      phoneNumber: "(555) 567-8901",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      reservationUrl: "https://opentable.com"
    },
    {
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.5,
      priceRange: "$$",
      address: "234 Curry Lane, " + eventLocation,
      distance: 1.5,
      phoneNumber: "(555) 678-9012",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      reservationUrl: "https://opentable.com"
    }
  ];

  const handleAddToBookings = (restaurant: RestaurantBooking) => {
    const booking: TravelBooking = {
      id: `restaurant_${Date.now()}`,
      guestId,
      eventId,
      type: 'restaurant',
      data: restaurant,
      status: 'pending',
      createdAt: new Date(),
      bookedAt: new Date()
    };
    onAddBooking(booking);
    toast({
      title: "Saved to My Trips",
      description: "Restaurant saved to your wishlist",
    });
  };

  const handleBookNow = (restaurant: RestaurantBooking) => {
    setSelectedRestaurant(restaurant);
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (booking: TravelBooking) => {
    onAddBooking(booking);
    toast({
      title: "Reservation Confirmed!",
      description: `Your table is reserved. Reference: ${booking.bookingReference}`,
    });
  };

  const filteredRestaurants = mockRestaurants
    .filter(restaurant => {
      const cuisineMatch = cuisine === "all" || restaurant.cuisine.toLowerCase() === cuisine;
      const priceMatch = priceRange === "all" || restaurant.priceRange === priceRange;
      return cuisineMatch && priceMatch;
    })
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Find Restaurants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Cuisine</Label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="seafood">Seafood</SelectItem>
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
                  <SelectItem value="$">$ - Budget</SelectItem>
                  <SelectItem value="$$">$$ - Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ - Upscale</SelectItem>
                  <SelectItem value="$$$$">$$$$ - Fine Dining</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Badge variant="secondary" className="h-10 px-4 text-sm">
                {filteredRestaurants.length} restaurants
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img 
                src={restaurant.imageUrl} 
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-green-500">
                {restaurant.cuisine}
              </Badge>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{restaurant.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <span className="text-lg font-bold text-green-600">{restaurant.priceRange}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{restaurant.address} • {restaurant.distance} miles</span>
                </div>
                {restaurant.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{restaurant.phoneNumber}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  size="sm"
                  onClick={() => window.open(restaurant.reservationUrl || 'tel:' + restaurant.phoneNumber, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {restaurant.reservationUrl ? 'Reserve' : 'Call'}
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToBookings(restaurant)}
                >
                  <BookmarkPlus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRestaurant && (
        <BookingDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          type="restaurant"
          item={selectedRestaurant}
          eventId={eventId}
          guestId={guestId}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default TravelRestaurantsTab;
