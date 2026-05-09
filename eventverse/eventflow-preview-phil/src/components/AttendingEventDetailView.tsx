
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  QrCode, 
  CheckCircle,
  Clock,
  Star,
  Heart,
  Share,
  Download,
  User,
  Camera,
  Gamepad2,
  MessageSquare,
  Settings,
  Bell,
  Eye,
  Megaphone,
  AlertTriangle,
  Info,
  CloudRain,
  Car,
  Shield,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { format } from "date-fns";
// Remove conflicting import
// import { EventData } from "@/types";
import GuestRSVPForm from "./GuestRSVPForm";
import GuestTicketingView from "./GuestTicketingView";
import EnhancedGuestTicketingView from "./ticketing/EnhancedGuestTicketingView";
import GuestScheduleView from "./GuestScheduleView";
import GuestSeatingView from "./GuestSeatingView";
import GuestMediaUpload from "./GuestMediaUpload";
import GuestGamesView from "./GuestGamesView";
import GuestSurveyView from "./GuestSurveyView";
import GuestTravelView from "./travel/GuestTravelView";
import GuestAnnouncementsView from "./announcements/GuestAnnouncementsView";
import GuestNetworkingView from "./networking/GuestNetworkingView";
import GuestDiningView from "./dining/GuestDiningView";
import GuestMerchandiseView from "./merchandise/GuestMerchandiseView";

interface EventUpdate {
  id: string;
  type: 'announcement' | 'schedule-change' | 'weather' | 'parking' | 'safety' | 'urgent';
  title: string;
  content: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
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

// Local event interface to match the component's usage
interface LocalEventData {
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
  moduleUsage?: {
    rsvp: { status: 'confirmed' | 'pending' | 'declined' | 'attending'; responses?: Record<string, unknown> };
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
}

interface AttendingEventDetailViewProps {
  event: LocalEventData;
  onBack: () => void;
}

const AttendingEventDetailView = ({ event, onBack }: AttendingEventDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedUpdate, setExpandedUpdate] = useState<string | null>(null);

  // Mock event updates data
  const eventUpdates: EventUpdate[] = [
    {
      id: "1",
      type: "urgent",
      title: "Venue Change - Important Update",
      content: "Due to unexpected circumstances, the ceremony location has been moved to the Grand Ballroom. All other details remain the same. Please arrive 15 minutes early for the new check-in process.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      priority: "high",
      isRead: false
    },
    {
      id: "2", 
      type: "schedule-change",
      title: "Reception Start Time Updated",
      content: "The reception will now start at 7:30 PM instead of 7:00 PM to allow more time for photos. Cocktail hour will be extended accordingly.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      priority: "medium",
      isRead: false
    },
    {
      id: "3",
      type: "weather",
      title: "Weather Update for Outdoor Ceremony",
      content: "Current forecast shows partly cloudy skies with a high of 75°F. Perfect weather for our outdoor ceremony! Light jackets recommended for the evening.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      priority: "low",
      isRead: true
    },
    {
      id: "4",
      type: "parking",
      title: "Parking Instructions",
      content: "Complimentary valet parking is available at the main entrance. Additional self-parking is available in the North lot. Please allow extra time for parking.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      priority: "medium",
      isRead: true
    },
    {
      id: "5",
      type: "announcement",
      title: "Welcome Message from the Couple",
      content: "We're so excited to celebrate with you! Thank you for being part of our special day. Don't forget to tag us in your photos using #JohnAndJaneWedding",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      priority: "low",
      isRead: true
    }
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'urgent': return AlertTriangle;
      case 'announcement': return Megaphone;
      case 'schedule-change': return Clock;
      case 'weather': return CloudRain;
      case 'parking': return Car;
      case 'safety': return Shield;
      default: return Info;
    }
  };

  const getUpdateColor = (type: string, priority: string) => {
    if (type === 'urgent' || priority === 'high') {
      return 'from-red-500 to-red-600';
    }
    switch (type) {
      case 'announcement': return 'from-blue-500 to-blue-600';
      case 'schedule-change': return 'from-orange-500 to-orange-600';
      case 'weather': return 'from-cyan-500 to-cyan-600';
      case 'parking': return 'from-purple-500 to-purple-600';
      case 'safety': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string, isRead: boolean) => {
    if (priority === 'high') {
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

  const unreadUpdatesCount = eventUpdates.filter(update => !update.isRead).length;

  // Define event types that should use RSVP instead of ticketing
  const rsvpEventTypes = ['Wedding', 'Baby Shower', 'Birthday Party', 'Anniversary', 'Family Gathering', 'Private Party'];
  
  // Determine if this event should use RSVP based on event type/category
  const shouldUseRSVP = rsvpEventTypes.some(type => 
    event.eventType?.toLowerCase().includes(type.toLowerCase()) ||
    event.category?.toLowerCase().includes(type.toLowerCase()) ||
    event.eventName?.toLowerCase().includes('wedding')
  );
  
  // For events that should use RSVP, override ticketing logic
  const isTicketingEvent = !shouldUseRSVP && (event.ticketPrice > 0 || event.ticketDetails);
  
  // Load existing RSVP if it's an RSVP event
  const existingRSVP = !isTicketingEvent ? 
    JSON.parse(localStorage.getItem(`rsvp_${event.hostName}_guest@example.com`) || 'null') : null;

  const ticketDetails = event.ticketDetails || {
    quantity: 1,
    type: "General Admission",
    ticketNumbers: ["TK-2024-001"],
    qrCode: "QR123456789",
    purchaseDate: "2024-12-20",
    totalPaid: event.ticketPrice,
    checkedIn: false,
    checkInTime: undefined
  };

  const moduleUsage = event.moduleUsage || {
    rsvp: { status: existingRSVP?.status || 'pending', responses: existingRSVP || {} },
    seating: { tableNumber: 5, seatNumber: 'A3', assignment: 'Table 5, Seat A3' },
    media: { photosUploaded: 12, albumAccess: true },
    games: { participated: ['Trivia', 'Photo Contest'], points: 850, rank: 3 },
    surveys: { completed: ['Event Feedback'], pending: ['Post-Event Survey'] }
  };

  const accessInfo = event.accessInfo || {
    entryCode: "ENTRY2024",
    vipAccess: false,
    specialPerks: ["Early Access", "Welcome Drink"],
    notifications: unreadUpdatesCount
  };

  const now = new Date();
  const eventIsInPast = event.startDate < now;
  const eventIsToday = event.startDate.toDateString() === now.toDateString();

  const guestInfo = {
    name: "Guest User",
    email: "guest@example.com",
    isCheckedIn: ticketDetails.checkedIn
  };

  const eventDataForGuest = {
    id: event.id,
    name: event.eventName,
    couple: event.hostName,
    description: event.description,
    date: format(event.startDate, "MMMM d, yyyy"),
    time: event.time,
    location: event.locations[0]?.name || "TBA",
    address: event.locations[0]?.address || "",
    startDate: event.startDate,
    dresscode: "Cocktail Attire",
    theme: event.category,
    rsvpDeadline: format(new Date(event.startDate.getTime() - 7 * 24 * 60 * 60 * 1000), "MMMM d, yyyy")
  };

  // Updated module stats based on event type
  const moduleStats = [
    {
      id: 'schedule', 
      label: 'Schedule', 
      icon: Calendar, 
      status: 'available', 
      description: 'View event timeline',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 'seating', 
      label: 'Seating', 
      icon: Users, 
      status: moduleUsage.seating.assignment ? 'assigned' : 'pending', 
      description: moduleUsage.seating.assignment || 'Assignment pending',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 'media', 
      label: 'Photos', 
      icon: Camera, 
      status: moduleUsage.media.photosUploaded > 0 ? 'active' : 'available', 
      description: `${moduleUsage.media.photosUploaded} photos uploaded`,
      color: 'from-pink-400 to-pink-600'
    },
    { 
      id: 'games', 
      label: 'Games', 
      icon: Gamepad2, 
      status: moduleUsage.games.participated.length > 0 ? 'active' : 'available', 
      description: `${moduleUsage.games.points} points earned`,
      color: 'from-orange-400 to-orange-600'
    },
    { 
      id: 'surveys', 
      label: 'Surveys', 
      icon: MessageSquare, 
      status: moduleUsage.surveys.pending.length > 0 ? 'pending' : 'completed', 
      description: `${moduleUsage.surveys.completed.length} completed`,
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  // Add the appropriate first module based on event type
  if (isTicketingEvent) {
    moduleStats.unshift({
      id: 'tickets', 
      label: 'Tickets', 
      icon: Ticket, 
      status: ticketDetails.checkedIn ? 'checked-in' : 'confirmed', 
      description: `${ticketDetails.type} - ${ticketDetails.checkedIn ? 'Checked In' : 'Ready'}`,
      color: 'from-green-400 to-green-600'
    });
  } else {
    moduleStats.unshift({
      id: 'rsvp', 
      label: 'RSVP', 
      icon: CheckCircle, 
      status: existingRSVP?.status || 'pending', 
      description: existingRSVP ? `Status: ${existingRSVP.status}` : 'Response needed',
      color: 'from-green-400 to-green-600'
    });
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': case 'assigned': case 'active': case 'completed': case 'attending': case 'checked-in':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-amber-500 text-white';
      case 'declined':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack} 
              className="text-white hover:bg-white/20 border border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex gap-3">
              <Button variant="outlineLight" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outlineLight" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {isTicketingEvent ? 'Ticket' : 'Details'}
              </Button>
            </div>
          </div>
          
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-3">{event.eventName}</h1>
            <div className="flex items-center justify-center gap-6 text-lg mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{format(event.startDate, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
            </div>
            <Badge className={`${
              (isTicketingEvent && ticketDetails.checkedIn) || (!isTicketingEvent && existingRSVP?.status === 'attending') ? 'bg-green-500' : 
              eventIsToday ? 'bg-orange-500' : 
              'bg-blue-500'
            } text-white text-sm px-4 py-2`}>
              {isTicketingEvent ? 
                (ticketDetails.checkedIn ? 'Checked In' : eventIsToday ? 'Event Today' : 'Ticket Confirmed') :
                (existingRSVP ? `RSVP: ${existingRSVP.status}` : 'RSVP Needed')
              }
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="flex overflow-x-auto bg-white/80 backdrop-blur-sm shadow-lg border-0 h-14 rounded-xl scrollbar-hide gap-1 px-2">
            <TabsTrigger value="overview" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Overview</TabsTrigger>
            <TabsTrigger value="rsvp" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">RSVP</TabsTrigger>
            <TabsTrigger value="tickets" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Tickets</TabsTrigger>
            <TabsTrigger value="announcements" className="text-sm font-medium rounded-lg flex items-center gap-1 whitespace-nowrap px-4">
              Announcements
              {unreadUpdatesCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadUpdatesCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Schedule</TabsTrigger>
            <TabsTrigger value="seating" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Seating</TabsTrigger>
            <TabsTrigger value="media" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Photos</TabsTrigger>
            <TabsTrigger value="travel" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Travel</TabsTrigger>
            <TabsTrigger value="games" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Games</TabsTrigger>
            <TabsTrigger value="surveys" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Surveys</TabsTrigger>
            <TabsTrigger value="networking" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Networking</TabsTrigger>
            <TabsTrigger value="dining" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Food & Dining</TabsTrigger>
            <TabsTrigger value="merchandise" className="text-sm font-medium rounded-lg whitespace-nowrap px-4">Merchandise</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Event Details Card */}
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{event.locations[0]?.name}</p>
                        {event.locations[0]?.address && (
                          <p className="text-gray-600 mt-1">{event.locations[0].address}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <User className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Hosted by {event.hostName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-gray-600">{event.hostRating} rating</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="w-6 h-6 text-purple-600" />
                      <p className="text-gray-900 font-medium">{event.attendeeCount} people attending</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Module Grid */}
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      Event Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {moduleStats.map((module) => (
                        <div
                          key={module.id}
                          className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
                          onClick={() => setActiveTab(module.id)}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center shadow-lg`}>
                                <module.icon className="w-6 h-6 text-white" />
                              </div>
                              <span className="font-semibold text-gray-900 text-lg">{module.label}</span>
                            </div>
                            <Badge className={`${getStatusColor(module.status)} mb-3`}>
                              {module.status}
                            </Badge>
                            <p className="text-sm text-gray-600">{module.description}</p>
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
                  <Card className="bg-gradient-to-br from-white to-blue-50 shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <Ticket className="w-5 h-5" />
                        Your Digital Ticket
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="bg-white rounded-xl p-6 shadow-inner border-2 border-dashed border-gray-300">
                          <QrCode className="w-20 h-20 mx-auto text-gray-400 mb-3" />
                          <p className="text-sm text-gray-600 font-medium">Scan to Check In</p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-semibold text-gray-900">{ticketDetails.type}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Amount Paid:</span>
                            <span className="font-semibold text-green-600">${ticketDetails.totalPaid}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Entry Code:</span>
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{accessInfo.entryCode}</span>
                          </div>
                        </div>
                      </div>
                      {!ticketDetails.checkedIn && !eventIsInPast && (
                        <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3">
                          <QrCode className="w-4 h-4 mr-2" />
                          Check In Now
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  /* RSVP Status for RSVP Events */
                  <Card className="bg-gradient-to-br from-white to-green-50 shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Your RSVP Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <Badge className={`${getStatusColor(existingRSVP?.status || 'pending')} text-lg px-4 py-2`}>
                          {existingRSVP?.status ? 
                            (existingRSVP.status === 'attending' ? 'Attending' : 
                             existingRSVP.status === 'declined' ? 'Not Attending' : 'Maybe') :
                            'Response Needed'
                          }
                        </Badge>
                        {existingRSVP && (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Guests:</span>
                              <span className="font-semibold text-gray-900">
                                {1 + (existingRSVP.plusOnes || 0)} person{1 + (existingRSVP.plusOnes || 0) > 1 ? 's' : ''}
                              </span>
                            </div>
                            {existingRSVP.mealChoice && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Meal:</span>
                                <span className="font-semibold text-gray-900">{existingRSVP.mealChoice}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Button 
                        className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3"
                        onClick={() => setActiveTab('rsvp')}
                      >
                        {existingRSVP ? 'Update RSVP' : 'Complete RSVP'}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Special Perks */}
                {accessInfo.specialPerks.length > 0 && (
                  <Card className="bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-900">
                        <Heart className="w-5 h-5 text-pink-500" />
                        Special Perks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {accessInfo.specialPerks.map((perk, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white/70 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700 font-medium">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Enhanced Event Updates */}
                {unreadUpdatesCount > 0 && (
                  <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-orange-900">
                        <div className="flex items-center gap-2">
                          <Bell className="w-5 h-5 text-orange-500" />
                          Event Updates
                        </div>
                        <Badge className="bg-orange-500 text-white">
                          {unreadUpdatesCount} new
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                      {eventUpdates.slice(0, 3).map((update) => {
                        const UpdateIcon = getUpdateIcon(update.type);
                        const isExpanded = expandedUpdate === update.id;
                        
                        return (
                          <div 
                            key={update.id} 
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                              !update.isRead ? 'bg-white border-orange-200' : 'bg-gray-50 border-gray-200'
                            }`}
                            onClick={() => toggleUpdateExpanded(update.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 bg-gradient-to-r ${getUpdateColor(update.type, update.priority)} rounded-lg flex items-center justify-center`}>
                                  <UpdateIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-sm truncate">{update.title}</h4>
                                  <p className="text-xs text-gray-500">{format(update.timestamp, 'MMM d, h:mm a')}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getPriorityBadge(update.priority, update.isRead)}
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-700 leading-relaxed">{update.content}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {eventUpdates.length > 3 && (
                        <Button variant="outline" size="sm" className="w-full border-orange-300 text-orange-700 hover:bg-orange-100">
                          View All {eventUpdates.length} Updates
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rsvp">
            <GuestRSVPForm 
              guest={guestInfo} 
              event={eventDataForGuest} 
              existingRSVP={existingRSVP}
            />
          </TabsContent>

          <TabsContent value="tickets">
            <EnhancedGuestTicketingView event={eventDataForGuest} guest={guestInfo} />
          </TabsContent>

          <TabsContent value="announcements">
            <GuestAnnouncementsView />
          </TabsContent>

          <TabsContent value="schedule">
            <GuestScheduleView event={eventDataForGuest} guest={guestInfo} />
          </TabsContent>

          <TabsContent value="seating">
            <GuestSeatingView 
              guest={guestInfo} 
              tableNumber={moduleUsage.seating.tableNumber} 
              seatNumber={moduleUsage.seating.seatNumber ? Number(moduleUsage.seating.seatNumber) : undefined} 
            />
          </TabsContent>

          <TabsContent value="media">
            <GuestMediaUpload event={eventDataForGuest} guest={guestInfo} />
          </TabsContent>

          <TabsContent value="travel">
            <GuestTravelView 
              eventId={event.id}
              eventLocation={event.locations[0]?.name || "Event Location"}
              eventAddress={event.locations[0]?.address || ""}
              eventStartDate={event.startDate}
              eventEndDate={event.endDate}
              guestId={guestInfo.email}
            />
          </TabsContent>

          <TabsContent value="games">
            <GuestGamesView event={eventDataForGuest} guest={guestInfo} />
          </TabsContent>

          <TabsContent value="surveys">
            <GuestSurveyView event={eventDataForGuest} guest={guestInfo} />
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

export default AttendingEventDetailView;
