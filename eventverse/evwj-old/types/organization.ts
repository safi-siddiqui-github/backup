export type OrganizationRole = "OWNER" | "ADMIN" | "MEMBER";
export type InviteMethod = "TEXT" | "EMAIL" | "LINK";

export interface OrganizationMember {
	id: string;
	userId: string;
	name: string;
	email: string;
	avatarUrl?: string;
	role: OrganizationRole;
	joinedAt: string;
	// Analytics for owners/admins
	eventsAttended?: number;
	totalSpent?: number;
	// Analytics for members (non-financial)
	pastOrgEvents?: number;
	upcomingOrgEvents?: number;
}

export interface Organization {
	id: string;
	name: string;
	description?: string;
	logoUrl?: string;
	email?: string;
	website?: string;
	isVerified: boolean;
	createdAt: string;
	role: OrganizationRole; // User's role in this org
	memberCount: number;
	members?: OrganizationMember[];
}

export interface OrganizationInvitation {
	id: string;
	organizationId: string;
	organization?: Organization;
	invitedBy?: {
		id: string;
		name: string;
		email: string;
	};
	email?: string;
	userId?: string;
	createdAt: string;
	status: "PENDING" | "ACCEPTED" | "DECLINED";
}

// Legacy types for backward compatibility
export type FullOrganization = Partial<Organization> & {
	createdBy?: {
		id?: number;
		firstname?: string | null;
		lastname?: string | null;
		email?: string | null;
	};
	members?: FullOrganizationMember[];
	invitations?: FullOrganizationInvitation[];
};

export type FullOrganizationMember = Partial<OrganizationMember> & {
	organization?: Partial<Organization>;
	user?: {
		id?: number;
		firstname?: string | null;
		lastname?: string | null;
		email?: string | null;
		username?: string | null;
	};
};

export type FullOrganizationInvitation = Partial<OrganizationInvitation> & {
	organization?: Partial<Organization>;
	invitedBy?: {
		id?: number;
		firstname?: string | null;
		lastname?: string | null;
		email?: string | null;
	};
	user?: {
		id?: number;
		firstname?: string | null;
		lastname?: string | null;
		email?: string | null;
		username?: string | null;
	};
};
