
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

export interface SessionRegistration {
  sessionId: string;
  attendeeId: string;
  status: 'registered' | 'waitlisted' | 'cancelled';
  registeredAt: Date;
  position?: number; // for waitlist
}
