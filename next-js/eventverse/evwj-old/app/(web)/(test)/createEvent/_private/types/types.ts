export type SectionId = "details" | "photos" | "modules" | "optional";

export type EventFormData = {
	// Basic Details
	visibility: "public" | "private" | "org_members_only";
	eventName: string;
	eventType: string;
	description: string;
	organizationId?: number | null;

	// Vendor booth settings
	//   vendorBoothSettings?: import('@/types/venue').VendorBoothSettings;
	vendorBoothSettings?: VendorBoothSettings;
	descriptionBlocks?: Array<{
		id: string;
		type: "text" | "image" | "video";
		content: string;
		order: number;
	}>;
	theme: {
		primaryColor: string;
		secondaryColor: string;
		accentColor?: string;
		logo?: string;
		template?: string;
		effects?: string[];
		mood?: string;
		generatedName?: string;
	};

	// Enhanced Date & Time Management
	eventDates: {
		isMultiDay: boolean;
		startDate: Date | null;
		endDate: Date | null;
		startTime?: string;
		endTime?: string;
		timezone: string;
		sessions: EventSession[];
	};

	// Backward compatibility properties
	startDate?: Date | null;
	endDate?: Date | null;
	time?: string;
	timezone?: string;
	isRecurring?: boolean;

	// Multi-location Support
	locations: EventLocation[];

	// Recurring Events
	recurrence: EventRecurrence;

	// Modules & Features
	selectedModules: string[];
	moduleConfigurations: Record<string, unknown>;

	// Guest Management (moved to RSVP module)
	expectedAttendees: number;
	maxAttendees?: number;
	guestGroups: Array<{ name: string; members: string[] }>;
	vipGuests: string[];

	// Tickets & Pricing
	ticketTypes: Array<{
		name: string;
		price: number;
		quantity: number;
		description?: string;
	}>;

	// Additional Features
	mealOptions: string[];
	additionalFeatures: string[];
	dressCode: string;
	giftRegistryUrl: string;
	transportationDetails: string;
	accommodationDetails: string;
	specialRequirements: string;

	// Invitation Settings
	invitationSettings: {
		method: string[];
		template: string;
		customMessage: string;
		sendTime: "now" | "scheduled";
		scheduledTime?: Date;
	};

	// Event Photos
	eventPhotos: {
		mainPhoto: string | null;
		additionalPhotos: Array<{
			id: string;
			url: string;
			file?: File;
			title?: string;
			description?: string;
			isUploaded: boolean;
		}>;
		maxPhotos: number;
	};

	// Launch Settings
	status: "draft" | "published";
	softLaunch: boolean;
	analytics: boolean;

	// Additional Details (Optional expandable fields)
	additionalDetails: {
		ageRestrictions: {
			hasRestrictions: boolean;
			minAge?: number;
			maxAge?: number;
			requiresGuardian?: boolean;
			customMessage?: string;
			restrictionType?: "minimum" | "maximum" | "range" | "exact";
		};
		checkIn: {
			hasCustomCheckIn: boolean;
			checkInTime?: string;
			bufferTime?: number;
			checkInInstructions?: string;
			earlyCheckIn?: boolean;
			lateCheckIn?: boolean;
		};
		parking: {
			hasParkingInfo: boolean;
			parkingType?: "free" | "paid" | "valet" | "street" | "garage" | "lot";
			parkingCost?: number;
			parkingDetails?: string;
			parkingMapUrl?: string;
			validationAvailable?: boolean;
			reservationRequired?: boolean;
			alternativeOptions?: string;
		};
		faqs: Array<{
			id: string;
			question: string;
			answer: string;
			category?: string;
		}>;
		specialGuests: Array<{
			id: string;
			type: string;
			order: number;
			guests: Array<{
				id: string;
				name: string;
				title: string;
				bio: string;
				photo?: string;
				credentials: string[];
				socialLinks: {
					linkedin?: string;
					twitter?: string;
					website?: string;
				};
				isImported: boolean;
				importSource?: "linkedin" | "twitter" | "manual";
				groupId: string;
			}>;
		}>;
		 
		featureEvent?: {
			isFeatured: boolean;
			featureType: string;
			[key: string]: unknown;
		};
	};
};

export type BoothType = {
	id: string;
	name: string;
	description?: string;
	price: number;
	currency: string;
	dimensions: {
		width: number;
		height: number;
	};
	maxAvailable: number;
	capacity?: number; // Maximum number of people allowed in the booth
 	features?: string[];
 	icon: string;
};

export type VendorBoothSettings = {
	allowVendorBooths: boolean;
	boothTypes: BoothType[];
	maxBoothsPerVendor: number;
	paymentRequired: boolean;
	additionalTerms?: string;
	setupInstructions?: string;
	invitedVendors?: Array<{
		email: string;
		name?: string;
		businessName?: string;
 	}>;
};

export type EventSession = {
	id: string;
	date: Date;
	title?: string;
	startTime: string;
	endTime: string;
 	locationId?: string;
 	description?: string;
};

export type EventLocationSection = {
	id: string;
	name: string;
	description?: string;
 	capacity?: number;
};

export type EventLocation = {
	id: string;
	name: string;
	address: string;
	type: "physical" | "virtual" | "hybrid";
	capacity?: number;
	features?: string[];
	virtualLink?: string;
	source?: "marketplace" | "manual";
	vendorName?: string;
 	sections?: EventLocationSection[];
};

export type EventRecurrence = {
	isRecurring: boolean;
	pattern: "daily" | "weekly" | "monthly" | "yearly" | "custom";
	frequency: number;
	customPattern?: "days" | "weeks" | "months" | "years";
	endType: "never" | "after" | "until";
	endValue?: number | Date;
	exceptions?: Date[];
 	customDays?: number[]; // For weekly: 0=Sunday, 1=Monday, etc.
};