
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star, Heart, ArrowLeft, Share2, DollarSign, User, Globe, Ticket } from "lucide-react";
import { format } from "date-fns";
import { mockEvents } from "@/data/mockEvents";
import TicketPurchaseDialog from "@/components/TicketPurchaseDialog";
import PublicEventCard from "@/components/PublicEventCard";

const EventDetails = () => {
  const { eventId } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Link to="/events">
            <Button>
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isVirtual = event.locations[0].name === "Online Event";
  const isFree = event.ticketPrice === 0;
  const spotsLeft = event.maxCapacity - event.attendeeCount;

  // Check if event is in the past
  const now = new Date();
  const eventIsInPast = event.startDate <= now;

  // Get other events by this host
  const otherEventsByHost = mockEvents
    .filter(e => e.hostId === event.hostId && e.id !== event.id)
    .slice(0, 6);

  // Get similar events based on category and subcategory
  const similarEvents = mockEvents
    .filter(e => 
      e.id !== event.id && // Exclude current event
      !otherEventsByHost.some(hostEvent => hostEvent.id === e.id) && // Exclude events by same host
      (e.category === event.category || e.subcategory === event.subcategory) // Same category or subcategory
    )
    .slice(0, 6);

  const handleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleTicketAction = () => {
    if (eventIsInPast) {
      return; // Do nothing for past events
    }
    
    setShowTicketDialog(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link to="/events" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Back to events
              </Link>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className={isSaved ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Hero */}
        <div className="relative h-96 bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-0">{event.category}</Badge>
                <Badge className="bg-white/20 text-white border-0">{event.format}</Badge>
                {event.featured && !eventIsInPast && (
                  <Badge className="bg-primary text-primary-foreground border-0">Featured</Badge>
                )}
                {isFree && !eventIsInPast && (
                  <Badge className="bg-green-500 text-white border-0">Free</Badge>
                )}
                {eventIsInPast && (
                  <Badge className="bg-gray-500 text-white border-0">Past Event</Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">{event.eventName}</h1>
              <p className="text-xl opacity-90">{event.description}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle>About this event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{format(event.startDate, "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.locations[0].name}</span>
                    {isVirtual && <Globe className="w-4 h-4 text-primary" />}
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {event.description} Join us for an unforgettable experience that brings together 
                      like-minded individuals in the {event.category.toLowerCase()} community. This event 
                      promises to deliver exceptional value and memorable moments for all attendees.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Host Information - Now Clickable */}
              <Card>
                <CardHeader>
                  <CardTitle>Meet your host</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link 
                    to={`/host/${event.hostId}`}
                    className="block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{event.hostName}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{event.hostRating} rating</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4 text-sm">
                      Experienced event organizer with a passion for creating memorable experiences 
                      in the {event.category.toLowerCase()} space.
                    </p>
                  </Link>
                </CardContent>
              </Card>

              {/* More Events by This Host */}
              {otherEventsByHost.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>More events by {event.hostName}</CardTitle>
                      <Link to={`/host/${event.hostId}`}>
                        <Button variant="outline" size="sm">
                          View all
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {otherEventsByHost.map(hostEvent => (
                        <PublicEventCard
                          key={hostEvent.id}
                          event={hostEvent}
                          isSaved={savedEvents.includes(hostEvent.id)}
                          onSave={() => handleSaveEvent(hostEvent.id)}
                          isPastEvent={hostEvent.startDate <= new Date()}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Similar Events You May Like */}
              {similarEvents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Similar events you may like</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {similarEvents.map(similarEvent => (
                        <PublicEventCard
                          key={similarEvent.id}
                          event={similarEvent}
                          isSaved={savedEvents.includes(similarEvent.id)}
                          onSave={() => handleSaveEvent(similarEvent.id)}
                          isPastEvent={similarEvent.startDate <= new Date()}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket/RSVP Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {isFree ? (
                      <div>
                        <span className="text-3xl font-bold text-green-600">Free</span>
                        <p className="text-sm text-gray-600">Tickets required</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-sm text-gray-500">Starting at</span>
                        <div className="text-3xl font-bold text-gray-900">
                          ${event.ticketPrice}
                        </div>
                      </div>
                    )}
                  </div>

                  {eventIsInPast ? (
                    <Button 
                      disabled 
                      className="w-full bg-gray-300 text-gray-500 cursor-not-allowed mb-4"
                      size="lg"
                    >
                      Event Ended
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleTicketAction}
                      className="w-full mb-4"
                      size="lg"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      {isFree ? "Get tickets" : "Buy tickets"}
                    </Button>
                  )}

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Attendees:</span>
                      <span>{event.attendeeCount} {eventIsInPast ? 'attended' : 'going'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span>{event.maxCapacity} total</span>
                    </div>
                    {!eventIsInPast && spotsLeft <= 50 && (
                      <p className="text-primary font-medium text-center">
                        Only {spotsLeft} spots left!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Event Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Event details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span>{event.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="capitalize">{event.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event type:</span>
                      <span>{event.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span>English</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <TicketPurchaseDialog
        isOpen={showTicketDialog}
        onClose={() => setShowTicketDialog(false)}
        event={event}
      />
    </>
  );
};

export default EventDetails;
