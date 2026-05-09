export interface Attachment {
  id: string;
  type: 'image' | 'pdf' | 'link';
  url: string;
  name: string;
  size?: number;
}

export interface Announcement {
  id: string;
  type: 'urgent' | 'announcement' | 'schedule-change' | 'weather' | 'parking' | 'safety' | 'general';
  title: string;
  content: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  requiresAcknowledgement: boolean;
  isAcknowledged: boolean;
  acknowledgedAt?: Date;
  isRead: boolean;
  readAt?: Date;
  attachments?: Attachment[];
  relatedScheduleItems?: string[];
  icon?: string;
}

export interface AnnouncementFilters {
  type: 'all' | 'urgent' | 'announcement' | 'schedule-change' | 'weather' | 'parking' | 'safety' | 'general';
  status: 'all' | 'unread' | 'read';
  requiresAck: boolean | null;
}
