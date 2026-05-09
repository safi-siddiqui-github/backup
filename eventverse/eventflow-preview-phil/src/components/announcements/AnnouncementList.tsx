
import { useState } from "react";
import AnnouncementDetailView from "./AnnouncementDetailView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  AlertTriangle,
  Megaphone,
  Clock,
  CloudRain,
  Car,
  Shield,
  Info,
  Users,
  Calendar
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Announcement } from "@/hooks/useAnnouncementStorage";

interface AnnouncementListProps {
  announcements: Announcement[];
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

const AnnouncementList = ({ announcements, onEdit, onDelete }: AnnouncementListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return AlertTriangle;
      case 'announcement': return Megaphone;
      case 'schedule-change': return Clock;
      case 'weather': return CloudRain;
      case 'parking': return Car;
      case 'safety': return Shield;
      default: return Info;
    }
  };

  const getTypeColor = (type: string, priority: string) => {
    if (type === 'urgent' || priority === 'high') {
      return 'from-red-500 to-red-600';
    }
    switch (type) {
      case 'announcement': return 'from-blue-500 to-blue-600';
      case 'schedule-change': return 'from-orange-500 to-orange-600';
      case 'weather': return 'from-cyan-500 to-cyan-600';
      case 'parking': return 'from-purple-500 to-purple-600';
      case 'safety': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-500 text-white',
      medium: 'bg-orange-500 text-white',
      low: 'bg-blue-500 text-white'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      sent: 'bg-green-500 text-white',
      draft: 'bg-gray-500 text-white',
      scheduled: 'bg-blue-500 text-white'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || announcement.type === filterType;
    const matchesPriority = filterPriority === "all" || announcement.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const getTargetAudienceText = (announcement: Announcement) => {
    const { targetAudience } = announcement;
    
    if (targetAudience.type === 'all') {
      return 'All Attendees';
    }
    
    if (targetAudience.type === 'rsvp-groups' && targetAudience.rsvpGroupIds) {
      return `${targetAudience.rsvpGroupIds.length} RSVP Groups`;
    }
    
    if (targetAudience.type === 'ticket-tiers' && targetAudience.ticketTierIds) {
      return `${targetAudience.ticketTierIds.length} Ticket Tiers`;
    }
    
    if (targetAudience.type === 'custom' && targetAudience.customEmails) {
      return `${targetAudience.customEmails.length} Custom Recipients`;
    }
    
    return 'Unknown';
  };

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <Megaphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
        <p className="text-gray-600">Create your first announcement to start communicating with attendees.</p>
      </div>
    );
  }

  return (
    <>
      <AnnouncementDetailView 
        announcement={selectedAnnouncement}
        open={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
      
      <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="announcement">General</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="schedule-change">Schedule</SelectItem>
            <SelectItem value="weather">Weather</SelectItem>
            <SelectItem value="parking">Parking</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => {
          const TypeIcon = getTypeIcon(announcement.type);
          const deliveryRate = announcement.totalRecipients > 0 
            ? Math.round((announcement.deliveredCount / announcement.totalRecipients) * 100)
            : 0;
          const openRate = announcement.deliveredCount > 0
            ? Math.round((announcement.openedCount / announcement.deliveredCount) * 100)
            : 0;

          return (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(announcement.type, announcement.priority)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground truncate">{announcement.title}</h3>
                        {getPriorityBadge(announcement.priority)}
                        {getStatusBadge(announcement.deliveryStatus)}
                      </div>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2">{announcement.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(announcement.sentAt || announcement.timestamp, 'MMM d, yyyy h:mm a')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>To: {getTargetAudienceText(announcement)}</span>
                        </div>
                      </div>

                      {announcement.deliveryStatus === 'sent' && (
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              ✓ {announcement.deliveredCount} delivered
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              👁 {announcement.openedCount} opened ({openRate}%)
                            </Badge>
                          </div>
                          {announcement.clickedCount > 0 && (
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                🖱 {announcement.clickedCount} clicked
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedAnnouncement(announcement)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(announcement.id, announcement)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(announcement.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAnnouncements.length === 0 && announcements.length > 0 && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matching announcements</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      </div>
    </>
  );
};

export default AnnouncementList;
