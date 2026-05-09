import {
  AirplayIcon,
  File,
  HomeIcon,
  LucideAxis3D,
  Settings,
  Webcam,
} from "lucide-react";

export const sidebarData = [
  {
    title: "Home",
    icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Webinar",
    icon: Webcam,
    link: "/webinars",
  },
  {
    title: "Leads",
    icon: LucideAxis3D,
    link: "/leads",
  },
  {
    title: "AI Agents",
    icon: AirplayIcon,
    link: "/ai-agents",
  },
  {
    title: "Settings",
    icon: Settings,
    link: "/settings",
  },
];

export const onBardingData = [
  {
    title: "Create a webinar",
    complete: false,
    link: "/",
  },
  {
    title: "Get leads",
    complete: false,
    link: "/",
  },
  {
    title: "Conversion status",
    complete: false,
    link: "/",
  },
];

export const featureData = [
  {
    title: "Browse or drag a pre-recorded webinar file",
    icon: File,
    link: "/",
  },
  {
    title: "Browse or drag a pre-recorded webinar file",
    icon: Webcam,
    link: "/webinar",
  },
];
