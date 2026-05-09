export type EventType = {
  id?: number;
  image?: string;
  title?: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  price?: string;
  attendees?: number;
  rating?: number;
  description?: string;
  fullDescription?: string;
  organizer?: string;
  tags?: string[];
  isFavorite?: boolean;
  eventType?: string;
  priceRange?: number[];
};
