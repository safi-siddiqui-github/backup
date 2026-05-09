// Event-related types
export type EventType =
	| "Wedding"
	| "Cultural"
	| "Business"
	| "Personal"
	| "Wellness"
	| "Holiday"
	| "Educational"
	| "Corporate"
	| "Charity"
	| "Festival"
	| "Conference";

export type EventStatus =
	| "draft"
	| "published"
	| "active"
	| "completed"
	| "cancelled";

export type RSVPStatus =
	| "confirmed"
	| "pending"
	| "declined"
	| "attending"
	| "maybe";

export interface EventFormData {
	name: string;
	description: string;
	eventType: EventType;
	date: Date;
	startTime: string;
	endTime: string;
	location: string;
	capacity?: number;
	isPublic: boolean;
	requiresApproval: boolean;
	allowPlusOnes: boolean;
	maxPlusOnes: number;
	collectDietaryInfo: boolean;
	customFields: CustomEventField[];
	modules: string[];
}

export interface CustomEventField {
	id: string;
	name: string;
	type:
		| "text"
		| "email"
		| "phone"
		| "textarea"
		| "select"
		| "checkbox"
		| "date";
	required: boolean;
	options?: string[];
	placeholder?: string;
}

export interface EventData {
	id: string;
	name: string;
	description: string;
	type: EventType;
	date: Date;
	startTime: string;
	endTime: string;
	location: string;
	capacity?: number;
	status: EventStatus;
	hostId: string;
	createdAt: Date;
	updatedAt: Date;
	settings: EventSettings;
	rsvp?: RSVPData;
}

export interface EventSettings {
	isPublic: boolean;
	requiresApproval: boolean;
	allowPlusOnes: boolean;
	maxPlusOnes: number;
	collectDietaryInfo: boolean;
	enableCustomFields: boolean;
	moduleConfigurations: Record<string, ModuleConfiguration>;
}

export interface ModuleConfiguration {
	enabled: boolean;
	settings: Record<string, unknown>;
}

export interface RSVPData {
	status: RSVPStatus;
	responses?: Record<string, unknown>;
	dietary?: string;
	notes?: string;
	plusOnes?: number;
	plusOneNames?: string[];
}

export interface EventScheduleItem {
	id: string;
	eventId: string;
	title: string;
	description?: string;
	startTime: string;
	endTime: string;
	location?: string;
	type: "session" | "break" | "meal" | "activity" | "other";
	required: boolean;
}

export interface EventAnnouncement {
	id: string;
	eventId: string;
	title: string;
	message: string;
	priority: "low" | "medium" | "high" | "urgent";
	sentAt: Date;
	sentBy: string;
	readBy: string[];
}
