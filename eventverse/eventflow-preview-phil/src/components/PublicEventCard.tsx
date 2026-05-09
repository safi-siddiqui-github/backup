
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, DollarSign, Star, Heart, Ticket, User } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import TicketPurchaseDialog from "./TicketPurchaseDialog";

interface PublicEventCardProps {
  event: {
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
    isPublic?: boolean;
    allowsPlusOne?: boolean;
    plusOnePrice?: number;
  };
  isSaved: boolean;
  onSave: () => void;
  isPastEvent?: boolean;
}

const PublicEventCard = ({ event, isSaved, onSave, isPastEvent }: PublicEventCardProps) => {
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const handleTicketAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPastEvent) {
      return; // Do nothing for past events
    }
    
    setShowTicketDialog(true);
  };

  const handleSaveEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
  };

  const handleHostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const isVirtual = event.locations[0].name === "Online Event";
  const spotsLeft = event.maxCapacity - event.attendeeCount;
  const isAlmostFull = spotsLeft <= event.maxCapacity * 0.1;

  // Check if event is in the past - only use isPastEvent prop if provided, otherwise check date
  const now = new Date();
  const eventIsInPast = isPastEvent !== undefined ? isPastEvent : event.startDate < now;

  // Select priority tags to display
  const getPriorityTags = () => {
    const tags = [];
    
    // Add category
    tags.push({ text: event.category, color: "bg-blue-100 text-blue-800" });
    
    // Add format
    if (event.format === "virtual") {
      tags.push({ text: "Virtual", color: "bg-green-100 text-green-800" });
    } else if (event.format === "hybrid") {
      tags.push({ text: "Hybrid", color: "bg-purple-100 text-purple-800" });
    }
    
    // Add subcategory or event type if available
    if (event.subcategory) {
      tags.push({ text: event.subcategory, color: "bg-gray-100 text-gray-800" });
    } else if (event.eventType !== event.category) {
      tags.push({ text: event.eventType, color: "bg-gray-100 text-gray-800" });
    }
    
    // Add special conditions
    if (isAlmostFull && !eventIsInPast) {
      tags.push({ text: "Almost full", color: "bg-orange-100 text-orange-800" });
    }
    
    if (eventIsInPast) {
      tags.push({ text: "Past Event", color: "bg-gray-100 text-gray-600" });
    }
    
    return tags.slice(0, 3); // Show max 3 tags
  };

  const priorityTags = getPriorityTags();

  return (
    <>
      <Link to={`/events/${event.id}`} className="block">
        <Card className={`group hover:shadow-lg transition-all duration-200 overflow-hidden border-0 shadow-sm bg-white cursor-pointer hover:scale-[1.02] ${eventIsInPast ? 'opacity-75' : ''}`}>
          {/* Event Image */}
          <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-500 overflow-hidden">
            <img 
              src={event.image} 
              alt={event.eventName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-3 right-3 ${isSaved ? 'text-red-500 bg-white/90' : 'text-white bg-black/20'} hover:bg-white/90 hover:text-red-500 rounded-full w-10 h-10 p-0`}
              onClick={handleSaveEvent}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
            {event.featured && !eventIsInPast && (
              <Badge className="absolute top-3 left-3 bg-purple-500 text-white border-0">
                Featured
              </Badge>
            )}
            {event.ticketPrice === 0 && !eventIsInPast && (
              <Badge className="absolute bottom-3 left-3 bg-green-500 text-white border-0">
                Free
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            {/* Date and Time */}
            <div className="flex items-center gap-2 text-sm text-purple-600 font-medium mb-2">
              <Calendar className="w-4 h-4" />
              <span>{format(event.startDate, "EEE, MMM d")}</span>
              <span>•</span>
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>

            {/* Event Title */}
            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 group-hover:text-purple-600 transition-colors">
              {event.eventName}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span className={isVirtual ? "text-purple-600" : ""}>
                {event.locations[0].name}
              </span>
            </div>

            {/* Host - Now Clickable */}
            <Link 
              to={`/host/${event.hostId}`}
              onClick={handleHostClick}
              className="flex items-center gap-2 mb-3 hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors group/host"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
              <span className="text-sm text-gray-600 group-hover/host:text-purple-600 transition-colors">{event.hostName}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-500">{event.hostRating}</span>
              </div>
            </Link>

            {/* Event Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {priorityTags.map((tag, index) => (
                <Badge 
                  key={index}
                  className={`text-xs ${tag.color} border-0`}
                >
                  {tag.text}
                </Badge>
              ))}
            </div>

            {/* Attendees and Price */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{event.attendeeCount} {eventIsInPast ? 'attended' : 'going'}</span>
              </div>

              <div className="text-right">
                {event.ticketPrice === 0 ? (
                  <span className="text-lg font-bold text-green-600">Free</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">from</span>
                    <span className="text-lg font-bold text-gray-900">${event.ticketPrice}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          {/* Action Buttons */}
          <CardFooter className="p-4 pt-0">
            {eventIsInPast ? (
              <Button 
                disabled 
                className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Event Ended
              </Button>
            ) : (
              <Button 
                onClick={handleTicketAction} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {event.ticketPrice === 0 ? "Get tickets" : "Buy tickets"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </Link>

      <TicketPurchaseDialog
        isOpen={showTicketDialog}
        onClose={() => setShowTicketDialog(false)}
        event={event}
      />
    </>
  );
};

export default PublicEventCard;
