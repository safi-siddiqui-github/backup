import { useState, useEffect } from 'react';

export interface AnnouncementAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface AnnouncementRecipient {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'delivered' | 'opened' | 'clicked' | 'failed';
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  failureReason?: string;
  source: 'rsvp-group' | 'ticket-tier' | 'custom' | 'all';
  sourceId?: string;
  sourceName?: string;
}

export interface Announcement {
  id: string;
  eventId: string;
  type: 'announcement' | 'urgent' | 'schedule-change' | 'weather' | 'parking' | 'safety';
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  
  // Rich Content
  attachments?: AnnouncementAttachment[];
  actionButton?: {
    text: string;
    url: string;
  };
  
  // Advanced Targeting
  targetAudience: {
    type: 'all' | 'rsvp-groups' | 'ticket-tiers' | 'custom';
    rsvpGroupIds?: string[];
    ticketTierIds?: string[];
    customEmails?: string[];
  };
  
  // Delivery Details
  deliveryStatus: 'draft' | 'sending' | 'sent' | 'scheduled' | 'failed';
  scheduledFor?: Date;
  sentAt?: Date;
  
  // Tracking
  timestamp: Date;
  createdBy: string;
  recipients: AnnouncementRecipient[];
  
  // Stats (computed from recipients)
  totalRecipients: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  failedCount: number;
}

const generateMockRecipients = (count: number, sources: Array<{ type: string; id: string; name: string }>): AnnouncementRecipient[] => {
  const statuses: AnnouncementRecipient['status'][] = ['delivered', 'opened', 'clicked', 'delivered', 'opened'];
  const names = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Johnson', 'Charlie Brown', 'Diana Prince', 'Eve Martinez', 'Frank Castle'];
  
  return Array.from({ length: count }, (_, i) => {
    const source = sources[i % sources.length];
    const status = statuses[i % statuses.length];
    const baseTime = Date.now() - (2 * 60 * 60 * 1000);
    
    return {
      id: `rec-${i + 1}`,
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
      name: names[i % names.length],
      status,
      deliveredAt: new Date(baseTime + (i * 1000)),
      openedAt: status === 'opened' || status === 'clicked' ? new Date(baseTime + (i * 1000) + 30000) : undefined,
      clickedAt: status === 'clicked' ? new Date(baseTime + (i * 1000) + 60000) : undefined,
      source: source.type as any,
      sourceId: source.id,
      sourceName: source.name
    };
  });
};

const createMockAnnouncements = (eventId: string): Announcement[] => {
  const now = Date.now();
  
  return [
    {
      id: 'ann-1',
      eventId,
      type: 'urgent',
      title: 'Venue Change - Important Update',
      content: 'Due to unforeseen weather conditions, we are moving the outdoor ceremony indoors to the Grand Ballroom. All other details remain the same. Please arrive 15 minutes early to find your seat.',
      priority: 'high',
      attachments: [
        {
          id: 'att-1',
          name: 'Updated_Venue_Map.pdf',
          url: '/attachments/venue-map.pdf',
          type: 'pdf',
          size: 245000
        }
      ],
      actionButton: {
        text: 'View New Venue Details',
        url: '/venue/grand-ballroom'
      },
      targetAudience: {
        type: 'rsvp-groups',
        rsvpGroupIds: ['group-vip', 'group-wedding-party']
      },
      deliveryStatus: 'sent',
      sentAt: new Date(now - 2 * 60 * 60 * 1000),
      timestamp: new Date(now - 3 * 60 * 60 * 1000),
      createdBy: 'Sarah Johnson',
      recipients: generateMockRecipients(57, [
        { type: 'rsvp-group', id: 'group-vip', name: 'VIP Guests' },
        { type: 'rsvp-group', id: 'group-wedding-party', name: 'Wedding Party' }
      ]),
      totalRecipients: 57,
      deliveredCount: 52,
      openedCount: 38,
      clickedCount: 12,
      failedCount: 5
    },
    {
      id: 'ann-2',
      eventId,
      type: 'parking',
      title: 'Parking Instructions for Event Day',
      content: 'Valet parking will be available at the main entrance. Additional self-parking is available in Lot B. Please display your parking pass on your dashboard. VIP ticket holders have reserved spots in Lot A.',
      priority: 'medium',
      targetAudience: {
        type: 'ticket-tiers',
        ticketTierIds: ['tier-vip', 'tier-general']
      },
      deliveryStatus: 'sent',
      sentAt: new Date(now - 6 * 60 * 60 * 1000),
      timestamp: new Date(now - 7 * 60 * 60 * 1000),
      createdBy: 'Michael Chen',
      recipients: generateMockRecipients(180, [
        { type: 'ticket-tier', id: 'tier-vip', name: 'VIP Tickets' },
        { type: 'ticket-tier', id: 'tier-general', name: 'General Admission' }
      ]),
      totalRecipients: 180,
      deliveredCount: 175,
      openedCount: 142,
      clickedCount: 28,
      failedCount: 5
    },
    {
      id: 'ann-3',
      eventId,
      type: 'schedule-change',
      title: 'Updated Schedule - Ceremony Moved Earlier',
      content: 'The ceremony will now begin at 3:30 PM instead of 4:00 PM. Cocktail hour will start immediately after at 4:30 PM. Reception dinner remains at 6:00 PM. We apologize for any inconvenience.',
      priority: 'high',
      targetAudience: {
        type: 'all'
      },
      deliveryStatus: 'sent',
      sentAt: new Date(now - 24 * 60 * 60 * 1000),
      timestamp: new Date(now - 25 * 60 * 60 * 1000),
      createdBy: 'Sarah Johnson',
      recipients: generateMockRecipients(250, [
        { type: 'all', id: 'all', name: 'All Attendees' }
      ]),
      totalRecipients: 250,
      deliveredCount: 245,
      openedCount: 198,
      clickedCount: 45,
      failedCount: 5
    },
    {
      id: 'ann-4',
      eventId,
      type: 'weather',
      title: 'Weather Forecast Update',
      content: 'Good news! The forecast shows sunny weather with temperatures in the mid-70s. Perfect conditions for our outdoor photos! Remember to bring sunglasses and sunscreen.',
      priority: 'low',
      targetAudience: {
        type: 'all'
      },
      deliveryStatus: 'sent',
      sentAt: new Date(now - 48 * 60 * 60 * 1000),
      timestamp: new Date(now - 49 * 60 * 60 * 1000),
      createdBy: 'Emma Davis',
      recipients: generateMockRecipients(250, [
        { type: 'all', id: 'all', name: 'All Attendees' }
      ]),
      totalRecipients: 250,
      deliveredCount: 248,
      openedCount: 165,
      clickedCount: 18,
      failedCount: 2
    },
    {
      id: 'ann-5',
      eventId,
      type: 'announcement',
      title: 'Menu Selection Reminder',
      content: 'This is a friendly reminder to submit your menu selections by Friday. We have vegetarian, vegan, and gluten-free options available. Please update your preferences in your RSVP.',
      priority: 'medium',
      targetAudience: {
        type: 'rsvp-groups',
        rsvpGroupIds: ['group-family', 'group-friends']
      },
      deliveryStatus: 'draft',
      timestamp: new Date(now - 1 * 60 * 60 * 1000),
      createdBy: 'Sarah Johnson',
      recipients: [],
      totalRecipients: 0,
      deliveredCount: 0,
      openedCount: 0,
      clickedCount: 0,
      failedCount: 0
    }
  ];
};

export const useAnnouncementStorage = (eventId: string) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`announcements_${eventId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnnouncements(parsed.map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp),
        sentAt: a.sentAt ? new Date(a.sentAt) : undefined,
        scheduledFor: a.scheduledFor ? new Date(a.scheduledFor) : undefined,
        recipients: (a.recipients || []).map((r: any) => ({
          ...r,
          deliveredAt: r.deliveredAt ? new Date(r.deliveredAt) : undefined,
          openedAt: r.openedAt ? new Date(r.openedAt) : undefined,
          clickedAt: r.clickedAt ? new Date(r.clickedAt) : undefined
        }))
      })));
    } else {
      // Initialize with mock data
      const mockData = createMockAnnouncements(eventId);
      setAnnouncements(mockData);
      localStorage.setItem(`announcements_${eventId}`, JSON.stringify(mockData));
    }
  }, [eventId]);

  const saveToStorage = (newAnnouncements: Announcement[]) => {
    localStorage.setItem(`announcements_${eventId}`, JSON.stringify(newAnnouncements));
    setAnnouncements(newAnnouncements);
  };

  const createAnnouncement = (announcementData: Omit<Announcement, 'id' | 'eventId' | 'timestamp' | 'recipients' | 'totalRecipients' | 'deliveredCount' | 'openedCount' | 'clickedCount' | 'failedCount'>) => {
    const newAnnouncement: Announcement = {
      id: `announcement_${Date.now()}`,
      eventId,
      timestamp: new Date(),
      recipients: [],
      totalRecipients: 0,
      deliveredCount: 0,
      openedCount: 0,
      clickedCount: 0,
      failedCount: 0,
      ...announcementData
    };
    
    const updatedAnnouncements = [newAnnouncement, ...announcements];
    saveToStorage(updatedAnnouncements);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    const updatedAnnouncements = announcements.map(announcement =>
      announcement.id === id ? { ...announcement, ...updates } : announcement
    );
    saveToStorage(updatedAnnouncements);
  };

  const deleteAnnouncement = (id: string) => {
    const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
    saveToStorage(updatedAnnouncements);
  };

  return {
    announcements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  };
};
