export interface Guest {
  id: string;
  name: string;
  email: string;
  relationToHost: string;
  rsvpStatus: 'confirmed' | 'pending' | 'declined';
  tableNumber: number;
  seatNumber: number;
  dietaryRestrictions: string[];
  interests: string[];
  mutualConnections: number;
  avatar?: string;
}

export interface GuestInfo {
  name: string;
  email: string;
}

export interface TableGuest {
  id: string;
  name: string;
  avatar?: string;
  relationToHost: string;
  dietaryRestrictions: string[];
}

export interface GuestDiscoveryFilter {
  value: string;
  label: string;
  count: number;
}

export interface GuestInteraction {
  type: 'connect' | 'message';
  guestId: string;
  timestamp: Date;
}