import { Campaign } from "../types";

export const MOCK_CAMPAIGNS: Campaign[] = [
	{
		id: "1",
		name: "Tech Conference 2025",
		description: "Email and social media campaign for tech conference.",
		status: "scheduled",
		date: new Date("2025-02-01T05:00:00"),
		createdDate: new Date("2025-01-15T10:00:00"),
		channels: ["email", "linkedin"],
		audiences: ["corporate-attendees"],
		content: {
			email: {
				subjectLine: "Join Us at Tech Conference 2025",
				bodyContent:
					"We're excited to invite you to our upcoming tech conference...",
				callToActionText: "Register Now",
				buttonUrl: "https://example.com/register",
			},
			linkedin: {
				postContent:
					"Excited to announce Tech Conference 2025! Join us for an amazing experience.",
			},
		},
	},
	{
		id: "2",
		name: "Summer Wedding Campaign 2025",
		description: "Multi-channel campaign for upcoming summer wedding.",
		status: "draft",
		date: new Date("2025-01-15T05:00:00"),
		createdDate: new Date("2025-01-10T14:00:00"),
		channels: ["email", "instagram-post"],
		audiences: ["vip-guests", "wedding-attendees"],
		content: {
			email: {
				subjectLine: "You're Invited to Our Summer Wedding!",
				bodyContent: "Join us for an unforgettable celebration...",
				callToActionText: "RSVP Now",
				buttonUrl: "https://example.com/rsvp",
			},
			"instagram-post": {
				postContent:
					"Save the date! ☀️💒 Summer wedding celebration coming soon! #SummerWedding",
			},
		},
	},
	{
		id: "3",
		name: "Charity Gala Invitations",
		description: "Premium campaign with physical mail for VIP guests.",
		status: "completed",
		date: new Date("2024-12-20T05:00:00"),
		createdDate: new Date("2024-12-10T09:00:00"),
		channels: ["mail", "email"],
		audiences: ["vip-guests", "high-spenders"],
		content: {
			mail: {
				subjectLine: "Exclusive Invitation to Charity Gala",
				bodyContent: "You're cordially invited to our annual charity gala...",
				callToActionText: "RSVP",
				buttonUrl: "https://example.com/gala",
			},
			email: {
				subjectLine: "Charity Gala Invitation",
				bodyContent: "Join us for an evening of giving and celebration...",
				callToActionText: "Learn More",
				buttonUrl: "https://example.com/gala",
			},
		},
		metrics: {
			reach: 67,
			delivered: 65,
			opened: 52,
			clicked: 38,
			conversions: 24,
			engagement: 80.0,
			conversion: 36.9,
			roi: 15200,
		},
		channelMetrics: {
			mail: {
				cost: 335,
				reach: 25,
			},
			email: {
				cost: 0,
				reach: 30,
			},
		},
	},
];
