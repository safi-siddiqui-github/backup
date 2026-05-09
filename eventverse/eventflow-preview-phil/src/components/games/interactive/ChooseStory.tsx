import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Vote, Clock } from 'lucide-react';

interface ChooseStoryProps {
  gameSession: any;
  onComplete: (score: number) => void;
}

const ChooseStory = ({ gameSession, onComplete }: ChooseStoryProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [story, setStory] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [score, setScore] = useState(0);

  const storyChoices = [
    {
      text: "Once upon a time, at a beautiful wedding venue, the couple decided to...",
      choices: [
        "Have their first dance under the stars",
        "Start with a surprise flash mob",
        "Exchange personalized vows they wrote",
        "Invite everyone to join them on the dance floor"
      ]
    },
    {
      text: "As the celebration continued, the wedding guests were delighted when...",
      choices: [
        "The couple surprised everyone with a live band",
        "A time capsule ceremony was announced",
        "The venue transformed with magical lighting",
        "A surprise video from friends abroad played"
      ]
    },
    {
      text: "The most memorable moment of the evening happened when...",
      choices: [
        "The couple's pet made a special appearance",
        "Everyone formed a giant heart on the dance floor",
        "A spontaneous sing-along broke out",
        "The oldest and youngest guests danced together"
      ]
    },
    {
      text: "As the night drew to a close, the couple...",
      choices: [
        "Released lanterns into the night sky",
        "Thanked each guest with a personal note",
        "Shared their hopes for the future together",
        "Started a tradition they'll continue every year"
      ]
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

  const handleVote = (choice: string) => {
    if (hasVoted) return;
    
    setVotes(prev => ({
      ...prev,
      [choice]: (prev[choice] || 0) + 1
    }));
    setHasVoted(true);
    setScore(prev => prev + 25); // 25 points per vote
  };

  const handleNextChapter = () => {
    if (!hasVoted) return;
    
    // Get winning choice
    const winningChoice = Object.entries(votes).reduce((a, b) => 
      votes[a[0]] > votes[b[0]] ? a : b
    )[0];
    
    setStory(prev => [...prev, `${storyChoices[currentChapter].text} ${winningChoice}`]);
    
    if (currentChapter < storyChoices.length - 1) {
      setCurrentChapter(prev => prev + 1);
      setHasVoted(false);
      setVotes({});
    } else {
      onComplete(score);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentChapter + 1) / storyChoices.length) * 100;
  const currentChoice = storyChoices[currentChapter];
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Choose Your Story
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Chapter {currentChapter + 1} of {storyChoices.length}</span>
            <span className="flex items-center gap-1">
              <Vote className="w-3 h-3" />
              {score} points
            </span>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Story so far */}
          {story.length > 0 && (
            <div className="bg-emerald-50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-2">Story So Far:</h4>
              <div className="text-sm text-emerald-700 space-y-2">
                {story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-base font-medium text-gray-800 mb-4 leading-relaxed">
              {currentChoice.text}
            </h3>
            
            <div className="grid gap-3">
              {currentChoice.choices.map((choice, index) => {
                const voteCount = votes[choice] || 0;
                const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                
                return (
                  <Button
                    key={index}
                    variant={hasVoted ? "outline" : "ghost"}
                    className={`w-full text-left justify-between h-auto p-4 ${
                      hasVoted ? 'cursor-default' : 'hover:bg-emerald-50'
                    }`}
                    onClick={() => handleVote(choice)}
                    disabled={hasVoted}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{choice}</div>
                      {hasVoted && (
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-gray-500">
                            {voteCount} votes ({percentage.toFixed(0)}%)
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-emerald-500 h-1 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {hasVoted && (
            <div className="text-center">
              <Button
                onClick={handleNextChapter}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {currentChapter === storyChoices.length - 1 ? 'Complete Story' : 'Continue Story'}
              </Button>
            </div>
          )}

          <div className="bg-teal-50 rounded-lg p-4 text-center">
            <div className="text-sm text-teal-600 mb-1">
              <Users className="w-4 h-4 inline mr-1" />
              Collaborative Storytelling
            </div>
            <div className="text-xs text-teal-500">
              Vote for your favorite choice to shape the story!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseStory;