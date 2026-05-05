import React, { useState } from "react";
// Assuming Flight type is defined in a file like this
// import type { Flight } from "../data";

// Mock Flight type for demonstration
export type Flight = {
	price: string;
	depTime: string;
	depCode: string;
	depAirport: string;
	arrTime: string;
	arrCode: string;
	arrAirport: string;
	stops: string;
	duration: string;
	code: string;
};

export const Step1_FlightSelection = ({
	flight,
	onNext,
}: {
	flight?: Flight | null;
	onNext: () => void;
}) => {
	const [selectedFare, setSelectedFare] = useState<string | null>(null);

	// Mock data if no flight is passed, just for demonstration in isolation
	const displayFlight = flight || {
		price: "$199",
		depTime: "08:30 AM",
		depCode: "SFO",
		depAirport: "San Francisco Int'l",
		arrTime: "04:45 PM",
		arrCode: "JFK",
		arrAirport: "New York - JFK",
		stops: "1 Stop",
		duration: "7h 15m",
		code: "UA 244",
	};

	// Handle the case where no flight is selected
	if (!flight) {
		return (
			<div className="p-6 max-w-4xl mx-auto space-y-6 font-inter bg-white dark:bg-gray-900 rounded-lg shadow-sm">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
					Select Your Flight
				</h2>
				<div className="text-sm text-gray-600 dark:text-gray-400">
					No flight selected. Please go back and choose a flight to see fare
					options.
				</div>
			</div>
		);
	}

	const fares = [
		{
			id: "basic",
			title: "Basic Economy (most restrictive)",
			description:
				"Lowest price; limited or no changes/refunds, seat selection may be paid.",
			priceLabel: displayFlight.price,
		},
		{
			id: "eco",
			title: "Economy",
			description: "Standard economy fare.",
			priceLabel: `$${parseInt(displayFlight.price.replace("$", "")) + 40}`,
		},
		{
			id: "eco_ref",
			title: "Economy (fully refundable)",
			description: "Flexible ticket with refund options.",
			priceLabel: `$${parseInt(displayFlight.price.replace("$", "")) + 90}`,
		},
		{
			id: "prem",
			title: "Premium Economy",
			description: "More legroom and extras.",
			priceLabel: `$${parseInt(displayFlight.price.replace("$", "")) + 150}`,
		},
		{
			id: "prem_ref",
			title: "Premium Economy (fully refundable)",
			description: "Premium cabin with full refundability.",
			priceLabel: `$${parseInt(displayFlight.price.replace("$", "")) + 220}`,
		},
	];

	return (
		<div className="p-6 max-w-4xl mx-auto space-y-6 font-inter">
			<h2 className="text-2xl font-bold text-foreground">Choose Your Fare</h2>

			{/* Dynamic Grid for Fare Selection */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{fares.map((f) => (
					<div
						key={f.id}
						onClick={() => setSelectedFare(f.id)}
						className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl
              ${
								selectedFare === f.id
									? "border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-600 dark:ring-indigo-400 ring-opacity-30 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									: "border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 hover:border-gray-300 dark:hover:border-slate-500 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							}`}
					>
						<div className="flex justify-between items-start">
							<div className="flex-1 pr-2">
								<div className="font-semibold text-foreground">{f.title}</div>
								<div className="text-sm text-muted-foreground mt-1">
									{f.description}
								</div>
							</div>
							<div className="text-right shrink-0">
								<div className="font-bold text-lg text-foreground">
									{f.priceLabel}
								</div>
								<div className="text-xs text-muted-foreground">per person</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Redesigned Info Sections */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<h3 className="font-semibold text-foreground">Flight Information</h3>
					<div className="mt-3 text-sm text-foreground space-y-2">
						<div className="flex justify-between">
							<div className="flex-1">
								<div className="font-medium text-foreground">
									{displayFlight.depTime} • {displayFlight.depCode}
								</div>
								<div className="text-xs text-muted-foreground">
									{displayFlight.depAirport}
								</div>
							</div>
							<div className="flex-1 text-right">
								<div className="font-medium text-foreground">
									{displayFlight.arrTime} • {displayFlight.arrCode}
								</div>
								<div className="text-xs text-muted-foreground">
									{displayFlight.arrAirport}
								</div>
							</div>
						</div>
						<div className="border-t border-gray-200 dark:border-slate-600 pt-2">
							<div className="text-xs text-muted-foreground">
								{displayFlight.stops} • {displayFlight.duration}
							</div>
							<div className="col-span-2 mt-1 text-xs text-muted-foreground">
								Flight Number: {displayFlight.code}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-lg border border-gray-200 dark:border-slate-600 p-4 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<h3 className="font-semibold text-foreground">Seats</h3>
					<div className="mt-3 text-sm text-foreground">
						<div className="mb-2">
							Seat selection will be available after purchase, based on your
							selected fare.
						</div>
						<div className="text-sm text-muted-foreground">
							{selectedFare === "basic"
								? "Basic Economy seats are assigned at check-in."
								: "Choose your seat after booking."}
						</div>
					</div>
				</div>
			</div>

			{/* Continue Button */}
			<div className="flex justify-end items-center pt-4 border-t border-gray-200 dark:border-slate-600 mt-6">
				<button
					onClick={() => onNext()}
					disabled={!selectedFare}
					className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium disabled:!bg-white dark:disabled:!bg-slate-700/50 disabled:text-muted-foreground disabled:border disabled:border-gray-200 dark:disabled:border-slate-600 disabled:cursor-not-allowed transition-all duration-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default Step1_FlightSelection;
