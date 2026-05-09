
export interface SessionTrack {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
}

export interface EventSession {
  id: string;
  title: string;
  description: string;
  type: 'keynote' | 'session' | 'workshop' | 'panel' | 'networking' | 'break';
  trackId?: string;
  speakerNames: string[];
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registeredCount: number;
  waitlistCount: number;
  prerequisites?: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  tags: string[];
}

export interface AttendeeSchedule {
  attendeeId: string;
  selectedSessions: string[];
  waitlistedSessions: string[];
  conflicts: SessionConflict[];
}

export interface SessionConflict {
  sessionId1: string;
  sessionId2: string;
  conflictType: 'time_overlap' | 'location_conflict' | 'prerequisite_missing';
  severity: 'warning' | 'error';
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  title?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  registrationDate: Date;
  checkInStatus: 'pending' | 'checked-in' | 'no-show';
  dietaryRestrictions?: string[];
  accessibilityNeeds?: string[];
  interests?: string[];
}

export interface SessionRegistration {
  sessionId: string;
  attendeeId: string;
  status: 'registered' | 'waitlisted' | 'cancelled';
  registeredAt: Date;
  position?: number; // for waitlist
}

export interface SessionWithAttendees extends EventSession {
  attendees: Attendee[];
}
