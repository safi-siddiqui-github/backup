export type CalendarItemType = 'milestone' | 'payment' | 'meeting' | 'task' | 'deadline' | 'rsvp';
export type CalendarItemStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';
export type CalendarItemPriority = 'low' | 'medium' | 'high';
export type ExternalCalendarProvider = 'google' | 'outlook';

export interface CalendarItem {
  id: string;
  eventId: string;
  eventName: string;
  eventColor: string;
  type: CalendarItemType;
  title: string;
  description?: string;
  dueDate: Date;
  dueTime?: string;
  status: CalendarItemStatus;
  priority?: CalendarItemPriority;
  relatedTo?: string;
  metadata?: any;
}

export interface ExternalCalendar {
  id: string;
  provider: ExternalCalendarProvider;
  accountName: string;
  email: string;
  color: string;
  visible: boolean;
  lastSynced: Date;
  itemCount: number;
}

export interface CalendarFilters {
  eventIds: string[];
  types: CalendarItemType[];
  statuses: CalendarItemStatus[];
  priorities: CalendarItemPriority[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  externalCalendarIds: string[];
  searchQuery: string;
}

export interface CalendarMeeting extends CalendarItem {
  type: 'meeting';
  location?: string;
  duration?: number;
  attendees?: string[];
  agenda?: string;
}

export interface CalendarTask extends CalendarItem {
  type: 'task';
  subtasks?: { id: string; title: string; completed: boolean }[];
  assignedTo?: string;
}
