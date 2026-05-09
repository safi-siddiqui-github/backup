import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/circular-progress";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  Rocket, 
  CheckCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Zap,
  X
} from "lucide-react";
import { calculateEventReadiness } from "@/lib/eventReadiness";
import { cn } from "@/lib/utils";
import { GoLiveDialog } from "./GoLiveDialog";

interface GoLiveTrackerProps {
  event: any;
  onGoLive?: () => void;
  className?: string;
}

export const GoLiveTracker = ({ event, onGoLive, className }: GoLiveTrackerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showGoLiveDialog, setShowGoLiveDialog] = useState(false);

  const readiness = calculateEventReadiness(event);

  const handleGoLive = () => {
    if (readiness.canGoLive) {
      setShowGoLiveDialog(true);
    }
  };

  if (isMinimized) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className={cn(
            "rounded-full w-16 h-16 shadow-2xl",
            readiness.canGoLive 
              ? "bg-success hover:bg-success/90 animate-pulse" 
              : "bg-primary hover:bg-primary/90"
          )}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{readiness.score}%</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <>
      <GlassCard className={cn("fixed bottom-6 right-6 z-50 w-80 shadow-2xl", className)}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Go Live Status</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="flex flex-col items-center mb-4">
            <CircularProgress value={readiness.score} size={100} />
            <Badge 
              className={cn(
                "mt-3",
                readiness.status === 'ready' && "bg-success text-success-foreground",
                readiness.status === 'almost-ready' && "bg-warning text-warning-foreground",
                readiness.status === 'not-ready' && "bg-destructive text-destructive-foreground"
              )}
            >
              {readiness.status === 'ready' && "Ready to Go Live!"}
              {readiness.status === 'almost-ready' && "Almost Ready"}
              {readiness.status === 'not-ready' && "Not Ready Yet"}
            </Badge>
          </div>

          {/* Go Live Button */}
          <Button
            onClick={handleGoLive}
            disabled={!readiness.canGoLive}
            className={cn(
              "w-full mb-3",
              readiness.canGoLive && "bg-success hover:bg-success/90 animate-pulse"
            )}
          >
            <Rocket className="w-4 h-4 mr-2" />
            {readiness.canGoLive ? "Publish Event" : `${readiness.score}% Complete`}
          </Button>

          {/* Critical Issues */}
          {readiness.criticalIssues.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  Critical Issues ({readiness.criticalIssues.length})
                </span>
              </div>
              <ul className="space-y-1">
                {readiness.criticalIssues.map(issue => (
                  <li key={issue.id} className="text-xs text-muted-foreground">
                    • {issue.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expanded Checklist */}
          {isExpanded && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="text-sm font-medium text-foreground mb-2">Setup Checklist</div>
              {readiness.checks.map(check => (
                <div
                  key={check.id}
                  className={cn(
                    "flex items-start gap-2 p-2 rounded-lg text-xs",
                    check.passed ? "bg-success/10" : "bg-muted"
                  )}
                >
                  {check.passed ? (
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className={cn(
                      "w-4 h-4 flex-shrink-0 mt-0.5",
                      check.category === 'critical' ? "text-destructive" : "text-warning"
                    )} />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{check.label}</div>
                    {!check.passed && check.quickFix && (
                      <div className="text-muted-foreground mt-0.5">{check.quickFix}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Tip */}
          {!isExpanded && readiness.score < 100 && (
            <div className="flex items-start gap-2 p-2 bg-primary/10 rounded-lg">
              <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Complete {readiness.checks.filter(c => !c.passed).length} more items to publish
              </p>
            </div>
          )}
        </div>
      </GlassCard>

      <GoLiveDialog 
        open={showGoLiveDialog}
        onClose={() => setShowGoLiveDialog(false)}
        event={event}
        readiness={readiness}
        onConfirm={onGoLive}
      />
    </>
  );
};
