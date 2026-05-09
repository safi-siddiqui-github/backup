import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Zap, ArrowLeftRight } from "lucide-react";
import { OpinionBattle } from "@/types/game";

interface OpinionBattleContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const OpinionBattleContentEditor = ({ gameData, setGameData }: OpinionBattleContentEditorProps) => {
  const opinionBattles = gameData.content?.opinionBattles || [];

  const addOpinionBattle = () => {
    const newBattle: OpinionBattle = {
      id: `battle-${Date.now()}`,
      question: '',
      optionA: { text: '', description: '' },
      optionB: { text: '', description: '' },
      category: 'general',
      timeLimit: 30
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        opinionBattles: [...opinionBattles, newBattle]
      }
    });
  };

  const updateBattle = (index: number, updatedBattle: OpinionBattle) => {
    const updatedBattles = [...opinionBattles];
    updatedBattles[index] = updatedBattle;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        opinionBattles: updatedBattles
      }
    });
  };

  const removeBattle = (index: number) => {
    const updatedBattles = opinionBattles.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        opinionBattles: updatedBattles
      }
    });
  };

  const generateSampleBattles = () => {
    const sampleBattles: OpinionBattle[] = [
      {
        id: 'battle-1',
        question: 'What makes a better wedding entrance?',
        optionA: {
          text: 'Grand dramatic entrance with music',
          description: 'Walk down the aisle to your favorite epic song'
        },
        optionB: {
          text: 'Simple, intimate entrance',
          description: 'A quiet, emotional walk focusing on the moment'
        },
        category: 'wedding',
        timeLimit: 30
      },
      {
        id: 'battle-2',
        question: 'Which wedding tradition is more important?',
        optionA: {
          text: 'Something old, new, borrowed, blue',
          description: 'Honor the classic wedding tradition'
        },
        optionB: {
          text: 'Create your own unique tradition',
          description: 'Start fresh with something completely new'
        },
        category: 'wedding',
        timeLimit: 30
      },
      {
        id: 'battle-3',
        question: 'What\'s the ideal honeymoon?',
        optionA: {
          text: 'Adventure and exploration',
          description: 'Hiking, skydiving, exploring new cultures'
        },
        optionB: {
          text: 'Relaxation and luxury',
          description: 'Beach resort, spa treatments, room service'
        },
        category: 'lifestyle',
        timeLimit: 30
      },
      {
        id: 'battle-4',
        question: 'Better way to handle wedding stress?',
        optionA: {
          text: 'Plan every detail meticulously',
          description: 'Have backup plans for your backup plans'
        },
        optionB: {
          text: 'Go with the flow',
          description: 'Trust that everything will work out perfectly'
        },
        category: 'personality',
        timeLimit: 30
      }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        opinionBattles: sampleBattles
      }
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      wedding: 'bg-pink-100 text-pink-800',
      lifestyle: 'bg-blue-100 text-blue-800',
      personality: 'bg-purple-100 text-purple-800',
      food: 'bg-orange-100 text-orange-800',
      entertainment: 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Opinion Battles ({opinionBattles.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Create "would you rather" style questions for audience voting
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSampleBattles} variant="outline" size="sm">
            Load Sample Battles
          </Button>
          <Button onClick={addOpinionBattle} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Battle
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {opinionBattles.map((battle: OpinionBattle, index: number) => (
          <Card key={battle.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Battle {index + 1}</Badge>
                  <Badge className={getCategoryColor(battle.category)} variant="secondary">
                    {battle.category}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBattle(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <Textarea
                  placeholder="e.g., What makes a better first date?"
                  value={battle.question}
                  rows={2}
                  onChange={(e) => updateBattle(index, { ...battle, question: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select
                    value={battle.category}
                    onValueChange={(value) => updateBattle(index, { ...battle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="personality">Personality</SelectItem>
                      <SelectItem value="food">Food & Drink</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Time Limit (seconds)</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={battle.timeLimit}
                    onChange={(e) => updateBattle(index, { ...battle, timeLimit: parseInt(e.target.value) || 30 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border-2 border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="bg-blue-600">Option A</Badge>
                  </div>
                  <Input
                    placeholder="First option..."
                    value={battle.optionA.text}
                    className="mb-2"
                    onChange={(e) => updateBattle(index, {
                      ...battle,
                      optionA: { ...battle.optionA, text: e.target.value }
                    })}
                  />
                  <Textarea
                    placeholder="Description or reasoning..."
                    value={battle.optionA.description}
                    rows={2}
                    onChange={(e) => updateBattle(index, {
                      ...battle,
                      optionA: { ...battle.optionA, description: e.target.value }
                    })}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <ArrowLeftRight className="w-8 h-8 text-muted-foreground" />
                </div>

                <div className="p-3 border-2 border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" className="bg-red-600">Option B</Badge>
                  </div>
                  <Input
                    placeholder="Second option..."
                    value={battle.optionB.text}
                    className="mb-2"
                    onChange={(e) => updateBattle(index, {
                      ...battle,
                      optionB: { ...battle.optionB, text: e.target.value }
                    })}
                  />
                  <Textarea
                    placeholder="Description or reasoning..."
                    value={battle.optionB.description}
                    rows={2}
                    onChange={(e) => updateBattle(index, {
                      ...battle,
                      optionB: { ...battle.optionB, description: e.target.value }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {opinionBattles.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No opinion battles configured yet.</p>
              <p className="text-sm mt-2">Create engaging "would you rather" questions for your audience!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};