
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Heart, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Survey {
  id: string;
  title: string;
  description: string;
  prompt: string;
  type: string;
  required?: boolean;
  deadline?: Date;
}

interface GuestSurveyViewProps {
  event: { 
    couple?: string;
    eventName?: string;
    moduleUsage?: {
      surveys?: {
        completed: string[];
        pending: string[];
      };
    };
  };
  guest: { name: string };
}

const GuestSurveyView = ({ event, guest }: GuestSurveyViewProps) => {
  const [completedSurveys, setCompletedSurveys] = useState<string[]>(
    event.moduleUsage?.surveys?.completed || []
  );
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  // Dynamic surveys based on event type
  const surveys: Survey[] = [
    {
      id: "pre-event-survey",
      title: "Pre-Event Experience Survey",
      description: "Help us understand your expectations and needs",
      prompt: "What are you most looking forward to at this event?",
      type: "open",
      required: true
    },
    {
      id: "session-feedback-day1",
      title: "Day 1 Session Feedback",
      description: "Rate and review the sessions you attended",
      prompt: "Which sessions did you attend and what did you think of them?",
      type: "open",
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "networking-experience",
      title: "Networking Experience",
      description: "Tell us about your networking interactions",
      prompt: "How was your networking experience? Did you make valuable connections?",
      type: "open"
    },
    {
      id: "speaker-evaluation",
      title: "Speaker Evaluation",
      description: "Evaluate the keynote speakers and presenters",
      prompt: "Which speakers stood out to you and why?",
      type: "open",
      required: true,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "test-feedback",
      title: "Overall Event Feedback",
      description: "Share your overall thoughts about the event",
      prompt: "What would you improve about this event?",
      type: "open"
    },
    {
      id: "test-experience",
      title: "Technology Experience",
      description: "Help us improve our event technology platform",
      prompt: "How was your experience using this event platform?",
      type: "open"
    }
  ];

  const submitSurvey = (surveyId: string) => {
    const response = responses[surveyId];
    if (!response || response.trim().length < 10) {
      toast({
        title: "Please write a longer response",
        description: "Your message should be at least 10 characters long.",
        variant: "destructive"
      });
      return;
    }

    setCompletedSurveys(prev => [...prev, surveyId]);
    toast({
      title: "Thank you for sharing!",
      description: "Your response has been saved for the couple."
    });
  };

  const handleResponseChange = (surveyId: string, value: string) => {
    setResponses(prev => ({ ...prev, [surveyId]: value }));
  };

  const pendingSurveys = surveys.filter(s => !completedSurveys.includes(s.id));
  const requiredPending = pendingSurveys.filter(s => s.required).length;
  const progressPercentage = (completedSurveys.length / surveys.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview Card */}
      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Progress</span>
              </div>
              <div className="text-3xl font-bold mb-2">
                {completedSurveys.length}/{surveys.length}
              </div>
              <Progress value={progressPercentage} className="h-2 bg-white/20" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Pending</span>
              </div>
              <div className="text-3xl font-bold">
                {pendingSurveys.length}
              </div>
              <p className="text-sm opacity-80 mt-1">
                {requiredPending > 0 ? `${requiredPending} required` : 'All optional'}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Completed</span>
              </div>
              <div className="text-3xl font-bold">
                {completedSurveys.length}
              </div>
              <p className="text-sm opacity-80 mt-1">
                {progressPercentage === 100 ? 'All done! 🎉' : 'Keep going!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surveys List */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            Event Surveys
          </CardTitle>
          <CardDescription>
            Help us improve by sharing your feedback and experiences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
        {surveys.map((survey) => {
          const isCompleted = completedSurveys.includes(survey.id);
          const hasDeadline = survey.deadline;
          const isOverdue = hasDeadline && survey.deadline! < new Date();
          
          return (
            <div key={survey.id} className={`p-5 rounded-lg border-2 transition-all ${
              isCompleted 
                ? 'bg-green-50 border-green-300' 
                : survey.required 
                  ? 'bg-purple-50 border-purple-300'
                  : 'bg-white border-gray-200 hover:border-purple-200'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      {survey.required ? (
                        <AlertCircle className="w-4 h-4 text-purple-600" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      )}
                      {survey.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{survey.description}</p>
                  {hasDeadline && !isCompleted && (
                    <div className={`flex items-center gap-1 text-xs ${
                      isOverdue ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {isOverdue ? 'Overdue' : `Due ${survey.deadline!.toLocaleDateString()}`}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-end">
                  {isCompleted && (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                  {survey.required && !isCompleted && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                      Required
                    </Badge>
                  )}
                </div>
              </div>

              {!isCompleted ? (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    {survey.prompt}
                  </label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={responses[survey.id] || ""}
                    onChange={(e) => handleResponseChange(survey.id, e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <Button
                    onClick={() => submitSurvey(survey.id)}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={!responses[survey.id] || responses[survey.id].trim().length < 10}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Response
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Response Submitted Successfully</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Thank you for completing this survey! Your feedback is valuable.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
    </div>
  );
};

export default GuestSurveyView;
