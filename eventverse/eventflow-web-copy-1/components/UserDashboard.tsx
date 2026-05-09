"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAttendingEvents } from "@/data/mockAttendingEvents";
import { MockHostingEvent, mockHostingEvents } from "@/data/mockHostingEvents";
import { useAuth } from "@/hooks/useAuth";
import {
  Calendar,
  Gift,
  Plus,
  Settings,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AttendingEventsNavigation from "./AttendingEventsNavigation";
import EnhancedEventCreationDialog, {
  EventFormData,
  EventLocation,
} from "./EnhancedEventCreationDialog";
import EventDashboard from "./EventDashboard";
import CelebrationModal from "./host/CelebrationModal";
import HostAchievementSystem from "./host/HostAchievementSystem";
import HostMotivationInsights from "./host/HostMotivationInsights";
import LiveActivityFeed from "./host/LiveActivityFeed";
import MilestoneCountdown from "./host/MilestoneCountdown";
import RewardSystem from "./host/RewardSystem";
import HostingEventsNavigation from "./HostingEventsNavigation";

// Using centralized mock data - remove local definitions

const UserDashboard = () => {
  // const navigate = useNavigate();
  const navigate = () => {};
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(
    user?.isPublicOrganizer ? "achievements" : "hosting",
  );

  // Update active tab when organizer status changes
  const [previousOrganizerStatus, setPreviousOrganizerStatus] = useState(
    user?.isPublicOrganizer,
  );

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
  const [selectedEvent, setSelectedEvent] =
    useState<Partial<MockHostingEvent> | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationAchievement, setCelebrationAchievement] = useState(null);
  const eventsPerPage = 6;

  const handleEventSelect = (event: MockHostingEvent) => {
    // Create full event data using the rich mock data
    const fullEventData: Partial<MockHostingEvent> = {
      id: event.id,
      eventName: event.name,
      eventType: event.eventType,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      time: event.time || "12:00 PM",
      locations:
        event.locations ||
        ([
          { name: event.location, address: event.location },
        ] as EventLocation[]),
      selectedModules: event.selectedModules,
      weather: event.weather || {
        temperature: 20,
        condition: "clear",
        icon: "sun",
      },
      conferenceData: event.conferenceData,
      createdAt: new Date(),
    };

    setSelectedEvent(fullEventData);
  };

  const handleAttendingEventSelect = (event: unknown) => {
    // Navigate to guest portal using the correct route pattern
    // navigate(`/events/${event.id}/guest`);
  };

  const handleBackFromEvent = () => {
    setSelectedEvent(null);
  };

  const handleCreateEvent = (eventData: Partial<EventFormData>) => {
    console.log("Creating event:", eventData);
    setShowCreateDialog(false);
    // Here you would typically save the event and navigate to it
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
    const upcomingEvents = [
      ...mockHostingEvents,
      ...mockAttendingEvents,
    ].filter((event) => new Date(String(event.startDate)) > new Date()).length;
    const totalGuests =
      mockHostingEvents.reduce(
        (sum, event) => sum + (event?.attendees ?? 0),
        0,
      ) + mockAttendingEvents.length;

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
      level: 3,
    };

    // Mock recent reviews for insights
    const recentReviews = [
      {
        rating: 5,
        comment:
          "Absolutely incredible event! Every detail was perfect and the experience was unforgettable.",
        eventName: "Sarah & Michael's Wedding",
        date: "2 days ago",
      },
      {
        rating: 5,
        comment:
          "Best corporate event we've ever attended. Professional, engaging, and flawlessly executed.",
        eventName: "Tech Summit 2024",
        date: "1 week ago",
      },
      {
        rating: 4,
        comment:
          "Great event overall, loved the interactive elements. Maybe a bit more time for networking would be perfect.",
        eventName: "Annual Gala",
        date: "2 weeks ago",
      },
    ];

    return {
      totalEvents,
      upcomingEvents,
      totalGuests,
      hostStats,
      recentReviews,
    };
  };

  const { totalEvents, upcomingEvents, totalGuests, hostStats, recentReviews } =
    calculateDashboardStats();

  // Show simplified stats for non-organizers
  if (!user?.isPublicOrganizer) {
    return (
      <div className="bg-background min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-foreground text-3xl font-bold">
                  My Dashboard
                </h1>
                <p className="text-muted-foreground text-lg">
                  Manage your events
                </p>
              </div>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-card border-border grid h-12 w-full grid-cols-2 border shadow-sm">
              <TabsTrigger
                value="hosting"
                className="data-[state=active]:bg-accent text-sm"
              >
                Hosting
              </TabsTrigger>
              <TabsTrigger
                value="attending"
                className="data-[state=active]:bg-accent text-sm"
              >
                Attending
              </TabsTrigger>
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

        <EnhancedEventCreationDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onEventCreated={handleCreateEvent}
        />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Enhanced Dashboard Title Section */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-foreground flex items-center gap-3 text-3xl font-bold">
                My Dashboard
                <Badge className="border-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <Trophy className="mr-1 h-3 w-3" />
                  Level {hostStats.level}
                </Badge>
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your events and track your achievements
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-accent"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Overview with Achievements */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Card className="gradient-card bg-card border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Total Events
                    </p>
                    <p className="text-foreground text-3xl font-bold">
                      {totalEvents}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                      <Sparkles className="h-3 w-3" />
                      +2 this month
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card bg-card border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Total Guests
                    </p>
                    <p className="text-foreground text-3xl font-bold">
                      {totalGuests.toLocaleString()}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-purple-600">
                      <Trophy className="h-3 w-3" />
                      Top 5% hosts
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card bg-card border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Success Rate
                    </p>
                    <p className="text-foreground text-3xl font-bold">
                      {Math.round(
                        (hostStats.successfulEvents / hostStats.totalEvents) *
                          100,
                      )}
                      %
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                      <Sparkles className="h-3 w-3" />
                      Excellent
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card bg-card border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">XP Points</p>
                    <p className="text-foreground text-3xl font-bold">
                      {hostStats.xp.toLocaleString()}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-blue-600">
                      <Sparkles className="h-3 w-3" />
                      +250 this week
                    </p>
                  </div>
                  <Sparkles className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Tabs with Achievements */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList
            className={`grid w-full ${user?.isPublicOrganizer ? "grid-cols-6" : "grid-cols-2"} bg-card border-border h-12 border shadow-sm`}
          >
            {user?.isPublicOrganizer && (
              <>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-accent text-sm"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-accent text-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Insights
                </TabsTrigger>
                <TabsTrigger
                  value="milestones"
                  className="data-[state=active]:bg-accent text-sm"
                >
                  <Target className="mr-2 h-4 w-4" />
                  Milestones
                </TabsTrigger>
                <TabsTrigger
                  value="rewards"
                  className="data-[state=active]:bg-accent text-sm"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Rewards
                </TabsTrigger>
              </>
            )}
            <TabsTrigger
              value="hosting"
              className="data-[state=active]:bg-accent text-sm"
            >
              Hosting
            </TabsTrigger>
            <TabsTrigger
              value="attending"
              className="data-[state=active]:bg-accent text-sm"
            >
              Attending
            </TabsTrigger>
          </TabsList>

          {user?.isPublicOrganizer && (
            <>
              <TabsContent value="achievements">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

      {/* Create Event Dialog */}
      <EnhancedEventCreationDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onEventCreated={handleCreateEvent}
      />

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
