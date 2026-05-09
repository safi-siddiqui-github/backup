import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Rocket, Share2, Eye } from "lucide-react";
import { ReadinessResult } from "@/lib/eventReadiness";

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
  onConfirm
}: GoLiveDialogProps) => {
  const handleConfirm = () => {
    // Update event status to published
    event.status = 'published';
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
              <Rocket className="w-8 h-8 text-success" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Ready to Publish?</DialogTitle>
          <DialogDescription className="text-center">
            Your event "{event.eventName}" is ready to go live!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Readiness Summary */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">Setup Complete</span>
              <Badge className="bg-success text-success-foreground">
                {readiness.score}% Ready
              </Badge>
            </div>
            <div className="space-y-2">
              {readiness.checks
                .filter(check => check.passed && check.category !== 'optional')
                .slice(0, 4)
                .map(check => (
                  <div key={check.id} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{check.label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">What happens when you publish:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>Your event becomes {event.isPublic ? 'publicly visible' : 'accessible to invited guests'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Share2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>You can share the event link with attendees</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>Guests can start RSVPing and interacting with your event</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Not Yet
          </Button>
          <Button onClick={handleConfirm} className="w-full sm:w-auto bg-success hover:bg-success/90">
            <Rocket className="w-4 h-4 mr-2" />
            Publish Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
