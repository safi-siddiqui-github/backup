import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, Trophy } from "lucide-react";

interface LightningTriviaProps {
  gameSession: any;
  onAnswer: (answer: string) => void;
  onComplete: (score: number) => void;
}

const LightningTrivia = ({ gameSession, onAnswer, onComplete }: LightningTriviaProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = [
    {
      id: "1",
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
      points: 100
    },
    {
      id: "2", 
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      points: 100
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    onAnswer(answer);
    
    const question = questions[currentQuestion];
    if (answer === question.correctAnswer) {
      const timeBonus = Math.floor(timeLeft * 10);
      setScore(prev => prev + question.points + timeBonus);
    }
    
    setTimeout(handleNextQuestion, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      onComplete(score);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(15);
      setIsAnswered(false);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h1 className="text-2xl font-bold">Lightning Trivia</h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>{score} points</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <Progress value={progress} className="bg-white/20" />
        </div>

        <Card className="bg-white/95 backdrop-blur-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            {question.text}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                variant="outline"
                className="w-full h-12 text-left justify-start"
              >
                <span className="font-semibold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LightningTrivia;