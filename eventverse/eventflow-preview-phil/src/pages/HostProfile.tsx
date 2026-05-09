
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Star, Heart, ArrowLeft, Share, Flag, CheckCircle, Clock, Award } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { mockEvents } from "@/data/mockEvents";
import PublicEventCard from "@/components/PublicEventCard";

const HostProfile = () => {
  const { hostId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  // Get all events by this host
  const hostEvents = useMemo(() => {
    return mockEvents.filter(event => event.hostId === hostId);
  }, [hostId]);

  // Separate upcoming and past events
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return hostEvents.filter(event => event.startDate > now);
  }, [hostEvents]);

  const pastEvents = useMemo(() => {
    const now = new Date();
    return hostEvents.filter(event => event.startDate <= now);
  }, [hostEvents]);

  // Calculate host statistics from actual events
  const hostStats = useMemo(() => {
    const totalAttendees = hostEvents.reduce((sum, event) => sum + event.attendeeCount, 0);
    const totalEvents = hostEvents.length;
    const averageRating = hostEvents.length > 0 
      ? hostEvents.reduce((sum, event) => sum + event.hostRating, 0) / hostEvents.length 
      : 0;
    
    // Get the most common category
    const categoryCount = hostEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const primaryCategory = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || "Events";

    return {
      totalEvents,
      totalAttendees,
      averageRating: Math.round(averageRating * 10) / 10,
      primaryCategory,
      upcomingCount: upcomingEvents.length,
      pastCount: pastEvents.length
    };
  }, [hostEvents, upcomingEvents, pastEvents]);

  // Create dynamic host data based on events
  const host = useMemo(() => {
    if (hostEvents.length === 0) return null;
    
    const firstEvent = hostEvents[0];
    const oldestEvent = hostEvents.reduce((oldest, event) => 
      event.startDate < oldest.startDate ? event : oldest
    );

    return {
      id: hostId,
      name: firstEvent.hostName,
      bio: `Passionate event organizer specializing in ${hostStats.primaryCategory.toLowerCase()} experiences. Creating memorable moments and bringing communities together through thoughtfully curated events.`,
      rating: hostStats.averageRating,
      totalEvents: hostStats.totalEvents,
      totalAttendees: hostStats.totalAttendees,
      joinedDate: oldestEvent.startDate,
      verified: hostStats.totalEvents >= 5, // Verified if 5+ events
      avatar: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      specialties: [hostStats.primaryCategory, "Community Building", "Experience Design"],
      responseRate: "95%",
      responseTime: "Within 2 hours"
    };
  }, [hostId, hostEvents, hostStats]);

  const handleSaveEvent = (eventId: string) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  if (!host) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Host not found</h1>
          <p className="text-gray-600 mb-4">This host doesn't have any events yet.</p>
          <Link to="/events">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-purple-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/events">
              <Button variant="ghost" size="sm" className="hover:bg-purple-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Cover with Gradient Overlay */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
          <img 
            src={host.coverImage} 
            alt="Host cover"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Floating stats badges on cover */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <div className="backdrop-blur-xl bg-white/20 rounded-full px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2 text-white">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{host.rating}</span>
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/20 rounded-full px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-4 h-4" />
              <span className="font-bold">{host.totalAttendees}+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-12">
        {/* Profile Card with Glass Effect */}
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl p-8 mb-8 border border-purple-100">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar with Ring */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img 
                    src={host.avatar} 
                    alt={host.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {host.verified && (
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2 border-4 border-white shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
                    {host.name}
                  </h1>
                  {host.verified && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Host
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing 
                      ? "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 hover:from-pink-200 hover:to-purple-200" 
                      : "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white shadow-lg"
                    }
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                    Contact
                  </Button>
                </div>
              </div>

              {/* Specialties with colorful badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {host.specialties.map((specialty, idx) => {
                  const colors = [
                    "bg-gradient-to-r from-purple-500 to-pink-500",
                    "bg-gradient-to-r from-pink-500 to-orange-500",
                    "bg-gradient-to-r from-orange-500 to-yellow-500"
                  ];
                  return (
                    <Badge key={specialty} className={`${colors[idx % colors.length]} text-white border-0 shadow-md`}>
                      {specialty}
                    </Badge>
                  );
                })}
              </div>
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{host.bio}</p>
              
              {/* Trust indicators with icons */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">Since {format(host.joinedDate, "MMM yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 bg-pink-50 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 text-pink-600" />
                  <span className="text-gray-700">{host.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">{host.responseRate} response</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{hostStats.totalEvents}</div>
              <div className="text-purple-100 text-sm font-medium">Total Events</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{hostStats.totalAttendees.toLocaleString()}</div>
              <div className="text-pink-100 text-sm font-medium">Total Attendees</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1">{hostStats.upcomingCount}</div>
              <div className="text-orange-100 text-sm font-medium">Upcoming</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-4xl font-bold text-white mb-1 flex items-center gap-2">
                <Star className="w-8 h-8 fill-current" />
                {hostStats.averageRating}
              </div>
              <div className="text-yellow-100 text-sm font-medium">Rating</div>
            </div>
          </div>
        </div>

        {/* Events Tabs with Modern Design */}
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-purple-100 shadow-lg">
            <TabsTrigger 
              value="upcoming" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
            >
              Upcoming ({hostStats.upcomingCount})
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
            >
              Past ({hostStats.pastCount})
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <PublicEventCard
                    key={event.id}
                    event={event}
                    isSaved={savedEvents.includes(event.id)}
                    onSave={() => handleSaveEvent(event.id)}
                    isPastEvent={false}
                  />
                ))}
              </div>
            ) : (
              <div className="backdrop-blur-sm bg-white/70 rounded-3xl p-16 text-center border border-purple-100">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No upcoming events</h3>
                <p className="text-gray-600">{host.name} doesn't have any upcoming events scheduled</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(event => (
                  <PublicEventCard
                    key={event.id}
                    event={event}
                    isSaved={savedEvents.includes(event.id)}
                    onSave={() => handleSaveEvent(event.id)}
                    isPastEvent={true}
                  />
                ))}
              </div>
            ) : (
              <div className="backdrop-blur-sm bg-white/70 rounded-3xl p-16 text-center border border-pink-100">
                <div className="bg-gradient-to-br from-pink-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No past events</h3>
                <p className="text-gray-600">{host.name} hasn't hosted any events yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <div className="backdrop-blur-sm bg-white/70 rounded-3xl p-16 text-center border border-orange-100">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Reviews coming soon</h3>
              <p className="text-gray-600">Attendee reviews and ratings for {host.name}'s events</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HostProfile;
