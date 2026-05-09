
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, MapPin, Users, Clock, ArrowRight, Camera, Gift, Gamepad2, Trophy, Zap, Play, CheckCircle } from "lucide-react";
import GuestDashboard from "@/components/GuestDashboard";
import { mockAttendingEvents, MockAttendingEvent } from "@/data/mockAttendingEvents";

interface GuestInfo {
  name: string;
  email: string;
  isCheckedIn: boolean;
}

const GuestPortal = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPersonalizeOption, setShowPersonalizeOption] = useState(false);

  // Find event by ID from mock data
  const foundEvent = mockAttendingEvents.find(event => event.id === eventId);
  
  // If event not found, redirect or show error
  if (!foundEvent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Map MockAttendingEvent to expected format
  const eventData = {
    id: foundEvent.id,
    name: foundEvent.eventName,
    couple: foundEvent.eventType === 'Wedding' ? foundEvent.eventName.replace(' Wedding Celebration', '') : foundEvent.hostName,
    description: foundEvent.description,
    date: foundEvent.startDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    startDate: foundEvent.startDate,
    time: foundEvent.time,
    location: foundEvent.locations[0]?.name || 'TBD',
    address: foundEvent.locations[0]?.address || 'TBD',
    dresscode: foundEvent.eventType === 'Wedding' ? 'Cocktail Attire' : 'Business Casual',
    theme: foundEvent.category,
    eventType: foundEvent.eventType,
    category: foundEvent.category,
    locations: foundEvent.locations,
    conferenceData: foundEvent.conferenceData,
    rsvpDeadline: new Date(foundEvent.startDate.getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    gameStats: {
      activeGames: Math.floor(Math.random() * 10) + 5,
      totalParticipants: foundEvent.attendeeCount || 100,
      featuredGames: [
        { name: `${foundEvent.eventType} Trivia`, players: Math.floor(Math.random() * 50) + 20, status: "Hot" },
        { name: "Photo Scavenger Hunt", players: Math.floor(Math.random() * 40) + 15, status: "Live" },
        { name: "Memory Match Challenge", players: Math.floor(Math.random() * 30) + 10, status: "Starting Soon" }
      ]
    }
  };

  useEffect(() => {
    // Check if guest is already checked in
    const storedGuest = localStorage.getItem(`guest_${eventId}`);
    if (storedGuest) {
      setGuestInfo(JSON.parse(storedGuest));
    }
  }, [eventId]);

  const handleGuestCheckIn = () => {
    if (name.trim() && email.trim()) {
      const guest: GuestInfo = {
        name: name.trim(),
        email: email.trim(),
        isCheckedIn: true
      };
      setGuestInfo(guest);
      localStorage.setItem(`guest_${eventId}`, JSON.stringify(guest));
    }
  };

  const handleQuickAccess = () => {
    // Create anonymous guest session
    const guest: GuestInfo = {
      name: "Guest",
      email: "",
      isCheckedIn: true
    };
    setGuestInfo(guest);
    // Don't store in localStorage for quick access
  };

  const handlePersonalizedAccess = () => {
    if (name.trim() && email.trim()) {
      const guest: GuestInfo = {
        name: name.trim(),
        email: email.trim(),
        isCheckedIn: true
      };
      setGuestInfo(guest);
      localStorage.setItem(`guest_${eventId}`, JSON.stringify(guest));
    }
  };

  if (guestInfo) {
    return <GuestDashboard guest={guestInfo} event={eventData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Enhanced Hero Section with animated gradient mesh */}
      <div className="relative overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-purple-400 opacity-30 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400 via-indigo-300 to-purple-400 opacity-20 blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        
        <div className="relative bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-2xl">
                <Heart className="w-16 h-16 text-white animate-[float_3s_ease-in-out_infinite]" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in">
              {eventData.couple}
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              {eventData.description}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/90 text-lg mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="w-6 h-6" />
                <span className="font-semibold">{eventData.date}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="w-6 h-6" />
                <span className="font-semibold">{eventData.time}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="w-6 h-6" />
                <span className="font-semibold">{eventData.location}</span>
              </div>
            </div>
            
            {/* Enhanced Live Games Highlight */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl border border-white/20 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 animate-pulse">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">🎮 {eventData.gameStats.activeGames} Live Games Available!</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {eventData.gameStats.featuredGames.map((game, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-white font-semibold text-sm mb-2">{game.name}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs">{game.players} playing</span>
                      <Badge className={
                        game.status === "Hot" ? "bg-red-500 text-white border-0" :
                        game.status === "Live" ? "bg-green-500 text-white border-0" :
                        "bg-yellow-500 text-white border-0"
                      }>
                        {game.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                <Users className="w-4 h-4" />
                <span className="font-medium">{eventData.gameStats.totalParticipants} guests are already playing! Join them after check-in.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Check-in Section with modern design */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-300">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl flex items-center justify-center gap-3">
                  <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-full p-2">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  Join the Event!
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Choose how you'd like to experience this event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showPersonalizeOption ? (
                  <div className="space-y-4">
                    <Button 
                      onClick={handleQuickAccess}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Quick Access
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-muted-foreground font-medium">or</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowPersonalizeOption(true)}
                      variant="outline"
                      className="w-full h-14 text-lg font-semibold border-2 hover:bg-rose-50 dark:hover:bg-rose-950 hover:border-rose-300 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Personalized Experience
                    </Button>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg space-y-2 text-sm">
                      <p className="flex items-start gap-2">
                        <Zap className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span><strong>Quick Access:</strong> Browse event info, schedule, and participate in activities</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Heart className="w-4 h-4 mt-0.5 text-rose-600 flex-shrink-0" />
                        <span><strong>Personalized:</strong> Get RSVP features, seating assignments, and save your preferences</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-foreground">Your Name</label>
                      <Input
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background h-12 text-base border-2 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-3 block text-foreground">Email Address</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background h-12 text-base border-2 focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={() => setShowPersonalizeOption(false)}
                        variant="outline"
                        className="flex-1 h-12 font-semibold"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handlePersonalizedAccess}
                        disabled={!name.trim() || !email.trim()}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Event Highlights */}
          <div className="space-y-6">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-4">What Awaits You</h2>
              <p className="text-muted-foreground text-lg mb-8">Discover all the amazing features we've prepared for your event experience</p>
            </div>

            <Card className="bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/20 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                  <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg p-2">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  Interactive Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">Complete your RSVP and meal preferences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">View your assigned seating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">Access the complete event schedule</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">Upload photos to our event album</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">Participate in fun games</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">Share your wishes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Gaming Features Card */}
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-2">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  Live Gaming Experience
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                    <Play className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">Join live trivia games with other guests</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                    <Camera className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">Participate in photo scavenger hunts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">Compete for prizes and achievements</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                    <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">See live leaderboards and your ranking</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-white/60 to-purple-50/60 dark:from-gray-800/60 dark:to-purple-900/60 rounded-lg backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {eventData.gameStats.totalParticipants}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">Guests Already Playing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-5 text-lg">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start p-3 bg-muted/50 rounded-lg">
                    <strong className="text-foreground">Venue:</strong> 
                    <span className="text-right text-muted-foreground max-w-xs">{eventData.address}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <strong className="text-foreground">Dress Code:</strong> 
                    <span className="text-muted-foreground">{eventData.dresscode}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <strong className="text-foreground">Theme:</strong> 
                    <span className="text-muted-foreground">{eventData.theme}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-t border-border">
                    <strong className="text-foreground">RSVP Deadline:</strong>
                    <Badge variant="outline" className="text-rose-600 border-rose-300 dark:text-rose-400 dark:border-rose-700 font-semibold">
                      {eventData.rsvpDeadline}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPortal;
