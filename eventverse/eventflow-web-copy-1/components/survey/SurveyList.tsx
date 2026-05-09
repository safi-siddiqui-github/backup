"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  Calendar,
  Copy,
  Edit,
  Eye,
  Plus,
  Trash,
  Users,
} from "lucide-react";
import { useState } from "react";
import SurveyCreatorDialog from "./SurveyCreatorDialog";
import SurveyDetailView from "./SurveyDetailView";
import SurveyPreviewDialog from "./SurveyPreviewDialog";
import { mockSurveys } from "./mockSurveyData";
import { Survey } from "./types";

interface SurveyListProps {
  eventId: string;
}

const SurveyList = ({ eventId }: SurveyListProps) => {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [previewSurvey, setPreviewSurvey] = useState<Survey | null>(null);
  const { toast } = useToast();

  const toggleSurveyStatus = (surveyId: string) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === surveyId
          ? { ...survey, isActive: !survey.isActive }
          : survey,
      ),
    );

    const survey = surveys.find((s) => s.id === surveyId);
    toast({
      title: `Survey ${survey?.isActive ? "deactivated" : "activated"}`,
      description: `${survey?.title} is now ${survey?.isActive ? "inactive" : "active"}.`,
    });
  };

  const copySurveyLink = (surveyId: string) => {
    const survey = surveys.find((s) => s.id === surveyId);
    const link = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(link);

    toast({
      title: "Link copied",
      description: `Survey link for "${survey?.title}" has been copied to clipboard.`,
    });
  };

  const deleteSurvey = (surveyId: string) => {
    const survey = surveys.find((s) => s.id === surveyId);
    setSurveys(surveys.filter((s) => s.id !== surveyId));

    toast({
      title: "Survey deleted",
      description: `"${survey?.title}" has been deleted successfully.`,
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSurveyClick = (survey: Survey) => {
    setSelectedSurvey(survey);
  };

  const handleBackToList = () => {
    setSelectedSurvey(null);
    setEditingSurvey(null);
  };

  const handleEditSurvey = (survey: Survey) => {
    // Edit functionality now handled in SurveyDetailView
    setSelectedSurvey(survey);
  };

  const refreshSurveys = () => {
    // Refresh survey list after creation
    toast({
      title: "Survey list updated",
      description: "The survey list has been refreshed.",
    });
  };

  // Show survey detail view if a survey is selected
  if (selectedSurvey) {
    return (
      <SurveyDetailView
        survey={selectedSurvey}
        onBack={handleBackToList}
        onSurveyUpdated={refreshSurveys}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">My Surveys</h2>
          <p className="text-muted-foreground">
            Create and manage your event surveys
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Survey
        </Button>
      </div>

      {surveys.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto max-w-md">
              <BarChart3 className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">No surveys yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first survey to start collecting feedback from your
                guests.
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Survey
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {surveys.map((survey) => (
            <Card
              key={survey.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => handleSurveyClick(survey)}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="hover:text-primary text-lg font-semibold transition-colors">
                        {survey.title}
                      </h3>
                      <Badge
                        variant={survey.isActive ? "default" : "secondary"}
                      >
                        {survey.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {survey.description}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created {formatDate(survey.created)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {survey.responses.length} response
                        {survey.responses.length !== 1 ? "s" : ""}
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        {survey.questions.length} question
                        {survey.questions.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Switch
                      checked={survey.isActive}
                      onCheckedChange={() => toggleSurveyStatus(survey.id)}
                    />
                  </div>
                </div>

                <div
                  className="flex gap-2 border-t pt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditSurvey(survey)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewSurvey(survey)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copySurveyLink(survey.id)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Survey</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{survey.title}
                          &quot;? This action cannot be undone and all responses
                          will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteSurvey(survey.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete Survey
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Survey Creator Dialog */}
      <SurveyCreatorDialog
        eventId={eventId}
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSurveyCreated={refreshSurveys}
      />

      {/* Survey Preview Dialog */}
      <SurveyPreviewDialog
        survey={previewSurvey}
        open={!!previewSurvey}
        onOpenChange={(open) => !open && setPreviewSurvey(null)}
      />
    </div>
  );
};

export default SurveyList;
