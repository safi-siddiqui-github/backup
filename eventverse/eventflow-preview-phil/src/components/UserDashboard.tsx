import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Users, Settings, Search, MapPin, Clock, User, Trophy, Sparkles, Target, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import HostingEventsNavigation from "./HostingEventsNavigation";
import AttendingEventsNavigation from "./AttendingEventsNavigation";
import EventDashboard from "./EventDashboard";
import HostAchievementSystem from "./host/HostAchievementSystem";
import HostMotivationInsights from "./host/HostMotivationInsights";
import LiveActivityFeed from "./host/LiveActivityFeed";
import MilestoneCountdown from "./host/MilestoneCountdown";
import RewardSystem from "./host/RewardSystem";
import CelebrationModal from "./host/CelebrationModal";
import { mockHostingEvents } from "@/data/mockHostingEvents";
import { mockAttendingEvents } from "@/data/mockAttendingEvents";

// Using centralized mock data - remove local definitions

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.isPublicOrganizer ? "achievements" : "hosting");
  
  // Update active tab when organizer status changes
  const [previousOrganizerStatus, setPreviousOrganizerStatus] = useState(user?.isPublicOrganizer);
  
  // Effect to handle organizer status changes and update tabs accordingly
  useEffect(() => {
    if (user?.isPublicOrganizer !== previousOrganizerStatus) {
      setPreviousOrganizerStatus(user?.isPublicOrganizer);
      // Reset to appropriate default tab when organizer status changes
      setActiveTab(user?.isPublicOrganizer ? "achievements" : "hosting");
    }
  }, [user?.isPublicOrganizer, previousOrganizerStatus]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationAchievement, setCelebrationAchievement] = useState(null);
  const eventsPerPage = 6;

  const handleEventSelect = (event) => {
    // Create full event data using the rich mock data
    const fullEventData = {
      id: event.id,
      eventName: event.name,
      eventType: event.eventType,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      time: event.time || "12:00 PM",
      locations: event.locations || [{ name: event.location, address: event.location }],
      selectedModules: event.selectedModules,
      weather: event.weather || { temperature: 20, condition: "clear", icon: "sun" },
      conferenceData: event.conferenceData,
      createdAt: new Date()
    };
    
    setSelectedEvent(fullEventData);
  };

  const handleAttendingEventSelect = (event) => {
    // Navigate to guest portal using the correct route pattern
    navigate(`/events/${event.id}/guest`);
  };

  const handleBackFromEvent = () => {
    setSelectedEvent(null);
  };

  // If an event is selected, show the event dashboard
  if (selectedEvent) {
    return (
      <EventDashboard 
        event={selectedEvent} 
        onBack={handleBackFromEvent}
        onEdit={() => {}} // Empty for now since there's no edit functionality in UserDashboard
      />
    );
  }

  // Calculate enhanced dashboard stats with gamification
  const calculateDashboardStats = () => {
    const totalEvents = mockHostingEvents.length + mockAttendingEvents.length;
    const upcomingEvents = [...mockHostingEvents, ...mockAttendingEvents].filter(
      event => new Date(event.startDate) > new Date()
    ).length;
    const totalGuests = mockHostingEvents.reduce((sum, event) => sum + event.attendees, 0) + 
                      mockAttendingEvents.length;

    // Enhanced stats for gamification
    const hostStats = {
      totalEvents: mockHostingEvents.length,
      totalGuests: totalGuests,
      averageRating: 4.8,
      totalReviews: 23,
      successfulEvents: Math.round(mockHostingEvents.length * 0.96),
      repeatGuests: 34,
      currentStreak: 8,
      longestStreak: 12,
      xp: 3850,
      level: 3
    };

    // Mock recent reviews for insights
    const recentReviews = [
      {
        rating: 5,
        comment: "Absolutely incredible event! Every detail was perfect and the experience was unforgettable.",
        eventName: "Sarah & Michael's Wedding",
        date: "2 days ago"
      },
      {
        rating: 5,
        comment: "Best corporate event we've ever attended. Professional, engaging, and flawlessly executed.",
        eventName: "Tech Summit 2024",
        date: "1 week ago"
      },
      {
        rating: 4,
        comment: "Great event overall, loved the interactive elements. Maybe a bit more time for networking would be perfect.",
        eventName: "Annual Gala",
        date: "2 weeks ago"
      }
    ];

    return { totalEvents, upcomingEvents, totalGuests, hostStats, recentReviews };
  };

  const { totalEvents, upcomingEvents, totalGuests, hostStats, recentReviews } = calculateDashboardStats();

  // Show simplified stats for non-organizers
  if (!user?.isPublicOrganizer) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
                <p className="text-muted-foreground text-lg">Manage your events</p>
              </div>
              <Button onClick={() => navigate('/create-event')} className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-card shadow-sm h-12 border border-border">
              <TabsTrigger value="hosting" className="text-sm data-[state=active]:bg-accent">Hosting</TabsTrigger>
              <TabsTrigger value="attending" className="text-sm data-[state=active]:bg-accent">Attending</TabsTrigger>
            </TabsList>

            <TabsContent value="hosting">
              <HostingEventsNavigation
                events={mockHostingEvents}
                onEventSelect={handleEventSelect}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                eventsPerPage={eventsPerPage}
              />
            </TabsContent>

            <TabsContent value="attending">
              <AttendingEventsNavigation
                events={mockAttendingEvents}
                onEventSelect={handleAttendingEventSelect}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                eventsPerPage={eventsPerPage}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Dashboard Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                My Dashboard
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                  <Trophy className="w-3 h-3 mr-1" />
                  Level {hostStats.level}
                </Badge>
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your events and track your achievements
              </p>
            </div>
            <div className="flex gap-3">
            <Button onClick={() => navigate('/create-event')} className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
              <Button variant="outline" className="border-border hover:bg-accent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Overview with Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="gradient-card bg-card shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                    <p className="text-3xl font-bold text-foreground">{totalEvents}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3" />
                      +2 this month
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="gradient-card bg-card shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Guests</p>
                    <p className="text-3xl font-bold text-foreground">{totalGuests.toLocaleString()}</p>
                    <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                      <Trophy className="w-3 h-3" />
                      Top 5% hosts
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card bg-card shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold text-foreground">{Math.round((hostStats.successfulEvents / hostStats.totalEvents) * 100)}%</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3" />
                      Excellent
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="gradient-card bg-card shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">XP Points</p>
                    <p className="text-3xl font-bold text-foreground">{hostStats.xp.toLocaleString()}</p>
                    <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3" />
                      +250 this week
                    </p>
                  </div>
                  <Sparkles className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Tabs with Achievements */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${user?.isPublicOrganizer ? 'grid-cols-6' : 'grid-cols-2'} bg-card shadow-sm h-12 border border-border`}>
            {user?.isPublicOrganizer && (
              <>
                <TabsTrigger value="achievements" className="text-sm data-[state=active]:bg-accent">
                  <Trophy className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="insights" className="text-sm data-[state=active]:bg-accent">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Insights
                </TabsTrigger>
                <TabsTrigger value="milestones" className="text-sm data-[state=active]:bg-accent">
                  <Target className="w-4 h-4 mr-2" />
                  Milestones
                </TabsTrigger>
                <TabsTrigger value="rewards" className="text-sm data-[state=active]:bg-accent">
                  <Gift className="w-4 h-4 mr-2" />
                  Rewards
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="hosting" className="text-sm data-[state=active]:bg-accent">Hosting</TabsTrigger>
            <TabsTrigger value="attending" className="text-sm data-[state=active]:bg-accent">Attending</TabsTrigger>
          </TabsList>

          {user?.isPublicOrganizer && (
            <>
              <TabsContent value="achievements">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <HostAchievementSystem hostStats={hostStats} />
                  </div>
                  <div>
                    <LiveActivityFeed />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <HostMotivationInsights 
                  totalEvents={hostStats.totalEvents}
                  totalGuests={hostStats.totalGuests}
                  avgRating={hostStats.averageRating}
                  recentReviews={recentReviews}
                />
              </TabsContent>

              <TabsContent value="milestones">
                <MilestoneCountdown />
              </TabsContent>

              <TabsContent value="rewards">
                <RewardSystem />
              </TabsContent>
            </>
          )}

          <TabsContent value="hosting">
            <HostingEventsNavigation
              events={mockHostingEvents}
              onEventSelect={handleEventSelect}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              eventsPerPage={eventsPerPage}
            />
          </TabsContent>

          <TabsContent value="attending">
            <AttendingEventsNavigation
              events={mockAttendingEvents}
              onEventSelect={handleAttendingEventSelect}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              eventsPerPage={eventsPerPage}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        open={showCelebration}
        onClose={() => setShowCelebration(false)}
        achievement={celebrationAchievement}
      />
    </div>
  );
};

export default UserDashboard;
