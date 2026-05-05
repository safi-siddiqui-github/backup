import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { cn } from "@/lib/utils";
import { calculateEventReadiness } from "@/utils/eventReadiness";
import {
	AlertTriangle,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Rocket,
	X,
} from "lucide-react";
import { useState } from "react";
import { GoLiveDialog } from "./GoLiveDialog";

interface GoLiveTrackerProps {
	event: any;
	onGoLive?: () => void;
	className?: string;
}

export const GoLiveTracker = ({
	event,
	onGoLive,
	className,
}: GoLiveTrackerProps) => {
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
		return null; // Hide completely when minimized
	}

	return (
		<>
			{/* Full-width sticky bottom bar */}
			<div
				className={cn(
					"fixed right-0 bottom-0 left-0 z-50 transition-all duration-300",
					isExpanded ? "h-auto" : "h-20",
					className,
				)}
			>
				<div className="bg-card/95 border-border border-t shadow-2xl backdrop-blur-xl">
					<div className="mx-auto max-w-7xl px-6">
						{/* Collapsed state - horizontal layout */}
						{!isExpanded && (
							<div className="flex h-20 items-center justify-between gap-6">
								{/* Left: Progress Circle */}
								<div className="flex items-center gap-4">
									<button onClick={() => setIsExpanded(true)} className="group">
										<CircularProgress
											value={readiness.score}
											size={48}
											className="transition-transform group-hover:scale-110"
										/>
									</button>
									<div>
										<div className="mb-1 flex items-center gap-2">
											<Rocket className="text-primary h-4 w-4" />
											<span className="text-sm font-semibold">
												Go Live Status
											</span>
										</div>
										<Badge
											className={cn(
												"text-xs",
												readiness.status === "ready" &&
													"bg-success/10 text-success border-success/20",
												readiness.status === "almost-ready" &&
													"bg-warning/10 text-warning border-warning/20",
												readiness.status === "not-ready" &&
													"bg-destructive/10 text-destructive border-destructive/20",
											)}
										>
											{readiness.status === "ready" && "Ready!"}
											{readiness.status === "almost-ready" && "Almost Ready"}
											{readiness.status === "not-ready" &&
												`${readiness.score}% Complete`}
										</Badge>
									</div>
								</div>

								{/* Center: Critical Issues */}
								{readiness.criticalIssues.length > 0 && (
									<div className="hidden max-w-md flex-1 items-center gap-2 md:flex">
										<AlertTriangle className="text-destructive h-4 w-4 flex-shrink-0" />
										<span className="text-muted-foreground truncate text-sm">
											{readiness.criticalIssues.length} critical{" "}
											{readiness.criticalIssues.length === 1
												? "issue"
												: "issues"}{" "}
											remaining
										</span>
									</div>
								)}

								{/* Right: Actions */}
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setIsExpanded(true)}
										className="hidden sm:flex"
									>
										View Checklist
										<ChevronUp className="ml-2 h-4 w-4" />
									</Button>
									<Button
										onClick={handleGoLive}
										disabled={!readiness.canGoLive}
										size="sm"
										className={cn(
											readiness.canGoLive &&
												"bg-success hover:bg-success/90 animate-pulse",
										)}
									>
										<Rocket className="mr-2 h-4 w-4" />
										Publish Event
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setIsMinimized(true)}
										className="h-8 w-8 p-0"
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							</div>
						)}

						{/* Expanded state - full checklist */}
						{isExpanded && (
							<div className="max-h-[50vh] space-y-4 overflow-y-auto py-6">
								{/* Header */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<CircularProgress value={readiness.score} size={60} />
										<div>
											<h3 className="mb-1 text-lg font-semibold">
												Go Live Checklist
											</h3>
											<Badge
												className={cn(
													readiness.status === "ready" &&
														"bg-success/10 text-success border-success/20",
													readiness.status === "almost-ready" &&
														"bg-warning/10 text-warning border-warning/20",
													readiness.status === "not-ready" &&
														"bg-destructive/10 text-destructive border-destructive/20",
												)}
											>
												{readiness.status === "ready" && "Ready to Go Live!"}
												{readiness.status === "almost-ready" && "Almost Ready"}
												{readiness.status === "not-ready" &&
													`${readiness.score}% Complete`}
											</Badge>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Button
											onClick={handleGoLive}
											disabled={!readiness.canGoLive}
											className={cn(
												readiness.canGoLive && "bg-success hover:bg-success/90",
											)}
										>
											<Rocket className="mr-2 h-4 w-4" />
											Publish Event
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setIsExpanded(false)}
										>
											<ChevronDown className="h-4 w-4" />
										</Button>
									</div>
								</div>

								{/* Checklist Grid */}
								<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
									{readiness.checks.map((check) => (
										<div
											key={check.id}
											className={cn(
												"flex items-start gap-3 rounded-lg border p-3 text-sm",
												check.passed
													? "bg-success/5 border-success/20"
													: check.category === "critical"
														? "bg-destructive/5 border-destructive/20"
														: "bg-muted border-border",
											)}
										>
											{check.passed ? (
												<CheckCircle className="text-success h-5 w-5 flex-shrink-0" />
											) : (
												<AlertTriangle
													className={cn(
														"h-5 w-5 flex-shrink-0",
														check.category === "critical"
															? "text-destructive"
															: "text-warning",
													)}
												/>
											)}
											<div className="min-w-0 flex-1">
												<div className="text-foreground font-medium">
													{check.label}
												</div>
												{!check.passed && check.quickFix && (
													<div className="text-muted-foreground mt-1 text-xs">
														{check.quickFix}
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

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
