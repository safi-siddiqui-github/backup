import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Puzzle, Clock, Trophy, Zap } from 'lucide-react';

interface PuzzleRushProps {
  gameSession: any;
  onComplete: (score: number) => void;
}

const PuzzleRush = ({ gameSession, onComplete }: PuzzleRushProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const puzzles = [
    {
      id: 1,
      type: 'math',
      question: 'If the wedding has 8 tables with 6 guests each, plus 4 extra chairs, how many total seats?',
      answer: '52',
      hint: 'Multiply tables by guests, then add extra chairs'
    },
    {
      id: 2,
      type: 'riddle',
      question: 'I am worn by the bride, white as snow, passed down through generations. What am I?',
      answer: 'wedding dress',
      hint: 'Something traditional and white'
    },
    {
      id: 3,
      type: 'word',
      question: 'Unscramble: NOMOYHENO',
      answer: 'honeymoon',
      hint: 'A post-wedding trip'
    },
    {
      id: 4,
      type: 'logic',
      question: 'The ceremony starts at 4 PM and lasts 30 min. Photos take 45 min. What time does dinner start?',
      answer: '5:15',
      hint: 'Add the times together'
    },
    {
      id: 5,
      type: 'pattern',
      question: 'Complete the pattern: 1, 4, 9, 16, __',
      answer: '25',
      hint: 'Perfect squares: 1², 2², 3², 4², ?'
    },
    {
      id: 6,
      type: 'riddle',
      question: 'I have two hands but cannot clap. I tell time at the wedding. What am I?',
      answer: 'clock',
      hint: 'Something that shows time'
    },
    {
      id: 7,
      type: 'word',
      question: 'Unscramble: GUBOEQTU',
      answer: 'bouquet',
      hint: 'Flowers carried by the bride'
    },
    {
      id: 8,
      type: 'math',
      question: 'Wedding cake serves 80. If 15% is left over, how many people were served?',
      answer: '68',
      hint: '85% of 80 people were served'
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

  const handleSubmit = () => {
    const currentQ = puzzles[currentPuzzle];
    const userAnswer = userAnswers[currentQ.id]?.toLowerCase().trim();
    const correctAnswer = currentQ.answer.toLowerCase().trim();
    
    if (userAnswer === correctAnswer) {
      const timeBonus = Math.max(0, Math.floor(timeLeft / 10));
      const streakBonus = streak * 5;
      const totalPoints = 50 + timeBonus + streakBonus;
      
      setScore(prev => prev + totalPoints);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handleSkip = () => {
    setStreak(0);
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const handleAnswerChange = (value: string) => {
    setUserAnswers(prev => ({ ...prev, [puzzles[currentPuzzle].id]: value }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentPuzzle + 1) / puzzles.length) * 100;
  const currentQ = puzzles[currentPuzzle];
  const userAnswer = userAnswers[currentQ.id] || '';

  const getPuzzleTypeColor = (type: string) => {
    switch (type) {
      case 'math': return 'bg-blue-100 text-blue-800';
      case 'riddle': return 'bg-purple-100 text-purple-800';
      case 'word': return 'bg-green-100 text-green-800';
      case 'logic': return 'bg-orange-100 text-orange-800';
      case 'pattern': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-indigo-500" />
              Puzzle Rush
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Puzzle {currentPuzzle + 1} of {puzzles.length}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                {score}
              </span>
              {streak > 0 && (
                <span className="flex items-center gap-1 text-orange-600">
                  <Zap className="w-3 h-3" />
                  {streak}x
                </span>
              )}
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Badge className={getPuzzleTypeColor(currentQ.type)}>
                {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)}
              </Badge>
            </div>
            
            <h3 className="text-base font-semibold text-gray-800 mb-4 leading-relaxed">
              {currentQ.question}
            </h3>
            
            <Input
              type="text"
              placeholder="Your answer..."
              value={userAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full text-center text-lg font-medium"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <Button
              className="flex-1 bg-indigo-500 hover:bg-indigo-600"
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
            >
              {currentPuzzle === puzzles.length - 1 ? 'Complete' : 'Submit'}
            </Button>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <div className="text-sm text-indigo-600 mb-2">
              <Puzzle className="w-4 h-4 inline mr-1" />
              Brain Teaser Challenge
            </div>
            <div className="text-xs text-indigo-500 mb-2">
              {currentQ.hint}
            </div>
            {streak > 1 && (
              <div className="text-xs font-medium text-orange-600">
                🔥 {streak} puzzle streak! Bonus points activated!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PuzzleRush;