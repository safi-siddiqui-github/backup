"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";
import { Vendor, Milestone } from "./VendorListView";
import { cn } from "@/lib/utils";

interface VendorTimelineProps {
	vendor: Vendor;
	selectedEventId?: string | null;
	selectedProjectId?: string | null;
}

export default function VendorTimeline({ vendor, selectedEventId, selectedProjectId }: VendorTimelineProps) {
	// Get all milestones from all events and projects
	const allMilestones = useMemo(() => {
		if (!vendor.events) return [];
		return vendor.events.flatMap((event) =>
			event.projects.flatMap((project) =>
				(project.milestones || []).map((milestone) => ({
					...milestone,
					eventId: event.id,
					eventName: event.name,
					projectId: project.id,
					projectName: project.name,
				}))
			)
		);
	}, [vendor?.events]);

	// Filter milestones based on selected event/project
	const filteredMilestones = useMemo(() => {
		if (!selectedEventId && !selectedProjectId) {
			return allMilestones; // Show all milestones
		}

		// Filter by specific project
		if (selectedProjectId) {
			return allMilestones.filter(
				(m) => m.projectId === selectedProjectId
			);
		}

		// Filter by event (show all milestones for projects in that event)
		if (selectedEventId) {
			return allMilestones.filter(
				(m) => m.eventId === selectedEventId
			);
		}

		return allMilestones;
	}, [allMilestones, selectedEventId, selectedProjectId]);

	return (
		<div className="space-y-4">
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">
					Service Delivery Timeline
				</h3>
				<p className="text-sm text-muted-foreground">
					Track progress through vendor-defined service stages
				</p>
			</div>

			{/* Timeline */}
			<div className="space-y-4">
				{filteredMilestones.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground">
						<p>No milestones found for the selected event/project.</p>
					</div>
				) : (
					filteredMilestones.map((milestone, index) => (
						<MilestoneCard
							key={milestone.id}
							milestone={milestone}
							isLast={index === filteredMilestones.length - 1}
						/>
					))
				)}
			</div>
		</div>
	);
}

interface MilestoneCardProps {
	milestone: Milestone;
	isLast: boolean;
}

function MilestoneCard({ milestone, isLast }: MilestoneCardProps) {
	const [isExpanded, setIsExpanded] = useState(
		milestone.status === "in_progress" || milestone.status === "blocked",
	);

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "completed":
				return (
					<CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
				);
			case "in_progress":
				return <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />;
			case "blocked":
				return <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />;
			case "pending":
				return <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />;
			default:
				return <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />;
		}
	};

	const getStatusBadge = (status: string) => {
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

  const hasDetails =
    milestone.payment ||
    milestone.requirements ||
    milestone.deliverables;

	return (
		<div className="relative">
			{/* Connector Line */}
			{!isLast && (
				<div className="absolute left-[23px] top-[48px] w-0.5 h-[calc(100%+16px)] bg-border" />
			)}

			<Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
				<Card
					className={cn(
						"relative !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]",
						milestone.status === "blocked" &&
							"border-red-200 dark:border-red-900/50",
						hasDetails && "cursor-pointer",
					)}
				>
					<CollapsibleTrigger asChild>
						<CardContent className="p-4 sm:p-6">
							<div className="flex items-start gap-3 sm:gap-4">
								{/* Status Icon */}
								<div className="relative z-10 shrink-0 bg-card dark:bg-[#020617]">
									{getStatusIcon(milestone.status)}
								</div>

								{/* Content */}
								<div className="flex-1 min-w-0">
									{/* Header */}
									<div className="mb-2 flex items-start justify-between gap-3 sm:gap-6">
										<div className="min-w-0 flex-1">
											<h4 className="mb-1 truncate text-base font-semibold sm:text-lg">
												{milestone.title}
											</h4>
											<p className="text-xs text-muted-foreground sm:text-sm">
												{milestone.description}
											</p>
										</div>

										<div className="flex shrink-0 items-center gap-2">
											<div className="relative flex items-center gap-2">
												{milestone.payment && (
													<span
														className={cn(
															"absolute -top-15 left-23  flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm min-w-18 text-center",
															milestone.payment.required
																? "bg-amber-100 text-amber-700 dark:bg-red-900/30 dark:text-red-300"
																: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
														)}
													>
														<DollarSign className="h-3 w-3" />
														{milestone.payment.amount.toLocaleString()}
													</span>
												)}
												<div className="shrink-0">
													{getStatusBadge(milestone.status)}
												</div>
											</div>
											{hasDetails && (
												<div onClick={(e) => e.stopPropagation()}>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 sm:h-9 sm:w-9 p-0"
													>
														{isExpanded ? (
															<ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
														) : (
															<ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
														)}
													</Button>
												</div>
											)}
										</div>
									</div>

									{/* Progress Bar (for in_progress milestones) */}
									{milestone.status === "in_progress" &&
										milestone.progress !== undefined && (
											<div className="mb-3">
												<div className="flex items-center justify-between text-sm mb-1">
													<span className="text-muted-foreground">
														Progress
													</span>
													<span className="font-semibold">
														{milestone.progress}%
													</span>
												</div>
												<Progress value={milestone.progress} className="h-2" />
											</div>
										)}

									{/* Date Info */}
									<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
										{milestone.completedDate && (
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												<span>Completed: {milestone.completedDate}</span>
											</div>
										)}
										{milestone.dueDate && (
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												<span>Due: {milestone.dueDate}</span>
											</div>
										)}
										{milestone.startDate && (
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												<span>Started: {milestone.startDate}</span>
											</div>
										)}
										{milestone.estimatedStart && (
											<div className="flex items-center gap-1">
												<Calendar className="h-4 w-4" />
												<span>Est. Start: {milestone.estimatedStart}</span>
											</div>
										)}
										{milestone.daysRemaining !== undefined && (
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
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
							<CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
								<div className="space-y-3 sm:space-y-4 pt-2 border-t">
									{/* Payment Section */}
									{milestone.payment && (
										<div
											className={cn(
												"rounded-lg p-3 sm:p-4",
												milestone.payment.required
													? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50"
													: "bg-green-50 dark:bg-green-900/20",
											)}
										>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<DollarSign
														className={cn(
															"h-5 w-5",
															milestone.payment.required
																? "text-red-600"
																: "text-green-600",
														)}
													/>
													<h5 className="font-semibold">
														{milestone.payment.required
															? "Payment Required"
															: "Payment"}
													</h5>
												</div>
												{milestone.payment.required && (
													<Lock className="h-4 w-4 text-red-600" />
												)}
											</div>
											<div className="flex items-center justify-between">
												<span
													className={cn(
														"text-sm",
														milestone.payment.required
															? "text-red-700 dark:text-red-300"
															: "text-green-700 dark:text-green-300",
													)}
												>
													Amount: ${milestone.payment.amount.toLocaleString()}
												</span>
												{milestone.payment.required && (
													<Button
														size="sm"
														variant="destructive"
														className="bg-red-600 hover:bg-red-700"
													>
														Make Payment
													</Button>
												)}
											</div>
										</div>
									)}

                      {/* Deliverables */}
                      {milestone.deliverables && milestone.deliverables.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FileCheck className="h-4 w-4 text-muted-foreground" />
                            <h5 className="font-semibold text-sm">Deliverables</h5>
                          </div>
                          <ul className="space-y-1 text-sm">
                            {milestone.deliverables.map((deliverable, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                                <span className="text-muted-foreground">
                                  {deliverable}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Requirements */}
                      {milestone.requirements && milestone.requirements.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                            <h5 className="font-semibold text-sm">Requirements</h5>
                          </div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {milestone.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2">
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
