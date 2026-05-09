import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid3x3, Trophy, Users, CheckCircle, Star } from 'lucide-react';

interface DigitalBingoProps {
  gameSession: any;
  onBingo: (pattern: string) => void;
  onComplete: (score: number) => void;
}

const DigitalBingo = ({ gameSession, onBingo, onComplete }: DigitalBingoProps) => {
  const [bingoCard, setBingoCard] = useState<(string | number)[][]>([]);
  const [markedCells, setMarkedCells] = useState<boolean[][]>([]);
  const [calledNumbers, setCalledNumbers] = useState<(string | number)[]>([]);
  const [currentCall, setCurrentCall] = useState<string | number | null>(null);
  const [bingoPattern, setBingoPattern] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Wedding-themed bingo items instead of just numbers
  const bingoItems = [
    "Tears of joy", "First dance", "Bouquet toss", "Ring exchange", "Wedding cake",
    "Best man speech", "Maid of honor", "Father's dance", "Something blue", "Wedding dress",
    "Flower girl", "Ring bearer", "Wedding bells", "I do", "Kiss the bride",
    "Unity candle", "Wedding march", "Honeymoon", "Wedding favors", "Bridal party",
    "Photographer", "Wedding bands", "Veil", "Corsage", "Boutonniere"
  ];

  useEffect(() => {
    generateBingoCard();
  }, []);

  const generateBingoCard = () => {
    const shuffled = [...bingoItems].sort(() => Math.random() - 0.5);
    const card: (string | number)[][] = [];
    const marked: boolean[][] = [];
    
    for (let i = 0; i < 5; i++) {
      card[i] = [];
      marked[i] = [];
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
          card[i][j] = "FREE";
          marked[i][j] = true;
        } else {
          card[i][j] = shuffled[i * 5 + j];
          marked[i][j] = false;
        }
      }
    }
    
    setBingoCard(card);
    setMarkedCells(marked);
  };

  const handleCellClick = (row: number, col: number) => {
    if (markedCells[row][col] || (row === 2 && col === 2)) return;
    
    const item = bingoCard[row][col];
    if (calledNumbers.includes(item)) {
      const newMarked = [...markedCells];
      newMarked[row][col] = true;
      setMarkedCells(newMarked);
      
      // Check for bingo
      checkForBingo(newMarked);
    }
  };

  const checkForBingo = (marked: boolean[][]) => {
    let patterns: string[] = [];
    
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (marked[i].every(cell => cell)) {
        patterns.push(`Row ${i + 1}`);
      }
    }
    
    // Check columns
    for (let j = 0; j < 5; j++) {
      if (marked.every(row => row[j])) {
        patterns.push(`Column ${j + 1}`);
      }
    }
    
    // Check diagonals
    if (marked[0][0] && marked[1][1] && marked[2][2] && marked[3][3] && marked[4][4]) {
      patterns.push("Diagonal \\");
    }
    if (marked[0][4] && marked[1][3] && marked[2][2] && marked[3][1] && marked[4][0]) {
      patterns.push("Diagonal /");
    }
    
    if (patterns.length > 0 && !bingoPattern) {
      setBingoPattern(patterns[0]);
      setScore(100 + (patterns.length - 1) * 50);
      onBingo(patterns[0]);
    }
  };

  // Simulate host calling numbers
  useEffect(() => {
    if (calledNumbers.length < bingoItems.length) {
      const timer = setTimeout(() => {
        const remainingItems = bingoItems.filter(item => !calledNumbers.includes(item));
        const nextCall = remainingItems[Math.floor(Math.random() * remainingItems.length)];
        setCurrentCall(nextCall);
        setCalledNumbers(prev => [...prev, nextCall]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [calledNumbers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-green-400" />
                Wedding Bingo
              </div>
              {bingoPattern && (
                <Badge variant="secondary" className="bg-green-500 text-white animate-pulse">
                  BINGO!
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-white font-bold">{calledNumbers.length}</div>
              <div className="text-xs text-white/70">Called</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <div className="text-white font-bold">{markedCells.flat().filter(Boolean).length}</div>
              <div className="text-xs text-white/70">Marked</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <div className="text-white font-bold">{score}</div>
              <div className="text-xs text-white/70">Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Call */}
        {currentCall && (
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
            <CardContent className="p-4 text-center">
              <div className="text-white text-lg font-bold">Just Called:</div>
              <div className="text-white text-xl font-black">{currentCall}</div>
            </CardContent>
          </Card>
        )}

        {/* Bingo Card */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-gray-800 flex items-center justify-center gap-2">
              <Grid3x3 className="w-5 h-5 text-green-500" />
              B-I-N-G-O
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-1">
              {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
                <div key={letter} className="text-center font-bold text-sm text-gray-700 p-2">
                  {letter}
                </div>
              ))}
              
              {bingoCard.map((row, rowIndex) =>
                row.map((item, colIndex) => {
                  const isMarked = markedCells[rowIndex]?.[colIndex];
                  const isFree = rowIndex === 2 && colIndex === 2;
                  const isCallable = calledNumbers.includes(item) && !isMarked;
                  
                  return (
                    <Button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      variant="outline"
                      className={`
                        h-16 p-1 text-xs font-medium transition-all
                        ${isMarked 
                          ? 'bg-green-500 text-white border-green-600' 
                          : isCallable
                          ? 'bg-yellow-100 border-yellow-400 text-yellow-800 animate-pulse'
                          : isFree
                          ? 'bg-blue-500 text-white border-blue-600'
                          : 'bg-white hover:bg-gray-50'
                        }
                      `}
                      disabled={isMarked || isFree}
                    >
                      {isFree ? (
                        <Star className="w-4 h-4" />
                      ) : (
                        <span className="leading-tight">{item}</span>
                      )}
                    </Button>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bingo Result */}
        {bingoPattern && (
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0">
            <CardContent className="p-4 text-center">
              <div className="text-white">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-xl font-bold">BINGO!</div>
                <div className="text-sm">Pattern: {bingoPattern}</div>
                <div className="text-lg font-semibold mt-2">Score: {score} points</div>
              </div>
              <Button
                onClick={() => onComplete(score)}
                className="mt-3 bg-white text-green-600 hover:bg-gray-100"
              >
                Celebrate Win!
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recently Called */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">Recently Called</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
              {calledNumbers.slice(-10).map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white text-xs"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalBingo;