import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToAnswer: number;
}

interface Forfeit {
  id: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface HotPotatoContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const HotPotatoContentEditor = ({ gameData, setGameData }: HotPotatoContentEditorProps) => {
  const [questions, setQuestions] = useState<Question[]>(
    gameData.content?.questions || []
  );
  const [forfeits, setForfeits] = useState<Forfeit[]>(
    gameData.content?.forfeits || []
  );

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: "",
      category: "General",
      difficulty: "Medium",
      timeToAnswer: 10,
    };
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated, forfeits } });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated, forfeits } });
  };

  const deleteQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated, forfeits } });
  };

  const addForfeit = () => {
    const newForfeit: Forfeit = {
      id: `f-${Date.now()}`,
      description: "",
      difficulty: "Medium",
    };
    const updated = [...forfeits, newForfeit];
    setForfeits(updated);
    setGameData({ ...gameData, content: { questions, forfeits: updated } });
  };

  const updateForfeit = (index: number, field: string, value: any) => {
    const updated = [...forfeits];
    updated[index] = { ...updated[index], [field]: value };
    setForfeits(updated);
    setGameData({ ...gameData, content: { questions, forfeits: updated } });
  };

  const deleteForfeit = (index: number) => {
    const updated = forfeits.filter((_, i) => i !== index);
    setForfeits(updated);
    setGameData({ ...gameData, content: { questions, forfeits: updated } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Digital Hot Potato</h3>
        <p className="text-sm text-muted-foreground">Add questions and forfeit tasks</p>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="forfeits">Forfeits ({forfeits.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4 mt-6">
          <div className="flex justify-end">
            <Button onClick={addQuestion} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>

          {questions.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground">No questions yet. Add your first question!</p>
            </Card>
          )}

          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Label className="text-base font-semibold">Question {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteQuestion(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Textarea
                      value={question.text}
                      onChange={(e) => updateQuestion(index, "text", e.target.value)}
                      placeholder="Enter your question..."
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={question.category}
                        onChange={(e) => updateQuestion(index, "category", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select
                        value={question.difficulty}
                        onValueChange={(value) => updateQuestion(index, "difficulty", value)}
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
                      <Label>Time to Answer (s)</Label>
                      <Input
                        type="number"
                        value={question.timeToAnswer}
                        onChange={(e) => updateQuestion(index, "timeToAnswer", parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forfeits" className="space-y-4 mt-6">
          <div className="flex justify-end">
            <Button onClick={addForfeit} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Forfeit
            </Button>
          </div>

          {forfeits.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground">No forfeits yet. Add fun tasks!</p>
            </Card>
          )}

          <div className="space-y-4">
            {forfeits.map((forfeit, index) => (
              <Card key={forfeit.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Label className="text-base font-semibold">Forfeit {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteForfeit(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Task Description</Label>
                    <Textarea
                      value={forfeit.description}
                      onChange={(e) => updateForfeit(index, "description", e.target.value)}
                      placeholder="e.g., Do 10 jumping jacks, Sing a song..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select
                      value={forfeit.difficulty}
                      onValueChange={(value) => updateForfeit(index, "difficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy (Fun)</SelectItem>
                        <SelectItem value="Medium">Medium (Silly)</SelectItem>
                        <SelectItem value="Hard">Hard (Embarrassing)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotPotatoContentEditor;
