"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { ArrowRight, Calendar, Clock, Gift, LucideIcon, PartyPopper, Plus, Search, Sparkles, Star, Target, TrendingUp, Trophy, Users, Zap } from "lucide-react";
import {  ReactNode, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/lib-shadcn";
import { Badge } from "@/shadcn/ui/badge";

import HostingEventsNavigation from "../hosting/WebHostingEventsNavigationComponent";
import AttendingEventsNavigation from "../attending/WebAttendingEventsNavigationComponent";
 
 

import   EnhancedHeader   from "./EnhancedHeader";
import HostAchievementSystem from "./HostAchievementSystem";
import HostMotivationInsights from "./HostMotivationInsights";
import MilestoneCountdown from "./MilestoneCountdown";
import RewardSystem from "./RewardSystem";
import { Dialog, DialogContent } from "@/shadcn/ui/dialog";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { MockAttendingEvent, mockAttendingEvents } from "../attending/MockAttendingEvents";
import { MockHostingEvent, mockHostingEvents } from "../hosting/MockHostingEvents";



export default function WebUserDashboardComponent() {
	type UserTypeV2 = {
		id: string;
		name: string;
		email: string;
		plan: string;
		eventsCreated: number;
		activeProfileType: string;
		organizationMemberships: object[];  
		activeProfileContext: string;
		isPublicOrganizer?: boolean;
	};

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
		user?.isPublicOrganizer ? "achievements" : "hosting"
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [showCelebration, setShowCelebration] = useState(false);
	const [celebrationAchievement, setCelebrationAchievement] = useState(null);
	const eventsPerPage = 6;

	const handleEventSelect = (event: MockHostingEvent) => {
	};

	const handleAttendingEventSelect = () => {
	};

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

type UpcomingEventsPreviewProps = {
	hostingEvents: MockHostingEvent[];
	attendingEvents: MockAttendingEvent[];
	onEventSelect: (event: MockHostingEvent) => void;
	onAttendingEventSelect: (event: MockAttendingEvent) => void;
}

const UpcomingEventsPreview = ({
	hostingEvents,
	attendingEvents,
	onEventSelect,
	onAttendingEventSelect,
}: UpcomingEventsPreviewProps) => {
	// const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);

	// Combine and sort upcoming events
	const upcomingHosting = hostingEvents
		.filter((event) => new Date(event.startDate) > new Date())
		.map((event) => ({ ...event, isHosting: true }));

	const upcomingAttending = attendingEvents
		.filter((event) => new Date(event.startDate) > new Date())
		.map((event) => ({ ...event, isHosting: false }));

	// Add a type field to distinguish event type and preserve original objects
	const allUpcoming = [
		...upcomingHosting.map(event => ({ ...event, _eventType: "hosting" as const })),
		...upcomingAttending.map(event => ({ ...event, _eventType: "attending" as const })),
	]
		.sort(
			(a, b) =>
				new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
		)
		.slice(0, 3);

	if (allUpcoming.length === 0) {
		return (
			<Card className="mb-8 border-white/20 bg-gradient-to-br from-purple-50/80 to-blue-50/80 shadow-xl backdrop-blur-xl dark:border-gray-800/20 dark:from-purple-950/40 dark:to-blue-950/40">
				<CardContent className="py-16 text-center">
					<div className="mx-auto max-w-md">
						<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
							<Sparkles className="h-10 w-10 text-white" />
						</div>
						<h3 className="mb-3 text-2xl font-bold">No Upcoming Events</h3>
						<p className="text-muted-foreground mb-6">
							Start creating amazing events or join events hosted by others.
							Your journey to memorable experiences begins here!
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Button
								size="lg"
								// onClick={() => navigate("/create-event")}
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
							>
								<Plus className="mr-2 h-5 w-5" />
								Create Your First Event
							</Button>
							<Button
								size="lg"
								variant="outline"
								// onClick={() => navigate("/events")}
							>
								<Search className="mr-2 h-5 w-5" />
								Browse Events
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="mb-8 hidden border-white/20 bg-linear-to-br from-blue-50/80 to-purple-50/80 shadow-xl backdrop-blur-xl md:flex dark:border-gray-800/20 dark:from-blue-950/40 dark:to-purple-950/40">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Calendar className="h-5 w-5 text-blue-600" />
					Coming Up Next
				</CardTitle>
				<CardDescription>
					Your next {allUpcoming.length} event
					{allUpcoming.length > 1 ? "s" : ""}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div
					className={`group/stack relative transition-all duration-300 ease-out ${isHovered ? "h-[560px] md:h-[280px]" : "h-58 md:h-[120px]"}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{allUpcoming.map((event, index) => (
						<div
							key={event.id}
							className={cn(
								"group/card absolute right-0 left-0 cursor-pointer rounded-xl border border-white/40 bg-white/90 p-4 backdrop-blur-sm transition-all duration-300 ease-out hover:shadow-2xl nth-3:top-6 md:nth-2:top-4 dark:border-gray-800/40 dark:bg-gray-900/90",
								{
									"nth-2:top-40 md:nth-2:top-22": isHovered,
									"nth-3:top-92 md:nth-3:top-44": isHovered,
								},
							)}
							style={{
								// top: isHovered ? `${index * 80}px` : `${index * 20}px`,
								zIndex: allUpcoming.length - index,
								transform: isHovered
									? "scale(1)"
									: `scale(${1 - index * 0.03})`,
								transitionDelay: `${index * 50}ms`,
							}}
							onClick={() =>
								event._eventType === "hosting"
									? onEventSelect(event)
									: onAttendingEventSelect(event as MockAttendingEvent)
							}
						>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<div className="flex flex-wrap items-center gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
										{format(new Date(event.startDate), "d")}
									</div>
									<div>
										<h4 className="text-foreground font-semibold">
											{event.name}
										</h4>
										<p className="text-muted-foreground flex items-center gap-2 text-sm">
											<Clock className="h-3 w-3" />
											{format(new Date(event.startDate), "MMM d, yyyy")} •{" "}
											{event.time || "12:00 PM"}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant={event.isHosting ? "default" : "secondary"}>
										{event.isHosting ? "Hosting" : "Attending"}
									</Badge>
									<ArrowRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-all group-hover:translate-x-1" />
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

type WelcomeHeaderProps = {
	userName?: string;
}

const getGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
};

function WelcomeHeader({ userName }: WelcomeHeaderProps) {
	// const navigate = useNavigate();

	return (
		<div className="relative mb-8 overflow-hidden rounded-2xl">
			{/* Animated gradient background */}
			<div className="absolute inset-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] bg-size-[40px_40px] opacity-20" />

			{/* Glass-morphism container */}
			<div className="relative border border-white/20 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-900/60">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					{/* Left: User greeting */}
					<div className="space-y-3">
						<h1 className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
							{getGreeting()}, {userName || "Guest"}!
						</h1>
						<p className="text-muted-foreground flex items-center gap-2 text-base md:text-lg">
							<span className="font-medium">
								{format(new Date(), "EEEE, MMMM d")}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

type EnhancedStatCardsProps = {
  totalEvents: number;
  totalGuests: number;
  successRate: number;
  xp: number;
};

function EnhancedStatCards({
	totalEvents,
	totalGuests,
	successRate,
	xp,
}: EnhancedStatCardsProps) {
	return (
		<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
			<StatCard
				title="Total Events"
				value={<AnimatedNumber value={totalEvents} />}
				icon={Calendar}
				trend={{ value: 15, label: "vs last month" }}
				iconClassName="from-blue-500/20 to-blue-600/10"
				className="border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-blue-900/20"
			/>

			<StatCard
				title="Total Guests"
				value={
					<AnimatedNumber
						value={totalGuests}
						formatFn={(val) => Math.floor(val).toLocaleString()}
					/>
				}
				icon={Users}
				trend={{ value: 23, label: "vs last month" }}
				iconClassName="from-green-500/20 to-green-600/10"
				className="border-green-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-green-900/20"
			/>

			<StatCard
				title="Success Rate"
				value={
					<>
						<AnimatedNumber value={successRate} />%
					</>
				}
				icon={Trophy}
				trend={{ value: 5, label: "improvement" }}
				iconClassName="from-yellow-500/20 to-yellow-600/10"
				className="border-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-yellow-900/20"
			/>

			<StatCard
				title="XP Points"
				value={
					<AnimatedNumber
						value={xp}
						formatFn={(val) => Math.floor(val).toLocaleString()}
					/>
				}
				icon={Sparkles}
				trend={{ value: 8, label: "this week" }}
				iconClassName="from-purple-500/20 to-purple-600/10"
				className="border-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-purple-900/20"
			/>
		</div>
	);
}
// StatCard Component
type StatCardProps = {
	title: string;
	value: ReactNode;
	icon: LucideIcon;
	trend?: {
		value: number;
		label: string;
	};
	iconClassName?: string;
	className?: string;
}

function StatCard({
	title,
	value,
	icon: Icon,
	trend,
	iconClassName = "from-blue-500/20 to-blue-600/10",
	className,
}: StatCardProps) {
	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
				className,
			)}
		>
			<div className="absolute inset-0 bg-linear-to-br from-white/60 to-white/40 dark:from-gray-900/60 dark:to-gray-900/40 backdrop-blur-sm" />
			<div className="relative z-10 p-6">
				<div className="flex items-start justify-between gap-4">
					{/* Left: Icon */}
					<div
						className={cn(
							"p-3 rounded-xl bg-linear-to-br",
							iconClassName,
							"transition-transform duration-300 group-hover:scale-110",
						)}
					>
						<Icon className="w-5 h-5 text-foreground/80" />
					</div>
					<div className="flex-1 text-right">
						<p className="text-sm font-medium text-muted-foreground mb-1">
							{title}
						</p>
						<div className="text-3xl font-bold text-foreground mb-1">
							{value}
						</div>
						{trend && (
							<p className="text-xs text-muted-foreground">
								<span
									className={
										trend.value >= 0
											? "text-green-600 dark:text-green-400"
											: "text-red-600 dark:text-red-400"
									}
								>
									{trend.value >= 0 ? "+" : ""}
									{trend.value}%
								</span>{" "}
								{trend.label}
							</p>
						)}
					</div>
				</div>
			</div>
			<div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
		</div>
	);
}

type AnimatedNumberProps = {
	value: number;
	duration?: number;
	formatFn?: (value: number) => string;
}

function AnimatedNumber   ({
	value,
	duration = 1000,
	formatFn = (val) => Math.floor(val).toString(),
}: AnimatedNumberProps)   {
	const [displayValue, setDisplayValue] = useState(0);
	const animationRef = useRef<number>(0);
	const startTimeRef = useRef<number>(0);

	useEffect(() => {
		const animate = (timestamp: number) => {
			if (!startTimeRef.current) startTimeRef.current = timestamp;
			const progress = Math.min(
				(timestamp - startTimeRef.current) / duration,
				1,
			);

			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setDisplayValue(value * easeOutQuart);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animate);
			}
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [value, duration]);

	return <>{formatFn(displayValue)}</>;
};

type Achievement = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  tier: string;
  xpReward: number;
}

type CelebrationModalProps = {
  open: boolean;
  onClose: () => void;
  achievement: Achievement | null;
}

function CelebrationModal({ open, onClose, achievement }: CelebrationModalProps) {
  if (!achievement) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="relative mx-auto max-w-md overflow-hidden border-0 p-0 text-center">
        {open && (
          <div className="pointer-events-none absolute inset-0 z-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="confetti">
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="bg-linear-to-br from-purple-500 to-blue-500 p-8 text-white">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <achievement.icon className="h-8 w-8" />
            </div>

            <div className="flex justify-center gap-2">
              <PartyPopper />
              <h2 className="text-xl font-bold">Achievement Unlocked!</h2>
              <PartyPopper />
            </div>

            <h3 className="text-2xl font-bold">{achievement.title}</h3>

            <p className="text-sm text-white/90">
              {achievement.description}
            </p>

            <Badge className="bg-white/20 text-white">
              {achievement.tier.toUpperCase()} TIER
            </Badge>

            {achievement.xpReward > 0 && (
              <div className="flex justify-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Zap className="h-4 w-4" />
                +{achievement.xpReward} XP
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-4 bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Keep up the amazing work!
          </p>

          <Button onClick={onClose} className="w-full">
            <Trophy className="mr-2 h-4 w-4" />
            Awesome!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ActivityItem = {
	id: string;
	type: "achievement" | "milestone" | "review" | "event" | "level_up";
	title: string;
	description: string;
	timestamp: Date;
	xpGained?: number;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	color: string;
};

const mockActivities: ActivityItem[] = [
	{
		id: "1",
		type: "milestone",
		title: "Million Guest Milestone!",
		description: "You've been part of hosting over 1M guests globally",
		timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
		xpGained: 1000,
		icon: Trophy,
		color: "text-yellow-500",
	},
	{
		id: "2",
		type: "review",
		title: "5-Star Review Received",
		description: '"Absolutely incredible event! Every detail was perfect."',
		timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
		xpGained: 50,
		icon: Star,
		color: "text-yellow-400",
	},
	{
		id: "3",
		type: "achievement",
		title: "Five Star Host",
		description: "Maintained 4.8+ rating with 10+ reviews",
		timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
		xpGained: 400,
		icon: Sparkles,
		color: "text-purple-500",
	},
	{
		id: "4",
		type: "event",
		title: "Event Successfully Completed",
		description: "Sarah & Michael's Wedding - 150 guests",
		timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
		xpGained: 200,
		icon: Calendar,
		color: "text-blue-500",
	},
	{
		id: "5",
		type: "level_up",
		title: "Level Up!",
		description: "Congratulations! You've reached Skilled Host (Level 3)",
		timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
		xpGained: 0,
		icon: Zap,
		color: "text-green-500",
	},
];

function LiveActivityFeed() {
	const getRelativeTime = (timestamp: Date) => {
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - timestamp.getTime()) / (1000 * 60),
		);

		if (diffInMinutes < 60) {
			return `${diffInMinutes}m ago`;
		} else if (diffInMinutes < 1440) {
			return `${Math.floor(diffInMinutes / 60)}h ago`;
		} else {
			return `${Math.floor(diffInMinutes / 1440)}d ago`;
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<TrendingUp className="text-primary h-5 w-5" />
					Live Activity Feed
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-80">
					<div className="space-y-3">
						{mockActivities.map((activity) => (
							<div
								key={activity.id}
								className="from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 animate-fade-in flex items-start gap-3 rounded-lg bg-linear-to-r p-3 transition-all duration-200"
							>
								<div
									className={`bg-background rounded-full p-2 ${activity.color}`}
								>
									<activity.icon className="h-4 w-4" />
								</div>
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center justify-between">
										<h4 className="text-foreground truncate text-sm font-medium">
											{activity.title}
										</h4>
										<span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
											{getRelativeTime(activity.timestamp)}
										</span>
									</div>
									<p className="text-muted-foreground line-clamp-2 text-xs">
										{activity.description}
									</p>
									{activity.xpGained && activity.xpGained > 0 && (
										<Badge className="mt-1 border-0 bg-linear-to-r from-purple-500 to-blue-500 text-xs text-white">
											+{activity.xpGained} XP
										</Badge>
									)}
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
