import { ElementType } from "react";

export interface RSVPGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  memberLimit?: number;
  guestCount: number;
  plusOneLimit?: number; // Group-specific plus one limits
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  group?: string;
  status: "pending" | "attending" | "declined" | "maybe";
  plusOnes: number;
  plusOneNames?: string[];
  dietaryRestrictions?: string;
  notes?: string;
  invitedDate: Date;
  respondedDate?: Date;
  customFields?: Record<string, unknown>;
  allowedPlusOnes?: number; // Individual plus one limits
  customResponses?: Record<string, string>; // <-- change from unknown to string
  isCheckedIn?: boolean;
}

export interface RSVPSettings {
  deadline?: Date;
  allowPlusOnes: boolean;
  maxPlusOnes: number;
  publicRegistration: boolean;
  requireApproval: boolean;
  autoReminders: boolean;
  responseOptions: "yes-no" | "yes-no-maybe" | "custom";
  customResponses?: string[];
  registryLinks?: RegistryLink[];
  capacityLimit?: number;
  enableWaitlist: boolean;
  collectDietaryInfo: boolean;
  enableCustomFields: boolean;
}

export interface RegistryLink {
  id: string;
  name: string;
  url: string;
  platform: string;
  description?: string;
}

export interface CustomField {
  icon?: ElementType;
  id: string;
  label: string;
  type:
    | "text"
    | "dropdown"
    | "checkbox"
    | "radio"
    | "textarea"
    | "predefined"
    | "food"
    | "custom";

  fieldtype?: string;
  order?: number;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  description?: string;
  config?: object;
}

export interface FoodChoice {
  id: string;
  name: string;
  description?: string;
  dietary: string[];
  price?: number;
  category: "appetizer" | "main" | "dessert" | "beverage";
}

export interface RSVPFormConfig {
  customFields: CustomField[];
  foodChoices: FoodChoice[];
  settings: RSVPSettings;
}

export type RsvpExisting = {
  status?: string;
  mealChoice?: string;
  dietaryRestrictions?: string;
  songRequest?: string;
  plusOnes?: number;
  specialRequests?: string;
  type?: string;
};

// export type RsvpTicketConfigType = {
//   ticketTypes?: {
//     quantity?: number;
//   }[];
//   currency?: string;
// };

// export type RsvpConfigType = {
//   expectedGuests?: string;
//   // ticketTypes?: RsvpTicketConfigType[];
//   maxAttendees?: number;
// };

export type RSVPConfig = {
  expectedGuests?: number;
  maxAttendees?: number;
  rsvpDeadline?: string;
  collectPhone?: boolean;
  collectDietary?: boolean;
  allowPlusOnes?: boolean;
  customQuestion?: string;
};

// interface TicketType {
//   ;
//   ;
// }

export type TicketType = {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  currency?: string;
  quantity?: number;
  saleStartDate?: string;
  saleEndDate?: string;
  //
  available?: number;
  sold?: number;
  capacity?: number;
  color?: string;
  isActive?: boolean;
  features: string[];
  // features?: string;
  accessLevel?: string;
  saleStart?: Date;
  saleEnd?: Date;
};

export type TicketingConfig = {
  ticketTypes: TicketType[];
  currency: string;
  processingFee: boolean;
};

export type OrderType = {
  status?: string;
  checkInStatus?: string;
  totalAmount?: number;
  ticketTypeId?: string;

  customerName?: string;
  customerEmail?: string;
  ticketType?: string;
  quantity?: string;
  promoCode?: string;
  referralCode?: string;
  discount?: string;
};
