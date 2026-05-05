"use client";

import React from "react";
import { Check } from "lucide-react";

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

const Step6_Confirmation = ({
	car,
	onClose,
}: {
	car: CarItem;
	onClose: () => void;
}) => {
	const bookingRef = React.useMemo(
		() => `CAR-${Date.now().toString(36).toUpperCase().slice(-8)}`,
		[],
	);

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<div className="flex items-center gap-4">
				<div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
					<Check className="h-8 w-8" />
				</div>
				<div>
					<h2 className="text-2xl font-bold">Booking Confirmed</h2>
					<div className="text-sm text-gray-600 dark:text-gray-300">
						Reference: <span className="font-mono">{bookingRef}</span>
					</div>
				</div>
			</div>

			<div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-800">
				<h3 className="font-semibold">Reservation</h3>
				<div className="mt-2 text-sm text-gray-700 dark:text-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div>
						<span className="font-medium">Vehicle:</span> {car.name}
					</div>
					<div>
						<span className="font-medium">Pickup:</span> {car.pickupDate}
					</div>
					<div>
						<span className="font-medium">Dropoff:</span> {car.dropoffDate}
					</div>
					<div>
						<span className="font-medium">Amount:</span> $42.12
					</div>
				</div>
			</div>

			<div className="flex">
				<div className="ml-auto">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-green-600 text-white rounded-lg"
					>
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

export default Step6_Confirmation;
