"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  FileText,
  Hash,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { Survey, SurveyQuestion } from "./types";

interface QuestionResponseViewProps {
  survey: Survey;
}

const QuestionResponseView = ({ survey }: QuestionResponseViewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const responsesPerPage = 10;

  const currentQuestion = survey.questions[currentQuestionIndex];

  // Get responses for current question
  const questionResponses = survey.responses
    .filter((response) => response.completed)
    .map((response) => {
      const questionResponse = response.responses.find(
        (r) => r.questionId === currentQuestion?.id,
      );
      return {
        ...response,
        answer: questionResponse?.answer || "No response",
      };
    });

  // Pagination
  const totalPages = Math.ceil(questionResponses.length / responsesPerPage);
  const startIndex = (currentPage - 1) * responsesPerPage;
  const paginatedResponses = questionResponses.slice(
    startIndex,
    startIndex + responsesPerPage,
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getQuestionIcon = (type: SurveyQuestion["type"]) => {
    switch (type) {
      case "multiple-choice":
        return BarChart3;
      case "text":
        return FileText;
      case "rating":
        return Star;
      case "date":
        return Calendar;
      case "checkbox":
        return CheckSquare;
      case "number":
        return Hash;
      default:
        return FileText;
    }
  };

  const getQuestionAnalytics = (question: SurveyQuestion) => {
    const responses = survey.responses
      .filter((r) => r.completed)
      .map((r) => r.responses.find((resp) => resp.questionId === question.id))
      .filter(Boolean);

    if (question.type === "multiple-choice" && question.options) {
      const counts = question.options.reduce(
        (acc, option) => {
          acc[option] = responses.filter((r) => r?.answer === option).length;
          return acc;
        },
        {} as Record<string, number>,
      );

      return question.options.map((option) => ({
        option,
        count: counts[option],
        percentage:
          responses.length > 0
            ? Math.round((counts[option] / responses.length) * 100)
            : 0,
      }));
    }

    if (question.type === "rating" && question.ratingScale) {
      const ratings = responses
        .map((r) => Number(r?.answer))
        .filter((rating) => !isNaN(rating));

      const average =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

      return { average: Math.round(average * 10) / 10, total: ratings.length };
    }

    return { total: responses.length };
  };

  const analytics = currentQuestion
    ? getQuestionAnalytics(currentQuestion)
    : null;

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentPage(1); // Reset to first page when switching questions
  };

  return (
    <div className="space-y-6">
      {/* Question Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Survey Questions ({survey.questions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {survey.questions.map((question, index) => {
              const Icon = getQuestionIcon(question.type);
              const questionResponses = survey.responses
                .filter((r) => r.completed)
                .filter((r) =>
                  r.responses.some((resp) => resp.questionId === question.id),
                );

              return (
                <Button
                  key={question.id}
                  variant={
                    index === currentQuestionIndex ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => goToQuestion(index)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-3 w-3" />Q{index + 1}
                  <Badge
                    variant="secondary"
                    className="ml-1"
                  >
                    {questionResponses.length}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {currentQuestion && (
        <>
          {/* Current Question Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {(() => {
                      const Icon = getQuestionIcon(currentQuestion.type);
                      return <Icon className="text-primary h-4 w-4" />;
                    })()}
                    <Badge variant="outline">
                      {currentQuestion.type.charAt(0).toUpperCase() +
                        currentQuestion.type.slice(1).replace("-", " ")}
                    </Badge>
                    {currentQuestion.isRequired && (
                      <Badge
                        variant="destructive"
                        className="text-xs"
                      >
                        Required
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">
                    {currentQuestion.question}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-primary text-2xl font-bold">
                    {questionResponses.length}
                  </div>
                  <div className="text-muted-foreground text-sm">Responses</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Question Analytics */}
              {currentQuestion.type === "multiple-choice" &&
                Array.isArray(analytics) && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Response Distribution</h4>
                    {analytics.map((item, index) => (
                      <div
                        key={index}
                        className="space-y-1"
                      >
                        <div className="flex justify-between text-sm">
                          <span>{item.option}</span>
                          <span>
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                        <Progress
                          value={item.percentage}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                )}

              {currentQuestion.type === "rating" &&
                analytics &&
                "average" in analytics && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded border p-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-600">
                        {analytics.average}
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Average Rating
                      </div>
                    </div>
                    <div className="rounded border p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics.total}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Total Ratings
                      </div>
                    </div>
                  </div>
                )}

              {(currentQuestion.type === "text" ||
                currentQuestion.type === "date") &&
                analytics &&
                "total" in analytics && (
                  <div className="rounded border p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {analytics.total}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Total Responses
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Individual Responses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Individual Responses</CardTitle>
                <div className="text-muted-foreground text-sm">
                  Showing {startIndex + 1}-
                  {Math.min(
                    startIndex + responsesPerPage,
                    questionResponses.length,
                  )}{" "}
                  of {questionResponses.length}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {paginatedResponses.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  <p>No responses for this question yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedResponses.map((response, index) => (
                    <div
                      key={response.id}
                      className="hover:bg-muted/50 flex items-center justify-between rounded border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                          {startIndex + index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="text-muted-foreground h-3 w-3" />
                            <span className="text-sm font-medium">
                              {response.respondentId}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <Calendar className="text-muted-foreground h-3 w-3" />
                            <span className="text-muted-foreground text-xs">
                              {formatDate(response.submittedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-xs text-right">
                        {currentQuestion.type === "rating" ? (
                          <div className="flex items-center gap-1">
                            {Array.from({
                              length: Number(response.answer) || 0,
                            }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="ml-1 text-sm">
                              ({response.answer})
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm">{response.answer}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            currentPage > 1 && goToPage(currentPage - 1)
                          }
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from(
                        { length: Math.min(totalPages, 5) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                onClick={() => goToPage(pageNum)}
                                isActive={currentPage === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        },
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            currentPage < totalPages &&
                            goToPage(currentPage + 1)
                          }
                          className={
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default QuestionResponseView;
