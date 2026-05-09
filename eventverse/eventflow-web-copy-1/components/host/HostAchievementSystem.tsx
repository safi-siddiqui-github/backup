"use client";

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
import { ElementType } from "react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
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
  icon: ElementType;
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
      {/* Host Level Card */}
      <Card className="gradient-card border-0 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-3">
                <currentLevel.icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentLevel.name}</h3>
                <p className="text-white/80">Level {currentLevel.level}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {hostStats.xp.toLocaleString()}
              </div>
              <div className="text-sm text-white/80">XP Points</div>
            </div>
          </div>

          {nextLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextLevel.name}</span>
                <span>
                  {hostStats.xp} / {nextLevel.minXP} XP
                </span>
              </div>
              <Progress
                value={progressToNext}
                className="h-2"
              />
              <p className="text-xs text-white/70">
                {nextLevel.minXP - hostStats.xp} XP needed for next level
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
          <CardDescription>
            Celebrating your latest accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {unlockedAchievements.slice(-4).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20"
              >
                <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                  <achievement.icon className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-semibold">
                    {achievement.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getTierColor(achievement.tier)}`}
                    >
                      {achievement.tier.toUpperCase()}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      +{achievement.xpReward} XP
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
              <div
                key={achievement.id}
                className="space-y-2"
              >
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

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Performance Insights
          </CardTitle>
          <CardDescription>Your hosting excellence metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 text-center dark:from-green-900/20 dark:to-emerald-900/20">
              <Heart className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <div className="text-foreground text-2xl font-bold">
                {hostStats.averageRating}
              </div>
              <div className="text-muted-foreground text-sm">Avg Rating</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-4 text-center dark:from-blue-900/20 dark:to-cyan-900/20">
              <Users className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="text-foreground text-2xl font-bold">
                {hostStats.repeatGuests}%
              </div>
              <div className="text-muted-foreground text-sm">Repeat Guests</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 p-4 text-center dark:from-purple-900/20 dark:to-violet-900/20">
              <Zap className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="text-foreground text-2xl font-bold">
                {hostStats.currentStreak}
              </div>
              <div className="text-muted-foreground text-sm">Event Streak</div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-orange-50 to-red-50 p-4 text-center dark:from-orange-900/20 dark:to-red-900/20">
              <Gift className="mx-auto mb-2 h-6 w-6 text-orange-600" />
              <div className="text-foreground text-2xl font-bold">
                {Math.round(
                  (hostStats.successfulEvents / hostStats.totalEvents) * 100,
                )}
                %
              </div>
              <div className="text-muted-foreground text-sm">Success Rate</div>
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
