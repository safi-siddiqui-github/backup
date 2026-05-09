"use client";

import {
  Calendar,
  Camera,
  DollarSign,
  Gamepad2,
  Layout,
  LucideIcon,
  Megaphone,
  Ticket,
  Users,
} from "lucide-react";
import AnnouncementAnalytics from "./AnnouncementAnalytics";
import BudgetAnalytics from "./BudgetAnalytics";
import GamesAnalytics from "./GamesAnalytics";
import MediaAnalytics from "./MediaAnalytics";
import RSVPAnalytics from "./RSVPAnalytics";
import ScheduleAnalytics from "./ScheduleAnalytics";
import SeatingAnalytics from "./SeatingAnalytics";
import TicketingAnalytics from "./TicketingAnalytics";

export interface ModuleAnalyticsComponent {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType<{ eventId: string }>;
  category: string;
  isActive: boolean;
}

export const moduleAnalyticsRegistry: Record<string, ModuleAnalyticsComponent> =
  {
    rsvp: {
      id: "rsvp",
      name: "RSVP Analytics",
      icon: Users,
      component: RSVPAnalytics,
      category: "Event Management",
      isActive: true,
    },
    budget: {
      id: "budget",
      name: "Budget Analytics",
      icon: DollarSign,
      component: BudgetAnalytics,
      category: "Financial",
      isActive: true,
    },
    seating: {
      id: "seating",
      name: "Seating Analytics",
      icon: Layout,
      component: SeatingAnalytics,
      category: "Event Management",
      isActive: true,
    },
    ticketing: {
      id: "ticketing",
      name: "Ticketing Analytics",
      icon: Ticket,
      component: TicketingAnalytics,
      category: "Event Management",
      isActive: true,
    },
    media: {
      id: "media",
      name: "Media Analytics",
      icon: Camera,
      component: MediaAnalytics,
      category: "Content",
      isActive: true,
    },
    schedule: {
      id: "schedule",
      name: "Schedule Analytics",
      icon: Calendar,
      component: ScheduleAnalytics,
      category: "Event Management",
      isActive: true,
    },
    announcements: {
      id: "announcements",
      name: "Announcement Analytics",
      icon: Megaphone,
      component: AnnouncementAnalytics,
      category: "Engagement",
      isActive: true,
    },
    games: {
      id: "games",
      name: "Games Analytics",
      icon: Gamepad2,
      component: GamesAnalytics,
      category: "Engagement",
      isActive: true,
    },
  };

export const getActiveModules = (
  eventModules: string[] = [],
): ModuleAnalyticsComponent[] => {
  return Object.values(moduleAnalyticsRegistry).filter(
    (module) => eventModules.includes(module.id) || eventModules.length === 0,
  );
};

export const getModulesByCategory = (eventModules: string[] = []) => {
  const activeModules = getActiveModules(eventModules);
  const categories: Record<string, ModuleAnalyticsComponent[]> = {};

  activeModules.forEach((module) => {
    if (!categories[module.category]) {
      categories[module.category] = [];
    }
    categories[module.category].push(module);
  });

  return categories;
};
