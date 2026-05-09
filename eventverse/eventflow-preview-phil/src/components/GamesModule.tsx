import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Play, Users, Trophy, Clock, Star, Sparkles, BarChart3, Gamepad2 } from "lucide-react";
import GameLibrary from "./games/GameLibrary";
import ActiveGame from "./games/ActiveGame";
import GameCreator from "./games/GameCreator";
import GameAnalytics from "./games/GameAnalytics";
import GameLeaderboard from "./games/GameLeaderboard";
import HeroSection from "./games/landing/HeroSection";
import FeaturedGames from "./games/landing/FeaturedGames";
import StatsCards from "./games/landing/StatsCards";
import EmptyState from "./games/landing/EmptyState";
import CategoryCards from "./games/landing/CategoryCards";
import FloatingActionButton from "./games/landing/FloatingActionButton";
import EnhancedGameTemplates from "./games/EnhancedGameTemplates";
import LightningTrivia from "./games/interactive/LightningTrivia";
import TapRace from "./games/interactive/TapRace";
import PhotoChallenge from "./games/interactive/PhotoChallenge";
import CrowdPuzzle from "./games/interactive/CrowdPuzzle";
import DigitalBingo from "./games/interactive/DigitalBingo";
import PredictionMaster from "./games/interactive/PredictionMaster";
import ChooseStory from "./games/interactive/ChooseStory";
import BattleOpinions from "./games/interactive/BattleOpinions";
import PuzzleRush from "./games/interactive/PuzzleRush";
import ARTreasure from "./games/interactive/ARTreasure";
import GameDetailsView from "./games/GameDetailsView";
import { GameTemplate } from "./games/gameTemplates";
import { enhancedGameTemplates, getFeaturedGames } from "@/data/enhancedGameTemplates";
import { useGameSessionManager } from "./games/GameSessionManager";
import { Game, GameResult, Answer, GameSettings } from "@/types/game";
import { Question } from "@/types/enhanced-games";
import { generateGameContent } from "@/utils/gameContentGenerators";
import EnhancedGameCreator from "./games/enhanced/EnhancedGameCreator";
import GameTemplateGrid from "./games/enhanced/GameTemplateGrid";
import SplitScreenCreator from "./games/enhanced/SplitScreenCreator";
import GameContentRouter from "./games/enhanced/GameContentRouter";

// Legacy Game interface for backward compatibility - will be deprecated
interface LegacyGame {
  id: string;
  title: string;
  type: "lightning-trivia" | "tap-race" | "photo-challenge" | "crowd-puzzle" | "digital-bingo" | "prediction-master" | "choose-story" | "battle-opinions" | "puzzle-rush" | "ar-treasure" | "trivia" | "poll" | "icebreaker" | "scavenger" | "prediction";
  description: string;
  status: "draft" | "active" | "completed";
  participants: number;
  duration: number;
  createdAt: Date;
  questions?: Question[];
  results?: GameResult[];
  settings: GameSettings;
}

const GamesModule = ({ eventId, onBack }) => {
  const [activeView, setActiveView] = useState<"GameLibrary" | "GameCreator" | "GameTemplates" | "TemplateGrid" | "SplitScreen" | "ContentEditor" | "ActiveGame" | "GameAnalytics" | "GameLeaderboard" | "GameDetailsView">("GameLibrary");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [partialGameData, setPartialGameData] = useState<any>(null);
  const [games, setGames] = useState<Game[]>([]);
  const { updateGamesState } = useGameSessionManager();

  // Update global games state whenever games change
  useEffect(() => {
    updateGamesState(games);
  }, [games, updateGamesState]);

  const handleGameStart = (game: Game) => {
    const activeGame = { ...game, status: "active" as const };
    setSelectedGame(activeGame);
    setActiveView("ActiveGame");
    setGames(prev => prev.map(g => g.id === game.id ? activeGame : g));
  };

  const handleGameComplete = (gameId: string, results?: GameResult[]) => {
    setGames(prev => prev.map(g => 
      g.id === gameId ? { 
        ...g, 
        status: "completed" as const, 
        updatedAt: new Date()
      } : g
    ));
    setActiveView("GameLibrary");
  };

  const handleCreateGame = (gameData: Game) => {
    setGames(prev => [...prev, gameData]);
    setActiveView("GameLibrary");
    setSelectedTemplate(null);
    setEditingGame(null);
  };

  const handleUpdateGame = (gameId: string, gameData: Game) => {
    setGames(prev => prev.map(g => 
      g.id === gameId ? gameData : g
    ));
    setActiveView("GameLibrary");
    setEditingGame(null);
  };

  const handleDeleteGame = (gameId: string) => {
    setGames(prev => prev.filter(g => g.id !== gameId));
  };

  const handleGameEdit = (game: Game) => {
    setEditingGame(game);
    setSelectedTemplate(null);
    setActiveView("GameCreator");
  };

  const handleGameView = (game: Game) => {
    setSelectedGame(game);
    setActiveView("GameDetailsView");
  };

  const handleDuplicateGame = (game: Game) => {
    const duplicatedGame: Game = {
      ...game,
      id: `game-${Date.now()}`,
      title: `${game.title} (Copy)`,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setGames(prev => [...prev, duplicatedGame]);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setEditingGame(null);
    setActiveView("SplitScreen");
  };

  const getGameStats = () => {
    const totalGames = games.length;
    const activeGames = games.filter(g => g.status === "active").length;
    const totalParticipants = games.reduce((sum, g) => sum + (g.maxParticipants || 0), 0);
    const completedGames = games.filter(g => g.status === "completed").length;

    return { totalGames, activeGames, totalParticipants, completedGames };
  };

  const stats = getGameStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Games & Activities</h1>
                <p className="text-muted-foreground text-sm">Interactive entertainment for your guests</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setSelectedTemplate(null);
                  setEditingGame(null);
                  setActiveView("TemplateGrid");
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                size="sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={activeView === "TemplateGrid" || activeView === "SplitScreen" || activeView === "GameLibrary" ? "" : "container mx-auto px-4 py-6 max-w-md"}>
        {activeView === "ActiveGame" && selectedGame && (
          <>
            {selectedGame.type === "lightning-trivia" && (
              <LightningTrivia
                gameSession={selectedGame}
                onAnswer={(answer) => console.log('Answer:', answer)}
                onComplete={(score) => {
                  console.log('Game completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "tap-race" && (
              <TapRace
                gameSession={selectedGame}
                onComplete={(score) => {
                  console.log('Tap race completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "photo-challenge" && (
              <PhotoChallenge
                gameSession={selectedGame}
                onSubmit={(photo, challengeId) => console.log('Photo submitted:', challengeId)}
                onComplete={(score) => {
                  console.log('Photo challenge completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "crowd-puzzle" && (
              <CrowdPuzzle
                gameSession={selectedGame}
                participantId="host"
                onPieceComplete={(pieceId) => console.log('Piece completed:', pieceId)}
                onComplete={() => {
                  console.log('Puzzle completed!');
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "digital-bingo" && (
              <DigitalBingo
                gameSession={selectedGame}
                onBingo={(pattern) => console.log('Bingo!', pattern)}
                onComplete={(score) => {
                  console.log('Bingo completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "prediction-master" && (
              <PredictionMaster
                gameSession={selectedGame}
                onComplete={(score) => {
                  console.log('Predictions completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "choose-story" && (
              <ChooseStory
                gameSession={selectedGame}
                onComplete={(score) => {
                  console.log('Story completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "battle-opinions" && (
              <BattleOpinions
                gameSession={selectedGame}
                onComplete={(score) => {
                  console.log('Battle completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "puzzle-rush" && (
              <PuzzleRush
                gameSession={selectedGame}
                onComplete={(score) => {
                  console.log('Puzzle rush completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {selectedGame.type === "ar-treasure" && (
              <ARTreasure
                gameSession={selectedGame}
                onComplete={(score) => {
                  console.log('Treasure hunt completed with score:', score);
                  handleGameComplete(selectedGame.id);
                }}
              />
            )}
            {!['lightning-trivia', 'tap-race', 'photo-challenge', 'crowd-puzzle', 'digital-bingo', 'prediction-master', 'choose-story', 'battle-opinions', 'puzzle-rush', 'ar-treasure'].includes(selectedGame.type) && (
              <ActiveGame
                game={selectedGame}
                onBack={() => setActiveView("GameLibrary")}
                onComplete={(results) => handleGameComplete(selectedGame.id, results)}
              />
            )}
          </>
        )}

        {activeView === "GameCreator" && (
          <EnhancedGameCreator
            onBack={() => {
              setActiveView("GameLibrary");
              setSelectedTemplate(null);
              setEditingGame(null);
            }}
            onCreate={handleCreateGame}
            onUpdate={handleUpdateGame}
            selectedTemplate={selectedTemplate}
            editingGame={editingGame}
          />
        )}

        {activeView === "TemplateGrid" && (
          <GameTemplateGrid
            onBack={() => setActiveView("GameLibrary")}
            onSelectTemplate={handleTemplateSelect}
          />
        )}

        {activeView === "SplitScreen" && selectedTemplate && (
          <SplitScreenCreator
            template={selectedTemplate}
            onBack={() => setActiveView("TemplateGrid")}
            onNext={(gameData) => {
              setPartialGameData(gameData);
              setActiveView("ContentEditor");
            }}
          />
        )}

        {activeView === "ContentEditor" && partialGameData && (
          <GameContentRouter
            gameData={partialGameData}
            setGameData={setPartialGameData}
            onBack={() => setActiveView("SplitScreen")}
            onCreate={() => {
              handleCreateGame(partialGameData);
              setActiveView("GameLibrary");
              setPartialGameData(null);
            }}
          />
        )}

        {activeView === "GameTemplates" && (
          <EnhancedGameTemplates
            onBack={() => setActiveView("GameLibrary")}
            onSelectTemplate={handleTemplateSelect}
          />
        )}

        {activeView === "GameDetailsView" && selectedGame && (
          <GameDetailsView
            game={selectedGame}
            onBack={() => setActiveView("GameLibrary")}
            onEdit={handleGameEdit}
            onDuplicate={handleDuplicateGame}
          />
        )}

        {activeView === "GameAnalytics" && (
          <GameAnalytics
            games={games}
            onBack={() => setActiveView("GameLibrary")}
          />
        )}

        {activeView === "GameLeaderboard" && (
          <GameLeaderboard
            games={games}
            onBack={() => setActiveView("GameLibrary")}
          />
        )}

        {activeView === "GameLibrary" && (
          <div className="max-w-7xl mx-auto space-y-8 p-6">
            {/* Hero Section */}
            <HeroSection 
              onCreateGame={() => {
                setSelectedTemplate(null);
                setEditingGame(null);
                setPartialGameData(null);
                setActiveView("TemplateGrid");
              }}
              templateCount={enhancedGameTemplates.length}
            />

            {/* Featured Games Carousel */}
            <FeaturedGames 
              games={getFeaturedGames()}
              onSelectGame={(template) => {
                setSelectedTemplate(template);
                setEditingGame(null);
                setPartialGameData(null);
                setActiveView("SplitScreen");
              }}
            />

            {/* Stats Cards */}
            <StatsCards games={games} />

            {/* Category Cards */}
            <CategoryCards 
              onSelectCategory={(category) => {
                // For now, just open template grid - could filter in future
                setSelectedTemplate(null);
                setEditingGame(null);
                setPartialGameData(null);
                setActiveView("TemplateGrid");
              }}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => setActiveView("GameLeaderboard")}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-2"
              >
                <Trophy className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-semibold">Leaderboard</p>
                  <p className="text-xs text-muted-foreground">Top players</p>
                </div>
              </Button>
              
              <Button
                onClick={() => setActiveView("GameAnalytics")}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-2"
              >
                <BarChart3 className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-semibold">Analytics</p>
                  <p className="text-xs text-muted-foreground">Track stats</p>
                </div>
              </Button>
              
              <Button
                onClick={() => {
                  setSelectedTemplate(null);
                  setEditingGame(null);
                  setPartialGameData(null);
                  setActiveView("TemplateGrid");
                }}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-2"
              >
                <Gamepad2 className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-semibold">Browse Games</p>
                  <p className="text-xs text-muted-foreground">{enhancedGameTemplates.length} templates</p>
                </div>
              </Button>
              
              <Button
                onClick={() => setActiveView("GameLibrary")}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center gap-2"
              >
                <Play className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <p className="font-semibold">Active Games</p>
                  <p className="text-xs text-muted-foreground">{games.filter(g => g.status === 'active').length} playing</p>
                </div>
              </Button>
            </div>

            {/* Game Library or Empty State */}
            {games.length > 0 ? (
              <GameLibrary
                games={games}
                onGameStart={handleGameStart}
                onGameEdit={handleGameEdit}
                onGameDelete={handleDeleteGame}
                onGameView={handleGameView}
              />
            ) : (
              <EmptyState 
                onCreateGame={() => {
                  setSelectedTemplate(null);
                  setEditingGame(null);
                  setPartialGameData(null);
                  setActiveView("TemplateGrid");
                }}
                onBrowseTemplates={() => {
                  setSelectedTemplate(null);
                  setEditingGame(null);
                  setPartialGameData(null);
                  setActiveView("TemplateGrid");
                }}
              />
            )}

            {/* Floating Action Button */}
            <FloatingActionButton 
              onClick={() => {
                setSelectedTemplate(null);
                setEditingGame(null);
                setPartialGameData(null);
                setActiveView("TemplateGrid");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesModule;
export type { Game, Question, GameResult, Answer, GameSettings };