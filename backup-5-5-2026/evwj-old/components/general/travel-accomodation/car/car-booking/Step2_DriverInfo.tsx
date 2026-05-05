"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

export default function Step2_DriverInfo({
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
	const [dob, setDob] = useState("");
	const [license, setLicense] = useState("");
	const [licenseState, setLicenseState] = useState("NY");
	const [expiry, setExpiry] = useState("");
	type DriverName = { firstName: string; lastName: string };
	const [additionalDrivers, setAdditionalDrivers] = useState<DriverName[]>([]);

	const addDriver = () =>
		setAdditionalDrivers((s) => [...s, { firstName: "", lastName: "" }]);
	const updateDriver = (
		idx: number,
		field: "firstName" | "lastName",
		val: string,
	) =>
		setAdditionalDrivers((s) =>
			s.map((v, i) => (i === idx ? { ...v, [field]: val } : v)),
		);
	const removeDriver = (idx: number) =>
		setAdditionalDrivers((s) => s.filter((_, i) => i !== idx));

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="md:col-span-2 space-y-6">
				<div className="flex items-center gap-4">
					<div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
						<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Primary Driver
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-300">
							As shown on license
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First name*"
					/>
					<Input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last name*"
					/>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email*"
					/>
					<Input
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="Phone*"
					/>
					<Input
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						placeholder="Date of Birth* (mm/dd/yyyy)"
					/>
					<Input
						value={license}
						onChange={(e) => setLicense(e.target.value)}
						placeholder="License Number*"
					/>
					<div>
						<Select
							value={licenseState}
							onValueChange={(v: string) => setLicenseState(v)}
						>
							<SelectTrigger>
								<SelectValue placeholder="License State" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="NY">NY</SelectItem>
								<SelectItem value="CA">CA</SelectItem>
								<SelectItem value="TX">TX</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Input
						value={expiry}
						onChange={(e) => setExpiry(e.target.value)}
						placeholder="License Expiry (mm/dd/yyyy)"
					/>
				</div>

				<div className="border-t pt-4">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Additional Drivers
						</h4>
						<button
							onClick={addDriver}
							className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
						>
							<Plus className="h-4 w-4" /> Add Driver (+$15/day)
						</button>
					</div>

					<div className="mt-3 space-y-3">
						{additionalDrivers.length === 0 && (
							<p className="text-sm text-gray-500">
								No additional drivers added.
							</p>
						)}
						{additionalDrivers.map((g, idx) => (
							<div key={idx} className="flex items-center gap-2">
								<Input
									value={g.firstName}
									onChange={(e) =>
										updateDriver(idx, "firstName", e.target.value)
									}
									placeholder={`Additional Driver ${idx + 1} first name`}
								/>
								<Input
									value={g.lastName}
									onChange={(e) =>
										updateDriver(idx, "lastName", e.target.value)
									}
									placeholder={`Additional Driver ${idx + 1} last name`}
								/>
								<button
									type="button"
									onClick={() => removeDriver(idx)}
									className="text-red-500 hover:text-red-700 p-2"
								>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-between items-center mt-6">
					<button
						onClick={onBack}
						className="px-5 py-2 rounded-lg border text-gray-700 dark:text-gray-200"
					>
						Back
					</button>
					<button
						onClick={onNext}
						className="px-6 py-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 text-white"
					>
						Continue to Insurance
					</button>
				</div>
			</div>

			<aside className="hidden md:block">
				<div className="sticky top-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
					<div className="text-sm text-gray-500">Summary</div>
					<div className="text-lg font-bold mt-2">
						{firstName || lastName
							? `${firstName} ${lastName}`
							: "Primary driver not set"}
					</div>
					<div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
						Add drivers and continue to select protection
					</div>
				</div>
			</aside>
		</div>
	);
}
