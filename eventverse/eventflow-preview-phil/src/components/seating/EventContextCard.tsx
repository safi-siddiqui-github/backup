import { useEventStorage } from "@/hooks/useEventStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, UserCheck, UserX, Clock } from "lucide-react";
import { format } from "date-fns";

const EventContextCard = () => {
  const { events } = useEventStorage();
  const currentEvent = events[0]; // Assuming the most recent event is the current one

  if (!currentEvent) {
    return null;
  }

  // Mock guest data - in a real app, this would come from a guest management system
  const guestStats = {
    total: currentEvent.maxGuests || 0,
    confirmed: Math.floor((currentEvent.maxGuests || 0) * 0.7),
    pending: Math.floor((currentEvent.maxGuests || 0) * 0.2),
    declined: Math.floor((currentEvent.maxGuests || 0) * 0.1),
    groups: [
      { name: "Family", count: Math.floor((currentEvent.maxGuests || 0) * 0.3) },
      { name: "Friends", count: Math.floor((currentEvent.maxGuests || 0) * 0.4) },
      { name: "Colleagues", count: Math.floor((currentEvent.maxGuests || 0) * 0.3) },
    ],
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          {currentEvent.eventName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Event Date</p>
              <p className="text-sm font-semibold text-foreground">
                {format(new Date(currentEvent.startDate), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Event Type</p>
              <p className="text-sm font-semibold text-foreground capitalize">
                {currentEvent.eventType}
              </p>
            </div>
          </div>

          {currentEvent.location && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Venue</p>
                <p className="text-sm font-semibold text-foreground">
                  {currentEvent.location}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Guest Statistics */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Guest Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-card">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <p className="text-2xl font-bold text-foreground">
                  {guestStats.total}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">Total Guests</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-card">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-green-500" />
                <p className="text-2xl font-bold text-foreground">
                  {guestStats.confirmed}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-card">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-yellow-500" />
                <p className="text-2xl font-bold text-foreground">
                  {guestStats.pending}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-card">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserX className="w-4 h-4 text-red-500" />
                <p className="text-2xl font-bold text-foreground">
                  {guestStats.declined}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">Declined</p>
            </div>
          </div>
        </div>

        {/* Guest Groups */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Guest Groups
          </h3>
          <div className="flex flex-wrap gap-2">
            {guestStats.groups.map((group) => (
              <div
                key={group.name}
                className="px-3 py-2 rounded-lg bg-card border border-border"
              >
                <span className="text-sm font-medium text-foreground">
                  {group.name}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  ({group.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {currentEvent.description && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Description
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentEvent.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventContextCard;
