import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Eye, Calendar, Filter } from "lucide-react";
import { Survey } from "./types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import RespondentProfileDialog from "./RespondentProfileDialog";

interface SurveyResponseDetailProps {
  survey: Survey;
}

const SurveyResponseDetail = ({ survey }: SurveyResponseDetailProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  const { toast } = useToast();

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

  const exportResponses = () => {
    toast({
      title: "Export started",
      description: "Survey responses are being exported to CSV..."
    });
  };

  const viewResponse = (responseId: string) => {
    toast({
      title: "View Response",
      description: `Opening detailed view for response ${responseId}`
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredResponses = survey.responses.filter(response => {
    if (statusFilter === "completed" && !response.completed) return false;
    if (statusFilter === "incomplete" && response.completed) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        response.respondent?.name.toLowerCase().includes(searchLower) ||
        response.respondent?.email.toLowerCase().includes(searchLower) ||
        response.respondentId.toLowerCase().includes(searchLower) ||
        response.responses.some(r => 
          typeof r.answer === 'string' && r.answer.toLowerCase().includes(searchLower)
        )
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search responses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={exportResponses} variant="outline">
          <Download className="w-4 h-4 mr-2" />
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
                <p className="text-sm mt-2 text-muted-foreground">Try adjusting your filters.</p>
              ) : (
                <p className="text-sm mt-2 text-muted-foreground">Responses will appear here once guests start submitting surveys.</p>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {filteredResponses.length} Response{filteredResponses.length !== 1 ? 's' : ''}
              </h3>
              <Badge variant="outline">
                {survey.responses.filter(r => r.completed).length} completed
              </Badge>
            </div>
            
            {filteredResponses.map((response) => (
              <Card 
                key={response.id} 
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedResponse(response)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar with Status Badge */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg bg-gradient-to-br transition-transform group-hover:scale-110",
                          getAvatarColor(response.respondentId)
                        )}
                      >
                        {response.respondent ? getInitials(response.respondent.name) : "?"}
                      </div>
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md",
                          response.completed
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : "bg-gradient-to-br from-gray-400 to-slate-500"
                        )}
                      >
                        {response.completed ? "✓" : "⏱"}
                      </div>
                    </div>

                    {/* Response Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                            {response.respondent?.name || "Anonymous Respondent"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {response.respondent?.email || response.respondentId}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              📅 {formatDate(response.submittedAt)}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          className={cn(
                            "text-white font-semibold px-3 py-1 shadow-md",
                            response.completed 
                              ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                              : "bg-gradient-to-r from-gray-500 to-slate-600"
                          )}
                        >
                          {response.completed ? "✓ Completed" : "⏱ Incomplete"}
                        </Badge>
                      </div>
                      
                      {/* Response Preview */}
                      <div className="space-y-2 mt-3">
                        {response.responses.slice(0, 2).map((resp, index) => {
                          const question = survey.questions.find(q => q.id === resp.questionId);
                          return (
                            <div key={index} className="bg-muted/50 p-3 rounded text-sm">
                              <div className="font-medium text-muted-foreground mb-1 text-xs">
                                {question?.question || `Question ${index + 1}`}
                              </div>
                              <div className="text-foreground">
                                {Array.isArray(resp.answer) 
                                  ? resp.answer.join(", ") 
                                  : resp.answer.toString()}
                              </div>
                            </div>
                          );
                        })}
                        {response.responses.length > 2 && (
                          <p className="text-xs text-muted-foreground pl-3">
                            +{response.responses.length - 2} more response{response.responses.length - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

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

export default SurveyResponseDetail;