"use client";

import { Button } from "@/components/ui/button";
import { GameType } from "@/types/game";
import { ArrowLeft, Plus, Sparkles, Star, Trophy } from "lucide-react";
import { useCallback, useState } from "react";
import ActiveGame from "./games/ActiveGame";
import { expandedGameTemplates } from "./games/expandedGameTemplates";
import GameAnalytics from "./games/GameAnalytics";
import GameCreator from "./games/GameCreator";
import GameDetailsView from "./games/GameDetailsView";
import GameLeaderboard from "./games/GameLeaderboard";
import GameLibrary from "./games/GameLibrary";
import GameTemplates from "./games/GameTemplates";
import { GameTemplate } from "./games/gameTemplates";

export interface Game {
  id: string;
  title: string;
  type:
    | "trivia"
    | "poll"
    | "icebreaker"
    | "scavenger"
    | "photo-challenge"
    | "prediction";
  description: string;
  status: "draft" | "active" | "completed";
  participants: number;
  duration: number;
  createdAt: Date;
  questions?: Question[];
  results?: GameResult[];
  settings: GameSettings;
}

interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "text" | "photo" | "rating";
  options?: string[];
  correctAnswer?: string;
  points: number;
}

export interface GameResult {
  participantId: string;
  participantName: string;
  score: number;
  // answers: Answer[];
  completedAt: Date;

  answers: Answer[] | ResponseType[];
}

interface Answer {
  questionId: string;
  value: string;
  points: number;
}

interface GameSettings {
  allowAnonymous: boolean;
  showLeaderboard: boolean;
  timeLimit?: number;
  maxParticipants?: number;
  requirePhoto: boolean;
  
}

type ActiveViewType =
  | "library"
  | "create"
  | "templates"
  | "game"
  | "analytics"
  | "leaderboard"
  | "details";

const GamesModule = ({
  eventId,
  onBack,
}: {
  eventId?: string;
  onBack: () => void;
}) => {
  const [activeView, setActiveView] = useState<ActiveViewType>("library");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<GameTemplate | null>(
    null,
  );
  // const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingGame, setEditingGame] = useState<GameType | null>(null);
  const [games, setGames] = useState<Game[]>([
    {
      id: "1",
      title: "Wedding Trivia",
      type: "trivia",
      description: "How well do you know the happy couple?",
      status: "draft",
      participants: 0,
      duration: 15,
      createdAt: new Date(),
      questions: [
        {
          id: "q1",
          text: "Where did the couple first meet?",
          type: "multiple-choice",
          options: ["Coffee shop", "University", "Work", "Dating app"],
          correctAnswer: "University",
          points: 10,
        },
        {
          id: "q2",
          text: "What's their favorite vacation destination?",
          type: "multiple-choice",
          options: ["Beach", "Mountains", "City", "Countryside"],
          correctAnswer: "Beach",
          points: 10,
        },
      ],
      settings: {
        allowAnonymous: true,
        showLeaderboard: true,
        timeLimit: 30,
        requirePhoto: false,
      },
    },
    {
      id: "2",
      title: "Guest Predictions",
      type: "prediction",
      description: "What do you predict for the couple's future?",
      status: "completed",
      participants: 24,
      duration: 10,
      createdAt: new Date(Date.now() - 86400000),
      settings: {
        allowAnonymous: false,
        showLeaderboard: false,
        requirePhoto: false,
      },
    },
  ]);

  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [gameHistory, setGameHistory] = useState<Game[]>([]);

  const handleGameStart = (game: Game) => {
    setSelectedGame({ ...game, status: "active" });
    setActiveView("game");
    setGames((prev) =>
      prev.map((g) => (g.id === game.id ? { ...g, status: "active" } : g)),
    );
  };

  const handleGameComplete = (gameId: string, results: GameResult[]) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === gameId
          ? { ...g, status: "completed", results, participants: results.length }
          : g,
      ),
    );
    setActiveView("library");
  };

  const handleCreateGame = (gameData: Partial<Game>) => {
    const newGame: Game = {
      id: Date.now().toString(),
      title: gameData.title || "New Game",
      type: gameData.type || "trivia",
      description: gameData.description || "",
      status: "draft",
      participants: 0,
      duration: gameData.duration || 15,
      createdAt: new Date(),
      questions: gameData.questions || [],
      settings: gameData.settings || {
        allowAnonymous: true,
        showLeaderboard: true,
        requirePhoto: false,
      },
    };
    setGames((prev) => [...prev, newGame]);
    setActiveView("library");
    setSelectedTemplate(null);
    setEditingGame(null);
  };

  const handleUpdateGame = (gameId: string, gameData: Partial<Game>) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, ...gameData } : g)),
    );
    setActiveView("library");
    setEditingGame(null);
  };

  const handleDeleteGame = (gameId: string) => {
    setGames((prev) => prev.filter((g) => g.id !== gameId));
  };

  const handleGameEdit = (game: Game) => {
    setEditingGame(game);
    setSelectedTemplate(null);
    setActiveView("create");
  };

  const handleGameView = (game: Game) => {
    setSelectedGame(game);
    setActiveView("details");
  };

  const handleDuplicateGame = (game: Game) => {
    const duplicatedGame: Game = {
      ...game,
      id: Date.now().toString(),
      title: `${game.title} (Copy)`,
      status: "draft",
      participants: 0,
      createdAt: new Date(),
      results: undefined,
    };
    setGames((prev) => [...prev, duplicatedGame]);
  };

  const handleTemplateSelect = useCallback(
    (template: Partial<GameTemplate>) => {
      // Map template questions to proper game question format
      const mappedQuestions =
        template?.questions?.map((q, index: number) => ({
          id: `q${Date.now()}_${index}`,
          text: q.text || q?.question || "",
          type: q.type || "multiple-choice",
          options:
            q.options ||
            (template.type === "trivia" ? ["", "", "", ""] : undefined),
          correctAnswer: q.correctAnswer || q.answer || "",
          points: q.points || 10,
        })) || [];

      // Create game from template with proper mapping
      const gameFromTemplate = {
        id: Date.now().toString(),
        title: template?.title || template.name || "New Game",
        type: template.type || "trivia",
        description: template.description || "",
        status: "draft",
        participants: 0,
        duration: template.duration || 15,
        createdAt: new Date(),
        questions: mappedQuestions,
        settings: {
          allowAnonymous: template.settings?.allowAnonymous ?? true,
          showLeaderboard: template.settings?.showLeaderboard ?? true,
          timeLimit: template.settings?.timeLimit || 30,
          maxParticipants:
            template.maxParticipants || template.settings?.maxParticipants,
          requirePhoto: template.settings?.requirePhoto ?? false,
        },
      } as Game;

      // Add to games list and navigate back to library
      setGames((prev) => [...prev, gameFromTemplate]);
      setActiveView("library");
    },
    [],
  );

  const getGameStats = () => {
    const totalGames = games.length;
    const activeGames = games.filter((g) => g.status === "active").length;
    const totalParticipants = games.reduce((sum, g) => sum + g.participants, 0);
    const completedGames = games.filter((g) => g.status === "completed").length;

    return { totalGames, activeGames, totalParticipants, completedGames };
  };

  const stats = getGameStats();

  if (activeView === "game" && selectedGame) {
    return (
      <ActiveGame
        game={selectedGame}
        onBack={() => setActiveView("library")}
        onComplete={(results) => handleGameComplete(selectedGame.id, results)}
      />
    );
  }

  if (activeView === "create") {
    return (
      <GameCreator
        onBack={() => {
          setActiveView("library");
          setSelectedTemplate(null);
          setEditingGame(null);
        }}
        onCreate={handleCreateGame}
        onUpdate={handleUpdateGame}
        selectedTemplate={selectedTemplate}
        editingGame={editingGame}
      />
    );
  }

  if (activeView === "templates") {
    return (
      <GameTemplates
        onBack={() => setActiveView("library")}
        onSelectTemplate={handleTemplateSelect}
      />
    );
  }

  if (activeView === "details" && selectedGame) {
    return (
      <GameDetailsView
        game={selectedGame}
        onBack={() => setActiveView("library")}
        onEdit={handleGameEdit}
        onDuplicate={handleDuplicateGame}
      />
    );
  }

  if (activeView === "analytics") {
    return (
      <GameAnalytics
        games={games}
        onBack={() => setActiveView("library")}
      />
    );
  }

  if (activeView === "leaderboard") {
    return (
      <GameLeaderboard
        games={games}
        onBack={() => setActiveView("library")}
      />
    );
  }

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
              <div>
                <h1 className="text-lg font-bold text-white">
                  Games & Activities
                </h1>
                <p className="text-sm text-purple-100">
                  Interactive entertainment for your guests
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setActiveView("templates")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                size="sm"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                Templates ({expandedGameTemplates.length})
              </Button>
              <Button
                onClick={() => {
                  setSelectedTemplate(null);
                  setEditingGame(null);
                  setActiveView("create");
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                size="sm"
              >
                <Plus className="mr-1 h-3 w-3" />
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalGames}
            </div>
            <div className="text-xs text-gray-600">Total Games</div>
          </div>
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">
              {stats.activeGames}
            </div>
            <div className="text-xs text-gray-600">Active Now</div>
          </div>
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalParticipants}
            </div>
            <div className="text-xs text-gray-600">Participants</div>
          </div>
          <div className="rounded-xl bg-white/95 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600">
              {stats.completedGames}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Button
            onClick={() => setActiveView("leaderboard")}
            className="h-16 flex-col gap-1 bg-white/95 text-gray-800 hover:bg-white"
          >
            <Trophy className="h-5 w-5" />
            <span className="text-sm">Leaderboard</span>
          </Button>
          <Button
            onClick={() => setActiveView("analytics")}
            className="h-16 flex-col gap-1 bg-white/95 text-gray-800 hover:bg-white"
          >
            <Star className="h-5 w-5" />
            <span className="text-sm">Analytics</span>
          </Button>
        </div>

        {/* Games Library */}
        <GameLibrary
          games={games}
          onGameStart={handleGameStart}
          onGameEdit={handleGameEdit}
          onGameDelete={handleDeleteGame}
          onGameView={handleGameView}
        />
      </div>
    </div>
  );
};

export default GamesModule;
