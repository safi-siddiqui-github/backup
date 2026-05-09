"use client";

export type Flight = {
	id: string;
	airline: string;
	code: string;
	price: string;
	cabin: string;
	depCode: string;
	depTime: string;
	depDate: string;
	depAirport: string;
	arrCode: string;
	arrTime: string;
	arrDate: string;
	arrAirport: string;
	duration: string;
	stops: string;
};

export const flights: Flight[] = [
	{
		id: "ua1001",
		airline: "United Airlines",
		code: "UA1001",
		price: "$225",
		cabin: "Economy",
		depCode: "JFK",
		depTime: "09:30",
		depDate: "Jul 18",
		depAirport: "John F. Kennedy",
		arrCode: "SFO",
		arrTime: "14:30",
		arrDate: "Jul 18",
		arrAirport: "San Francisco International",
		duration: "5h",
		stops: "1 stop",
	},
	{
		id: "ua1005",
		airline: "United Airlines",
		code: "UA1005",
		price: "$239",
		cabin: "Economy",
		depCode: "JFK",
		depTime: "11:00",
		depDate: "Jul 18",
		depAirport: "John F. Kennedy",
		arrCode: "SFO",
		arrTime: "16:00",
		arrDate: "Jul 18",
		arrAirport: "San Francisco International",
		duration: "5h 30m",
		stops: "Non-stop",
	},
];

export default flights;
