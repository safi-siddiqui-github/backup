import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Puzzle, Upload, Image } from "lucide-react";
import { PuzzlePiece } from "@/types/game";

interface CrowdPuzzleContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const CrowdPuzzleContentEditor = ({ gameData, setGameData }: CrowdPuzzleContentEditorProps) => {
  const puzzlePieces = gameData.content?.puzzlePieces || [];
  const [puzzleImage, setPuzzleImage] = useState('');
  const [puzzleTitle, setPuzzleTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');

  const generatePuzzlePieces = () => {
    const participantCount = gameData.maxParticipants || 20;
    const newPieces: PuzzlePiece[] = [];
    
    const shapes = ['square', 'circle', 'triangle', 'hexagon', 'diamond', 'star'];
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
    
    for (let i = 0; i < participantCount; i++) {
      newPieces.push({
        id: `piece-${i + 1}`,
        shape: shapes[i % shapes.length],
        color: colors[i % colors.length],
        position: { 
          x: Math.random() * 400, 
          y: Math.random() * 300 
        },
        rotation: Math.random() * 360,
        completed: false,
        assignedTo: undefined
      });
    }

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzlePieces: newPieces,
        puzzleMetadata: {
          title: puzzleTitle || 'Collaborative Puzzle',
          difficulty: difficulty,
          imageUrl: puzzleImage || '',
          totalPieces: participantCount
        }
      }
    });
  };

  const updatePuzzlePiece = (index: number, updatedPiece: PuzzlePiece) => {
    const updatedPieces = [...puzzlePieces];
    updatedPieces[index] = updatedPiece;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzlePieces: updatedPieces
      }
    });
  };

  const removePuzzlePiece = (index: number) => {
    const updatedPieces = puzzlePieces.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzlePieces: updatedPieces
      }
    });
  };

  const clearAllPieces = () => {
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzlePieces: []
      }
    });
  };

  const createSamplePuzzle = () => {
    setPuzzleTitle('Team Building Challenge');
    setPuzzleImage('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800');
    setDifficulty('Medium');
    
    setTimeout(() => {
      generatePuzzlePieces();
    }, 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Puzzle className="w-5 h-5" />
            Crowd Puzzle Setup ({puzzlePieces.length} pieces)
          </h3>
          <p className="text-sm text-muted-foreground">
            Create a collaborative puzzle that everyone works on together
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createSamplePuzzle} variant="outline" size="sm">
            Create Sample
          </Button>
          <Button onClick={generatePuzzlePieces} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Generate Pieces
          </Button>
        </div>
      </div>

      {/* Puzzle Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Puzzle Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Puzzle Title</label>
              <Input
                placeholder="e.g., Team Building Challenge"
                value={puzzleTitle}
                onChange={(e) => setPuzzleTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy (Large pieces)</SelectItem>
                  <SelectItem value="Medium">Medium (Standard pieces)</SelectItem>
                  <SelectItem value="Hard">Hard (Small pieces)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Image className="w-4 h-4" />
              Puzzle Image URL (optional)
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={puzzleImage}
                onChange={(e) => setPuzzleImage(e.target.value)}
              />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to use a generated pattern. High resolution images work best.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Badge className={getDifficultyColor(difficulty)} variant="secondary">
              {difficulty} Difficulty
            </Badge>
            <Badge variant="outline">
              {gameData.maxParticipants || 20} Max Pieces
            </Badge>
            {puzzleImage && (
              <Badge variant="outline">
                Custom Image
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Puzzle Preview */}
      {puzzlePieces.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Puzzle Pieces Preview</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {puzzlePieces.length} pieces generated
                </Badge>
                <Button onClick={clearAllPieces} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
              {puzzlePieces.slice(0, 32).map((piece: PuzzlePiece, index: number) => (
                <div
                  key={piece.id}
                  className="w-8 h-8 rounded border-2 border-gray-200 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: piece.color + '40' }}
                  title={`Piece ${index + 1}: ${piece.shape} - ${piece.color}`}
                >
                  {index + 1}
                </div>
              ))}
              {puzzlePieces.length > 32 && (
                <div className="w-8 h-8 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-muted-foreground">
                  +{puzzlePieces.length - 32}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>How it works:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Each participant gets assigned a unique puzzle piece</li>
                <li>Players work together to position their pieces correctly</li>
                <li>Real-time collaboration shows everyone's progress</li>
                <li>The puzzle is complete when all pieces are in place</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {puzzlePieces.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 text-muted-foreground">
            <Puzzle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No puzzle pieces generated yet.</p>
            <p className="text-sm mt-2">Configure your puzzle settings and generate pieces to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};