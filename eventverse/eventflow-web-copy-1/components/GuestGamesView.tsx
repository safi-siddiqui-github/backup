"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Guest } from "@/types/rsvp";
import { Clock, Gamepad2, Play, Star, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { EventFormData } from "./EnhancedEventCreationDialog";
import GameJoinDialog from "./games/GameJoinDialog";
import GuestActiveGame from "./games/GuestActiveGame";
import LiveGamesList from "./games/LiveGamesList";

interface GuestGamesViewProps {
  // event: { couple: string };
  // guest: { name: string };
  event: Partial<EventFormData>;
  guest: Partial<Guest>;
}

const GuestGamesView = ({ event, guest }: GuestGamesViewProps) => {
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [activeGameSession, setActiveGameSession] = useState<string | null>(
    null,
  );
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState<{
    gameId: string;
    gameCode: string;
  } | null>(null);
  const { toast } = useToast();

  const games = [
    {
      id: "trivia",
      title: "How Well Do You Know the Couple?",
      description: "Test your knowledge about Sarah & Michael's relationship",
      difficulty: "Easy",
      points: 50,
      duration: "5 min",
      questions: 10,
    },
    {
      id: "photo-challenge",
      title: "Wedding Photo Scavenger Hunt",
      description:
        "Find and photograph specific moments during the celebration",
      difficulty: "Medium",
      points: 75,
      duration: "Ongoing",
      questions: 8,
    },
    {
      id: "memory-match",
      title: "Couple's Memory Match",
      description: "Match photos from different stages of their relationship",
      difficulty: "Hard",
      points: 100,
      duration: "10 min",
      questions: 12,
    },
  ];

  // Enhanced leaderboard with more participants
  const leaderboard = [
    { name: "Emma Davis", score: 1250, rank: 1, gamesPlayed: 8, streak: 5 },
    { name: "Mike Chen", score: 1180, rank: 2, gamesPlayed: 7, streak: 3 },
    { name: "Lisa Brown", score: 1050, rank: 3, gamesPlayed: 6, streak: 2 },
    { name: guest.name, score: 850, rank: 4, gamesPlayed: 4, streak: 1 },
    { name: "James Wilson", score: 780, rank: 5, gamesPlayed: 5, streak: 0 },
    { name: "Rachel Green", score: 720, rank: 6, gamesPlayed: 4, streak: 1 },
    { name: "Alex Morgan", score: 650, rank: 7, gamesPlayed: 3, streak: 0 },
    { name: "Sarah Kim", score: 580, rank: 8, gamesPlayed: 3, streak: 2 },
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
      description: "Get ready to play!",
    });
  };

  const handleGameComplete = (finalScore: number) => {
    toast({
      title: "Game Complete! 🎉",
      description: `Final Score: ${finalScore} points`,
    });
    setActiveGameSession(null);
  };

  const handleExitGame = () => {
    setActiveGameSession(null);
    toast({
      title: "Left Game",
      description: "You can rejoin anytime!",
    });
  };

  const playGame = (gameId: string) => {
    if (completedGames.includes(gameId)) return;

    // Simulate game completion
    setCompletedGames((prev) => [...prev, gameId]);
    const game = games.find((g) => g.id === gameId);

    toast({
      title: "Game Completed!",
      description: `You earned ${game?.points} points! 🎉`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-purple-500" />
            Wedding Games
          </CardTitle>
          <CardDescription>
            Play fun games, join live sessions, and compete with other guests!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="live-games"
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="live-games"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Live Games
              </TabsTrigger>
              <TabsTrigger value="solo-games">Solo Games</TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live-games">
              <LiveGamesList onJoinGame={handleJoinGame} />
            </TabsContent>

            <TabsContent value="solo-games">
              <div className="space-y-4">
                {games.map((game) => {
                  const isCompleted = completedGames.includes(game.id);

                  return (
                    <div
                      key={game.id}
                      className={`rounded-lg border-2 p-4 transition-all ${
                        isCompleted
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-white hover:border-purple-300"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {game.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {game.description}
                          </p>
                        </div>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            <span>{game.points} pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{game.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{game.questions} questions</span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => playGame(game.id)}
                          disabled={isCompleted}
                          className={
                            isCompleted
                              ? "bg-green-500"
                              : "bg-purple-500 hover:bg-purple-600"
                          }
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
              <div className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  All-Time Leaderboard
                </h3>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg p-3 ${
                        player.name === guest.name
                          ? "border-2 border-purple-300 bg-white"
                          : "bg-white/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            player.rank === 1
                              ? "bg-yellow-400 text-yellow-900"
                              : player.rank === 2
                                ? "bg-gray-300 text-gray-700"
                                : player.rank === 3
                                  ? "bg-orange-400 text-orange-900"
                                  : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {player.rank}
                        </div>
                        <div>
                          <span
                            className={`font-medium ${player.name === guest.name ? "text-purple-800" : "text-gray-800"}`}
                          >
                            {player.name === guest.name ? "You" : player.name}
                          </span>
                          <div className="text-xs text-gray-500">
                            {player.gamesPlayed} games played
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-700">
                          {player.score} pts
                        </div>
                        {player.streak > 0 && (
                          <div className="flex items-center gap-1 text-xs text-orange-600">
                            <Star className="h-3 w-3" />
                            {player.streak} streak
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Stats */}
                <div className="mt-6 rounded-lg bg-white p-4">
                  <h4 className="mb-3 font-medium">Your Stats</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {leaderboard.find((p) => p.name === guest.name)
                          ?.score || 0}
                      </div>
                      <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {leaderboard.find((p) => p.name === guest.name)
                          ?.gamesPlayed || 0}
                      </div>
                      <div className="text-sm text-gray-600">Games Played</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        #
                        {leaderboard.find((p) => p.name === guest.name)?.rank ||
                          "-"}
                      </div>
                      <div className="text-sm text-gray-600">Global Rank</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Progress */}
          <div className="mt-6 text-center">
            <div className="mb-1 text-2xl font-bold text-purple-600">
              {completedGames.length} / {games.length}
            </div>
            <div className="text-sm text-gray-600">Solo Games Completed</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-purple-500 transition-all"
                style={{
                  width: `${(completedGames.length / games.length) * 100}%`,
                }}
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
