import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Attendee } from "@/types/conferenceScheduling";
import { ChevronDown, ChevronUp, Search, Users, CheckCircle, Clock } from "lucide-react";
import AttendeeProfileDialog from "./AttendeeProfileDialog";

interface AttendeeListProps {
  attendees: Attendee[];
  sessionId: string;
  maxCapacity: number;
}

const AttendeeList = ({ attendees, sessionId, maxCapacity }: AttendeeListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedAttendees = isExpanded ? filteredAttendees : filteredAttendees.slice(0, 5);
  const checkedInCount = attendees.filter(a => a.checkInStatus === 'checked-in').length;

  const getAvatarColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600',
    ];
    return colors[index % colors.length];
  };

  if (attendees.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No attendees registered yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Avatar Stack */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar Stack - First 5 */}
          <div className="flex -space-x-2">
            {attendees.slice(0, 5).map((attendee, index) => (
              <div
                key={attendee.id}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(index)} flex items-center justify-center text-xs font-semibold text-white border-2 border-background cursor-pointer hover:scale-110 transition-transform`}
                title={attendee.name}
                onClick={() => setSelectedAttendee(attendee)}
              >
                {attendee.avatar}
              </div>
            ))}
            {attendees.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground border-2 border-background">
                +{attendees.length - 5}
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {attendees.length} / {maxCapacity}
              </span>
              <span className="text-xs text-muted-foreground">Registered</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-green-500" />
              {checkedInCount} checked in
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Hide
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              View All
            </>
          )}
        </Button>
      </div>

      {/* Expanded Attendee List */}
      {isExpanded && (
        <div className="space-y-3 animate-fade-in">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search attendees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Attendee Cards */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {displayedAttendees.map((attendee, index) => (
              <div
                key={attendee.id}
                className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => setSelectedAttendee(attendee)}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(index)} flex items-center justify-center text-sm font-semibold text-white flex-shrink-0`}>
                  {attendee.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm text-foreground truncate">
                      {attendee.name}
                    </p>
                    {attendee.checkInStatus === 'checked-in' && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                    {attendee.checkInStatus === 'pending' && (
                      <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {attendee.title} @ {attendee.company}
                  </p>
                </div>

                {/* Interests Badge */}
                {attendee.interests && attendee.interests.length > 0 && (
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {attendee.interests[0]}
                  </Badge>
                )}
              </div>
            ))}

            {filteredAttendees.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-4">
                No attendees found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Attendee Profile Dialog */}
      <AttendeeProfileDialog
        attendee={selectedAttendee}
        isOpen={selectedAttendee !== null}
        onClose={() => setSelectedAttendee(null)}
      />
    </div>
  );
};

export default AttendeeList;
