"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
	const [loyalty, setLoyalty] = useState("");
	const [bedPref, setBedPref] = useState("");
	const [floorPref, setFloorPref] = useState("");
	const [earlyCheckin, setEarlyCheckin] = useState(false);
	const [lateCheckout, setLateCheckout] = useState(false);
	const [notes, setNotes] = useState("");
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
					<h2 className="text-2xl font-bold text-foreground">
						Guest Information
					</h2>
					<p className="text-sm text-gray-500">
						Please provide details for the reservation.
					</p>
				</div>
			</div>

			<form className="space-y-6">
				<div className="border p-4 rounded-lg !bg-white dark:!bg-slate-700/50 border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<h3 className="text-lg font-semibold mb-3 text-foreground">
						Primary Guest
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
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
							<label className="block text-sm font-medium text-foreground mb-1">
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
							<label className="block text-sm font-medium text-foreground mb-1">
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
							<label className="block text-sm font-medium text-foreground mb-1">
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
						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								Loyalty Program (optional)
							</label>
							<Input
								value={loyalty}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setLoyalty(e.target.value)
								}
								placeholder="Enter your loyalty number"
							/>
						</div>
					</div>
				</div>

				<div className="border p-4 rounded-lg border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-lg font-semibold text-foreground">
							Additional Guests
						</h3>
						<button
							type="button"
							onClick={addGuest}
							className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
						>
							<Plus className="h-4 w-4" /> Add Guest
						</button>
					</div>

					<div className="space-y-2">
						{guests.length === 0 && (
							<p className="text-sm text-muted-foreground">
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

				<div className="border p-4 rounded-lg border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<h3 className="text-lg font-semibold mb-3 text-foreground">
						Room Preferences
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								Bed preference
							</label>
							<Select
								value={bedPref}
								onValueChange={(v: string) => setBedPref(v)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select preference" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="king">1 King Bed</SelectItem>
									<SelectItem value="queen">2 Queen Beds</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								Floor preference
							</label>
							<Select
								value={floorPref}
								onValueChange={(v: string) => setFloorPref(v)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select preference" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="high">High Floor</SelectItem>
									<SelectItem value="low">Low Floor</SelectItem>
									<SelectItem value="elevator">Near Elevator</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="mt-4 space-y-2">
						<h4 className="text-sm font-medium text-foreground">
							Special requests
						</h4>
						<div className="flex items-center gap-4">
							<label className="flex items-center gap-2">
								<Checkbox
									checked={earlyCheckin}
									onCheckedChange={(c: boolean | "indeterminate") =>
										setEarlyCheckin(Boolean(c))
									}
								/>
								<span className="text-sm text-foreground">
									Early check-in (if available)
								</span>
							</label>
							<label className="flex items-center gap-2">
								<Checkbox
									checked={lateCheckout}
									onCheckedChange={(c: boolean | "indeterminate") =>
										setLateCheckout(Boolean(c))
									}
								/>
								<span className="text-sm text-gray-700 dark:text-gray-200">
									Late checkout (if available)
								</span>
							</label>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="notes"
							className="block text-sm font-medium text-foreground mb-1"
						>
							Additional notes
						</label>
						<textarea
							id="notes"
							rows={3}
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							className="w-full border-gray-200 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 !bg-white dark:!bg-slate-700/50 text-foreground placeholder:text-muted-foreground [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							placeholder="Any other special requests or requirements..."
						/>
					</div>
				</div>
			</form>

			<div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
				<button
					onClick={onBack}
					className="text-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 dark:hover:bg-slate-700/50 transition border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
				>
					Back
				</button>
				<button
					onClick={onNext}
					className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition"
				>
					Continue to Payment
				</button>
			</div>
		</div>
	);
}
