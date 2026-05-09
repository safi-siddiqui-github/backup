import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Building, Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";
import { SurveyResponse } from "./types";
import { cn } from "@/lib/utils";

interface RespondentProfileDialogProps {
  response: SurveyResponse | null;
  surveyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const RespondentProfileDialog = ({ response, surveyTitle, isOpen, onClose }: RespondentProfileDialogProps) => {
  if (!response) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = () => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
    ];
    const index = response.respondentId.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleEmailClick = () => {
    if (response.respondent?.email) {
      window.location.href = `mailto:${response.respondent.email}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Respondent Profile</DialogTitle>
        </DialogHeader>

        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg bg-gradient-to-br",
                getAvatarColor()
              )}
            >
              {response.respondent ? getInitials(response.respondent.name) : "?"}
            </div>
            <div
              className={cn(
                "absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                response.completed
                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                  : "bg-gradient-to-br from-gray-400 to-slate-500"
              )}
            >
              {response.completed ? <CheckCircle className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-white" />}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold">{response.respondent?.name || "Anonymous Respondent"}</h3>
            {response.respondent?.email && (
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" />
                {response.respondent.email}
              </p>
            )}
            {response.respondent?.company && (
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Building className="w-4 h-4" />
                {response.respondent.company}
              </p>
            )}
            {response.respondent?.title && (
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Briefcase className="w-4 h-4" />
                {response.respondent.title}
              </p>
            )}
          </div>

          <Badge variant={response.completed ? "default" : "secondary"} className="mt-1">
            {response.completed ? "Completed" : "Incomplete"}
          </Badge>
        </div>

        <Separator />

        {/* Response Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Survey</div>
                <div className="font-semibold">{surveyTitle}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Submitted
                </div>
                <div className="font-semibold">
                  {response.submittedAt.toLocaleDateString()} at {response.submittedAt.toLocaleTimeString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Response ID</div>
                <div className="font-mono text-xs bg-muted px-2 py-1 rounded">{response.id}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Questions Answered</div>
                <div className="font-semibold">{response.responses.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Summary */}
        <div>
          <h4 className="font-semibold mb-3">Response Summary</h4>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {response.responses.map((resp, index) => (
                  <div key={resp.questionId}>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Question {index + 1}
                    </div>
                    <div className="text-base">
                      {Array.isArray(resp.answer) ? (
                        <div className="flex flex-wrap gap-2">
                          {resp.answer.map((ans, i) => (
                            <Badge key={i} variant="secondary">
                              {ans}
                            </Badge>
                          ))}
                        </div>
                      ) : typeof resp.answer === "number" ? (
                        <Badge variant="secondary">Rating: {resp.answer}</Badge>
                      ) : (
                        <p className="text-foreground">{resp.answer}</p>
                      )}
                    </div>
                    {index < response.responses.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {response.respondent?.email && (
          <div className="flex gap-2">
            <Button onClick={handleEmailClick} className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Email Respondent
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RespondentProfileDialog;
