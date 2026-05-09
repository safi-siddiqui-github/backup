"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, Settings, Share2, Users } from "lucide-react";
import { useState } from "react";
import QuestionResponseView from "./QuestionResponseView";
import SurveyAnalytics from "./SurveyAnalytics";
import { Survey } from "./types";

interface SurveyDetailViewProps {
  survey: Survey;
  onBack: () => void;
  onSurveyUpdated: () => void;
}

const SurveyDetailView = ({
  survey,
  onBack,
  onSurveyUpdated,
}: SurveyDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("responses");
  const [showEditDialog, setShowEditDialog] = useState(false);

  const completionRate =
    survey.responses.length > 0
      ? Math.round(
          (survey.responses.filter((r) => r.completed).length /
            survey.responses.length) *
            100,
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Surveys
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={survey.isActive ? "default" : "secondary"}>
            {survey.isActive ? "Active" : "Inactive"}
          </Badge>
          <Button
            variant="outline"
            onClick={() => setShowEditDialog(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Edit Survey
          </Button>
        </div>
      </div>

      {/* Survey Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{survey.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{survey.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">
                {survey.responses.length}
              </div>
              <div className="text-muted-foreground text-sm">
                Total Responses
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {completionRate}%
              </div>
              <div className="text-muted-foreground text-sm">
                Completion Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {survey.questions.length}
              </div>
              <div className="text-muted-foreground text-sm">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {survey.responses.filter((r) => r.completed).length}
              </div>
              <div className="text-muted-foreground text-sm">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger
                value="responses"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Question Responses
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent
                value="responses"
                className="mt-0"
              >
                <QuestionResponseView survey={survey} />
              </TabsContent>

              <TabsContent
                value="analytics"
                className="mt-0"
              >
                <SurveyAnalytics survey={survey} />
              </TabsContent>

              <TabsContent
                value="settings"
                className="mt-0"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Survey Settings</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Privacy</h4>
                      <p className="text-muted-foreground text-sm">
                        {survey.settings.allowAnonymous
                          ? "Anonymous responses allowed"
                          : "Login required"}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Results Visibility</h4>
                      <p className="text-muted-foreground text-sm">
                        {survey.settings.showResults
                          ? "Results visible to guests"
                          : "Results private"}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Submissions</h4>
                      <p className="text-muted-foreground text-sm">
                        {survey.settings.multipleSubmissions
                          ? "Multiple submissions allowed"
                          : "One submission per user"}
                      </p>
                    </div>
                    {survey.settings.endDate && (
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">End Date</h4>
                        <p className="text-muted-foreground text-sm">
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
