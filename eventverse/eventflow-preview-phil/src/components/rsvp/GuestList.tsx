import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Guest } from "@/types/rsvp";
import GuestProfileDialog from "./GuestProfileDialog";

interface GuestListProps {
  guests: Guest[];
  groupId: string;
  groupName: string;
  maxDisplay?: number;
}

const GuestList = ({ guests, groupId, groupName, maxDisplay = 5 }: GuestListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const groupGuests = guests.filter(guest => guest.group === groupId);
  const filteredGuests = groupGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedGuests = isExpanded ? filteredGuests : filteredGuests.slice(0, maxDisplay);
  const attendingCount = groupGuests.filter(g => g.status === 'attending').length;

  const getAvatarColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600',
      'from-yellow-500 to-yellow-600'
    ];
    return colors[index % colors.length];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attending': return 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20';
      case 'declined': return 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20';
      case 'maybe': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (groupGuests.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground text-sm">
        No guests in this group yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Avatar Stack */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {groupGuests.slice(0, maxDisplay).map((guest, index) => (
            <Avatar
              key={guest.id}
              className="w-8 h-8 border-2 border-background hover:scale-110 hover:z-10 transition-transform cursor-pointer"
              onClick={() => setSelectedGuest(guest)}
            >
              <AvatarImage src={guest.avatar} alt={guest.name} />
              <AvatarFallback className={cn("text-white text-xs font-medium bg-gradient-to-br", getAvatarColor(index))}>
                {guest.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        {groupGuests.length > maxDisplay && (
          <span className="text-sm text-muted-foreground font-medium">
            +{groupGuests.length - maxDisplay} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {groupGuests.length} member{groupGuests.length !== 1 ? 's' : ''} • {attendingCount} attending
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-7 px-2 text-xs"
        >
          {isExpanded ? (
            <>
              Collapse <ChevronUp className="w-3 h-3 ml-1" />
            </>
          ) : (
            <>
              Expand <ChevronDown className="w-3 h-3 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-3 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50"
            />
          </div>

          {/* Guest Cards */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {displayedGuests.map((guest, index) => (
              <div
                key={guest.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                onClick={() => setSelectedGuest(guest)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 border-2 border-background group-hover:scale-105 transition-transform">
                    <AvatarImage src={guest.avatar} alt={guest.name} />
                    <AvatarFallback className={cn("text-white font-medium text-sm bg-gradient-to-br", getAvatarColor(index))}>
                      {guest.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{guest.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{guest.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn("text-xs capitalize shrink-0", getStatusColor(guest.status))}>
                  {guest.status === 'attending' && '✓ '}
                  {guest.status === 'declined' && '✗ '}
                  {guest.status === 'maybe' && '? '}
                  {guest.status === 'pending' && '⏱ '}
                  {guest.status}
                </Badge>
              </div>
            ))}
          </div>

          {filteredGuests.length === 0 && (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No guests found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Profile Dialog */}
      <GuestProfileDialog
        guest={selectedGuest}
        isOpen={!!selectedGuest}
        onClose={() => setSelectedGuest(null)}
        groupName={groupName}
      />
    </div>
  );
};

export default GuestList;
