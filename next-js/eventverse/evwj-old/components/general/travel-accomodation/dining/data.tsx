"use client";

export type Restaurant = {
	id: string;
	name: string;
	imageUrl: string;
	category: string;
	categoryColor: string;
	rating: number;
	priceRange: string;
	address: string;
	distance: string;
	phone: string;
	defaultPartySize?: number;
	nextAvailable?: string;
	availableTimes?: string[];
};

export const restaurants: Restaurant[] = [
	{
		id: "waterfront_grill",
		name: "The Waterfront Grill",
		imageUrl:
			"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
		category: "Seafood",
		categoryColor: "bg-teal-600",
		rating: 4.7,
		priceRange: "$$$",
		address: "789 Harbor Drive, San Francisco, CA",
		distance: "0.4 miles",
		phone: "(555) 123-4567",
		defaultPartySize: 2,
		nextAvailable: "7:00 PM",
		availableTimes: ["6:00 PM", "6:30 PM", "7:00 PM", "8:00 PM"],
	},
	{
		id: "bella_italia",
		name: "Bella Italia",
		imageUrl:
			"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
		category: "Italian",
		categoryColor: "bg-cyan-600",
		rating: 4.6,
		priceRange: "$$",
		address: "456 Main Street, San Francisco, CA",
		distance: "0.6 miles",
		phone: "(555) 234-5678",
		defaultPartySize: 4,
		nextAvailable: "6:30 PM",
		availableTimes: ["5:30 PM", "6:00 PM", "6:30 PM", "7:30 PM"],
	},
	{
		id: "tokyo_sushi",
		name: "Tokyo Sushi",
		imageUrl:
			"https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
		category: "Japanese",
		categoryColor: "bg-green-600",
		rating: 4.8,
		priceRange: "$$$",
		address: "123 Japan Town, San Francisco, CA",
		distance: "1.1 miles",
		phone: "(555) 345-6789",
		defaultPartySize: 2,
		nextAvailable: "8:00 PM",
		availableTimes: ["7:00 PM", "7:30 PM", "8:00 PM", "9:00 PM"],
	},
	{
		id: "the_burger_joint",
		name: "The Burger Joint",
		imageUrl:
			"https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
		category: "American",
		categoryColor: "bg-green-600",
		rating: 4.4,
		priceRange: "$$",
		address: "789 Burger Lane, San Francisco, CA",
		distance: "0.8 miles",
		phone: "(555) 456-7890",
		defaultPartySize: 2,
		nextAvailable: "6:00 PM",
		availableTimes: ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
	},
];

export default restaurants;
