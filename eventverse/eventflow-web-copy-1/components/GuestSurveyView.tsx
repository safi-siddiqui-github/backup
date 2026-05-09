"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Guest } from "@/types/rsvp";
import { CheckCircle, Heart, MessageSquare } from "lucide-react";
import { useState } from "react";
import { EventFormData } from "./EnhancedEventCreationDialog";

interface GuestSurveyViewProps {
  // event: { couple: string };
  // guest: { name: string };
  event: Partial<EventFormData>;
  guest: Partial<Guest>;
}

const GuestSurveyView = ({ event, guest }: GuestSurveyViewProps) => {
  const [completedSurveys, setCompletedSurveys] = useState<string[]>([]);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const surveys = [
    {
      id: "wishes",
      title: "Wedding Wishes",
      description: "Share your heartfelt wishes for the happy couple",
      prompt: "What are your wishes for Sarah & Michael's future together?",
      type: "open",
    },
    {
      id: "memories",
      title: "Favorite Memory",
      description: "Tell us about your favorite memory with the couple",
      prompt: "Share a special memory you have with Sarah and/or Michael:",
      type: "open",
    },
    {
      id: "advice",
      title: "Marriage Advice",
      description: "Share your wisdom for a happy marriage",
      prompt: "What advice would you give to the newlyweds?",
      type: "open",
    },
  ];

  const submitSurvey = (surveyId: string) => {
    const response = responses[surveyId];
    if (!response || response.trim().length < 10) {
      toast({
        title: "Please write a longer response",
        description: "Your message should be at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }

    setCompletedSurveys((prev) => [...prev, surveyId]);
    toast({
      title: "Thank you for sharing!",
      description: "Your response has been saved for the couple.",
    });
  };

  const handleResponseChange = (surveyId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [surveyId]: value }));
  };

  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-rose-500" />
          Share Your Thoughts
        </CardTitle>
        <CardDescription>
          Leave special messages for the happy couple
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {surveys.map((survey) => {
          const isCompleted = completedSurveys.includes(survey.id);

          return (
            <div
              key={survey.id}
              className={`rounded-lg border-2 p-4 ${
                isCompleted
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    <Heart className="h-4 w-4 text-rose-500" />
                    {survey.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {survey.description}
                  </p>
                </div>
                {isCompleted && (
                  <Badge className="bg-green-100 text-green-800">
                    Completed ✓
                  </Badge>
                )}
              </div>

              {!isCompleted ? (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    {survey.prompt}
                  </label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={responses[survey.id] || ""}
                    onChange={(e) =>
                      handleResponseChange(survey.id, e.target.value)
                    }
                    rows={4}
                    className="resize-none"
                  />
                  <Button
                    onClick={() => submitSurvey(survey.id)}
                    className="bg-rose-500 hover:bg-rose-600"
                    disabled={
                      !responses[survey.id] ||
                      responses[survey.id].trim().length < 10
                    }
                  >
                    Submit Response
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Response Submitted
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Thank you for sharing your {survey.title.toLowerCase()} with{" "}
                    {event.couple}!
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Completion Status */}
        <div className="rounded-lg bg-gradient-to-r from-rose-100 to-purple-100 p-4 text-center">
          <div className="mb-1 text-2xl font-bold text-rose-600">
            {completedSurveys.length} / {surveys.length}
          </div>
          <div className="mb-3 text-sm text-gray-600">Surveys Completed</div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-rose-500 transition-all"
              style={{
                width: `${(completedSurveys.length / surveys.length) * 100}%`,
              }}
            />
          </div>
          {completedSurveys.length === surveys.length && (
            <div className="mt-3 text-sm text-rose-700">
              🎉 Thank you for completing all surveys! Your messages mean the
              world to {event.couple}.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestSurveyView;
