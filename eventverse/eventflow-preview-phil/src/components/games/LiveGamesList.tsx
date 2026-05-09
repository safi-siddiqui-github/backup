
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Play } from "lucide-react";
import { useGameSessionManager } from "./GameSessionManager";

interface LiveGamesListProps {
  onJoinGame: (gameId: string, gameCode: string) => void;
}

const LiveGamesList = ({ onJoinGame }: LiveGamesListProps) => {
  const { getLiveGameSessions, getGameBySessionId } = useGameSessionManager();
  
  // Get actual live game sessions created by hosts
  const liveSessions = getLiveGameSessions();
  
  const liveGames = liveSessions.map(session => {
    const game = getGameBySessionId(session.id);
    if (!game) return null;
    
    return {
      id: session.id,
      title: game.title,
      participants: session.participants.length,
      maxParticipants: game.settings.maxParticipants || 50,
      timeLeft: "∞", // Live games don't have a strict time limit
      difficulty: "Medium", // Default difficulty
      gameCode: session.code,
      gameType: game.type
    };
  }).filter(Boolean);

  // If no live games, show example games to demonstrate the interface
  const exampleGames = liveGames.length === 0 ? [
    {
      id: "example-1",
      title: "Create games from templates to see them here!",
      participants: 0,
      maxParticipants: 20,
      timeLeft: "--",
      difficulty: "Info",
      gameCode: "----"
    }
  ] : [];

  const displayGames = liveGames.length > 0 ? liveGames : exampleGames;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {displayGames.map((game) => (
        <div key={game.id} className="p-4 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-300 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">{game.title}</h3>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  Code: {game.gameCode}
                </Badge>
                <Badge className={getDifficultyColor(game.difficulty)}>
                  {game.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{game.participants}/{game.maxParticipants}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{game.timeLeft}</span>
              </div>
            </div>
            
            <Button
              size="sm"
              onClick={() => onJoinGame(game.id, game.gameCode)}
              className="bg-purple-500 hover:bg-purple-600 text-white"
              disabled={game.gameCode === "----"}
            >
              <Play className="w-3 h-3 mr-1" />
              {game.gameCode === "----" ? "No Games" : "Join Game"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LiveGamesList;
