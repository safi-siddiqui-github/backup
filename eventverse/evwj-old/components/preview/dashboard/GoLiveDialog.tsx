import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ReadinessResult } from "@/utils/eventReadiness";
import { CheckCircle, Eye, Rocket, Share2 } from "lucide-react";

interface GoLiveDialogProps {
	open: boolean;
	onClose: () => void;
	event: any;
	readiness: ReadinessResult;
	onConfirm?: () => void;
}

export const GoLiveDialog = ({
	open,
	onClose,
	event,
	readiness,
	onConfirm,
}: GoLiveDialogProps) => {
	const handleConfirm = () => {
		// Update event status to published
		event.status = "published";
		onConfirm?.();
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="mb-4 flex items-center justify-center">
						<div className="bg-success/20 flex h-16 w-16 items-center justify-center rounded-full">
							<Rocket className="text-success h-8 w-8" />
						</div>
					</div>
					<DialogTitle className="text-center text-2xl">
						Ready to Publish?
					</DialogTitle>
					<DialogDescription className="text-center">
						Your event "{event.eventName}" is ready to go live!
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Readiness Summary */}
					<div className="bg-success/10 border-success/20 rounded-lg border p-4">
						<div className="mb-3 flex items-center justify-between">
							<span className="text-foreground font-medium">
								Setup Complete
							</span>
							<Badge className="bg-success text-success-foreground">
								{readiness.score}% Ready
							</Badge>
						</div>
						<div className="space-y-2">
							{readiness.checks
								.filter(
									(check) => check.passed && check.category !== "optional",
								)
								.slice(0, 4)
								.map((check) => (
									<div
										key={check.id}
										className="flex items-center gap-2 text-sm"
									>
										<CheckCircle className="text-success h-4 w-4 flex-shrink-0" />
										<span className="text-muted-foreground">{check.label}</span>
									</div>
								))}
						</div>
					</div>

					{/* What happens next */}
					<div className="space-y-2">
						<h4 className="text-foreground font-medium">
							What happens when you publish:
						</h4>
						<ul className="text-muted-foreground space-y-2 text-sm">
							<li className="flex items-start gap-2">
								<Eye className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
								<span>
									Your event becomes{" "}
									{event.isPublic
										? "publicly visible"
										: "accessible to invited guests"}
								</span>
							</li>
							<li className="flex items-start gap-2">
								<Share2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
								<span>You can share the event link with attendees</span>
							</li>
							<li className="flex items-start gap-2">
								<CheckCircle className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
								<span>
									Guests can start RSVPing and interacting with your event
								</span>
							</li>
						</ul>
					</div>
				</div>

				<DialogFooter className="flex-col gap-2 sm:flex-row">
					<Button
						variant="outline"
						onClick={onClose}
						className="w-full sm:w-auto"
					>
						Not Yet
					</Button>
					<Button
						onClick={handleConfirm}
						className="bg-success hover:bg-success/90 w-full sm:w-auto"
					>
						<Rocket className="mr-2 h-4 w-4" />
						Publish Event
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
