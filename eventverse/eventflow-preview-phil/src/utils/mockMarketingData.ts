import { HistoricalGuest, GuestSegment, MarketingCampaign } from "@/types/marketing";

export const mockHistoricalGuests: HistoricalGuest[] = [
  {
    id: "guest-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0101",
    segments: ["vip-guests", "wedding-attendees"],
    eventHistory: [
      {
        eventId: "event-1",
        eventName: "Summer Wedding 2024",
        eventType: "Wedding",
        eventDate: new Date("2024-06-15"),
        ticketTier: "VIP",
        ticketQuantity: 2,
        totalSpent: 500,
        rsvpStatus: "confirmed",
        plusOnes: 1
      }
    ],
    demographics: {
      ageRange: "25-34",
      gender: "Female",
      occupation: "Marketing Manager",
      location: "New York, NY",
      interests: ["Wine", "Travel", "Photography"]
    },
    totalSpent: 500,
    attendanceCount: 1,
    lastEventDate: new Date("2024-06-15"),
    optOuts: {
      email: false,
      sms: false,
      physicalMail: false,
      socialMedia: false
    },
    avgTicketPrice: 250,
    totalTicketsPurchased: 2,
    purchaseFrequency: 'annually',
    lastPurchaseDaysAgo: 145,
    lifetimeValue: 500,
    avgPlusOnes: 1,
    rsvpReliability: 'high',
    birthday: { month: 3, day: 15 }
  },
  {
    id: "guest-2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0102",
    segments: ["corporate-attendees", "frequent-attendees"],
    eventHistory: [
      {
        eventId: "event-2",
        eventName: "Tech Conference 2024",
        eventType: "Corporate",
        eventDate: new Date("2024-03-10"),
        ticketTier: "General Admission",
        ticketQuantity: 1,
        totalSpent: 299,
        rsvpStatus: "confirmed",
        plusOnes: 0
      },
      {
        eventId: "event-3",
        eventName: "Annual Gala 2023",
        eventType: "Corporate",
        eventDate: new Date("2023-11-20"),
        ticketTier: "VIP",
        ticketQuantity: 1,
        totalSpent: 750,
        rsvpStatus: "confirmed",
        plusOnes: 0
      }
    ],
    demographics: {
      ageRange: "35-44",
      gender: "Male",
      occupation: "Software Engineer",
      location: "San Francisco, CA",
      interests: ["Technology", "Startups", "AI"]
    },
    totalSpent: 1049,
    attendanceCount: 2,
    lastEventDate: new Date("2024-03-10"),
    optOuts: {
      email: false,
      sms: false,
      physicalMail: true,
      socialMedia: false
    },
    avgTicketPrice: 524.5,
    totalTicketsPurchased: 2,
    purchaseFrequency: 'quarterly',
    lastPurchaseDaysAgo: 272,
    lifetimeValue: 1049,
    avgPlusOnes: 0,
    rsvpReliability: 'high',
    birthday: { month: 7, day: 22 }
  },
  {
    id: "guest-3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    segments: ["vip-guests", "high-spenders"],
    eventHistory: [
      {
        eventId: "event-4",
        eventName: "Charity Fundraiser 2024",
        eventType: "Fundraiser",
        eventDate: new Date("2024-05-05"),
        ticketTier: "Platinum",
        ticketQuantity: 4,
        totalSpent: 2000,
        rsvpStatus: "confirmed",
        plusOnes: 3
      }
    ],
    demographics: {
      ageRange: "45-54",
      gender: "Female",
      occupation: "CEO",
      location: "Los Angeles, CA",
      interests: ["Philanthropy", "Art", "Fashion"]
    },
    totalSpent: 2000,
    attendanceCount: 1,
    lastEventDate: new Date("2024-05-05"),
    optOuts: {
      email: false,
      sms: false,
      physicalMail: false,
      socialMedia: false
    },
    avgTicketPrice: 500,
    totalTicketsPurchased: 4,
    purchaseFrequency: 'annually',
    lastPurchaseDaysAgo: 186,
    lifetimeValue: 2000,
    avgPlusOnes: 3,
    rsvpReliability: 'high',
    birthday: { month: 11, day: 8 }
  },
  {
    id: "guest-4",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1-555-0104",
    segments: ["festival-goers", "young-adults"],
    eventHistory: [
      {
        eventId: "event-5",
        eventName: "Music Festival 2024",
        eventType: "Festival",
        eventDate: new Date("2024-07-20"),
        ticketTier: "General Admission",
        ticketQuantity: 1,
        totalSpent: 199,
        rsvpStatus: "confirmed",
        plusOnes: 0
      }
    ],
    demographics: {
      ageRange: "18-24",
      gender: "Male",
      occupation: "Student",
      location: "Austin, TX",
      interests: ["Music", "Gaming", "Sports"]
    },
    totalSpent: 199,
    attendanceCount: 1,
    lastEventDate: new Date("2024-07-20"),
    optOuts: {
      email: false,
      sms: false,
      physicalMail: true,
      socialMedia: false
    },
    avgTicketPrice: 199,
    totalTicketsPurchased: 1,
    purchaseFrequency: 'annually',
    lastPurchaseDaysAgo: 75,
    lifetimeValue: 199,
    avgPlusOnes: 0,
    rsvpReliability: 'high',
    birthday: { month: 1, day: 12 }
  }
];

export const mockSegments: GuestSegment[] = [
  {
    id: "vip-guests",
    name: "VIP Guests",
    description: "Guests who purchased VIP or higher tier tickets",
    type: "auto",
    filters: [
      {
        field: "ticketTier",
        operator: "in",
        value: ["VIP", "Platinum", "Diamond"]
      }
    ],
    guestCount: 45,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    analytics: {
      spendingTrend: [
        { month: 'Jan', avgSpent: 450 },
        { month: 'Feb', avgSpent: 520 },
        { month: 'Mar', avgSpent: 480 },
        { month: 'Apr', avgSpent: 600 },
        { month: 'May', avgSpent: 550 },
        { month: 'Jun', avgSpent: 700 },
        { month: 'Jul', avgSpent: 650 },
        { month: 'Aug', avgSpent: 600 },
        { month: 'Sep', avgSpent: 720 },
        { month: 'Oct', avgSpent: 800 },
        { month: 'Nov', avgSpent: 750 },
        { month: 'Dec', avgSpent: 900 }
      ],
      attendanceFrequency: {
        monthly: 5,
        quarterly: 25,
        biannually: 45,
        annually: 25
      },
      eventTypePreference: [
        { type: 'Wedding', count: 20, avgSpent: 650 },
        { type: 'Corporate', count: 15, avgSpent: 580 },
        { type: 'Fundraiser', count: 10, avgSpent: 800 }
      ],
      lifecycleStages: {
        new: 10,
        active: 60,
        atRisk: 20,
        churned: 10
      },
      avgTicketsPerPurchase: 2.5,
      multiTicketBuyers: 70,
      avgPlusOnes: 1.8,
      frequentPlusOneBringers: 55,
      rsvpReliability: {
        alwaysConfirms: 75,
        sometimesNoShow: 20,
        frequentNoShow: 5
      },
      preferredChannel: {
        email: 60,
        sms: 15,
        mail: 25
      }
    }
  },
  {
    id: "wedding-attendees",
    name: "Wedding Attendees",
    description: "Guests who attended wedding events",
    type: "auto",
    filters: [
      {
        field: "eventType",
        operator: "equals",
        value: "Wedding"
      }
    ],
    guestCount: 120,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "corporate-attendees",
    name: "Corporate Event Attendees",
    description: "Professionals who attended corporate events",
    type: "auto",
    filters: [
      {
        field: "eventType",
        operator: "equals",
        value: "Corporate"
      }
    ],
    guestCount: 230,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "high-spenders",
    name: "High Spenders",
    description: "Guests who spent $1000+ total",
    type: "auto",
    filters: [
      {
        field: "totalSpent",
        operator: "greaterThan",
        value: 1000
      }
    ],
    guestCount: 67,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "frequent-attendees",
    name: "Frequent Attendees",
    description: "Guests who attended 3+ events",
    type: "auto",
    filters: [
      {
        field: "attendanceCount",
        operator: "greaterThan",
        value: 3
      }
    ],
    guestCount: 89,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "young-adults",
    name: "Young Adults (18-34)",
    description: "Guests aged 18-34",
    type: "custom",
    filters: [
      {
        field: "ageRange",
        operator: "in",
        value: ["18-24", "25-34"]
      }
    ],
    guestCount: 156,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15")
  },
  {
    id: "festival-goers",
    name: "Festival Goers",
    description: "Guests who attended festival events",
    type: "auto",
    filters: [
      {
        field: "eventType",
        operator: "equals",
        value: "Festival"
      }
    ],
    guestCount: 342,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  }
];

export const mockCampaigns: MarketingCampaign[] = [
  {
    id: "campaign-1",
    eventId: "event-upcoming",
    name: "Summer Wedding Campaign 2025",
    description: "Multi-channel campaign for upcoming summer wedding",
    status: "draft",
    targetSegments: ["vip-guests", "wedding-attendees"],
    channels: [
      {
        type: "email",
        content: {
          subject: "You're Invited to Our Summer Wedding!",
          body: "Join us for an unforgettable celebration...",
          callToAction: {
            text: "RSVP Now",
            url: "https://example.com/rsvp",
            type: "rsvp"
          }
        },
        status: "pending"
      },
      {
        type: "instagram-post",
        content: {
          body: "Save the date! ☀️💒 Summer wedding celebration coming soon! #SummerWedding",
          media: []
        },
        status: "pending"
      }
    ],
    createdAt: new Date("2025-01-15"),
    createdBy: "host-1"
  },
  {
    id: "campaign-2",
    eventId: "event-tech",
    name: "Tech Conference 2025",
    description: "Email and social media campaign for tech conference",
    status: "scheduled",
    targetSegments: ["corporate-attendees"],
    channels: [
      {
        type: "email",
        content: {
          subject: "Join Us at Tech Conference 2025",
          body: "Don't miss the biggest tech event of the year...",
          callToAction: {
            text: "Register Now",
            url: "https://example.com/register",
            type: "buy-ticket"
          }
        },
        status: "pending"
      },
      {
        type: "linkedin-post",
        content: {
          headline: "Tech Conference 2025 - Innovation Awaits",
          body: "Register now for early bird pricing!",
          callToAction: {
            text: "Learn More",
            url: "https://example.com",
            type: "learn-more"
          }
        },
        status: "pending"
      }
    ],
    schedule: {
      scheduledFor: new Date("2025-02-01"),
      timezone: "America/New_York",
      sendImmediately: false
    },
    createdAt: new Date("2025-01-10"),
    createdBy: "host-1"
  },
  {
    id: "campaign-3",
    eventId: "event-charity",
    name: "Charity Gala Invitations",
    description: "Premium campaign with physical mail for VIP guests",
    status: "completed",
    targetSegments: ["vip-guests", "high-spenders"],
    channels: [
      {
        type: "physical-mail",
        content: {
          body: "You're cordially invited to our Annual Charity Gala...",
        },
        status: "sent"
      },
      {
        type: "email",
        content: {
          subject: "Your Exclusive Invitation to the Charity Gala",
          body: "We're honored to invite you...",
          callToAction: {
            text: "RSVP",
            url: "https://example.com/rsvp",
            type: "rsvp"
          }
        },
        status: "sent"
      }
    ],
    createdAt: new Date("2024-12-01"),
    createdBy: "host-1",
    launchedAt: new Date("2024-12-05"),
    completedAt: new Date("2024-12-20"),
    analytics: {
      reach: 67,
      sent: 67,
      delivered: 65,
      opened: 52,
      clicked: 38,
      converted: 24,
      bounced: 2,
      unsubscribed: 0,
      costPerChannel: {
        "physical-mail": 335,
        "email": 0
      },
      totalCost: 335,
      roi: 15200,
      engagementRate: 80,
      conversionRate: 36.9,
      dailyEngagement: [
        { date: '2024-12-05', sent: 20, opened: 15, clicked: 8, converted: 5 },
        { date: '2024-12-06', sent: 25, opened: 20, clicked: 12, converted: 7 },
        { date: '2024-12-07', sent: 22, opened: 17, clicked: 10, converted: 6 },
        { date: '2024-12-08', sent: 0, opened: 0, clicked: 8, converted: 6 }
      ],
      channelMetrics: {
        'email': {
          sent: 67,
          delivered: 65,
          opened: 52,
          clicked: 38,
          bounced: 2,
          unsubscribed: 0,
          openRate: 80,
          clickRate: 58.5,
          avgTimeToOpen: '2.5 hours',
          topLinks: [
            { url: 'https://example.com/rsvp', clicks: 25 },
            { url: 'https://example.com/venue', clicks: 13 }
          ]
        },
        'physical-mail': {
          sent: 67,
          delivered: 67,
          responseRate: 35.8
        }
      },
      geographicData: [
        { location: 'New York, NY', reach: 25, clicked: 15, converted: 8 },
        { location: 'Los Angeles, CA', reach: 20, clicked: 12, converted: 6 },
        { location: 'San Francisco, CA', reach: 15, clicked: 8, converted: 5 },
        { location: 'Chicago, IL', reach: 7, clicked: 3, converted: 5 }
      ],
      deviceBreakdown: {
        mobile: 45,
        desktop: 30,
        tablet: 12
      },
      bestPerformingDay: 'Thursday',
      bestPerformingHour: '10 AM',
      newVsReturning: {
        new: 15,
        returning: 52
      }
    }
  },
  {
    id: "campaign-4",
    eventId: "event-festival",
    name: "Festival Social Media Blitz",
    description: "Comprehensive social media campaign with organic posts and paid ads",
    status: "completed",
    targetSegments: ["young-professionals"],
    channels: [
      {
        type: "instagram-post",
        content: {
          body: "🎉 The countdown is on! Festival season is here and we can't wait to see you all! Get ready for 3 days of music, food, and unforgettable memories. Who's coming? Tag your festival crew! 👇\n\n#FestivalVibes #MusicFestival #LiveMusic",
          callToAction: {
            text: "Get Tickets",
            url: "https://example.com/tickets",
            type: "buy-ticket"
          }
        },
        status: "sent",
        analytics: {
          reach: 38140,
          impressions: 45230,
          likes: 3847,
          comments: 421,
          shares: 892,
          saves: 1240,
          profileVisits: 1842,
          linkClicks: 2134,
          followerGrowth: 847,
          engagementRate: 16.78
        }
      },
      {
        type: "linkedin-post",
        content: {
          headline: "Annual Tech Festival - Innovation & Networking",
          body: "Join industry leaders for 3 days of cutting-edge tech discussions, workshops, and networking opportunities. Early bird tickets available now!",
          callToAction: {
            text: "Learn More",
            url: "https://example.com/festival",
            type: "learn-more"
          }
        },
        status: "sent",
        analytics: {
          reach: 9340,
          impressions: 12480,
          likes: 892,
          comments: 143,
          shares: 234,
          profileVisits: 432,
          linkClicks: 1124,
          followerGrowth: 127,
          engagementRate: 13.59
        }
      },
      {
        type: "facebook-ad",
        content: {
          headline: "Early Bird Festival Tickets - 40% Off!",
          body: "Don't miss the biggest festival of the year! Limited early bird tickets available. 3 days of amazing music, food trucks, and more!",
          callToAction: {
            text: "Buy Tickets",
            url: "https://example.com/tickets",
            type: "buy-ticket"
          }
        },
        status: "completed",
        budget: 1500,
        analytics: {
          reach: 87240,
          spend: 1482.50,
          impressions: 124530,
          clicked: 3847,
          ctr: 3.09,
          cpm: 11.90,
          cpc: 0.39,
          conversions: 427,
          conversionRate: 11.10,
          roas: 8.7,
          revenue: 12900
        }
      },
      {
        type: "instagram-ad",
        content: {
          headline: "Festival Weekend Passes Available Now!",
          body: "Get your weekend pass today and experience 3 days of non-stop entertainment! 🎵🎪",
          callToAction: {
            text: "Get Tickets",
            url: "https://example.com/tickets",
            type: "buy-ticket"
          }
        },
        status: "completed",
        budget: 2000,
        analytics: {
          reach: 156840,
          spend: 1987.25,
          impressions: 234120,
          clicked: 8234,
          ctr: 3.52,
          cpm: 8.49,
          cpc: 0.24,
          conversions: 892,
          conversionRate: 10.83,
          roas: 10.2,
          revenue: 20280
        }
      }
    ],
    createdAt: new Date("2024-11-01"),
    createdBy: "host-1",
    completedAt: new Date("2024-12-15"),
    analytics: {
      reach: 291560,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 15339,
      converted: 1319,
      bounced: 0,
      unsubscribed: 0,
      costPerChannel: {
        "instagram-post": 0,
        "linkedin-post": 0,
        "facebook-ad": 1482.50,
        "instagram-ad": 1987.25
      },
      totalCost: 3469.75,
      roi: 33180,
      engagementRate: 4.2,
      conversionRate: 8.6,
      dailyEngagement: [
        { date: '2024-12-01', sent: 0, opened: 0, clicked: 2847, converted: 245 },
        { date: '2024-12-02', sent: 0, opened: 0, clicked: 3124, converted: 267 },
        { date: '2024-12-03', sent: 0, opened: 0, clicked: 2956, converted: 254 },
        { date: '2024-12-04', sent: 0, opened: 0, clicked: 3210, converted: 276 },
        { date: '2024-12-05', sent: 0, opened: 0, clicked: 3202, converted: 277 }
      ],
      channelMetrics: {
        'instagram-post': {
          impressions: 45230,
          reach: 38140,
          engagement: 6400,
          engagementRate: 16.78,
          linkClicks: 2134,
          followerGrowth: 847
        },
        'linkedin-post': {
          impressions: 12480,
          reach: 9340,
          engagement: 1269,
          engagementRate: 13.59,
          linkClicks: 1124,
          followerGrowth: 127
        },
        'facebook-ad': {
          spend: 1482.50,
          impressions: 124530,
          reach: 87240,
          clicks: 3847,
          ctr: 3.09,
          cpm: 11.90,
          cpc: 0.39,
          conversions: 427,
          conversionRate: 11.10,
          roas: 8.7,
          revenue: 12900
        },
        'instagram-ad': {
          spend: 1987.25,
          impressions: 234120,
          reach: 156840,
          clicks: 8234,
          ctr: 3.52,
          cpm: 8.49,
          cpc: 0.24,
          conversions: 892,
          conversionRate: 10.83,
          roas: 10.2,
          revenue: 20280
        }
      }
    }
  }
];
