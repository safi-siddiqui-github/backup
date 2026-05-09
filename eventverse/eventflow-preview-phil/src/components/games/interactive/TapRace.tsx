import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Hand, Trophy, Zap, Users } from 'lucide-react';

interface TapRaceProps {
  gameSession: any;
  onComplete: (score: number) => void;
}

const TapRace = ({ gameSession, onComplete }: TapRaceProps) => {
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const tapButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (countdown > 0 && gameStarted) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && gameStarted) {
      setGameActive(true);
    }
  }, [countdown, gameStarted]);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      onComplete(taps);
    }
  }, [timeLeft, gameActive, taps, onComplete]);

  const handleTap = () => {
    if (gameActive) {
      setTaps(prev => prev + 1);
      
      // Visual feedback
      if (tapButtonRef.current) {
        tapButtonRef.current.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (tapButtonRef.current) {
            tapButtonRef.current.style.transform = 'scale(1)';
          }
        }, 50);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCountdown(3);
    setTaps(0);
    setTimeLeft(10);
  };

  const tapsPerSecond = gameActive || timeLeft === 0 ? (taps / (10 - timeLeft)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Hand className="w-5 h-5 text-orange-400" />
                Tap Race
              </div>
              {gameActive && (
                <Badge variant="secondary" className="bg-white/20 text-white animate-pulse">
                  TAP NOW!
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Hand className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <div className="text-white font-bold text-xl">{taps}</div>
              <div className="text-xs text-white/70">Total Taps</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <div className="text-white font-bold text-xl">{tapsPerSecond.toFixed(1)}</div>
              <div className="text-xs text-white/70">TPS</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Trophy className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <div className="text-white font-bold text-xl">{timeLeft}</div>
              <div className="text-xs text-white/70">Seconds</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {!gameStarted && (
              <div className="text-center space-y-4">
                <Hand className="w-16 h-16 mx-auto text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">Ready to Tap?</h3>
                <p className="text-gray-600">Tap as fast as you can in 10 seconds!</p>
                <Button
                  onClick={startGame}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3"
                >
                  Start Tapping
                </Button>
              </div>
            )}

            {gameStarted && countdown > 0 && (
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-orange-500 animate-pulse">
                  {countdown}
                </div>
                <p className="text-gray-600">Get ready to tap!</p>
              </div>
            )}

            {gameActive && (
              <div className="text-center space-y-4">
                <Button
                  ref={tapButtonRef}
                  onClick={handleTap}
                  className="w-48 h-48 rounded-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-4xl font-bold shadow-lg transition-transform"
                  style={{ touchAction: 'manipulation' }}
                >
                  TAP!
                </Button>
                <div className="text-sm text-gray-600">
                  Keep tapping as fast as you can!
                </div>
              </div>
            )}

            {gameStarted && !gameActive && timeLeft === 0 && (
              <div className="text-center space-y-4">
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                <h3 className="text-xl font-bold text-gray-800">Time's Up!</h3>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-500">{taps} taps</div>
                  <div className="text-lg text-gray-600">{tapsPerSecond.toFixed(1)} taps per second</div>
                </div>
                <Button
                  onClick={startGame}
                  variant="outline"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Bar */}
        {gameActive && (
          <div className="space-y-2">
            <div className="flex justify-between text-white/70 text-sm">
              <span>Time Remaining</span>
              <span>{timeLeft}s</span>
            </div>
            <Progress 
              value={(timeLeft / 10) * 100} 
              className="bg-white/20"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TapRace;