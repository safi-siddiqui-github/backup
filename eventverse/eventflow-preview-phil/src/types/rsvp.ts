
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
  status: 'pending' | 'attending' | 'declined' | 'maybe';
  plusOnes: number;
  plusOneNames?: string[];
  dietaryRestrictions?: string;
  notes?: string;
  invitedDate: Date;
  respondedDate?: Date;
  customFields?: Record<string, any>;
  allowedPlusOnes?: number; // Individual plus one limits
  avatar?: string; // Profile photo URL
}

export interface RSVPSettings {
  deadline?: Date;
  allowPlusOnes: boolean;
  maxPlusOnes: number;
  publicRegistration: boolean;
  requireApproval: boolean;
  autoReminders: boolean;
  responseOptions: 'yes-no' | 'yes-no-maybe' | 'custom';
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
  id: string;
  label: string;
  type: 'text' | 'dropdown' | 'checkbox' | 'radio' | 'textarea';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FoodChoice {
  id: string;
  name: string;
  description?: string;
  dietary: string[];
  price?: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
}

export interface RSVPFormConfig {
  customFields: CustomField[];
  foodChoices: FoodChoice[];
  settings: RSVPSettings;
}
