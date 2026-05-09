import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, ExternalLink, BookmarkPlus } from "lucide-react";
import { TravelBooking, ActivityBooking } from "@/types/modules";
import BookingDialog from "./booking/BookingDialog";
import { useToast } from "@/hooks/use-toast";

interface TravelActivitiesTabProps {
  eventLocation: string;
  eventAddress: string;
  onAddBooking: (booking: TravelBooking) => void;
  eventId: string;
  guestId: string;
}

const TravelActivitiesTab = ({ 
  eventLocation, 
  eventAddress,
  onAddBooking,
  eventId,
  guestId 
}: TravelActivitiesTabProps) => {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("distance");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityBooking | null>(null);
  const { toast } = useToast();

  const mockActivities: ActivityBooking[] = [
    {
      name: "City Walking Tour",
      companyName: "City Tours & Adventures",
      address: `123 Downtown Plaza, ${eventLocation}`,
      category: "Tours",
      description: "Explore the historic downtown area with a knowledgeable local guide. See famous landmarks and hidden gems.",
      rating: 4.8,
      price: 35,
      duration: "2 hours",
      distance: 0.5,
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
      bookingUrl: "https://viator.com"
    },
    {
      name: "Local Art Museum",
      companyName: "City Museum Foundation",
      address: `456 Museum Way, ${eventLocation}`,
      category: "Cultural",
      description: "World-class art collection featuring contemporary and classical works from renowned artists.",
      rating: 4.6,
      price: 25,
      duration: "3 hours",
      distance: 1.2,
      imageUrl: "https://images.unsplash.com/photo-1566127444303-0a146e0b2e94?w=400",
      bookingUrl: "https://museum.com"
    },
    {
      name: "Harbor Cruise",
      companyName: "Bay Cruises Co.",
      address: `789 Harbor Drive, ${eventLocation}`,
      category: "Outdoor",
      description: "Scenic boat tour of the harbor with stunning views of the city skyline and waterfront.",
      rating: 4.7,
      price: 45,
      duration: "1.5 hours",
      distance: 2.0,
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      bookingUrl: "https://cruises.com"
    },
    {
      name: "Wine Tasting Experience",
      companyName: "Valley Vineyards",
      address: `1234 Wine Country Rd, ${eventLocation}`,
      category: "Entertainment",
      description: "Sample premium local wines at a nearby vineyard with expert sommelier guidance.",
      rating: 4.9,
      price: 65,
      duration: "2.5 hours",
      distance: 8.5,
      imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
      bookingUrl: "https://winery.com"
    },
    {
      name: "Adventure Park",
      companyName: "Extreme Adventures Inc.",
      address: `567 Park Lane, ${eventLocation}`,
      category: "Outdoor",
      description: "Zip-lining, rope courses, and outdoor activities for thrill-seekers of all skill levels.",
      rating: 4.5,
      price: 55,
      duration: "3 hours",
      distance: 5.0,
      imageUrl: "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=400",
      bookingUrl: "https://adventurepark.com"
    }
  ];

  const handleAddToBookings = (activity: ActivityBooking) => {
    const booking: TravelBooking = {
      id: `activity_${Date.now()}`,
      guestId,
      eventId,
      type: 'activity',
      data: activity,
      status: 'pending',
      createdAt: new Date(),
      bookedAt: new Date()
    };
    onAddBooking(booking);
    toast({
      title: "Saved to My Trips",
      description: "Activity saved to your wishlist",
    });
  };

  const handleBookNow = (activity: ActivityBooking) => {
    setSelectedActivity(activity);
    setBookingDialogOpen(true);
  };

  const handleBookingComplete = (booking: TravelBooking) => {
    onAddBooking(booking);
    toast({
      title: "Booking Confirmed!",
      description: `Your activity is confirmed. Reference: ${booking.bookingReference}`,
    });
  };

  const filteredActivities = mockActivities
    .filter(activity => category === "all" || activity.category.toLowerCase() === category)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.distance - b.distance;
    });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discover Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tours">Tours</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Badge variant="secondary" className="h-10 px-4 text-sm">
                {filteredActivities.length} activities
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredActivities.map((activity, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img 
                src={activity.imageUrl} 
                alt={activity.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-purple-500">
                {activity.category}
              </Badge>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{activity.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {activity.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activity.duration}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {activity.distance} miles
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-2xl font-bold text-primary">${activity.price}</p>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  size="sm"
                  onClick={() => window.open(activity.bookingUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Book
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToBookings(activity)}
                >
                  <BookmarkPlus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedActivity && (
        <BookingDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          type="activity"
          item={selectedActivity}
          eventId={eventId}
          guestId={guestId}
          onComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default TravelActivitiesTab;
