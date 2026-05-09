import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BeatPattern {
  id: string;
  name: string;
  beats: number[];
  bpm: number;
  difficulty: "Easy" | "Medium" | "Hard";
  genre: string;
  duration: number;
}

interface BeatTapperContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const BeatTapperContentEditor = ({ gameData, setGameData }: BeatTapperContentEditorProps) => {
  const [patterns, setPatterns] = useState<BeatPattern[]>(
    gameData.content?.patterns || []
  );

  const addPattern = () => {
    const newPattern: BeatPattern = {
      id: `p-${Date.now()}`,
      name: "",
      beats: [0, 0.5, 1, 1.5, 2],
      bpm: 120,
      difficulty: "Medium",
      genre: "Pop",
      duration: 30,
    };
    const updated = [...patterns, newPattern];
    setPatterns(updated);
    setGameData({ ...gameData, content: { patterns: updated } });
  };

  const updatePattern = (index: number, field: string, value: any) => {
    const updated = [...patterns];
    updated[index] = { ...updated[index], [field]: value };
    setPatterns(updated);
    setGameData({ ...gameData, content: { patterns: updated } });
  };

  const deletePattern = (index: number) => {
    const updated = patterns.filter((_, i) => i !== index);
    setPatterns(updated);
    setGameData({ ...gameData, content: { patterns: updated } });
  };

  const updateBeats = (index: number, beatsString: string) => {
    const beats = beatsString.split(",").map(b => parseFloat(b.trim())).filter(b => !isNaN(b));
    updatePattern(index, "beats", beats);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Beat Patterns</h3>
          <p className="text-sm text-muted-foreground">Create rhythm patterns for players to tap</p>
        </div>
        <Button onClick={addPattern} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Pattern
        </Button>
      </div>

      {patterns.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No patterns yet. Add your first beat pattern!</p>
        </Card>
      )}

      <div className="space-y-4">
        {patterns.map((pattern, index) => (
          <Card key={pattern.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Pattern {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePattern(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Pattern Name</Label>
                <Input
                  value={pattern.name}
                  onChange={(e) => updatePattern(index, "name", e.target.value)}
                  placeholder="e.g., Four on the Floor"
                />
              </div>

              <div className="space-y-2">
                <Label>Beat Timings (comma-separated seconds)</Label>
                <Input
                  value={pattern.beats.join(", ")}
                  onChange={(e) => updateBeats(index, e.target.value)}
                  placeholder="e.g., 0, 0.5, 1, 1.5, 2"
                />
                <p className="text-xs text-muted-foreground">
                  Enter beat timings in seconds, separated by commas
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>BPM</Label>
                  <Input
                    type="number"
                    value={pattern.bpm}
                    onChange={(e) => updatePattern(index, "bpm", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Input
                    value={pattern.genre}
                    onChange={(e) => updatePattern(index, "genre", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={pattern.difficulty}
                    onValueChange={(value) => updatePattern(index, "difficulty", value)}
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

                <div className="space-y-2">
                  <Label>Duration (s)</Label>
                  <Input
                    type="number"
                    value={pattern.duration}
                    onChange={(e) => updatePattern(index, "duration", parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex gap-2 p-3 bg-muted rounded-md">
                {pattern.beats.map((beat, i) => (
                  <div key={i} className="w-2 h-8 bg-primary rounded" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BeatTapperContentEditor;
