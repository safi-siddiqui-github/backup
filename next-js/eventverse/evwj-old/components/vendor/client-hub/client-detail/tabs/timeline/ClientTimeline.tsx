"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  FileCheck,
  ClipboardList,
  Lock,
  Send,
} from "lucide-react";
import { ClientProject } from "../../../mockClients";
import { cn } from "@/lib/utils";
import { getTimelineByProjectId, Milestone, DeliverableItem } from "./mockTimelineData";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

interface ClientTimelineProps {
  project: ClientProject;
  clientId: string;
  clientName: string;
}

export default function ClientTimeline({
  project,
  clientId,
  clientName,
}: ClientTimelineProps) {
  const [milestones, setMilestones] = useState<Milestone[]>(() =>
    getTimelineByProjectId(project.id)
  );
  const [paymentRequestDialog, setPaymentRequestDialog] = useState<{
    open: boolean;
    milestoneId: string | null;
    amount: number;
  }>({
    open: false,
    milestoneId: null,
    amount: 0,
  });

  // Reload timeline when project changes
  useEffect(() => {
    setMilestones(getTimelineByProjectId(project.id));
  }, [project.id]);

  // Calculate progress for a milestone based on completed deliverables
  const calculateMilestoneProgress = (milestone: Milestone): number => {
    if (!milestone.deliverables || milestone.deliverables.length === 0) {
      return milestone.progress || 0;
    }
    const completedCount = milestone.deliverables.filter(
      (d) => d.status === "complete"
    ).length;
    return Math.round((completedCount / milestone.deliverables.length) * 100);
  };

  const handleDeliverableStatusChange = (
    milestoneId: string,
    deliverableId: string,
    newStatus: string
  ) => {
    setMilestones((prev) =>
      prev.map((milestone) => {
        if (milestone.id === milestoneId && milestone.deliverables) {
          const updatedMilestone = {
            ...milestone,
            deliverables: milestone.deliverables.map((deliverable) =>
              deliverable.id === deliverableId
                ? { ...deliverable, status: newStatus as any }
                : deliverable
            ),
          };
          
          // Calculate progress based on completed deliverables for all milestones
          updatedMilestone.progress = calculateMilestoneProgress(updatedMilestone);
          
          // If all deliverables are complete, change status to completed
          const allComplete = updatedMilestone.deliverables.every(
            (d) => d.status === "complete"
          );
          if (allComplete && updatedMilestone.deliverables.length > 0) {
            updatedMilestone.status = "completed";
            updatedMilestone.progress = 100;
          }
          
          return updatedMilestone;
        }
        return milestone;
      })
    );
  };

  const handleRequestPaymentClick = (milestoneId: string, amount: number) => {
    setPaymentRequestDialog({
      open: true,
      milestoneId,
      amount,
    });
  };

  const handleConfirmPaymentRequest = () => {
    if (paymentRequestDialog.milestoneId) {
      // TODO: Implement payment request logic
      console.log(`Requesting payment for milestone: ${paymentRequestDialog.milestoneId}`);
      // Here you would typically make an API call to send the payment request
      alert(`Payment request of $${paymentRequestDialog.amount.toLocaleString()} sent to ${clientName}`);
      setPaymentRequestDialog({ open: false, milestoneId: null, amount: 0 });
    }
  };

  // Calculate and update progress for all milestones
  const milestonesWithProgress = useMemo(() => {
    return milestones.map((milestone) => {
      // Calculate progress for all milestones that have deliverables
      if (milestone.deliverables && milestone.deliverables.length > 0) {
        const progress = calculateMilestoneProgress(milestone);
        return {
          ...milestone,
          progress: progress,
        };
      }
      // For milestones without deliverables, use existing progress or 0
      return {
        ...milestone,
        progress: milestone.progress || 0,
      };
    });
  }, [milestones]);

  return (
    <>
      <div className="space-y-4">
        {milestonesWithProgress.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            isLast={index === milestonesWithProgress.length - 1}
            onDeliverableStatusChange={handleDeliverableStatusChange}
            onRequestPayment={handleRequestPaymentClick}
          />
        ))}
      </div>

      <ConfirmationDialog
        open={paymentRequestDialog.open}
        onOpenChange={(open) =>
          setPaymentRequestDialog({ ...paymentRequestDialog, open })
        }
        onConfirm={handleConfirmPaymentRequest}
        title="Request Payment"
        description={`Are you sure you want to request payment of $${paymentRequestDialog.amount.toLocaleString()} from ${clientName} for this milestone?`}
        confirmText="Send Request"
        cancelText="Cancel"
        variant="warning"
      />
    </>
  );
}

interface MilestoneCardProps {
  milestone: Milestone;
  isLast: boolean;
  onDeliverableStatusChange: (
    milestoneId: string,
    deliverableId: string,
    newStatus: string
  ) => void;
  onRequestPayment: (milestoneId: string, amount: number) => void;
}

function MilestoneCard({
  milestone,
  isLast,
  onDeliverableStatusChange,
  onRequestPayment,
}: MilestoneCardProps) {
  const [isExpanded, setIsExpanded] = useState(
    milestone.status === "in_progress" || milestone.status === "blocked"
  );

  const getStatusIcon = (status: string, progress?: number) => {
    // If progress is defined, use it to determine icon
    if (progress !== undefined) {
      if (progress >= 100) {
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      } else if (progress > 0) {
        return <Clock className="h-4 w-4 text-blue-600" />;
      }
    }
    
    // Fallback to status-based icons if progress is not available
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "blocked":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Circle className="h-4 w-4 text-gray-400" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string, progress?: number) => {
    // If progress is defined, use it to determine status
    if (progress !== undefined) {
      if (progress >= 100) {
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
            completed
          </Badge>
        );
      } else if (progress > 0) {
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
            in progress
          </Badge>
        );
      }
    }
    
    // Fallback to status-based badges if progress is not available
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
            completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
            in progress
          </Badge>
        );
      case "blocked":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs">
            blocked
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-xs">
            pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const getDeliverableStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-600 dark:text-green-400";
      case "in-progress":
        return "text-blue-600 dark:text-blue-400";
      case "on-hold":
        return "text-orange-600 dark:text-orange-400";
      case "not-started":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const hasDetails =
    milestone.payment ||
    milestone.requirements ||
    milestone.deliverables;

  return (
    <div className="relative">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[40px] w-0.5 h-[calc(100%+16px)] bg-border" />
      )}

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card
          className={cn(
            "relative",
            milestone.status === "blocked" && "border-red-200 dark:border-red-900/50",
            hasDetails && "cursor-pointer"
          )}
        >
          <CollapsibleTrigger asChild>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-2.5 sm:gap-3">
                {/* Status Icon */}
                <div className="relative z-10 shrink-0 bg-card">
                  {getStatusIcon(milestone.status, milestone.progress)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2 flex-wrap">
                        <h4 className="truncate text-sm font-semibold">
                          {milestone.title}
                        </h4>
                        {milestone.payment && (
                          <span
                            className={cn(
                              "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold shrink-0",
                              milestone.payment.required
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            )}
                          >
                            <DollarSign className="h-2.5 w-2.5" />
                            ${milestone.payment.amount.toLocaleString()}
                          </span>
                        )}
                        <div className="shrink-0">{getStatusBadge(milestone.status, milestone.progress)}</div>
                      </div>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                    {hasDetails && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 p-0 shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Progress Bar (for all milestones) */}
                  {milestone.progress !== undefined && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-[10px] mb-0.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-1.5" />
                    </div>
                  )}

                  {/* Date Info */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                    {milestone.completedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        <span>Completed: {milestone.completedDate}</span>
                      </div>
                    )}
                    {milestone.dueDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        <span>Due: {milestone.dueDate}</span>
                      </div>
                    )}
                    {milestone.startDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        <span>Started: {milestone.startDate}</span>
                      </div>
                    )}
                    {milestone.estimatedStart && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        <span>Est. Start: {milestone.estimatedStart}</span>
                      </div>
                    )}
                    {milestone.daysRemaining !== undefined && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{milestone.daysRemaining} days remaining</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleTrigger>

          {/* Expanded Details */}
          {hasDetails && (
            <CollapsibleContent>
              <CardContent className="pt-0 pb-3 sm:pb-4 px-3 sm:px-4">
                <div className="space-y-2 sm:space-y-3 pt-2 border-t">
                  {/* Payment Section */}
                  {milestone.payment && (
                    <div
                      className={cn(
                        "rounded-md p-2",
                        milestone.payment.required
                          ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50"
                          : "bg-green-50 dark:bg-green-900/20"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign
                            className={cn(
                              "h-3.5 w-3.5",
                              milestone.payment.required
                                ? "text-amber-600"
                                : "text-green-600"
                            )}
                          />
                          <h5 className="text-xs font-semibold">
                            {milestone.payment.required
                              ? "Payment Required"
                              : "Payment"}
                          </h5>
                        </div>
                        {milestone.payment.required && (
                          <Lock className="h-3 w-3 text-amber-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-xs",
                            milestone.payment.required
                              ? "text-amber-700 dark:text-amber-300"
                              : "text-green-700 dark:text-green-300"
                          )}
                        >
                          ${milestone.payment.amount.toLocaleString()}
                        </span>
                        {milestone.payment.required && (
                          <Button
                            size="sm"
                            className="h-6 bg-amber-600 hover:bg-amber-700 px-2 text-xs text-white"
                            onClick={() =>
                              onRequestPayment(milestone.id, milestone.payment!.amount)
                            }
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Request
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Deliverables with Status Selector */}
                  {milestone.deliverables && milestone.deliverables.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <FileCheck className="h-3 w-3 text-muted-foreground" />
                        <h5 className="font-semibold text-xs">Deliverables</h5>
                      </div>
                      <div className="space-y-1.5">
                        {milestone.deliverables.map((deliverable) => (
                          <div
                            key={deliverable.id}
                            className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/30"
                          >
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                              <CheckCircle2
                                className={cn(
                                  "h-3 w-3 shrink-0",
                                  getDeliverableStatusColor(deliverable.status)
                                )}
                              />
                              <span className="text-xs text-muted-foreground truncate">
                                {deliverable.name}
                              </span>
                            </div>
                            <Select
                              value={deliverable.status}
                              onValueChange={(value) =>
                                onDeliverableStatusChange(
                                  milestone.id,
                                  deliverable.id,
                                  value
                                )
                              }
                              disabled={milestone.payment?.required === true}
                            >
                              <SelectTrigger className="w-[120px] h-6 text-[10px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="not-started">Not Started</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="on-hold">On Hold</SelectItem>
                                <SelectItem value="complete">Complete</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirements */}
                  {milestone.requirements && milestone.requirements.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <ClipboardList className="h-3 w-3 text-muted-foreground" />
                        <h5 className="font-semibold text-xs">Requirements</h5>
                      </div>
                      <ul className="space-y-0.5 text-xs text-muted-foreground">
                        {milestone.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-1.5">
                            <span className="text-muted-foreground">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </CardContent>
            </CollapsibleContent>
          )}
        </Card>
      </Collapsible>
    </div>
  );
}

