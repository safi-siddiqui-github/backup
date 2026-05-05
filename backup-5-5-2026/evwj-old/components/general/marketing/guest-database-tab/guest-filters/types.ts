export interface GuestFilters {
	segments: string[];
	eventTypes: string[];
	ageRange: [number, number];
	location: string;
	spendingRange: [number, number];
	spendingLevel: string;
	attendance: string;
	lastEventDate: string;
	optOuts: string[];
	avgTicketPrice: [number, number];
	totalTicketsPurchased: [number, number];
	multiTicketBuyersOnly: boolean;
	purchaseFrequency: string;
	birthdayMonths: string[];
	daysSinceLastEvent: number;
	engagementRecency: string;
	ltvRange: [number, number];
	ltvLevel: string;
	rsvpReliability: string;
	avgPlusOnes: [number, number];
	frequentlyBringsPlusOnes: boolean;
}

export const SEGMENTS = [
	"VIP Guests",
	"Wedding Attendees",
	"Corporate Event Attendees",
	"High Spenders",
	"Frequent Attendees",
	"Young Adults (18-34)",
	"Festival Goers",
];

export const EVENT_TYPES = [
	"Wedding",
	"Corporate",
	"Festival",
	"Fundraiser",
	"Birthday",
	"Conference",
];

export const BIRTHDAY_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
