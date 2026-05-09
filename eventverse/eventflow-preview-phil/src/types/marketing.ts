export interface MarketingCampaign {
  id: string;
  eventId: string;
  name: string;
  description: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';
  targetSegments: string[];
  channels: CampaignChannel[];
  schedule?: CampaignSchedule;
  budget?: CampaignBudget;
  createdAt: Date;
  createdBy: string;
  launchedAt?: Date;
  completedAt?: Date;
  analytics?: CampaignAnalytics;
}

export interface CampaignChannel {
  type: 'linkedin-post' | 'instagram-post' | 'instagram-reel' | 'tiktok-post' | 
        'facebook-post' | 'instagram-ad' | 'facebook-ad' | 'tiktok-ad' | 'linkedin-ad' |
        'email' | 'sms' | 'physical-mail';
  content: ChannelContent;
  targeting?: ChannelTargeting;
  budget?: number;
  status: 'pending' | 'sent' | 'failed' | 'published' | 'active' | 'completed';
  analytics?: ChannelAnalytics;
}

export interface ChannelContent {
  subject?: string;
  headline?: string;
  body: string;
  media?: MediaAsset[];
  callToAction?: CallToAction;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  altText?: string;
}

export interface CallToAction {
  text: string;
  url: string;
  type: 'rsvp' | 'buy-ticket' | 'learn-more' | 'custom';
}

export interface ChannelTargeting {
  demographics?: string[];
  interests?: string[];
  customAudience?: string;
}

export interface CampaignSchedule {
  scheduledFor?: Date;
  timezone: string;
  sendImmediately: boolean;
}

export interface CampaignBudget {
  total: number;
  perChannel: Record<string, number>;
  currency: string;
}

export interface GuestSegment {
  id: string;
  name: string;
  description: string;
  type: 'auto' | 'custom';
  filters: SegmentFilter[];
  guestCount: number;
  createdAt: Date;
  updatedAt: Date;
  analytics?: SegmentAnalytics;
}

export interface SegmentFilter {
  field: 'eventType' | 'ticketTier' | 'ageRange' | 'location' | 
         'totalSpent' | 'attendanceCount' | 'lastEventDate' | 'rsvpPattern';
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: string | number | string[] | { min: number; max: number };
}

export interface HistoricalGuest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  segments: string[];
  eventHistory: GuestEventHistory[];
  demographics?: GuestDemographics;
  preferences?: GuestPreferences;
  totalSpent: number;
  attendanceCount: number;
  lastEventDate: Date;
  optOuts: OptOutPreferences;
  // NEW FIELDS for advanced filtering
  avgTicketPrice: number;
  totalTicketsPurchased: number;
  purchaseFrequency: 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'rarely';
  lastPurchaseDaysAgo: number;
  lifetimeValue: number;
  avgPlusOnes: number;
  rsvpReliability: 'high' | 'medium' | 'low';
  birthday?: {
    month: number; // 1-12
    day: number; // 1-31
  };
}

export interface GuestEventHistory {
  eventId: string;
  eventName: string;
  eventType: string;
  eventDate: Date;
  ticketTier: string;
  ticketQuantity: number;
  totalSpent: number;
  rsvpStatus: string;
  plusOnes: number;
}

export interface GuestDemographics {
  ageRange?: string;
  gender?: string;
  occupation?: string;
  location?: string;
  interests?: string[];
}

export interface GuestPreferences {
  communicationChannel?: 'email' | 'sms' | 'mail';
  eventTypes?: string[];
}

export interface OptOutPreferences {
  email: boolean;
  sms: boolean;
  physicalMail: boolean;
  socialMedia: boolean;
}

export interface CampaignAnalytics {
  reach: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  bounced: number;
  unsubscribed: number;
  costPerChannel: Record<string, number>;
  totalCost: number;
  roi?: number;
  engagementRate: number;
  conversionRate: number;
  // NEW: Rich analytics data
  dailyEngagement?: DailyEngagement[];
  channelMetrics?: Record<string, ChannelMetrics>;
  geographicData?: GeographicData[];
  deviceBreakdown?: DeviceBreakdown;
  bestPerformingDay?: string;
  bestPerformingHour?: string;
  newVsReturning?: {
    new: number;
    returning: number;
  };
}

export interface DailyEngagement {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
}

export interface ChannelMetrics {
  sent?: number;
  delivered?: number;
  opened?: number;
  clicked?: number;
  bounced?: number;
  unsubscribed?: number;
  openRate?: number;
  clickRate?: number;
  avgTimeToOpen?: string;
  responseRate?: number;
  topLinks?: { url: string; clicks: number }[];
  
  // Social metrics
  impressions?: number;
  reach?: number;
  engagement?: number;
  engagementRate?: number;
  linkClicks?: number;
  followerGrowth?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  
  // Ad metrics
  spend?: number;
  clicks?: number;
  ctr?: number;
  cpm?: number;
  cpc?: number;
  conversions?: number;
  conversionRate?: number;
  roas?: number;
  revenue?: number;
}

export interface GeographicData {
  location: string;
  reach: number;
  clicked: number;
  converted: number;
}

export interface DeviceBreakdown {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface ChannelAnalytics {
  // Common metrics for all channels
  reach: number;
  sent?: number;
  delivered?: number;
  
  // Organic social post metrics
  impressions?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  profileVisits?: number;
  followerGrowth?: number;
  engagementRate?: number;
  
  // Paid ad metrics
  spend?: number;
  cpm?: number; // Cost per thousand impressions
  cpc?: number; // Cost per click
  ctr?: number; // Click-through rate
  conversions?: number;
  conversionRate?: number; // Conversion rate percentage
  roas?: number; // Return on ad spend
  revenue?: number; // Total revenue generated
  frequency?: number; // Average times shown per user
  linkClicks?: number; // Link clicks for social posts
  
  // Direct messaging metrics (email/SMS)
  opened?: number;
  clicked?: number;
  bounced?: number;
  unsubscribed?: number;
  openRate?: number;
  clickRate?: number;
}

export interface SegmentAnalytics {
  spendingTrend: { month: string; avgSpent: number }[];
  attendanceFrequency: {
    monthly: number;
    quarterly: number;
    biannually: number;
    annually: number;
  };
  eventTypePreference: { type: string; count: number; avgSpent: number }[];
  lifecycleStages: {
    new: number;
    active: number;
    atRisk: number;
    churned: number;
  };
  avgTicketsPerPurchase: number;
  multiTicketBuyers: number;
  avgPlusOnes: number;
  frequentPlusOneBringers: number;
  rsvpReliability: {
    alwaysConfirms: number;
    sometimesNoShow: number;
    frequentNoShow: number;
  };
  preferredChannel: {
    email: number;
    sms: number;
    mail: number;
  };
}
