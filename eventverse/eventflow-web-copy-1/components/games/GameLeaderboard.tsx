"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GameType } from "@/types/game";
import { ArrowLeft, Crown, Medal, Target, Trophy, Users } from "lucide-react";

interface GameLeaderboardProps {
  games: GameType[];
  onBack: () => void;
}

const GameLeaderboard = ({ games, onBack }: GameLeaderboardProps) => {
  // Generate mock leaderboard data
  const generateLeaderboard = () => {
    const players = [
      { id: "1", name: "Sarah Chen", avatar: "👩‍💼" },
      { id: "2", name: "Mike Johnson", avatar: "👨‍💻" },
      { id: "3", name: "Emily Davis", avatar: "👩‍🎨" },
      { id: "4", name: "Alex Kim", avatar: "👨‍🎓" },
      { id: "5", name: "Lisa Wang", avatar: "👩‍🔬" },
      { id: "6", name: "David Brown", avatar: "👨‍🏫" },
      { id: "7", name: "Rachel Green", avatar: "👩‍⚕️" },
      { id: "8", name: "Tom Wilson", avatar: "👨‍🎨" },
    ];

    return players
      .map((player, index) => ({
        ...player,
        totalScore: Math.floor(Math.random() * 200) + 50,
        gamesPlayed: Math.floor(Math.random() * 5) + 1,
        averageScore: Math.floor(Math.random() * 50) + 30,
        badges: Math.floor(Math.random() * 3) + 1,
        rank: index + 1,
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
  };

  const leaderboard = generateLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-600" />;
      default:
        return (
          <span className="flex h-5 w-5 items-center justify-center text-sm font-bold text-gray-500">
            {rank}
          </span>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-orange-400 to-orange-600";
      default:
        return "from-gray-100 to-gray-200";
    }
  };

  const getPlayerBadges = (badges: number) => {
    const badgeTypes = ["🏆", "⭐", "🎯", "🔥", "💎"];
    return badgeTypes.slice(0, badges);
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
              <h1 className="text-lg font-bold text-white">Leaderboard</h1>
              <p className="text-sm text-purple-100">
                Top players across all games
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Top 3 Podium */}
        <div className="mb-6 rounded-2xl bg-white/95 p-6 backdrop-blur-sm">
          <h3 className="mb-6 flex items-center justify-center gap-2 text-center font-semibold text-gray-800">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Hall of Fame
          </h3>

          <div className="mb-6 flex items-end justify-center gap-4">
            {/* 2nd Place */}
            {leaderboard[1] && (
              <div className="text-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-300 to-gray-500 text-2xl">
                  {leaderboard[1].avatar}
                </div>
                <div className="flex h-20 flex-col justify-end rounded-t-lg bg-gray-300 p-3">
                  <div className="text-lg font-bold text-white">2</div>
                </div>
                <div className="mt-1 text-xs font-medium text-gray-800">
                  {leaderboard[1].name}
                </div>
                <div className="text-xs text-gray-600">
                  {leaderboard[1].totalScore} pts
                </div>
              </div>
            )}

            {/* 1st Place */}
            {leaderboard[0] && (
              <div className="text-center">
                <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-3xl ring-4 ring-yellow-200">
                  {leaderboard[0].avatar}
                </div>
                <div className="flex h-24 flex-col justify-end rounded-t-lg bg-yellow-500 p-3">
                  <Crown className="mx-auto mb-1 h-6 w-6 text-white" />
                  <div className="text-xl font-bold text-white">1</div>
                </div>
                <div className="mt-1 text-sm font-bold text-gray-800">
                  {leaderboard[0].name}
                </div>
                <div className="text-sm text-gray-600">
                  {leaderboard[0].totalScore} pts
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {leaderboard[2] && (
              <div className="text-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-2xl">
                  {leaderboard[2].avatar}
                </div>
                <div className="flex h-16 flex-col justify-end rounded-t-lg bg-orange-500 p-3">
                  <div className="text-lg font-bold text-white">3</div>
                </div>
                <div className="mt-1 text-xs font-medium text-gray-800">
                  {leaderboard[2].name}
                </div>
                <div className="text-xs text-gray-600">
                  {leaderboard[2].totalScore} pts
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
            <Users className="h-4 w-4" />
            All Players
          </h3>

          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div
                key={player.id}
                className={cn(
                  "flex items-center gap-4 rounded-lg p-3 transition-all",
                  player.rank <= 3
                    ? `bg-gradient-to-r ${getRankColor(player.rank)} text-white`
                    : "bg-gray-50 hover:bg-gray-100",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center">
                    {getRankIcon(player.rank)}
                  </div>
                  <div className="text-2xl">{player.avatar}</div>
                  <div>
                    <div
                      className={cn(
                        "font-medium",
                        player.rank <= 3 ? "text-white" : "text-gray-800",
                      )}
                    >
                      {player.name}
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-2 text-xs",
                        player.rank <= 3 ? "text-white/80" : "text-gray-500",
                      )}
                    >
                      <Target className="h-3 w-3" />
                      {player.gamesPlayed} games • {player.averageScore} avg
                    </div>
                  </div>
                </div>

                <div className="flex-1"></div>

                <div className="text-right">
                  <div
                    className={cn(
                      "text-lg font-bold",
                      player.rank <= 3 ? "text-white" : "text-purple-600",
                    )}
                  >
                    {player.totalScore}
                  </div>
                  <div className="flex justify-end gap-1">
                    {getPlayerBadges(player.badges).map((badge, index) => (
                      <span
                        key={index}
                        className="text-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 rounded-xl bg-white/95 p-4 backdrop-blur-sm">
          <h4 className="mb-3 font-medium text-gray-800">Tournament Stats</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">
                {leaderboard.length}
              </div>
              <div className="text-xs text-gray-600">Total Players</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {Math.max(...leaderboard.map((p) => p.totalScore))}
              </div>
              <div className="text-xs text-gray-600">High Score</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {Math.round(
                  leaderboard.reduce((sum, p) => sum + p.averageScore, 0) /
                    leaderboard.length,
                )}
              </div>
              <div className="text-xs text-gray-600">Avg Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLeaderboard;
