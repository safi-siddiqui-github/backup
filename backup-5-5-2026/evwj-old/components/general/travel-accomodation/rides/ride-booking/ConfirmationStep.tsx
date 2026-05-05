"use client";

import React from "react";
import { Check } from "lucide-react";
import type { RideOption } from "./types";

type Props = {
	bookingRef: string;
	ride: RideOption;
	totalAmount: string;
	onClose: () => void;
};

export default function ConfirmationStep({
	bookingRef,
	ride,
	totalAmount,
	onClose,
}: Props) {
	return (
		<div className="max-w-2xl mx-auto space-y-6 text-center">
			<div className="flex items-center gap-4 justify-center">
				<div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
					<Check className="h-8 w-8" />
				</div>
			</div>
			<h2 className="text-2xl font-bold">Booking Confirmed</h2>
			<div className="text-sm text-gray-600 dark:text-gray-300">
				Reference: <span className="font-mono">{bookingRef}</span>
			</div>

			<div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-800">
				<h3 className="font-semibold">Reservation</h3>
				<div className="mt-2 text-sm text-gray-700 dark:text-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div>
						<span className="font-medium">Ride:</span> {ride.service}
					</div>
					<div>
						<span className="font-medium">Pickup:</span> {ride.pickupLocation} •{" "}
						{ride.pickupTime}
					</div>
					<div>
						<span className="font-medium">Dropoff:</span> {ride.dropoffLocation}
					</div>
					<div>
						<span className="font-medium">Amount:</span> {totalAmount}
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<button
					onClick={onClose}
					className="px-4 py-2 bg-green-600 text-white rounded-lg"
				>
					Done
				</button>
			</div>
		</div>
	);
}
