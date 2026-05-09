"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Guest } from "@/types/rsvp";
import { format } from "date-fns";
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  Calendar,
  Camera,
  Car,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CloudRain,
  Download,
  Eye,
  Gamepad2,
  Heart,
  Info,
  MapPin,
  Megaphone,
  MessageSquare,
  QrCode,
  Settings,
  Share,
  Shield,
  Star,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { EventFormData, ModuleUsage } from "./EnhancedEventCreationDialog";
import GuestGamesView from "./GuestGamesView";
import GuestMediaUpload from "./GuestMediaUpload";
import GuestRSVPForm from "./GuestRSVPForm";
import GuestScheduleView from "./GuestScheduleView";
import GuestSeatingView from "./GuestSeatingView";
import GuestSurveyView from "./GuestSurveyView";
import GuestTicketingView from "./GuestTicketingView";

interface EventUpdate {
  id: string;
  type:
    | "announcement"
    | "schedule-change"
    | "weather"
    | "parking"
    | "safety"
    | "urgent";
  title: string;
  content: string;
  timestamp: Date;
  priority: "high" | "medium" | "low";
  isRead: boolean;
}

interface GuestInfo {
  name: string;
  email: string;
  isCheckedIn: boolean;
}

interface EventData {
  id: string;
  name: string;
  couple: string;
  description: string;
  date: string;
  startDate: Date;
  time: string;
  location: string;
  address: string;
  dresscode: string;
  theme: string;
  rsvpDeadline: string;
  eventType?: string;
  category?: string;
}

interface AttendingEventDetailViewProps {
  event: EventFormData;
  onBack: () => void;
}

const AttendingEventDetailView = ({
  event,
  onBack,
}: AttendingEventDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null);

  // Mock event updates data
  const eventUpdates: EventUpdate[] = [
    {
      id: "1",
      type: "urgent",
      title: "Venue Change - Important Update",
      content:
        "Due to unexpected circumstances, the ceremony location has been moved to the Grand Ballroom. All other details remain the same. Please arrive 15 minutes early for the new check-in process.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: "high",
      isRead: false,
    },
    {
      id: "2",
      type: "schedule-change",
      title: "Reception Start Time Updated",
      content:
        "The reception will now start at 7:30 PM instead of 7:00 PM to allow more time for photos. Cocktail hour will be extended accordingly.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      priority: "medium",
      isRead: false,
    },
    {
      id: "3",
      type: "weather",
      title: "Weather Update for Outdoor Ceremony",
      content:
        "Current forecast shows partly cloudy skies with a high of 75°F. Perfect weather for our outdoor ceremony! Light jackets recommended for the evening.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      priority: "low",
      isRead: true,
    },
    {
      id: "4",
      type: "parking",
      title: "Parking Instructions",
      content:
        "Complimentary valet parking is available at the main entrance. Additional self-parking is available in the North lot. Please allow extra time for parking.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      priority: "medium",
      isRead: true,
    },
    {
      id: "5",
      type: "announcement",
      title: "Welcome Message from the Couple",
      content:
        "We're so excited to celebrate with you! Thank you for being part of our special day. Don't forget to tag us in your photos using #JohnAndJaneWedding",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      priority: "low",
      isRead: true,
    },
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return AlertTriangle;
      case "announcement":
        return Megaphone;
      case "schedule-change":
        return Clock;
      case "weather":
        return CloudRain;
      case "parking":
        return Car;
      case "safety":
        return Shield;
      default:
        return Info;
    }
  };

  const getUpdateColor = (type: string, priority: string) => {
    if (type === "urgent" || priority === "high") {
      return "from-red-500 to-red-600";
    }
    switch (type) {
      case "announcement":
        return "from-blue-500 to-blue-600";
      case "schedule-change":
        return "from-orange-500 to-orange-600";
      case "weather":
        return "from-cyan-500 to-cyan-600";
      case "parking":
        return "from-purple-500 to-purple-600";
      case "safety":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPriorityBadge = (priority: string, isRead: boolean) => {
    if (priority === "high") {
      return <Badge className="bg-red-500 text-white">Urgent</Badge>;
    }
    if (!isRead) {
      return <Badge className="bg-blue-500 text-white">New</Badge>;
    }
    return null;
  };

  const toggleUpdateExpanded = (updateId: string) => {
    setExpandedUpdate(expandedUpdate === updateId ? null : updateId);
  };

  const unreadUpdatesCount = eventUpdates.filter(
    (update) => !update.isRead,
  ).length;

  // Define event types that should use RSVP instead of ticketing
  const rsvpEventTypes = [
    "Wedding",
    "Baby Shower",
    "Birthday Party",
    "Anniversary",
    "Family Gathering",
    "Private Party",
  ];

  // Determine if this event should use RSVP based on event type/category
  const shouldUseRSVP = rsvpEventTypes.some(
    (type) =>
      event.eventType?.toLowerCase().includes(type.toLowerCase()) ||
      event?.category?.toLowerCase().includes(type.toLowerCase()) ||
      event.eventName?.toLowerCase().includes("wedding"),
  );

  // For events that should use RSVP, override ticketing logic
  const isTicketingEvent =
    !shouldUseRSVP && ((event?.ticketPrice ?? 0) > 0 || event.ticketDetails);

  // Load existing RSVP if it's an RSVP event
  const existingRSVP = !isTicketingEvent
    ? JSON.parse(
        localStorage.getItem(`rsvp_${event?.hostName}_guest@example.com`) ||
          "null",
      )
    : null;

  const ticketDetails = event.ticketDetails || {
    quantity: 1,
    type: "General Admission",
    ticketNumbers: ["TK-2024-001"],
    qrCode: "QR123456789",
    purchaseDate: "2024-12-20",
    totalPaid: event.ticketPrice,
    checkedIn: false,
    checkInTime: undefined,
  };

  const moduleUsage =
    event?.moduleUsage ||
    ({
      rsvp: {
        status: existingRSVP?.status || "pending",
        responses: existingRSVP || {},
      },
      seating: {
        tableNumber: 5,
        seatNumber: "A3",
        assignment: "Table 5, Seat A3",
      },
      media: { photosUploaded: 12, albumAccess: true },
      games: {
        participated: ["Trivia", "Photo Contest"],
        points: 850,
        rank: 3,
      },
      surveys: {
        completed: ["Event Feedback"],
        pending: ["Post-Event Survey"],
      },
    } as ModuleUsage);

  const accessInfo = event.accessInfo || {
    entryCode: "ENTRY2024",
    vipAccess: false,
    specialPerks: ["Early Access", "Welcome Drink"],
    notifications: unreadUpdatesCount,
  };

  const now = new Date();
  const eventIsInPast = new Date(String(event.startDate)) < now;
  const eventIsToday =
    new Date(String(event.startDate)).toDateString() === now.toDateString();

  const guestInfo: Partial<Guest> = {
    name: "Guest User",
    email: "guest@example.com",
    isCheckedIn: ticketDetails.checkedIn,
  };

  const eventDataForGuest: Partial<EventFormData> = {
    id: event.id,
    name: event.eventName,
    couple: event.hostName,
    description: event.description,
    date: format(event.startDate ?? "", "MMMM d, yyyy"),
    time: event.time,
    location: (event?.locations && event?.locations[0]?.name) || "TBA",
    address: (event?.locations && event?.locations[0]?.address) || "",
    startDate: event.startDate,
    dresscode: "Cocktail Attire",
    theme: event?.theme ?? {},
    rsvpDeadline: format(
      new Date(
        new Date(String(event?.startDate))?.getTime() - 7 * 24 * 60 * 60 * 1000,
      ),
      "MMMM d, yyyy",
    ),
  };

  // Updated module stats based on event type
  const moduleStats = [
    {
      id: "schedule",
      label: "Schedule",
      icon: Calendar,
      status: "available",
      description: "View event timeline",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "seating",
      label: "Seating",
      icon: Users,
      status: moduleUsage?.seating?.assignment ? "assigned" : "pending",
      description: moduleUsage?.seating?.assignment || "Assignment pending",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "media",
      label: "Photos",
      icon: Camera,
      status:
        (moduleUsage?.media?.photosUploaded ?? 0) > 0 ? "active" : "available",
      description: `${moduleUsage?.media?.photosUploaded} photos uploaded`,
      color: "from-pink-400 to-pink-600",
    },
    {
      id: "games",
      label: "Games",
      icon: Gamepad2,
      status:
        moduleUsage.games?.participated &&
        moduleUsage.games?.participated?.length > 0
          ? "active"
          : "available",
      description: `${moduleUsage.games?.points} points earned`,
      color: "from-orange-400 to-orange-600",
    },
    {
      id: "surveys",
      label: "Surveys",
      icon: MessageSquare,
      status:
        moduleUsage?.surveys?.pending &&
        moduleUsage?.surveys?.pending?.length > 0
          ? "pending"
          : "completed",
      description: `${moduleUsage?.surveys?.completed?.length} completed`,
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  // Add the appropriate first module based on event type
  if (isTicketingEvent) {
    moduleStats.unshift({
      id: "tickets",
      label: "Tickets",
      icon: Ticket,
      status: ticketDetails.checkedIn ? "checked-in" : "confirmed",
      description: `${ticketDetails.type} - ${ticketDetails.checkedIn ? "Checked In" : "Ready"}`,
      color: "from-green-400 to-green-600",
    });
  } else {
    moduleStats.unshift({
      id: "rsvp",
      label: "RSVP",
      icon: CheckCircle,
      status: existingRSVP?.status || "pending",
      description: existingRSVP
        ? `Status: ${existingRSVP.status}`
        : "Response needed",
      color: "from-green-400 to-green-600",
    });
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "assigned":
      case "active":
      case "completed":
      case "attending":
      case "checked-in":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-amber-500 text-white";
      case "declined":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="border border-white/30 text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outlineLight"
                size="sm"
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outlineLight"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                {isTicketingEvent ? "Ticket" : "Details"}
              </Button>
            </div>
          </div>

          <div className="text-center text-white">
            <h1 className="mb-3 text-4xl font-bold">{event.eventName}</h1>
            <div className="mb-4 flex items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {format(event.startDate ?? "", "EEEE, MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
            </div>
            <Badge
              className={`${
                (isTicketingEvent && ticketDetails.checkedIn) ||
                (!isTicketingEvent && existingRSVP?.status === "attending")
                  ? "bg-green-500"
                  : eventIsToday
                    ? "bg-orange-500"
                    : "bg-blue-500"
              } px-4 py-2 text-sm text-white`}
            >
              {isTicketingEvent
                ? ticketDetails.checkedIn
                  ? "Checked In"
                  : eventIsToday
                    ? "Event Today"
                    : "Ticket Confirmed"
                : existingRSVP
                  ? `RSVP: ${existingRSVP.status}`
                  : "RSVP Needed"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid h-14 w-full grid-cols-6 rounded-xl border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="rounded-lg text-sm font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value={isTicketingEvent ? "tickets" : "rsvp"}
              className="rounded-lg text-sm font-medium"
            >
              {isTicketingEvent ? "Tickets" : "RSVP"}
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="rounded-lg text-sm font-medium"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="seating"
              className="rounded-lg text-sm font-medium"
            >
              Seating
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-lg text-sm font-medium"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="rounded-lg text-sm font-medium"
            >
              Activities
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Event Information */}
              <div className="space-y-6 lg:col-span-2">
                {/* Event Details Card */}
                <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                        <Eye className="h-5 w-5 text-white" />
                      </div>
                      Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-6 w-6 text-purple-600" />
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {event?.locations && event?.locations[0]?.name}
                        </p>
                        {event?.locations && event?.locations[0]?.address && (
                          <p className="mt-1 text-gray-600">
                            {event.locations[0].address}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <User className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          Hosted by {event.hostName}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="text-gray-600">
                            {event?.hostRating} rating
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="h-6 w-6 text-purple-600" />
                      <p className="font-medium text-gray-900">
                        {event.attendeeCount} people attending
                      </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="leading-relaxed text-gray-700">
                        {event.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Module Grid */}
                <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                        <Settings className="h-5 w-5 text-white" />
                      </div>
                      Event Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {moduleStats.map((module) => (
                        <div
                          key={module.id}
                          className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          onClick={() => setActiveTab(module.id)}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 transition-opacity group-hover:opacity-10`}
                          ></div>
                          <div className="relative z-10">
                            <div className="mb-4 flex items-center gap-3">
                              <div
                                className={`h-12 w-12 bg-gradient-to-r ${module.color} flex items-center justify-center rounded-lg shadow-lg`}
                              >
                                <module.icon className="h-6 w-6 text-white" />
                              </div>
                              <span className="text-lg font-semibold text-gray-900">
                                {module.label}
                              </span>
                            </div>
                            <Badge
                              className={`${getStatusColor(module.status)} mb-3`}
                            >
                              {module.status}
                            </Badge>
                            <p className="text-sm text-gray-600">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {isTicketingEvent ? (
                  /* Digital Ticket for Ticketing Events */
                  <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-blue-50 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <Ticket className="h-5 w-5" />
                        Your Digital Ticket
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4 text-center">
                        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 shadow-inner">
                          <QrCode className="mx-auto mb-3 h-20 w-20 text-gray-400" />
                          <p className="text-sm font-medium text-gray-600">
                            Scan to Check In
                          </p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-semibold text-gray-900">
                              {ticketDetails.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Amount Paid:</span>
                            <span className="font-semibold text-green-600">
                              ${ticketDetails.totalPaid}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Entry Code:</span>
                            <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                              {accessInfo.entryCode}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!ticketDetails.checkedIn && !eventIsInPast && (
                        <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white hover:from-purple-700 hover:to-blue-700">
                          <QrCode className="mr-2 h-4 w-4" />
                          Check In Now
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  /* RSVP Status for RSVP Events */
                  <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-green-50 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Your RSVP Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4 text-center">
                        <Badge
                          className={`${getStatusColor(existingRSVP?.status || "pending")} px-4 py-2 text-lg`}
                        >
                          {existingRSVP?.status
                            ? existingRSVP.status === "attending"
                              ? "Attending"
                              : existingRSVP.status === "declined"
                                ? "Not Attending"
                                : "Maybe"
                            : "Response Needed"}
                        </Badge>
                        {existingRSVP && (
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Guests:</span>
                              <span className="font-semibold text-gray-900">
                                {1 + (existingRSVP.plusOnes || 0)} person
                                {1 + (existingRSVP.plusOnes || 0) > 1
                                  ? "s"
                                  : ""}
                              </span>
                            </div>
                            {existingRSVP.mealChoice && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Meal:</span>
                                <span className="font-semibold text-gray-900">
                                  {existingRSVP.mealChoice}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Button
                        className="mt-6 w-full bg-gradient-to-r from-green-600 to-blue-600 py-3 font-semibold text-white hover:from-green-700 hover:to-blue-700"
                        onClick={() => setActiveTab("rsvp")}
                      >
                        {existingRSVP ? "Update RSVP" : "Complete RSVP"}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Special Perks */}
                {accessInfo?.specialPerks &&
                  accessInfo?.specialPerks.length > 0 && (
                    <Card className="border-0 bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-900">
                          <Heart className="h-5 w-5 text-pink-500" />
                          Special Perks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {accessInfo.specialPerks.map((perk, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 rounded-lg bg-white/70 p-3"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="font-medium text-gray-700">
                                {perk}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {/* Enhanced Event Updates */}
                {unreadUpdatesCount > 0 && (
                  <Card className="border-0 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-orange-900">
                        <div className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-orange-500" />
                          Event Updates
                        </div>
                        <Badge className="bg-orange-500 text-white">
                          {unreadUpdatesCount} new
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-96 space-y-4 overflow-y-auto">
                      {eventUpdates.slice(0, 3).map((update) => {
                        const UpdateIcon = getUpdateIcon(update.type);
                        const isExpanded = expandedUpdate === update.id;

                        return (
                          <div
                            key={update.id}
                            className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                              !update.isRead
                                ? "border-orange-200 bg-white"
                                : "border-gray-200 bg-gray-50"
                            }`}
                            onClick={() => toggleUpdateExpanded(update.id)}
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-8 w-8 bg-gradient-to-r ${getUpdateColor(update.type, update.priority)} flex items-center justify-center rounded-lg`}
                                >
                                  <UpdateIcon className="h-4 w-4 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="truncate text-sm font-medium text-gray-900">
                                    {update.title}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {format(update.timestamp, "MMM d, h:mm a")}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getPriorityBadge(
                                  update.priority,
                                  update.isRead,
                                )}
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="mt-3 border-t border-gray-200 pt-3">
                                <p className="text-sm leading-relaxed text-gray-700">
                                  {update.content}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {eventUpdates.length > 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                          View All {eventUpdates.length} Updates
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {isTicketingEvent ? (
            <TabsContent value="tickets">
              <GuestTicketingView
                event={eventDataForGuest}
                guest={guestInfo}
              />
            </TabsContent>
          ) : (
            <TabsContent value="rsvp">
              <GuestRSVPForm
                guest={guestInfo}
                event={eventDataForGuest}
                existingRSVP={existingRSVP}
              />
            </TabsContent>
          )}

          <TabsContent value="schedule">
            <GuestScheduleView
              event={eventDataForGuest}
              guest={guestInfo}
            />
          </TabsContent>

          <TabsContent value="seating">
            <GuestSeatingView
              guest={guestInfo}
              tableNumber={moduleUsage?.seating?.tableNumber ?? 0}
              seatNumber={Number(moduleUsage?.seating?.seatNumber ?? 0)}
            />
          </TabsContent>

          <TabsContent value="media">
            <GuestMediaUpload
              event={eventDataForGuest}
              guest={guestInfo}
            />
          </TabsContent>

          <TabsContent value="activities">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <GuestGamesView
                event={eventDataForGuest}
                guest={guestInfo}
              />
              <GuestSurveyView
                event={eventDataForGuest}
                guest={guestInfo}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AttendingEventDetailView;
