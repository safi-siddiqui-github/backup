"use client";

import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import {
  Activity,
  ArrowLeft,
  Clock,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

interface GameAnalyticsProps {
  games: GameType[];
  onBack: () => void;
}

const GameAnalytics = ({ games, onBack }: GameAnalyticsProps) => {
  const calculateStats = () => {
    const totalGames = games.length;
    const completedGames = games.filter((g) => g.status === "completed").length;
    const totalParticipants = games.reduce(
      (sum, g) => sum + (g?.participants ?? 0),
      0,
    );
    const avgParticipants =
      totalGames > 0 ? Math.round(totalParticipants / totalGames) : 0;
    const avgDuration =
      totalGames > 0
        ? Math.round(games.reduce((sum, g) => sum + g.duration, 0) / totalGames)
        : 0;

    const gameTypeStats: Record<string, number> = games.reduce(
      (acc, game) => {
        acc[game.type ?? "icebreaker"] =
          (acc[game.type ?? "icebreaker"] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const mostPopularType =
      Object.entries(gameTypeStats).sort(
        ([, a], [, b]) => (b as number) - (a as number),
      )[0]?.[0] || "trivia";

    return {
      totalGames,
      completedGames,
      totalParticipants,
      avgParticipants,
      avgDuration,
      mostPopularType,
      completionRate:
        totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0,
    };
  };

  const stats = calculateStats();

  const getGameTypeIcon = (type: string) => {
    switch (type) {
      case "trivia":
        return "🧠";
      case "poll":
        return "🗳️";
      case "icebreaker":
        return "🤝";
      case "scavenger":
        return "🔍";
      case "photo-challenge":
        return "📸";
      case "prediction":
        return "🔮";
      default:
        return "🎮";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">Game Analytics</h1>
              <p className="text-sm text-purple-100">
                Performance insights and statistics
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Overview Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalGames}
            </div>
            <div className="text-xs text-gray-600">Total Games</div>
          </div>
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">
              {stats.completionRate}%
            </div>
            <div className="text-xs text-gray-600">Completion Rate</div>
          </div>
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalParticipants}
            </div>
            <div className="text-xs text-gray-600">Total Players</div>
          </div>
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600">
              {stats.avgParticipants}
            </div>
            <div className="text-xs text-gray-600">Avg per Game</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-6 rounded-xl bg-white/95 p-6 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
            <TrendingUp className="h-4 w-4" />
            Performance Metrics
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-700">Engagement Rate</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-600">87%</div>
                <div className="text-xs text-gray-500">+5% vs last event</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Avg Game Duration</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">
                  {stats.avgDuration} min
                </div>
                <div className="text-xs text-gray-500">Perfect length</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-700">
                  Guest Satisfaction
                </span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-yellow-600">4.8/5</div>
                <div className="text-xs text-gray-500">Excellent feedback</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Type Breakdown */}
        <div className="mb-6 rounded-xl bg-white/95 p-6 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
            <Trophy className="h-4 w-4" />
            Most Popular Games
          </h3>

          <div className="space-y-3">
            {games.slice(0, 5).map((game, index) => (
              <div
                key={game.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg">
                    {getGameTypeIcon(game?.type ?? "icebreaker")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{game.title}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {game.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-purple-600">
                    {game.participants}
                  </div>
                  <div className="text-xs text-gray-500">players</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm">
          <h3 className="mb-4 font-semibold text-gray-800">Quick Insights</h3>

          <div className="space-y-3">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
              <div className="text-sm font-medium text-blue-800">
                {getGameTypeIcon(stats.mostPopularType)}{" "}
                {stats.mostPopularType.charAt(0).toUpperCase() +
                  stats.mostPopularType.slice(1)}{" "}
                games are your most popular!
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-3">
              <div className="text-sm font-medium text-green-800">
                🎯 {stats.avgParticipants} average players per game shows great
                engagement
              </div>
            </div>

            {stats.completionRate > 80 && (
              <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-3">
                <div className="text-sm font-medium text-purple-800">
                  ⭐ {stats.completionRate}% completion rate is excellent!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAnalytics;
