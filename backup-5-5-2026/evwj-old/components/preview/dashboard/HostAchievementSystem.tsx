import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Calendar,
	Crown,
	Gift,
	Heart,
	Sparkles,
	Star,
	Target,
	TrendingUp,
	Trophy,
	Users,
	Zap,
} from "lucide-react";

export interface Achievement {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<any>;
	category: "milestone" | "quality" | "innovation" | "community";
	tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
	unlocked: boolean;
	progress: number;
	maxProgress: number;
	unlockedAt?: Date;
	xpReward: number;
}

export interface HostLevel {
	level: number;
	name: string;
	minXP: number;
	color: string;
	icon: React.ComponentType<any>;
	perks: string[];
}

export interface HostStats {
	totalEvents: number;
	totalGuests: number;
	averageRating: number;
	totalReviews: number;
	successfulEvents: number;
	repeatGuests: number;
	currentStreak: number;
	longestStreak: number;
	xp: number;
	level: number;
}

const hostLevels: HostLevel[] = [
	{
		level: 1,
		name: "Novice Host",
		minXP: 0,
		color: "text-amber-600",
		icon: Users,
		perks: ["Event creation", "Basic analytics"],
	},
	{
		level: 2,
		name: "Rising Host",
		minXP: 500,
		color: "text-gray-400",
		icon: Star,
		perks: ["Premium templates", "Advanced RSVP"],
	},
	{
		level: 3,
		name: "Skilled Host",
		minXP: 1500,
		color: "text-yellow-500",
		icon: Trophy,
		perks: ["Custom branding", "Priority support"],
	},
	{
		level: 4,
		name: "Expert Host",
		minXP: 3500,
		color: "text-blue-500",
		icon: Crown,
		perks: ["White-label options", "API access"],
	},
	{
		level: 5,
		name: "Master Host",
		minXP: 7500,
		color: "text-purple-500",
		icon: Sparkles,
		perks: ["Unlimited everything", "Personal concierge"],
	},
];

const achievements: Achievement[] = [
	{
		id: "first_event",
		title: "Getting Started",
		description: "Host your first event",
		icon: Calendar,
		category: "milestone",
		tier: "bronze",
		unlocked: true,
		progress: 1,
		maxProgress: 1,
		unlockedAt: new Date("2024-01-15"),
		xpReward: 100,
	},
	{
		id: "century_guests",
		title: "Century Club",
		description: "Host 100 guests across all events",
		icon: Users,
		category: "milestone",
		tier: "silver",
		unlocked: true,
		progress: 147,
		maxProgress: 100,
		unlockedAt: new Date("2024-02-20"),
		xpReward: 250,
	},
	{
		id: "five_star_host",
		title: "Five Star Host",
		description: "Maintain 4.8+ rating with 10+ reviews",
		icon: Star,
		category: "quality",
		tier: "gold",
		unlocked: true,
		progress: 23,
		maxProgress: 10,
		unlockedAt: new Date("2024-03-10"),
		xpReward: 400,
	},
	{
		id: "million_milestone",
		title: "Million Guest Milestone",
		description: "Be part of hosting 1M+ guests globally",
		icon: Trophy,
		category: "community",
		tier: "platinum",
		unlocked: true,
		progress: 1000000,
		maxProgress: 1000000,
		unlockedAt: new Date("2024-12-01"),
		xpReward: 1000,
	},
	{
		id: "innovation_leader",
		title: "Innovation Leader",
		description: "First to use 5 new features",
		icon: Zap,
		category: "innovation",
		tier: "gold",
		unlocked: false,
		progress: 3,
		maxProgress: 5,
		xpReward: 500,
	},
	{
		id: "monthly_streak",
		title: "Consistency King",
		description: "Host events for 12 consecutive months",
		icon: Target,
		category: "quality",
		tier: "diamond",
		unlocked: false,
		progress: 8,
		maxProgress: 12,
		xpReward: 750,
	},
];

interface HostAchievementSystemProps {
	hostStats: HostStats;
}

const HostAchievementSystem = ({ hostStats }: HostAchievementSystemProps) => {
	const currentLevel =
		hostLevels.find(
			(level) =>
				hostStats.xp >= level.minXP &&
				(hostLevels[level.level]
					? hostStats.xp < hostLevels[level.level].minXP
					: true),
		) || hostLevels[0];

	const nextLevel = hostLevels.find((level) => level.minXP > hostStats.xp);
	const progressToNext = nextLevel
		? ((hostStats.xp - currentLevel.minXP) /
				(nextLevel.minXP - currentLevel.minXP)) *
			100
		: 100;

	const unlockedAchievements = achievements.filter((a) => a.unlocked);
	const inProgressAchievements = achievements.filter(
		(a) => !a.unlocked && a.progress > 0,
	);

	return (
		<div className="space-y-6">
			{/* Host Level Card - Enhanced with Glass Effect */}
			<Card className="gradient-card relative overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white shadow-2xl">
				{/* Animated gradient overlay */}
				<div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20" />

				<CardContent className="relative p-8">
					<div className="mb-6 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="rounded-2xl bg-white/20 p-4 shadow-lg backdrop-blur-sm">
								<currentLevel.icon className="h-10 w-10 drop-shadow-lg" />
							</div>
							<div>
								<h3 className="text-3xl font-bold drop-shadow-md">
									{currentLevel.name}
								</h3>
								<p className="text-lg text-white/90">
									Level {currentLevel.level}
								</p>
							</div>
						</div>
						<div className="rounded-2xl bg-white/10 p-4 text-right shadow-lg backdrop-blur-sm">
							<div className="text-4xl font-bold drop-shadow-md">
								{hostStats.xp.toLocaleString()}
							</div>
							<div className="text-sm text-white/90">XP Points</div>
						</div>
					</div>

					{nextLevel && (
						<div className="space-y-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
							<div className="flex justify-between text-sm font-medium">
								<span>Progress to {nextLevel.name}</span>
								<span>
									{hostStats.xp} / {nextLevel.minXP} XP
								</span>
							</div>
							<Progress value={progressToNext} className="h-3 bg-white/20" />
							<p className="flex items-center gap-2 text-xs text-white/80">
								<Sparkles className="h-3 w-3" />
								{nextLevel.minXP - hostStats.xp} XP needed for next level
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Recent Achievements - Enhanced Design */}
			<Card className="border-border/50 shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-2xl">
						<Trophy className="h-6 w-6 text-yellow-500" />
						Recent Achievements
					</CardTitle>
					<CardDescription>
						Celebrating your latest accomplishments
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{unlockedAchievements.slice(-4).map((achievement, index) => (
							<div
								key={achievement.id}
								className="group relative flex items-center gap-4 overflow-hidden rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-yellow-800 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-yellow-900/20"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Shimmer effect */}
								<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

								<div className="relative rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 p-3 shadow-lg">
									<achievement.icon className="h-6 w-6 text-white drop-shadow-md" />
								</div>
								<div className="relative flex-1">
									<h4 className="text-foreground text-lg font-bold">
										{achievement.title}
									</h4>
									<p className="text-muted-foreground line-clamp-1 text-sm">
										{achievement.description}
									</p>
									<div className="mt-2 flex items-center gap-2">
										<Badge
											variant="secondary"
											className={`text-xs font-semibold ${getTierColor(achievement.tier)}`}
										>
											{achievement.tier.toUpperCase()}
										</Badge>
										<span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
											<Sparkles className="h-3 w-3" />+{achievement.xpReward} XP
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Progress Tracker */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="h-5 w-5 text-blue-500" />
						Achievement Progress
					</CardTitle>
					<CardDescription>
						Track your progress towards new achievements
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{inProgressAchievements.map((achievement) => (
							<div key={achievement.id} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<achievement.icon className="text-primary h-5 w-5" />
										<div>
											<h4 className="text-foreground font-medium">
												{achievement.title}
											</h4>
											<p className="text-muted-foreground text-sm">
												{achievement.description}
											</p>
										</div>
									</div>
									<Badge
										variant="outline"
										className={getTierColor(achievement.tier)}
									>
										{achievement.tier}
									</Badge>
								</div>
								<div className="ml-8">
									<div className="mb-1 flex justify-between text-sm">
										<span className="text-muted-foreground">
											{achievement.progress} / {achievement.maxProgress}
										</span>
										<span className="text-muted-foreground">
											{Math.round(
												(achievement.progress / achievement.maxProgress) * 100,
											)}
											%
										</span>
									</div>
									<Progress
										value={
											(achievement.progress / achievement.maxProgress) * 100
										}
										className="h-2"
									/>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Performance Insights - Enhanced Cards */}
			<Card className="border-border/50 shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-2xl">
						<TrendingUp className="h-6 w-6 text-green-500" />
						Performance Insights
					</CardTitle>
					<CardDescription>Your hosting excellence metrics</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div className="relative rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-green-800 dark:from-green-900/30 dark:to-emerald-900/30">
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
								<Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
							</div>
							<div className="text-foreground mb-1 text-3xl font-bold">
								{hostStats.averageRating}
							</div>
							<div className="text-muted-foreground text-sm font-medium">
								Avg Rating
							</div>
						</div>
						<div className="relative rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-100 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-blue-800 dark:from-blue-900/30 dark:to-cyan-900/30">
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
								<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="text-foreground mb-1 text-3xl font-bold">
								{hostStats.repeatGuests}%
							</div>
							<div className="text-muted-foreground text-sm font-medium">
								Repeat Guests
							</div>
						</div>
						<div className="relative rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-violet-100 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-purple-800 dark:from-purple-900/30 dark:to-violet-900/30">
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
								<Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
							</div>
							<div className="text-foreground mb-1 text-3xl font-bold">
								{hostStats.currentStreak}
							</div>
							<div className="text-muted-foreground text-sm font-medium">
								Event Streak
							</div>
						</div>
						<div className="relative rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-100 to-red-100 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-orange-800 dark:from-orange-900/30 dark:to-red-900/30">
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
								<Gift className="h-6 w-6 text-orange-600 dark:text-orange-400" />
							</div>
							<div className="text-foreground mb-1 text-3xl font-bold">
								{Math.round(
									(hostStats.successfulEvents / hostStats.totalEvents) * 100,
								)}
								%
							</div>
							<div className="text-muted-foreground text-sm font-medium">
								Success Rate
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const getTierColor = (tier: string) => {
	switch (tier) {
		case "bronze":
			return "text-amber-600 border-amber-300";
		case "silver":
			return "text-gray-500 border-gray-300";
		case "gold":
			return "text-yellow-500 border-yellow-300";
		case "platinum":
			return "text-blue-500 border-blue-300";
		case "diamond":
			return "text-purple-500 border-purple-300";
		default:
			return "text-muted-foreground";
	}
};

export default HostAchievementSystem;
export { achievements, hostLevels };
