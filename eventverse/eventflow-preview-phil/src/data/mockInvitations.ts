export interface OrganizationInvite {
  id: string;
  organizationId: string;
  organizationName: string;
  email: string;
  invitedBy: string;
  inviterName: string;
  role: 'admin' | 'member' | 'viewer' | 'check_in';
  jobTitle?: string;
  department?: string;
  inviteToken: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  message?: string;
}

export const mockInvitations: OrganizationInvite[] = [
  // Pending invitations
  {
    id: 'inv-1',
    organizationId: 'org-1',
    organizationName: 'TechCorp Inc.',
    email: 'newdeveloper@example.com',
    invitedBy: 'emp-2',
    inviterName: 'Michael Rodriguez',
    role: 'member',
    jobTitle: 'Junior Developer',
    department: 'Engineering',
    inviteToken: 'token-inv-1-abc123',
    status: 'pending',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date('2024-10-01'),
    message: 'Welcome to the Engineering team! We\'re excited to have you join us.'
  },
  {
    id: 'inv-2',
    organizationId: 'org-1',
    organizationName: 'TechCorp Inc.',
    email: 'salesrep@example.com',
    invitedBy: 'emp-5',
    inviterName: 'Lisa Anderson',
    role: 'member',
    jobTitle: 'Sales Representative',
    department: 'Sales',
    inviteToken: 'token-inv-2-def456',
    status: 'pending',
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-10-02'),
    message: 'Join our high-performing sales team!'
  },
  {
    id: 'inv-3',
    organizationId: 'org-2',
    organizationName: 'Elite Events & Co.',
    email: 'eventplanner@example.com',
    invitedBy: 'emp-30',
    inviterName: 'Alexandra Chen',
    role: 'member',
    jobTitle: 'Event Planner',
    department: 'Planning',
    inviteToken: 'token-inv-3-ghi789',
    status: 'pending',
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-09-30'),
    message: 'We\'d love for you to join our creative team!'
  },
  {
    id: 'inv-4',
    organizationId: 'org-2',
    organizationName: 'Elite Events & Co.',
    email: 'designer@example.com',
    invitedBy: 'emp-32',
    inviterName: 'Sofia Martinez',
    role: 'member',
    jobTitle: 'Graphic Designer',
    department: 'Design',
    inviteToken: 'token-inv-4-jkl012',
    status: 'pending',
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-10-01'),
    message: 'Your portfolio is amazing! Join our design team.'
  },
  {
    id: 'inv-5',
    organizationId: 'org-3',
    organizationName: 'StartupHub Ventures',
    email: 'analyst@example.com',
    invitedBy: 'emp-51',
    inviterName: 'Jennifer Lee',
    role: 'member',
    jobTitle: 'Investment Analyst',
    department: 'Investment',
    inviteToken: 'token-inv-5-mno345',
    status: 'pending',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-10-03'),
    message: 'Join us in funding the next unicorn!'
  },
  {
    id: 'inv-6',
    organizationId: 'org-4',
    organizationName: 'Global Consulting Partners',
    email: 'consultant@example.com',
    invitedBy: 'emp-71',
    inviterName: 'William Jackson',
    role: 'member',
    jobTitle: 'Management Consultant',
    department: 'Strategy',
    inviteToken: 'token-inv-6-pqr678',
    status: 'pending',
    expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-10-02')
  },
  {
    id: 'inv-7',
    organizationId: 'org-4',
    organizationName: 'Global Consulting Partners',
    email: 'admin@example.com',
    invitedBy: 'emp-70',
    inviterName: 'Elizabeth Thompson',
    role: 'admin',
    jobTitle: 'Office Manager',
    department: 'Operations',
    inviteToken: 'token-inv-7-stu901',
    status: 'pending',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-10-01'),
    message: 'We need an experienced admin to help manage our growing office.'
  },

  // Accepted invitations (historical)
  {
    id: 'inv-100',
    organizationId: 'org-1',
    organizationName: 'TechCorp Inc.',
    email: 'john.davis@techcorp.com',
    invitedBy: 'emp-2',
    inviterName: 'Michael Rodriguez',
    role: 'member',
    jobTitle: 'Senior Developer',
    department: 'Engineering',
    inviteToken: 'token-inv-100-accepted',
    status: 'accepted',
    expiresAt: new Date('2023-08-08'),
    acceptedAt: new Date('2023-08-01'),
    createdAt: new Date('2023-07-25')
  },
  {
    id: 'inv-101',
    organizationId: 'org-2',
    organizationName: 'Elite Events & Co.',
    email: 'david.park@eliteevents.com',
    invitedBy: 'emp-30',
    inviterName: 'Alexandra Chen',
    role: 'admin',
    jobTitle: 'COO',
    department: 'Operations',
    inviteToken: 'token-inv-101-accepted',
    status: 'accepted',
    expiresAt: new Date('2023-09-08'),
    acceptedAt: new Date('2023-09-01'),
    createdAt: new Date('2023-08-25')
  },
  {
    id: 'inv-102',
    organizationId: 'org-3',
    organizationName: 'StartupHub Ventures',
    email: 'jennifer.lee@startuphub.vc',
    invitedBy: 'emp-50',
    inviterName: 'Robert Chang',
    role: 'admin',
    jobTitle: 'General Partner',
    department: 'Investment',
    inviteToken: 'token-inv-102-accepted',
    status: 'accepted',
    expiresAt: new Date('2024-01-27'),
    acceptedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-13')
  },
  {
    id: 'inv-103',
    organizationId: 'org-4',
    organizationName: 'Global Consulting Partners',
    email: 'william.jackson@globalcp.com',
    invitedBy: 'emp-70',
    inviterName: 'Elizabeth Thompson',
    role: 'admin',
    jobTitle: 'Managing Director',
    department: 'Strategy',
    inviteToken: 'token-inv-103-accepted',
    status: 'accepted',
    expiresAt: new Date('2023-06-08'),
    acceptedAt: new Date('2023-06-01'),
    createdAt: new Date('2023-05-25')
  },

  // Expired invitations
  {
    id: 'inv-200',
    organizationId: 'org-1',
    organizationName: 'TechCorp Inc.',
    email: 'expired@example.com',
    invitedBy: 'emp-3',
    inviterName: 'Emma Watson',
    role: 'member',
    jobTitle: 'Marketing Coordinator',
    department: 'Marketing',
    inviteToken: 'token-inv-200-expired',
    status: 'expired',
    expiresAt: new Date('2024-09-15'),
    createdAt: new Date('2024-09-08'),
    message: 'Join our marketing team!'
  },
  {
    id: 'inv-201',
    organizationId: 'org-2',
    organizationName: 'Elite Events & Co.',
    email: 'noreply@example.com',
    invitedBy: 'emp-31',
    inviterName: 'David Park',
    role: 'viewer',
    jobTitle: 'Intern',
    department: 'Operations',
    inviteToken: 'token-inv-201-expired',
    status: 'expired',
    expiresAt: new Date('2024-09-20'),
    createdAt: new Date('2024-09-13')
  },
  {
    id: 'inv-202',
    organizationId: 'org-3',
    organizationName: 'StartupHub Ventures',
    email: 'oldcandidate@example.com',
    invitedBy: 'emp-50',
    inviterName: 'Robert Chang',
    role: 'member',
    jobTitle: 'Associate',
    department: 'Investment',
    inviteToken: 'token-inv-202-expired',
    status: 'expired',
    expiresAt: new Date('2024-08-01'),
    createdAt: new Date('2024-07-25')
  },

  // Cancelled invitations
  {
    id: 'inv-300',
    organizationId: 'org-1',
    organizationName: 'TechCorp Inc.',
    email: 'cancelled@example.com',
    invitedBy: 'emp-5',
    inviterName: 'Lisa Anderson',
    role: 'member',
    jobTitle: 'Sales Representative',
    department: 'Sales',
    inviteToken: 'token-inv-300-cancelled',
    status: 'cancelled',
    expiresAt: new Date('2024-10-10'),
    createdAt: new Date('2024-09-25'),
    message: 'Position filled internally.'
  },
  {
    id: 'inv-301',
    organizationId: 'org-4',
    organizationName: 'Global Consulting Partners',
    email: 'declined@example.com',
    invitedBy: 'emp-72',
    inviterName: 'Olivia Miller',
    role: 'member',
    jobTitle: 'Consultant',
    department: 'Operations',
    inviteToken: 'token-inv-301-cancelled',
    status: 'cancelled',
    expiresAt: new Date('2024-09-30'),
    createdAt: new Date('2024-09-20'),
    message: 'Candidate declined offer.'
  }
];
