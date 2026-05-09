"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GameType } from "@/types/game";
import {
  ArrowLeft,
  Camera,
  Clock,
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
  Trophy,
  Users,
  Vote,
} from "lucide-react";
import { useState } from "react";
import { Game } from "../GamesModule";
import { GameTemplate } from "./gameTemplates";

interface GameCreatorProps {
  onBack: () => void;
  onCreate: (gameData: Partial<Game>) => void;
  onUpdate?: (gameId: string, gameData: Partial<Game>) => void;
  selectedTemplate?: GameTemplate | null;
  editingGame?: GameType | null;
}

const gameTypes = [
  {
    id: "trivia",
    name: "Trivia Quiz",
    description: "Multiple choice questions with scoring",
    icon: MessageSquare,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "poll",
    name: "Live Poll",
    description: "Real-time audience voting",
    icon: Vote,
    color: "from-green-500 to-green-600",
  },
  {
    id: "icebreaker",
    name: "Icebreaker",
    description: "Get guests to mingle and interact",
    icon: Users,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "scavenger",
    name: "Scavenger Hunt",
    description: "Find items or complete tasks",
    icon: Trophy,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "photo-challenge",
    name: "Photo Challenge",
    description: "Creative photo submissions",
    icon: Camera,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: "prediction",
    name: "Predictions",
    description: "Guests make future predictions",
    icon: Clock,
    color: "from-indigo-500 to-indigo-600",
  },
];

const GameCreator = ({
  onBack,
  onCreate,
  onUpdate,
  selectedTemplate,
  editingGame,
}: GameCreatorProps) => {
  const isEditing = !!editingGame;
  const [step, setStep] = useState(selectedTemplate || isEditing ? 2 : 1);
  const [selectedType, setSelectedType] = useState<GameType["type"]>(
    editingGame?.type || selectedTemplate?.type || "icebreaker",
  );

  const [gameData, setGameData] = useState({
    title: editingGame?.title || selectedTemplate?.name || "",
    description:
      editingGame?.description || selectedTemplate?.description || "",
    duration: editingGame?.duration || selectedTemplate?.duration || 15,
    questions:
      editingGame?.questions ||
      selectedTemplate?.questions?.map((q) => ({
        id: Date.now().toString() + Math.random(),
        text: q.text,
        type: q.type as "multiple-choice" | "text" | "photo" | "rating",
        options:
          q.options ||
          (selectedTemplate?.type === "trivia" ? ["", "", "", ""] : undefined),
        correctAnswer: q.correctAnswer || "",
        points: q.points,
      })) ||
      [],
    settings: editingGame?.settings ||
      selectedTemplate?.settings || {
        allowAnonymous: true,
        showLeaderboard: true,
        timeLimit: 30,
        requirePhoto: false,
      },
  });

  const handleTypeSelect = (typeId: GameType["type"]) => {
    setSelectedType(typeId);
    setStep(2);
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      text: "",
      type: (selectedType === "trivia" ? "multiple-choice" : "text") as
        | "multiple-choice"
        | "text"
        | "photo"
        | "rating",
      options: selectedType === "trivia" ? ["", "", "", ""] : undefined,
      correctAnswer: "",
      points: 10,
    };
    setGameData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    setGameData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    setGameData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options?.map((opt, oi) =>
                oi === optionIndex ? value : opt,
              ),
            }
          : q,
      ),
    }));
  };

  const removeQuestion = (index: number) => {
    setGameData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleCreateOrUpdate = () => {
    const finalGameData = {
      ...gameData,
      type: selectedType,
    } as Partial<Game>;

    if (isEditing && onUpdate) {
      onUpdate(editingGame?.id ?? "", finalGameData);
    } else {
      onCreate(finalGameData);
    }
  };

  const selectedGameType = gameTypes.find((t) => t.id === selectedType);

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
                <h1 className="flex items-center gap-2 text-lg font-bold text-white">
                  {selectedTemplate && <Sparkles className="h-4 w-4" />}
                  {isEditing
                    ? "Edit Game"
                    : selectedTemplate
                      ? "Customize Template"
                      : "Create New Game"}
                </h1>
                <p className="text-sm text-purple-100">
                  {isEditing
                    ? `Editing: ${editingGame.title}`
                    : selectedTemplate
                      ? `Based on: ${selectedTemplate.name}`
                      : `Step ${step} of 3`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Step 1: Game Type Selection (skip if template selected or editing) */}
        {step === 1 && !selectedTemplate && !isEditing && (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Choose Game Type
            </h3>

            <div className="space-y-3">
              {gameTypes.map((type) => {
                const Icon = type.icon;

                return (
                  <div
                    key={type.id}
                    onClick={() =>
                      handleTypeSelect(type.id as GameType["type"])
                    }
                    className="cursor-pointer rounded-xl bg-white/95 p-4 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "rounded-lg bg-gradient-to-r p-3",
                          type.color,
                        )}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {type.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Game Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
                {selectedTemplate && (
                  <Sparkles className="h-4 w-4 text-purple-600" />
                )}
                Game Details
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Game Title</Label>
                  <Input
                    id="title"
                    value={gameData.title}
                    onChange={(e) =>
                      setGameData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder={`Enter ${selectedGameType?.name || selectedTemplate?.name || "game"} title`}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={gameData.description}
                    onChange={(e) =>
                      setGameData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Brief description for guests"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={gameData.duration}
                    onChange={(e) =>
                      setGameData((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value),
                      }))
                    }
                    min="1"
                    max="60"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="timeLimit">Time per question (seconds)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={gameData.settings.timeLimit}
                    onChange={(e) =>
                      setGameData((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          timeLimit: parseInt(e.target.value),
                        },
                      }))
                    }
                    min="10"
                    max="120"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {!selectedTemplate && !isEditing && (
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={() => setStep(3)}
                  disabled={!gameData.title}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Questions */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white/95 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                  {selectedTemplate && (
                    <Sparkles className="h-4 w-4 text-purple-600" />
                  )}
                  Questions
                </h3>
                <Button
                  onClick={addQuestion}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>

              <div className="max-h-60 space-y-4 overflow-y-auto">
                {gameData.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Question {index + 1}
                      </span>
                      <Button
                        onClick={() => removeQuestion(index)}
                        size="sm"
                        variant="outline"
                        className="h-auto p-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <Input
                      value={question.text}
                      onChange={(e) =>
                        updateQuestion(index, "text", e.target.value)
                      }
                      placeholder="Enter your question"
                      className="mb-3"
                    />

                    {(selectedType === "trivia" ||
                      selectedTemplate?.type === "trivia" ||
                      editingGame?.type === "trivia") &&
                      question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <Input
                              key={optIndex}
                              value={option}
                              onChange={(e) =>
                                updateQuestionOption(
                                  index,
                                  optIndex,
                                  e.target.value,
                                )
                              }
                              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                              className="text-sm"
                            />
                          ))}
                        </div>
                      )}
                  </div>
                ))}

                {gameData.questions.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    <MessageSquare className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p className="text-sm">
                      No questions yet. Add your first question!
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCreateOrUpdate}
                  disabled={gameData.questions.length === 0}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  {isEditing ? "Update Game" : "Create Game"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCreator;
