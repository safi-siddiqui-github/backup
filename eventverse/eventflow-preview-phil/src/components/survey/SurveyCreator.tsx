
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, GripVertical, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Survey, SurveyQuestion } from "./types";

interface SurveyCreatorProps {
  eventId: string;
}

const SurveyCreator = ({ eventId }: SurveyCreatorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [multipleSubmissions, setMultipleSubmissions] = useState(false);
  const { toast } = useToast();

  const addQuestion = (type: SurveyQuestion['type']) => {
    const newQuestion: SurveyQuestion = {
      id: Date.now().toString(),
      type,
      question: "",
      isRequired: false,
      order: questions.length + 1,
      options: type === 'multiple-choice' || type === 'checkbox' ? [''] : undefined,
      ratingScale: type === 'rating' ? { min: 1, max: 5 } : undefined
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      updateQuestion(questionId, {
        options: [...question.options, '']
      });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options && question.options.length > 1) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const saveSurvey = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your survey.",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Questions required",
        description: "Please add at least one question to your survey.",
        variant: "destructive"
      });
      return;
    }

    // Here you would save to your backend
    toast({
      title: "Survey created",
      description: `${title} has been created successfully.`
    });
  };

  const getQuestionTypeLabel = (type: SurveyQuestion['type']) => {
    switch (type) {
      case 'multiple-choice': return 'Multiple Choice';
      case 'text': return 'Text Answer';
      case 'rating': return 'Rating Scale';
      case 'date': return 'Date';
      case 'checkbox': return 'Checkboxes';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Survey Details */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="survey-title">Title</Label>
            <Input
              id="survey-title"
              placeholder="e.g., Event Feedback Survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="survey-description">Description</Label>
            <Textarea
              id="survey-description"
              placeholder="Tell your guests what this survey is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Anonymous</Label>
                <p className="text-sm text-gray-600">Don't require login</p>
              </div>
              <Switch
                checked={allowAnonymous}
                onCheckedChange={setAllowAnonymous}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Show Results</Label>
                <p className="text-sm text-gray-600">Let guests see results</p>
              </div>
              <Switch
                checked={showResults}
                onCheckedChange={setShowResults}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Multiple Submissions</Label>
                <p className="text-sm text-gray-600">Allow repeat responses</p>
              </div>
              <Switch
                checked={multipleSubmissions}
                onCheckedChange={setMultipleSubmissions}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Builder */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Questions</CardTitle>
            <div className="flex gap-2">
              <Select onValueChange={(value) => addQuestion(value as SurveyQuestion['type'])}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Add Question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="text">Text Answer</SelectItem>
                  <SelectItem value="rating">Rating Scale</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="checkbox">Checkboxes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No questions yet. Add your first question above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400 mt-2" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {getQuestionTypeLabel(question.type)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>

                        <Input
                          placeholder={`Question ${index + 1}`}
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                        />

                        {(question.type === 'multiple-choice' || question.type === 'checkbox') && (
                          <div className="space-y-2">
                            <Label>Options</Label>
                            {question.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  placeholder={`Option ${optionIndex + 1}`}
                                  value={option}
                                  onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeOption(question.id, optionIndex)}
                                  disabled={question.options!.length <= 1}
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(question.id)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Option
                            </Button>
                          </div>
                        )}

                        {question.type === 'rating' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Minimum Rating</Label>
                              <Input
                                type="number"
                                value={question.ratingScale?.min || 1}
                                onChange={(e) => updateQuestion(question.id, {
                                  ratingScale: { ...question.ratingScale!, min: Number(e.target.value) }
                                })}
                              />
                            </div>
                            <div>
                              <Label>Maximum Rating</Label>
                              <Input
                                type="number"
                                value={question.ratingScale?.max || 5}
                                onChange={(e) => updateQuestion(question.id, {
                                  ratingScale: { ...question.ratingScale!, max: Number(e.target.value) }
                                })}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={question.isRequired}
                            onCheckedChange={(checked) => updateQuestion(question.id, { isRequired: checked })}
                          />
                          <Label>Required</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSurvey} className="min-w-32">
          <Save className="w-4 h-4 mr-2" />
          Save Survey
        </Button>
      </div>
    </div>
  );
};

export default SurveyCreator;
