"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Camera,
  Clock,
  Copy,
  Edit,
  MessageSquare,
  Trophy,
  Users,
  Vote,
} from "lucide-react";
import { Game } from "../GamesModule";

interface GameDetailsViewProps {
  // game: GameType;
  game: Game;
  onBack: () => void;
  onEdit: (game: Game) => void;
  // onDuplicate: (game: GameType) => void;
  onDuplicate: (game: Game) => void;
}

const gameTypeIcons = {
  trivia: MessageSquare,
  poll: Vote,
  icebreaker: Users,
  scavenger: Trophy,
  "photo-challenge": Camera,
  prediction: Clock,
};

const gameTypeColors = {
  trivia: "from-blue-500 to-blue-600",
  poll: "from-green-500 to-green-600",
  icebreaker: "from-purple-500 to-purple-600",
  scavenger: "from-orange-500 to-orange-600",
  "photo-challenge": "from-pink-500 to-pink-600",
  prediction: "from-indigo-500 to-indigo-600",
};

const GameDetailsView = ({
  game,
  onBack,
  onEdit,
  onDuplicate,
}: GameDetailsViewProps) => {
  const Icon = gameTypeIcons[game?.type ?? "icebreaker"];
  const colorClass = gameTypeColors[game?.type ?? "icebreaker"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Live";
      case "completed":
        return "Completed";
      default:
        return "Draft";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div
                className={cn("rounded-lg bg-gradient-to-r p-2", colorClass)}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{game.title}</h1>
                <p className="text-sm text-purple-100">Game Details</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onDuplicate(game)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Copy className="mr-1 h-3 w-3" />
                Duplicate
              </Button>
              {game.status === "draft" && (
                <Button
                  onClick={() => onEdit(game)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  size="sm"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit Game
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Game Info Card */}
        <div className="mb-6 rounded-xl bg-white/95 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {game.title}
              </h2>
              <p className="mb-3 text-gray-600">{game.description}</p>
              <Badge
                className={cn("text-xs", getStatusColor(game?.status ?? ""))}
              >
                {getStatusText(game?.status ?? "")}
              </Badge>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{game.participants} participants</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{game.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MessageSquare className="h-4 w-4" />
              <span>{game.questions?.length || 0} questions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-xs">Created:</span>
              <span>{game?.createdAt?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Questions Card */}
        {game.questions && game.questions.length > 0 && (
          <div className="mb-6 rounded-xl bg-white/95 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Questions ({game.questions.length})
            </h3>
            <div className="space-y-3">
              {game.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Question {index + 1}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {question.points} pts
                    </Badge>
                  </div>
                  <p className="mb-2 text-gray-800">{question.text}</p>
                  {question.options && (
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map(
                        (option: string, optIndex: number) => (
                          <div
                            key={optIndex}
                            className="rounded bg-gray-50 p-2 text-sm text-gray-600"
                          >
                            {String.fromCharCode(65 + optIndex)}: {option}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Card */}
        <div className="mb-6 rounded-xl bg-white/95 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Game Settings
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Anonymous participation</span>
              <Badge
                variant={game.settings.allowAnonymous ? "default" : "secondary"}
              >
                {game.settings.allowAnonymous ? "Allowed" : "Not allowed"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Show leaderboard</span>
              <Badge
                variant={
                  game.settings.showLeaderboard ? "default" : "secondary"
                }
              >
                {game.settings.showLeaderboard ? "Yes" : "No"}
              </Badge>
            </div>
            {game.settings.timeLimit && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Time per question</span>
                <Badge variant="outline">{game.settings.timeLimit}s</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Results Card (for completed games) */}
        {game.status === "completed" && game.results && (
          <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Results Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {game.results.length}
                </div>
                <div className="text-sm text-gray-600">Total Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {game.results.length > 0
                    ? Math.round(
                        game.results.reduce(
                          (sum: number, r) => sum + (r?.score ?? 0),
                          0,
                        ) / game.results.length,
                      )
                    : 0}
                </div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetailsView;
