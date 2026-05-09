export interface MailTemplate {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
}

export interface PricingTier {
	id: string;
	name: string;
	range: string;
	price: string;
	description: string;
}

export const MAIL_TEMPLATES: MailTemplate[] = [
	{ id: "standard-postcard", name: "Standard Postcard", icon: () => null },
	{ id: "letter-invitation", name: "Letter Invitation", icon: () => null },
	{ id: "premium-card", name: "Premium Card", icon: () => null },
];

export const PRICING_TIERS: PricingTier[] = [
	{
		id: "starter",
		name: "Starter",
		range: "0-100 mailings/month",
		price: "$0.89 each",
		description: "Perfect for small events",
	},
	{
		id: "professional",
		name: "Professional",
		range: "101-500 mailings/month",
		price: "$0.75 each",
		description: "Best for medium-sized events",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		range: "500+ mailings/month",
		price: "$0.65 each",
		description: "Ideal for large-scale campaigns",
	},
];

export const PRICING_FEATURES = [
	"Automated printing and mailing",
	"Tracking and delivery confirmation",
	"Custom branding and design",
];
