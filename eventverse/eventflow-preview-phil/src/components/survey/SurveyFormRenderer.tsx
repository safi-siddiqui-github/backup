import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Survey, SurveyQuestion, QuestionResponse } from "./types";
import RatingInput from "./RatingInput";
import DateInput from "./DateInput";
import { format } from "date-fns";

interface SurveyFormRendererProps {
  survey: Survey;
  onSubmit?: (responses: QuestionResponse[]) => void;
  className?: string;
}

const SurveyFormRenderer = ({ survey, onSubmit, className }: SurveyFormRendererProps) => {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const updateResponse = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    const formattedResponses: QuestionResponse[] = Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      answer
    }));
    onSubmit?.(formattedResponses);
  };

  const renderQuestion = (question: SurveyQuestion) => {
    const value = responses[question.id];

    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup 
            value={value} 
            onValueChange={(val) => updateResponse(question.id, val)}
          >
            {question.optionValues ? 
              question.optionValues.map((option, index) => {
                const displayLabel = question.optionType === 'text' ? 
                  (option.label || option.value.toString()) :
                  question.optionType === 'date' && option.value instanceof Date ?
                    `${option.label} (${format(option.value, 'PPP')})` :
                  question.optionType === 'time' && option.value instanceof Date ?
                    `${option.label} (${format(option.value, 'p')})` :
                  question.optionType === 'datetime' && option.value instanceof Date ?
                    `${option.label} (${format(option.value, 'PPP')} at ${format(option.value, 'p')})` :
                    option.label;
                    
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value.toString()} id={`${question.id}-${index}`} />
                    <Label htmlFor={`${question.id}-${index}`}>{displayLabel}</Label>
                  </div>
                );
              }) :
              question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
              ))
            }
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.optionValues ? 
              question.optionValues.map((option, index) => {
                const displayLabel = question.optionType === 'text' ? 
                  (option.label || option.value.toString()) :
                  question.optionType === 'date' && option.value instanceof Date ?
                    `${option.label} (${format(option.value, 'PPP')})` :
                  question.optionType === 'time' && option.value instanceof Date ?
                    `${option.label} (${format(option.value, 'p')})` :
                  question.optionType === 'datetime' && option.value instanceof Date ?
                    `${option.label} (${format(option.value, 'PPP')} at ${format(option.value, 'p')})` :
                    option.label;
                    
                const optionValue = option.value.toString();
                
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${index}`}
                      checked={(value || []).includes(optionValue)}
                      onCheckedChange={(checked) => {
                        const currentValues = value || [];
                        if (checked) {
                          updateResponse(question.id, [...currentValues, optionValue]);
                        } else {
                          updateResponse(question.id, currentValues.filter((v: string) => v !== optionValue));
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${index}`}>{displayLabel}</Label>
                  </div>
                );
              }) :
              question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${question.id}-${index}`}
                    checked={(value || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = value || [];
                      if (checked) {
                        updateResponse(question.id, [...currentValues, option]);
                      } else {
                        updateResponse(question.id, currentValues.filter((v: string) => v !== option));
                      }
                    }}
                  />
                  <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
              ))
            }
          </div>
        );

      case 'text':
        return (
          <Textarea
            placeholder="Enter your response..."
            value={value || ''}
            onChange={(e) => updateResponse(question.id, e.target.value)}
            className="min-h-[100px]"
          />
        );

      case 'rating':
        return (
          <RatingInput
            min={question.ratingScale?.min || 1}
            max={question.ratingScale?.max || 5}
            labels={question.ratingScale?.labels}
            value={value}
            onChange={(rating) => updateResponse(question.id, rating)}
          />
        );

      case 'date':
        return (
          <DateInput
            value={value}
            onChange={(date) => updateResponse(question.id, date)}
            placeholder="Select a date"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder="Enter a number"
            value={value || ''}
            onChange={(e) => updateResponse(question.id, parseInt(e.target.value) || '')}
          />
        );

      default:
        return (
          <Input
            placeholder="Enter your response..."
            value={value || ''}
            onChange={(e) => updateResponse(question.id, e.target.value)}
          />
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
        {survey.description && (
          <p className="text-sm text-muted-foreground">{survey.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {survey.questions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-1">
                {index + 1}
              </Badge>
              <div className="flex-1">
                <Label className="text-base font-medium">
                  {question.question}
                  {question.isRequired && <span className="text-destructive ml-1">*</span>}
                </Label>
                <div className="mt-2">
                  {renderQuestion(question)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button onClick={handleSubmit} className="w-full">
            Submit Survey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyFormRenderer;