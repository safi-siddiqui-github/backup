import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  Camera, 
  Gift, 
  Clock,
  CheckCircle,
  QrCode,
  MessageSquare,
  Gamepad2,
  ArrowLeft,
  User,
  Trophy,
  Star,
  Zap,
  Play,
  Building,
  BookOpen,
  Bell,
  TrendingUp,
  Ticket,
  Megaphone,
  Plane,
  Network,
  Utensils,
  ShoppingBag,
  ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GuestRSVPForm from "./GuestRSVPForm";
import GuestScheduleView from "./GuestScheduleView";
import { EnhancedGuestSeatingView } from "./EnhancedGuestSeatingView";
import GuestMediaUpload from "./GuestMediaUpload";
import GuestGamesView from "./GuestGamesView";
import GuestSurveyView from "./GuestSurveyView";
import { QuickActionCard } from "./attending/QuickActionCard";
import { AnimatedCounter } from "./attending/AnimatedCounter";
import { getEventTypeGradient } from "@/utils/attendingColors";
import GuestAnnouncementsView from "./announcements/GuestAnnouncementsView";
import GuestTravelView from "./travel/GuestTravelView";
import GuestNetworkingView from "./networking/GuestNetworkingView";
import GuestDiningView from "./dining/GuestDiningView";
import GuestMerchandiseView from "./merchandise/GuestMerchandiseView";
import EnhancedGuestTicketingView from "./ticketing/EnhancedGuestTicketingView";

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
  event: EventData;
}

const GuestDashboard = ({ guest, event }: GuestDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(`guest_${event.id}`);
    window.location.reload();
  };

  const handleBack = () => {
    navigate('/events');
  };

  // Check if this is a conference event
  const isConference = event.eventType === 'Conference' && event.conferenceData;

  // Define event types that should use RSVP instead of ticketing
  const rsvpEventTypes = ['Wedding', 'Baby Shower', 'Birthday Party', 'Anniversary', 'Family Gathering', 'Private Party'];
  
  // Determine if this event should use RSVP vs tickets
  // Priority: If event has ticket pricing/details, show ticket interface
  // Otherwise, fall back to event type-based RSVP logic
  const hasTicketData = (event.ticketPrice && event.ticketPrice > 0) || event.ticketDetails;
  const shouldUseRSVP = !hasTicketData && rsvpEventTypes.some(type => 
    event.eventType?.toLowerCase().includes(type.toLowerCase()) ||
    event.category?.toLowerCase().includes(type.toLowerCase()) ||
    event.name?.toLowerCase().includes('wedding') ||
    event.couple?.toLowerCase().includes('wedding')
  );

  // Load existing RSVP for RSVP events
  const existingRSVP = shouldUseRSVP ? 
    JSON.parse(localStorage.getItem(`rsvp_${event.couple}_${guest.email}`) || 'null') : null;

  // Mock guest data
  const guestData = {
    rsvpStatus: existingRSVP?.status || "pending",
    tableNumber: 5,
    seatNumber: 3,
    dietaryRestrictions: "",
    plusOnes: existingRSVP?.plusOnes || 1,
    group: "friends"
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
      status: "Can Join"
    },
    recentAchievement: {
      title: "Social Butterfly",
      description: "Joined 3 games in one session",
      points: 100
    }
  };

  const quickActions = [
    { 
      id: shouldUseRSVP ? "rsvp" : "tickets", 
      label: shouldUseRSVP ? "Complete RSVP" : "View Ticket", 
      icon: CheckCircle, 
      status: shouldUseRSVP ? 
        (guestData.rsvpStatus === "pending" ? "pending" : "completed") : 
        "available" 
    },
    { id: "schedule", label: "View Schedule", icon: Calendar, status: "available" },
    { id: "seating", label: "My Seating", icon: Users, status: "available" },
    { id: "media", label: "Upload Photos", icon: Camera, status: "available" },
    { 
      id: "activities", 
      label: "Wedding Games", 
      icon: Gamepad2, 
      status: "hot",
      badge: `${liveGamesData.activeGames} Live`
    },
    { id: "survey", label: "Share Wishes", icon: MessageSquare, status: "available" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'hot': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const eventGradient = getEventTypeGradient(event.eventType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Enhanced Header with glassmorphism */}
      <div className="relative overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${eventGradient} opacity-20 blur-3xl`} />
        
        <div className={`relative bg-gradient-to-r ${eventGradient} backdrop-blur-sm`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-2xl">
                  {isConference ? <Building className="w-10 h-10 text-white" /> : <Heart className="w-10 h-10 text-white" />}
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">{isConference ? event.name : event.couple}</h1>
                  <p className="text-xl text-white/95 font-medium mt-1">Welcome back, {guest.name}! 👋</p>
                  <p className="text-white/90 font-medium">{event.date} • {event.time}</p>
                  {isConference && event.conferenceData && (
                    <div className="flex gap-2 mt-3">
                      {event.conferenceData.tracks.slice(0, 3).map((track) => (
                        <Badge key={track.id} style={{ backgroundColor: track.color }} className="text-white text-xs shadow-lg backdrop-blur-sm">
                          {track.name}
                        </Badge>
                      ))}
                      {event.conferenceData.tracks.length > 3 && (
                        <Badge className="bg-white/20 text-white text-xs backdrop-blur-sm shadow-lg">
                          +{event.conferenceData.tracks.length - 3} more
                        </Badge>
                      )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Stats Row */}
            <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter value={liveGamesData.userScore} duration={1500} />
                  </div>
                  <div className="text-xs text-white/80">Points</div>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <div>
                  <div className="text-2xl font-bold text-white">#{liveGamesData.userRank}</div>
                  <div className="text-xs text-white/80">Rank</div>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-300" />
                <div>
                  <div className="text-2xl font-bold text-white">{liveGamesData.activeGames}</div>
                  <div className="text-xs text-white/80">Live Games</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
            >
              Exit
            </Button>
          </div>
        </div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="flex overflow-x-auto bg-card/80 backdrop-blur-sm shadow-lg border-0 h-14 rounded-xl scrollbar-hide gap-1 px-2">
            <TabsTrigger value="overview" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Overview
            </TabsTrigger>
            <TabsTrigger value="rsvp" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              RSVP
            </TabsTrigger>
            <TabsTrigger value="tickets" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="announcements" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="seating" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Seating
            </TabsTrigger>
            <TabsTrigger value="media" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Photos
            </TabsTrigger>
            <TabsTrigger value="travel" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Travel
            </TabsTrigger>
            <TabsTrigger value="games" className="text-sm font-medium rounded-lg relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Games
              {liveGamesData.activeGames > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
              )}
            </TabsTrigger>
            <TabsTrigger value="surveys" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-green-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Surveys
            </TabsTrigger>
            <TabsTrigger value="networking" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Networking
            </TabsTrigger>
            <TabsTrigger value="dining" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Food & Dining
            </TabsTrigger>
            <TabsTrigger value="merchandise" className="text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white whitespace-nowrap min-w-fit px-4">
              Merchandise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Conference Registration Alert */}
            {isConference && event.conferenceData && (
              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">📚 Conference Schedule Available</h3>
                        <p className="text-white/95 text-lg font-medium">
                          {event.conferenceData.registeredSessions.length} sessions registered
                          {event.conferenceData.waitlistedSessions.length > 0 && 
                            `, ${event.conferenceData.waitlistedSessions.length} waitlisted`
                          }
                        </p>
                        <div className="flex gap-2 mt-3">
                          {event.conferenceData.tracks.slice(0, 2).map((track) => (
                            <span key={track.id} className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium">
                              {track.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setActiveTab("schedule")}
                      className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6 font-semibold"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      View Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Live Games Alert */}
            {!isConference && liveGamesData.activeGames > 0 && (
              <Card className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-pulse">
                        <Play className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">🎮 {liveGamesData.activeGames} Live Games Available!</h3>
                        <p className="text-white/95 text-lg font-medium mb-3">{liveGamesData.totalParticipants} guests are playing right now</p>
                        {liveGamesData.recentAchievement && (
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-300" />
                            <span className="font-medium">Achievement: {liveGamesData.recentAchievement.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => setActiveTab("activities")}
                      className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6 font-semibold"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions Grid with new cards */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-primary" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <div
                      key={action.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <QuickActionCard
                        {...action}
                        onClick={() => setActiveTab(action.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                <Card className="bg-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className={`bg-gradient-to-br ${eventGradient} rounded-lg p-2 shadow-md`}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground font-medium">Name:</span>
                      <span className="font-semibold text-foreground">{guest.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground font-medium">Email:</span>
                      <span className="font-medium text-foreground text-sm">{guest.email}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground font-medium">{shouldUseRSVP ? 'RSVP Status:' : 'Status:'}</span>
                      <Badge className={getStatusColor(guestData.rsvpStatus)}>
                        {guestData.rsvpStatus}
                      </Badge>
                    </div>
                    {guestData.tableNumber && (
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground font-medium">Table:</span>
                        <span className="font-semibold text-foreground">Table {guestData.tableNumber}, Seat {guestData.seatNumber}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Gaming Stats Card with gradients */}
                <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 shadow-md">
                        <Trophy className="w-5 h-5" />
                      </div>
                      Your Gaming Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                      <div className="text-4xl font-extrabold">
                        <AnimatedCounter value={liveGamesData.userScore} duration={1500} />
                      </div>
                      <div className="text-sm text-white/90 font-medium mt-1">Total Points</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <span className="font-medium">Global Rank:</span>
                      <Badge className="bg-yellow-400 text-yellow-900 border-0 font-bold">#{liveGamesData.userRank}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <span className="font-medium">Games Played:</span>
                      <span className="font-bold">4</span>
                    </div>
                    {liveGamesData.recentAchievement && (
                      <div className="p-4 bg-yellow-400/20 backdrop-blur-sm rounded-xl border border-yellow-300/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-yellow-300" />
                          <span className="font-bold">Latest Achievement</span>
                        </div>
                        <div className="text-sm text-white/95">
                          {liveGamesData.recentAchievement.title} (+{liveGamesData.recentAchievement.points} pts)
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-rose-500" />
                      Event Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="bg-gray-100 rounded-lg p-8">
                      <QrCode className="w-20 h-20 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {shouldUseRSVP ? 'Your Digital RSVP' : 'Your Digital Ticket'}
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

          <TabsContent value="rsvp">
            <GuestRSVPForm guest={guest} event={event} existingRSVP={existingRSVP} />
          </TabsContent>

          <TabsContent value="tickets">
            <EnhancedGuestTicketingView event={event} guest={guest} />
          </TabsContent>

          <TabsContent value="announcements">
            <GuestAnnouncementsView />
          </TabsContent>

          <TabsContent value="schedule">
            <GuestScheduleView event={event} guest={guest} />
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
            <GuestMediaUpload event={event} guest={guest} />
          </TabsContent>

          <TabsContent value="travel">
            <GuestTravelView 
              eventId={event.id}
              eventLocation={event.location}
              eventAddress={event.address}
              eventStartDate={event.startDate}
              eventEndDate={event.startDate}
              guestId={guest.email}
            />
          </TabsContent>

          <TabsContent value="games">
            <GuestGamesView event={event} guest={guest} />
          </TabsContent>

          <TabsContent value="surveys">
            <GuestSurveyView event={event} guest={guest} />
          </TabsContent>

          <TabsContent value="networking">
            <GuestNetworkingView event={event} />
          </TabsContent>

          <TabsContent value="dining">
            <GuestDiningView event={event} />
          </TabsContent>

          <TabsContent value="merchandise">
            <GuestMerchandiseView event={event} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestDashboard;
