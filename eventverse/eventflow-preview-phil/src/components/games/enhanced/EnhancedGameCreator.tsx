import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { EnhancedGameTemplate } from "@/types/enhanced-games";
import { Game } from "@/types/game";
import { generateGameContent } from "@/utils/gameContentGenerators";

interface EnhancedGameCreatorProps {
  onBack: () => void;
  onCreate: (gameData: Game) => void;
  onUpdate: (gameId: string, gameData: Game) => void;
  selectedTemplate?: EnhancedGameTemplate;
  editingGame?: Game;
}

const EnhancedGameCreator = ({ 
  onBack, 
  onCreate, 
  onUpdate, 
  selectedTemplate, 
  editingGame 
}: EnhancedGameCreatorProps) => {
  const [gameData, setGameData] = useState<Partial<Game>>({
    title: editingGame?.title || selectedTemplate?.title || "",
    description: editingGame?.description || selectedTemplate?.description || "",
    type: editingGame?.type || selectedTemplate?.type || 'lightning-trivia',
    category: editingGame?.category || selectedTemplate?.category || 'Trivia & Knowledge',
    difficulty: editingGame?.difficulty || selectedTemplate?.difficulty || 'Medium',
    duration: editingGame?.duration || selectedTemplate?.duration || 15,
    minParticipants: editingGame?.minParticipants || selectedTemplate?.minParticipants || 2,
    maxParticipants: editingGame?.maxParticipants || selectedTemplate?.maxParticipants || 100,
    requiresCamera: editingGame?.requiresCamera || selectedTemplate?.requiresCamera || false,
    requiresMotion: editingGame?.requiresMotion || selectedTemplate?.requiresMotion || false,
    requiresAudio: editingGame?.requiresAudio || selectedTemplate?.requiresAudio || false,
    featured: editingGame?.featured || false,
    tags: editingGame?.tags || selectedTemplate?.tags || [],
    mechanics: editingGame?.mechanics || selectedTemplate?.mechanics || {
      interactionType: 'individual',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'points'
    },
    settings: {
      ...(editingGame?.settings || selectedTemplate?.settings || {}),
      allowAnonymous: editingGame?.settings?.allowAnonymous ?? true,
      showLeaderboard: editingGame?.settings?.showLeaderboard ?? true,
      requirePhoto: editingGame?.settings?.requirePhoto ?? false,
      durationPerQuestion: editingGame?.settings?.durationPerQuestion || 30,
    },
    content: editingGame?.content || (selectedTemplate ? generateGameContent(selectedTemplate) : {}),
    status: editingGame?.status || 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedTemplate && !editingGame) {
      const generatedContent = generateGameContent(selectedTemplate);
      setGameData(prev => ({
        ...prev,
        content: generatedContent
      }));
    }
  }, [selectedTemplate, editingGame]);

  // Game types that have discrete questions with time limits
  const gameTypesWithQuestions = [
    'lightning-trivia',
    'prediction-master', 
    'choose-story',
    'battle-opinions',
    'puzzle-rush',
    'digital-bingo'
  ];

  const showDurationPerQuestion = gameTypesWithQuestions.includes(gameData.type || '');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!gameData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!gameData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if ((gameData.duration || 0) < 1 || (gameData.duration || 0) > 120) {
      newErrors.duration = "Duration must be between 1 and 120 minutes";
    }

    if (showDurationPerQuestion) {
      const durationPerQ = gameData.settings?.durationPerQuestion || 0;
      if (durationPerQ < 5 || durationPerQ > 300) {
        newErrors.durationPerQuestion = "Duration per question must be between 5 and 300 seconds";
      }
    }

    if ((gameData.minParticipants || 0) < 1) {
      newErrors.minParticipants = "Minimum participants must be at least 1";
    }

    if ((gameData.maxParticipants || 0) < 2) {
      newErrors.maxParticipants = "Maximum participants must be at least 2";
    }

    if ((gameData.minParticipants || 0) >= (gameData.maxParticipants || 0)) {
      newErrors.maxParticipants = "Maximum must be greater than minimum";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const completeGameData: Game = {
      id: editingGame?.id || `game-${Date.now()}`,
      title: gameData.title!,
      description: gameData.description!,
      type: gameData.type!,
      category: gameData.category!,
      difficulty: gameData.difficulty!,
      duration: gameData.duration!,
      minParticipants: gameData.minParticipants!,
      maxParticipants: gameData.maxParticipants!,
      requiresCamera: gameData.requiresCamera!,
      requiresMotion: gameData.requiresMotion!,
      requiresAudio: gameData.requiresAudio!,
      featured: gameData.featured!,
      tags: gameData.tags!,
      mechanics: gameData.mechanics!,
      settings: gameData.settings!,
      content: gameData.content!,
      status: gameData.status!,
      createdAt: editingGame?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (editingGame) {
      onUpdate(editingGame.id, completeGameData);
    } else {
      onCreate(completeGameData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {editingGame ? "Edit Game" : "Create New Game"}
          </h1>
          {selectedTemplate && (
            <p className="text-sm text-muted-foreground">
              Based on: {selectedTemplate.name}
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Game Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Game Title
          </Label>
          <Input
            id="title"
            value={gameData.title}
            onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
            placeholder="Enter game title"
            className="h-12 text-lg"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        {/* Game Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            value={gameData.description}
            onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
            placeholder="Describe your game"
            rows={3}
            className="text-base resize-none"
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        {/* Game Settings Card */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Game Settings</h2>

            {/* Duration of Game */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                Duration of Game
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="duration"
                  type="number"
                  value={gameData.duration}
                  onChange={(e) => setGameData({ ...gameData, duration: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="120"
                  className="h-14 text-lg flex-1"
                />
                <span className="text-sm text-muted-foreground font-medium min-w-[70px]">
                  minutes
                </span>
              </div>
              {errors.duration && (
                <p className="text-sm text-destructive">{errors.duration}</p>
              )}
            </div>

            {/* Duration per Question - Conditional */}
            {showDurationPerQuestion && (
              <div className="space-y-2">
                <Label htmlFor="durationPerQuestion" className="text-sm font-medium text-foreground">
                  Duration per Question
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="durationPerQuestion"
                    type="number"
                    value={gameData.settings?.durationPerQuestion || 30}
                    onChange={(e) => setGameData({ 
                      ...gameData, 
                      settings: {
                        ...gameData.settings!,
                        durationPerQuestion: parseInt(e.target.value) || 0
                      }
                    })}
                    min="5"
                    max="300"
                    className="h-14 text-lg flex-1"
                  />
                  <span className="text-sm text-muted-foreground font-medium min-w-[70px]">
                    seconds
                  </span>
                </div>
                {errors.durationPerQuestion && (
                  <p className="text-sm text-destructive">{errors.durationPerQuestion}</p>
                )}
              </div>
            )}

            {/* Minimum Participants */}
            <div className="space-y-2">
              <Label htmlFor="minParticipants" className="text-sm font-medium text-foreground">
                Minimum Participants
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="minParticipants"
                  type="number"
                  value={gameData.minParticipants}
                  onChange={(e) => setGameData({ ...gameData, minParticipants: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="100"
                  className="h-14 text-lg flex-1"
                />
                <span className="text-sm text-muted-foreground font-medium min-w-[70px]">
                  players
                </span>
              </div>
              {errors.minParticipants && (
                <p className="text-sm text-destructive">{errors.minParticipants}</p>
              )}
            </div>

            {/* Maximum Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="text-sm font-medium text-foreground">
                Maximum Participants
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="maxParticipants"
                  type="number"
                  value={gameData.maxParticipants}
                  onChange={(e) => setGameData({ ...gameData, maxParticipants: parseInt(e.target.value) || 0 })}
                  min="2"
                  max="1000"
                  className="h-14 text-lg flex-1"
                />
                <span className="text-sm text-muted-foreground font-medium min-w-[70px]">
                  players
                </span>
              </div>
              {errors.maxParticipants && (
                <p className="text-sm text-destructive">{errors.maxParticipants}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="flex-1 h-12"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80"
          >
            {editingGame ? "Update Game" : "Next: Configure Content"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedGameCreator;
