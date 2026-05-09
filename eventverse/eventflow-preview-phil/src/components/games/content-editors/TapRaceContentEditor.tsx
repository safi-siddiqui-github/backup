import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { RaceVariant } from "@/types/game";

interface TapRaceContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const TapRaceContentEditor = ({ gameData, setGameData }: TapRaceContentEditorProps) => {
  const raceVariants = gameData.content?.raceVariants || [];

  const addRaceVariant = () => {
    const newVariant: RaceVariant = {
      id: `variant-${Date.now()}`,
      name: '',
      targetTaps: 100,
      timeLimit: 30,
      description: '',
      difficulty: 'Medium',
      multiplier: 1
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        raceVariants: [...raceVariants, newVariant]
      }
    });
  };

  const updateVariant = (index: number, updatedVariant: RaceVariant) => {
    const updatedVariants = [...raceVariants];
    updatedVariants[index] = updatedVariant;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        raceVariants: updatedVariants
      }
    });
  };

  const removeVariant = (index: number) => {
    const updatedVariants = raceVariants.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        raceVariants: updatedVariants
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Race Variants ({raceVariants.length})</h3>
          <p className="text-sm text-muted-foreground">
            Configure different tap race challenges with varying objectives
          </p>
        </div>
        <Button onClick={addRaceVariant} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {raceVariants.map((variant: RaceVariant, index: number) => (
          <Card key={variant.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">Variant {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVariant(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Variant Name</label>
                  <Input
                    placeholder="e.g., Speed Demon, Endurance Test"
                    value={variant.name}
                    onChange={(e) => updateVariant(index, { ...variant, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <Select
                    value={variant.difficulty}
                    onValueChange={(value: any) => updateVariant(index, { ...variant, difficulty: value })}
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

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  placeholder="Describe this race variant"
                  value={variant.description}
                  onChange={(e) => updateVariant(index, { ...variant, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Target Taps</label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={variant.targetTaps}
                    onChange={(e) => updateVariant(index, { ...variant, targetTaps: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time Limit (seconds)</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={variant.timeLimit}
                    onChange={(e) => updateVariant(index, { ...variant, timeLimit: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Badge variant="outline">
                  {variant.targetTaps} taps in {variant.timeLimit}s
                </Badge>
                <Badge variant="secondary">
                  {variant.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {raceVariants.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <p>No race variants configured yet.</p>
              <p className="text-sm mt-2">Add a variant to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};