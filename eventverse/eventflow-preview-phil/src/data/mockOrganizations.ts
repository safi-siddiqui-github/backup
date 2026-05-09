export interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartment: string;
  employeeCount: number;
  color?: string;
}

export interface OrganizationIntegration {
  id: string;
  integrationType: 
    | 'microsoft_teams' 
    | 'slack' 
    | 'cisco_webex' 
    | 'google_workspace'
    | 'zoom'
    | 'discord'
    | 'microsoft_365'
    | 'okta';
  status: 'active' | 'inactive' | 'error' | 'pending_auth';
  connectedAt: Date;
  lastSyncAt: Date;
  settings: {
    name?: string;
    autoAddEmployees: boolean;
    syncFrequency: 'hourly' | 'daily' | 'weekly' | 'manual';
    removeOnDelete: boolean;
    syncProfilePhotos?: boolean;
    includeGuestUsers?: boolean;
    notificationEmail?: string;
    apiKey?: string;
    webhookUrl?: string;
    tenantId?: string;
    workspaceUrl?: string;
  };
  stats: {
    totalSynced: number;
    lastSyncUsersAdded: number;
    lastSyncUsersUpdated: number;
    errors: number;
  };
  credentials?: {
    type: 'oauth' | 'api_key' | 'service_account';
    lastRefreshed?: Date;
    expiresAt?: Date;
  };
  permissions?: string[];
}

export interface Organization {
  id: string;
  businessName: string;
  businessType: 'small_business' | 'enterprise' | 'corporation';
  industry: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  taxId: string;
  logoUrl: string;
  website: string;
  verificationStatus: 'pending' | 'in_review' | 'verified' | 'rejected';
  verifiedBadge: boolean;
  verifiedAt?: Date;
  subscriptionTier: 'business' | 'enterprise' | 'unlimited';
  maxEmployees: number;
  currentEmployeeCount: number;
  createdBy: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  departments: Department[];
  integrations: OrganizationIntegration[];
}

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    businessName: 'TechCorp Inc.',
    businessType: 'enterprise',
    industry: 'Technology/Software',
    businessEmail: 'contact@techcorp.com',
    businessPhone: '+1 (555) 100-2000',
    businessAddress: {
      street: '123 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      postalCode: '94105'
    },
    taxId: 'XX-XXXXXXX',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TechCorp',
    website: 'https://techcorp.com',
    verificationStatus: 'verified',
    verifiedBadge: true,
    verifiedAt: new Date('2024-01-15'),
    subscriptionTier: 'enterprise',
    maxEmployees: 500,
    currentEmployeeCount: 250,
    createdBy: 'user-1',
    ownerId: 'user-1',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-10-01'),
    description: 'Leading enterprise software solutions provider',
    departments: [
      { id: 'dept-1', name: 'Engineering', description: 'Product development', headOfDepartment: 'emp-2', employeeCount: 80, color: '#3b82f6' },
      { id: 'dept-2', name: 'Sales', description: 'Revenue generation', headOfDepartment: 'emp-5', employeeCount: 45, color: '#10b981' },
      { id: 'dept-3', name: 'Marketing', description: 'Brand and growth', headOfDepartment: 'emp-8', employeeCount: 30, color: '#f59e0b' },
      { id: 'dept-4', name: 'Human Resources', description: 'People operations', headOfDepartment: 'emp-12', employeeCount: 15, color: '#8b5cf6' },
      { id: 'dept-5', name: 'Finance', description: 'Financial operations', headOfDepartment: 'emp-15', employeeCount: 20, color: '#ef4444' },
      { id: 'dept-6', name: 'Product', description: 'Product management', headOfDepartment: 'emp-18', employeeCount: 25, color: '#ec4899' },
      { id: 'dept-7', name: 'Customer Success', description: 'Client support', headOfDepartment: 'emp-22', employeeCount: 35, color: '#14b8a6' }
    ],
    integrations: [
      {
        id: 'int-1',
        integrationType: 'microsoft_teams',
        status: 'active',
        connectedAt: new Date('2023-07-01'),
        lastSyncAt: new Date('2024-10-04T08:30:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: true
        },
        stats: {
          totalSynced: 250,
          lastSyncUsersAdded: 2,
          lastSyncUsersUpdated: 5,
          errors: 0
        }
      },
      {
        id: 'int-2',
        integrationType: 'slack',
        status: 'active',
        connectedAt: new Date('2023-07-15'),
        lastSyncAt: new Date('2024-10-04T09:00:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: false
        },
        stats: {
          totalSynced: 248,
          lastSyncUsersAdded: 1,
          lastSyncUsersUpdated: 3,
          errors: 0
        }
      },
      {
        id: 'int-3',
        integrationType: 'cisco_webex',
        status: 'active',
        connectedAt: new Date('2023-08-01'),
        lastSyncAt: new Date('2024-10-03T18:00:00'),
        settings: {
          autoAddEmployees: false,
          syncFrequency: 'weekly',
          removeOnDelete: false
        },
        stats: {
          totalSynced: 220,
          lastSyncUsersAdded: 0,
          lastSyncUsersUpdated: 2,
          errors: 1
        }
      },
      {
        id: 'int-4',
        integrationType: 'google_workspace',
        status: 'active',
        connectedAt: new Date('2023-09-01'),
        lastSyncAt: new Date('2024-10-04T07:00:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: true
        },
        stats: {
          totalSynced: 250,
          lastSyncUsersAdded: 2,
          lastSyncUsersUpdated: 4,
          errors: 0
        }
      }
    ]
  },
  {
    id: 'org-2',
    businessName: 'Elite Events & Co.',
    businessType: 'small_business',
    industry: 'Event Planning',
    businessEmail: 'hello@eliteevents.com',
    businessPhone: '+1 (555) 200-3000',
    businessAddress: {
      street: '456 Celebration Avenue',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      postalCode: '10001'
    },
    taxId: 'XX-XXXXXXX',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Elite',
    website: 'https://eliteevents.com',
    verificationStatus: 'verified',
    verifiedBadge: true,
    verifiedAt: new Date('2024-02-20'),
    subscriptionTier: 'business',
    maxEmployees: 50,
    currentEmployeeCount: 45,
    createdBy: 'user-2',
    ownerId: 'user-2',
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-09-28'),
    description: 'Premium event planning and management services',
    departments: [
      { id: 'dept-8', name: 'Planning', description: 'Event planning team', headOfDepartment: 'emp-30', employeeCount: 15, color: '#f59e0b' },
      { id: 'dept-9', name: 'Design', description: 'Creative design', headOfDepartment: 'emp-33', employeeCount: 10, color: '#ec4899' },
      { id: 'dept-10', name: 'Operations', description: 'Event execution', headOfDepartment: 'emp-36', employeeCount: 12, color: '#3b82f6' },
      { id: 'dept-11', name: 'Client Services', description: 'Customer relations', headOfDepartment: 'emp-40', employeeCount: 8, color: '#10b981' }
    ],
    integrations: [
      {
        id: 'int-5',
        integrationType: 'microsoft_teams',
        status: 'active',
        connectedAt: new Date('2023-09-01'),
        lastSyncAt: new Date('2024-10-04T08:00:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: true
        },
        stats: {
          totalSynced: 45,
          lastSyncUsersAdded: 1,
          lastSyncUsersUpdated: 2,
          errors: 0
        }
      },
      {
        id: 'int-6',
        integrationType: 'slack',
        status: 'active',
        connectedAt: new Date('2023-09-05'),
        lastSyncAt: new Date('2024-10-04T08:30:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: false
        },
        stats: {
          totalSynced: 45,
          lastSyncUsersAdded: 1,
          lastSyncUsersUpdated: 1,
          errors: 0
        }
      }
    ]
  },
  {
    id: 'org-3',
    businessName: 'StartupHub Ventures',
    businessType: 'small_business',
    industry: 'Venture Capital',
    businessEmail: 'info@startuphub.vc',
    businessPhone: '+1 (555) 300-4000',
    businessAddress: {
      street: '789 Innovation Boulevard',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      postalCode: '78701'
    },
    taxId: 'XX-XXXXXXX',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=StartupHub',
    website: 'https://startuphub.vc',
    verificationStatus: 'pending',
    verifiedBadge: false,
    subscriptionTier: 'business',
    maxEmployees: 50,
    currentEmployeeCount: 28,
    createdBy: 'user-3',
    ownerId: 'user-3',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-10-01'),
    description: 'Early-stage venture capital firm',
    departments: [
      { id: 'dept-12', name: 'Investment', description: 'Deal sourcing', headOfDepartment: 'emp-50', employeeCount: 10, color: '#10b981' },
      { id: 'dept-13', name: 'Portfolio Management', description: 'Portfolio support', headOfDepartment: 'emp-53', employeeCount: 8, color: '#3b82f6' },
      { id: 'dept-14', name: 'Operations', description: 'Firm operations', headOfDepartment: 'emp-56', employeeCount: 10, color: '#8b5cf6' }
    ],
    integrations: [
      {
        id: 'int-7',
        integrationType: 'slack',
        status: 'active',
        connectedAt: new Date('2024-01-20'),
        lastSyncAt: new Date('2024-10-04T09:00:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: false
        },
        stats: {
          totalSynced: 28,
          lastSyncUsersAdded: 0,
          lastSyncUsersUpdated: 1,
          errors: 0
        }
      }
    ]
  },
  {
    id: 'org-4',
    businessName: 'Global Consulting Partners',
    businessType: 'enterprise',
    industry: 'Management Consulting',
    businessEmail: 'contact@globalcp.com',
    businessPhone: '+1 (555) 400-5000',
    businessAddress: {
      street: '1000 Business Park Drive',
      city: 'Chicago',
      state: 'IL',
      country: 'United States',
      postalCode: '60601'
    },
    taxId: 'XX-XXXXXXX',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Global',
    website: 'https://globalcp.com',
    verificationStatus: 'verified',
    verifiedBadge: true,
    verifiedAt: new Date('2023-12-10'),
    subscriptionTier: 'enterprise',
    maxEmployees: 500,
    currentEmployeeCount: 380,
    createdBy: 'user-4',
    ownerId: 'user-4',
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2024-09-30'),
    description: 'Leading management consulting firm',
    departments: [
      { id: 'dept-15', name: 'Strategy', description: 'Strategic consulting', headOfDepartment: 'emp-70', employeeCount: 90, color: '#3b82f6' },
      { id: 'dept-16', name: 'Operations', description: 'Operations consulting', headOfDepartment: 'emp-75', employeeCount: 80, color: '#10b981' },
      { id: 'dept-17', name: 'Technology', description: 'Tech consulting', headOfDepartment: 'emp-80', employeeCount: 70, color: '#8b5cf6' },
      { id: 'dept-18', name: 'Human Resources', description: 'People ops', headOfDepartment: 'emp-85', employeeCount: 30, color: '#f59e0b' },
      { id: 'dept-19', name: 'Finance', description: 'Finance team', headOfDepartment: 'emp-90', employeeCount: 40, color: '#ef4444' },
      { id: 'dept-20', name: 'Legal', description: 'Legal counsel', headOfDepartment: 'emp-95', employeeCount: 25, color: '#06b6d4' },
      { id: 'dept-21', name: 'Marketing', description: 'Marketing team', headOfDepartment: 'emp-100', employeeCount: 45, color: '#ec4899' }
    ],
    integrations: [
      {
        id: 'int-8',
        integrationType: 'microsoft_teams',
        status: 'active',
        connectedAt: new Date('2023-06-01'),
        lastSyncAt: new Date('2024-10-04T07:30:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: true
        },
        stats: {
          totalSynced: 380,
          lastSyncUsersAdded: 3,
          lastSyncUsersUpdated: 7,
          errors: 0
        }
      },
      {
        id: 'int-9',
        integrationType: 'slack',
        status: 'active',
        connectedAt: new Date('2023-06-15'),
        lastSyncAt: new Date('2024-10-04T08:00:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: false
        },
        stats: {
          totalSynced: 375,
          lastSyncUsersAdded: 2,
          lastSyncUsersUpdated: 5,
          errors: 0
        }
      },
      {
        id: 'int-10',
        integrationType: 'cisco_webex',
        status: 'active',
        connectedAt: new Date('2023-07-01'),
        lastSyncAt: new Date('2024-10-04T07:00:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: true
        },
        stats: {
          totalSynced: 370,
          lastSyncUsersAdded: 1,
          lastSyncUsersUpdated: 4,
          errors: 0
        }
      },
      {
        id: 'int-11',
        integrationType: 'google_workspace',
        status: 'active',
        connectedAt: new Date('2023-08-01'),
        lastSyncAt: new Date('2024-10-04T06:30:00'),
        settings: {
          autoAddEmployees: true,
          syncFrequency: 'daily',
          removeOnDelete: true
        },
        stats: {
          totalSynced: 380,
          lastSyncUsersAdded: 3,
          lastSyncUsersUpdated: 6,
          errors: 0
        }
      }
    ]
  }
];
