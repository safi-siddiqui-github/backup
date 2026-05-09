import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Users, Vote } from 'lucide-react';

interface BattleOpinionsProps {
  gameSession: any;
  onComplete: (score: number) => void;
}

const BattleOpinions = ({ gameSession, onComplete }: BattleOpinionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [votes, setVotes] = useState<Record<number, 'A' | 'B'>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);

  const battleQuestions = [
    {
      id: 1,
      question: "For the perfect wedding reception:",
      optionA: "Seated dinner with multiple courses",
      optionB: "Buffet style with variety and mingling"
    },
    {
      id: 2,
      question: "When it comes to wedding photos:",
      optionA: "Traditional posed portraits",
      optionB: "Candid documentary style"
    },
    {
      id: 3,
      question: "For the ideal honeymoon:",
      optionA: "Relaxing beach resort getaway",
      optionB: "Adventure-packed city exploration"
    },
    {
      id: 4,
      question: "Best way to handle wedding planning:",
      optionA: "DIY everything with personal touches",
      optionB: "Hire professionals to handle details"
    },
    {
      id: 5,
      question: "Perfect wedding size would be:",
      optionA: "Intimate gathering with close family/friends",
      optionB: "Big celebration with everyone you know"
    },
    {
      id: 6,
      question: "For wedding entertainment:",
      optionA: "Live band playing crowd favorites",
      optionB: "DJ with customized playlist"
    },
    {
      id: 7,
      question: "Ideal wedding ceremony location:",
      optionA: "Traditional indoor chapel/church",
      optionB: "Outdoor garden or beach setting"
    },
    {
      id: 8,
      question: "Wedding cake preference:",
      optionA: "Classic tiered white cake",
      optionB: "Unique flavors or dessert bar"
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

  const handleVote = (questionId: number, choice: 'A' | 'B') => {
    setVotes(prev => ({ ...prev, [questionId]: choice }));
    setScore(prev => prev + 15); // 15 points per vote
  };

  const handleNext = () => {
    if (currentQuestion < battleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
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

  const progress = ((currentQuestion + 1) / battleQuestions.length) * 100;
  const current = battleQuestions[currentQuestion];
  const hasVoted = votes[current.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
      <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Battle of Opinions
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {battleQuestions.length}</span>
            <span className="flex items-center gap-1">
              <Vote className="w-3 h-3" />
              {score} points
            </span>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              {current.question}
            </h3>
            
            <div className="space-y-4">
              <Button
                variant={hasVoted === 'A' ? "default" : "outline"}
                className={`w-full text-left justify-start h-auto p-6 ${
                  hasVoted === 'A' ? 'bg-orange-500 hover:bg-orange-600' : ''
                }`}
                onClick={() => handleVote(current.id, 'A')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                    A
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{current.optionA}</div>
                  </div>
                </div>
              </Button>

              <div className="text-center py-2">
                <div className="text-lg font-bold text-gray-400">VS</div>
              </div>

              <Button
                variant={hasVoted === 'B' ? "default" : "outline"}
                className={`w-full text-left justify-start h-auto p-6 ${
                  hasVoted === 'B' ? 'bg-orange-500 hover:bg-orange-600' : ''
                }`}
                onClick={() => handleVote(current.id, 'B')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                    B
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{current.optionB}</div>
                  </div>
                </div>
              </Button>
            </div>
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
              className="flex-1"
              onClick={handleNext}
              disabled={!hasVoted}
            >
              {currentQuestion === battleQuestions.length - 1 ? 'Complete' : 'Next Battle'}
            </Button>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-sm text-orange-600 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Would You Rather...
            </div>
            <div className="text-xs text-orange-500">
              Choose your side in these wedding dilemmas!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BattleOpinions;