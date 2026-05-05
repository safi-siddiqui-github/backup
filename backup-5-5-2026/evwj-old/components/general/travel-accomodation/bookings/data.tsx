import type { ElementType } from "react";
import { Hotel, Plane, Map } from "lucide-react";

export type Stat = { label: string; value: string };

export type BaseBooking = {
	id: string;
	icon: ElementType;
	iconColor: string;
	category: "Hotel" | "Flight" | "Activity";
	title: string;
	details: string;
};

export type HotelBooking = BaseBooking & {
	category: "Hotel";
	checkIn: string;
	checkOut: string;
	roomType: string;
	rating: number;
	totalNights: number;
	distance: string;
	pricePerNight: string;
	totalCost: string;
	amenities: string[];
};

export type FlightBooking = BaseBooking & { category: "Flight" };
export type ActivityBooking = BaseBooking & { category: "Activity" };
export type Booking = HotelBooking | FlightBooking | ActivityBooking;

export const stats: Stat[] = [
	{ label: "Total Bookings", value: "15" },
	{ label: "Estimated Cost", value: "$NaN" },
	{ label: "Hotels", value: "7" },
	{ label: "Activities", value: "2" },
];

export const bookings: Booking[] = [
	{
		id: "b1",
		category: "Hotel",
		icon: Hotel,
		iconColor: "text-blue-600 dark:text-blue-400",
		title: "Luxury Resort & Spa",
		details: "Jul 19 • 4 nights • $NaN",
		checkIn: "Jul 19, 2024",
		checkOut: "Jul 23, 2024",
		roomType: "King Suite",
		rating: 4.8,
		totalNights: 4,
		distance: "1.2 miles",
		pricePerNight: "$",
		totalCost: "$NaN",
		amenities: [
			"Free WiFi",
			"Breakfast",
			"Valet Parking",
			"Spa",
			"Pool",
			"Beach Access",
			"Fine Dining",
		],
	},
	{
		id: "b2",
		category: "Hotel",
		icon: Hotel,
		iconColor: "text-blue-600 dark:text-blue-400",
		title: "Grand Plaza Hotel",
		details: "Jul 19 • 4 nights • $NaN",
		checkIn: "Jul 19, 2024",
		checkOut: "Jul 23, 2024",
		roomType: "Queen Room",
		rating: 4.5,
		totalNights: 4,
		distance: "0.5 miles",
		pricePerNight: "$",
		totalCost: "$NaN",
		amenities: ["Free WiFi", "Pool"],
	},
	{
		id: "b5",
		category: "Flight",
		icon: Plane,
		iconColor: "text-cyan-600 dark:text-cyan-400",
		title: "Delta Airlines • DL2002",
		details: "Jul 18 • LAX to SFO • $199",
	},
	{
		id: "b6",
		category: "Hotel",
		icon: Hotel,
		iconColor: "text-blue-600 dark:text-blue-400",
		title: "Bayview Inn",
		details: "Jul 20 • 2 nights • $279",
		checkIn: "Jul 20, 2024",
		checkOut: "Jul 22, 2024",
		roomType: "Deluxe King",
		rating: 4.3,
		totalNights: 2,
		distance: "0.8 miles",
		pricePerNight: "$139",
		totalCost: "$278",
		amenities: ["Free WiFi", "Breakfast", "Gym"],
	},
	{
		id: "b3",
		category: "Flight",
		icon: Plane,
		iconColor: "text-cyan-600 dark:text-cyan-400",
		title: "United Airlines • UA1001",
		details: "Jul 19 • JFK to SFO • $NaN",
	},
	{
		id: "b7",
		category: "Activity",
		icon: Map,
		iconColor: "text-purple-600 dark:text-purple-400",
		title: "Evening Networking Reception",
		details: "Jul 20 • 2 hours • Free",
	},
	{
		id: "b4",
		category: "Activity",
		icon: Map,
		iconColor: "text-purple-600 dark:text-purple-400",
		title: "City Walking Tour",
		details: "Jul 20 • 2 hours • $NaN",
	},
	{
		id: "b8",
		category: "Flight",
		icon: Plane,
		iconColor: "text-cyan-600 dark:text-cyan-400",
		title: "Southwest • SW305",
		details: "Jul 21 • SFO to LAS • $129",
	},
	{
		id: "b9",
		category: "Hotel",
		icon: Hotel,
		iconColor: "text-blue-600 dark:text-blue-400",
		title: "Harbor Suites",
		details: "Jul 21 • 1 night • $189",
		checkIn: "Jul 21, 2024",
		checkOut: "Jul 22, 2024",
		roomType: "Harbor View",
		rating: 4.6,
		totalNights: 1,
		distance: "0.2 miles",
		pricePerNight: "$189",
		totalCost: "$189",
		amenities: ["Free WiFi", "Breakfast", "Pool"],
	},
];

export default bookings;
