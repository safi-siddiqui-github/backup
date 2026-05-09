// Module configuration and registry types
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  features: string[];
  category: ModuleCategory;
  mutuallyExclusive?: string[];
  eventTypes?: string[];
  component: ReactNode;
  settings?: ModuleSettings;
}

export type ModuleCategory = 'core' | 'engagement' | 'management' | 'analytics' | 'premium';

export interface ModuleSettings {
  [key: string]: ModuleSetting;
}

export interface ModuleSetting {
  type: 'boolean' | 'string' | 'number' | 'select' | 'multiselect';
  label: string;
  description?: string;
  defaultValue: string | number | boolean | string[];
  options?: SettingOption[];
  validation?: SettingValidation;
}

export interface SettingOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SettingValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface ModuleRegistration {
  moduleId: string;
  eventId: string;
  isActive: boolean;
  settings: Record<string, unknown>;
  activatedAt: Date;
  activatedBy: string;
}

export interface ModuleUsageData {
  moduleId: string;
  eventId: string;
  interactions: ModuleInteraction[];
  performance: ModulePerformanceMetrics;
  lastUsed: Date;
}

export interface ModuleInteraction {
  id: string;
  userId?: string;
  action: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}

export interface ModulePerformanceMetrics {
  totalInteractions: number;
  uniqueUsers: number;
  averageSessionTime: number;
  conversionRate?: number;
  errorRate: number;
  satisfactionScore?: number;
}

// Specific module data types
export interface RSVPModuleData {
  guests: ModuleGuest[];
  groups: RSVPGroup[];
  settings: RSVPModuleSettings;
  responses: RSVPResponse[];
}

export interface ModuleGuest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  groupId?: string;
  status: 'pending' | 'attending' | 'declined' | 'maybe';
  plusOnes: number;
  plusOneNames?: string[];
  dietary?: string;
  notes?: string;
  customFields?: Record<string, unknown>;
}

export interface RSVPGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  memberLimit?: number;
  guestCount: number;
  plusOneLimit?: number;
}

export interface RSVPModuleSettings {
  deadline?: Date;
  allowPlusOnes: boolean;
  maxPlusOnes: number;
  publicRegistration: boolean;
  requireApproval: boolean;
  autoReminders: boolean;
  responseOptions: 'yes-no' | 'yes-no-maybe' | 'custom';
  customResponses?: string[];
  capacityLimit?: number;
  enableWaitlist: boolean;
  collectDietaryInfo: boolean;
  enableCustomFields: boolean;
}

export interface RSVPResponse {
  id: string;
  guestId: string;
  status: 'pending' | 'attending' | 'declined' | 'maybe';
  responseData: Record<string, unknown>;
  submittedAt: Date;
}

export interface TicketingModuleData {
  ticketTypes: TicketType[];
  orders: TicketOrder[];
  settings: TicketingModuleSettings;
}

export interface TicketType {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sold: number;
  maxPerOrder?: number;
  saleStart?: Date;
  saleEnd?: Date;
  features?: string[];
}

export interface TicketOrder {
  id: string;
  buyerEmail: string;
  buyerName: string;
  tickets: OrderTicket[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  createdAt: Date;
  paidAt?: Date;
}

export interface OrderTicket {
  ticketTypeId: string;
  quantity: number;
  unitPrice: number;
  attendeeName?: string;
}

export interface TicketingModuleSettings {
  taxRate: number;
  currency: string;
  refundPolicy?: string;
  terms?: string;
  requireAttendeeInfo: boolean;
}

// Survey module types
export interface SurveyModuleData {
  surveys: Survey[];
  responses: SurveyResponse[];
  settings: SurveyModuleSettings;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  isActive: boolean;
  publishedAt?: Date;
  closedAt?: Date;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'rating' | 'scale';
  options?: string[];
  required: boolean;
  order: number;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId?: string;
  answers: Record<string, string | string[] | number>;
  submittedAt: Date;
}

export interface SurveyModuleSettings {
  allowAnonymous: boolean;
  multipleResponses: boolean;
  showResults: boolean;
  requireLogin: boolean;
}

// Travel module types
export interface TravelModuleData {
  bookings: TravelBooking[];
  settings: TravelModuleSettings;
}

export interface TravelBooking {
  id: string;
  guestId: string;
  eventId: string;
  type: 'hotel' | 'flight' | 'car' | 'activity' | 'restaurant' | 'rideshare';
  data: HotelBooking | FlightBooking | CarRentalBooking | ActivityBooking | RestaurantBooking | RideshareBooking;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  bookedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  bookingReference?: string;
  guestInfo?: GuestInfo;
  paymentInfo?: PaymentInfo;
  pricingBreakdown?: PricingBreakdown;
  bookingData?: HotelBookingData | FlightBookingData | CarRentalBookingData | ActivityBookingData | RestaurantBookingData;
}

export interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  [key: string]: any;
}

export interface PaymentInfo {
  lastFourDigits: string;
  paymentMethod: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface PricingBreakdown {
  basePrice: number;
  taxesAndFees: number;
  total: number;
  currency: string;
}

// Hotel booking data
export interface SelectedRoom {
  roomTypeId: string;
  quantity: number;
  roomTypeName: string;
  pricePerNight: number;
}

export interface HotelBookingData {
  selectedRooms: SelectedRoom[];
  totalRooms: number;
  primaryGuest: string;
  additionalGuests: string[];
  specialRequests: {
    earlyCheckIn?: boolean;
    lateCheckout?: boolean;
    bedPreference?: string;
    floorPreference?: string;
    accessibility?: string[];
    other?: string;
  };
  loyaltyNumber?: string;
}

// Flight booking data
export interface FlightPassenger {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email?: string;
  phone?: string;
  knownTravelerNumber?: string;
  frequentFlyerNumber?: string;
  passport?: {
    number: string;
    country: string;
    expiryDate: Date;
  };
  seat?: {
    seatNumber: string;
    preference: 'window' | 'aisle' | 'middle';
    extraLegroom: boolean;
    fee: number;
  };
  baggage: {
    carryOn: boolean;
    checkedBags: number;
    specialItems: string[];
    totalFee: number;
  };
}

export interface FlightBookingData {
  passengers: FlightPassenger[];
  primaryContactEmail: string;
  primaryContactPhone: string;
  mealPreferences?: Record<string, string>;
  insurance?: boolean;
  insuranceCost?: number;
}

// Car rental booking data
export interface CarDriver {
  fullName: string;
  dateOfBirth: Date;
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: Date;
}

export interface CarRentalBookingData {
  primaryDriver: CarDriver;
  additionalDrivers: CarDriver[];
  insurance: {
    cdw: boolean;
    lis: boolean;
    pai: boolean;
    pec: boolean;
    roadsideAssistance: boolean;
    cost: number;
  };
  addons: {
    gps: boolean;
    childSeats: number;
    prepaidFuel: boolean;
    tollPass: boolean;
    skiRack: boolean;
    cost: number;
  };
  fuelPolicy: 'full-to-full' | 'prepay' | 'same-to-same';
}

// Activity booking data
export interface ActivityParticipant {
  fullName: string;
  age: number;
  weight?: number;
  height?: number;
  equipmentSize?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface ActivityBookingData {
  selectedDate: Date;
  selectedTime: string;
  participants: ActivityParticipant[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  waiverSigned: boolean;
  waiverSignature: string;
  photoConsent: boolean;
  equipmentRentals?: string[];
}

// Restaurant booking data
export interface RestaurantBookingData {
  reservationDate: Date;
  reservationTime: string;
  partySize: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  seatingPreference: {
    area: 'indoor' | 'outdoor' | 'patio' | 'bar';
    type: 'booth' | 'table';
    special?: string[];
  };
  dietaryRestrictions: string[];
  specialOccasion?: {
    type: 'birthday' | 'anniversary' | 'engagement' | 'business' | 'other';
    personName?: string;
  };
  specialRequests: string;
  highChairNeeded: boolean;
  wheelchairAccessible: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  maxOccupancy: number;
  bedConfiguration: string;
  squareFeet: number;
  features: string[];
  amenities: string[];
  available: number;
  images: string[];
}

export interface HotelBooking {
  name: string;
  address: string;
  rating: number;
  roomTypes: RoomType[];
  startingPrice: number;
  pricePerNight?: number;
  roomType?: string;
  checkIn: Date;
  checkOut: Date;
  amenities: string[];
  distance: number;
  imageUrl?: string;
  bookingUrl: string;
}

export interface FlightBooking {
  ticketId: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureAirport: string;
  departureAirportAddress: string;
  departureAirportCode: string;
  arrivalAirport: string;
  arrivalAirportAddress: string;
  arrivalAirportCode: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: string;
  stops: number;
  stopLocations?: string[];
  price: number;
  class: string;
  bookingUrl: string;
}

export interface CarRentalBooking {
  company: string;
  vehicleType: string;
  model: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  dropoffDate: Date;
  pricePerDay: number;
  features: string[];
  bookingUrl: string;
}

export interface ActivityBooking {
  name: string;
  companyName: string;
  address: string;
  category: string;
  description: string;
  rating: number;
  price: number;
  duration: string;
  distance: number;
  date?: Date;
  imageUrl?: string;
  bookingUrl: string;
}

export interface RestaurantBooking {
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  address: string;
  distance: number;
  reservationTime?: Date;
  phoneNumber?: string;
  imageUrl?: string;
  reservationUrl?: string;
}

export interface RideshareBooking {
  service: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: Date;
  estimatedPrice: number;
  vehicleType: string;
  bookingUrl: string;
}

export interface TravelModuleSettings {
  searchRadius: number;
  autoSuggestDates: boolean;
  showPriceComparison: boolean;
  affiliateLinks: boolean;
}