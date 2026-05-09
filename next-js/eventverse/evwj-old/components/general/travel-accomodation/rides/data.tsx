"use client";

export type RideOption = {
	id: string;
	service: string;
	description: string;
	price: number;
	pickupLocation: string;
	pickupTime: string;
	dropoffLocation: string;
	dropoffNote: string;
};

export const RIDE_OPTIONS: RideOption[] = [
	{
		id: "uberx",
		service: "UberX",
		description: "Economy",
		price: 18,
		pickupLocation: "Your Location",
		pickupTime: "Jul 20, 2024 • 6:00 PM",
		dropoffLocation: "Golden Gate Park, San Francisco, CA 94118",
		dropoffNote: "Event venue",
	},
	{
		id: "uberxl",
		service: "UberXL",
		description: "Comfort",
		price: 28,
		pickupLocation: "Your Location",
		pickupTime: "Jul 20, 2024 • 6:00 PM",
		dropoffLocation: "Golden Gate Park, San Francisco, CA 94118",
		dropoffNote: "Event venue",
	},
];

export default RIDE_OPTIONS;
