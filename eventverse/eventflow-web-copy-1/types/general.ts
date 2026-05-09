import { EventLocation } from "@/components/EnhancedEventCreationDialog";

export type LocationModelType = {
  name?: string;
  source?: string;
  sections?: SectionModelType[];
  address?: string;
  vendorName?: string;
};

export type WeatherModelType = {
  temperature?: number;
  condition?: string;
  icon?: string;
};

export type SectionModelType = {
  name: string;
  description: string;
  capacity: number;
};

export type EventModelType = {
  isPublic?: boolean;
  description?: string;
  time?: string;
  weather?: WeatherModelType;
  // locations: LocationModelType[];
  locations?: EventLocation[];
  eventType?: string;
  status?: string;
  eventName?: string;
  selectedModules?: string[];
  endDate?: Date;
  startDate?: Date;
};

export type ModuleMappingType = Record<string, string>;
