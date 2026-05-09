import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Goal {
  id: string;
  name: string;
  targetSteps: number;
  duration: "daily" | "weekly" | "total";
  pointsMultiplier: number;
  badge: string;
  message: string;
}

interface StepChallengeContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const StepChallengeContentEditor = ({ gameData, setGameData }: StepChallengeContentEditorProps) => {
  const [goals, setGoals] = useState<Goal[]>(
    gameData.content?.goals || []
  );

  const addGoal = () => {
    const newGoal: Goal = {
      id: `g-${Date.now()}`,
      name: "",
      targetSteps: 10000,
      duration: "daily",
      pointsMultiplier: 1,
      badge: "",
      message: "",
    };
    const updated = [...goals, newGoal];
    setGoals(updated);
    setGameData({ ...gameData, content: { goals: updated } });
  };

  const updateGoal = (index: number, field: string, value: any) => {
    const updated = [...goals];
    updated[index] = { ...updated[index], [field]: value };
    setGoals(updated);
    setGameData({ ...gameData, content: { goals: updated } });
  };

  const deleteGoal = (index: number) => {
    const updated = goals.filter((_, i) => i !== index);
    setGoals(updated);
    setGameData({ ...gameData, content: { goals: updated } });
  };

  const loadSampleGoals = () => {
    const samples: Goal[] = [
      {
        id: "sample-1",
        name: "Daily Walker",
        targetSteps: 10000,
        duration: "daily",
        pointsMultiplier: 1,
        badge: "🚶 Walker",
        message: "Keep up the great work!",
      },
      {
        id: "sample-2",
        name: "Weekend Warrior",
        targetSteps: 50000,
        duration: "weekly",
        pointsMultiplier: 2,
        badge: "⚡ Warrior",
        message: "Amazing dedication!",
      },
    ];
    setGoals(samples);
    setGameData({ ...gameData, content: { goals: samples } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Step Challenge Goals</h3>
          <p className="text-sm text-muted-foreground">Set milestones and rewards for step tracking</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSampleGoals} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addGoal} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      {goals.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No goals yet. Add your first milestone!</p>
        </Card>
      )}

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <Card key={goal.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Goal {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteGoal(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Goal Name</Label>
                <Input
                  value={goal.name}
                  onChange={(e) => updateGoal(index, "name", e.target.value)}
                  placeholder="e.g., Daily 10K, Marathon Month"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Target Steps</Label>
                  <Input
                    type="number"
                    value={goal.targetSteps}
                    onChange={(e) => updateGoal(index, "targetSteps", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select
                    value={goal.duration}
                    onValueChange={(value) => updateGoal(index, "duration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="total">Total (Event)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points Multiplier</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={goal.pointsMultiplier}
                    onChange={(e) => updateGoal(index, "pointsMultiplier", parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Badge/Reward</Label>
                  <Input
                    value={goal.badge}
                    onChange={(e) => updateGoal(index, "badge", e.target.value)}
                    placeholder="e.g., 🏆 Champion"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Motivational Message</Label>
                  <Input
                    value={goal.message}
                    onChange={(e) => updateGoal(index, "message", e.target.value)}
                    placeholder="Shown when goal is reached..."
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

export default StepChallengeContentEditor;
