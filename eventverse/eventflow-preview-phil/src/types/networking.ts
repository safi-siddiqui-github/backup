export interface NetworkingAttendee {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  bio?: string;
  interests: string[];
  avatar?: string;
  connectionStatus: 'none' | 'pending' | 'connected';
  location?: string;
  linkedIn?: string;
}

export interface ConnectionRequest {
  id: string;
  from: NetworkingAttendee;
  to: NetworkingAttendee;
  message?: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ScheduledMeeting {
  id: string;
  attendee: NetworkingAttendee;
  date: Date;
  time: string;
  duration: number;
  location: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
