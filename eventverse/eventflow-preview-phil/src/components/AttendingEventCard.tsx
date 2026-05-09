
import { EventData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Star, User, Lock, Globe, Zap, Share, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { generateEventTags } from "@/utils/eventTagUtils";
import { getEventTypeBorder, getEventTypeGradient } from "@/utils/attendingColors";

// Local event interface for this component
interface AttendingEventData {
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

interface AttendingEventCardProps {
  event: AttendingEventData;
  onEventSelect: (event: AttendingEventData) => void;
}

const AttendingEventCard = ({ event, onEventSelect }: AttendingEventCardProps) => {
  const handleCardClick = () => {
    onEventSelect(event);
  };

  const now = new Date();
  const eventIsInPast = event.startDate < now;
  const eventIsToday = event.startDate.toDateString() === now.toDateString();

  const ticketDetails = event.ticketDetails || {
    quantity: 1,
    type: "General Admission",
    totalPaid: event.ticketPrice,
    checkedIn: eventIsInPast
  };

  // Generate dynamic tags
  const dynamicTags = generateEventTags(
    {
      category: event.category,
      eventType: event.eventType,
      subcategory: event.subcategory,
      format: event.format,
      startDate: event.startDate,
      ticketDetails: ticketDetails,
      moduleUsage: event.moduleUsage,
      maxCapacity: event.maxCapacity,
      attendeeCount: event.attendeeCount
    },
    'attending',
    eventIsInPast
  );

  const eventGradient = getEventTypeGradient(event.eventType);
  const borderColor = getEventTypeBorder(event.eventType);
  const hasGames = event.moduleUsage?.games && event.moduleUsage.games.participated.length > 0;

  return (
    <Card 
      className={`group relative overflow-hidden border-0 bg-card cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] animate-fade-in border-l-4 ${borderColor}`}
      onClick={handleCardClick}
    >
      {/* Glassmorphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Event Image with gradient overlay */}
      <div className="relative h-52 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${eventGradient} opacity-60`} />
        <img 
          src={event.image} 
          alt={event.eventName}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
        />
        
        {/* Floating Status Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge className={`border-0 backdrop-blur-sm shadow-lg ${
            ticketDetails.checkedIn ? 'bg-emerald-500/90 text-white' : 
            eventIsToday ? 'bg-orange-500/90 text-white animate-pulse' : 
            'bg-blue-500/90 text-white'
          }`}>
            {ticketDetails.checkedIn ? '✓ Checked In' : 
             eventIsToday ? '⚡ Today' : '✓ Confirmed'}
          </Badge>

          {hasGames && (
            <Badge className="border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse shadow-lg">
              🔥 Live Games
            </Badge>
          )}
        </div>

        {/* Privacy Badge */}
        <Badge className={`absolute top-3 right-3 border-0 backdrop-blur-sm flex items-center gap-1 shadow-lg ${
          event.isPublic ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
        }`}>
          {event.isPublic ? (
            <>
              <Globe className="w-3 h-3" />
              Public
            </>
          ) : (
            <>
              <Lock className="w-3 h-3" />
              Private
            </>
          )}
        </Badge>

        {/* Ticket/Guest Count - Bottom */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-white/95 dark:bg-gray-900/95 text-foreground border-0 backdrop-blur-sm shadow-lg px-3 py-1">
            {event.moduleUsage?.rsvp ? 
              `👥 ${1 + (Number(event.moduleUsage.rsvp.responses?.plusOnes) || 0)} Guest${1 + (Number(event.moduleUsage.rsvp.responses?.plusOnes) || 0) > 1 ? 's' : ''}` :
              `🎟️ ${ticketDetails.quantity} Ticket${ticketDetails.quantity > 1 ? 's' : ''}`
            }
          </Badge>
        </div>

        {/* Quick Actions on Hover */}
        <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-8 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              // Share functionality
            }}
          >
            <Share className="w-3 h-3 mr-1" />
            Share
          </Button>
        </div>
      </div>

      <CardContent className="relative p-6 space-y-4">
        {/* Date and Time with gradient accent */}
        <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${eventGradient} bg-clip-text text-transparent`}>
          <Calendar className="w-4 h-4 text-primary" />
          <span>{format(event.startDate, "EEE, MMM d")}</span>
          <span>•</span>
          <Clock className="w-4 h-4 text-primary" />
          <span>{event.time}</span>
        </div>

        {/* Event Title with gradient on hover */}
        <h3 className="font-bold text-foreground text-xl leading-tight group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {event.eventName}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className={event.locations[0].name === "Online Event" ? "text-primary font-medium" : ""}>
            {event.locations[0].name}
          </span>
        </div>

        {/* Dynamic Event Tags */}
        <div className="flex flex-wrap gap-2">
          {dynamicTags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index}
              className={`text-xs ${tag.color} border-0 shadow-sm`}
            >
              {tag.text}
            </Badge>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-border pt-4" />

        {/* Host and Payment Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${eventGradient} rounded-full flex items-center justify-center shadow-md`}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{event.hostName}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-muted-foreground font-medium">{event.hostRating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {event.moduleUsage?.rsvp ? (
              <div>
                <span className="text-xs text-muted-foreground">RSVP</span>
                <p className="text-sm font-bold text-foreground">
                  {event.moduleUsage.rsvp.status === 'attending' ? '✓ Attending' : 
                   event.moduleUsage.rsvp.status === 'confirmed' ? '✓ Confirmed' : 
                   event.moduleUsage.rsvp.status}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs text-muted-foreground">Paid</span>
                <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${ticketDetails.totalPaid}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendingEventCard;
