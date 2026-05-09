import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Calendar, Users, UtensilsCrossed, FileText, CheckCircle, XCircle, Clock, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Guest } from "@/types/rsvp";

interface GuestProfileDialogProps {
  guest: Guest | null;
  isOpen: boolean;
  onClose: () => void;
  groupName?: string;
}

const GuestProfileDialog = ({ guest, isOpen, onClose, groupName }: GuestProfileDialogProps) => {
  if (!guest) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'attending':
        return { icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', label: 'Attending' };
      case 'declined':
        return { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', label: 'Declined' };
      case 'maybe':
        return { icon: HelpCircle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', label: 'Maybe' };
      default:
        return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Pending' };
    }
  };

  const statusConfig = getStatusConfig(guest.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Guest Profile - {guest.name}</DialogTitle>
        </DialogHeader>

        {/* Header Section */}
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
            <AvatarImage src={guest.avatar} alt={guest.name} />
            <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary to-purple-600 text-white">
              {guest.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{guest.name}</h2>
            {groupName && (
              <p className="text-sm text-muted-foreground mt-1">
                {groupName} Group
              </p>
            )}
            <Badge variant="outline" className={cn("mt-2", statusConfig.bg, statusConfig.color)}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href={`mailto:${guest.email}`} className="text-sm font-medium hover:text-primary transition-colors">
                  {guest.email}
                </a>
              </div>
            </div>
            {guest.phone && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a href={`tel:${guest.phone}`} className="text-sm font-medium hover:text-primary transition-colors">
                    {guest.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        {/* RSVP Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">RSVP Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Invited</p>
                <p className="text-sm font-medium">{guest.invitedDate.toLocaleDateString()}</p>
              </div>
            </div>
            {guest.respondedDate && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Responded</p>
                  <p className="text-sm font-medium">{guest.respondedDate.toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Plus Ones */}
        {guest.plusOnes > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Users className="w-4 h-4" />
                Plus Ones ({guest.plusOnes})
              </h3>
              {guest.plusOneNames && guest.plusOneNames.length > 0 ? (
                <ul className="space-y-2">
                  {guest.plusOneNames.map((name, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {guest.plusOnes} guest{guest.plusOnes > 1 ? 's' : ''} (names not provided)
                </p>
              )}
            </div>
          </>
        )}

        {/* Dietary Restrictions */}
        {guest.dietaryRestrictions && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                Dietary Restrictions
              </h3>
              <p className="text-sm">{guest.dietaryRestrictions}</p>
            </div>
          </>
        )}

        {/* Notes */}
        {guest.notes && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </h3>
              <p className="text-sm">{guest.notes}</p>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button variant="default" className="flex-1" onClick={() => window.location.href = `mailto:${guest.email}`}>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestProfileDialog;
