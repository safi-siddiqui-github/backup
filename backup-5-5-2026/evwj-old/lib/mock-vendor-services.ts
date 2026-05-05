import {
	UtensilsCrossed,
	Camera,
	Video,
	Music,
	Sparkles,
	Flower2,
	Calendar,
	Palette,
	Lightbulb,
	Volume2,
	Shield,
	Car,
	Building2,
	ChefHat,
	Wine,
} from "lucide-react";

export type VendorService = {
	id: string;
	name: string;
	icon: typeof UtensilsCrossed;
	category: string;
};

export const MOCK_VENDOR_SERVICES: VendorService[] = [
	{
		id: "catering",
		name: "Catering",
		icon: UtensilsCrossed,
		category: "Food & Beverage",
	},
	{
		id: "photography",
		name: "Photography",
		icon: Camera,
		category: "Media",
	},
	{
		id: "videography",
		name: "Videography",
		icon: Video,
		category: "Media",
	},
	{
		id: "dj-music",
		name: "DJ/Music",
		icon: Music,
		category: "Entertainment",
	},
	{
		id: "entertainment",
		name: "Entertainment",
		icon: Sparkles,
		category: "Entertainment",
	},
	{
		id: "florist",
		name: "Florist",
		icon: Flower2,
		category: "Decor",
	},
	{
		id: "event-planning",
		name: "Event Planning",
		icon: Calendar,
		category: "Planning",
	},
	{
		id: "decor",
		name: "Decor",
		icon: Palette,
		category: "Decor",
	},
	{
		id: "lighting",
		name: "Lighting",
		icon: Lightbulb,
		category: "Technical",
	},
	{
		id: "sound-system",
		name: "Sound System",
		icon: Volume2,
		category: "Technical",
	},
	{
		id: "security",
		name: "Security",
		icon: Shield,
		category: "Services",
	},
	{
		id: "transportation",
		name: "Transportation",
		icon: Car,
		category: "Services",
	},
	{
		id: "venue",
		name: "Venue",
		icon: Building2,
		category: "Venue",
	},
	{
		id: "catering-equipment",
		name: "Catering Equipment",
		icon: ChefHat,
		category: "Food & Beverage",
	},
	{
		id: "bar-services",
		name: "Bar Services",
		icon: Wine,
		category: "Food & Beverage",
	},
];

/**
 * Search for services by name (case-insensitive)
 */
export function searchServices(query: string): VendorService[] {
	if (!query.trim()) return [];
	const lowerQuery = query.toLowerCase();
	return MOCK_VENDOR_SERVICES.filter(
		(service) =>
			service.name.toLowerCase().includes(lowerQuery) ||
			service.category.toLowerCase().includes(lowerQuery),
	);
}

/**
 * Get service by ID
 */
export function getServiceById(id: string): VendorService | undefined {
	return MOCK_VENDOR_SERVICES.find((service) => service.id === id);
}

/**
 * Get all services
 */
export function getAllServices(): VendorService[] {
	return MOCK_VENDOR_SERVICES;
}

