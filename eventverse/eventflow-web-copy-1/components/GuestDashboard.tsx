"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Building,
  Calendar,
  Camera,
  CheckCircle,
  Gamepad2,
  Heart,
  MapPin,
  MessageSquare,
  Play,
  QrCode,
  Star,
  Trophy,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { EventFormData } from "./EnhancedEventCreationDialog";
import { EnhancedGuestSeatingView } from "./EnhancedGuestSeatingView";
import GuestGamesView from "./GuestGamesView";
import GuestMediaUpload from "./GuestMediaUpload";
import GuestRSVPForm from "./GuestRSVPForm";
import GuestScheduleView from "./GuestScheduleView";
import GuestSurveyView from "./GuestSurveyView";

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
  locations?: Array<{ name: string; address: string }>;
  ticketPrice?: number;
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

interface GuestDashboardProps {
  guest: GuestInfo;
  // event: EventData;
  event: EventFormData;
}

const GuestDashboard = ({ guest, event }: GuestDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  // const navigate = useNavigate();
  const navigate = () => {};

  const handleLogout = () => {
    localStorage.removeItem(`guest_${event.id}`);
    window.location.reload();
  };

  const handleBack = () => {
    // navigate("/events");
  };

  // Check if this is a conference event
  const isConference = event.eventType === "Conference" && event.conferenceData;

  // Define event types that should use RSVP instead of ticketing
  const rsvpEventTypes = [
    "Wedding",
    "Baby Shower",
    "Birthday Party",
    "Anniversary",
    "Family Gathering",
    "Private Party",
  ];

  // Determine if this event should use RSVP vs tickets
  // Priority: If event has ticket pricing/details, show ticket interface
  // Otherwise, fall back to event type-based RSVP logic
  const hasTicketData =
    (event.ticketPrice && event.ticketPrice > 0) || event.ticketDetails;
  const shouldUseRSVP =
    !hasTicketData &&
    rsvpEventTypes.some(
      (type) =>
        event.eventType?.toLowerCase().includes(type.toLowerCase()) ||
        event.category?.toLowerCase().includes(type.toLowerCase()) ||
        event.name?.toLowerCase().includes("wedding") ||
        event.couple?.toLowerCase().includes("wedding"),
    );

  // Load existing RSVP for RSVP events
  const existingRSVP = shouldUseRSVP
    ? JSON.parse(
        localStorage.getItem(`rsvp_${event.couple}_${guest.email}`) || "null",
      )
    : null;

  // Mock guest data
  const guestData = {
    rsvpStatus: existingRSVP?.status || "pending",
    tableNumber: 5,
    seatNumber: 3,
    dietaryRestrictions: "",
    plusOnes: existingRSVP?.plusOnes || 1,
    group: "friends",
  };

  // Enhanced mock data for live games
  const liveGamesData = {
    activeGames: 6,
    totalParticipants: 147,
    userRank: 8,
    userScore: 850,
    featuredGame: {
      title: "Love Story Trivia",
      participants: 23,
      timeLeft: "5 min",
      status: "Can Join",
    },
    recentAchievement: {
      title: "Social Butterfly",
      description: "Joined 3 games in one session",
      points: 100,
    },
  };

  const quickActions = [
    {
      id: shouldUseRSVP ? "rsvp" : "tickets",
      label: shouldUseRSVP ? "Complete RSVP" : "View Ticket",
      icon: CheckCircle,
      status: shouldUseRSVP
        ? guestData.rsvpStatus === "pending"
          ? "pending"
          : "completed"
        : "available",
    },
    {
      id: "schedule",
      label: "View Schedule",
      icon: Calendar,
      status: "available",
    },
    { id: "seating", label: "My Seating", icon: Users, status: "available" },
    { id: "media", label: "Upload Photos", icon: Camera, status: "available" },
    {
      id: "activities",
      label: "Wedding Games",
      icon: Gamepad2,
      status: "hot",
      badge: `${liveGamesData.activeGames} Live`,
    },
    {
      id: "survey",
      label: "Share Wishes",
      icon: MessageSquare,
      status: "available",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "hot":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                {isConference ? (
                  <Building className="h-8 w-8" />
                ) : (
                  <Heart className="h-8 w-8" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {isConference ? event.name : event.couple}
                </h1>
                <p className="text-xl text-white/90">Welcome, {guest.name}!</p>
                <p className="text-white/80">
                  {event.date} • {event.time}
                </p>
                {isConference && event.conferenceData && (
                  <div className="mt-2 flex gap-2">
                    {event.conferenceData.tracks.slice(0, 3).map((track) => (
                      <Badge
                        key={track.id}
                        style={{ backgroundColor: track.color }}
                        className="text-xs text-white"
                      >
                        {track.name}
                      </Badge>
                    ))}
                    {event.conferenceData.tracks.length > 3 && (
                      <Badge className="bg-white/20 text-xs text-white">
                        +{event.conferenceData.tracks.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="border border-white/30 text-white hover:bg-white/20"
              >
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid h-12 w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger
              value="overview"
              className="text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value={shouldUseRSVP ? "rsvp" : "tickets"}
              className="text-sm"
            >
              {shouldUseRSVP ? "RSVP" : "Tickets"}
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="text-sm"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="seating"
              className="text-sm"
            >
              Seating
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="text-sm"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="relative text-sm"
            >
              Activities
              {liveGamesData.activeGames > 0 && (
                <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-red-500" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-8"
          >
            {/* Conference Registration Alert */}
            {isConference && event.conferenceData && (
              <Card className="border-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-white/20 p-3">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          📚 Conference Schedule Available
                        </h3>
                        <p className="text-white/90">
                          {event?.conferenceData?.registeredSessions?.length}{" "}
                          sessions registered
                          {event?.conferenceData?.waitlistedSessions &&
                            event?.conferenceData?.waitlistedSessions?.length >
                              0 &&
                            `, ${event?.conferenceData?.waitlistedSessions?.length} waitlisted`}
                        </p>
                        <div className="mt-2 flex gap-2">
                          {event.conferenceData.tracks
                            .slice(0, 2)
                            .map((track) => (
                              <span
                                key={track.id}
                                className="rounded bg-white/20 px-2 py-1 text-xs"
                              >
                                {track.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveTab("schedule")}
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Live Games Alert */}
            {!isConference && liveGamesData.activeGames > 0 && (
              <Card className="border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-white/20 p-3">
                        <Play className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          🎮 {liveGamesData.activeGames} Live Games Available!
                        </h3>
                        <p className="text-white/90">
                          {liveGamesData.totalParticipants} guests are playing
                          right now
                        </p>
                        {liveGamesData.recentAchievement && (
                          <div className="mt-2 flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-300" />
                            <span className="text-sm">
                              Achievement:{" "}
                              {liveGamesData.recentAchievement.title}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveTab("activities")}
                      className="bg-white text-purple-600 hover:bg-gray-100"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Quick Actions Grid */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {quickActions.map((action) => (
                    <Card
                      key={action.id}
                      className="relative cursor-pointer border-0 bg-white shadow-sm transition-shadow hover:shadow-lg"
                      onClick={() => setActiveTab(action.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="mb-4 flex justify-center">
                          <div
                            className={`rounded-full p-4 ${action.status === "hot" ? "bg-red-100" : "bg-rose-100"}`}
                          >
                            <action.icon
                              className={`h-8 w-8 ${action.status === "hot" ? "text-red-600" : "text-rose-600"}`}
                            />
                          </div>
                        </div>
                        <h3 className="mb-3 font-semibold text-gray-800">
                          {action.label}
                        </h3>
                        <Badge
                          className={`text-xs ${getStatusColor(action.status)}`}
                        >
                          {action.status === "pending"
                            ? "Action Required"
                            : action.status === "completed"
                              ? "Completed"
                              : action.status === "hot"
                                ? "Live Now!"
                                : "Available"}
                        </Badge>
                        {action.badge && (
                          <div className="absolute -top-2 -right-2">
                            <Badge className="animate-pulse bg-red-500 text-xs text-white">
                              {action.badge}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-rose-500" />
                      Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{guest.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-sm font-medium">{guest.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {shouldUseRSVP ? "RSVP Status:" : "Status:"}
                      </span>
                      <Badge className={getStatusColor(guestData.rsvpStatus)}>
                        {guestData.rsvpStatus}
                      </Badge>
                    </div>
                    {guestData.tableNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Table:</span>
                        <span className="font-medium">
                          Table {guestData.tableNumber}, Seat{" "}
                          {guestData.seatNumber}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Gaming Stats Card */}
                <Card className="border-0 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Your Gaming Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {liveGamesData.userScore}
                      </div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Global Rank:</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        #{liveGamesData.userRank}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Games Played:</span>
                      <span className="font-medium">4</span>
                    </div>
                    {liveGamesData.recentAchievement && (
                      <div className="rounded-lg bg-yellow-50 p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium text-yellow-800">
                            Latest Achievement
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-yellow-700">
                          {liveGamesData.recentAchievement.title} (+
                          {liveGamesData.recentAchievement.points} pts)
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="h-5 w-5 text-rose-500" />
                      Event Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                    <div className="rounded-lg bg-gray-100 p-8">
                      <QrCode className="mx-auto mb-2 h-20 w-20 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {shouldUseRSVP
                          ? "Your Digital RSVP"
                          : "Your Digital Ticket"}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Show this QR code at check-in
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {shouldUseRSVP ? (
            <TabsContent value="rsvp">
              <GuestRSVPForm
                guest={guest}
                event={event}
                existingRSVP={existingRSVP}
              />
            </TabsContent>
          ) : (
            <TabsContent value="tickets">
              <div className="mx-auto max-w-4xl space-y-6">
                {/* Ticket Status Header */}
                <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-6 text-center">
                    <QrCode className="mx-auto mb-3 h-12 w-12" />
                    <h2 className="mb-2 text-2xl font-bold">
                      Your Ticket for {event.name}
                    </h2>
                    <Badge
                      className={`${
                        event.ticketDetails?.checkedIn
                          ? "bg-green-500"
                          : new Date(
                                String(event?.startDate),
                              ).toDateString() === new Date().toDateString()
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      } px-4 py-2 text-sm text-white`}
                    >
                      {event.ticketDetails?.checkedIn
                        ? "Checked In"
                        : new Date(String(event.startDate)).toDateString() ===
                            new Date().toDateString()
                          ? "Ready for Check-in"
                          : "Ticket Confirmed"}
                    </Badge>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Digital Ticket */}
                  <Card className="bg-white shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Digital Ticket
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4 text-center">
                        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                          <QrCode className="mx-auto mb-3 h-20 w-20 text-gray-400" />
                          <p className="text-sm font-medium text-gray-600">
                            {event.ticketDetails?.checkedIn
                              ? "Already Checked In"
                              : "Scan to Check In"}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            QR Code:{" "}
                            {event.ticketDetails?.qrCode || "QR123456789"}
                          </p>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Ticket Type:</span>
                            <span className="font-semibold text-gray-900">
                              {event.ticketDetails?.type || "General Admission"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Quantity:</span>
                            <span className="font-semibold text-gray-900">
                              {event.ticketDetails?.quantity || 1}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Amount Paid:</span>
                            <span className="font-semibold text-green-600">
                              $
                              {event.ticketDetails?.totalPaid ||
                                event.ticketPrice ||
                                0}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">
                              Purchase Date:
                            </span>
                            <span className="font-semibold text-gray-900">
                              {event.ticketDetails?.purchaseDate
                                ? new Date(
                                    event.ticketDetails.purchaseDate,
                                  ).toLocaleDateString()
                                : new Date().toLocaleDateString()}
                            </span>
                          </div>
                          {event.ticketDetails?.checkedIn &&
                            event.ticketDetails?.checkInTime && (
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Checked In:
                                </span>
                                <span className="font-semibold text-green-600">
                                  {new Date(
                                    event.ticketDetails.checkInTime,
                                  ).toLocaleString()}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {!event.ticketDetails?.checkedIn &&
                          new Date(String(event.startDate)) >= new Date() && (
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                              <QrCode className="mr-2 h-4 w-4" />
                              Check In Now
                            </Button>
                          )}
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Download Ticket
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Event Details */}
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Event Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {new Date(
                              String(event.startDate),
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-gray-600">{event.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {event.location}
                          </p>
                          <p className="text-gray-600">{event.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Ticket Holder
                          </p>
                          <p className="text-gray-600">{guest.name}</p>
                          <p className="text-sm text-gray-500">{guest.email}</p>
                        </div>
                      </div>

                      {event.ticketDetails?.ticketNumbers && (
                        <div className="rounded-lg bg-blue-50 p-4">
                          <p className="text-sm font-medium text-blue-800">
                            Ticket Numbers
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {event.ticketDetails.ticketNumbers.map((ticket) => (
                              <Badge
                                key={ticket}
                                variant="outline"
                                className="font-mono"
                              >
                                {ticket}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="rounded-lg bg-green-50 p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-700">
                            {isConference
                              ? "Conference Access"
                              : "Event Access"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-green-600">
                          {isConference
                            ? "Access to all sessions and networking areas"
                            : "Full event access included"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Information */}
                {event.description && (
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <CardTitle>About This Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-relaxed text-gray-700">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          )}

          <TabsContent value="schedule">
            <GuestScheduleView
              event={event}
              guest={guest}
            />
          </TabsContent>

          <TabsContent value="seating">
            <EnhancedGuestSeatingView
              guestName={guest.name}
              guestEmail={guest.email}
              tableNumber={guestData.tableNumber}
              seatNumber={guestData.seatNumber}
            />
          </TabsContent>

          <TabsContent value="media">
            <GuestMediaUpload
              event={event}
              guest={guest}
            />
          </TabsContent>

          <TabsContent value="activities">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <GuestGamesView
                event={event}
                guest={guest}
              />
              <GuestSurveyView
                event={event}
                guest={guest}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestDashboard;
