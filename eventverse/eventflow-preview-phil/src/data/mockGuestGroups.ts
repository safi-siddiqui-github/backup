export interface GuestGroup {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  type: 'department' | 'team' | 'custom' | 'integration_sync';
  members: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  integrationSource?: 'teams' | 'slack' | 'webex' | 'google_workspace';
  integrationId?: string;
}

export const mockGuestGroups: GuestGroup[] = [
  // TechCorp Inc. (org-1) - Department-based groups
  {
    id: 'group-1',
    organizationId: 'org-1',
    name: 'All Engineering',
    description: 'All members of the Engineering department',
    type: 'department',
    members: ['emp-1', 'emp-2', 'emp-4', ...Array.from({ length: 10 }, (_, i) => `emp-${100 + i}`)],
    createdBy: 'emp-1',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'group-2',
    organizationId: 'org-1',
    name: 'Sales Team',
    description: 'All sales representatives and managers',
    type: 'department',
    members: ['emp-5'],
    createdBy: 'emp-1',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-09-15')
  },
  {
    id: 'group-3',
    organizationId: 'org-1',
    name: 'Marketing Team',
    description: 'Marketing department members',
    type: 'department',
    members: ['emp-3'],
    createdBy: 'emp-1',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-09-20')
  },

  // TechCorp Inc. - Team-based groups
  {
    id: 'group-4',
    organizationId: 'org-1',
    name: 'Frontend Team',
    description: 'Frontend developers',
    type: 'team',
    members: ['emp-4', 'emp-100', 'emp-101', 'emp-102'],
    createdBy: 'emp-2',
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'group-5',
    organizationId: 'org-1',
    name: 'Backend Team',
    description: 'Backend and API developers',
    type: 'team',
    members: ['emp-103', 'emp-104', 'emp-105'],
    createdBy: 'emp-2',
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2024-09-28')
  },

  // TechCorp Inc. - Custom groups
  {
    id: 'group-6',
    organizationId: 'org-1',
    name: 'Leadership Circle',
    description: 'Executive team and department heads',
    type: 'custom',
    members: ['emp-1', 'emp-2', 'emp-3', 'emp-5'],
    createdBy: 'emp-1',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: 'group-7',
    organizationId: 'org-1',
    name: 'Product Launch Team',
    description: 'Cross-functional team for new product launch',
    type: 'custom',
    members: ['emp-2', 'emp-3', 'emp-4', 'emp-5'],
    createdBy: 'emp-1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-30')
  },

  // TechCorp Inc. - Integration-synced groups
  {
    id: 'group-8',
    organizationId: 'org-1',
    name: '#general',
    description: 'Microsoft Teams General Channel',
    type: 'integration_sync',
    members: ['emp-1', 'emp-2', 'emp-3', 'emp-4', 'emp-5', ...Array.from({ length: 10 }, (_, i) => `emp-${100 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'teams',
    integrationId: 'teams-channel-general'
  },
  {
    id: 'group-9',
    organizationId: 'org-1',
    name: '#engineering',
    description: 'Slack Engineering Channel',
    type: 'integration_sync',
    members: ['emp-2', 'emp-4', ...Array.from({ length: 10 }, (_, i) => `emp-${100 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'slack',
    integrationId: 'slack-channel-engineering'
  },

  // Elite Events & Co. (org-2) - Department-based groups
  {
    id: 'group-10',
    organizationId: 'org-2',
    name: 'Planning Department',
    description: 'Event planning team',
    type: 'department',
    members: ['emp-30', 'emp-33'],
    createdBy: 'emp-30',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-09-28')
  },
  {
    id: 'group-11',
    organizationId: 'org-2',
    name: 'Design Team',
    description: 'Creative design team',
    type: 'department',
    members: ['emp-32'],
    createdBy: 'emp-30',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-09-25')
  },
  {
    id: 'group-12',
    organizationId: 'org-2',
    name: 'Operations Team',
    description: 'Event operations and execution',
    type: 'department',
    members: ['emp-31', ...Array.from({ length: 10 }, (_, i) => `emp-${200 + i}`)],
    createdBy: 'emp-30',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-10-01')
  },

  // Elite Events & Co. - Integration-synced groups
  {
    id: 'group-13',
    organizationId: 'org-2',
    name: '#company-events',
    description: 'Slack channel for internal events',
    type: 'integration_sync',
    members: ['emp-30', 'emp-31', 'emp-32', 'emp-33', 'emp-34', ...Array.from({ length: 10 }, (_, i) => `emp-${200 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'slack',
    integrationId: 'slack-channel-events'
  },
  {
    id: 'group-14',
    organizationId: 'org-2',
    name: 'All Team',
    description: 'Microsoft Teams - All company members',
    type: 'integration_sync',
    members: ['emp-30', 'emp-31', 'emp-32', 'emp-33', 'emp-34', ...Array.from({ length: 10 }, (_, i) => `emp-${200 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'teams',
    integrationId: 'teams-channel-allteam'
  },

  // StartupHub Ventures (org-3) - Department-based groups
  {
    id: 'group-20',
    organizationId: 'org-3',
    name: 'Investment Team',
    description: 'Deal sourcing and investment professionals',
    type: 'department',
    members: ['emp-50', 'emp-51', 'emp-52', ...Array.from({ length: 10 }, (_, i) => `emp-${300 + i}`)],
    createdBy: 'emp-50',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'group-21',
    organizationId: 'org-3',
    name: 'Portfolio Team',
    description: 'Portfolio management and support',
    type: 'department',
    members: ['emp-53'],
    createdBy: 'emp-50',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-09-15')
  },

  // StartupHub Ventures - Integration-synced groups
  {
    id: 'group-22',
    organizationId: 'org-3',
    name: '#general',
    description: 'Slack general channel',
    type: 'integration_sync',
    members: ['emp-50', 'emp-51', 'emp-52', 'emp-53', 'emp-54', ...Array.from({ length: 10 }, (_, i) => `emp-${300 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'slack',
    integrationId: 'slack-channel-general-shv'
  },

  // Global Consulting Partners (org-4) - Department-based groups
  {
    id: 'group-30',
    organizationId: 'org-4',
    name: 'Strategy Consultants',
    description: 'Strategic consulting team',
    type: 'department',
    members: ['emp-70', 'emp-71', 'emp-73', ...Array.from({ length: 10 }, (_, i) => `emp-${400 + i}`)],
    createdBy: 'emp-70',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'group-31',
    organizationId: 'org-4',
    name: 'Operations Consultants',
    description: 'Operations consulting team',
    type: 'department',
    members: ['emp-72', ...Array.from({ length: 10 }, (_, i) => `emp-${410 + i}`)],
    createdBy: 'emp-70',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2024-09-30')
  },
  {
    id: 'group-32',
    organizationId: 'org-4',
    name: 'Technology Consultants',
    description: 'Technology consulting team',
    type: 'department',
    members: [...Array.from({ length: 10 }, (_, i) => `emp-${420 + i}`)],
    createdBy: 'emp-70',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2024-09-28')
  },

  // Global Consulting Partners - Custom groups
  {
    id: 'group-33',
    organizationId: 'org-4',
    name: 'Partners & Directors',
    description: 'Senior leadership team',
    type: 'custom',
    members: ['emp-70', 'emp-71', 'emp-72'],
    createdBy: 'emp-70',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2024-08-01')
  },

  // Global Consulting Partners - Integration-synced groups
  {
    id: 'group-34',
    organizationId: 'org-4',
    name: '#all-company',
    description: 'Slack all-company channel',
    type: 'integration_sync',
    members: ['emp-70', 'emp-71', 'emp-72', 'emp-73', 'emp-74', ...Array.from({ length: 30 }, (_, i) => `emp-${400 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'slack',
    integrationId: 'slack-channel-all-gcp'
  },
  {
    id: 'group-35',
    organizationId: 'org-4',
    name: 'All Hands Space',
    description: 'Webex All Hands meeting space',
    type: 'integration_sync',
    members: ['emp-70', 'emp-71', 'emp-72', 'emp-73', 'emp-74', ...Array.from({ length: 30 }, (_, i) => `emp-${400 + i}`)],
    createdBy: 'system',
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2024-10-04'),
    integrationSource: 'webex',
    integrationId: 'webex-space-allhands'
  }
];
