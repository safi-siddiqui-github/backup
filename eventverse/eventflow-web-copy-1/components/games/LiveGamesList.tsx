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
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  Clock,
  Gamepad2,
  MessageSquare,
  Play,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface LiveGame {
  id: string;
  title: string;
  type: "trivia" | "photo-challenge" | "poll" | "memory-match";
  hostName: string;
  participants: number;
  maxParticipants: number;
  status: "waiting" | "playing" | "ending";
  gameCode: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedDuration: string;
  prize?: string;
}

interface LiveGamesListProps {
  onJoinGame: (gameId: string, gameCode: string) => void;
}

const LiveGamesList = ({ onJoinGame }: LiveGamesListProps) => {
  const [liveGames, setLiveGames] = useState<LiveGame[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Extensive mock data for live games
  const mockLiveGames: LiveGame[] = useMemo(
    () => [
      {
        id: "live-1",
        title: "Sarah & Michael's Love Story Trivia",
        type: "trivia",
        hostName: "Sarah Johnson",
        participants: 23,
        maxParticipants: 50,
        status: "playing",
        gameCode: "LOVE2024",
        currentQuestion: 3,
        totalQuestions: 15,
        timeRemaining: 45,
        difficulty: "Easy",
        estimatedDuration: "10 min",
        prize: "Wedding Photo Album",
      },
      {
        id: "live-2",
        title: "Wedding Photo Scavenger Hunt",
        type: "photo-challenge",
        hostName: "Michael Chen",
        participants: 31,
        maxParticipants: 40,
        status: "playing",
        gameCode: "PHOTO24",
        currentQuestion: 2,
        totalQuestions: 8,
        timeRemaining: 180,
        difficulty: "Medium",
        estimatedDuration: "Ongoing",
      },
      {
        id: "live-3",
        title: "Best Wedding Wishes Poll",
        type: "poll",
        hostName: "Emma Davis",
        participants: 18,
        maxParticipants: 30,
        status: "waiting",
        gameCode: "WISHES2024",
        currentQuestion: 0,
        totalQuestions: 5,
        timeRemaining: 0,
        difficulty: "Easy",
        estimatedDuration: "5 min",
      },
      {
        id: "live-4",
        title: "Couple's Journey Memory Match",
        type: "memory-match",
        hostName: "Lisa Brown",
        participants: 12,
        maxParticipants: 25,
        status: "playing",
        gameCode: "MEMORY24",
        currentQuestion: 5,
        totalQuestions: 12,
        timeRemaining: 30,
        difficulty: "Hard",
        estimatedDuration: "15 min",
        prize: "Dinner Voucher",
      },
      {
        id: "live-5",
        title: "Wedding Traditions Around the World",
        type: "trivia",
        hostName: "James Wilson",
        participants: 45,
        maxParticipants: 60,
        status: "playing",
        gameCode: "WORLD24",
        currentQuestion: 8,
        totalQuestions: 20,
        timeRemaining: 25,
        difficulty: "Medium",
        estimatedDuration: "12 min",
      },
      {
        id: "live-6",
        title: "Guess the Baby Photos",
        type: "photo-challenge",
        hostName: "Rachel Green",
        participants: 27,
        maxParticipants: 35,
        status: "waiting",
        gameCode: "BABY2024",
        currentQuestion: 0,
        totalQuestions: 10,
        timeRemaining: 0,
        difficulty: "Easy",
        estimatedDuration: "8 min",
      },
    ],
    [],
  );

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveGames((prevGames) =>
        prevGames.map((game) => ({
          ...game,
          participants: Math.min(
            game.participants + Math.floor(Math.random() * 3),
            game.maxParticipants,
          ),
          timeRemaining:
            game.status === "playing" && game.timeRemaining > 0
              ? Math.max(0, game.timeRemaining - 1)
              : game.timeRemaining,
        })),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initialize with mock data
    setLiveGames(mockLiveGames);
  }, [mockLiveGames]);

  const refreshGames = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate finding new games
      const newGame: LiveGame = {
        id: `live-${Date.now()}`,
        title: "Quick Fire Wedding Facts",
        type: "trivia",
        hostName: "Alex Morgan",
        participants: 1,
        maxParticipants: 20,
        status: "waiting",
        gameCode: `QUICK${Math.floor(Math.random() * 1000)}`,
        currentQuestion: 0,
        totalQuestions: 10,
        timeRemaining: 0,
        difficulty: "Easy",
        estimatedDuration: "5 min",
      };
      setLiveGames((prev) => [newGame, ...prev]);
      setRefreshing(false);
    }, 1000);
  };

  const getGameIcon = (type: string) => {
    switch (type) {
      case "trivia":
        return <Trophy className="h-5 w-5" />;
      case "photo-challenge":
        return <Camera className="h-5 w-5" />;
      case "poll":
        return <MessageSquare className="h-5 w-5" />;
      case "memory-match":
        return <Gamepad2 className="h-5 w-5" />;
      default:
        return <Play className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "playing":
        return "bg-green-100 text-green-800";
      case "ending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-purple-500" />
              Live Games ({liveGames.length})
            </CardTitle>
            <CardDescription>
              Join active games happening right now!
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshGames}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {liveGames.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p>No live games available right now.</p>
            <p className="text-sm">Check back in a few minutes!</p>
          </div>
        ) : (
          liveGames.map((game) => (
            <div
              key={game.id}
              className="rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-purple-300"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    {getGameIcon(game.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Hosted by {game.hostName}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge className={getStatusColor(game.status)}>
                        {game.status === "waiting"
                          ? "Waiting to Start"
                          : game.status === "playing"
                            ? "In Progress"
                            : "Ending Soon"}
                      </Badge>
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {game.participants}/{game.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{game.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>Code: {game.gameCode}</span>
                </div>
              </div>

              {game.status === "playing" && (
                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm text-gray-600">
                    <span>
                      Question {game.currentQuestion} of {game.totalQuestions}
                    </span>
                    {game.timeRemaining > 0 && (
                      <div className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        <span>{game.timeRemaining}s</span>
                      </div>
                    )}
                  </div>
                  <Progress
                    value={(game.currentQuestion / game.totalQuestions) * 100}
                    className="h-2"
                  />
                </div>
              )}

              {game.prize && (
                <div className="mb-3 rounded bg-yellow-50 p-2 text-sm text-yellow-800">
                  🏆 Prize: {game.prize}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {game.participants < game.maxParticipants
                    ? `${game.maxParticipants - game.participants} spots left`
                    : "Game is full"}
                </div>
                <Button
                  size="sm"
                  onClick={() => onJoinGame(game.id, game.gameCode)}
                  disabled={game.participants >= game.maxParticipants}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  {game.status === "waiting" ? "Join Game" : "Join Now"}
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LiveGamesList;
