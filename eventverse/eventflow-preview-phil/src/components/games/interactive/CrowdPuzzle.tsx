import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Puzzle, Users, Trophy, CheckCircle } from 'lucide-react';

interface CrowdPuzzleProps {
  gameSession: any;
  participantId: string;
  onPieceComplete: (pieceId: string) => void;
  onComplete: () => void;
}

const CrowdPuzzle = ({ gameSession, participantId, onPieceComplete, onComplete }: CrowdPuzzleProps) => {
  const [myPiece, setMyPiece] = useState<any>(null);
  const [pieceCompleted, setPieceCompleted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  // Mock puzzle data - in real implementation this would come from game session
  const puzzleData = {
    totalPieces: 25,
    completedPieces: 18,
    participantCount: 23,
    targetImage: "Wedding couple silhouette"
  };

  useEffect(() => {
    // Assign a random puzzle piece to this participant
    setMyPiece({
      id: `piece-${participantId}`,
      shape: generateRandomShape(),
      targetPosition: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
  }, [participantId]);

  const generateRandomShape = () => {
    const shapes = [
      'M10,10 L90,10 L90,50 L60,50 L60,90 L10,90 Z',
      'M10,10 L50,10 L50,40 L90,40 L90,90 L10,90 Z',
      'M10,10 L90,10 L90,60 L50,60 L50,90 L10,90 Z',
      'M10,10 L60,10 L60,50 L90,50 L90,90 L10,90 Z'
    ];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const handlePieceDrag = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) });
  };

  const handleRotate = () => {
    setRotationAngle(prev => (prev + 45) % 360);
  };

  const checkFit = () => {
    if (!myPiece) return;
    
    const distanceToTarget = Math.sqrt(
      Math.pow(position.x - myPiece.targetPosition.x, 2) + 
      Math.pow(position.y - myPiece.targetPosition.y, 2)
    );
    
    if (distanceToTarget < 10 && Math.abs(rotationAngle % 360) < 15) {
      setPieceCompleted(true);
      onPieceComplete(myPiece.id);
    }
  };

  const progress = (puzzleData.completedPieces / puzzleData.totalPieces) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-purple-400" />
                Giant Puzzle
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {puzzleData.completedPieces}/{puzzleData.totalPieces}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-white font-bold">{puzzleData.participantCount}</div>
              <div className="text-xs text-white/70">Participants</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Puzzle className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-white font-bold">{puzzleData.completedPieces}</div>
              <div className="text-xs text-white/70">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-3 text-center">
              <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <div className="text-white font-bold">{Math.round(progress)}%</div>
              <div className="text-xs text-white/70">Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-white/70 text-sm">
            <span>Puzzle Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="bg-white/20" />
        </div>

        {/* My Puzzle Piece */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-gray-800 flex items-center justify-center gap-2">
              {pieceCompleted ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Piece Completed!
                </>
              ) : (
                <>
                  <Puzzle className="w-5 h-5 text-purple-500" />
                  Your Puzzle Piece
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!pieceCompleted ? (
              <>
                <p className="text-center text-gray-600 text-sm">
                  Drag and rotate your piece to fit it in the right position
                </p>
                
                {/* Puzzle Piece Area */}
                <div 
                  className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                  onMouseMove={handlePieceDrag}
                >
                  {/* Target Position Hint */}
                  {myPiece && (
                    <div
                      className="absolute w-8 h-8 border-2 border-purple-400 border-dashed rounded opacity-50"
                      style={{
                        left: `${myPiece.targetPosition.x}%`,
                        top: `${myPiece.targetPosition.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  )}
                  
                  {/* Draggable Piece */}
                  {myPiece && (
                    <div
                      className="absolute w-12 h-12 cursor-move"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`
                      }}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="drop-shadow-lg"
                      >
                        <path
                          d={myPiece.shape}
                          fill={myPiece.color}
                          stroke="#374151"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleRotate}
                    variant="outline"
                    className="flex-1"
                  >
                    Rotate
                  </Button>
                  <Button
                    onClick={checkFit}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    Check Fit
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Perfect Fit!</h3>
                  <p className="text-sm text-gray-600">Your piece has been added to the puzzle</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Global Puzzle Preview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">Global Puzzle Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-32 bg-gradient-to-br from-purple-800 to-blue-800 rounded border opacity-80">
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-px">
                {Array.from({ length: 25 }, (_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      i < puzzleData.completedPieces 
                        ? 'bg-white/80' 
                        : 'bg-white/20 border border-white/30 border-dashed'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">
                {puzzleData.targetImage}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrowdPuzzle;