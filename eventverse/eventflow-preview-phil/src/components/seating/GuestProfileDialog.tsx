import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GuestAvatar } from "./GuestAvatar";
import { Mail, Phone, Users, UtensilsCrossed, MapPin, Clock } from "lucide-react";
import type { Guest } from "@/types/venue";

interface GuestProfileDialogProps {
  guest: Guest;
  isOpen: boolean;
  onClose: () => void;
  tableAssignment?: {
    tableName: string;
    seatNumber: number;
  };
  chairAssignment?: {
    chairName: string;
  };
}

export const GuestProfileDialog = ({
  guest,
  isOpen,
  onClose,
  tableAssignment,
  chairAssignment
}: GuestProfileDialogProps) => {
  const getDietaryColor = (dietary?: string) => {
    if (!dietary || dietary === "None") return "secondary";
    return "default";
  };

  const getGroupColor = (group?: string) => {
    const colors: Record<string, string> = {
      VIP: "destructive",
      Family: "default",
      Friends: "secondary",
      Colleagues: "outline",
      "Plus Ones": "outline"
    };
    return colors[group || ""] || "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Guest Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <GuestAvatar
              name={guest.name}
              initials={guest.initials}
              avatarColor={guest.avatarColor}
              size="xl"
              showStatus={!!(tableAssignment || chairAssignment)}
              status={tableAssignment || chairAssignment ? "assigned" : "unassigned"}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {guest.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{guest.email}</span>
              </div>
              {guest.phone && (
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{guest.phone}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Assignment Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4" />
              <span>Seating Assignment</span>
            </div>
            {tableAssignment ? (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Assigned to </span>
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    {tableAssignment.tableName}
                  </span>
                  <span className="text-muted-foreground"> at </span>
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Seat {tableAssignment.seatNumber}
                  </span>
                </div>
              </div>
            ) : chairAssignment ? (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Assigned to </span>
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    {chairAssignment.chairName}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                <div className="text-sm text-orange-700 dark:text-orange-400">
                  Not assigned yet
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Guest Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Group</span>
              </div>
              <Badge variant={getGroupColor(guest.group) as any}>
                {guest.group || "General"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Dietary</span>
              </div>
              <Badge variant={getDietaryColor(guest.dietary) as any}>
                {guest.dietary || "None"}
              </Badge>
            </div>

            {guest.status && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>RSVP Status</span>
                </div>
                <Badge variant="outline">
                  {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                </Badge>
              </div>
            )}

            {guest.plusOnes && guest.plusOnes > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Plus Ones</span>
                </div>
                <Badge variant="outline">+{guest.plusOnes}</Badge>
              </div>
            )}
          </div>

          {guest.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Notes</div>
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {guest.notes}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <a href={`mailto:${guest.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
