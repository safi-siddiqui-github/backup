import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Challenge {
  id: string;
  name: string;
  type: "physical" | "mental" | "trivia" | "social";
  description: string;
  eliminationCriteria: string;
  timeLimit: number;
  points: number;
}

interface SurvivorContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const SurvivorContentEditor = ({ gameData, setGameData }: SurvivorContentEditorProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>(
    gameData.content?.challenges || []
  );

  const addChallenge = () => {
    const newChallenge: Challenge = {
      id: `c-${Date.now()}`,
      name: "",
      type: "physical",
      description: "",
      eliminationCriteria: "Last place",
      timeLimit: 300,
      points: 100,
    };
    const updated = [...challenges, newChallenge];
    setChallenges(updated);
    setGameData({ ...gameData, content: { challenges: updated } });
  };

  const updateChallenge = (index: number, field: string, value: any) => {
    const updated = [...challenges];
    updated[index] = { ...updated[index], [field]: value };
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
          <h3 className="text-lg font-semibold text-foreground">Survivor Challenges</h3>
          <p className="text-sm text-muted-foreground">Create elimination challenges</p>
        </div>
        <Button onClick={addChallenge} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Challenge
        </Button>
      </div>

      {challenges.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No challenges yet. Add your first challenge!</p>
        </Card>
      )}

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <Card key={challenge.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Round {index + 1}</Label>
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
                <Label>Challenge Name</Label>
                <Input
                  value={challenge.name}
                  onChange={(e) => updateChallenge(index, "name", e.target.value)}
                  placeholder="e.g., Endurance Race, Memory Test"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={challenge.description}
                  onChange={(e) => updateChallenge(index, "description", e.target.value)}
                  placeholder="Describe what players need to do..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Challenge Type</Label>
                  <Select
                    value={challenge.type}
                    onValueChange={(value) => updateChallenge(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="mental">Mental</SelectItem>
                      <SelectItem value="trivia">Trivia</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
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

              <div className="space-y-2">
                <Label>Elimination Criteria</Label>
                <Input
                  value={challenge.eliminationCriteria}
                  onChange={(e) => updateChallenge(index, "eliminationCriteria", e.target.value)}
                  placeholder="e.g., Last place, Bottom 2, Lowest score"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SurvivorContentEditor;
