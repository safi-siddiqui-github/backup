import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UtensilsCrossed, Clock, MapPin, Star, Navigation } from "lucide-react";
import { Meal, MenuItem, RestaurantRecommendation, Reservation } from "@/types/dining";

interface GuestDiningViewProps {
  event: any;
}

const GuestDiningView = ({ event }: GuestDiningViewProps) => {
  const [dietaryPreferences] = useState(['Vegan', 'Gluten-free']);

  const mockMeals: Meal[] = useMemo(() => [
    {
      id: '1',
      name: 'Continental Breakfast',
      category: 'breakfast',
      time: '8:00 AM - 10:00 AM',
      date: new Date(),
      location: 'Grand Ballroom',
      menu: [
        { id: '1', name: 'Avocado Toast', description: 'Whole grain bread with fresh avocado, tomatoes, and seeds', ingredients: ['Avocado', 'Whole Grain Bread', 'Tomatoes', 'Seeds'], allergens: ['Gluten'], dietary: ['vegan'], calories: 320 },
        { id: '2', name: 'Fresh Fruit Bowl', description: 'Seasonal fruits with mint', ingredients: ['Mixed Berries', 'Melon', 'Pineapple', 'Mint'], allergens: [], dietary: ['vegan', 'gluten-free'], calories: 150 },
      ]
    },
    {
      id: '2',
      name: 'Conference Lunch',
      category: 'lunch',
      time: '12:30 PM - 2:00 PM',
      date: new Date(),
      location: 'Grand Ballroom',
      menu: [
        { id: '3', name: 'Quinoa Buddha Bowl', description: 'Quinoa with roasted vegetables, chickpeas, and tahini dressing', ingredients: ['Quinoa', 'Bell Peppers', 'Chickpeas', 'Tahini', 'Spinach'], allergens: ['Sesame'], dietary: ['vegan', 'gluten-free'], calories: 480 },
        { id: '4', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herb butter and seasonal vegetables', ingredients: ['Salmon', 'Lemon', 'Herbs', 'Vegetables', 'Butter'], allergens: ['Fish', 'Dairy'], dietary: ['gluten-free'], calories: 420 },
      ]
    },
    {
      id: '3',
      name: 'Gala Dinner',
      category: 'dinner',
      time: '7:00 PM - 9:00 PM',
      date: new Date(),
      location: 'Grand Ballroom',
      menu: [
        { id: '5', name: 'Stuffed Portobello', description: 'Portobello mushrooms with quinoa, sun-dried tomatoes, and herbs', ingredients: ['Portobello', 'Quinoa', 'Sun-dried Tomatoes', 'Herbs'], allergens: [], dietary: ['vegan', 'gluten-free'], calories: 380 },
        { id: '6', name: 'Beef Tenderloin', description: 'Prime beef with red wine reduction and truffle mashed potatoes', ingredients: ['Beef', 'Red Wine', 'Truffle', 'Potatoes', 'Cream'], allergens: ['Dairy'], dietary: [], calories: 680 },
      ]
    },
  ], []);

  const mockRestaurants: RestaurantRecommendation[] = useMemo(() => [
    { id: '1', name: 'The Garden Bistro', cuisine: 'Mediterranean', rating: 4.8, priceRange: '$$', distance: '0.3 miles', address: '123 Main St', phone: '(555) 123-4567', hours: '11:00 AM - 10:00 PM' },
    { id: '2', name: 'Sushi Haven', cuisine: 'Japanese', rating: 4.7, priceRange: '$$$', distance: '0.5 miles', address: '456 Oak Ave', phone: '(555) 234-5678', hours: '12:00 PM - 11:00 PM' },
    { id: '3', name: 'Veggie Delight', cuisine: 'Vegan', rating: 4.9, priceRange: '$$', distance: '0.2 miles', address: '789 Pine St', phone: '(555) 345-6789', hours: '10:00 AM - 9:00 PM' },
    { id: '4', name: 'Steakhouse Prime', cuisine: 'American', rating: 4.6, priceRange: '$$$$', distance: '0.7 miles', address: '321 Elm St', phone: '(555) 456-7890', hours: '5:00 PM - 11:00 PM' },
  ], []);

  const mockReservations: Reservation[] = useMemo(() => [
    { id: '1', restaurant: 'The Garden Bistro', date: new Date(Date.now() + 86400000), time: '7:30 PM', partySize: 4, confirmationNumber: 'RES-12345', status: 'confirmed' },
    { id: '2', restaurant: 'Veggie Delight', date: new Date(Date.now() + 172800000), time: '6:00 PM', partySize: 2, confirmationNumber: 'RES-67890', status: 'confirmed' },
  ], []);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-orange-600" />
            Food & Dining
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            View meal schedules, menus, and nearby restaurant recommendations
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Your Dietary Preferences:</span>
              {dietaryPreferences.map((pref) => (
                <Badge key={pref} variant="secondary" className="bg-green-100 text-green-700">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Meal Schedule</TabsTrigger>
          <TabsTrigger value="menus">Today's Menu</TabsTrigger>
          <TabsTrigger value="restaurants">Nearby Restaurants</TabsTrigger>
          <TabsTrigger value="reservations">My Reservations</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          {mockMeals.map((meal) => (
            <Card key={meal.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                    {meal.name}
                  </span>
                  <Badge>{meal.category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {meal.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {meal.location}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{meal.menu.length} menu items available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="menus" className="space-y-6">
          {mockMeals.map((meal) => (
            <div key={meal.id} className="space-y-4">
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <div className="grid gap-4">
                {meal.menu.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <span className="text-sm text-muted-foreground">{item.calories} cal</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.dietary.map((diet) => (
                          <Badge key={diet} variant="secondary" className="text-xs bg-green-100 text-green-700">
                            {diet}
                          </Badge>
                        ))}
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="outline" className="text-xs border-orange-300 text-orange-700">
                            Contains: {allergen}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ingredients: {item.ingredients.join(', ')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="restaurants" className="space-y-4">
          {mockRestaurants.map((restaurant) => (
            <Card key={restaurant.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <p className="flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    {restaurant.distance} from venue
                  </p>
                  <p>{restaurant.address}</p>
                  <p>{restaurant.phone}</p>
                  <p className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {restaurant.hours}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button size="sm" variant="outline">Make Reservation</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reservations" className="space-y-4">
          {mockReservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{reservation.restaurant}</h3>
                    <p className="text-sm text-muted-foreground">Party of {reservation.partySize}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">{reservation.status}</Badge>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {reservation.date.toLocaleDateString()} at {reservation.time}
                  </p>
                  <p className="text-muted-foreground">Confirmation: {reservation.confirmationNumber}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Modify</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestDiningView;
