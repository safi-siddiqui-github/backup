export type Activity = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	categoryColor: string;
	rating: number;
	duration: string;
	distance: string;
	price: number;
};

export const activities: Activity[] = [
	{
		id: "walk_tour",
		title: "City Walking Tour",
		description:
			"Explore the historic downtown area with a knowledgeable local guide. See famous landmarks and hidden gems.",
		imageUrl:
			"https://images.unsplash.com/photo-1541038204555-74251201407e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
		category: "Tours",
		categoryColor: "bg-purple-600",
		rating: 4.8,
		duration: "2 hours",
		distance: "0.5 miles",
		price: 35,
	},
	{
		id: "art_museum",
		title: "Local Art Museum",
		description:
			"World-class art collection featuring contemporary and classical works from renowned artists.",
		imageUrl:
			"https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
		category: "Cultural",
		categoryColor: "bg-pink-600",
		rating: 4.6,
		duration: "3 hours",
		distance: "1.2 miles",
		price: 25,
	},
	{
		id: "scuba",
		title: "Coral Reef Scuba",
		description:
			"Dive into the vibrant coral reefs and swim with tropical fish in this unforgettable scuba adventure.",
		imageUrl:
			"https://images.unsplash.com/photo-1577017210544-6b668b6c8e31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
		category: "Outdoor",
		categoryColor: "bg-blue-600",
		rating: 4.7,
		duration: "4 hours",
		distance: "Boat access",
		price: 120,
	},
	{
		id: "cooking_class",
		title: "Local Cuisine Cooking Class",
		description:
			"Learn to prepare traditional dishes with a local chef, from market visit to final tasting.",
		imageUrl:
			"https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
		category: "Outdoor",
		categoryColor: "bg-blue-600",
		rating: 4.5,
		duration: "3.5 hours",
		distance: "1.5 miles",
		price: 75,
	},
];

export default activities;
