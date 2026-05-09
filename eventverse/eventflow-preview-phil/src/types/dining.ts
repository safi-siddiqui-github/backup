export interface Meal {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  date: Date;
  location: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  ingredients: string[];
  allergens: string[];
  dietary: ('vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-free')[];
  calories?: number;
  price?: number;
}

export interface RestaurantRecommendation {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  distance: string;
  address: string;
  phone?: string;
  hours?: string;
}

export interface Reservation {
  id: string;
  restaurant: string;
  date: Date;
  time: string;
  partySize: number;
  confirmationNumber: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}
