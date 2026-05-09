import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Trophy, Clock } from "lucide-react";

interface GameAnalyticsProps {
  games: any[];
  onBack: () => void;
}

const GameAnalytics = ({ games, onBack }: GameAnalyticsProps) => {
  const totalParticipants = games.reduce((sum, game) => sum + game.participants, 0);
  const averageDuration = games.length > 0 ? games.reduce((sum, game) => sum + game.duration, 0) / games.length : 0;
  const completedGames = games.filter(game => game.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">Game Analytics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
          <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{games.length}</div>
          <div className="text-sm text-gray-600">Total Games</div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{totalParticipants}</div>
          <div className="text-sm text-gray-600">Total Participants</div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{completedGames}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{averageDuration.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Avg Duration</div>
        </div>
      </div>
    </div>
  );
};

export default GameAnalytics;