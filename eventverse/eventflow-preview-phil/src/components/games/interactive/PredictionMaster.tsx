import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Users, CheckCircle } from 'lucide-react';

interface PredictionMasterProps {
  gameSession: any;
  onComplete: (score: number) => void;
}

const PredictionMaster = ({ gameSession, onComplete }: PredictionMasterProps) => {
  const [currentPrediction, setCurrentPrediction] = useState(0);
  const [predictions, setPredictions] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [score, setScore] = useState(0);

  const predictionQuestions = [
    {
      id: 1,
      question: "What time will the couple's first dance begin?",
      options: ["8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
    },
    {
      id: 2,
      question: "How many photos will be taken during the ceremony?",
      options: ["Less than 100", "100-200", "200-300", "More than 300"]
    },
    {
      id: 3,
      question: "What will be the most popular dance song?",
      options: ["Classic Rock", "Pop Hits", "Wedding Classic", "Country"]
    },
    {
      id: 4,
      question: "How many people will make speeches?",
      options: ["2-3 people", "4-5 people", "6-7 people", "8+ people"]
    },
    {
      id: 5,
      question: "What time will the cake cutting happen?",
      options: ["Before 9 PM", "9:00-9:30 PM", "9:30-10:00 PM", "After 10 PM"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onComplete]);

  const handlePrediction = (questionId: number, answer: string) => {
    setPredictions(prev => ({ ...prev, [questionId]: answer }));
    setScore(prev => prev + 20); // 20 points per prediction
  };

  const handleNext = () => {
    if (currentPrediction < predictionQuestions.length - 1) {
      setCurrentPrediction(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentPrediction + 1) / predictionQuestions.length) * 100;
  const currentQuestion = predictionQuestions[currentPrediction];
  const hasAnswered = predictions[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Prediction Master
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentPrediction + 1} of {predictionQuestions.length}</span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {score} points
            </span>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h3>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={predictions[currentQuestion.id] === option ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handlePrediction(currentQuestion.id, option)}
                >
                  <div className="flex items-center gap-3">
                    {predictions[currentQuestion.id] === option && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{option}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSkip}
            >
              Skip Question
            </Button>
            <Button
              className="flex-1"
              onClick={handleNext}
              disabled={!hasAnswered}
            >
              {currentPrediction === predictionQuestions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-sm text-blue-600 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Make your predictions now!
            </div>
            <div className="text-xs text-blue-500">
              Points will be awarded based on accuracy after the event
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionMaster;