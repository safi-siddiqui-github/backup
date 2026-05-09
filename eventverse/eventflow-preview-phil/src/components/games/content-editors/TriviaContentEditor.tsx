import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Copy } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TriviaQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface TriviaContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const TriviaContentEditor = ({ gameData, setGameData }: TriviaContentEditorProps) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>(
    gameData.content?.questions || []
  );

  const addQuestion = () => {
    const newQuestion: TriviaQuestion = {
      id: `q-${Date.now()}`,
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "0",
      points: 100,
      category: "General",
      difficulty: "Medium",
    };
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated } });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated } });
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated } });
  };

  const deleteQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    setGameData({ ...gameData, content: { questions: updated } });
  };

  const loadSampleQuestions = () => {
    const samples: TriviaQuestion[] = [
      {
        id: "sample-1",
        text: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "1",
        points: 100,
        category: "Geography",
        difficulty: "Easy",
      },
      {
        id: "sample-2",
        text: "What year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "2",
        points: 150,
        category: "History",
        difficulty: "Medium",
      },
    ];
    setQuestions(samples);
    setGameData({ ...gameData, content: { questions: samples } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Trivia Questions</h3>
          <p className="text-sm text-muted-foreground">Add questions for your trivia game</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSampleQuestions} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addQuestion} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {questions.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No questions yet. Add your first question!</p>
        </Card>
      )}

      <div className="space-y-4">
        {questions.map((question, qIndex) => (
          <Card key={question.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Question {qIndex + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteQuestion(qIndex)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Question Text</Label>
                <Input
                  value={question.text}
                  onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
                  placeholder="Enter your question..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="space-y-2">
                    <Label>Option {String.fromCharCode(65 + optIndex)}</Label>
                    <Input
                      value={option}
                      onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <Select
                    value={question.correctAnswer}
                    onValueChange={(value) => updateQuestion(qIndex, "correctAnswer", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((_, i) => (
                        <SelectItem key={i} value={String(i)}>
                          Option {String.fromCharCode(65 + i)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={question.points}
                    onChange={(e) => updateQuestion(qIndex, "points", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={question.category}
                    onChange={(e) => updateQuestion(qIndex, "category", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={question.difficulty}
                    onValueChange={(value) => updateQuestion(qIndex, "difficulty", value)}
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

export default TriviaContentEditor;
