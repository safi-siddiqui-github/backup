
import { 
  Users, 
  DollarSign, 
  Layout, 
  Ticket, 
  Camera, 
  Calendar, 
  Megaphone, 
  BarChart3, 
  Gamepad2, 
  MessageSquare,
  Globe,
  Plane,
  Target,
  LucideIcon
} from "lucide-react";

export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  color: string;
  route: string;
  component?: string;
  status: 'active' | 'beta' | 'coming-soon';
}

export const moduleRegistry: ModuleDefinition[] = [
  {
    id: "rsvp",
    name: "RSVP Management",
    description: "Guest management and RSVP tracking with groups and analytics",
    icon: Users,
    category: "Event Management",
    features: ["Guest Lists", "RSVP Tracking", "Group Management", "Response Analytics"],
    color: "bg-blue-500",
    route: "/modules/rsvp",
    component: "RSVPModule",
    status: "active"
  },
  {
    id: "budget",
    name: "Budget Planning",
    description: "Budget planning and expense tracking with vendor integration",
    icon: DollarSign,
    category: "Financial",
    features: ["Budget Categories", "Expense Tracking", "Vendor Management", "Cost Analytics"],
    color: "bg-green-500",
    route: "/modules/budget",
    component: "BudgetModule",
    status: "active"
  },
  {
    id: "seating",
    name: "Seating Arrangements",
    description: "Table planning and seating arrangements with visual editor",
    icon: Layout,
    category: "Event Management",
    features: ["Table Management", "Seat Assignment", "Visual Editor", "Guest Preferences"],
    color: "bg-purple-500",
    route: "/modules/seating",
    component: "SeatingModule",
    status: "active"
  },
  {
    id: "ticketing",
    name: "Ticketing System",
    description: "Ticket sales and check-in system with pricing tiers",
    icon: Ticket,
    category: "Event Management",
    features: ["Ticket Types", "Online Sales", "Check-in System", "Pricing Management"],
    color: "bg-orange-500",
    route: "/modules/ticketing",
    component: "TicketingModule",
    status: "active"
  },
  {
    id: "media",
    name: "Media Management",
    description: "Photo galleries and media management with guest uploads",
    icon: Camera,
    category: "Content",
    features: ["Photo Galleries", "Guest Uploads", "Album Management", "QR Sharing"],
    color: "bg-pink-500",
    route: "/modules/media",
    component: "MediaModule",
    status: "active"
  },
  {
    id: "schedule",
    name: "Schedule & Timeline",
    description: "Event scheduling and timeline management",
    icon: Calendar,
    category: "Event Management",
    features: ["Timeline Creation", "Schedule Management", "Agenda Planning", "Time Tracking"],
    color: "bg-indigo-500",
    route: "/modules/schedule",
    component: "ScheduleModule",
    status: "active"
  },
  {
    id: "announcements",
    name: "Announcements",
    description: "Event announcements and updates system",
    icon: Megaphone,
    category: "Engagement",
    features: ["Real-time Updates", "Guest Notifications", "Announcement Scheduling", "Communication Hub"],
    color: "bg-red-500",
    route: "/modules/announcements",
    component: "AnnouncementModule",
    status: "active"
  },
  {
    id: "analytics",
    name: "Analytics & Reporting",
    description: "Comprehensive analytics and reporting dashboard",
    icon: BarChart3,
    category: "Insights",
    features: ["Event Analytics", "Guest Insights", "Performance Metrics", "Custom Reports"],
    color: "bg-cyan-500",
    route: "/modules/analytics",
    component: "AnalyticsModule",
    status: "active"
  },
  {
    id: "games",
    name: "Games & Activities",
    description: "Interactive games and activities for guest engagement",
    icon: Gamepad2,
    category: "Engagement",
    features: ["Game Templates", "Activity Management", "Leaderboards", "Interactive Content"],
    color: "bg-yellow-500",
    route: "/modules/games",
    component: "GamesModule",
    status: "active"
  },
  {
    id: "survey",
    name: "Survey & Feedback",
    description: "Guest surveys and feedback collection system",
    icon: MessageSquare,
    category: "Engagement",
    features: ["Survey Creation", "Feedback Collection", "Response Analytics", "Custom Questions"],
    color: "bg-teal-500",
    route: "/modules/survey",
    component: "SurveyModule",
    status: "active"
  },
  {
    id: "website-builder",
    name: "Event Websites",
    description: "Create custom websites for your events with templates and drag-and-drop editing",
    icon: Globe,
    category: "Content",
    features: ["Website Templates", "Drag & Drop Editor", "Custom Domains", "SEO Optimization"],
    color: "bg-violet-500",
    route: "/modules/website-builder",
    component: "WebsiteBuilderModule",
    status: "active"
  },
  {
    id: "travel",
    name: "Travel & Accommodation",
    description: "Complete travel advisor for guests with hotels, flights, car rentals, activities, and dining",
    icon: Plane,
    category: "Guest Services",
    features: ["Hotel Booking", "Flight Search", "Car Rentals", "Local Activities", "Restaurant Finder", "Rideshare"],
    color: "bg-sky-500",
    route: "/modules/travel",
    component: "TravelModule",
    status: "active"
  },
  {
    id: "marketing",
    name: "Marketing & Campaigns",
    description: "Multi-channel advertising campaigns with advanced guest segmentation",
    icon: Target,
    category: "Marketing",
    features: ["Guest Segmentation", "Social Media Campaigns", "Email & SMS Marketing", "Physical Mail (Privacy Protected)", "Campaign Analytics", "ROI Tracking"],
    color: "bg-rose-500",
    route: "/modules/marketing",
    component: "MarketingModule",
    status: "active"
  }
];

export const getModulesByCategory = () => {
  const categories: Record<string, ModuleDefinition[]> = {};
  moduleRegistry.forEach(module => {
    if (!categories[module.category]) {
      categories[module.category] = [];
    }
    categories[module.category].push(module);
  });
  return categories;
};

export const getModuleById = (id: string) => {
  return moduleRegistry.find(module => module.id === id);
};
