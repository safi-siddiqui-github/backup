"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Download, Eye, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Survey } from "./types";

interface SurveyResponseDetailProps {
  survey: Survey;
}

const SurveyResponseDetail = ({ survey }: SurveyResponseDetailProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

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

  const filteredResponses = survey.responses.filter((response) => {
    if (statusFilter === "completed" && !response.completed) return false;
    if (statusFilter === "incomplete" && response.completed) return false;
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
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              placeholder="Search responses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={exportResponses}
          variant="outline"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Response List */}
      <div className="space-y-4">
        {filteredResponses.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No responses found.</p>
              {searchTerm || statusFilter ? (
                <p className="text-muted-foreground mt-2 text-sm">
                  Try adjusting your filters.
                </p>
              ) : (
                <p className="text-muted-foreground mt-2 text-sm">
                  Responses will appear here once guests start submitting
                  surveys.
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {filteredResponses.length} Response
                {filteredResponses.length !== 1 ? "s" : ""}
              </h3>
              <Badge variant="outline">
                {survey.responses.filter((r) => r.completed).length} completed
              </Badge>
            </div>

            {filteredResponses.map((response) => (
              <Card
                key={response.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Response #{response.id}</h4>
                      <p className="text-muted-foreground text-sm">
                        From: {response.respondentId}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Calendar className="text-muted-foreground h-3 w-3" />
                        <span className="text-muted-foreground text-xs">
                          {formatDate(response.submittedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={response.completed ? "default" : "secondary"}
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
                    {response.responses.slice(0, 2).map((resp, index) => {
                      const question = survey.questions.find(
                        (q) => q.id === resp.questionId,
                      );
                      return (
                        <div
                          key={index}
                          className="bg-muted/50 rounded p-3 text-sm"
                        >
                          <div className="text-muted-foreground mb-1 font-medium">
                            {question?.question || `Question ${index + 1}`}
                          </div>
                          <div>{resp.answer}</div>
                        </div>
                      );
                    })}
                    {response.responses.length > 2 && (
                      <p className="text-muted-foreground pl-3 text-xs">
                        +{response.responses.length - 2} more response
                        {response.responses.length - 2 !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyResponseDetail;
