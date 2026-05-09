import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SurveyResponse } from "./types";
import RespondentProfileDialog from "./RespondentProfileDialog";

interface RespondentListProps {
  responses: SurveyResponse[];
  surveyTitle: string;
}

const RespondentList = ({ responses, surveyTitle }: RespondentListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);

  const filteredResponses = responses.filter((response) => {
    const matchesSearch =
      response.respondent?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.respondent?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && response.completed) ||
      (statusFilter === "incomplete" && !response.completed);
    return matchesSearch && matchesStatus;
  });

  const completedCount = responses.filter((r) => r.completed).length;
  const visibleAvatars = responses.slice(0, 5);
  const remainingCount = responses.length - 5;

  const getAvatarColor = (index: number) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
    ];
    return colors[index % colors.length];
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (responses.length === 0) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Badge variant="outline">0 responses</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Avatar Stack */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {visibleAvatars.map((response, index) => (
            <button
              key={response.id}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-md transition-transform hover:scale-110 hover:z-10 bg-gradient-to-br",
                getAvatarColor(index)
              )}
              title={response.respondent?.name}
            >
              {response.respondent ? getInitials(response.respondent.name) : "?"}
            </button>
          ))}
          {remainingCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-gradient-to-br from-gray-400 to-slate-500 text-white shadow-md transition-transform hover:scale-110 hover:z-10"
            >
              +{remainingCount}
            </button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {responses.length} response{responses.length !== 1 ? 's' : ''} • {completedCount} completed
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="ml-auto"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              View All
            </>
          )}
        </Button>
      </div>

      {/* Expanded List */}
      {isExpanded && (
        <div className="border rounded-lg p-4 space-y-3 bg-muted/30 animate-fade-in" onClick={(e) => e.stopPropagation()}>
          {/* Search and Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search respondents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border rounded-md px-3 py-1 text-sm bg-background"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          {/* Respondent List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredResponses.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground text-sm">
                No respondents found
              </div>
            ) : (
              filteredResponses.map((response, index) => (
                <button
                  key={response.id}
                  onClick={() => setSelectedResponse(response)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors group"
                >
                  <div className="relative">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-md bg-gradient-to-br transition-transform group-hover:scale-110",
                        getAvatarColor(index)
                      )}
                    >
                      {response.respondent ? getInitials(response.respondent.name) : "?"}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md",
                      response.completed 
                        ? "bg-gradient-to-br from-green-500 to-emerald-600" 
                        : "bg-gradient-to-br from-gray-400 to-slate-500"
                    )}>
                      {response.completed ? "✓" : "⏱"}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {response.respondent?.name || "Anonymous"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {response.submittedAt.toLocaleDateString()} • {response.submittedAt.toLocaleTimeString()}
                    </div>
                  </div>
                  <Badge variant={response.completed ? "default" : "secondary"} className="text-xs">
                    {response.completed ? "Completed" : "Incomplete"}
                  </Badge>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Profile Dialog */}
      <RespondentProfileDialog
        response={selectedResponse}
        surveyTitle={surveyTitle}
        isOpen={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
      />
    </div>
  );
};

export default RespondentList;
