import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Clue {
  id: string;
  number: number;
  direction: "across" | "down";
  clueText: string;
  answer: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
}

interface CrosswordContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const CrosswordContentEditor = ({ gameData, setGameData }: CrosswordContentEditorProps) => {
  const [clues, setClues] = useState<Clue[]>(
    gameData.content?.clues || []
  );

  const addClue = () => {
    const newClue: Clue = {
      id: `c-${Date.now()}`,
      number: clues.length + 1,
      direction: "across",
      clueText: "",
      answer: "",
      difficulty: "Medium",
      category: "General",
    };
    const updated = [...clues, newClue];
    setClues(updated);
    setGameData({ ...gameData, content: { clues: updated } });
  };

  const updateClue = (index: number, field: string, value: any) => {
    const updated = [...clues];
    updated[index] = { ...updated[index], [field]: value };
    setClues(updated);
    setGameData({ ...gameData, content: { clues: updated } });
  };

  const deleteClue = (index: number) => {
    const updated = clues.filter((_, i) => i !== index);
    updated.forEach((clue, i) => clue.number = i + 1);
    setClues(updated);
    setGameData({ ...gameData, content: { clues: updated } });
  };

  const loadSampleClues = () => {
    const samples: Clue[] = [
      {
        id: "sample-1",
        number: 1,
        direction: "across",
        clueText: "Capital of France",
        answer: "PARIS",
        difficulty: "Easy",
        category: "Geography",
      },
      {
        id: "sample-2",
        number: 1,
        direction: "down",
        clueText: "Large feline",
        answer: "PANTHER",
        difficulty: "Medium",
        category: "Animals",
      },
    ];
    setClues(samples);
    setGameData({ ...gameData, content: { clues: samples } });
  };

  const acrossClues = clues.filter(c => c.direction === "across");
  const downClues = clues.filter(c => c.direction === "down");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Crossword Clues</h3>
          <p className="text-sm text-muted-foreground">Create clues for your crossword puzzle</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSampleClues} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addClue} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Clue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Across ({acrossClues.length})</h4>
          {acrossClues.length === 0 && (
            <p className="text-sm text-muted-foreground">No across clues yet</p>
          )}
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Down ({downClues.length})</h4>
          {downClues.length === 0 && (
            <p className="text-sm text-muted-foreground">No down clues yet</p>
          )}
        </Card>
      </div>

      {clues.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No clues yet. Add your first clue!</p>
        </Card>
      )}

      <div className="space-y-4">
        {clues.map((clue, index) => (
          <Card key={clue.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-semibold">{clue.number}</Label>
                  <span className="px-2 py-1 text-xs bg-secondary rounded">
                    {clue.direction === "across" ? "→ Across" : "↓ Down"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteClue(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Clue Text</Label>
                  <Input
                    value={clue.clueText}
                    onChange={(e) => updateClue(index, "clueText", e.target.value)}
                    placeholder="Enter the clue..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Answer</Label>
                  <Input
                    value={clue.answer}
                    onChange={(e) => updateClue(index, "answer", e.target.value.toUpperCase())}
                    placeholder="ANSWER"
                    className="uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Direction</Label>
                  <Select
                    value={clue.direction}
                    onValueChange={(value) => updateClue(index, "direction", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="across">Across</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={clue.category}
                    onChange={(e) => updateClue(index, "category", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={clue.difficulty}
                    onValueChange={(value) => updateClue(index, "difficulty", value)}
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
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrosswordContentEditor;
