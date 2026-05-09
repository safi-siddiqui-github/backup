import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GuestAvatar, getInitials, getAvatarColor } from "@/components/seating/GuestAvatar";
import { HistoricalGuest, GuestSegment } from "@/types/marketing";
import { Mail, Phone, MapPin, Calendar, DollarSign, Users, ShoppingBag, Ban } from "lucide-react";
import { format } from "date-fns";

interface GuestDetailPanelProps {
  guest: HistoricalGuest | null;
  segments: GuestSegment[];
  isOpen: boolean;
  onClose: () => void;
}

export const GuestDetailPanel = ({ guest, segments, isOpen, onClose }: GuestDetailPanelProps) => {
  if (!guest) return null;

  const getSegmentName = (segmentId: string) => {
    return segments.find(s => s.id === segmentId)?.name || segmentId;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Guest Profile</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <GuestAvatar
              name={guest.name}
              initials={getInitials(guest.name)}
              avatarColor={getAvatarColor(parseInt(guest.id.split('-')[1] || '0'))}
              size="xl"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{guest.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {guest.segments.map((segmentId) => (
                  <Badge key={segmentId} variant="secondary">
                    {getSegmentName(segmentId)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${guest.email}`} className="text-primary hover:underline">
                  {guest.email}
                </a>
              </div>
              {guest.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${guest.phone}`} className="text-primary hover:underline">
                    {guest.phone}
                  </a>
                </div>
              )}
              {guest.demographics?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{guest.demographics.location}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{guest.attendanceCount}</div>
              <div className="text-xs text-muted-foreground mt-1">Events Attended</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success">${guest.totalSpent.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Spent</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">
                {guest.eventHistory.reduce((sum, e) => sum + e.plusOnes, 0)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Plus Ones</div>
            </div>
          </div>

          <Separator />

          {/* Demographics */}
          {guest.demographics && (
            <>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Demographics
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {guest.demographics.ageRange && (
                    <div>
                      <span className="text-muted-foreground">Age Range:</span>
                      <div className="font-medium">{guest.demographics.ageRange}</div>
                    </div>
                  )}
                  {guest.demographics.gender && (
                    <div>
                      <span className="text-muted-foreground">Gender:</span>
                      <div className="font-medium">{guest.demographics.gender}</div>
                    </div>
                  )}
                  {guest.demographics.occupation && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Occupation:</span>
                      <div className="font-medium">{guest.demographics.occupation}</div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Event History */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Event History
            </h4>
            <div className="space-y-3">
              {guest.eventHistory.slice(0, 5).map((event, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{event.eventName}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {format(new Date(event.eventDate), "MMM d, yyyy")} • {event.eventType}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <Badge variant="outline" className="text-xs">{event.ticketTier}</Badge>
                      <span className="text-muted-foreground">
                        {event.ticketQuantity} ticket{event.ticketQuantity !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-success">${event.totalSpent}</div>
                  </div>
                </div>
              ))}
              {guest.eventHistory.length > 5 && (
                <div className="text-center text-sm text-muted-foreground">
                  +{guest.eventHistory.length - 5} more events
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Opt-out Preferences */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Communication Preferences
            </h4>
            <div className="space-y-2 text-sm">
              {guest.optOuts.email && (
                <div className="flex items-center gap-2 text-destructive">
                  <Ban className="w-4 h-4" />
                  Opted out of email communications
                </div>
              )}
              {guest.optOuts.sms && (
                <div className="flex items-center gap-2 text-destructive">
                  <Ban className="w-4 h-4" />
                  Opted out of SMS communications
                </div>
              )}
              {guest.optOuts.physicalMail && (
                <div className="flex items-center gap-2 text-destructive">
                  <Ban className="w-4 h-4" />
                  Opted out of physical mail
                </div>
              )}
              {!guest.optOuts.email && !guest.optOuts.sms && !guest.optOuts.physicalMail && (
                <div className="text-muted-foreground">
                  No opt-outs • All channels available
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button className="flex-1" variant="outline">
              Add to Segment
            </Button>
            <Button className="flex-1">
              Send Message
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
