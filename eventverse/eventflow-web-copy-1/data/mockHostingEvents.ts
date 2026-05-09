import { EventLocation } from "@/components/EnhancedEventCreationDialog";
import { LocationModelType, WeatherModelType } from "@/types/general";

export interface MockHostingEvent {
  id: string;
  name?: string;
  eventName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  attendees?: number;
  status?: "draft" | "published";
  isPublic?: boolean;
  isDemo: boolean;
  selectedModules?: string[];
  eventType?: string;
  time?: string;
  // locations?: Array<{
  //   id?: string;
  //   name: string;
  //   address: string;
  //   type?: "physical" | "virtual" | "hybrid";
  //   source?: "marketplace" | "manual";
  //   vendorName?: string;
  //   capacity?: number;
  //   sections?: Array<{
  //     id: string;
  //     name: string;
  //     description?: string;
  //     capacity?: number;
  //   }>;
  // }>;
  locations?: EventLocation[];

  weather?: WeatherModelType;

  conferenceData?: {
    tracks: Array<{
      id: string;
      name: string;
      color: string;
      description: string;
    }>;
    sessions: Array<{
      id: string;
      title: string;
      description: string;
      type:
        | "keynote"
        | "session"
        | "workshop"
        | "panel"
        | "networking"
        | "break";
      trackId?: string;
      speakerNames: string[];
      date: Date;
      startTime: string;
      endTime: string;
      location: string;
      capacity: number;
      registeredCount: number;
      waitlistCount: number;
      prerequisites?: string[];
      level: "beginner" | "intermediate" | "advanced" | "all";
      tags: string[];
    }>;
  };

  createdAt?: Date;
}

export const mockHostingEvents: MockHostingEvent[] = [
  {
    id: "demo-1",
    name: "Global Tech Conference 2025",
    description:
      "Premier technology conference featuring AI innovation, business strategy, and emerging tech trends across multiple tracks and specialized sessions.",
    startDate: new Date("2025-03-15"),
    endDate: new Date("2025-03-17"),
    location: "Convention Center, San Francisco",
    attendees: 1200,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "announcements",
      "ticketing",
      "seating",
      "analytics",
      "survey",
      "media",
    ],
    eventType: "Conference",
    time: "8:00 AM",
    locations: [
      {
        id: "1",
        name: "Main Convention Hall",
        address: "123 Tech Drive, San Francisco, CA 94103",
        type: "physical",
        source: "marketplace",
        vendorName: "Premium Venues Co.",
        capacity: 800,
        sections: [
          {
            id: "1",
            name: "Main Auditorium",
            description: "Primary presentation space",
            capacity: 1200,
          },
          {
            id: "2",
            name: "Exhibition Area",
            description: "Vendor booths and demos",
            capacity: 300,
          },
        ],
      },
      {
        id: "2",
        name: "Workshop Rooms A-F",
        address: "123 Tech Drive, San Francisco, CA 94103",
        type: "physical",
        source: "marketplace",
        vendorName: "Premium Venues Co.",
      },
      {
        id: "3",
        name: "Networking Lounge",
        address: "123 Tech Drive, San Francisco, CA 94103",
        type: "physical",
        source: "manual",
      },
      {
        id: "4",
        name: "Exhibition Hall",
        address: "123 Tech Drive, San Francisco, CA 94103",
        type: "physical",
        source: "marketplace",
        vendorName: "Event Spaces Inc.",
      },
    ],
    weather: {
      temperature: 18,
      condition: "partly cloudy",
      icon: "cloud-sun",
    },
    conferenceData: {
      tracks: [
        {
          id: "ai-tech",
          name: "AI & Technology",
          color: "#3B82F6",
          description:
            "Latest in artificial intelligence and emerging technologies",
        },
        {
          id: "business",
          name: "Business Strategy",
          color: "#10B981",
          description: "Strategic insights for modern business leaders",
        },
        {
          id: "innovation",
          name: "Innovation Labs",
          color: "#F59E0B",
          description: "Hands-on workshops and experimental technologies",
        },
        {
          id: "networking",
          name: "Networking",
          color: "#8B5CF6",
          description: "Professional connections and industry meet-ups",
        },
      ],
      sessions: [
        {
          id: "keynote-1",
          title: "The Future of AI in Business",
          description:
            "Opening keynote exploring AI transformation across industries",
          type: "keynote",
          trackId: "ai-tech",
          speakerNames: ["Dr. Sarah Chen", "Marcus Rodriguez"],
          date: new Date("2025-03-15"),
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          location: "Main Hall",
          capacity: 1200,
          registeredCount: 987,
          waitlistCount: 45,
          level: "all",
          tags: ["AI", "Future", "Business"],
        },
        {
          id: "workshop-1",
          title: "Hands-on Machine Learning Workshop",
          description:
            "Interactive ML workshop with practical coding exercises",
          type: "workshop",
          trackId: "innovation",
          speakerNames: ["Dr. Alex Kim"],
          date: new Date("2025-03-15"),
          startTime: "2:00 PM",
          endTime: "4:00 PM",
          location: "Workshop Room A",
          capacity: 50,
          registeredCount: 47,
          waitlistCount: 15,
          prerequisites: ["Basic Python knowledge"],
          level: "intermediate",
          tags: ["ML", "Hands-on", "Python"],
        },
      ],
    },
  },
  {
    id: "demo-2",
    name: "Luxury Wedding Experience",
    description:
      "Complete wedding celebration with premium features including seating arrangements, budget management, and media sharing.",
    startDate: new Date("2025-06-20"),
    endDate: new Date("2025-06-22"),
    location: "Grand Estate Resort, Napa Valley",
    attendees: 180,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "rsvp",
      "seating",
      "budget",
      "media",
      "schedule",
      "announcements",
      "games",
      "survey",
    ],
    eventType: "Wedding",
    time: "4:00 PM",
    locations: [
      {
        id: "1",
        name: "Grand Estate Resort",
        address: "123 Vineyard Lane, Napa Valley, CA 94558",
        type: "physical",
        source: "marketplace",
        vendorName: "Luxury Venues Collection",
        sections: [
          {
            id: "1",
            name: "Grand Ballroom",
            description: "Main reception hall with chandelier",
            capacity: 150,
          },
          {
            id: "2",
            name: "Garden Terrace",
            description: "Outdoor ceremony space",
            capacity: 200,
          },
        ],
      },
      {
        id: "2",
        name: "Chapel of Eternal Love",
        address: "456 Sacred Grove, Napa Valley, CA 94558",
        type: "physical",
        source: "marketplace",
        vendorName: "Sacred Ceremonies",
      },
      {
        id: "3",
        name: "Reception Garden",
        address: "789 Vineyard Terrace, Napa Valley, CA 94558",
        type: "physical",
        source: "manual",
      },
    ],
    weather: {
      temperature: 24,
      condition: "sunny",
      icon: "sun",
    },
  },
  {
    id: "demo-3",
    name: "Corporate Innovation Summit",
    description:
      "Multi-day business innovation summit featuring keynote speakers, workshops, and startup showcases.",
    startDate: new Date("2025-05-12"),
    endDate: new Date("2025-05-14"),
    location: "Innovation Center, Silicon Valley",
    attendees: 450,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "announcements",
      "ticketing",
      "analytics",
      "survey",
      "media",
    ],
    eventType: "Corporate",
    time: "9:00 AM",
    locations: [
      {
        name: "Innovation Center Main Hall",
        address: "456 Tech Drive, Silicon Valley, CA 94088",
      },
      {
        name: "Executive Briefing Room",
        address: "456 Tech Drive, Silicon Valley, CA 94088",
      },
      {
        name: "Startup Showcase Area",
        address: "456 Tech Drive, Silicon Valley, CA 94088",
      },
    ],
    weather: {
      temperature: 22,
      condition: "partly cloudy",
      icon: "cloud-sun",
    },
  },
  {
    id: "demo-4",
    name: "Music Festival Extravaganza",
    description:
      "Large outdoor music festival featuring multiple stages, food vendors, and interactive experiences.",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-08-03"),
    location: "Riverside Park, Portland",
    attendees: 8000,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "ticketing",
      "schedule",
      "media",
      "announcements",
      "analytics",
      "games",
    ],
    eventType: "Festival",
    time: "12:00 PM",
    locations: [
      { name: "Main Stage", address: "456 Riverside Park, Portland, OR 97205" },
      {
        name: "Electronic Dance Stage",
        address: "456 Riverside Park, Portland, OR 97205",
      },
      { name: "Food Court", address: "456 Riverside Park, Portland, OR 97205" },
      { name: "VIP Lounge", address: "456 Riverside Park, Portland, OR 97205" },
    ],
    weather: {
      temperature: 28,
      condition: "sunny",
      icon: "sun",
    },
  },
  {
    id: "demo-5",
    name: "Charity Fundraising Gala",
    description:
      "Annual fundraising gala with dinner, auction, and entertainment for a great cause.",
    startDate: new Date("2025-10-12"),
    endDate: new Date("2025-10-12"),
    location: "Grand Ballroom, Chicago",
    attendees: 350,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "rsvp",
      "seating",
      "budget",
      "announcements",
      "analytics",
      "games",
      "survey",
      "media",
    ],
    eventType: "Charity",
    time: "7:00 PM",
    locations: [
      {
        name: "Grand Ballroom",
        address: "123 Luxury Street, Chicago, IL 60611",
      },
      {
        name: "Silent Auction Hall",
        address: "123 Luxury Street, Chicago, IL 60611",
      },
      {
        name: "VIP Reception Area",
        address: "123 Luxury Street, Chicago, IL 60611",
      },
    ],
    weather: {
      temperature: 15,
      condition: "clear",
      icon: "sun",
    },
  },
  {
    id: "demo-6",
    name: "Startup Pitch Competition",
    description:
      "Entrepreneurship event featuring startup pitches, investor panels, and networking opportunities.",
    startDate: new Date("2025-09-18"),
    endDate: new Date("2025-09-18"),
    location: "Tech Hub Convention Center, Austin",
    attendees: 300,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "ticketing",
      "announcements",
      "analytics",
      "survey",
    ],
    eventType: "Business",
    time: "1:00 PM",
    locations: [
      {
        name: "Main Presentation Hall",
        address: "123 Innovation Drive, Austin, TX 78701",
      },
      {
        name: "Investor Lounge",
        address: "123 Innovation Drive, Austin, TX 78701",
      },
      {
        name: "Networking Area",
        address: "123 Innovation Drive, Austin, TX 78701",
      },
    ],
    weather: {
      temperature: 26,
      condition: "sunny",
      icon: "sun",
    },
  },
  {
    id: "demo-7",
    name: "Food & Wine Experience",
    description:
      "Culinary festival featuring chef demonstrations, tastings, and food competitions.",
    startDate: new Date("2025-04-25"),
    endDate: new Date("2025-04-27"),
    location: "Culinary Center, San Diego",
    attendees: 600,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: ["rsvp", "schedule", "media", "budget", "survey", "games"],
    eventType: "Festival",
    time: "11:00 AM",
    locations: [
      {
        name: "Main Kitchen Stadium",
        address: "789 Culinary Lane, San Diego, CA 92101",
      },
      {
        name: "Wine Tasting Pavilion",
        address: "789 Culinary Lane, San Diego, CA 92101",
      },
      {
        name: "Chef Demo Area",
        address: "789 Culinary Lane, San Diego, CA 92101",
      },
    ],
    weather: {
      temperature: 24,
      condition: "sunny",
      icon: "sun",
    },
  },
  {
    id: "demo-8",
    name: "Art Gallery Opening Night",
    description:
      "Exclusive contemporary art exhibition opening with artist talks and wine reception.",
    startDate: new Date("2025-11-08"),
    endDate: new Date("2025-11-08"),
    location: "Metropolitan Art Gallery, New York",
    attendees: 180,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: ["rsvp", "announcements", "media", "analytics", "survey"],
    eventType: "Cultural",
    time: "6:00 PM",
    locations: [
      {
        name: "Main Gallery",
        address: "789 Culture Avenue, New York, NY 10021",
      },
      { name: "VIP Lounge", address: "789 Culture Avenue, New York, NY 10021" },
      {
        name: "Sculpture Garden",
        address: "789 Culture Avenue, New York, NY 10021",
      },
    ],
    weather: {
      temperature: 12,
      condition: "clear",
      icon: "sun",
    },
  },
  {
    id: "demo-9",
    name: "Fitness & Wellness Retreat",
    description:
      "Health-focused weekend retreat with yoga, fitness classes, and wellness workshops.",
    startDate: new Date("2025-07-11"),
    endDate: new Date("2025-07-13"),
    location: "Mountain Sanctuary, Colorado",
    attendees: 75,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: ["rsvp", "schedule", "announcements", "media", "survey"],
    eventType: "Wellness",
    time: "8:00 AM",
    locations: [
      {
        name: "Mountain Lodge",
        address: "456 Peaceful Valley, Colorado, CO 80424",
      },
      {
        name: "Yoga Pavilion",
        address: "456 Peaceful Valley, Colorado, CO 80424",
      },
      {
        name: "Meditation Garden",
        address: "456 Peaceful Valley, Colorado, CO 80424",
      },
    ],
    weather: {
      temperature: 18,
      condition: "clear",
      icon: "sun",
    },
  },
  {
    id: "demo-10",
    name: "Gaming Tournament Championship",
    description:
      "Esports competition featuring multiple game categories, streaming, and prizes.",
    startDate: new Date("2025-12-05"),
    endDate: new Date("2025-12-07"),
    location: "Gaming Arena, Boston",
    attendees: 500,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "ticketing",
      "schedule",
      "games",
      "announcements",
      "analytics",
      "media",
    ],
    eventType: "Gaming",
    time: "10:00 AM",
    locations: [
      {
        name: "Main Gaming Arena",
        address: "123 Gamer Street, Boston, MA 02101",
      },
      {
        name: "Tournament Stage",
        address: "123 Gamer Street, Boston, MA 02101",
      },
      {
        name: "Streaming Booth",
        address: "123 Gamer Street, Boston, MA 02101",
      },
    ],
    weather: {
      temperature: 2,
      condition: "snowy",
      icon: "cloud-snow",
    },
  },
  // ADVANCED CONFERENCE EVENTS WITH SOPHISTICATED SCHEDULING
  {
    id: "conf-1",
    name: "International AI Research Symposium 2025",
    description:
      "Multi-location academic conference spanning university campus with 8 specialized tracks, 150+ sessions, prerequisite dependencies, and certification pathways.",
    startDate: new Date("2025-04-20"),
    endDate: new Date("2025-04-23"),
    location: "Stanford University Campus, Palo Alto",
    attendees: 2500,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "announcements",
      "ticketing",
      "seating",
      "analytics",
      "survey",
      "media",
      "rsvp",
    ],
    eventType: "Conference",
    time: "8:00 AM",
    locations: [
      {
        name: "Memorial Auditorium",
        address: "450 Jane Stanford Way, Stanford, CA 94305",
      },
      {
        name: "Computer Science Building",
        address: "353 Jane Stanford Way, Stanford, CA 94305",
      },
      {
        name: "Medical School Auditorium",
        address: "291 Campus Drive, Stanford, CA 94305",
      },
      {
        name: "Engineering Quad",
        address: "450 Jane Stanford Way, Stanford, CA 94305",
      },
      {
        name: "Business School Conference Center",
        address: "655 Knight Way, Stanford, CA 94305",
      },
      {
        name: "Innovation Lab",
        address: "318 Campus Drive, Stanford, CA 94305",
      },
    ],
    weather: {
      temperature: 20,
      condition: "partly cloudy",
      icon: "cloud-sun",
    },
    conferenceData: {
      tracks: [
        {
          id: "ai-theory",
          name: "AI Theory & Foundations",
          color: "#3B82F6",
          description: "Theoretical advances in artificial intelligence",
        },
        {
          id: "ml-practice",
          name: "Machine Learning in Practice",
          color: "#10B981",
          description: "Real-world ML applications and case studies",
        },
        {
          id: "nlp-speech",
          name: "NLP & Speech Processing",
          color: "#F59E0B",
          description: "Language models and speech technologies",
        },
        {
          id: "computer-vision",
          name: "Computer Vision & Robotics",
          color: "#8B5CF6",
          description: "Visual AI and robotic systems",
        },
        {
          id: "ethics-ai",
          name: "AI Ethics & Society",
          color: "#EF4444",
          description: "Responsible AI development and deployment",
        },
        {
          id: "quantum-ai",
          name: "Quantum Computing & AI",
          color: "#06B6D4",
          description: "Intersection of quantum computing and AI",
        },
        {
          id: "startup-track",
          name: "AI Entrepreneurship",
          color: "#F97316",
          description: "Building AI startups and commercialization",
        },
        {
          id: "healthcare-ai",
          name: "AI in Healthcare",
          color: "#84CC16",
          description: "Medical AI applications and research",
        },
      ],
      sessions: [
        {
          id: "keynote-opening",
          title: "The Future of AGI: Challenges and Opportunities",
          description:
            "Opening keynote exploring the path toward artificial general intelligence",
          type: "keynote",
          trackId: "ai-theory",
          speakerNames: ["Dr. Fei-Fei Li", "Prof. Stuart Russell"],
          date: new Date("2025-04-20"),
          startTime: "9:00 AM",
          endTime: "10:30 AM",
          location: "Memorial Auditorium - Main Hall",
          capacity: 2500,
          registeredCount: 2400,
          waitlistCount: 250,
          level: "all",
          tags: ["AGI", "Future", "Ethics"],
        },
        {
          id: "workshop-advanced-rl",
          title: "Advanced Reinforcement Learning Workshop",
          description:
            "Hands-on workshop covering latest RL algorithms with coding exercises",
          type: "workshop",
          trackId: "ml-practice",
          speakerNames: ["Dr. Chelsea Finn", "Dr. Sergey Levine"],
          date: new Date("2025-04-20"),
          startTime: "2:00 PM",
          endTime: "5:00 PM",
          location: "Computer Science Building - Room 101",
          capacity: 80,
          registeredCount: 78,
          waitlistCount: 45,
          prerequisites: [
            "Basic ML knowledge",
            "Python programming",
            "Linear algebra",
          ],
          level: "advanced",
          tags: ["RL", "Hands-on", "Advanced"],
        },
        {
          id: "panel-ai-ethics",
          title: "AI Ethics in Practice: Industry Perspectives",
          description:
            "Panel discussion on implementing ethical AI practices in industry",
          type: "panel",
          trackId: "ethics-ai",
          speakerNames: [
            "Timnit Gebru",
            "Cynthia Breazeal",
            "Joanna Bryson",
            "Kate Crawford",
          ],
          date: new Date("2025-04-21"),
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          location: "Engineering Quad - Outdoor Pavilion",
          capacity: 500,
          registeredCount: 485,
          waitlistCount: 120,
          level: "all",
          tags: ["Ethics", "Industry", "Panel"],
        },
        {
          id: "session-quantum-ml",
          title: "Quantum Machine Learning Algorithms",
          description:
            "Technical session on quantum algorithms for machine learning",
          type: "session",
          trackId: "quantum-ai",
          speakerNames: ["Dr. John Preskill", "Dr. Maria Schuld"],
          date: new Date("2025-04-22"),
          startTime: "3:30 PM",
          endTime: "4:30 PM",
          location: "Innovation Lab - Quantum Computing Center",
          capacity: 120,
          registeredCount: 95,
          waitlistCount: 25,
          prerequisites: ["Quantum computing basics", "Linear algebra"],
          level: "advanced",
          tags: ["Quantum", "Algorithms", "Theory"],
        },
        {
          id: "networking-startup",
          title: "AI Entrepreneur Mixer",
          description: "Networking session for AI entrepreneurs and investors",
          type: "networking",
          trackId: "startup-track",
          speakerNames: [],
          date: new Date("2025-04-22"),
          startTime: "7:00 PM",
          endTime: "9:00 PM",
          location: "Business School Conference Center - Reception Hall",
          capacity: 300,
          registeredCount: 275,
          waitlistCount: 50,
          level: "all",
          tags: ["Networking", "Startup", "Investment"],
        },
      ],
    },
  },
  {
    id: "conf-2",
    name: "Global Healthcare Innovation Summit",
    description:
      "Multi-city hybrid conference with hospital venues, medical specialization tracks, CME credits, and certification workflows across 5 different medical centers.",
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-06-18"),
    location: "Mayo Clinic Campus, Rochester",
    attendees: 1800,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "announcements",
      "ticketing",
      "analytics",
      "survey",
      "media",
    ],
    eventType: "Conference",
    time: "7:30 AM",
    locations: [
      {
        name: "Mayo Clinic Main Hospital",
        address: "200 First St SW, Rochester, MN 55905",
      },
      {
        name: "Mayo Clinic Research Building",
        address: "200 First St SW, Rochester, MN 55905",
      },
      {
        name: "Hilton Rochester Conference Center",
        address: "101 1st Ave SW, Rochester, MN 55902",
      },
      {
        name: "Mayo Clinic Simulation Center",
        address: "200 First St SW, Rochester, MN 55905",
      },
      {
        name: "Virtual Auditorium Hub",
        address: "Remote participation via secure platform",
      },
    ],
    weather: {
      temperature: 22,
      condition: "sunny",
      icon: "sun",
    },
    conferenceData: {
      tracks: [
        {
          id: "cardiology",
          name: "Cardiology & Heart Surgery",
          color: "#DC2626",
          description:
            "Latest in cardiovascular medicine and surgical techniques",
        },
        {
          id: "oncology",
          name: "Oncology & Cancer Research",
          color: "#7C3AED",
          description:
            "Cancer treatment innovations and research breakthroughs",
        },
        {
          id: "neurology",
          name: "Neurology & Brain Sciences",
          color: "#059669",
          description: "Neurological disorders and brain research advances",
        },
        {
          id: "digital-health",
          name: "Digital Health & AI",
          color: "#2563EB",
          description: "Technology integration in healthcare delivery",
        },
        {
          id: "pediatrics",
          name: "Pediatric Medicine",
          color: "#EA580C",
          description: "Child healthcare and developmental medicine",
        },
        {
          id: "surgery-innovation",
          name: "Surgical Innovation",
          color: "#0891B2",
          description: "Minimally invasive and robotic surgery techniques",
        },
      ],
      sessions: [
        {
          id: "cme-cardiology-1",
          title: "Advanced Cardiac Catheterization Techniques",
          description:
            "CME Session: Latest interventional cardiology procedures (3.5 CME Credits)",
          type: "session",
          trackId: "cardiology",
          speakerNames: ["Dr. Charanjit Rihal", "Dr. Amir Lerman"],
          date: new Date("2025-06-15"),
          startTime: "9:00 AM",
          endTime: "12:30 PM",
          location: "Mayo Clinic Main Hospital - Catheterization Lab Demo",
          capacity: 60,
          registeredCount: 58,
          waitlistCount: 25,
          prerequisites: [
            "Board certification in Cardiology",
            "Active medical license",
          ],
          level: "advanced",
          tags: ["CME", "Cardiology", "Interventional", "3.5 Credits"],
        },
        {
          id: "ai-diagnosis-workshop",
          title: "AI-Powered Diagnostic Tools Workshop",
          description:
            "Hands-on training with AI diagnostic software and imaging analysis",
          type: "workshop",
          trackId: "digital-health",
          speakerNames: ["Dr. Bradley Erickson", "Dr. Panagiotis Korfiatis"],
          date: new Date("2025-06-16"),
          startTime: "2:00 PM",
          endTime: "5:00 PM",
          location: "Mayo Clinic Research Building - AI Lab",
          capacity: 40,
          registeredCount: 38,
          waitlistCount: 15,
          prerequisites: ["Basic radiology knowledge", "Computer literacy"],
          level: "intermediate",
          tags: ["AI", "Diagnostics", "Hands-on", "Imaging"],
        },
        {
          id: "hybrid-surgery-demo",
          title: "Live Robotic Surgery Demonstration",
          description:
            "Live surgical demonstration with remote participation options",
          type: "session",
          trackId: "surgery-innovation",
          speakerNames: ["Dr. Michael Kendrick", "Dr. David Farley"],
          date: new Date("2025-06-17"),
          startTime: "10:00 AM",
          endTime: "11:30 AM",
          location:
            "Mayo Clinic Main Hospital - OR Suite 12 (Live Stream to Conference Center)",
          capacity: 200,
          registeredCount: 195,
          waitlistCount: 80,
          level: "all",
          tags: ["Surgery", "Robotics", "Live Demo", "Remote Access"],
        },
      ],
    },
  },
  {
    id: "conf-3",
    name: "International Business Strategy Conference",
    description:
      "Multi-continental hybrid business conference with time zone coordination, language-specific sessions, and industry vertical tracks across major business hubs.",
    startDate: new Date("2025-09-08"),
    endDate: new Date("2025-09-11"),
    location: "World Trade Center, New York",
    attendees: 3200,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "announcements",
      "ticketing",
      "seating",
      "analytics",
      "survey",
      "media",
    ],
    eventType: "Conference",
    time: "8:00 AM",
    locations: [
      {
        name: "World Trade Center - Main Conference Hall",
        address: "285 Fulton St, New York, NY 10007",
      },
      {
        name: "Wall Street Financial Center",
        address: "28 Liberty St, New York, NY 10005",
      },
      {
        name: "London Business Hub (Remote)",
        address: "Virtual participation from London, UK",
      },
      {
        name: "Singapore Finance Center (Remote)",
        address: "Virtual participation from Singapore",
      },
      {
        name: "Tokyo Executive Center (Remote)",
        address: "Virtual participation from Tokyo, Japan",
      },
      {
        name: "Frankfurt Business District (Remote)",
        address: "Virtual participation from Frankfurt, Germany",
      },
    ],
    weather: {
      temperature: 24,
      condition: "clear",
      icon: "sun",
    },
    conferenceData: {
      tracks: [
        {
          id: "global-strategy",
          name: "Global Business Strategy",
          color: "#1E40AF",
          description: "International market expansion and global operations",
        },
        {
          id: "fintech-innovation",
          name: "FinTech & Financial Innovation",
          color: "#059669",
          description: "Digital transformation in financial services",
        },
        {
          id: "supply-chain",
          name: "Supply Chain Optimization",
          color: "#DC2626",
          description: "Global supply chain management and logistics",
        },
        {
          id: "esg-sustainability",
          name: "ESG & Sustainability",
          color: "#16A34A",
          description: "Environmental, social, and governance strategies",
        },
        {
          id: "digital-transformation",
          name: "Digital Transformation",
          color: "#7C3AED",
          description: "Technology adoption and digital business models",
        },
        {
          id: "emerging-markets",
          name: "Emerging Markets",
          color: "#EA580C",
          description: "Growth opportunities in developing economies",
        },
      ],
      sessions: [
        {
          id: "global-keynote",
          title: "The Future of Global Commerce",
          description:
            "Multi-location keynote with CEOs from major corporations across time zones",
          type: "keynote",
          trackId: "global-strategy",
          speakerNames: [
            "Satya Nadella (Seattle)",
            "Hiroshi Mikitani (Tokyo)",
            "Leena Nair (London)",
          ],
          date: new Date("2025-09-08"),
          startTime: "9:00 AM",
          endTime: "10:30 AM",
          location: "World Trade Center - Main Hall (Global Broadcast)",
          capacity: 3200,
          registeredCount: 3150,
          waitlistCount: 400,
          level: "all",
          tags: ["Global", "Leadership", "Multi-timezone", "Broadcast"],
        },
        {
          id: "fintech-panel-multilang",
          title: "FinTech Regulation Panel (English/Mandarin/German)",
          description:
            "Multi-language panel on global FinTech regulations with real-time translation",
          type: "panel",
          trackId: "fintech-innovation",
          speakerNames: [
            "Christine Lagarde",
            "Dr. Li Wei",
            "Andreas Dombret",
            "Gary Gensler",
          ],
          date: new Date("2025-09-09"),
          startTime: "2:00 PM",
          endTime: "3:30 PM",
          location: "Wall Street Financial Center + Remote Hubs",
          capacity: 800,
          registeredCount: 750,
          waitlistCount: 200,
          level: "intermediate",
          tags: ["FinTech", "Regulation", "Multi-language", "Global Policy"],
        },
        {
          id: "supply-chain-workshop",
          title: "Crisis-Resilient Supply Chain Design",
          description:
            "Interactive workshop on building resilient global supply chains",
          type: "workshop",
          trackId: "supply-chain",
          speakerNames: ["Dr. Yossi Sheffi", "Prof. Martin Christopher"],
          date: new Date("2025-09-10"),
          startTime: "10:00 AM",
          endTime: "1:00 PM",
          location: "World Trade Center - Workshop Room A",
          capacity: 120,
          registeredCount: 115,
          waitlistCount: 60,
          prerequisites: [
            "Supply chain management experience",
            "Business operations knowledge",
          ],
          level: "advanced",
          tags: ["Supply Chain", "Risk Management", "Interactive", "Strategy"],
        },
      ],
    },
  },
  {
    id: "conf-4",
    name: "EdTech Innovation & Learning Sciences Conference",
    description:
      "Education technology conference with multiple university campus locations, teacher certification tracks, hands-on learning labs, and K-12 to higher education sessions.",
    startDate: new Date("2025-07-28"),
    endDate: new Date("2025-07-31"),
    location: "MIT Campus, Cambridge",
    attendees: 1600,
    status: "published",
    isPublic: true,
    isDemo: true,
    selectedModules: [
      "schedule",
      "announcements",
      "ticketing",
      "analytics",
      "survey",
      "media",
      "games",
    ],
    eventType: "Conference",
    time: "8:30 AM",
    locations: [
      {
        name: "MIT Stata Center",
        address: "32 Vassar St, Cambridge, MA 02139",
      },
      { name: "MIT Media Lab", address: "75 Amherst St, Cambridge, MA 02139" },
      {
        name: "Harvard Graduate School of Education",
        address: "13 Appian Way, Cambridge, MA 02138",
      },
      {
        name: "Boston Public Library - Innovation Lab",
        address: "700 Boylston St, Boston, MA 02116",
      },
      {
        name: "Kendall Square Innovation District",
        address: "1 Broadway, Cambridge, MA 02142",
      },
    ],
    weather: {
      temperature: 26,
      condition: "partly cloudy",
      icon: "cloud-sun",
    },
    conferenceData: {
      tracks: [
        {
          id: "k12-innovation",
          name: "K-12 Educational Innovation",
          color: "#F59E0B",
          description:
            "Elementary and secondary education technology solutions",
        },
        {
          id: "higher-ed-tech",
          name: "Higher Education Technology",
          color: "#3B82F6",
          description: "University and college educational technology",
        },
        {
          id: "learning-sciences",
          name: "Learning Sciences Research",
          color: "#10B981",
          description: "Cognitive science and educational psychology research",
        },
        {
          id: "ai-education",
          name: "AI in Education",
          color: "#8B5CF6",
          description: "Artificial intelligence applications in learning",
        },
        {
          id: "accessibility-inclusion",
          name: "Accessibility & Inclusion",
          color: "#EF4444",
          description: "Inclusive design and accessible learning technologies",
        },
        {
          id: "teacher-development",
          name: "Professional Development",
          color: "#06B6D4",
          description: "Teacher training and educator skill development",
        },
      ],
      sessions: [
        {
          id: "ai-tutoring-systems",
          title: "Building Intelligent Tutoring Systems",
          description:
            "Technical session on developing AI-powered personalized learning systems",
          type: "session",
          trackId: "ai-education",
          speakerNames: [
            "Dr. Rose Luckin",
            "Prof. Ryan Baker",
            "Dr. Mingyu Feng",
          ],
          date: new Date("2025-07-28"),
          startTime: "11:00 AM",
          endTime: "12:30 PM",
          location: "MIT Media Lab - Learning Lab",
          capacity: 150,
          registeredCount: 140,
          waitlistCount: 35,
          prerequisites: [
            "Basic programming knowledge",
            "Understanding of learning theory",
          ],
          level: "intermediate",
          tags: ["AI", "Tutoring", "Personalization", "Technical"],
        },
        {
          id: "inclusive-design-workshop",
          title: "Universal Design for Learning Workshop",
          description:
            "Hands-on workshop creating inclusive educational experiences",
          type: "workshop",
          trackId: "accessibility-inclusion",
          speakerNames: ["Dr. Kavita Rao", "Prof. David Rose"],
          date: new Date("2025-07-29"),
          startTime: "9:00 AM",
          endTime: "12:00 PM",
          location: "Harvard Graduate School of Education - Design Studio",
          capacity: 80,
          registeredCount: 75,
          waitlistCount: 25,
          level: "all",
          tags: ["UDL", "Accessibility", "Inclusive Design", "Hands-on"],
        },
        {
          id: "teacher-certification-track",
          title: "EdTech Integration Certification Program",
          description:
            "Multi-session certification program for K-12 educators (12 CEU Credits)",
          type: "workshop",
          trackId: "teacher-development",
          speakerNames: ["Dr. Tanya Beardsley", "Prof. Matthew Koehler"],
          date: new Date("2025-07-30"),
          startTime: "1:00 PM",
          endTime: "5:00 PM",
          location: "Boston Public Library - Innovation Lab",
          capacity: 60,
          registeredCount: 58,
          waitlistCount: 40,
          prerequisites: [
            "Current teaching license",
            "Basic technology skills",
          ],
          level: "intermediate",
          tags: ["Certification", "CEU Credits", "K-12", "Integration"],
        },
      ],
    },
  },
  // DRAFT EVENTS - New section for unpublished events (keeping original draft events)
  {
    id: "draft-1",
    name: "Team Building Retreat",
    description:
      "Annual company retreat with team building activities, workshops, and networking sessions.",
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 6+ weeks
    endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000),
    location: "Mountain Lodge Resort, Colorado",
    attendees: 85,
    status: "draft",
    isPublic: false,
    isDemo: true,
    selectedModules: ["schedule", "announcements", "rsvp", "games"],
    eventType: "Corporate",
    time: "9:00 AM",
    locations: [
      {
        name: "Mountain Lodge Resort",
        address: "789 Mountain View, Colorado, CO 80424",
      },
      {
        name: "Conference Center",
        address: "789 Mountain View, Colorado, CO 80424",
      },
    ],
    weather: {
      temperature: 8,
      condition: "clear",
      icon: "sun",
    },
  },
];
