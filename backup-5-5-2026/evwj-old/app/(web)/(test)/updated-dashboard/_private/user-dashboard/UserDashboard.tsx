"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTypeV2 } from "@/hooks/useAuth";
import { Calendar, Gift, Sparkles, Target, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import AttendingEventsNavigation from "../attending/AttendingEventsNavigation";
import CelebrationModal from "./CelebrationModal";
import   EnhancedHeader   from "./EnhancedHeader";
import   EnhancedStatCards   from "./EnhancedStatCards";
import HostAchievementSystem from "./HostAchievementSystem";
import HostingEventsNavigation from "../hosting/HostingEventsNavigation";
import HostMotivationInsights from "./HostMotivationInsights";
import LiveActivityFeed from "./LiveActivityFeed";
import MilestoneCountdown from "./MilestoneCountdown";
import { mockAttendingEvents } from "../attending/mockAttendingEvents";
import { MockHostingEvent, mockHostingEvents } from "../hosting/mockHostingEvents";
import RewardSystem from "./RewardSystem";
import  UpcomingEventsPreview  from "./UpcomingEventsPreview";
import WelcomeHeader   from "./WelcomeHeader";

// Using centralized mock data - remove local definitions

export default function () {
	// const navigate = useNavigate();
	// const { user } = useAuth();
	const user: UserTypeV2 = {
		id: "",
		name: "",
		email: "",
		plan: "free",
		eventsCreated: 0,
		activeProfileType: "personal",
		organizationMemberships: [],
		activeProfileContext: "personal",
	};
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
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [showCelebration, setShowCelebration] = useState(false);
	const [celebrationAchievement, setCelebrationAchievement] = useState(null);
	const eventsPerPage = 6;

	const handleEventSelect = (event: MockHostingEvent) => {
		// Create full event data using the rich mock data
		const fullEventData = {
			id: event.id,
			eventName: event.name,
			eventType: event.eventType,
			description: event.description,
			startDate: event.startDate,
			endDate: event.endDate,
			time: event.time || "12:00 PM",
			locations: event.locations || [
				{ name: event.location, address: event.location },
			],
			selectedModules: event.selectedModules,
			weather: event.weather || {
				temperature: 20,
				condition: "clear",
				icon: "sun",
			},
			conferenceData: event.conferenceData,
			createdAt: new Date(),
		};

		// setSelectedEvent(fullEventData);
	};

	const handleAttendingEventSelect = () => {
		// Navigate to guest portal using the correct route pattern
		// navigate(`/events/${event.id}/guest`);
	};

	const handleBackFromEvent = () => {
		setSelectedEvent(null);
	};

	// If an event is selected, show the event dashboard
	// if (selectedEvent) {
	//   return (
	//     <EventDashboard
	//       event={selectedEvent}
	//       onBack={handleBackFromEvent}
	//       onEdit={() => {}} // Empty for now since there's no edit functionality in UserDashboard
	//     />
	//   );
	// }


	// Calculate enhanced dashboard stats with gamification
	const calculateDashboardStats = () => {
		const totalEvents = mockHostingEvents.length + mockAttendingEvents.length;
		const upcomingEvents = [
			...mockHostingEvents,
			...mockAttendingEvents,
		].filter((event) => new Date(event.startDate) > new Date()).length;
		const totalGuests =
			mockHostingEvents.reduce((sum, event) => sum + event.attendees, 0) +
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

	// Show enhanced dashboard for non-organizers
	if (!user?.isPublicOrganizer) {
		const upcomingHosting = mockHostingEvents.filter(
			(e) => new Date(e.startDate) > new Date(),
		).length;
		const upcomingAttending = mockAttendingEvents.filter(
			(e) => new Date(e.startDate) > new Date(),
		).length;
		const upcomingTotal = upcomingHosting + upcomingAttending;

		return (
			<div className="bg-secondary min-h-screen dark:bg-transparent">
				<div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
					<div className="border-border rounded-3xl border bg-white/95 shadow-sm dark:bg-[#020617]">
						<div className="px-4 py-6 md:px-6 md:py-8">
							{/* Enhanced Welcome Header */}
							<WelcomeHeader userName={user?.name} />

							{/* Upcoming Events Preview */}
							<UpcomingEventsPreview
								hostingEvents={mockHostingEvents}
								attendingEvents={mockAttendingEvents}
								onEventSelect={handleEventSelect}
								onAttendingEventSelect={handleAttendingEventSelect}
							/>

							{/* Enhanced Tabs */}
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="space-y-6"
							>
								<TabsList className="bg-muted/50 border-border/50 grid h-14 w-full grid-cols-2 rounded-2xl border p-2 shadow-lg backdrop-blur-xl">
									<TabsTrigger
										value="hosting"
										className="rounded-xl text-xs transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md md:text-sm"
									>
										<Calendar className="mr-2 h-4 w-4" />
										Hosting ({mockHostingEvents.length})
									</TabsTrigger>
									<TabsTrigger
										value="attending"
										className="rounded-xl text-xs transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md md:text-sm"
									>
										<Users className="mr-2 h-4 w-4" />
										Attending ({mockAttendingEvents.length})
									</TabsTrigger>
								</TabsList>

								<div className="flex flex-col bg-linear-to-br dark:from-purple-950/40 dark:to-blue-950/40">
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
								</div>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const nextLevel = 5000; // Next level XP threshold
	const successRate = Math.round(
		(hostStats.successfulEvents / hostStats.totalEvents) * 100,
	);

	return (
		<div className="bg-background min-h-screen dark:bg-transparent">
			<div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
				<div className="border-border rounded-3xl border bg-white/95 shadow-sm dark:bg-[#020617]">
					<div className="px-4 py-6 md:px-6 md:py-8">
						{/* Enhanced Dashboard Header */}
						<EnhancedHeader
							userName={user?.name}
							level={hostStats.level}
							xp={hostStats.xp}
							nextLevelXp={nextLevel}
						/>

						{/* Enhanced Stats Cards */}
						<EnhancedStatCards
							totalEvents={totalEvents}
							totalGuests={totalGuests}
							successRate={successRate}
							xp={hostStats.xp}
						/>

						{/* Enhanced Tabs with Glass Effect */}
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="space-y-6"
						>
							<TabsList
								className={`grid w-full ${user?.isPublicOrganizer ? "grid-cols-6" : "grid-cols-2"} bg-muted/50 border-border/50 h-14 rounded-2xl border p-2 shadow-lg backdrop-blur-xl`}
							>
								{user?.isPublicOrganizer && (
									<>
										<TabsTrigger
											value="achievements"
											className="rounded-xl text-sm transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
										>
											<Trophy className="mr-2 h-4 w-4" />
											Achievements
										</TabsTrigger>
										<TabsTrigger
											value="insights"
											className="rounded-xl text-sm transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
										>
											<Sparkles className="mr-2 h-4 w-4" />
											Insights
										</TabsTrigger>
										<TabsTrigger
											value="milestones"
											className="rounded-xl text-sm transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
										>
											<Target className="mr-2 h-4 w-4" />
											Milestones
										</TabsTrigger>
										<TabsTrigger
											value="rewards"
											className="rounded-xl text-sm transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
										>
											<Gift className="mr-2 h-4 w-4" />
											Rewards
										</TabsTrigger>
									</>
								)}
								<TabsTrigger
									value="hosting"
									className="rounded-xl text-sm transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
								>
									Hosting
								</TabsTrigger>
								<TabsTrigger
									value="attending"
									className="rounded-xl text-sm transition-all duration-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md"
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
				</div>
			</div>

			{/* Celebration Modal */}
			<CelebrationModal
				open={showCelebration}
				onClose={() => setShowCelebration(false)}
				achievement={celebrationAchievement}
			/>
		</div>
	);
}
