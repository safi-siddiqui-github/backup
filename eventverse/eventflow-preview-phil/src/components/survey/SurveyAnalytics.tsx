import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { Survey } from "./types";

interface SurveyAnalyticsProps {
  survey: Survey;
}

const SurveyAnalytics = ({ survey }: SurveyAnalyticsProps) => {
  const totalResponses = survey.responses.length;
  const completedResponses = survey.responses.filter(r => r.completed).length;
  const completionRate = totalResponses > 0 ? Math.round((completedResponses / totalResponses) * 100) : 0;
  
  // Mock analytics data
  const averageTime = "3.2 minutes";
  const responseRate = "68%";

  const getQuestionAnalytics = (questionId: string) => {
    const question = survey.questions.find(q => q.id === questionId);
    const responses = survey.responses
      .filter(r => r.completed)
      .map(r => r.responses.find(resp => resp.questionId === questionId))
      .filter(Boolean);

    if (question?.type === 'multiple-choice') {
      const answerCounts: { [key: string]: number } = {};
      responses.forEach(resp => {
        if (resp && typeof resp.answer === 'string') {
          answerCounts[resp.answer] = (answerCounts[resp.answer] || 0) + 1;
        }
      });
      return answerCounts;
    }

    if (question?.type === 'rating') {
      const ratings = responses
        .map(resp => resp && typeof resp.answer === 'number' ? resp.answer : null)
        .filter(Boolean) as number[];
      
      const average = ratings.length > 0 
        ? Math.round((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 10) / 10
        : 0;
      
      return { average, count: ratings.length };
    }

    return { responseCount: responses.length };
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{totalResponses}</div>
            <div className="text-sm text-muted-foreground">Total Responses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{averageTime}</div>
            <div className="text-sm text-muted-foreground">Avg. Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{responseRate}</div>
            <div className="text-sm text-muted-foreground">Response Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Question Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Question Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {survey.questions.map((question, index) => {
              const analytics = getQuestionAnalytics(question.id);
              
              return (
                <div key={question.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">Q{index + 1}: {question.question}</h4>
                      <Badge variant="outline" className="mt-1">
                        {question.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>
                  </div>

                  {question.type === 'multiple-choice' && typeof analytics === 'object' && !('average' in analytics) && !('responseCount' in analytics) && (
                    <div className="space-y-2">
                      {Object.entries(analytics).map(([answer, count]) => (
                        <div key={answer} className="flex justify-between items-center">
                          <span className="text-sm">{answer}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ 
                                  width: `${completedResponses > 0 ? (count / completedResponses) * 100 : 0}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'rating' && typeof analytics === 'object' && 'average' in analytics && (
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-primary">{analytics.average}</div>
                      <div className="text-sm text-muted-foreground">
                        Average rating from {analytics.count} response{analytics.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )}

                  {(question.type === 'text' || question.type === 'date') && typeof analytics === 'object' && 'responseCount' in analytics && (
                    <div className="text-sm text-muted-foreground">
                      {analytics.responseCount} response{analytics.responseCount !== 1 ? 's' : ''} received
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyAnalytics;