import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Brain, Timer } from "lucide-react";
import { PuzzleItem } from "@/types/game";

interface PuzzleRushContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const PuzzleRushContentEditor = ({ gameData, setGameData }: PuzzleRushContentEditorProps) => {
  const puzzleItems = gameData.content?.puzzleItems || [];

  const addPuzzleItem = () => {
    const newPuzzle: PuzzleItem = {
      id: `puzzle-${Date.now()}`,
      type: 'word',
      question: '',
      answer: '',
      hint: '',
      difficulty: 'Medium',
      timeLimit: 30,
      points: 10
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzleItems: [...puzzleItems, newPuzzle]
      }
    });
  };

  const updatePuzzle = (index: number, updatedPuzzle: PuzzleItem) => {
    const updatedPuzzles = [...puzzleItems];
    updatedPuzzles[index] = updatedPuzzle;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzleItems: updatedPuzzles
      }
    });
  };

  const removePuzzle = (index: number) => {
    const updatedPuzzles = puzzleItems.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzleItems: updatedPuzzles
      }
    });
  };

  const generateSamplePuzzles = () => {
    const samplePuzzles: PuzzleItem[] = [
      {
        id: 'puzzle-1',
        type: 'word',
        question: 'Unscramble this wedding-related word: RECNODA',
        answer: 'CROWNED',
        hint: 'What the couple becomes on their special day',
        difficulty: 'Easy',
        timeLimit: 20,
        points: 10
      },
      {
        id: 'puzzle-2',
        type: 'math',
        question: 'If the bride has 12 bridesmaids and the groom has 8 groomsmen, and they want to pair them up for the processional, how many people will walk alone?',
        answer: '4',
        hint: 'Find the difference between the two groups',
        difficulty: 'Easy',
        timeLimit: 25,
        points: 15
      },
      {
        id: 'puzzle-3',
        type: 'logic',
        question: 'Three couples are sitting at a round table. No couple is sitting next to each other. If Anna sits to the left of Bob, and Charlie sits across from Anna, where does Bob\'s partner Diana sit?',
        answer: 'Next to Charlie',
        hint: 'Draw it out - couples must be separated',
        difficulty: 'Hard',
        timeLimit: 45,
        points: 25
      },
      {
        id: 'puzzle-4',
        type: 'riddle',
        question: 'I\'m given at weddings, I\'m round like a band, I symbolize love that will always stand. What am I?',
        answer: 'Wedding ring',
        hint: 'It goes on your finger',
        difficulty: 'Medium',
        timeLimit: 30,
        points: 15
      },
      {
        id: 'puzzle-5',
        type: 'word',
        question: 'Complete this wedding saying: "Something old, something new, something borrowed, something ____"',
        answer: 'blue',
        hint: 'A color that\'s considered lucky for brides',
        difficulty: 'Easy',
        timeLimit: 15,
        points: 10
      }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        puzzleItems: samplePuzzles
      }
    });
  };

  const getPuzzleTypeColor = (type: string) => {
    const colors = {
      word: 'bg-blue-100 text-blue-800',
      math: 'bg-green-100 text-green-800',
      logic: 'bg-purple-100 text-purple-800',
      riddle: 'bg-orange-100 text-orange-800',
      trivia: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || colors.word;
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
            <Brain className="w-5 h-5" />
            Puzzle Items ({puzzleItems.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Create diverse mini-puzzles for rapid-fire solving
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSamplePuzzles} variant="outline" size="sm">
            Load Sample Puzzles
          </Button>
          <Button onClick={addPuzzleItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Puzzle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 p-3 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            {puzzleItems.filter((item: PuzzleItem) => item.type === 'word').length}
          </div>
          <div className="text-xs text-muted-foreground">Word</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            {puzzleItems.filter((item: PuzzleItem) => item.type === 'math').length}
          </div>
          <div className="text-xs text-muted-foreground">Math</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">
            {puzzleItems.filter((item: PuzzleItem) => item.type === 'logic').length}
          </div>
          <div className="text-xs text-muted-foreground">Logic</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-orange-600">
            {puzzleItems.filter((item: PuzzleItem) => item.type === 'riddle').length}
          </div>
          <div className="text-xs text-muted-foreground">Riddle</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600">
            {puzzleItems.filter((item: PuzzleItem) => item.type === 'trivia').length}
          </div>
          <div className="text-xs text-muted-foreground">Trivia</div>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {puzzleItems.map((puzzle: PuzzleItem, index: number) => (
          <Card key={puzzle.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Puzzle {index + 1}</Badge>
                  <Badge className={getPuzzleTypeColor(puzzle.type)} variant="secondary">
                    {puzzle.type}
                  </Badge>
                  <Badge className={getDifficultyColor(puzzle.difficulty)} variant="secondary">
                    {puzzle.difficulty}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePuzzle(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Puzzle Type</label>
                    <Select
                      value={puzzle.type}
                      onValueChange={(value: 'math' | 'wordplay' | 'logic' | 'trivia' | 'word' | 'riddle') => updatePuzzle(index, { ...puzzle, type: value })}
                    >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="word">Word Puzzle</SelectItem>
                      <SelectItem value="math">Math Problem</SelectItem>
                      <SelectItem value="logic">Logic Puzzle</SelectItem>
                      <SelectItem value="riddle">Riddle</SelectItem>
                      <SelectItem value="trivia">Trivia Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <Select
                    value={puzzle.difficulty}
                    onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => updatePuzzle(index, { ...puzzle, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    Time Limit (s)
                  </label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={puzzle.timeLimit}
                    onChange={(e) => updatePuzzle(index, { ...puzzle, timeLimit: parseInt(e.target.value) || 30 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Question/Challenge</label>
                <Textarea
                  placeholder="Write your puzzle question or challenge..."
                  value={puzzle.question}
                  rows={2}
                  onChange={(e) => updatePuzzle(index, { ...puzzle, question: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Answer</label>
                  <Input
                    placeholder="Correct answer"
                    value={puzzle.answer}
                    onChange={(e) => updatePuzzle(index, { ...puzzle, answer: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={puzzle.points}
                    onChange={(e) => updatePuzzle(index, { ...puzzle, points: parseInt(e.target.value) || 10 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Hint (optional)</label>
                <Input
                  placeholder="Give players a helpful hint..."
                  value={puzzle.hint}
                  onChange={(e) => updatePuzzle(index, { ...puzzle, hint: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        {puzzleItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No puzzles configured yet.</p>
              <p className="text-sm mt-2">Create diverse brain-teasers for rapid-fire solving!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};