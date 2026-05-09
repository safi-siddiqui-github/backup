export interface OrganizationSettings {
  organizationId: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    customDomain?: string;
  };
  eventDefaults: {
    defaultVisibility: 'public' | 'organization_only' | 'private';
    requireApproval: boolean;
    allowExternalGuests: boolean;
    defaultModules: string[];
  };
  integrationSettings: {
    teams?: { defaultChannel: string; autoPost: boolean };
    slack?: { defaultChannel: string; autoPost: boolean };
    webex?: { defaultSpace: string; autoCreateMeeting: boolean };
  };
  notifications: {
    emailNotifications: boolean;
    slackNotifications: boolean;
    teamsNotifications: boolean;
  };
  permissions: {
    whoCanCreateEvents: 'owner' | 'admin' | 'all_members';
    whoCanInviteExternal: 'owner' | 'admin' | 'all_members';
    whoCanManageEmployees: 'owner' | 'admin';
  };
}

export const mockOrganizationSettings: OrganizationSettings[] = [
  // TechCorp Inc. (org-1)
  {
    organizationId: 'org-1',
    branding: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TechCorp',
      customDomain: 'events.techcorp.com'
    },
    eventDefaults: {
      defaultVisibility: 'organization_only',
      requireApproval: false,
      allowExternalGuests: true,
      defaultModules: ['rsvp', 'agenda', 'seating', 'check-in']
    },
    integrationSettings: {
      teams: {
        defaultChannel: 'general',
        autoPost: true
      },
      slack: {
        defaultChannel: 'company-events',
        autoPost: true
      },
      webex: {
        defaultSpace: 'All Company',
        autoCreateMeeting: false
      }
    },
    notifications: {
      emailNotifications: true,
      slackNotifications: true,
      teamsNotifications: true
    },
    permissions: {
      whoCanCreateEvents: 'all_members',
      whoCanInviteExternal: 'admin',
      whoCanManageEmployees: 'admin'
    }
  },

  // Elite Events & Co. (org-2)
  {
    organizationId: 'org-2',
    branding: {
      primaryColor: '#f59e0b',
      secondaryColor: '#ec4899',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Elite',
      customDomain: 'events.eliteevents.com'
    },
    eventDefaults: {
      defaultVisibility: 'private',
      requireApproval: true,
      allowExternalGuests: true,
      defaultModules: ['rsvp', 'agenda', 'seating', 'check-in', 'catering']
    },
    integrationSettings: {
      teams: {
        defaultChannel: 'team-events',
        autoPost: true
      },
      slack: {
        defaultChannel: 'company-events',
        autoPost: true
      }
    },
    notifications: {
      emailNotifications: true,
      slackNotifications: true,
      teamsNotifications: true
    },
    permissions: {
      whoCanCreateEvents: 'all_members',
      whoCanInviteExternal: 'all_members',
      whoCanManageEmployees: 'owner'
    }
  },

  // StartupHub Ventures (org-3)
  {
    organizationId: 'org-3',
    branding: {
      primaryColor: '#10b981',
      secondaryColor: '#3b82f6',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=StartupHub'
    },
    eventDefaults: {
      defaultVisibility: 'organization_only',
      requireApproval: false,
      allowExternalGuests: true,
      defaultModules: ['rsvp', 'agenda', 'networking']
    },
    integrationSettings: {
      slack: {
        defaultChannel: 'general',
        autoPost: true
      }
    },
    notifications: {
      emailNotifications: true,
      slackNotifications: true,
      teamsNotifications: false
    },
    permissions: {
      whoCanCreateEvents: 'admin',
      whoCanInviteExternal: 'admin',
      whoCanManageEmployees: 'owner'
    }
  },

  // Global Consulting Partners (org-4)
  {
    organizationId: 'org-4',
    branding: {
      primaryColor: '#1e40af',
      secondaryColor: '#059669',
      logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Global',
      customDomain: 'events.globalcp.com'
    },
    eventDefaults: {
      defaultVisibility: 'organization_only',
      requireApproval: true,
      allowExternalGuests: false,
      defaultModules: ['rsvp', 'agenda', 'check-in', 'surveys']
    },
    integrationSettings: {
      teams: {
        defaultChannel: 'all-company',
        autoPost: false
      },
      slack: {
        defaultChannel: 'all-company',
        autoPost: false
      },
      webex: {
        defaultSpace: 'Global Events',
        autoCreateMeeting: true
      }
    },
    notifications: {
      emailNotifications: true,
      slackNotifications: false,
      teamsNotifications: true
    },
    permissions: {
      whoCanCreateEvents: 'admin',
      whoCanInviteExternal: 'owner',
      whoCanManageEmployees: 'admin'
    }
  }
];
