export interface OrganizationAnalytics {
  organizationId: string;
  period: 'week' | 'month' | 'quarter' | 'year';
  metrics: {
    totalEvents: number;
    totalAttendees: number;
    averageAttendance: number;
    eventsByType: Record<string, number>;
    eventsByDepartment: Record<string, number>;
    employeeEngagement: {
      activeEmployees: number;
      eventsHosted: number;
      eventsAttended: number;
    };
    integrationUsage: {
      teamsAnnouncements: number;
      slackPosts: number;
      webexMeetings: number;
    };
  };
  trends: Array<{
    date: Date;
    events: number;
    attendees: number;
    engagement: number;
  }>;
}

export const mockOrganizationAnalytics: OrganizationAnalytics[] = [
  // TechCorp Inc. (org-1) - Monthly analytics
  {
    organizationId: 'org-1',
    period: 'month',
    metrics: {
      totalEvents: 45,
      totalAttendees: 3420,
      averageAttendance: 76,
      eventsByType: {
        'Conference': 8,
        'Workshop': 12,
        'Team Building': 6,
        'All-Hands Meeting': 4,
        'Product Launch': 3,
        'Training Session': 12
      },
      eventsByDepartment: {
        'Engineering': 18,
        'Sales': 10,
        'Marketing': 8,
        'Human Resources': 4,
        'Finance': 3,
        'Product': 2
      },
      employeeEngagement: {
        activeEmployees: 235,
        eventsHosted: 45,
        eventsAttended: 892
      },
      integrationUsage: {
        teamsAnnouncements: 42,
        slackPosts: 38,
        webexMeetings: 25
      }
    },
    trends: [
      { date: new Date('2024-09-01'), events: 8, attendees: 620, engagement: 85 },
      { date: new Date('2024-09-08'), events: 11, attendees: 850, engagement: 88 },
      { date: new Date('2024-09-15'), events: 9, attendees: 685, engagement: 82 },
      { date: new Date('2024-09-22'), events: 10, attendees: 765, engagement: 86 },
      { date: new Date('2024-09-29'), events: 7, attendees: 500, engagement: 79 }
    ]
  },

  // Elite Events & Co. (org-2) - Monthly analytics
  {
    organizationId: 'org-2',
    period: 'month',
    metrics: {
      totalEvents: 28,
      totalAttendees: 1890,
      averageAttendance: 68,
      eventsByType: {
        'Client Event': 12,
        'Team Meeting': 8,
        'Workshop': 5,
        'Training': 3
      },
      eventsByDepartment: {
        'Planning': 12,
        'Design': 7,
        'Operations': 6,
        'Client Services': 3
      },
      employeeEngagement: {
        activeEmployees: 42,
        eventsHosted: 28,
        eventsAttended: 385
      },
      integrationUsage: {
        teamsAnnouncements: 25,
        slackPosts: 28,
        webexMeetings: 0
      }
    },
    trends: [
      { date: new Date('2024-09-01'), events: 5, attendees: 340, engagement: 76 },
      { date: new Date('2024-09-08'), events: 7, attendees: 475, engagement: 82 },
      { date: new Date('2024-09-15'), events: 6, attendees: 408, engagement: 79 },
      { date: new Date('2024-09-22'), events: 6, attendees: 410, engagement: 80 },
      { date: new Date('2024-09-29'), events: 4, attendees: 257, engagement: 74 }
    ]
  },

  // StartupHub Ventures (org-3) - Monthly analytics
  {
    organizationId: 'org-3',
    period: 'month',
    metrics: {
      totalEvents: 15,
      totalAttendees: 680,
      averageAttendance: 45,
      eventsByType: {
        'Pitch Night': 4,
        'Portfolio Review': 3,
        'Networking': 4,
        'Team Meeting': 4
      },
      eventsByDepartment: {
        'Investment': 8,
        'Portfolio Management': 4,
        'Operations': 3
      },
      employeeEngagement: {
        activeEmployees: 26,
        eventsHosted: 15,
        eventsAttended: 198
      },
      integrationUsage: {
        teamsAnnouncements: 0,
        slackPosts: 15,
        webexMeetings: 0
      }
    },
    trends: [
      { date: new Date('2024-09-01'), events: 3, attendees: 135, engagement: 72 },
      { date: new Date('2024-09-08'), events: 4, attendees: 180, engagement: 78 },
      { date: new Date('2024-09-15'), events: 3, attendees: 135, engagement: 75 },
      { date: new Date('2024-09-22'), events: 3, attendees: 135, engagement: 73 },
      { date: new Date('2024-09-29'), events: 2, attendees: 95, engagement: 68 }
    ]
  },

  // Global Consulting Partners (org-4) - Monthly analytics
  {
    organizationId: 'org-4',
    period: 'month',
    metrics: {
      totalEvents: 62,
      totalAttendees: 5840,
      averageAttendance: 94,
      eventsByType: {
        'Client Workshop': 18,
        'Internal Training': 15,
        'Leadership Meeting': 8,
        'Town Hall': 4,
        'Team Building': 6,
        'Conference': 11
      },
      eventsByDepartment: {
        'Strategy': 20,
        'Operations': 16,
        'Technology': 14,
        'Human Resources': 5,
        'Finance': 4,
        'Legal': 3
      },
      employeeEngagement: {
        activeEmployees: 365,
        eventsHosted: 62,
        eventsAttended: 1520
      },
      integrationUsage: {
        teamsAnnouncements: 58,
        slackPosts: 55,
        webexMeetings: 42
      }
    },
    trends: [
      { date: new Date('2024-09-01'), events: 12, attendees: 1150, engagement: 92 },
      { date: new Date('2024-09-08'), events: 15, attendees: 1425, engagement: 95 },
      { date: new Date('2024-09-15'), events: 13, attendees: 1235, engagement: 91 },
      { date: new Date('2024-09-22'), events: 14, attendees: 1330, engagement: 94 },
      { date: new Date('2024-09-29'), events: 8, attendees: 700, engagement: 87 }
    ]
  }
];
