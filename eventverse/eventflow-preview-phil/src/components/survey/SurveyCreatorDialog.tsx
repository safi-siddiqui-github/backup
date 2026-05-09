import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, Save, X, Star, Calendar, Hash, Type, CheckSquare, List, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SurveyQuestion } from "./types";
import RatingInput from "./RatingInput";
import DateInput from "./DateInput";
import OptionInputs from "./OptionInputs";

interface SurveyCreatorDialogProps {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSurveyCreated: () => void;
}

const SurveyCreatorDialog = ({ eventId, open, onOpenChange, onSurveyCreated }: SurveyCreatorDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [anonymizeResponses, setAnonymizeResponses] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [multipleSubmissions, setMultipleSubmissions] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setQuestions([]);
    setAllowAnonymous(true);
    setAnonymizeResponses(false);
    setShowResults(false);
    setMultipleSubmissions(false);
  };

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: List, description: 'Select one option from a list', category: 'Choice' },
    { value: 'checkbox', label: 'Checkboxes', icon: CheckSquare, description: 'Select multiple options', category: 'Choice' },
    { value: 'text', label: 'Short Text', icon: Type, description: 'Brief text response', category: 'Text' },
    { value: 'rating', label: 'Rating Scale', icon: Star, description: 'Rate on a scale (1-5, 1-10, etc.)', category: 'Rating' },
    { value: 'date', label: 'Date', icon: Calendar, description: 'Select a date', category: 'Date & Time' },
    { value: 'number', label: 'Number', icon: Hash, description: 'Numeric input', category: 'Data' }
  ];

  const addQuestion = (type: SurveyQuestion['type']) => {
    const newQuestion: SurveyQuestion = {
      id: Date.now().toString(),
      type,
      question: "",
      isRequired: false,
      order: questions.length + 1,
      options: (type === 'multiple-choice' || type === 'checkbox') ? ['Option 1', 'Option 2'] : undefined,
      optionType: (type === 'multiple-choice' || type === 'checkbox') ? 'text' : undefined,
      optionValues: (type === 'multiple-choice' || type === 'checkbox') ? [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' }
      ] : undefined,
      ratingScale: type === 'rating' ? { min: 1, max: 5, labels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] } : undefined
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateRatingScale = (questionId: string, field: 'min' | 'max', value: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.ratingScale) {
      updateQuestion(questionId, {
        ratingScale: { ...question.ratingScale, [field]: value }
      });
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
    
    resetForm();
    onSurveyCreated();
    onOpenChange(false);
  };

  const getQuestionTypeInfo = (type: SurveyQuestion['type']) => {
    return questionTypes.find(qt => qt.value === type) || questionTypes[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Survey</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Survey Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Survey Details</CardTitle>
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
                  rows={3}
                />
              </div>

              <TooltipProvider>
                <div className="space-y-4">
                  {/* Response Collection Section */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Response Collection</h4>
                    
                    <div className="flex items-center justify-between p-3 border rounded bg-muted/30">
                      <div className="flex items-center gap-2">
                        <div>
                          <Label>Allow Anonymous Submissions</Label>
                          <p className="text-xs text-muted-foreground">No login required</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Guests can respond without signing in. Useful for public surveys.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Switch
                        checked={allowAnonymous}
                        onCheckedChange={setAllowAnonymous}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded bg-muted/30">
                      <div className="flex items-center gap-2">
                        <div>
                          <Label>Anonymize Responses</Label>
                          <p className="text-xs text-muted-foreground">Hide respondent identity</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Guest names are hidden in results and analytics. Useful for sensitive feedback.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Switch
                        checked={anonymizeResponses}
                        onCheckedChange={setAnonymizeResponses}
                      />
                    </div>
                    
                    {allowAnonymous && anonymizeResponses && (
                      <Badge variant="secondary" className="w-full justify-center">
                        Fully Anonymous Survey
                      </Badge>
                    )}
                  </div>

                  {/* Results & Submissions Section */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Results & Submissions</h4>
                    
                    <div className="flex items-center justify-between p-3 border rounded bg-muted/30">
                      <div>
                        <Label>Show Results</Label>
                        <p className="text-xs text-muted-foreground">Let guests see results</p>
                      </div>
                      <Switch
                        checked={showResults}
                        onCheckedChange={setShowResults}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded bg-muted/30">
                      <div>
                        <Label>Multiple Submissions</Label>
                        <p className="text-xs text-muted-foreground">Allow repeat responses</p>
                      </div>
                      <Switch
                        checked={multipleSubmissions}
                        onCheckedChange={setMultipleSubmissions}
                      />
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Question Builder */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Questions ({questions.length})</CardTitle>
                <Select onValueChange={(value) => addQuestion(value as SurveyQuestion['type'])}>
                  <SelectTrigger className="w-60">
                    <Plus className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Add Question Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No questions yet. Add your first question above!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => {
                    const typeInfo = getQuestionTypeInfo(question.type);
                    const Icon = typeInfo.icon;
                    
                    return (
                      <Card key={question.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Icon className="w-3 h-3" />
                                {typeInfo.label}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteQuestion(question.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>

                            <Input
                              placeholder={`Question ${index + 1}`}
                              value={question.question}
                              onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                            />

                            {/* Multiple Choice & Checkbox Options */}
                            {(question.type === 'multiple-choice' || question.type === 'checkbox') && (
                              <OptionInputs
                                optionType={question.optionType || 'text'}
                                options={question.optionValues || []}
                                onOptionsChange={(options) => updateQuestion(question.id, { 
                                  optionValues: options,
                                  options: options.map(opt => opt.label || opt.value.toString())
                                })}
                                onOptionTypeChange={(optionType) => updateQuestion(question.id, { 
                                  optionType,
                                  optionValues: optionType === 'text' ? 
                                    [{ label: 'Option 1', value: 'Option 1' }, { label: 'Option 2', value: 'Option 2' }] :
                                    [{ label: 'Option 1', value: new Date() }, { label: 'Option 2', value: new Date() }]
                                })}
                              />
                            )}

                            {/* Rating Scale Configuration */}
                            {question.type === 'rating' && (
                              <div className="space-y-3">
                                <Label className="text-sm">Rating Scale Configuration</Label>
                                <div className="flex gap-4 items-center">
                                  <div className="flex items-center gap-2">
                                    <Label className="text-xs">Min:</Label>
                                    <Select 
                                      value={question.ratingScale?.min.toString()} 
                                      onValueChange={(value) => updateRatingScale(question.id, 'min', parseInt(value))}
                                    >
                                      <SelectTrigger className="w-16">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="0">0</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Label className="text-xs">Max:</Label>
                                    <Select 
                                      value={question.ratingScale?.max.toString()} 
                                      onValueChange={(value) => updateRatingScale(question.id, 'max', parseInt(value))}
                                    >
                                      <SelectTrigger className="w-16">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="p-3 border rounded bg-muted/50">
                                  <Label className="text-xs text-muted-foreground mb-2 block">Preview:</Label>
                                  <RatingInput
                                    min={question.ratingScale?.min || 1}
                                    max={question.ratingScale?.max || 5}
                                    labels={question.ratingScale?.labels}
                                    disabled={true}
                                    value={3}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Date Question Preview */}
                            {question.type === 'date' && (
                              <div className="space-y-2">
                                <Label className="text-sm">Date Input Preview</Label>
                                <div className="p-3 border rounded bg-muted/50">
                                  <DateInput disabled={true} placeholder="Date will appear here" />
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Switch
                                checked={question.isRequired}
                                onCheckedChange={(checked) => updateQuestion(question.id, { isRequired: checked })}
                              />
                              <Label className="text-sm">Required</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={saveSurvey}>
              <Save className="w-4 h-4 mr-2" />
              Create Survey
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyCreatorDialog;