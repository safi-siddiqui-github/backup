import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Attendee } from "@/types/conferenceScheduling";
import { Mail, Linkedin, Twitter, CheckCircle, Clock, XCircle, Utensils, Accessibility } from "lucide-react";

interface AttendeeProfileDialogProps {
  attendee: Attendee | null;
  isOpen: boolean;
  onClose: () => void;
  sessionCount?: number;
}

const AttendeeProfileDialog = ({ 
  attendee, 
  isOpen, 
  onClose,
  sessionCount = 0
}: AttendeeProfileDialogProps) => {
  if (!attendee) return null;

  const getCheckInStatusConfig = (status: Attendee['checkInStatus']) => {
    switch (status) {
      case 'checked-in':
        return { icon: CheckCircle, color: 'text-green-500', label: 'Checked In', bgColor: 'bg-green-500/10' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-500', label: 'Pending', bgColor: 'bg-yellow-500/10' };
      case 'no-show':
        return { icon: XCircle, color: 'text-red-500', label: 'No Show', bgColor: 'bg-red-500/10' };
    }
  };

  const statusConfig = getCheckInStatusConfig(attendee.checkInStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle>Attendee Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-2xl font-bold text-white">
              {attendee.avatar}
            </div>

            {/* Name & Title */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">{attendee.name}</h3>
              <p className="text-muted-foreground mb-2">{attendee.title}</p>
              <p className="text-sm text-muted-foreground">{attendee.company}</p>
              
              {/* Check-in Status Badge */}
              <div className="mt-3">
                <Badge className={`${statusConfig.bgColor} ${statusConfig.color} border-0`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio Section */}
          {attendee.bio && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
              <p className="text-sm text-muted-foreground">{attendee.bio}</p>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${attendee.email}`} className="text-primary hover:underline">
                  {attendee.email}
                </a>
              </div>
              {attendee.linkedin && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <a 
                    href={attendee.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {attendee.twitter && (
                <div className="flex items-center gap-2 text-sm">
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                  <a 
                    href={`https://twitter.com/${attendee.twitter.replace('@', '')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {attendee.twitter}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Interests */}
          {attendee.interests && attendee.interests.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {attendee.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Special Requirements */}
          {((attendee.dietaryRestrictions && attendee.dietaryRestrictions.length > 0) ||
            (attendee.accessibilityNeeds && attendee.accessibilityNeeds.length > 0)) && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Special Requirements</h4>
              <div className="space-y-2">
                {attendee.dietaryRestrictions && attendee.dietaryRestrictions.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Utensils className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">Dietary: </span>
                      <span className="text-foreground">{attendee.dietaryRestrictions.join(", ")}</span>
                    </div>
                  </div>
                )}
                {attendee.accessibilityNeeds && attendee.accessibilityNeeds.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Accessibility className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-muted-foreground">Accessibility: </span>
                      <span className="text-foreground">{attendee.accessibilityNeeds.join(", ")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Session Stats */}
          {sessionCount > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Event Participation</h4>
              <p className="text-sm text-muted-foreground">
                Registered for <span className="font-semibold text-foreground">{sessionCount}</span> session{sessionCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1" asChild>
              <a href={`mailto:${attendee.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendeeProfileDialog;
