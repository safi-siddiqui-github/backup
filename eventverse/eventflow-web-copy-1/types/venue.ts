export interface VenueLocation {
  id: string;
  name: string;
  description?: string;
  address?: string;
  sections: VenueSection[];
}

export interface VenueSection {
  id: string;
  locationId: string;
  name: string;
  description?: string;
  capacity?: number;
  arrangements: SeatingArrangement[];
}

export interface SeatingArrangement {
  id: string;
  sectionId: string;
  name: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  venueType: "table-based" | "seat-based";
  tables: Table[];
  chairs: Chair[];
  seats: Seat[];
  seatSections: SeatSection[];
  venueObjects: VenueObject[];
  layoutData?: LayoutData;
  isActive?: boolean;
}

export type SeatingWallType = {
  id: string;
  type: "exterior" | "interior" | "glass";
  points: { x: number; y: number }[];
  thickness: number;
  color: string;
  material?: string;
};

export type SeatingRoomType = {
  id: string;
  name: string;
  type:
    | "dining"
    | "conference"
    | "ballroom"
    | "lounge"
    | "kitchen"
    | "bathroom"
    | "other";
  walls: string[];
  area: number;
  color: string;
  capacity?: number;
};

export type SeatingElementType = {
  id: string;
  type: "door" | "window" | "column" | "stairs" | "stage";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  wallId?: string;
  subtype?: string;
};

type LayoutPathType = {
  color?: string;
  lineWidth?: number;
  type?: string;
  points?: {
    x?: number;
    y?: number;
  }[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
};

export interface LayoutData {
  paths?: LayoutPathType[];
  objects?: unknown[];
  walls?: SeatingWallType[];
  rooms?: SeatingRoomType[];
  elements?: SeatingElementType[];
  scale?: number;
  backgroundImage?: string;
  dimensions: { width: number; height: number };
  timestamp: number;
}

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
  notes?: string;
  seatAssignments?: { [seatNumber: number]: Guest };
  rotation?: number;
}

export interface Chair {
  id: number;
  name: string;
  x: number;
  y: number;
  guest?: Guest;
  targetGroup?: string;
  notes?: string;
  rotation?: number;
  gridId?: string;
  layoutType?: string;
  rows?: number;
  columns?: number;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  group: string;
  dietary: string;
}

export interface Seat {
  id: number;
  sectionId: string;
  row: number;
  seatNumber: number;
  x: number;
  y: number;
  status: "available" | "assigned" | "reserved" | "blocked";
  priceTier?: "VIP" | "Premium" | "General" | "Budget";
  guest?: Guest;
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

export interface VenueObject {
  id: number;
  name: string;
  type: "stage" | "podium" | "exit" | "dancefloor";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
}

export interface VenueHierarchy {
  eventId: string;
  eventName: string;
  locations: VenueLocation[];
  currentPath: {
    locationId: string;
    sectionId: string;
    arrangementId: string;
  };
}

export interface VenuePreset {
  id: string;
  vendorId: string;
  vendorBusinessName: string;
  name: string;
  description?: string;
  category: PresetCategory;
  venueType: "table-based" | "seat-based";
  capacity: number;
  pricingInfo?: PresetPricing;
  tags: string[];
  tables: Table[];
  chairs: Chair[];
  seats: Seat[];
  seatSections: SeatSection[];
  venueObjects: VenueObject[];
  layoutData?: LayoutData;
  thumbnailUrl?: string;
  isPublic: boolean;
  isActive: boolean;
  bookingRequiredFrom?: string; // date
  bookingRequiredTo?: string; // date
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface PresetCategory {
  id: string;
  name: string;
  description?: string;
}

export interface PresetPricing {
  basePrice: number;
  pricePerGuest?: number;
  currency: string;
  includes: string[];
  excludes: string[];
  notes?: string;
}

export interface VendorPresetUsage {
  id: string;
  presetId: string;
  eventId: string;
  hostId: string;
  usageType: "as-is" | "template" | "modified" | "hybrid";
  modifications?: PresetModification[];
  status: "active" | "archived";
  bookedAt: string;
  modifiedAt?: string;
}

export interface PresetModification {
  id: string;
  type:
    | "table-added"
    | "table-removed"
    | "table-modified"
    | "chair-added"
    | "chair-removed"
    | "object-added"
    | "object-removed"
    | "layout-changed";
  timestamp: string;
  description: string;
  data: unknown;
  modifiedBy: "host" | "vendor";
  approvalRequired: boolean;
  approved: boolean;
}

export interface VendorProfile {
  id: string;
  name: string;
  category: string;
  subcategories: string[];
  description: string;
  location: string;
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  rating: number;
  reviewCount: number;
  portfolio: string[];
  services: string[];
  priceRange: "budget" | "mid-range" | "premium" | "luxury";
  availability: {
    busy: Date[];
    available: Date[];
  };
  verified: boolean;
  responseTime: string;
  completedEvents: number;
  certifications: string[];
  insurance: boolean;
  specialties: string[];
  yearEstablished: number;
  teamSize: number;
  awards: string[];
}
