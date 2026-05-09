import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DrawingPrompt {
  id: string;
  text: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "objects" | "animals" | "scenes" | "people" | "abstract";
  timeLimit: number;
  judgingCriteria: string;
}

interface DrawingContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const DrawingContentEditor = ({ gameData, setGameData }: DrawingContentEditorProps) => {
  const [prompts, setPrompts] = useState<DrawingPrompt[]>(
    gameData.content?.prompts || []
  );

  const addPrompt = () => {
    const newPrompt: DrawingPrompt = {
      id: `p-${Date.now()}`,
      text: "",
      difficulty: "Medium",
      category: "objects",
      timeLimit: 60,
      judgingCriteria: "creativity",
    };
    const updated = [...prompts, newPrompt];
    setPrompts(updated);
    setGameData({ ...gameData, content: { prompts: updated } });
  };

  const updatePrompt = (index: number, field: string, value: any) => {
    const updated = [...prompts];
    updated[index] = { ...updated[index], [field]: value };
    setPrompts(updated);
    setGameData({ ...gameData, content: { prompts: updated } });
  };

  const deletePrompt = (index: number) => {
    const updated = prompts.filter((_, i) => i !== index);
    setPrompts(updated);
    setGameData({ ...gameData, content: { prompts: updated } });
  };

  const loadSamplePrompts = () => {
    const samples: DrawingPrompt[] = [
      {
        id: "sample-1",
        text: "Draw a happy cat wearing a hat",
        difficulty: "Easy",
        category: "animals",
        timeLimit: 60,
        judgingCriteria: "creativity",
      },
      {
        id: "sample-2",
        text: "Draw a futuristic city skyline",
        difficulty: "Hard",
        category: "scenes",
        timeLimit: 120,
        judgingCriteria: "detail",
      },
    ];
    setPrompts(samples);
    setGameData({ ...gameData, content: { prompts: samples } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Drawing Prompts</h3>
          <p className="text-sm text-muted-foreground">Create creative drawing challenges</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSamplePrompts} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addPrompt} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Prompt
          </Button>
        </div>
      </div>

      {prompts.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No prompts yet. Add your first drawing prompt!</p>
        </Card>
      )}

      <div className="space-y-4">
        {prompts.map((prompt, index) => (
          <Card key={prompt.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Prompt {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePrompt(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Drawing Prompt</Label>
                <Input
                  value={prompt.text}
                  onChange={(e) => updatePrompt(index, "text", e.target.value)}
                  placeholder="e.g., Draw a robot cooking breakfast"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={prompt.category}
                    onValueChange={(value) => updatePrompt(index, "category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="objects">Objects</SelectItem>
                      <SelectItem value="animals">Animals</SelectItem>
                      <SelectItem value="scenes">Scenes</SelectItem>
                      <SelectItem value="people">People</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={prompt.difficulty}
                    onValueChange={(value) => updatePrompt(index, "difficulty", value)}
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
                    value={prompt.timeLimit}
                    onChange={(e) => updatePrompt(index, "timeLimit", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Judging</Label>
                  <Select
                    value={prompt.judgingCriteria}
                    onValueChange={(value) => updatePrompt(index, "judgingCriteria", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creativity">Creativity</SelectItem>
                      <SelectItem value="accuracy">Accuracy</SelectItem>
                      <SelectItem value="speed">Speed</SelectItem>
                      <SelectItem value="detail">Detail</SelectItem>
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

export default DrawingContentEditor;
