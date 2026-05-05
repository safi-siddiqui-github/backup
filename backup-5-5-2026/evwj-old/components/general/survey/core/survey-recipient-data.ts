// Mock data for survey recipient options (groups and ticket tiers)

export type RecipientOption = {
	id: string;
	name: string;
	count: number;
	type: "group" | "ticket-tier";
};

// Mock groups (for events with RSVP groups)
export const SURVEY_GROUPS: RecipientOption[] = [
	{ id: "vip-guests", name: "VIP Guests", count: 45, type: "group" },
	{ id: "wedding-party", name: "Wedding Party", count: 12, type: "group" },
	{ id: "family-close-friends", name: "Family & Close Friends", count: 78, type: "group" },
	{ id: "general-guests", name: "General Guests", count: 115, type: "group" },
];

// Mock ticket tiers (for events with tickets)
export const SURVEY_TICKET_TIERS: RecipientOption[] = [
	{ id: "vip-ticket", name: "VIP Ticket", count: 30, type: "ticket-tier" },
	{ id: "general-admission", name: "General Admission", count: 180, type: "ticket-tier" },
	{ id: "early-bird", name: "Early Bird", count: 40, type: "ticket-tier" },
	{ id: "student-ticket", name: "Student Ticket", count: 25, type: "ticket-tier" },
];

// Combined options (for events that might have both)
export const SURVEY_ALL_RECIPIENTS: RecipientOption[] = [
	...SURVEY_GROUPS,
	...SURVEY_TICKET_TIERS,
];

