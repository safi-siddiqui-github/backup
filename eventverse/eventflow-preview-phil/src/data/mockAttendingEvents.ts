export interface MockAttendingEvent {
  id: string;
  eventName: string;
  eventType: string;
  category: string;
  subcategory?: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  time: string;
  locations: Array<{ name: string; address: string }>;
  hostId: string;
  hostName: string;
  hostRating: number;
  attendeeCount: number;
  maxCapacity: number;
  ticketPrice: number;
  currency: string;
  tags: string[];
  image: string;
  featured?: boolean;
  format: string;
  isPublic: boolean;
  ticketDetails?: {
    quantity: number;
    type: string;
    ticketNumbers: string[];
    qrCode: string;
    purchaseDate: string;
    totalPaid: number;
    checkedIn: boolean;
    checkInTime?: string;
  };
  moduleUsage: {
    rsvp: { status: 'confirmed' | 'pending' | 'declined' | 'attending'; responses?: any };
    seating: { tableNumber?: number; seatNumber?: string; assignment?: string };
    media: { photosUploaded: number; albumAccess: boolean };
    games: { participated: string[]; points: number; rank?: number };
    surveys: { completed: string[]; pending: string[] };
  };
  accessInfo?: {
    entryCode: string;
    vipAccess: boolean;
    specialPerks: string[];
    notifications: number;
  };
  // Legacy properties for compatibility
  name?: string;
  organizer?: string;
  status?: 'registered' | 'pending' | 'waitlisted' | 'cancelled';
  rsvpStatus?: 'attending' | 'not-attending' | 'maybe';
  ticketType?: string;
  paymentStatus?: 'paid' | 'pending' | 'free';
  availableModules?: string[];
  location?: string;
  weather?: {
    temperature: number;
    condition: string;
    icon: string;
  };
  conferenceData?: {
    tracks: Array<{
      id: string;
      name: string;
      color: string;
      description: string;
    }>;
    registeredSessions: string[];
    waitlistedSessions: string[];
  };
}

export const mockAttendingEvents: MockAttendingEvent[] = [
  // 🎯 JUDE ATTENDING - Dedicated test event with all 13 modules
  {
    id: 'jude-attending',
    eventName: '🎯 Jude Attending - Complete Module Showcase',
    eventType: 'Conference',
    category: 'Technology & Business',
    subcategory: 'Full Stack Showcase Event',
    description: 'This is Jude\'s dedicated testing event showcasing ALL 13 guest modules with comprehensive functionality. Perfect for testing and demonstrating the complete guest experience including RSVP, Ticketing, Announcements, Schedule, Seating, Photos, Travel, Games, Surveys, Networking, Food & Dining, and Merchandise.',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    time: '9:00 AM - 6:00 PM (Multi-day)',
    locations: [
      { name: "Grand Convention Center", address: "123 Tech Boulevard, San Francisco, CA 94102" },
      { name: "Networking Lounge", address: "123 Tech Boulevard, San Francisco, CA 94102" },
      { name: "Exhibition Hall", address: "123 Tech Boulevard, San Francisco, CA 94102" }
    ],
    hostId: 'jude-host',
    hostName: 'Jude Test Host',
    hostRating: 5.0,
    attendeeCount: 250,
    maxCapacity: 300,
    ticketPrice: 499,
    currency: 'USD',
    tags: ['Testing', 'All Modules', 'Conference', 'Technology', 'Networking'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    featured: true,
    format: 'Multi-day In-Person',
    isPublic: false,
    ticketDetails: {
      quantity: 3,
      type: 'VIP Platinum Pass',
      ticketNumbers: ['JUDE-VIP-001', 'JUDE-VIP-002', 'JUDE-VIP-003'],
      qrCode: 'JUDE-QR-VIP-PLATINUM-2024',
      purchaseDate: '2024-12-15',
      totalPaid: 1497,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { 
        status: 'confirmed',
        responses: {
          mealChoice: 'Grilled Salmon with Herbs',
          dietaryRestrictions: 'No shellfish',
          plusOnes: 2,
          specialRequests: 'Window seating preferred',
          submittedAt: '2024-12-18T10:30:00Z'
        }
      },
      seating: { 
        tableNumber: 1, 
        seatNumber: 'A1', 
        assignment: 'VIP Front Row - Table 1, Seat A1' 
      },
      media: { 
        photosUploaded: 47, 
        albumAccess: true 
      },
      games: { 
        participated: ['networking-bingo', 'trivia-challenge', 'scavenger-hunt'],
        points: 4850,
        rank: 1
      },
      surveys: { 
        completed: ['pre-event-survey', 'day-1-feedback', 'session-ratings'],
        pending: ['day-2-feedback', 'final-event-survey']
      }
    },
    accessInfo: {
      entryCode: 'JUDE-VIP-2024',
      vipAccess: true,
      specialPerks: [
        'VIP Lounge Access',
        'Priority Seating',
        'Complimentary Meals',
        'Networking Sessions',
        'Exclusive Swag Bag',
        'Meet & Greet with Speakers'
      ],
      notifications: 12
    },
    conferenceData: {
      tracks: [
        { id: "tech-1", name: "Advanced Technologies", color: "#3B82F6", description: "Cutting-edge tech innovations" },
        { id: "business-1", name: "Business Strategy", color: "#10B981", description: "Strategic business approaches" },
        { id: "innovation-1", name: "Innovation & Design", color: "#F59E0B", description: "Creative innovation methods" }
      ],
      registeredSessions: ['keynote-1', 'workshop-1', 'panel-discussion-1', 'networking-session'],
      waitlistedSessions: []
    }
  },
  // ⭐ TEST EVENT - Easy to find showcase for all new features
  {
    id: 'test-showcase-event',
    eventName: '⭐ TEST EVENT - Guest Module Showcase',
    eventType: 'Test Event',
    category: 'Testing',
    subcategory: 'Showcase',
    description: '🎯 TESTING EVENT: This is your dedicated test event to showcase all guest module features including announcements, ticketing, RSVP, seating, media, games, surveys, and more. Use this event to test all changes.',
    startDate: new Date('2025-12-01'),
    endDate: new Date('2025-12-03'),
    time: '9:00 AM',
    locations: [
      { name: "Test Convention Center", address: "123 Test Street, Test City, TS 12345" },
      { name: "Test Networking Hall", address: "123 Test Street, Test City, TS 12345" }
    ],
    hostId: 'test-host',
    hostName: 'Test Event Organizer',
    hostRating: 5.0,
    attendeeCount: 500,
    maxCapacity: 1000,
    ticketPrice: 299,
    currency: 'USD',
    tags: ['Test', 'Showcase', 'All Features', 'Development'],
    image: '/placeholder.svg',
    featured: true,
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 4,
      type: 'VIP All-Access',
      ticketNumbers: ['TEST-TKT-001', 'TEST-TKT-002', 'TEST-TKT-003', 'TEST-TKT-004'],
      qrCode: 'QR-TEST-2025-001',
      purchaseDate: '2025-01-15',
      totalPaid: 1196,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { 
        status: 'confirmed',
        responses: { 
          plusOnes: 1, 
          dietaryRestrictions: 'No restrictions',
          specialRequests: 'Window seat preferred',
          shirtSize: 'M'
        }
      },
      seating: { 
        tableNumber: 5, 
        seatNumber: 'A1',
        assignment: 'VIP Section - Table 5, Seat A1'
      },
      media: { 
        photosUploaded: 15,
        albumAccess: true
      },
      games: { 
        participated: ['test-trivia', 'test-challenge'],
        points: 1500,
        rank: 8
      },
      surveys: { 
        completed: ['test-survey-1'],
        pending: ['test-feedback', 'test-experience']
      }
    },
    accessInfo: {
      entryCode: 'TEST2025',
      vipAccess: true,
      specialPerks: ['VIP Access', 'Premium Swag', 'Meet & Greet'],
      notifications: 5
    },
    conferenceData: {
      tracks: [
        { id: "test-track-1", name: "Test Track 1", color: "#3B82F6", description: "Testing features" },
        { id: "test-track-2", name: "Test Track 2", color: "#10B981", description: "Quality assurance" }
      ],
      registeredSessions: ['session-1', 'session-2', 'session-3'],
      waitlistedSessions: []
    }
  },
  // SHOWCASE EVENT - Comprehensive example with all features
  {
    id: 'attend-showcase',
    eventName: 'Innovation Summit 2025 - Complete Experience',
    eventType: 'Conference',
    category: 'Technology',
    subcategory: 'Innovation',
    description: 'The ultimate showcase event featuring all available modules and interactions. Experience everything from multi-ticket management to interactive seating, comprehensive media galleries, surveys, games, and real-time announcements.',
    startDate: new Date('2025-06-15'),
    endDate: new Date('2025-06-17'),
    time: '8:00 AM',
    locations: [
      { name: "Grand Innovation Center", address: "1000 Tech Boulevard, San Francisco, CA 94105" },
      { name: "Networking Lounge", address: "1000 Tech Boulevard, San Francisco, CA 94105" },
      { name: "Exhibition Hall", address: "1000 Tech Boulevard, San Francisco, CA 94105" },
      { name: "VIP Pavilion", address: "1000 Tech Boulevard, San Francisco, CA 94105" }
    ],
    hostId: 'host-showcase',
    hostName: 'Innovation Collective',
    hostRating: 5.0,
    attendeeCount: 1500,
    maxCapacity: 2000,
    ticketPrice: 499,
    currency: 'USD',
    tags: ['Innovation', 'Technology', 'Showcase', 'Multi-Day', 'Featured'],
    image: '/placeholder.svg',
    featured: true,
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 3,
      type: 'Premium All-Access Pass',
      ticketNumbers: ['TKT-SHOW-001', 'TKT-SHOW-002', 'TKT-SHOW-003'],
      qrCode: 'QR-SHOWCASE2025-001',
      purchaseDate: '2024-12-15',
      totalPaid: 1497,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { 
        status: 'confirmed',
        responses: { 
          plusOnes: 2, 
          dietaryRestrictions: 'Gluten-free, Vegetarian',
          specialRequests: 'Accessible seating required',
          shirtSize: 'L'
        }
      },
      seating: { 
        tableNumber: 8, 
        seatNumber: 'B5',
        assignment: 'VIP Section - Table 8, Seat B5'
      },
      media: { 
        photosUploaded: 24,
        albumAccess: true
      },
      games: { 
        participated: ['innovation-trivia', 'networking-challenge', 'tech-quiz'],
        points: 2850,
        rank: 12
      },
      surveys: { 
        completed: ['pre-event-survey'],
        pending: ['session-feedback-day1', 'networking-experience', 'speaker-evaluation']
      }
    },
    accessInfo: {
      entryCode: 'INNOVATE2025',
      vipAccess: true,
      specialPerks: ['VIP Lounge Access', 'Premium Swag Bag', 'Meet & Greet Pass', 'Free Parking', 'Priority Seating'],
      notifications: 8
    },
    conferenceData: {
      tracks: [
        { id: "ai-future", name: "AI & Future Tech", color: "#3B82F6", description: "Exploring the future of artificial intelligence" },
        { id: "sustainability", name: "Sustainable Innovation", color: "#10B981", description: "Green tech and sustainable practices" },
        { id: "leadership", name: "Tech Leadership", color: "#F59E0B", description: "Leading teams in the digital age" },
        { id: "blockchain", name: "Web3 & Blockchain", color: "#8B5CF6", description: "Decentralized technologies" }
      ],
      registeredSessions: [
        'keynote-opening', 
        'workshop-ai-ethics', 
        'panel-sustainability',
        'masterclass-leadership',
        'demo-blockchain-apps'
      ],
      waitlistedSessions: ['vip-dinner-keynote']
    }
  },
  {
    id: 'attend-1',
    eventName: 'AI & Innovation Conference 2025',
    eventType: 'Conference',
    category: 'Technology',
    subcategory: 'Artificial Intelligence',
    description: 'Join industry leaders for cutting-edge AI presentations, workshops, and networking opportunities.',
    startDate: new Date('2025-04-10'),
    endDate: new Date('2025-04-12'),
    time: '8:30 AM',
    locations: [
      { name: "Main Conference Hall", address: "456 Innovation Drive, Austin, TX 78701" },
      { name: "Workshop Rooms", address: "456 Innovation Drive, Austin, TX 78701" },
      { name: "Networking Lounge", address: "456 Innovation Drive, Austin, TX 78701" }
    ],
    hostId: 'host-1',
    hostName: 'TechVentures Inc.',
    hostRating: 4.8,
    attendeeCount: 850,
    maxCapacity: 1000,
    ticketPrice: 299,
    currency: 'USD',
    tags: ['AI', 'Technology', 'Innovation', 'Networking'],
    image: '/placeholder.svg',
    featured: true,
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: 'Premium Pass',
      ticketNumbers: ['TKT-001'],
      qrCode: 'QR-AI2025-001',
      purchaseDate: '2024-12-01',
      totalPaid: 299,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'attending' },
      seating: { tableNumber: 12, seatNumber: 'A3' },
      media: { photosUploaded: 0, albumAccess: false },
      games: { participated: [], points: 0 },
      surveys: { completed: [], pending: [] }
    },
    conferenceData: {
      tracks: [
        { id: "ai-ml", name: "AI & Machine Learning", color: "#3B82F6", description: "Latest in AI and ML technologies" },
        { id: "startup", name: "Startup Ecosystem", color: "#10B981", description: "Building and scaling startups" },
        { id: "future-tech", name: "Future Technologies", color: "#F59E0B", description: "Emerging tech trends" }
      ],
      registeredSessions: ["keynote-ai", "workshop-ml", "panel-startup"],
      waitlistedSessions: ["workshop-blockchain"]
    }
  },
  {
    id: 'attend-2',
    eventName: 'Emma & James Wedding Celebration',
    eventType: 'Wedding',
    category: 'Personal',
    subcategory: 'Wedding',
    description: 'Join us for a beautiful wedding celebration with dinner, dancing, and unforgettable memories.',
    startDate: new Date('2025-07-15'),
    endDate: new Date('2025-07-15'),
    time: '4:30 PM',
    locations: [
      { name: "Seaside Chapel", address: "789 Ocean View Drive, Monterey, CA 93940" },
      { name: "Reception Pavilion", address: "789 Ocean View Drive, Monterey, CA 93940" }
    ],
    hostId: 'host-2',
    hostName: 'Emma Johnson & James Smith',
    hostRating: 5.0,
    attendeeCount: 120,
    maxCapacity: 150,
    ticketPrice: 0,
    currency: 'USD',
    tags: ['Wedding', 'Celebration', 'Family', 'Evening'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: false,
    moduleUsage: {
      rsvp: { status: 'attending', responses: { plusOnes: 1, dietaryRestrictions: 'Vegetarian' } },
      seating: {},
      media: { photosUploaded: 0, albumAccess: true },
      games: { participated: [], points: 0 },
      surveys: { completed: [], pending: [] }
    }
  },
  {
    id: 'attend-3',
    eventName: 'Business Leadership Summit',
    eventType: 'Corporate',
    category: 'Business',
    subcategory: 'Professional Development',
    description: 'Professional development summit focused on modern leadership strategies and executive skills.',
    startDate: new Date('2025-05-08'),
    endDate: new Date('2025-05-09'),
    time: '9:00 AM',
    locations: [
      { name: "Executive Conference Room", address: "123 Business Plaza, Chicago, IL 60611" },
      { name: "Networking Terrace", address: "123 Business Plaza, Chicago, IL 60611" }
    ],
    hostId: 'host-3',
    hostName: 'Leadership Institute',
    hostRating: 4.7,
    attendeeCount: 200,
    maxCapacity: 250,
    ticketPrice: 450,
    currency: 'USD',
    tags: ['Leadership', 'Business', 'Professional', 'Networking'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: true,
    moduleUsage: {
      rsvp: { status: 'confirmed' },
      seating: {},
      media: { photosUploaded: 0, albumAccess: false },
      games: { participated: [], points: 0 },
      surveys: { completed: [], pending: [] }
    }
  },
  {
    id: 'attend-4',
    eventName: 'Summer Music Festival',
    eventType: 'Festival',
    category: 'Entertainment',
    subcategory: 'Music',
    description: 'Three-day outdoor music festival featuring top artists, food trucks, and art installations.',
    startDate: new Date('2025-08-22'),
    endDate: new Date('2025-08-24'),
    time: '12:00 PM',
    locations: [
      { name: "Main Stage", address: "456 Riverside Park, Portland, OR 97205" },
      { name: "Food Court", address: "456 Riverside Park, Portland, OR 97205" },
      { name: "Art Gallery Tent", address: "456 Riverside Park, Portland, OR 97205" }
    ],
    hostId: 'host-4',
    hostName: 'Pacific Music Events',
    hostRating: 4.6,
    attendeeCount: 15000,
    maxCapacity: 20000,
    ticketPrice: 185,
    currency: 'USD',
    tags: ['Music', 'Festival', 'Outdoor', 'Entertainment'],
    image: '/placeholder.svg',
    featured: true,
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: 'VIP Weekend Pass',
      ticketNumbers: ['TKT-FEST-001'],
      qrCode: 'QR-FEST2025-001',
      purchaseDate: '2024-10-20',
      totalPaid: 185,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'confirmed' },
      seating: {},
      media: { photosUploaded: 12, albumAccess: true },
      games: { participated: ['festival-trivia'], points: 250, rank: 15 },
      surveys: { completed: [], pending: [] }
    }
  },
  {
    id: 'attend-5',
    eventName: 'Professional Networking Mixer',
    eventType: 'Business',
    category: 'Professional',
    subcategory: 'Networking',
    description: 'Connect with industry professionals in a relaxed evening atmosphere with cocktails and appetizers.',
    startDate: new Date('2025-03-28'),
    endDate: new Date('2025-03-28'),
    time: '6:00 PM',
    locations: [
      { name: "Sky Lounge", address: "789 Downtown Plaza, Seattle, WA 98101" },
      { name: "Outdoor Terrace", address: "789 Downtown Plaza, Seattle, WA 98101" }
    ],
    hostId: 'host-5',
    hostName: 'Seattle Professional Network',
    hostRating: 4.4,
    attendeeCount: 85,
    maxCapacity: 100,
    ticketPrice: 0,
    currency: 'USD',
    tags: ['Networking', 'Professional', 'Evening', 'Cocktails'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: true,
    moduleUsage: {
      rsvp: { status: 'attending' },
      seating: {},
      media: { photosUploaded: 0, albumAccess: true },
      games: { participated: ['networking-bingo'], points: 150 },
      surveys: { completed: [], pending: [] }
    }
  },
  {
    id: 'attend-6',
    eventName: 'Mediterranean Cooking Workshop',
    eventType: 'Educational',
    category: 'Learning',
    subcategory: 'Culinary',
    description: 'Learn authentic Mediterranean cooking techniques with professional chef Maria Gonzalez.',
    startDate: new Date('2025-04-05'),
    endDate: new Date('2025-04-05'),
    time: '2:00 PM',
    locations: [
      { name: "Main Kitchen Studio", address: "123 Culinary Lane, San Diego, CA 92101" },
      { name: "Dining Room", address: "123 Culinary Lane, San Diego, CA 92101" }
    ],
    hostId: 'host-6',
    hostName: 'Coastal Cooking School',
    hostRating: 4.9,
    attendeeCount: 16,
    maxCapacity: 20,
    ticketPrice: 85,
    currency: 'USD',
    tags: ['Cooking', 'Workshop', 'Mediterranean', 'Hands-on'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: 'Workshop Pass',
      ticketNumbers: ['TKT-COOK-001'],
      qrCode: 'QR-COOK2025-001',
      purchaseDate: '2024-12-05',
      totalPaid: 85,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'confirmed' },
      seating: {},
      media: { photosUploaded: 0, albumAccess: false },
      games: { participated: [], points: 0 },
      surveys: { completed: ['pre-workshop-survey'], pending: ['post-workshop-feedback'] }
    }
  },
  {
    id: 'attend-7',
    eventName: 'Charity 5K Run for Education',
    eventType: 'Charity',
    category: 'Community',
    subcategory: 'Sports',
    description: 'Community charity run supporting local schools with prizes, refreshments, and family activities.',
    startDate: new Date('2025-05-17'),
    endDate: new Date('2025-05-17'),
    time: '8:00 AM',
    locations: [
      { name: "Starting Line - Central Park South", address: "Central Park South, New York, NY 10019" },
      { name: "Finish Line - Bethesda Fountain", address: "Central Park, New York, NY 10024" }
    ],
    hostId: 'host-7',
    hostName: 'Education First Foundation',
    hostRating: 4.8,
    attendeeCount: 450,
    maxCapacity: 500,
    ticketPrice: 25,
    currency: 'USD',
    tags: ['Charity', 'Running', 'Community', 'Education'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: 'Runner Registration',
      ticketNumbers: ['TKT-RUN-001'],
      qrCode: 'QR-RUN2025-001',
      purchaseDate: '2024-11-30',
      totalPaid: 25,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'attending', responses: { emergencyContact: 'Jane Doe - 555-0123' } },
      seating: {},
      media: { photosUploaded: 0, albumAccess: false },
      games: { participated: [], points: 0 },
      surveys: { completed: [], pending: [] }
    }
  },
  {
    id: 'attend-8',
    eventName: 'Contemporary Art Exhibition Opening',
    eventType: 'Cultural',
    category: 'Arts',
    subcategory: 'Exhibition',
    description: 'Exclusive opening night for "Visions of Tomorrow" contemporary art exhibition with artist meet & greet.',
    startDate: new Date('2025-06-03'),
    endDate: new Date('2025-06-03'),
    time: '7:00 PM',
    locations: [
      { name: "Main Gallery", address: "456 Arts District, Los Angeles, CA 90013" },
      { name: "VIP Lounge", address: "456 Arts District, Los Angeles, CA 90013" }
    ],
    hostId: 'host-8',
    hostName: 'LA Contemporary Arts',
    hostRating: 4.5,
    attendeeCount: 200,
    maxCapacity: 250,
    ticketPrice: 0,
    currency: 'USD',
    tags: ['Art', 'Exhibition', 'Contemporary', 'Evening'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: true,
    moduleUsage: {
      rsvp: { status: 'attending' },
      seating: {},
      media: { photosUploaded: 3, albumAccess: true },
      games: { participated: [], points: 0 },
      surveys: { completed: [], pending: ['artist-feedback-survey'] }
    }
  },
  {
    id: 'attend-9',
    eventName: 'Mountain Yoga & Meditation Retreat',
    eventType: 'Wellness',
    category: 'Health',
    subcategory: 'Mindfulness',
    description: 'Weekend wellness retreat focused on mindfulness, yoga practice, and connecting with nature.',
    startDate: new Date('2025-07-25'),
    endDate: new Date('2025-07-27'),
    time: '9:00 AM',
    locations: [
      { name: "Mountain Lodge", address: "789 Peaceful Valley, Colorado, CO 80424" },
      { name: "Meditation Garden", address: "789 Peaceful Valley, Colorado, CO 80424" },
      { name: "Yoga Pavilion", address: "789 Peaceful Valley, Colorado, CO 80424" }
    ],
    hostId: 'host-9',
    hostName: 'Zen Mountain Retreats',
    hostRating: 4.9,
    attendeeCount: 30,
    maxCapacity: 40,
    ticketPrice: 350,
    currency: 'USD',
    tags: ['Yoga', 'Meditation', 'Wellness', 'Retreat'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: false,
    ticketDetails: {
      quantity: 1,
      type: 'Weekend Retreat Pass',
      ticketNumbers: ['TKT-YOGA-001'],
      qrCode: 'QR-YOGA2025-001',
      purchaseDate: '2024-12-10',
      totalPaid: 350,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'attending', responses: { dietaryRestrictions: 'Vegan', specialRequests: 'Ground floor room' } },
      seating: {},
      media: { photosUploaded: 0, albumAccess: false },
      games: { participated: [], points: 0 },
      surveys: { completed: ['wellness-assessment'], pending: ['retreat-feedback'] }
    }
  },
  {
    id: 'attend-10',
    eventName: 'Indie Gaming Convention',
    eventType: 'Gaming',
    category: 'Entertainment',
    subcategory: 'Gaming',
    description: 'Celebrate independent game development with demos, tournaments, and developer talks.',
    startDate: new Date('2025-09-12'),
    endDate: new Date('2025-09-14'),
    time: '10:00 AM',
    locations: [
      { name: "Main Gaming Hall", address: "123 Gamer Street, Boston, MA 02101" },
      { name: "Tournament Arena", address: "123 Gamer Street, Boston, MA 02101" },
      { name: "Developer Showcase", address: "123 Gamer Street, Boston, MA 02101" }
    ],
    hostId: 'host-10',
    hostName: 'Indie Game Alliance',
    hostRating: 4.7,
    attendeeCount: 800,
    maxCapacity: 1000,
    ticketPrice: 75,
    currency: 'USD',
    tags: ['Gaming', 'Indie', 'Convention', 'Technology'],
    image: '/placeholder.svg',
    featured: true,
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: '3-Day Pass',
      ticketNumbers: ['TKT-GAME-001'],
      qrCode: 'QR-GAME2025-001',
      purchaseDate: '2024-11-25',
      totalPaid: 75,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'confirmed' },
      seating: {},
      media: { photosUploaded: 8, albumAccess: true },
      games: { participated: ['indie-tournament', 'dev-quiz'], points: 890, rank: 3 },
      surveys: { completed: [], pending: [] }
    }
  },
  // ADVANCED CONFERENCE EVENTS FOR ATTENDING EXPERIENCE
  {
    id: 'attend-conf-1',
    eventName: 'Quantum Computing Research Symposium 2025',
    eventType: 'Conference',
    category: 'Technology',
    subcategory: 'Quantum Computing',
    description: 'Advanced multi-day quantum computing conference with cutting-edge research presentations, hands-on quantum labs, and certification pathways across 3 university locations.',
    startDate: new Date('2025-05-20'),
    endDate: new Date('2025-05-23'),
    time: '8:00 AM',
    locations: [
      { name: "IBM Quantum Network Hub", address: "1101 Kitchawan Rd, Yorktown Heights, NY 10598" },
      { name: "MIT Quantum Engineering Lab", address: "77 Massachusetts Ave, Cambridge, MA 02139" },
      { name: "Google Quantum AI Campus", address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043" },
      { name: "Princeton Quantum Institute", address: "Jadwin Hall, Princeton, NJ 08544" }
    ],
    hostId: 'host-conf-1',
    hostName: 'International Quantum Computing Consortium',
    hostRating: 4.9,
    attendeeCount: 850,
    maxCapacity: 1000,
    ticketPrice: 485,
    currency: 'USD',
    tags: ['Quantum Computing', 'Research', 'Advanced Physics', 'Multi-location'],
    image: '/placeholder.svg',
    featured: true,
    format: 'Hybrid',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: 'Research Track Pass',
      ticketNumbers: ['QC-2025-RSH-001'],
      qrCode: 'QR-QUANTUM-2025-001',
      purchaseDate: '2024-12-15',
      totalPaid: 485,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'confirmed' },
      seating: { assignment: 'Lab Station Q-12, MIT Quantum Lab' },
      media: { photosUploaded: 0, albumAccess: true },
      games: { participated: [], points: 0 },
      surveys: { completed: [], pending: ['pre-conference-knowledge-assessment'] }
    },
    conferenceData: {
      tracks: [
        { id: "quantum-theory", name: "Quantum Theory & Foundations", color: "#3B82F6", description: "Theoretical quantum mechanics and information theory" },
        { id: "quantum-hardware", name: "Quantum Hardware & Systems", color: "#10B981", description: "Physical quantum computers and engineering" },
        { id: "quantum-algorithms", name: "Quantum Algorithms", color: "#F59E0B", description: "Quantum computing algorithms and applications" },
        { id: "quantum-ml", name: "Quantum Machine Learning", color: "#8B5CF6", description: "ML applications on quantum systems" },
        { id: "quantum-crypto", name: "Quantum Cryptography", color: "#EF4444", description: "Quantum security and cryptographic protocols" }
      ],
      registeredSessions: [
        "quantum-theory-keynote", 
        "hands-on-qiskit-lab", 
        "quantum-ml-workshop", 
        "cryptography-panel",
        "networking-quantum-startups"
      ],
      waitlistedSessions: ["advanced-error-correction"]
    }
  },
  {
    id: 'attend-conf-2',
    eventName: 'Global Climate Action Summit',
    eventType: 'Conference',
    category: 'Environment',
    subcategory: 'Climate Science',
    description: 'Multi-continental climate conference connecting scientists, policymakers, and activists across 6 major cities with live sessions and collaborative action planning.',
    startDate: new Date('2025-08-10'),
    endDate: new Date('2025-08-13'),
    time: '6:00 AM',
    locations: [
      { name: "UN Climate Hub New York", address: "405 E 42nd St, New York, NY 10017" },
      { name: "European Climate Foundation (Brussels)", address: "Rue de la Science 23, 1040 Brussels, Belgium" },
      { name: "Climate Research Center (Sydney)", address: "Climate Change Research Centre, Sydney NSW 2052, Australia" },
      { name: "Arctic Research Station (Tromsø)", address: "University of Tromsø, 9037 Tromsø, Norway" },
      { name: "Amazon Research Institute (São Paulo)", address: "Instituto de Pesquisas Amazônicas, São Paulo, Brazil" }
    ],
    hostId: 'host-conf-2',
    hostName: 'Global Climate Research Alliance',
    hostRating: 4.8,
    attendeeCount: 2200,
    maxCapacity: 2500,
    ticketPrice: 0,
    currency: 'USD',
    tags: ['Climate Science', 'Global', 'Policy', 'Research', 'Multi-timezone'],
    image: '/placeholder.svg',
    featured: true,
    format: 'Hybrid',
    isPublic: true,
    moduleUsage: {
      rsvp: { status: 'confirmed', responses: { expertise: 'Climate Modeling', interests: ['Policy', 'Technology'] } },
      seating: { assignment: 'Virtual Breakout Room 12 - Policy Track' },
      media: { photosUploaded: 0, albumAccess: true },
      games: { participated: [], points: 0 },
      surveys: { completed: ['climate-expertise-survey'], pending: ['action-commitment-form'] }
    },
    conferenceData: {
      tracks: [
        { id: "climate-science", name: "Climate Science & Modeling", color: "#0EA5E9", description: "Latest climate research and predictive modeling" },
        { id: "renewable-energy", name: "Renewable Energy Systems", color: "#10B981", description: "Clean energy technologies and deployment" },
        { id: "climate-policy", name: "Climate Policy & Governance", color: "#F59E0B", description: "International climate agreements and policy frameworks" },
        { id: "adaptation-resilience", name: "Adaptation & Resilience", color: "#8B5CF6", description: "Climate adaptation strategies and infrastructure" },
        { id: "carbon-economics", name: "Carbon Economics", color: "#EF4444", description: "Carbon markets, pricing, and economic impacts" },
        { id: "youth-activism", name: "Youth Climate Action", color: "#84CC16", description: "Young climate activists and grassroots movements" }
      ],
      registeredSessions: [
        "global-climate-keynote",
        "renewable-tech-showcase", 
        "policy-makers-panel",
        "youth-action-workshop",
        "carbon-pricing-debate"
      ],
      waitlistedSessions: ["ipcc-report-preview"]
    }
  },
  {
    id: 'attend-conf-3',
    eventName: 'Advanced Neuroscience & Brain-Computer Interface Conference',
    eventType: 'Conference',
    category: 'Science',
    subcategory: 'Neuroscience',
    description: 'Cutting-edge neuroscience conference featuring brain-computer interface demonstrations, neural implant workshops, and ethics discussions across top research hospitals.',
    startDate: new Date('2025-10-05'),
    endDate: new Date('2025-10-08'),
    time: '9:00 AM',
    locations: [
      { name: "Johns Hopkins Neuroscience Institute", address: "725 N Wolfe St, Baltimore, MD 21205" },
      { name: "Stanford Neuroscience Institute", address: "290 Jane Stanford Way, Stanford, CA 94305" },
      { name: "Massachusetts General Hospital", address: "55 Fruit St, Boston, MA 02114" },
      { name: "Neuralink Research Facility", address: "1 Hacker Way, Fremont, CA 94538" },
      { name: "Max Planck Institute (Virtual)", address: "Remote participation from Frankfurt, Germany" }
    ],
    hostId: 'host-conf-3',
    hostName: 'International Neuroscience Research Network',
    hostRating: 4.9,
    attendeeCount: 450,
    maxCapacity: 500,
    ticketPrice: 750,
    currency: 'USD',
    tags: ['Neuroscience', 'BCI', 'Neural Implants', 'Medical Research', 'Ethics'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: false,
    ticketDetails: {
      quantity: 1,
      type: 'Professional Researcher Pass',
      ticketNumbers: ['NEURO-2025-PRO-001'],
      qrCode: 'QR-NEURO-2025-001',
      purchaseDate: '2024-11-20',
      totalPaid: 750,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'confirmed', responses: { 
        clearanceLevel: 'PhD Research', 
        institution: 'Stanford University',
        researchFocus: 'Neural Interfaces'
      }},
      seating: { assignment: 'Research Lab 3B, Johns Hopkins' },
      media: { photosUploaded: 0, albumAccess: false },
      games: { participated: [], points: 0 },
      surveys: { completed: ['ethics-training-module'], pending: ['post-demo-feedback'] }
    },
    conferenceData: {
      tracks: [
        { id: "bci-hardware", name: "BCI Hardware & Engineering", color: "#3B82F6", description: "Brain-computer interface hardware development" },
        { id: "neural-decoding", name: "Neural Signal Decoding", color: "#10B981", description: "Algorithms for interpreting neural signals" },
        { id: "clinical-applications", name: "Clinical Applications", color: "#F59E0B", description: "Medical applications of neurotechnology" },
        { id: "neuroethics", name: "Neuroethics & Society", color: "#EF4444", description: "Ethical implications of brain technology" },
        { id: "motor-restoration", name: "Motor Function Restoration", color: "#8B5CF6", description: "Restoring movement through neural interfaces" }
      ],
      registeredSessions: [
        "live-bci-demonstration",
        "neural-implant-workshop", 
        "ethics-panel-discussion",
        "motor-cortex-decoding",
        "hands-on-signal-processing"
      ],
      waitlistedSessions: ["classified-darpa-presentation"]
    }
  },
  {
    id: 'attend-conf-4',
    eventName: 'International Culinary Innovation Conference',
    eventType: 'Conference',  
    category: 'Food & Beverage',
    subcategory: 'Culinary Arts',
    description: 'Multi-location culinary conference featuring molecular gastronomy labs, sustainable cooking workshops, and chef collaborations across renowned culinary institutes.',
    startDate: new Date('2025-06-25'),
    endDate: new Date('2025-06-28'),
    time: '10:00 AM',
    locations: [
      { name: "Culinary Institute of America", address: "1946 Campus Dr, Hyde Park, NY 12538" },
      { name: "Institute of Culinary Education", address: "225 Liberty St, New York, NY 10281" },
      { name: "Johnson & Wales Culinary School", address: "8 Abbott Park Pl, Providence, RI 02903" },
      { name: "Le Cordon Bleu (Remote)", address: "Virtual participation from Paris, France" },
      { name: "Michelin Star Test Kitchen", address: "Secret Location - Invitation Only" }
    ],
    hostId: 'host-conf-4',
    hostName: 'Global Culinary Innovation Alliance',
    hostRating: 4.7,
    attendeeCount: 320,
    maxCapacity: 400,
    ticketPrice: 650,
    currency: 'USD',
    tags: ['Culinary Arts', 'Innovation', 'Sustainability', 'Molecular Gastronomy', 'Chef Training'],
    image: '/placeholder.svg',
    format: 'In-Person',
    isPublic: true,
    ticketDetails: {
      quantity: 1,
      type: 'Professional Chef Pass',
      ticketNumbers: ['CULI-2025-CHEF-001'],
      qrCode: 'QR-CULINARY-2025-001',
      purchaseDate: '2024-12-01',
      totalPaid: 650,
      checkedIn: false
    },
    moduleUsage: {
      rsvp: { status: 'confirmed', responses: { 
        dietaryRestrictions: 'None',
        experience: 'Executive Chef',
        specialties: ['Molecular Gastronomy', 'Plant-based Cuisine']
      }},
      seating: { assignment: 'Kitchen Station 8, CIA Main Campus' },
      media: { photosUploaded: 0, albumAccess: true },
      games: { participated: [], points: 0 },
      surveys: { completed: ['pre-conference-skills-assessment'], pending: ['sustainability-commitment'] }
    },
    conferenceData: {
      tracks: [
        { id: "molecular-gastronomy", name: "Molecular Gastronomy Lab", color: "#8B5CF6", description: "Scientific cooking techniques and food chemistry" },
        { id: "sustainable-cuisine", name: "Sustainable Cooking", color: "#10B981", description: "Environmentally conscious culinary practices" },
        { id: "plant-based-innovation", name: "Plant-Based Innovation", color: "#84CC16", description: "Advanced plant-based cooking techniques" },
        { id: "fermentation-science", name: "Fermentation Science", color: "#F59E0B", description: "Traditional and modern fermentation methods" },
        { id: "culinary-technology", name: "Culinary Technology", color: "#3B82F6", description: "Technology integration in professional kitchens" },
        { id: "global-fusion", name: "Global Fusion Techniques", color: "#EF4444", description: "Cross-cultural culinary innovation" }
      ],
      registeredSessions: [
        "molecular-techniques-workshop",
        "sustainable-sourcing-panel",
        "plant-protein-innovation",
        "fermentation-masterclass",
        "chef-collaboration-session"
      ],
      waitlistedSessions: ["michelin-star-secret-session"]
    }
  },
];