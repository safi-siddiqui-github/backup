import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Star, Calendar, User, BarChart3, FileText, CheckSquare, Hash } from "lucide-react";
import { Survey, SurveyQuestion, SurveyResponse } from "./types";
import { cn } from "@/lib/utils";
import RespondentProfileDialog from "./RespondentProfileDialog";

interface QuestionResponseViewProps {
  survey: Survey;
}

const QuestionResponseView = ({ survey }: QuestionResponseViewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);
  const responsesPerPage = 10;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
    ];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const currentQuestion = survey.questions[currentQuestionIndex];
  
  // Get responses for current question
  const questionResponses = survey.responses
    .filter(response => response.completed)
    .map(response => {
      const questionResponse = response.responses.find(r => r.questionId === currentQuestion?.id);
      return {
        ...response,
        answer: questionResponse?.answer || 'No response'
      };
    });

  // Pagination
  const totalPages = Math.ceil(questionResponses.length / responsesPerPage);
  const startIndex = (currentPage - 1) * responsesPerPage;
  const paginatedResponses = questionResponses.slice(startIndex, startIndex + responsesPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getQuestionIcon = (type: SurveyQuestion['type']) => {
    switch (type) {
      case 'multiple-choice': return BarChart3;
      case 'text': return FileText;
      case 'rating': return Star;
      case 'date': return Calendar;
      case 'checkbox': return CheckSquare;
      case 'number': return Hash;
      default: return FileText;
    }
  };

  const getQuestionAnalytics = (question: SurveyQuestion) => {
    const responses = survey.responses
      .filter(r => r.completed)
      .map(r => r.responses.find(resp => resp.questionId === question.id))
      .filter(Boolean);

    if (question.type === 'multiple-choice' && question.options) {
      const counts = question.options.reduce((acc, option) => {
        acc[option] = responses.filter(r => r?.answer === option).length;
        return acc;
      }, {} as Record<string, number>);
      
      return question.options.map(option => ({
        option,
        count: counts[option],
        percentage: responses.length > 0 ? Math.round((counts[option] / responses.length) * 100) : 0
      }));
    }

    if (question.type === 'rating' && question.ratingScale) {
      const ratings = responses
        .map(r => Number(r?.answer))
        .filter(rating => !isNaN(rating));
      
      const average = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;
        
      return { average: Math.round(average * 10) / 10, total: ratings.length };
    }

    return { total: responses.length };
  };

  const analytics = currentQuestion ? getQuestionAnalytics(currentQuestion) : null;

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
            <BarChart3 className="w-5 h-5" />
            Survey Questions ({survey.questions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {survey.questions.map((question, index) => {
              const Icon = getQuestionIcon(question.type);
              const questionResponses = survey.responses
                .filter(r => r.completed)
                .filter(r => r.responses.some(resp => resp.questionId === question.id));
              
              return (
                <Button
                  key={question.id}
                  variant={index === currentQuestionIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToQuestion(index)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-3 h-3" />
                  Q{index + 1}
                  <Badge variant="secondary" className="ml-1">
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
                  <div className="flex items-center gap-2 mb-2">
                    {(() => {
                      const Icon = getQuestionIcon(currentQuestion.type);
                      return <Icon className="w-4 h-4 text-primary" />;
                    })()}
                    <Badge variant="outline">
                      {currentQuestion.type.charAt(0).toUpperCase() + currentQuestion.type.slice(1).replace('-', ' ')}
                    </Badge>
                    {currentQuestion.isRequired && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{questionResponses.length}</div>
                  <div className="text-sm text-muted-foreground">Responses</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Question Analytics */}
              {currentQuestion.type === 'multiple-choice' && Array.isArray(analytics) && (
                <div className="space-y-3">
                  <h4 className="font-medium">Response Distribution</h4>
                  {analytics.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.option}</span>
                        <span>{item.count} ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'rating' && analytics && 'average' in analytics && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                      {analytics.average}
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-blue-600">{analytics.total}</div>
                    <div className="text-sm text-muted-foreground">Total Ratings</div>
                  </div>
                </div>
              )}

              {(currentQuestion.type === 'text' || currentQuestion.type === 'date') && analytics && 'total' in analytics && (
                <div className="text-center p-4 border rounded">
                  <div className="text-2xl font-bold text-green-600">{analytics.total}</div>
                  <div className="text-sm text-muted-foreground">Total Responses</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Individual Responses */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Individual Responses</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + responsesPerPage, questionResponses.length)} of {questionResponses.length}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {paginatedResponses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No responses for this question yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedResponses.map((response, index) => (
                    <div 
                      key={response.id} 
                      className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 cursor-pointer group transition-all"
                      onClick={() => setSelectedResponse(response)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Profile Bubble */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md bg-gradient-to-br transition-transform group-hover:scale-110",
                              getAvatarColor(response.respondentId)
                            )}
                          >
                            {response.respondent ? getInitials(response.respondent.name) : "?"}
                          </div>
                          <div
                            className={cn(
                              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md",
                              response.completed
                                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                : "bg-gradient-to-br from-gray-400 to-slate-500"
                            )}
                          >
                            {response.completed ? "✓" : "⏱"}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {response.respondent?.name || "Anonymous"}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              📅 {formatDate(response.submittedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right max-w-xs">
                        {currentQuestion.type === 'rating' ? (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Number(response.answer) || 0 }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-1 text-sm">({response.answer})</span>
                          </div>
                        ) : Array.isArray(response.answer) ? (
                          <span className="text-sm">{response.answer.join(", ")}</span>
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
                          onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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

      {/* Profile Dialog */}
      <RespondentProfileDialog
        response={selectedResponse}
        surveyTitle={survey.title}
        isOpen={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
      />
    </div>
  );
};

export default QuestionResponseView;