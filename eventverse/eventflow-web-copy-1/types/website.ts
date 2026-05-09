import { SocialFeedSectionProps } from "@/components/website-builder/sections/SocialFeedSection";
import { TicketType } from "@/components/website-builder/sections/TicketingSection";

export interface Website {
  id: string;
  eventId: string;
  name: string;
  template: string;
  pages: Page[];
  theme: Theme;
  settings: WebsiteSettings;
  navigationConfig?: NavigationConfig;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  name: string;
  path: string;
  sections: Section[];
  seoSettings: SEOSettings;
}

export interface Section {
  id: string;
  type: SectionType;
  content: SectionContent;
  styling: SectionStyling;
  order: number;
  positioning?: SectionPositioning;
}

export interface SectionPositioning {
  type: "static" | "absolute" | "fixed" | "sticky";
  coordinates: {
    x: number; // pixels or percentage
    y: number; // pixels or percentage
    width?: number;
    height?: number;
  };
  zIndex: number;
  responsive: {
    desktop: Coordinates;
    tablet: Coordinates;
    mobile: Coordinates;
  };
  constraints?: {
    minWidth?: number;
    maxWidth?: number;
    snapToGrid?: boolean;
    maintainAspectRatio?: boolean;
  };
  isFloating: boolean;
}

export interface Coordinates {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export type SectionType =
  | "hero"
  | "about"
  | "gallery"
  | "schedule"
  | "contact"
  | "rsvp"
  | "ticketing"
  | "text"
  | "image"
  | "countdown"
  | "countdown-timer"
  | "map"
  | "navigation-buttons"
  // Advanced Content Components
  | "sessions-grid"
  | "speaker-profiles"
  | "venue-map"
  | "pricing-table"
  | "social-feed"
  | "newsletter-signup"
  | "testimonials"
  | "sponsor-showcase"
  | "multi-day-schedule"
  | "session-filter"
  | "interactive-agenda"
  | "registration-form"
  | "live-stream"
  | "networking-hub";

export type SectionContentData = {
  targetDate: string;
  eventDate: string;
  eventLocation: string;
  maxGuests: number;
  ticketTypes: TicketType[];
  hashtag: string;
  platforms: SocialFeedSectionProps["platforms"];
};

export interface SectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  images?: string[];
  buttons?: ButtonContent[];
  formFields?: FormField[];
  embedCode?: string;
  // data?: unknown;
  data?: Partial<SectionContentData>;
  targetDate?: string; // For countdown-timer sections
  // Advanced content properties
  sessions?: EventSession[];
  speakers?: Speaker[];
  venues?: VenueInfo[];
  pricing?: PricingTier[];
  socialFeeds?: SocialFeed[];
  sponsors?: Sponsor[];
  testimonials?: Testimonial[];
  schedule?: ScheduleItem[];
  filters?: FilterConfig[];
  registrationConfig?: RegistrationConfig;
  liveStreamConfig?: LiveStreamConfig;
}

export interface ButtonContent {
  text: string;
  link: string;
  style: "primary" | "secondary" | "outline";
  target?: "_blank" | "_self";
}

export interface FormField {
  id: string;
  type: "text" | "email" | "textarea" | "select" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface SectionStyling {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface WebsiteSettings {
  domain?: string;
  favicon?: string;
  socialImage?: string;
  analytics?: {
    googleAnalytics?: string;
    facebookPixel?: string;
  };
  integrations?: {
    rsvpModuleId?: string;
    mediaModuleId?: string;
    scheduleModuleId?: string;
    ticketingModuleId?: string;
  };
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface ContentBlock {
  id: string;
  name: string;
  icon: string;
  type: SectionType;
  defaultContent: SectionContent;
  defaultStyling: SectionStyling;
  category:
    | "layout"
    | "content"
    | "media"
    | "forms"
    | "integrations"
    | "advanced"
    | "professional";
  isPremium?: boolean;
  dependencies?: string[];
}

// New interfaces for advanced content
export interface EventSession {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerBio?: string;
  speakerImage?: string;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  capacity?: number;
  tags: string[];
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  company?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  sessions?: string[];
}

export interface VenueInfo {
  id: string;
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  capacity: number;
  amenities: string[];
  images?: string[];
  description?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  earlyBird?: {
    price: number;
    deadline: string;
  };
}

export interface SocialFeed {
  id: string;
  platform: "twitter" | "instagram" | "linkedin";
  hashtag?: string;
  handle?: string;
  embedCode?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  type: "session" | "break" | "networking" | "keynote" | "workshop";
  location?: string;
  description?: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: "category" | "date" | "level" | "speaker" | "location";
  options: string[];
}

export interface RegistrationConfig {
  id: string;
  title: string;
  fields: FormField[];
  pricingTiers: PricingTier[];
  settings: {
    allowGroupRegistration: boolean;
    requireApproval: boolean;
    maxCapacity?: number;
    earlyBirdDeadline?: string;
  };
}

export interface LiveStreamConfig {
  id: string;
  title: string;
  platform: "youtube" | "vimeo" | "zoom" | "custom";
  embedCode?: string;
  streamUrl?: string;
  isLive: boolean;
  schedule?: {
    startTime: string;
    endTime: string;
    date: string;
  };
}

export interface NavigationConfig {
  buttons: NavigationButton[];
  showLogo: boolean;
  logoText?: string;
  logoImage?: string;
}

export interface NavigationButton {
  id: string;
  text: string;
  link: string;
  style: "primary" | "secondary" | "outline";
  showInHeader: boolean;
  target?: "_blank" | "_self";
}
