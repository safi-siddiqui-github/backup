import { Proposal } from "./lead-detail/proposals/types";

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type LeadPriority = "high" | "medium" | "low";

export interface LeadMessage {
  id: string;
  text: string;
  sender: "vendor" | "client";
  timestamp: string;
  isRead?: boolean;
}

export interface RelatedService {
  leadId: string;
  serviceType: string;
  category: string;
}

export interface Lead {
  id: string;
  eventId: string; // Groups leads from the same event together
  eventTitle: string;
  clientName: string;
  description: string;
  eventDate: string;
  location: string;
  price: string;
  budget: number;
  guests: number;
  priority: LeadPriority;
  status: LeadStatus;
  matchPercentage: number;
  dueDate: string;
  category: string;
  serviceType: string;
  distance?: number; // in miles
  relatedServices?: RelatedService[]; // Other services needed for this event
  // Additional fields that can be added later
  email?: string;
  phone?: string;
  preferredContact?: "Email" | "Phone" | "Text";
  specialRequirements?: string[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  messages?: LeadMessage[];
  proposals?: Proposal[];
}

export const mockLeads: Lead[] = [
  // Sarah & Michael's Wedding - Catering Lead
  {
    id: "1",
    eventId: "event-1",
    eventTitle: "Sarah & Michael's Wedding",
    clientName: "Sarah Johnson",
    description: "Full service catering for 150 guests, need vegetarian and gluten-free options",
    eventDate: "15/08/2024",
    location: "Napa Valley, CA",
    price: "$7,500",
    budget: 7500,
    guests: 150,
    priority: "high",
    status: "new",
    matchPercentage: 95,
    dueDate: "15/01/2024",
    category: "Wedding",
    serviceType: "Catering",
    distance: 45,
    createdAt: "23/01/2024",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    preferredContact: "Email",
    specialRequirements: ["Vegetarian Options", "Outdoor Setup", "Sound System"],
    relatedServices: [
      {
        leadId: "1b",
        serviceType: "Photography",
        category: "Wedding",
      },
      {
        leadId: "1c",
        serviceType: "Decoration",
        category: "Wedding",
      },
    ],
    messages: [
      {
        id: "1",
        text: "Hi! I'm interested in your catering services for Sarah & Michael's Wedding. Could you provide more details about your availability?",
        sender: "client",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: "2",
        text: "Hello! Thank you for reaching out. I'd be happy to help with your event. Let me check our availability and get back to you with a detailed proposal.",
        sender: "vendor",
        timestamp: "10:45 AM",
        isRead: true,
      },
      {
        id: "3",
        text: "That sounds great! I'm particularly interested in the catering options and would like to discuss the menu.",
        sender: "client",
        timestamp: "11:00 AM",
        isRead: true,
      },
      {
        id: "4",
        text: "Absolutely! I can send you our menu options. Are there any dietary restrictions or special requirements I should be aware of?",
        sender: "vendor",
        timestamp: "11:15 AM",
        isRead: true,
      },
    ],
    proposals: [
      {
        id: "1",
        vendorName: "Gourmet Catering Services",
        vendorCompany: "Gourmet Catering Services",
        category: "Catering",
        totalCost: 7500,
        budget: 5000,
        status: "pending",
        rating: 4.6,
        isNew: false,
        description: "Three-course plated dinner with cocktail hour and premium bar service",
        timeline: "Setup 3 hours before service",
        validUntil: "12/11/2025",
        submitted: "01/11/2025",
        costBreakdown: [
          { item: "Cocktail Hour Appetizers", quantity: 100, unitPrice: 25, total: 2500 },
          { item: "Three-Course Plated Dinner", quantity: 100, unitPrice: 45, total: 4500 },
          { item: "Premium Bar Service", quantity: 1, unitPrice: 500, total: 500 },
        ],
        deliverables: [
          "Professional waitstaff (6 servers)",
          "Premium appetizer selection",
          "Choice of chicken, beef, or vegetarian entree",
          "Signature cocktails and wine pairing",
          "Wedding cake cutting service",
        ],
        termsAndConditions: "Menu tasting included. 48-hour final count required. Service charge and gratuity separate.",
        paymentSchedule: [
          { milestone: "Contract Signing", percentage: 25, amount: 1875, date: "07/11/2025" },
          { milestone: "Final Menu Confirmation", percentage: 75, amount: 5625, date: "16/11/2025" },
        ],
      },
    ],
  },
  // Sarah & Michael's Wedding - Photography Lead
  {
    id: "1b",
    eventId: "event-1",
    eventTitle: "Sarah & Michael's Wedding",
    clientName: "Sarah Johnson",
    description: "Full day wedding photography coverage, including ceremony, reception, and couple portraits. Looking for a photographer with experience in outdoor weddings.",
    eventDate: "15/08/2024",
    location: "Napa Valley, CA",
    price: "$3,500",
    budget: 3500,
    guests: 150,
    priority: "high",
    status: "contacted",
    matchPercentage: 92,
    dueDate: "15/01/2024",
    category: "Wedding",
    serviceType: "Photography",
    distance: 45,
    createdAt: "23/01/2024",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    preferredContact: "Email",
    specialRequirements: ["Outdoor Photography", "Golden Hour Shots", "Drone Photography"],
    relatedServices: [
      {
        leadId: "1",
        serviceType: "Catering",
        category: "Wedding",
      },
      {
        leadId: "1c",
        serviceType: "Decoration",
        category: "Wedding",
      },
    ],
    messages: [
      {
        id: "1",
        text: "Hello! We're looking for a photographer for our wedding. Do you have availability for our date?",
        sender: "client",
        timestamp: "2:00 PM",
        isRead: true,
      },
      {
        id: "2",
        text: "Hi Sarah! Yes, I'm available for your wedding date. I'd love to discuss your photography vision and package options.",
        sender: "vendor",
        timestamp: "2:30 PM",
        isRead: true,
      },
    ],
  },
  // Sarah & Michael's Wedding - Decoration Lead
  {
    id: "1c",
    eventId: "event-1",
    eventTitle: "Sarah & Michael's Wedding",
    clientName: "Sarah Johnson",
    description: "Elegant wedding decoration with floral arrangements, centerpieces, and lighting. Looking for a romantic garden theme with soft pastel colors.",
    eventDate: "15/08/2024",
    location: "Napa Valley, CA",
    price: "$5,200",
    budget: 5200,
    guests: 150,
    priority: "high",
    status: "quoted",
    matchPercentage: 88,
    dueDate: "15/01/2024",
    category: "Wedding",
    serviceType: "Decoration",
    distance: 45,
    createdAt: "23/01/2024",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    preferredContact: "Email",
    specialRequirements: ["Floral Centerpieces", "String Lights", "Garden Theme"],
    relatedServices: [
      {
        leadId: "1",
        serviceType: "Catering",
        category: "Wedding",
      },
      {
        leadId: "1b",
        serviceType: "Photography",
        category: "Wedding",
      },
    ],
    messages: [
      {
        id: "1",
        text: "Hi! We need decoration services for our wedding. Can you help with a garden-themed setup?",
        sender: "client",
        timestamp: "11:00 AM",
        isRead: true,
      },
      {
        id: "2",
        text: "Absolutely! Garden themes are our specialty. Let me prepare a quote with some design mockups for you.",
        sender: "vendor",
        timestamp: "11:30 AM",
        isRead: true,
      },
    ],
  },
  // Corporate Annual Gala - Venue Lead
  {
    id: "2",
    eventId: "event-2",
    eventTitle: "Corporate Annual Gala",
    clientName: "Elite Events Corp",
    description: "Upscale corporate event for 200 attendees, requires full AV setup and staging",
    eventDate: "20/09/2024",
    location: "San Francisco, CA",
    price: "$15,000",
    budget: 15000,
    guests: 200,
    priority: "high",
    status: "contacted",
    matchPercentage: 88,
    dueDate: "20/02/2024",
    category: "Corporate",
    serviceType: "Venue",
    distance: 25,
    createdAt: "22/01/2024",
    email: "events@elitecorp.com",
    phone: "+1 (555) 234-5678",
    relatedServices: [
      {
        leadId: "2b",
        serviceType: "Catering",
        category: "Corporate",
      },
    ],
    messages: [
      {
        id: "1",
        text: "Hello, we're planning our annual corporate gala and would like to discuss venue options.",
        sender: "client",
        timestamp: "9:00 AM",
        isRead: true,
      },
      {
        id: "2",
        text: "Great! I'd be happy to help with your corporate event. Let me show you our available spaces.",
        sender: "vendor",
        timestamp: "9:15 AM",
        isRead: true,
      },
    ],
  },
  // Corporate Annual Gala - Catering Lead
  {
    id: "2b",
    eventId: "event-2",
    eventTitle: "Corporate Annual Gala",
    clientName: "Elite Events Corp",
    description: "Premium catering service for 200 corporate guests, including cocktail reception and formal dinner",
    eventDate: "20/09/2024",
    location: "San Francisco, CA",
    price: "$12,000",
    budget: 12000,
    guests: 200,
    priority: "high",
    status: "new",
    matchPercentage: 90,
    dueDate: "20/02/2024",
    category: "Corporate",
    serviceType: "Catering",
    distance: 25,
    createdAt: "22/01/2024",
    email: "events@elitecorp.com",
    phone: "+1 (555) 234-5678",
    relatedServices: [
      {
        leadId: "2",
        serviceType: "Venue",
        category: "Corporate",
      },
    ],
    messages: [
      {
        id: "1",
        text: "We need catering for our corporate gala. Can you handle 200 guests?",
        sender: "client",
        timestamp: "10:00 AM",
        isRead: true,
      },
    ],
  },
  {
    id: "3",
    eventId: "event-3",
    eventTitle: "Johnson Family Reunion",
    clientName: "Robert Johnson",
    description: "Outdoor family gathering for 80 people, BBQ catering and tent setup needed",
    eventDate: "10/07/2024",
    location: "Sonoma County, CA",
    price: "$4,200",
    budget: 4200,
    guests: 80,
    priority: "medium",
    status: "quoted",
    matchPercentage: 75,
    dueDate: "10/01/2024",
    category: "Other",
    serviceType: "Catering",
    distance: 60,
    createdAt: "20/01/2024",
    email: "robert.j@email.com",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    eventId: "event-4",
    eventTitle: "Tech Startup Launch Party",
    clientName: "InnovateTech Solutions",
    description: "Modern tech event for 120 guests, requires modern decor and tech-friendly setup",
    eventDate: "05/06/2024",
    location: "Palo Alto, CA",
    price: "$8,500",
    budget: 8500,
    guests: 120,
    priority: "medium",
    status: "won",
    matchPercentage: 92,
    dueDate: "05/01/2024",
    category: "Corporate",
    serviceType: "Decoration",
    distance: 30,
    createdAt: "18/01/2024",
    email: "events@innovatetech.com",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "5",
    eventId: "event-5",
    eventTitle: "Charity Fundraiser Dinner",
    clientName: "Hope Foundation",
    description: "Elegant dinner event for 100 guests, requires formal table settings and service",
    eventDate: "25/05/2024",
    location: "Oakland, CA",
    price: "$6,000",
    budget: 6000,
    guests: 100,
    priority: "low",
    status: "lost",
    matchPercentage: 65,
    dueDate: "25/12/2023",
    category: "Fundraiser",
    serviceType: "Catering",
    distance: 15,
    createdAt: "15/01/2024",
    email: "fundraising@hopefoundation.org",
    phone: "+1 (555) 567-8901",
  },
  {
    id: "6",
    eventId: "event-6",
    eventTitle: "Summer Music Festival",
    clientName: "Music Festivals Inc",
    description: "Large outdoor music festival catering for 500+ attendees, multiple food stations",
    eventDate: "15/08/2024",
    location: "Santa Cruz, CA",
    price: "$25,000",
    budget: 25000,
    guests: 500,
    priority: "high",
    status: "new",
    matchPercentage: 85,
    dueDate: "15/02/2024",
    category: "Other",
    serviceType: "Catering",
    distance: 75,
    createdAt: "10/01/2024",
    email: "info@musicfestivals.com",
    phone: "+1 (555) 678-9012",
  },
  {
    id: "7",
    eventId: "event-7",
    eventTitle: "Baby Shower Celebration",
    clientName: "Emily Martinez",
    description: "Intimate baby shower for 30 guests, light refreshments and dessert table",
    eventDate: "12/04/2024",
    location: "Berkeley, CA",
    price: "$1,800",
    budget: 1800,
    guests: 30,
    priority: "low",
    status: "contacted",
    matchPercentage: 70,
    dueDate: "12/01/2024",
    category: "Baby Shower",
    serviceType: "Catering",
    distance: 10,
    createdAt: "05/01/2024",
    email: "emily.m@email.com",
    phone: "+1 (555) 789-0123",
  },
  {
    id: "8",
    eventId: "event-8",
    eventTitle: "Graduation Party",
    clientName: "David Chen",
    description: "Graduation celebration for 60 guests, buffet style catering with dessert bar",
    eventDate: "18/05/2024",
    location: "Fremont, CA",
    price: "$3,500",
    budget: 3500,
    guests: 60,
    priority: "medium",
    status: "quoted",
    matchPercentage: 80,
    dueDate: "18/02/2024",
    category: "Graduation",
    serviceType: "Catering",
    distance: 35,
    createdAt: "01/01/2024",
    email: "david.chen@email.com",
    phone: "+1 (555) 890-1234",
  },
];

