import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Inbox } from "lucide-react";
import { Announcement, AnnouncementFilters as Filters } from "@/types/announcement";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementDetail from "./AnnouncementDetail";
import AnnouncementFilters from "./AnnouncementFilters";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from backend
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    type: 'urgent',
    title: 'Venue Change for Ceremony',
    content: 'Due to unexpected weather conditions, the ceremony has been moved indoors to the Grand Ballroom. Please arrive 15 minutes earlier than originally scheduled to allow time for the new setup. The reception location remains unchanged.',
    timestamp: new Date(2024, 0, 15, 10, 30),
    priority: 'high',
    requiresAcknowledgement: true,
    isAcknowledged: false,
    isRead: false,
    relatedScheduleItems: ['Ceremony - 3:00 PM'],
    attachments: [
      {
        id: 'att1',
        type: 'image',
        url: '/venue-map.jpg',
        name: 'Updated Venue Map.jpg',
        size: 245000
      }
    ]
  },
  {
    id: '2',
    type: 'parking',
    title: 'Parking Information Update',
    content: 'Complimentary valet parking is available at the main entrance. Please have your keys ready and mention you\'re attending the event. Alternative parking is available in Lot C with shuttle service running every 10 minutes.',
    timestamp: new Date(2024, 0, 14, 16, 0),
    priority: 'medium',
    requiresAcknowledgement: false,
    isAcknowledged: false,
    isRead: true,
    readAt: new Date(2024, 0, 14, 18, 30),
    attachments: [
      {
        id: 'att2',
        type: 'link',
        url: 'https://maps.google.com',
        name: 'Parking Map Link'
      }
    ]
  },
  {
    id: '3',
    type: 'schedule-change',
    title: 'Cocktail Hour Extended',
    content: 'Great news! We\'ve extended cocktail hour by 30 minutes. Enjoy more time to mingle and enjoy the hors d\'oeuvres. Dinner will now begin at 7:00 PM instead of 6:30 PM.',
    timestamp: new Date(2024, 0, 14, 12, 0),
    priority: 'low',
    requiresAcknowledgement: false,
    isAcknowledged: false,
    isRead: true,
    readAt: new Date(2024, 0, 14, 13, 15),
    relatedScheduleItems: ['Cocktail Hour - 5:00 PM', 'Dinner - 7:00 PM']
  },
  {
    id: '4',
    type: 'weather',
    title: 'Weather Update',
    content: 'The forecast shows beautiful weather for tomorrow! Expect sunny skies with temperatures around 75°F. Perfect for our outdoor photo session. Don\'t forget your sunglasses!',
    timestamp: new Date(2024, 0, 13, 20, 0),
    priority: 'low',
    requiresAcknowledgement: false,
    isAcknowledged: false,
    isRead: false
  },
  {
    id: '5',
    type: 'safety',
    title: 'COVID-19 Safety Protocols',
    content: 'For everyone\'s safety, we ask that all guests follow these guidelines: masks are optional but encouraged in indoor spaces, hand sanitizer stations are available throughout the venue, and we\'ve implemented enhanced cleaning protocols.',
    timestamp: new Date(2024, 0, 12, 9, 0),
    priority: 'high',
    requiresAcknowledgement: true,
    isAcknowledged: false,
    isRead: true,
    readAt: new Date(2024, 0, 12, 10, 30)
  },
  {
    id: '6',
    type: 'general',
    title: 'Welcome to Our Special Day!',
    content: 'We\'re so excited to celebrate with you! This announcement center will keep you updated on any important information. Please check back regularly for updates about the schedule, venue, and other details.',
    timestamp: new Date(2024, 0, 10, 15, 0),
    priority: 'low',
    requiresAcknowledgement: false,
    isAcknowledged: false,
    isRead: true,
    readAt: new Date(2024, 0, 10, 16, 0)
  }
];

const GuestAnnouncementsView = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    status: 'all',
    requiresAck: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDetailOpen(true);
    
    // Mark as read when opened
    if (!announcement.isRead) {
      setAnnouncements(prev => 
        prev.map(a => 
          a.id === announcement.id 
            ? { ...a, isRead: true, readAt: new Date() }
            : a
        )
      );
    }
  };

  const handleAcknowledge = (id: string) => {
    setAnnouncements(prev => 
      prev.map(a => 
        a.id === id 
          ? { ...a, isAcknowledged: true, acknowledgedAt: new Date() }
          : a
      )
    );
    toast({
      title: "Acknowledged",
      description: "You've acknowledged this announcement."
    });
  };

  const handleToggleRead = (id: string) => {
    setAnnouncements(prev => 
      prev.map(a => 
        a.id === id 
          ? { 
              ...a, 
              isRead: !a.isRead,
              readAt: !a.isRead ? new Date() : undefined
            }
          : a
      )
    );
  };

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(announcement => {
      // Type filter
      if (filters.type !== 'all' && announcement.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status === 'unread' && announcement.isRead) {
        return false;
      }
      if (filters.status === 'read' && !announcement.isRead) {
        return false;
      }

      // Acknowledgement filter
      if (filters.requiresAck === true && !announcement.requiresAcknowledgement) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          announcement.title.toLowerCase().includes(query) ||
          announcement.content.toLowerCase().includes(query)
        );
      }

      return true;
    }).sort((a, b) => {
      // Sort by unread first, then by timestamp
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [announcements, filters, searchQuery]);

  const unreadCount = announcements.filter(a => !a.isRead).length;
  const urgentCount = announcements.filter(a => a.type === 'urgent' && !a.isRead).length;

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Announcements
            {unreadCount > 0 && (
              <span className="ml-auto text-sm font-normal bg-red-500 text-white px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Stay updated with important information about the event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnnouncementFilters
            filters={filters}
            onFiltersChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            unreadCount={unreadCount}
            urgentCount={urgentCount}
          />
        </CardContent>
      </Card>

      {filteredAnnouncements.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Inbox className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No announcements found</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery || filters.type !== 'all' || filters.status !== 'all'
                ? 'Try adjusting your filters'
                : 'Check back later for updates'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onClick={() => handleAnnouncementClick(announcement)}
              onAcknowledge={handleAcknowledge}
              onToggleRead={handleToggleRead}
            />
          ))}
        </div>
      )}

      <AnnouncementDetail
        announcement={selectedAnnouncement}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAcknowledge={handleAcknowledge}
      />
    </div>
  );
};

export default GuestAnnouncementsView;
