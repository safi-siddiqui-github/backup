"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GameType } from "@/types/game";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Pause,
  Play,
  Trophy,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { GameResult } from "../GamesModule";

interface ActiveGameProps {
  game: GameType;
  onBack: () => void;
  // onComplete: (results: Partial<GameType[]>) => void;
  // onComplete: (results: Partial<GameResult[]>) => void;
  onComplete: (results: GameResult[]) => void;
}

type ResponseType = {
  participantId?: string;
  // id?:string
  points?: number;
};

type ParticipantType = {
  id?: string;
  name?: string;
  // participantId?:number
  // points?:number
};

const ActiveGame = ({ game, onBack, onComplete }: ActiveGameProps) => {
  const [gameState, setGameState] = useState<
    "waiting" | "playing" | "paused" | "results"
  >("waiting");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(game.settings.timeLimit || 30);
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [responses, setResponses] = useState<ResponseType[]>([]);

  // Simulate participants joining
  useEffect(() => {
    if (gameState === "waiting") {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const newParticipant = {
            id: Date.now().toString(),
            name: `Guest ${participants.length + 1}`,
            joinedAt: new Date(),
            score: 0,
          };
          setParticipants((prev) => [...prev, newParticipant]);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [gameState, participants.length]);

  const showResults = useCallback(() => {
    setGameState("results");

    // Calculate final results
    // const results = participants
    //   ?.map((p) => {
    //     const participantResponses = responses.filter(
    //       (r) => r.participantId === p.id,
    //     );
    //     const totalScore = participantResponses.reduce(
    //       (sum, r) => sum + (r?.points ?? 0),
    //       0,
    //     );

    //     return {
    //       participantId: p.id,
    //       participantName: p.name,
    //       score: totalScore,
    //       answers: participantResponses,
    //       completedAt: new Date(),
    //     };
    //   })
    //   .sort((a, b) => b.score - a.score);

    const results =
      participants
        ?.map((p) => {
          const participantResponses = responses.filter(
            (r) => r.participantId === p.id,
          );
          const totalScore = participantResponses.reduce(
            (sum, r) => sum + (r?.points ?? 0),
            0,
          );

          return {
            participantId: p.id!,
            participantName: p.name!,
            score: totalScore,
            answers: participantResponses,
            completedAt: new Date(),
          };
        })
        .sort((a, b) => b.score - a.score) ?? [];

    setTimeout(() => {
      onComplete(results as GameResult[]);
    }, 3000);
  }, [onComplete, participants, responses]);

  const handleNextQuestion = useCallback(() => {
    // Simulate responses
    const questionResponses = participants.map((p) => ({
      participantId: p.id,
      questionId: game?.questions ? game?.questions[currentQuestion]?.id : "",
      answer:
        (game?.questions &&
          game?.questions[currentQuestion]?.options?.[
            Math.floor(Math.random() * 4)
          ]) ||
        "Answer",
      points: Math.floor(Math.random() * 10),
      timestamp: new Date(),
    }));

    setResponses((prev) => [...prev, ...questionResponses]);

    if (currentQuestion < (game.questions?.length || 1) - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(game.settings.timeLimit || 30);
    } else {
      showResults();
    }
  }, [
    currentQuestion,
    game.questions,
    game.settings.timeLimit,
    participants,
    showResults,
  ]);

  // Timer countdown
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleNextQuestion();
    }
  }, [gameState, handleNextQuestion, timeLeft]);

  const startGame = () => {
    setGameState("playing");
    setTimeLeft(game.settings.timeLimit || 30);
  };

  const pauseGame = () => {
    setGameState("paused");
  };

  const resumeGame = () => {
    setGameState("playing");
  };

  const currentQ = game.questions?.[currentQuestion];

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
                <h1 className="text-lg font-bold text-white">{game.title}</h1>
                <p className="text-sm text-purple-100">Live Game Session</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white/20 px-3 py-1 text-sm text-white">
                <Users className="mr-1 inline h-4 w-4" />
                {participants.length}
              </div>
              {gameState === "playing" && (
                <div className="rounded-lg bg-orange-500 px-3 py-1 text-sm font-bold text-white">
                  <Clock className="mr-1 inline h-4 w-4" />
                  {timeLeft}s
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Game State: Waiting */}
        {gameState === "waiting" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/95 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Waiting for Players
              </h2>
              <p className="mb-4 text-gray-600">
                Share the game code or QR code with your guests
              </p>

              <div className="mb-4 rounded-lg bg-gray-100 p-4">
                <div className="text-2xl font-bold text-purple-600">
                  GAME123
                </div>
                <div className="text-sm text-gray-600">Game Code</div>
              </div>

              <Button
                onClick={startGame}
                disabled={participants.length === 0}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Game ({participants.length} players)
              </Button>
            </div>

            {/* Participants List */}
            <div className="rounded-xl bg-white/95 p-4 backdrop-blur-sm">
              <h3 className="mb-3 font-semibold text-gray-800">
                Players Joined
              </h3>
              <div className="max-h-40 space-y-2 overflow-y-auto">
                {participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
                  >
                    <span className="text-sm font-medium">
                      {participant.name}
                    </span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                ))}
                {participants.length === 0 && (
                  <div className="py-4 text-center text-sm text-gray-500">
                    No players yet. Waiting for guests to join...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Game State: Playing */}
        {(gameState === "playing" || gameState === "paused") && currentQ && (
          <div className="space-y-6">
            {/* Question Progress */}
            <div className="rounded-xl bg-white/95 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} of {game?.questions?.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(
                    ((currentQuestion + 1) / (game?.questions?.length ?? 0)) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / (game?.questions?.length ?? 0)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <div className="rounded-2xl bg-white/95 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                {currentQ.text}
              </h2>

              {currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-gray-100 p-3"
                    >
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + index)}.{" "}
                      </span>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="flex gap-3">
              {gameState === "playing" ? (
                <Button
                  onClick={pauseGame}
                  variant="outline"
                  className="flex-1"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={resumeGame}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              )}

              <Button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Next Question
              </Button>
            </div>

            {/* Live Responses */}
            <div className="rounded-xl bg-white/95 p-4 backdrop-blur-sm">
              <h3 className="mb-3 font-semibold text-gray-800">
                Live Responses ({Math.floor(participants.length * 0.7)}/
                {participants.length})
              </h3>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                  style={{
                    width: `${(Math.floor(participants.length * 0.7) / participants.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Game State: Results */}
        {gameState === "results" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/95 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Game Complete!
              </h2>
              <p className="text-gray-600">
                Thanks to all {participants.length} participants
              </p>
            </div>

            {/* Top 3 Winners */}
            <div className="rounded-xl bg-white/95 p-4 backdrop-blur-sm">
              <h3 className="mb-4 text-center font-semibold text-gray-800">
                🏆 Winners 🏆
              </h3>
              <div className="space-y-3">
                {participants.slice(0, 3).map((participant, index) => (
                  <div
                    key={participant.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg p-3",
                      index === 0
                        ? "border-2 border-yellow-300 bg-yellow-100"
                        : index === 1
                          ? "border-2 border-gray-300 bg-gray-100"
                          : "border-2 border-orange-300 bg-orange-100",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full font-bold text-white",
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                              ? "bg-gray-500"
                              : "bg-orange-500",
                        )}
                      >
                        {index + 1}
                      </div>
                      <span className="font-medium">{participant.name}</span>
                    </div>
                    <span className="text-lg font-bold">
                      {Math.floor(Math.random() * 50) + 30} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveGame;
