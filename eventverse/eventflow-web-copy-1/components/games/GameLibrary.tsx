"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GameType } from "@/types/game";
import {
  Camera,
  Clock,
  Edit,
  Eye,
  MessageSquare,
  Play,
  Search,
  Trash2,
  Trophy,
  Users,
  Vote,
} from "lucide-react";
import { useState } from "react";
import { Game } from "../GamesModule";
import GameDeleteDialog from "./GameDeleteDialog";

interface GameLibraryProps {
  games: Game[];
  // onGameStart: (game: GameType) => void;
  // onGameEdit: (game: GameType) => void;
  onGameStart: (game: Game) => void;
  onGameEdit: (game: Game) => void;
  onGameDelete: (gameId: string) => void;
  // onGameView: (game: GameType) => void;
  onGameView: (game: Game) => void;
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

const GameLibrary = ({
  games,
  onGameStart,
  onGameEdit,
  onGameDelete,
  onGameView,
}: GameLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogGame, setDeleteDialogGame] = useState<GameType | null>(
    null,
  );

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

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteClick = (game: GameType) => {
    setDeleteDialogGame(game);
  };

  const handleDeleteConfirm = () => {
    if (deleteDialogGame) {
      onGameDelete(deleteDialogGame?.id ?? "0");
      setDeleteDialogGame(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Game Library ({games.length})
        </h3>

        {games.length > 0 && (
          <div className="relative w-64">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-white/20 bg-white/90 pl-10"
            />
          </div>
        )}
      </div>

      {games.length === 0 ? (
        <div className="rounded-xl bg-white/95 p-8 text-center backdrop-blur-sm">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 font-medium text-gray-800">No games yet</h3>
          <p className="text-sm text-gray-600">
            Create your first game to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredGames.map((game) => {
            const Icon = gameTypeIcons[game?.type ?? "icebreaker"];
            const colorClass = gameTypeColors[game?.type ?? "icebreaker"];

            return (
              <div
                key={game.id}
                className="rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex flex-1 items-start gap-3">
                    <div
                      className={cn(
                        "rounded-lg bg-gradient-to-r p-2",
                        colorClass,
                      )}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-medium text-gray-800">
                          {game.title}
                        </h4>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            getStatusColor(game?.status ?? ""),
                          )}
                        >
                          {getStatusText(game?.status ?? "")}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-gray-600">
                        {game.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{game.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{game.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{game.questions?.length || 0} questions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onGameView(game)}
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>

                  {game.status === "draft" && (
                    <>
                      <Button
                        onClick={() => onGameStart(game)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                        size="sm"
                      >
                        <Play className="mr-1 h-3 w-3" />
                        Start Game
                      </Button>
                      <Button
                        onClick={() => onGameEdit(game)}
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(game)}
                        variant="outline"
                        size="sm"
                        className="px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}

                  {game.status === "active" && (
                    <>
                      <Button
                        onClick={() => onGameStart(game)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                        size="sm"
                      >
                        <Play className="mr-1 h-3 w-3" />
                        Manage Game
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(game)}
                        variant="outline"
                        size="sm"
                        className="px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}

                  {game.status === "completed" && (
                    <>
                      <Button
                        onClick={() => onGameStart(game)}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <Trophy className="mr-1 h-3 w-3" />
                        View Results
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(game)}
                        variant="outline"
                        size="sm"
                        className="px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {filteredGames.length === 0 && searchTerm && (
            <div className="rounded-xl bg-white/95 p-8 text-center backdrop-blur-sm">
              <Search className="mx-auto mb-4 h-8 w-8 text-gray-400" />
              <h3 className="mb-2 font-medium text-gray-800">No games found</h3>
              <p className="text-sm text-gray-600">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      )}

      <GameDeleteDialog
        isOpen={!!deleteDialogGame}
        gameTitle={deleteDialogGame?.title || ""}
        gameStatus={deleteDialogGame?.status || ""}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteDialogGame(null)}
      />
    </div>
  );
};

export default GameLibrary;
