"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Download, Eye, Search } from "lucide-react";
import { useState } from "react";

interface SurveyResponsesProps {
  eventId: string;
}

const SurveyResponses = ({ eventId }: SurveyResponsesProps) => {
  const [selectedSurvey, setSelectedSurvey] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Mock data
  const surveys = [
    { id: "1", title: "Event Feedback Survey" },
    { id: "2", title: "Food & Catering Feedback" },
    { id: "3", title: "Venue Experience Survey" },
  ];

  const responses = [
    {
      id: "1",
      surveyId: "1",
      respondentId: "user1",
      submittedAt: new Date("2024-01-15T10:30:00"),
      completed: true,
      responses: [
        { questionId: "q1", answer: "Excellent" },
        {
          questionId: "q2",
          answer: "The venue was amazing and the staff was very helpful.",
        },
      ],
    },
    {
      id: "2",
      surveyId: "1",
      respondentId: "user2",
      submittedAt: new Date("2024-01-15T11:45:00"),
      completed: true,
      responses: [
        { questionId: "q1", answer: "Good" },
        {
          questionId: "q2",
          answer: "Great event overall, would attend again.",
        },
      ],
    },
    {
      id: "3",
      surveyId: "2",
      respondentId: "user3",
      submittedAt: new Date("2024-01-14T14:20:00"),
      completed: false,
      responses: [{ questionId: "q1", answer: "Very Good" }],
    },
  ];

  const exportResponses = () => {
    toast({
      title: "Export started",
      description: "Survey responses are being exported to CSV...",
    });
  };

  const viewResponse = (responseId: string) => {
    toast({
      title: "View Response",
      description: `Opening detailed view for response ${responseId}`,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredResponses = responses.filter((response) => {
    if (selectedSurvey !== "all" && response.surveyId !== selectedSurvey)
      return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        response.respondentId.toLowerCase().includes(searchLower) ||
        response.responses.some(
          (r) =>
            typeof r.answer === "string" &&
            r.answer.toLowerCase().includes(searchLower),
        )
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Response Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select
                value={selectedSurvey}
                onValueChange={setSelectedSurvey}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Surveys" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Surveys</SelectItem>
                  {surveys.map((survey) => (
                    <SelectItem
                      key={survey.id}
                      value={survey.id}
                    >
                      {survey.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search responses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={exportResponses}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Response List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Survey Responses</CardTitle>
            <Badge variant="outline">
              {filteredResponses.length} responses
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {filteredResponses.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>No responses found.</p>
              {selectedSurvey || searchTerm ? (
                <p className="mt-2 text-sm">Try adjusting your filters.</p>
              ) : (
                <p className="mt-2 text-sm">
                  Responses will appear here once guests start submitting
                  surveys.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResponses.map((response) => {
                const survey = surveys.find((s) => s.id === response.surveyId);
                return (
                  <Card
                    key={response.id}
                    className="border-l-4 border-l-blue-500"
                  >
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{survey?.title}</h4>
                          <p className="text-sm text-gray-600">
                            Response from {response.respondentId}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {formatDate(response.submittedAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              response.completed ? "default" : "secondary"
                            }
                          >
                            {response.completed ? "Complete" : "Incomplete"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewResponse(response.id)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {response.responses.slice(0, 2).map((resp, index) => (
                          <div
                            key={index}
                            className="rounded bg-gray-50 p-2 text-sm"
                          >
                            <strong>Q{index + 1}:</strong> {resp.answer}
                          </div>
                        ))}
                        {response.responses.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{response.responses.length - 2} more responses
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyResponses;
