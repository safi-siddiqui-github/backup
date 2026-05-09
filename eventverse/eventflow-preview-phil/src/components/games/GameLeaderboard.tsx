import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Medal, Crown } from "lucide-react";

interface GameLeaderboardProps {
  games: any[];
  onBack: () => void;
}

const GameLeaderboard = ({ games, onBack }: GameLeaderboardProps) => {
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", points: 2450, gamesWon: 5 },
    { rank: 2, name: "Sarah Chen", points: 2280, gamesWon: 4 },
    { rank: 3, name: "Mike Rodriguez", points: 2100, gamesWon: 3 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <Trophy className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">Leaderboard</h2>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Top Players</h3>
        <div className="space-y-3">
          {leaderboardData.map((player) => (
            <div key={player.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getRankIcon(player.rank)}
                <span className="font-semibold text-gray-800">#{player.rank}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{player.name}</div>
                <div className="text-sm text-gray-600">{player.gamesWon} games won</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{player.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameLeaderboard;