import type { Organization, OrganizationMember, OrganizationInvitation } from "@/types/organization";

// Mock organization members with analytics
export const MOCK_ORGANIZATION_MEMBERS: Record<string, OrganizationMember[]> = {
	// Acme Corporation members
	"org-1": [
		{
			id: "member-1",
			userId: "user-1",
			name: "John Smith",
			email: "john.smith@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=1",
			role: "OWNER",
			joinedAt: "2023-01-15T00:00:00Z",
			eventsAttended: 12,
			totalSpent: 2450.00,
			pastOrgEvents: 12,
			upcomingOrgEvents: 3,
		},
		{
			id: "member-2",
			userId: "user-2",
			name: "Sarah Johnson",
			email: "sarah.johnson@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=2",
			role: "ADMIN",
			joinedAt: "2023-02-20T00:00:00Z",
			eventsAttended: 10,
			totalSpent: 1890.00,
			pastOrgEvents: 10,
			upcomingOrgEvents: 4,
		},
		{
			id: "member-3",
			userId: "user-3",
			name: "Michael Brown",
			email: "michael.brown@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=3",
			role: "MEMBER",
			joinedAt: "2023-03-10T00:00:00Z",
			eventsAttended: 8,
			totalSpent: 1250.00,
			pastOrgEvents: 8,
			upcomingOrgEvents: 2,
		},
		{
			id: "member-4",
			userId: "user-4",
			name: "Emily Davis",
			email: "emily.davis@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=4",
			role: "MEMBER",
			joinedAt: "2023-04-05T00:00:00Z",
			eventsAttended: 5,
			totalSpent: 750.00,
			pastOrgEvents: 5,
			upcomingOrgEvents: 1,
		},
		{
			id: "member-5",
			userId: "user-5",
			name: "David Wilson",
			email: "david.wilson@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=5",
			role: "MEMBER",
			joinedAt: "2023-05-12T00:00:00Z",
			eventsAttended: 3,
			totalSpent: 450.00,
			pastOrgEvents: 3,
			upcomingOrgEvents: 0,
		},
	],
	// TechStartup Inc members
	"org-2": [
		{
			id: "member-6",
			userId: "user-6",
			name: "Robert Taylor",
			email: "robert.taylor@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=6",
			role: "OWNER",
			joinedAt: "2023-06-01T00:00:00Z",
			eventsAttended: 15,
			totalSpent: 3200.00,
			pastOrgEvents: 15,
			upcomingOrgEvents: 5,
		},
		{
			id: "member-7",
			userId: "user-1", // Current user (John Smith) as member
			name: "John Smith",
			email: "john.smith@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=1",
			role: "ADMIN",
			joinedAt: "2023-06-15T00:00:00Z",
			eventsAttended: 9,
			totalSpent: 0, // Members don't see financial data
			pastOrgEvents: 9,
			upcomingOrgEvents: 3,
		},
		{
			id: "member-8",
			userId: "user-7",
			name: "Jessica Martinez",
			email: "jessica.martinez@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=7",
			role: "MEMBER",
			joinedAt: "2023-07-01T00:00:00Z",
			eventsAttended: 6,
			totalSpent: 0,
			pastOrgEvents: 6,
			upcomingOrgEvents: 2,
		},
	],
	// Creative Events Group members
	"org-3": [
		{
			id: "member-9",
			userId: "user-9",
			name: "Lisa Anderson",
			email: "lisa.anderson@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=9",
			role: "OWNER",
			joinedAt: "2023-08-15T00:00:00Z",
			eventsAttended: 8,
			totalSpent: 2100.00,
			pastOrgEvents: 8,
			upcomingOrgEvents: 2,
		},
		{
			id: "member-10",
			userId: "user-10",
			name: "James Wilson",
			email: "james.wilson@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=10",
			role: "ADMIN",
			joinedAt: "2023-08-20T00:00:00Z",
			eventsAttended: 6,
			totalSpent: 1500.00,
			pastOrgEvents: 6,
			upcomingOrgEvents: 1,
		},
		{
			id: "member-11",
			userId: "user-11",
			name: "Maria Garcia",
			email: "maria.garcia@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=11",
			role: "MEMBER",
			joinedAt: "2023-09-01T00:00:00Z",
			eventsAttended: 4,
			totalSpent: 800.00,
			pastOrgEvents: 4,
			upcomingOrgEvents: 1,
		},
		{
			id: "member-12",
			userId: "user-12",
			name: "Thomas Lee",
			email: "thomas.lee@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=12",
			role: "MEMBER",
			joinedAt: "2023-09-10T00:00:00Z",
			eventsAttended: 3,
			totalSpent: 600.00,
			pastOrgEvents: 3,
			upcomingOrgEvents: 0,
		},
		{
			id: "member-13",
			userId: "user-13",
			name: "Jennifer White",
			email: "jennifer.white@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=13",
			role: "MEMBER",
			joinedAt: "2023-09-15T00:00:00Z",
			eventsAttended: 2,
			totalSpent: 400.00,
			pastOrgEvents: 2,
			upcomingOrgEvents: 1,
		},
		{
			id: "member-14",
			userId: "user-14",
			name: "Christopher Moore",
			email: "christopher.moore@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=14",
			role: "MEMBER",
			joinedAt: "2023-09-20T00:00:00Z",
			eventsAttended: 1,
			totalSpent: 200.00,
			pastOrgEvents: 1,
			upcomingOrgEvents: 0,
		},
		{
			id: "member-15",
			userId: "user-15",
			name: "Amanda Harris",
			email: "amanda.harris@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=15",
			role: "MEMBER",
			joinedAt: "2023-09-25T00:00:00Z",
			eventsAttended: 0,
			totalSpent: 0.00,
			pastOrgEvents: 0,
			upcomingOrgEvents: 1,
		},
		{
			id: "member-16",
			userId: "user-16",
			name: "Daniel Clark",
			email: "daniel.clark@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=16",
			role: "MEMBER",
			joinedAt: "2023-10-01T00:00:00Z",
			eventsAttended: 0,
			totalSpent: 0.00,
			pastOrgEvents: 0,
			upcomingOrgEvents: 0,
		},
	],
};

// Mock organizations
export const MOCK_ORGANIZATIONS: (Organization & {
	pastEventsCount?: number;
	upcomingEventsCount?: number;
})[] = [
	{
		id: "org-1",
		name: "Acme Corporation",
		description: "A leading technology company specializing in innovative solutions.",
		logoUrl: "https://ui-avatars.com/api/?name=Acme+Corporation&background=6366f1&color=fff&size=128",
		email: "contact@acmecorp.com",
		website: "https://acmecorp.com",
		isVerified: true,
		createdAt: "2023-01-10T00:00:00Z",
		role: "OWNER",
		memberCount: 5,
		members: MOCK_ORGANIZATION_MEMBERS["org-1"],
		pastEventsCount: 12,
		upcomingEventsCount: 3,
	},
	{
		id: "org-2",
		name: "TechStartup Inc",
		description: "Building the future of technology, one event at a time.",
		logoUrl: "https://ui-avatars.com/api/?name=TechStartup+Inc&background=8b5cf6&color=fff&size=128",
		email: "hello@techstartup.com",
		website: "https://techstartup.com",
		isVerified: true,
		createdAt: "2023-05-20T00:00:00Z",
		role: "ADMIN",
		memberCount: 3,
		members: MOCK_ORGANIZATION_MEMBERS["org-2"],
		pastEventsCount: 15,
		upcomingEventsCount: 5,
	},
	{
		id: "org-3",
		name: "Creative Events Group",
		description: "Bringing creative minds together through exceptional events.",
		logoUrl: "https://ui-avatars.com/api/?name=Creative+Events+Group&background=ec4899&color=fff&size=128",
		email: "info@creativeevents.com",
		isVerified: false,
		createdAt: "2023-08-15T00:00:00Z",
		role: "MEMBER",
		memberCount: 8,
		members: MOCK_ORGANIZATION_MEMBERS["org-3"],
		pastEventsCount: 8,
		upcomingEventsCount: 2,
	},
];

// Mock pending invitations
export const MOCK_PENDING_INVITATIONS: OrganizationInvitation[] = [
	{
		id: "inv-1",
		organizationId: "org-4",
		organization: {
			id: "org-4",
			name: "Global Business Network",
			logoUrl: "https://ui-avatars.com/api/?name=Global+Business+Network&background=10b981&color=fff&size=128",
			isVerified: true,
			createdAt: "2023-09-01T00:00:00Z",
			role: "MEMBER",
			memberCount: 15,
		},
		invitedBy: {
			id: "user-8",
			name: "Alex Thompson",
			email: "alex.thompson@example.com",
		},
		createdAt: "2024-01-10T00:00:00Z",
		status: "PENDING",
	},
];

// Helper functions
export const getOrganizationsByRole = (role: "OWNER" | "ADMIN" | "MEMBER"): Organization[] => {
	return MOCK_ORGANIZATIONS.filter((org) => org.role === role);
};

export const getOwnedOrganizations = (): Organization[] => {
	return MOCK_ORGANIZATIONS.filter((org) => org.role === "OWNER");
};

export const getMemberOrganizations = (): Organization[] => {
	return MOCK_ORGANIZATIONS.filter((org) => org.role === "ADMIN" || org.role === "MEMBER");
};

export const getOrganizationById = (id: string): Organization | undefined => {
	return MOCK_ORGANIZATIONS.find((org) => org.id === id);
};

export const getOrganizationMembers = (organizationId: string): OrganizationMember[] => {
	// Return members for the organization, or default mock data if not found
	const members = MOCK_ORGANIZATION_MEMBERS[organizationId];
	if (members && members.length > 0) {
		return members;
	}
	
	// Return default mock members if organization has no members
	return [
		{
			id: `member-default-${organizationId}-1`,
			userId: `user-default-${organizationId}-1`,
			name: "Sample Member",
			email: "sample.member@example.com",
			avatarUrl: "https://i.pravatar.cc/150?img=20",
			role: "MEMBER",
			joinedAt: new Date().toISOString(),
			eventsAttended: 0,
			totalSpent: 0,
			pastOrgEvents: 0,
			upcomingOrgEvents: 0,
		},
	];
};

