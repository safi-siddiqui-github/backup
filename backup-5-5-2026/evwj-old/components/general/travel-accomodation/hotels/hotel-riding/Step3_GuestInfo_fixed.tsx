"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Step3_GuestInfo({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	type GuestName = { firstName: string; lastName: string };
	const [guests, setGuests] = useState<GuestName[]>([]);

	const addGuest = () =>
		setGuests((g) => [...g, { firstName: "", lastName: "" }]);
	const removeGuest = (idx: number) =>
		setGuests((g) => g.filter((_, i) => i !== idx));
	const updateGuest = (
		idx: number,
		field: "firstName" | "lastName",
		val: string,
	) =>
		setGuests((g) => g.map((v, i) => (i === idx ? { ...v, [field]: val } : v)));

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
						Guest Information
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Please provide details for the reservation.
					</p>
				</div>
			</div>

			<form className="space-y-6">
				<div className="border p-4 rounded-lg bg-gray-50 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
						Primary Guest
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								First name *
							</label>
							<Input
								value={firstName}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setFirstName(e.target.value)
								}
								placeholder="John"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Last name *
							</label>
							<Input
								value={lastName}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setLastName(e.target.value)
								}
								placeholder="Doe"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Email *
							</label>
							<Input
								value={email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
								type="email"
								placeholder="john.doe@example.com"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Phone *
							</label>
							<Input
								value={phone}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPhone(e.target.value)
								}
								type="tel"
								placeholder="123-456-7890"
							/>
						</div>
					</div>
				</div>

				<div className="border p-4 rounded-lg bg-white !bg-white dark:!bg-[#020617] border-gray-100 dark:border-gray-700 backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Additional Guests
						</h3>
						<button
							type="button"
							onClick={addGuest}
							className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 flex items-center gap-2"
						>
							<Plus className="h-4 w-4" /> Add Guest
						</button>
					</div>

					<div className="space-y-2">
						{guests.length === 0 && (
							<p className="text-sm text-gray-500 dark:text-gray-400">
								No additional guests added.
							</p>
						)}
						{guests.map((g, idx) => (
							<div key={idx} className="flex items-center gap-2">
								<Input
									value={g.firstName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										updateGuest(idx, "firstName", e.target.value)
									}
									placeholder={`Guest ${idx + 1} first name`}
								/>
								<Input
									value={g.lastName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										updateGuest(idx, "lastName", e.target.value)
									}
									placeholder={`Guest ${idx + 1} last name`}
								/>
								<button
									type="button"
									onClick={() => removeGuest(idx)}
									className="text-red-500 hover:text-red-700 p-2"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						))}
					</div>
				</div>
			</form>

			<div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
				<button
					onClick={onBack}
					className="text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition border"
				>
					Back
				</button>
				<button
					onClick={onNext}
					className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition"
				>
					Continue to Payment
				</button>
			</div>
		</div>
	);
}
