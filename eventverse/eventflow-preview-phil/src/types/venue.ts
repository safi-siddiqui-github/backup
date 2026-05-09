export interface VenueRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  currentOccupancy: number;
  roomType: 'main' | 'bar' | 'lounge' | 'garden' | 'private';
  upcomingActivities: string[];
  hasBar: boolean;
  hasPhotoBooth: boolean;
  isAccessible: boolean;
}

export interface VenueFeature {
  id: string;
  name: string;
  type: 'bar' | 'restroom' | 'exit' | 'stage' | 'photo_booth' | 'gift_table';
  x: number;
  y: number;
}

export interface TableLayout {
  number: number;
  x: number;
  y: number;
  guests: number;
}

export interface EventSchedule {
  id: string;
  activity: string;
  time: string;
  location: string;
  description?: string;
}

// Seating module types
export interface Table {
  id: number;
  name: string;
  seats: number;
  shape: "round" | "rectangular" | "long-rectangular";
  x: number;
  y: number;
  guests: Guest[];
  targetGroup?: string;
  scale?: number;
  rotation?: number;
  seatAssignments?: Record<number, Guest>;
  notes?: string;
}

export interface Chair {
  id: number;
  name: string;
  x: number;
  y: number;
  rotation?: number;
  layoutType?: "single" | "grid";
  rows?: number;
  columns?: number;
  targetGroup?: string;
  notes?: string;
  guest?: Guest;
  gridId?: string;
}

export interface Seat {
  id: number;
  tableId: number;
  seatNumber: number;
  guest?: Guest;
  x?: number;
  y?: number;
  sectionId: string;
  row: number | string;
  status: 'available' | 'occupied' | 'reserved' | 'assigned' | 'blocked' | string;
  priceTier?: 'VIP' | 'Premium' | 'General' | 'Budget';
  isAccessible?: boolean;
}

export interface SeatSection {
  id: string;
  name: string;
  rows: number;
  seatsPerRow: number;
  startX: number;
  startY: number;
  rotation?: number;
  priceTier?: "VIP" | "Premium" | "General" | "Budget";
  color?: string;
}

// Booth type definition
export interface BoothType {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  dimensions: {
    width: number;
    height: number;
  };
  maxAvailable: number;
  capacity?: number; // Maximum number of people allowed in the booth
  features?: string[];
  icon: string;
}

// Vendor booth/tent settings for an event
export interface VendorBoothSettings {
  allowVendorBooths: boolean;
  boothTypes: BoothType[];
  maxBoothsPerVendor: number;
  paymentRequired: boolean;
  additionalTerms?: string;
  setupInstructions?: string;
  invitedVendors?: Array<{
    email: string;
    name?: string;
    businessName?: string;
  }>;
}

// Vendor booth assignment in seating arrangement
export interface VendorBoothAssignment {
  invitationId: string;
  vendorId?: string;
  vendorEmail: string;
  vendorBusinessName: string;
  boothTypeId: string;
  boothTypeName: string;
  contactEmail: string;
  contactPhone?: string;
}

// Vendor invitation
export interface VendorInvitation {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  
  vendorEmail: string;
  vendorName: string;
  vendorBusinessName?: string;
  
  message?: string;
  invitedAt: Date | string;
  
  availableBooths: BoothType[];
  maxQuantity: number;
  
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  respondedAt?: Date | string;
  declineReason?: string;
  
  selectedBooths?: Array<{
    boothTypeId: string;
    quantity: number;
    subtotal: number;
  }>;
  totalAmount?: number;
  currency?: string;
  
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  paymentTransactionId?: string;
  paidAt?: Date | string;
  
  termsAccepted: boolean;
  termsAcceptedAt?: Date | string;
  
  boothAssignments?: Array<{
    arrangementId: string;
    sectionId: string;
    venueObjectId: number;
    boothTypeId: string;
  }>;
}

export interface VenueObject {
  id: number;
  name: string;
  type: "stage" | "podium" | "exit" | "dancefloor" | "tent" | "booth" | "plant" | "pillar" | "fountain" | "lounge";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
  assignedVendor?: VendorBoothAssignment;
  boothTypeId?: string;
}

export interface VenueObjectType {
  type: VenueObject["type"];
  name: string;
  icon: any;
  defaultSize: { width: number; height: number };
  color: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  group?: string;
  dietary?: string;
  phone?: string;
  status?: 'pending' | 'attending' | 'declined' | 'maybe';
  plusOnes?: number;
  dietaryRestrictions?: string;
  notes?: string;
  avatar?: string;
  initials?: string;
  avatarColor?: string;
  // Vendor-specific fields
  isVendor?: boolean;
  vendorId?: string;
  boothAssignment?: VendorInvitation['boothAssignments'];
}

// Layout and preset types
export interface LayoutData {
  tables: Table[];
  chairs: Chair[];
  venueObjects: VenueObject[];
  seats: Seat[];
  dimensions?: { width: number; height: number };
  walls?: any[];
  rooms?: any[];
  elements?: any[];
  paths?: any[];
}

export interface VenuePreset {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  capacity: number;
  layout?: LayoutData;
  thumbnail?: string;
  thumbnailUrl?: string;
  vendorId?: string;
  isPublic: boolean;
  tags: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  tables?: Table[];
  chairs?: Chair[];
  seats?: Seat[];
  seatSections?: any[];
  venueObjects?: VenueObject[];
  layoutData?: LayoutData;
  venueType?: 'seat-based' | 'table-based' | string;
  vendorBusinessName?: string;
  version?: string | number;
  isActive?: boolean;
  pricingInfo?: {
    basePrice?: number;
    currency?: string;
    priceRange?: string;
    pricePerGuest?: number;
    includes?: string[];
    excludes?: string[];
  };
}

export interface PresetCategory {
  id: string;
  name: string;
  description: string;
}

export interface VendorProfile {
  id: string;
  name: string;
  description: string;
  website?: string;
  presets: VenuePreset[];
  location?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  subcategories?: string[];
  contact?: any;
  portfolio?: any;
  services?: any;
  priceRange?: string;
  availability?: any;
  verified?: boolean;
  responseTime?: string;
  completedEvents?: number;
  certifications?: string[];
  insurance?: any;
  specialties?: string[];
  yearEstablished?: number;
  teamSize?: number;
  awards?: string[];
}

export interface VendorPresetUsage {
  id?: string;
  presetId: string;
  eventId: string;
  usedAt?: Date | string;
  customizations?: any;
  hostId?: string;
  usageType?: string;
  status?: string;
  bookedAt?: Date | string;
  modifications?: any;
}

// Venue hierarchy types
export interface VenueHierarchy {
  id: string;
  name: string;
  locations: VenueLocation[];
  currentPath?: {
    locationId?: string;
    sectionId?: string;
    arrangementId?: string;
  };
  eventId?: string;
  eventName?: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  sections: VenueSection[];
  description?: string;
}

export interface VenueSection {
  id: string;
  name: string;
  arrangements: SeatingArrangement[];
  locationId?: string;
  description?: string;
}

export interface SeatingArrangement {
  id: string;
  name: string;
  layout?: LayoutData;
  sectionId?: string;
  venueType?: 'seat-based' | 'table-based' | string;
  tables?: Table[];
  chairs?: Chair[];
  seats?: Seat[];
  venueObjects?: VenueObject[];
  layoutData?: LayoutData;
  seatSections?: any[];
  description?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}