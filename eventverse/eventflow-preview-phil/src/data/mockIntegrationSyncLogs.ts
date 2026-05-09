export interface IntegrationSyncLog {
  id: string;
  organizationId: string;
  integrationType: 'microsoft_teams' | 'slack' | 'cisco_webex' | 'google_workspace';
  syncType: 'full' | 'incremental' | 'manual';
  status: 'success' | 'partial' | 'failed';
  usersAdded: number;
  usersUpdated: number;
  usersRemoved: number;
  errors: Array<{
    type: string;
    message: string;
    userId?: string;
  }>;
  startedAt: Date;
  completedAt: Date;
  duration: number;
}

export const mockIntegrationSyncLogs: IntegrationSyncLog[] = [
  // TechCorp Inc. (org-1) - Recent successful syncs
  {
    id: 'log-1',
    organizationId: 'org-1',
    integrationType: 'microsoft_teams',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 2,
    usersUpdated: 5,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T08:30:00'),
    completedAt: new Date('2024-10-04T08:32:15'),
    duration: 135
  },
  {
    id: 'log-2',
    organizationId: 'org-1',
    integrationType: 'slack',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 1,
    usersUpdated: 3,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T09:00:00'),
    completedAt: new Date('2024-10-04T09:01:45'),
    duration: 105
  },
  {
    id: 'log-3',
    organizationId: 'org-1',
    integrationType: 'google_workspace',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 2,
    usersUpdated: 4,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T07:00:00'),
    completedAt: new Date('2024-10-04T07:02:30'),
    duration: 150
  },
  {
    id: 'log-4',
    organizationId: 'org-1',
    integrationType: 'cisco_webex',
    syncType: 'full',
    status: 'partial',
    usersAdded: 0,
    usersUpdated: 2,
    usersRemoved: 0,
    errors: [
      {
        type: 'API_RATE_LIMIT',
        message: 'Rate limit exceeded, retrying in 60 seconds',
        userId: 'emp-100'
      }
    ],
    startedAt: new Date('2024-10-03T18:00:00'),
    completedAt: new Date('2024-10-03T18:05:22'),
    duration: 322
  },

  // TechCorp Inc. - Historical syncs
  {
    id: 'log-5',
    organizationId: 'org-1',
    integrationType: 'microsoft_teams',
    syncType: 'full',
    status: 'success',
    usersAdded: 0,
    usersUpdated: 248,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-03T08:30:00'),
    completedAt: new Date('2024-10-03T08:45:12'),
    duration: 912
  },
  {
    id: 'log-6',
    organizationId: 'org-1',
    integrationType: 'slack',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 3,
    usersUpdated: 7,
    usersRemoved: 1,
    errors: [],
    startedAt: new Date('2024-10-02T09:00:00'),
    completedAt: new Date('2024-10-02T09:02:33'),
    duration: 153
  },

  // Elite Events & Co. (org-2)
  {
    id: 'log-10',
    organizationId: 'org-2',
    integrationType: 'microsoft_teams',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 1,
    usersUpdated: 2,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T08:00:00'),
    completedAt: new Date('2024-10-04T08:01:20'),
    duration: 80
  },
  {
    id: 'log-11',
    organizationId: 'org-2',
    integrationType: 'slack',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 1,
    usersUpdated: 1,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T08:30:00'),
    completedAt: new Date('2024-10-04T08:31:05'),
    duration: 65
  },
  {
    id: 'log-12',
    organizationId: 'org-2',
    integrationType: 'microsoft_teams',
    syncType: 'full',
    status: 'success',
    usersAdded: 0,
    usersUpdated: 44,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-03T08:00:00'),
    completedAt: new Date('2024-10-03T08:08:15'),
    duration: 495
  },

  // StartupHub Ventures (org-3)
  {
    id: 'log-20',
    organizationId: 'org-3',
    integrationType: 'slack',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 0,
    usersUpdated: 1,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T09:00:00'),
    completedAt: new Date('2024-10-04T09:00:45'),
    duration: 45
  },
  {
    id: 'log-21',
    organizationId: 'org-3',
    integrationType: 'slack',
    syncType: 'full',
    status: 'success',
    usersAdded: 0,
    usersUpdated: 28,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-03T09:00:00'),
    completedAt: new Date('2024-10-03T09:04:30'),
    duration: 270
  },
  {
    id: 'log-22',
    organizationId: 'org-3',
    integrationType: 'slack',
    syncType: 'manual',
    status: 'success',
    usersAdded: 2,
    usersUpdated: 5,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-09-30T14:30:00'),
    completedAt: new Date('2024-09-30T14:31:22'),
    duration: 82
  },

  // Global Consulting Partners (org-4)
  {
    id: 'log-30',
    organizationId: 'org-4',
    integrationType: 'microsoft_teams',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 3,
    usersUpdated: 7,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T07:30:00'),
    completedAt: new Date('2024-10-04T07:33:45'),
    duration: 225
  },
  {
    id: 'log-31',
    organizationId: 'org-4',
    integrationType: 'slack',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 2,
    usersUpdated: 5,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T08:00:00'),
    completedAt: new Date('2024-10-04T08:02:18'),
    duration: 138
  },
  {
    id: 'log-32',
    organizationId: 'org-4',
    integrationType: 'cisco_webex',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 1,
    usersUpdated: 4,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T07:00:00'),
    completedAt: new Date('2024-10-04T07:02:55'),
    duration: 175
  },
  {
    id: 'log-33',
    organizationId: 'org-4',
    integrationType: 'google_workspace',
    syncType: 'incremental',
    status: 'success',
    usersAdded: 3,
    usersUpdated: 6,
    usersRemoved: 0,
    errors: [],
    startedAt: new Date('2024-10-04T06:30:00'),
    completedAt: new Date('2024-10-04T06:33:12'),
    duration: 192
  },

  // Failed sync example
  {
    id: 'log-40',
    organizationId: 'org-1',
    integrationType: 'cisco_webex',
    syncType: 'manual',
    status: 'failed',
    usersAdded: 0,
    usersUpdated: 0,
    usersRemoved: 0,
    errors: [
      {
        type: 'AUTHENTICATION_ERROR',
        message: 'OAuth token expired. Please reconnect the integration.'
      },
      {
        type: 'CONNECTION_TIMEOUT',
        message: 'Failed to connect to Webex API after 3 retries'
      }
    ],
    startedAt: new Date('2024-09-28T10:00:00'),
    completedAt: new Date('2024-09-28T10:05:00'),
    duration: 300
  },

  // Partial success example
  {
    id: 'log-41',
    organizationId: 'org-4',
    integrationType: 'slack',
    syncType: 'full',
    status: 'partial',
    usersAdded: 350,
    usersUpdated: 20,
    usersRemoved: 2,
    errors: [
      {
        type: 'USER_NOT_FOUND',
        message: 'User no longer exists in Slack workspace',
        userId: 'emp-425'
      },
      {
        type: 'PERMISSION_DENIED',
        message: 'Insufficient permissions to read user details',
        userId: 'emp-426'
      },
      {
        type: 'INVALID_EMAIL',
        message: 'Email format invalid',
        userId: 'emp-427'
      }
    ],
    startedAt: new Date('2024-10-01T02:00:00'),
    completedAt: new Date('2024-10-01T02:18:42'),
    duration: 1122
  }
];
