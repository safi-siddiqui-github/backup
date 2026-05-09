import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Shuffle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SentenceChallenge {
  id: string;
  sentence: string;
  scrambledWords: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  timeLimit: number;
  points: number;
}

interface SentenceBuilderContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const SentenceBuilderContentEditor = ({ gameData, setGameData }: SentenceBuilderContentEditorProps) => {
  const [challenges, setChallenges] = useState<SentenceChallenge[]>(
    gameData.content?.challenges || []
  );

  const scrambleSentence = (sentence: string): string[] => {
    const words = sentence.split(" ");
    return words.sort(() => Math.random() - 0.5);
  };

  const addChallenge = () => {
    const newChallenge: SentenceChallenge = {
      id: `c-${Date.now()}`,
      sentence: "",
      scrambledWords: [],
      difficulty: "Medium",
      category: "General",
      timeLimit: 60,
      points: 100,
    };
    const updated = [...challenges, newChallenge];
    setChallenges(updated);
    setGameData({ ...gameData, content: { challenges: updated } });
  };

  const updateChallenge = (index: number, field: string, value: any) => {
    const updated = [...challenges];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === "sentence" && value) {
      updated[index].scrambledWords = scrambleSentence(value);
    }
    
    setChallenges(updated);
    setGameData({ ...gameData, content: { challenges: updated } });
  };

  const rescramble = (index: number) => {
    const updated = [...challenges];
    updated[index].scrambledWords = scrambleSentence(updated[index].sentence);
    setChallenges(updated);
    setGameData({ ...gameData, content: { challenges: updated } });
  };

  const deleteChallenge = (index: number) => {
    const updated = challenges.filter((_, i) => i !== index);
    setChallenges(updated);
    setGameData({ ...gameData, content: { challenges: updated } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sentence Challenges</h3>
          <p className="text-sm text-muted-foreground">Create sentences for players to unscramble</p>
        </div>
        <Button onClick={addChallenge} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Challenge
        </Button>
      </div>

      {challenges.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No challenges yet. Add your first sentence!</p>
        </Card>
      )}

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <Card key={challenge.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Challenge {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteChallenge(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Sentence</Label>
                <Input
                  value={challenge.sentence}
                  onChange={(e) => updateChallenge(index, "sentence", e.target.value)}
                  placeholder="Enter the complete sentence..."
                />
              </div>

              {challenge.scrambledWords.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Scrambled Preview</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rescramble(index)}
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Re-scramble
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                    {challenge.scrambledWords.map((word, i) => (
                      <span key={i} className="px-3 py-1 bg-background rounded border">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={challenge.category}
                    onChange={(e) => updateChallenge(index, "category", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={challenge.difficulty}
                    onValueChange={(value) => updateChallenge(index, "difficulty", value)}
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
                  <Label>Time Limit (s)</Label>
                  <Input
                    type="number"
                    value={challenge.timeLimit}
                    onChange={(e) => updateChallenge(index, "timeLimit", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={challenge.points}
                    onChange={(e) => updateChallenge(index, "points", parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SentenceBuilderContentEditor;
