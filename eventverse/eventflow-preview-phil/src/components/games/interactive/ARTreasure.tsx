import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Trophy, Clock, Gem } from 'lucide-react';

interface ARTreasureProps {
  gameSession: any;
  onComplete: (score: number) => void;
}

const ARTreasure = ({ gameSession, onComplete }: ARTreasureProps) => {
  const [foundTreasures, setFoundTreasures] = useState<string[]>([]);
  const [currentHint, setCurrentHint] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [score, setScore] = useState(0);
  const [scanning, setScanning] = useState(false);

  const treasures = [
    {
      id: 'treasure-1',
      name: 'Golden Ring',
      location: 'Near the wedding arch',
      hint: 'Where promises are made and love is declared',
      points: 100,
      found: false
    },
    {
      id: 'treasure-2',
      name: 'Love Letters',
      location: 'Guest book table',
      hint: 'Where guests leave their wishes and memories',
      points: 75,
      found: false
    },
    {
      id: 'treasure-3',
      name: 'Dancing Shoes',
      location: 'Dance floor',
      hint: 'Where feet move to the rhythm of celebration',
      points: 85,
      found: false
    },
    {
      id: 'treasure-4',
      name: 'Wedding Bells',
      location: 'Entrance area',
      hint: 'The first sound guests hear upon arrival',
      points: 90,
      found: false
    },
    {
      id: 'treasure-5',
      name: 'Champagne Cork',
      location: 'Bar area',
      hint: 'Where bubbles flow and toasts are made',
      points: 80,
      found: false
    },
    {
      id: 'treasure-6',
      name: 'Rose Petals',
      location: 'Bridal suite',
      hint: 'Where the bride prepares for her special day',
      points: 95,
      found: false
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

  const handleScan = () => {
    setScanning(true);
    
    // Simulate AR scanning
    setTimeout(() => {
      const currentTreasure = treasures[currentHint];
      const found = Math.random() > 0.3; // 70% success rate
      
      if (found && !foundTreasures.includes(currentTreasure.id)) {
        setFoundTreasures(prev => [...prev, currentTreasure.id]);
        setScore(prev => prev + currentTreasure.points);
        
        if (currentHint < treasures.length - 1) {
          setCurrentHint(prev => prev + 1);
        }
      }
      
      setScanning(false);
    }, 2000);
  };

  const handleSkipLocation = () => {
    if (currentHint < treasures.length - 1) {
      setCurrentHint(prev => prev + 1);
    } else {
      onComplete(score);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (foundTreasures.length / treasures.length) * 100;
  const currentTreasure = treasures[currentHint];
  const isFound = foundTreasures.includes(currentTreasure?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 p-4">
      <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-amber-500" />
              AR Treasure Hunt
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{foundTreasures.length} of {treasures.length} found</span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {score} points
            </span>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {currentTreasure && !isFound && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center">
                  <Gem className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Looking for: {currentTreasure.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  {currentTreasure.location}
                </div>
                <p className="text-base text-gray-700 italic">
                  "{currentTreasure.hint}"
                </p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-amber-700 mb-2">
                  📱 Point your camera at the location and tap scan!
                </div>
                <div className="text-xs text-amber-600">
                  Worth {currentTreasure.points} points
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleScan}
                  disabled={scanning}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {scanning ? 'Scanning...' : 'Scan for Treasure'}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSkipLocation}
                  className="w-full"
                >
                  Skip This Location
                </Button>
              </div>
            </div>
          )}

          {isFound && (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Treasure Found! 🎉
              </h3>
              <p className="text-green-600 mb-4">
                You discovered the {currentTreasure.name}!
              </p>
              <Button
                onClick={() => currentHint < treasures.length - 1 ? setCurrentHint(prev => prev + 1) : onComplete(score)}
                className="bg-green-500 hover:bg-green-600"
              >
                {currentHint < treasures.length - 1 ? 'Find Next Treasure' : 'Complete Hunt'}
              </Button>
            </div>
          )}

          {/* Treasures Found List */}
          {foundTreasures.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Treasures Found:</h4>
              <div className="grid grid-cols-2 gap-2">
                {treasures
                  .filter(t => foundTreasures.includes(t.id))
                  .map((treasure, index) => (
                    <div key={index} className="text-xs text-green-700 bg-white rounded p-2">
                      <div className="font-medium">{treasure.name}</div>
                      <div className="text-green-600">{treasure.points} pts</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {scanning && (
            <div className="text-center py-4">
              <div className="animate-pulse">
                <div className="w-12 h-12 mx-auto mb-2 bg-amber-200 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-amber-600">Scanning environment...</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ARTreasure;