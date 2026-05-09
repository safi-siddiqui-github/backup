
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Trophy, Users, Clock, Play, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LiveGamesList from "./games/LiveGamesList";
import GameJoinDialog from "./games/GameJoinDialog";
import GuestActiveGame from "./games/GuestActiveGame";
import { enhancedGameTemplates } from "@/data/enhancedGameTemplates";
import { useGameSessionManager } from "./games/GameSessionManager";

interface GuestGamesViewProps {
  event: { couple: string };
  guest: { name: string };
}

const GuestGamesView = ({ event, guest }: GuestGamesViewProps) => {
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [activeGameSession, setActiveGameSession] = useState<string | null>(null);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState<{gameId: string, gameCode: string} | null>(null);
  const [availableGames, setAvailableGames] = useState<any[]>([]);
  const { toast } = useToast();
  const { availableGames: hostCreatedGames, getLiveGameSessions } = useGameSessionManager();

  // Update available games when host creates new games
  useEffect(() => {
    setAvailableGames(hostCreatedGames);
  }, [hostCreatedGames]);

  // Use enhanced game templates for solo games, but show host-created games in live section
  const soloGames = enhancedGameTemplates.map(template => ({
    id: template.id,
    title: template.title || template.name,
    description: template.description,
    difficulty: template.difficulty,
    points: template.difficulty === 'Easy' ? 50 : template.difficulty === 'Medium' ? 75 : 100,
    duration: `${template.duration} min`,
    questions: 10 // Default question count
  }));

  // Enhanced leaderboard with more participants
  const leaderboard = [
    { name: "Emma Davis", score: 1250, rank: 1, gamesPlayed: 8, streak: 5 },
    { name: "Mike Chen", score: 1180, rank: 2, gamesPlayed: 7, streak: 3 },
    { name: "Lisa Brown", score: 1050, rank: 3, gamesPlayed: 6, streak: 2 },
    { name: guest.name, score: 850, rank: 4, gamesPlayed: 4, streak: 1 },
    { name: "James Wilson", score: 780, rank: 5, gamesPlayed: 5, streak: 0 },
    { name: "Rachel Green", score: 720, rank: 6, gamesPlayed: 4, streak: 1 },
    { name: "Alex Morgan", score: 650, rank: 7, gamesPlayed: 3, streak: 0 },
    { name: "Sarah Kim", score: 580, rank: 8, gamesPlayed: 3, streak: 2 }
  ];

  const handleJoinGame = (gameId: string, gameCode: string) => {
    setSelectedGameData({ gameId, gameCode });
    setShowJoinDialog(true);
  };

  const handleJoinSuccess = (gameSessionId: string) => {
    setActiveGameSession(gameSessionId);
    setShowJoinDialog(false);
    toast({
      title: "Joined Game! 🎮",
      description: "Get ready to play!"
    });
  };

  const handleGameComplete = (finalScore: number) => {
    toast({
      title: "Game Complete! 🎉",
      description: `Final Score: ${finalScore} points`
    });
    setActiveGameSession(null);
  };

  const handleExitGame = () => {
    setActiveGameSession(null);
    toast({
      title: "Left Game",
      description: "You can rejoin anytime!"
    });
  };

  const playGame = (gameId: string) => {
    if (completedGames.includes(gameId)) return;
    
    // Simulate game completion
    setCompletedGames(prev => [...prev, gameId]);
    const game = soloGames.find(g => g.id === gameId);
    
    toast({
      title: "Game Completed!",
      description: `You earned ${game?.points} points! 🎉`
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // If actively in a game, show the active game component
  if (activeGameSession) {
    return (
      <div className="space-y-6">
        <GuestActiveGame
          gameSessionId={activeGameSession}
          onGameComplete={handleGameComplete}
          onExitGame={handleExitGame}
        />
      </div>
    );
  }

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-500" />
            Wedding Games
          </CardTitle>
          <CardDescription>Play fun games, join live sessions, and compete with other guests!</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="live-games" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="live-games" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Live Games
              </TabsTrigger>
              <TabsTrigger value="solo-games">Solo Games</TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live-games">
              <LiveGamesList onJoinGame={handleJoinGame} />
            </TabsContent>

            <TabsContent value="solo-games">
              <div className="space-y-4">
                {soloGames.map((game) => {
                  const isCompleted = completedGames.includes(game.id);
                  
                  return (
                    <div key={game.id} className={`p-4 rounded-lg border-2 transition-all ${
                      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-purple-300'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{game.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{game.description}</p>
                        </div>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            <span>{game.points} pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{game.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{game.questions} questions</span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => playGame(game.id)}
                          disabled={isCompleted}
                          className={isCompleted ? "bg-green-500" : "bg-purple-500 hover:bg-purple-600"}
                        >
                          {isCompleted ? "Completed ✓" : "Play Now"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  All-Time Leaderboard
                </h3>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.name === guest.name ? 'bg-white border-2 border-purple-300' : 'bg-white/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          player.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                          player.rank === 2 ? 'bg-gray-300 text-gray-700' :
                          player.rank === 3 ? 'bg-orange-400 text-orange-900' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {player.rank}
                        </div>
                        <div>
                          <span className={`font-medium ${player.name === guest.name ? 'text-purple-800' : 'text-gray-800'}`}>
                            {player.name === guest.name ? 'You' : player.name}
                          </span>
                          <div className="text-xs text-gray-500">
                            {player.gamesPlayed} games played
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-700">{player.score} pts</div>
                        {player.streak > 0 && (
                          <div className="flex items-center gap-1 text-xs text-orange-600">
                            <Star className="w-3 h-3" />
                            {player.streak} streak
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Stats */}
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <h4 className="font-medium mb-3">Your Stats</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {leaderboard.find(p => p.name === guest.name)?.score || 0}
                      </div>
                      <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {leaderboard.find(p => p.name === guest.name)?.gamesPlayed || 0}
                      </div>
                      <div className="text-sm text-gray-600">Games Played</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        #{leaderboard.find(p => p.name === guest.name)?.rank || '-'}
                      </div>
                      <div className="text-sm text-gray-600">Global Rank</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Progress */}
          <div className="text-center mt-6">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {completedGames.length} / {soloGames.length}
            </div>
            <div className="text-sm text-gray-600">Solo Games Completed</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${(completedGames.length / soloGames.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Join Game Dialog */}
      {showJoinDialog && selectedGameData && (
        <GameJoinDialog
          open={showJoinDialog}
          onClose={() => setShowJoinDialog(false)}
          gameId={selectedGameData.gameId}
          gameCode={selectedGameData.gameCode}
          onJoinSuccess={handleJoinSuccess}
        />
      )}
    </>
  );
};

export default GuestGamesView;
