export type EventRole = "host" | "event_planner" | "event_staff";

export type TeamMemberStatus = "pending" | "accepted" | "declined";

// Module types for permissions
export type EventModule = 
  | "tickets" 
  | "rsvp" 
  | "checkin" 
  | "surveys" 
  | "schedule" 
  | "gallery" 
  | "analytics"
  | "communications"
  | "vendors";

export type ModulePermission = "view" | "admin";

export interface ModulePermissions {
  [module: string]: ModulePermission;
}

export interface EventTeamMember {
	id: string;
	eventId: string;
	userId?: string;
	email: string;
	role?: EventRole; // Optional, for backward compatibility
	modulePermissions?: ModulePermissions; // New: per-module permissions
	invitedBy: string;
	invitedAt: Date;
	status: TeamMemberStatus;
	acceptedAt?: Date;
	name?: string;
}

export interface RolePermissions {
	canEditPayment: boolean;
	canEditDates: boolean;
	canEditLocation: boolean;
	canDeleteEvent: boolean;
	canManageTeam: boolean;
	canEditDetails: boolean;
	canManageModules: boolean;
	canManageGuests: boolean;
	canManageVendors: boolean;
	canSendAnnouncements: boolean;
	canCheckIn: boolean;
	canViewAll: boolean;
}

export const ROLE_PERMISSIONS: Record<EventRole, RolePermissions> = {
	host: {
		canEditPayment: true,
		canEditDates: true,
		canEditLocation: true,
		canDeleteEvent: true,
		canManageTeam: true,
		canEditDetails: true,
		canManageModules: true,
		canManageGuests: true,
		canManageVendors: true,
		canSendAnnouncements: true,
		canCheckIn: true,
		canViewAll: true,
	},
	event_planner: {
		canEditPayment: false,
		canEditDates: false,
		canEditLocation: false,
		canDeleteEvent: false,
		canManageTeam: false,
		canEditDetails: true,
		canManageModules: true,
		canManageGuests: true,
		canManageVendors: true,
		canSendAnnouncements: true,
		canCheckIn: true,
		canViewAll: true,
	},
	event_staff: {
		canEditPayment: false,
		canEditDates: false,
		canEditLocation: false,
		canDeleteEvent: false,
		canManageTeam: false,
		canEditDetails: false,
		canManageModules: false,
		canManageGuests: false,
		canManageVendors: false,
		canSendAnnouncements: false,
		canCheckIn: true,
		canViewAll: true,
	},
};

export const ROLE_DESCRIPTIONS: Record<EventRole, string> = {
	host: "Full access to all event features and settings",
	event_planner:
		"Full operational access except payment details, dates, times, and location",
	event_staff: "View guest lists, RSVP, vendors, and check-in guests",
};

export const ROLE_LABELS: Record<EventRole, string> = {
	host: "Host",
	event_planner: "Event Planner",
	event_staff: "Event Staff",
};

// Module display info
export const MODULE_LABELS: Record<EventModule, string> = {
  tickets: "Tickets",
  rsvp: "RSVP",
  checkin: "Check-in",
  surveys: "Surveys",
  schedule: "Schedule",
  gallery: "Gallery",
  analytics: "Analytics",
  communications: "Communications",
  vendors: "Vendors",
};

export const MODULE_DESCRIPTIONS: Record<EventModule, string> = {
  tickets: "Manage ticket sales and pricing",
  rsvp: "Handle guest RSVPs and responses",
  checkin: "Scan tickets and check in guests",
  surveys: "Create and manage event surveys",
  schedule: "Manage event schedule and sessions",
  gallery: "Upload and manage event photos",
  analytics: "View event analytics and reports",
  communications: "Send announcements and messages",
  vendors: "Manage vendor relationships",
};
