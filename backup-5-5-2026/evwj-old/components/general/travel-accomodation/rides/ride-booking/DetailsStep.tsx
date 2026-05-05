"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { RideOption } from "./types";

type Props = {
	ride: RideOption;
	firstName: string;
	setFirstName: (v: string) => void;
	lastName: string;
	setLastName: (v: string) => void;
	phone: string;
	setPhone: (v: string) => void;
	onNext: () => void;
};

export default function DetailsStep({
	ride,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	phone,
	setPhone,
	onNext,
}: Props) {
	return (
		<div className="grid grid-cols-1 gap-4">
			<h2 className="text-2xl font-bold">Details</h2>
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Ride Details
				</label>
				<div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
					{ride.service} — {ride.pickupLocation} • {ride.pickupTime}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<div>
					<label className="text-sm">First name</label>
					<Input
						value={firstName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFirstName(e.target.value)
						}
						placeholder="First name"
					/>
				</div>
				<div>
					<label className="text-sm">Last name</label>
					<Input
						value={lastName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setLastName(e.target.value)
						}
						placeholder="Last name"
					/>
				</div>
				<div>
					<label className="text-sm">Phone</label>
					<Input
						value={phone}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPhone(e.target.value)
						}
						placeholder="Phone number"
					/>
				</div>
			</div>

			<div className="flex justify-end mt-4">
				<button
					onClick={onNext}
					className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl"
				>
					Continue to Payment
				</button>
			</div>
		</div>
	);
}
