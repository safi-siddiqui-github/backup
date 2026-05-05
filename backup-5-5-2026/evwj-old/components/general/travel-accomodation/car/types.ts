"use client";

export type CarItem = {
	id: string;
	name: string;
	tags: string[];
	pricePerDay: number;
	priceTotal: number;
	totalDays: number;
	pickupLocation: string;
	pickupDate: string;
	dropoffLocation: string;
	dropoffDate: string;
	features: string[];
};

export const CARS: CarItem[] = [
	{
		id: "toyota_corolla",
		name: "Toyota Corolla or similar",
		tags: ["Budget", "Economy"],
		pricePerDay: 36,
		priceTotal: 144,
		totalDays: 4,
		pickupLocation: "San Francisco International Airport (SFO)",
		pickupDate: "Jul 19, 2024",
		dropoffLocation: "San Francisco International Airport (SFO)",
		dropoffDate: "Jul 23, 2024",
		features: ["Automatic", "A/C", "4 Seats"],
	},
	{
		id: "chevy_malibu",
		name: "Chevrolet Malibu or similar",
		tags: ["Budget", "Full-size"],
		pricePerDay: 36,
		priceTotal: 144,
		totalDays: 4,
		pickupLocation: "San Francisco International Airport (SFO)",
		pickupDate: "Jul 19, 2024",
		dropoffLocation: "San Francisco International Airport (SFO)",
		dropoffDate: "Jul 23, 2024",
		features: ["Automatic", "A/C", "4 Seats"],
	},
	{
		id: "honda_civic",
		name: "Honda Civic or similar",
		tags: ["Enterprise", "Economy"],
		pricePerDay: 40,
		priceTotal: 160,
		totalDays: 4,
		pickupLocation: "San Francisco International Airport (SFO)",
		pickupDate: "Jul 19, 2024",
		dropoffLocation: "San Francisco International Airport (SFO)",
		dropoffDate: "Jul 23, 2024",
		features: ["Automatic", "A/C", "4 Seats"],
	},
];

export default CARS;
