"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Crown,
  Medal,
  Star,
  Target,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface GuestActiveGameProps {
  gameSessionId: string;
  onGameComplete: (finalScore: number) => void;
  onExitGame: () => void;
}

interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  timeLimit: number;
}

interface GameParticipant {
  id: string;
  name: string;
  score: number;
  isCurrentUser: boolean;
  answeredCurrent: boolean;
  streak: number;
}

const GuestActiveGame = ({
  gameSessionId,
  onGameComplete,
  onExitGame,
}: GuestActiveGameProps) => {
  const [gamePhase, setGamePhase] = useState<
    "waiting" | "playing" | "question-result" | "final-results"
  >("waiting");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [userScore, setUserScore] = useState(0);
  const [userStreak, setUserStreak] = useState(0);
  const [participants, setParticipants] = useState<GameParticipant[]>([]);
  const { toast } = useToast();

  // Mock game questions
  const gameQuestions: GameQuestion[] = [
    {
      id: "q1",
      question: "Where did Sarah and Michael first meet?",
      options: [
        "Coffee shop",
        "University library",
        "Mutual friend's party",
        "Online dating app",
      ],
      correctAnswer: 2,
      points: 100,
      timeLimit: 30,
    },
    {
      id: "q2",
      question: "What is their favorite travel destination together?",
      options: [
        "Paris, France",
        "Tokyo, Japan",
        "Santorini, Greece",
        "Bali, Indonesia",
      ],
      correctAnswer: 0,
      points: 150,
      timeLimit: 25,
    },
    {
      id: "q3",
      question: "How many years have they been together?",
      options: ["3 years", "4 years", "5 years", "6 years"],
      correctAnswer: 1,
      points: 100,
      timeLimit: 20,
    },
    {
      id: "q4",
      question: "What is their shared hobby?",
      options: ["Cooking", "Hiking", "Photography", "Dancing"],
      correctAnswer: 2,
      points: 200,
      timeLimit: 30,
    },
    {
      id: "q5",
      question: "Where are they going for their honeymoon?",
      options: ["Italy", "Hawaii", "New Zealand", "Switzerland"],
      correctAnswer: 0,
      points: 150,
      timeLimit: 25,
    },
  ];

  // Mock participants data
  const mockParticipants: GameParticipant[] = [
    {
      id: "user",
      name: "You",
      score: 0,
      isCurrentUser: true,
      answeredCurrent: false,
      streak: 0,
    },
    {
      id: "p1",
      name: "Emma Davis",
      score: 450,
      isCurrentUser: false,
      answeredCurrent: true,
      streak: 3,
    },
    {
      id: "p2",
      name: "Mike Chen",
      score: 400,
      isCurrentUser: false,
      answeredCurrent: true,
      streak: 2,
    },
    {
      id: "p3",
      name: "Lisa Brown",
      score: 350,
      isCurrentUser: false,
      answeredCurrent: false,
      streak: 1,
    },
    {
      id: "p4",
      name: "James Wilson",
      score: 300,
      isCurrentUser: false,
      answeredCurrent: true,
      streak: 0,
    },
    {
      id: "p5",
      name: "Rachel Green",
      score: 275,
      isCurrentUser: false,
      answeredCurrent: true,
      streak: 1,
    },
    {
      id: "p6",
      name: "Alex Morgan",
      score: 250,
      isCurrentUser: false,
      answeredCurrent: false,
      streak: 0,
    },
  ];

  useEffect(() => {
    setParticipants(mockParticipants);

    // Simulate game starting
    const startTimer = setTimeout(() => {
      setGamePhase("playing");
      setTimeRemaining(gameQuestions[0].timeLimit);
    }, 3000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (gamePhase === "playing" && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === "playing" && timeRemaining === 0) {
      handleTimeUp();
    }
  }, [gamePhase, timeRemaining]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered || gamePhase !== "playing") return;

    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      const bonusPoints = Math.floor(
        (timeRemaining / currentQuestion.timeLimit) * 50,
      );
      const totalPoints = currentQuestion.points + bonusPoints;
      setUserScore((prev) => prev + totalPoints);
      setUserStreak((prev) => prev + 1);

      toast({
        title: "Correct! 🎉",
        description: `+${totalPoints} points (${bonusPoints} time bonus!)`,
      });
    } else {
      setUserStreak(0);
      toast({
        title: "Incorrect 😔",
        description: "Better luck next time!",
      });
    }

    // Update participants
    setParticipants((prev) =>
      prev.map((p) =>
        p.isCurrentUser
          ? {
              ...p,
              score: isCorrect ? p.score + currentQuestion.points : p.score,
              answeredCurrent: true,
              streak: isCorrect ? p.streak + 1 : 0,
            }
          : p,
      ),
    );

    // Show result phase
    setTimeout(() => {
      setGamePhase("question-result");
      setTimeout(() => {
        if (currentQuestionIndex < gameQuestions.length - 1) {
          nextQuestion();
        } else {
          endGame();
        }
      }, 3000);
    }, 1000);
  };

  const handleTimeUp = () => {
    if (!hasAnswered) {
      setHasAnswered(true);
      setUserStreak(0);
      toast({
        title: "Time's Up! ⏰",
        description: "No points awarded",
      });

      setTimeout(() => {
        setGamePhase("question-result");
        setTimeout(() => {
          if (currentQuestionIndex < gameQuestions.length - 1) {
            nextQuestion();
          } else {
            endGame();
          }
        }, 3000);
      }, 1000);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setGamePhase("playing");
    setTimeRemaining(gameQuestions[currentQuestionIndex + 1].timeLimit);

    // Simulate other participants answering
    setParticipants((prev) =>
      prev.map((p) => ({
        ...p,
        answeredCurrent: false,
        score: !p.isCurrentUser
          ? p.score + Math.floor(Math.random() * 200)
          : p.score,
      })),
    );
  };

  const endGame = () => {
    setGamePhase("final-results");
    onGameComplete(userScore);
  };

  if (gamePhase === "waiting") {
    return (
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-purple-500" />
            Game Starting Soon...
          </CardTitle>
          <CardDescription>
            Get ready for Sarah & Michael&apos;s Love Story Trivia!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-purple-600">
              {participants.length}
            </div>
            <div className="text-gray-600">Players Ready</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {participants.slice(0, 6).map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-2 rounded bg-gray-50 p-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{participant.name}</span>
                {participant.isCurrentUser && (
                  <Badge variant="outline">You</Badge>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={onExitGame}
            variant="outline"
            className="w-full"
          >
            Leave Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gamePhase === "final-results") {
    const sortedParticipants = [...participants].sort(
      (a, b) => b.score - a.score,
    );
    const userRank = sortedParticipants.findIndex((p) => p.isCurrentUser) + 1;

    return (
      <Card className="border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Final Results
          </CardTitle>
          <CardDescription>Great job everyone!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="mb-1 text-3xl font-bold text-purple-600">
              {userScore}
            </div>
            <div className="text-gray-600">Your Final Score</div>
            <Badge
              className="mt-2"
              variant={userRank <= 3 ? "default" : "outline"}
            >
              Rank #{userRank} of {participants.length}
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Top Players</h3>
            {sortedParticipants.slice(0, 5).map((participant, index) => (
              <div
                key={participant.id}
                className={`flex items-center justify-between rounded-lg p-3 ${
                  participant.isCurrentUser
                    ? "border-2 border-purple-200 bg-purple-50"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                    {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                    {index === 2 && (
                      <Medal className="h-4 w-4 text-orange-500" />
                    )}
                    <span className="font-bold">#{index + 1}</span>
                  </div>
                  <span
                    className={
                      participant.isCurrentUser
                        ? "font-bold text-purple-600"
                        : ""
                    }
                  >
                    {participant.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {participant.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{participant.streak}</span>
                    </div>
                  )}
                  <span className="font-bold">{participant.score}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onExitGame}
              variant="outline"
              className="flex-1"
            >
              Exit Game
            </Button>
            <Button className="flex-1 bg-purple-500 hover:bg-purple-600">
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = gameQuestions[currentQuestionIndex];

  return (
    <Card className="border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Question {currentQuestionIndex + 1} of {gameQuestions.length}
            </CardTitle>
            <CardDescription>
              Score: {userScore} | Streak: {userStreak}
            </CardDescription>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Timer className="h-5 w-5" />
              {timeRemaining}s
            </div>
          </div>
        </div>
        <Progress
          value={((currentQuestionIndex + 1) / gameQuestions.length) * 100}
          className="mt-4"
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold">{currentQuestion.question}</h2>
          <Badge variant="outline">{currentQuestion.points} points</Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={hasAnswered}
              variant={
                gamePhase === "question-result"
                  ? index === currentQuestion.correctAnswer
                    ? "default"
                    : selectedAnswer === index
                      ? "destructive"
                      : "outline"
                  : selectedAnswer === index
                    ? "default"
                    : "outline"
              }
              className={`h-auto justify-start p-4 text-left ${
                gamePhase === "question-result" &&
                index === currentQuestion.correctAnswer
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
                {hasAnswered && selectedAnswer === index && (
                  <CheckCircle className="ml-auto h-4 w-4" />
                )}
              </div>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>
              {participants.filter((p) => p.answeredCurrent).length}/
              {participants.length} answered
            </span>
          </div>
          <Button
            onClick={onExitGame}
            variant="ghost"
            size="sm"
          >
            Exit Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestActiveGame;
