
import { LucideIcon } from "lucide-react";
import RSVPAnalytics from "./RSVPAnalytics";
import BudgetAnalytics from "./BudgetAnalytics";
import SeatingAnalytics from "./SeatingAnalytics";
import TicketingAnalytics from "./TicketingAnalytics";
import MediaAnalytics from "./MediaAnalytics";
import ScheduleAnalytics from "./ScheduleAnalytics";
import GamesAnalytics from "./GamesAnalytics";

export interface ModuleAnalyticsComponent {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType<{ eventId: string }>;
  category: string;
  isActive: boolean;
}

export const moduleAnalyticsRegistry: Record<string, ModuleAnalyticsComponent> = {
  rsvp: {
    id: "rsvp",
    name: "RSVP Analytics",
    icon: require("lucide-react").Users,
    component: RSVPAnalytics,
    category: "Event Management",
    isActive: true
  },
  budget: {
    id: "budget",
    name: "Budget Analytics",
    icon: require("lucide-react").DollarSign,
    component: BudgetAnalytics,
    category: "Financial",
    isActive: true
  },
  seating: {
    id: "seating",
    name: "Seating Analytics",
    icon: require("lucide-react").Layout,
    component: SeatingAnalytics,
    category: "Event Management",
    isActive: true
  },
  ticketing: {
    id: "ticketing",
    name: "Ticketing Analytics",
    icon: require("lucide-react").Ticket,
    component: TicketingAnalytics,
    category: "Event Management",
    isActive: true
  },
  media: {
    id: "media",
    name: "Media Analytics",
    icon: require("lucide-react").Camera,
    component: MediaAnalytics,
    category: "Content",
    isActive: true
  },
  schedule: {
    id: "schedule",
    name: "Schedule Analytics",
    icon: require("lucide-react").Calendar,
    component: ScheduleAnalytics,
    category: "Event Management",
    isActive: true
  },
  games: {
    id: "games",
    name: "Games Analytics",
    icon: require("lucide-react").Gamepad2,
    component: GamesAnalytics,
    category: "Engagement",
    isActive: true
  }
};

export const getActiveModules = (eventModules: string[] = []): ModuleAnalyticsComponent[] => {
  return Object.values(moduleAnalyticsRegistry).filter(module => 
    eventModules.includes(module.id) || eventModules.length === 0
  );
};

export const getModulesByCategory = (eventModules: string[] = []) => {
  const activeModules = getActiveModules(eventModules);
  const categories: Record<string, ModuleAnalyticsComponent[]> = {};
  
  activeModules.forEach(module => {
    if (!categories[module.category]) {
      categories[module.category] = [];
    }
    categories[module.category].push(module);
  });
  
  return categories;
};
