
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, Edit, Trash, BarChart3, Calendar, Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Survey } from "./types";
import SurveyCreatorDialog from "./SurveyCreatorDialog";
import SurveyDetailView from "./SurveyDetailView";
import SurveyPreviewDialog from "./SurveyPreviewDialog";
import RespondentList from "./RespondentList";
import { mockSurveys } from "./mockSurveyData";

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
    setSurveys(surveys.map(survey => 
      survey.id === surveyId 
        ? { ...survey, isActive: !survey.isActive }
        : survey
    ));
    
    const survey = surveys.find(s => s.id === surveyId);
    toast({
      title: `Survey ${survey?.isActive ? 'deactivated' : 'activated'}`,
      description: `${survey?.title} is now ${survey?.isActive ? 'inactive' : 'active'}.`
    });
  };

  const copySurveyLink = (surveyId: string) => {
    const survey = surveys.find(s => s.id === surveyId);
    const link = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Link copied",
      description: `Survey link for "${survey?.title}" has been copied to clipboard.`
    });
  };

  const deleteSurvey = (surveyId: string) => {
    const survey = surveys.find(s => s.id === surveyId);
    setSurveys(surveys.filter(s => s.id !== surveyId));
    
    toast({
      title: "Survey deleted",
      description: `"${survey?.title}" has been deleted successfully.`
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
      description: "The survey list has been refreshed."
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">My Surveys</h2>
          <p className="text-muted-foreground">Create and manage your event surveys</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Survey
        </Button>
      </div>

      {surveys.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="max-w-md mx-auto">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No surveys yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first survey to start collecting feedback from your guests.
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
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
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSurveyClick(survey)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                        {survey.title}
                      </h3>
                      <Badge variant={survey.isActive ? "default" : "secondary"}>
                        {survey.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{survey.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Created {formatDate(survey.created)}
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          {survey.questions.length} question{survey.questions.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <RespondentList responses={survey.responses} surveyTitle={survey.title} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Switch
                      checked={survey.isActive}
                      onCheckedChange={() => toggleSurveyStatus(survey.id)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="sm" onClick={() => handleEditSurvey(survey)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPreviewSurvey(survey)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copySurveyLink(survey.id)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Survey</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{survey.title}"? This action cannot be undone and all responses will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteSurvey(survey.id)} className="bg-destructive hover:bg-destructive/90">
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
