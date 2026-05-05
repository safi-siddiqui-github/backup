import {
  Award,
  Baseline,
  Calendar,
  CalendarDays,
  DollarSign,
  GalleryHorizontal,
  GraduationCap,
  Hash,
  Image as ImageIcon,
  Layout,
  LayoutGrid,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Network,
  Play,
  Star,
  Table,
  Ticket,
  Timer,
  UserPlus,
  Users,
} from "lucide-react";

export const blockConfig = [
  {
    title: "Layout",
    icon: <LayoutGrid size={16} />,
    items: [
      { title: "Hero Section", icon: <Layout size={20} />, tag: "layout" },
    ],
  },
  {
    title: "Content",
    icon: <Baseline size={16} />,
    items: [
      { title: "About Section", icon: <Baseline size={20} />, tag: "about" },
      { title: "Text Block", icon: <Baseline size={20} />, tag: "content" },
      { title: "Countdown Timer", icon: <Timer size={20} />, tag: "countdown" },
      { title: "Location Map", icon: <MapPin size={20} />, tag: "map" },
    ],
  },
  {
    title: "Media",
    icon: <ImageIcon size={16} />,
    items: [
      {
        title: "Image Block",
        icon: <ImageIcon size={20} />,
        tag: "gallery-grid",
      },
      {
        title: "Photo Gallery",
        icon: <GalleryHorizontal size={20} />,
        tag: "gallery",
      },
    ],
  },
  {
    title: "Forms",
    icon: <Mail size={16} />,
    items: [{ title: "Contact Form", icon: <Mail size={20} />, tag: "forms" }],
  },
  {
    title: "Integrations",
    icon: <Users size={16} />,
    items: [
      { title: "RSVP Form", icon: <UserPlus size={20} />, tag: "rsvp" },
      {
        title: "Event Schedule",
        icon: <CalendarDays size={20} />,
        tag: "schedule",
      },
      // Ticket Sales temporarily hidden
      // { title: "Ticket Sales", icon: <Ticket size={20} />, tag: "ticket" },
    ],
  },
  {
    title: "Advanced",
    icon: <GraduationCap size={16} />,
    items: [
      {
        title: "Sessions Grid",
        icon: <Table size={20} />,
        tag: "sessions",
        isPro: true,
      },
      {
        title: "Speaker Profiles",
        icon: <Users size={20} />,
        tag: "speakers",
        isPro: true,
      },
      {
        title: "Pricing Table",
        icon: <DollarSign size={20} />,
        tag: "pricing",
        isPro: true,
      },
      {
        title: "Multi-Day Schedule",
        icon: <Calendar size={20} />,
        tag: "multi-day-schedule",
        isPro: true,
      },
    ],
  },
  {
    title: "Professional",
    icon: <Star size={16} />,
    items: [
      {
        // title: "Social Media Feed",
        // icon: <Hash size={20} />,
        // tag: "social-feed",
      },
      {
        // Testimonials hidden for now
        // title: "Testimonials",
        // icon: <MessageSquare size={20} />,
        // tag: "testimonials",
      },
      { title: "Sponsor Showcase", icon: <Award size={20} />, tag: "sponsors" },
      // Networking Hub is hidden for now
      // {
      //   title: "Networking Hub",
      //   icon: <Network size={20} />,
      //   tag: "networking",
      //   isPro: true,
      // },
    ],
  },
  {
    title: "Footer",
    icon: <Table size={16} />,
    items: [
      { title: "Footer", icon: <Table size={20} />, tag: "footer" },
    ],
  },
];

export default blockConfig;
