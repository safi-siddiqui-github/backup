import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, BarChart3, Users, Share2 } from "lucide-react";
import { Survey } from "./types";
import QuestionResponseView from "./QuestionResponseView";
import SurveyAnalytics from "./SurveyAnalytics";
import SurveyEditDialog from "./SurveyEditDialog";

interface SurveyDetailViewProps {
  survey: Survey;
  onBack: () => void;
  onSurveyUpdated: () => void;
}

const SurveyDetailView = ({ survey, onBack, onSurveyUpdated }: SurveyDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("responses");
  const [showEditDialog, setShowEditDialog] = useState(false);

  const completionRate = survey.responses.length > 0 
    ? Math.round((survey.responses.filter(r => r.completed).length / survey.responses.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Surveys
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={survey.isActive ? "default" : "secondary"}>
            {survey.isActive ? "Active" : "Inactive"}
          </Badge>
          <Button variant="outline" onClick={() => setShowEditDialog(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Edit Survey
          </Button>
        </div>
      </div>

      {/* Survey Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{survey.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{survey.description}</p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{survey.responses.length}</div>
              <div className="text-sm text-muted-foreground">Total Responses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{survey.questions.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {survey.responses.filter(r => r.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="responses" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Question Responses
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="responses" className="mt-0">
                <QuestionResponseView survey={survey} />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <SurveyAnalytics survey={survey} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Survey Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        {survey.settings.allowAnonymous ? "Anonymous responses allowed" : "Login required"}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Results Visibility</h4>
                      <p className="text-sm text-muted-foreground">
                        {survey.settings.showResults ? "Results visible to guests" : "Results private"}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Submissions</h4>
                      <p className="text-sm text-muted-foreground">
                        {survey.settings.multipleSubmissions ? "Multiple submissions allowed" : "One submission per user"}
                      </p>
                    </div>
                    {survey.settings.endDate && (
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium">End Date</h4>
                        <p className="text-sm text-muted-foreground">
                          {survey.settings.endDate.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDetailView;