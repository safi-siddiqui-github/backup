"use client";

import React, { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Step4_Addons = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const [gps, setGps] = useState(false);
	const [childSeatCount, setChildSeatCount] = useState(0);
	const [toll, setToll] = useState(false);
	const [rack, setRack] = useState(false);

	const perDay = useMemo(() => {
		let sum = 0;
		if (gps) sum += 12;
		if (childSeatCount > 0) sum += 10 * childSeatCount;
		if (toll) sum += 8;
		if (rack) sum += 15;
		return sum;
	}, [gps, childSeatCount, toll, rack]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="md:col-span-2 space-y-4">
				<h2 className="text-2xl font-bold">Add-ons & Extras</h2>
				<p className="text-sm text-gray-500 dark:text-gray-300">
					Choose extras to make your trip more comfortable.
				</p>

				<div className="space-y-3">
					<label
						className={`flex items-center justify-between p-3 rounded-lg border ${gps ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700"}`}
					>
						<div>
							<div className="font-semibold">GPS Navigation System</div>
							<div className="text-sm text-gray-600">$12/day</div>
						</div>
						<Checkbox
							checked={gps}
							onCheckedChange={(v: boolean | "indeterminate") =>
								setGps(Boolean(v))
							}
						/>
					</label>

					<div className="flex items-center justify-between p-3 rounded-lg border">
						<div>
							<div className="font-semibold">Child Safety Seats</div>
							<div className="text-sm text-gray-600">$10/day each</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setChildSeatCount((c) => Math.max(0, c - 1))}
								className="h-8 w-8 rounded-full border"
							>
								-
							</button>
							<div className="w-8 text-center">{childSeatCount}</div>
							<button
								onClick={() => setChildSeatCount((c) => c + 1)}
								className="h-8 w-8 rounded-full border"
							>
								+
							</button>
						</div>
					</div>

					<label
						className={`flex items-center justify-between p-3 rounded-lg border ${toll ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700"}`}
					>
						<div>
							<div className="font-semibold">Toll Transponder</div>
							<div className="text-sm text-gray-600">$8/day</div>
						</div>
						<Checkbox
							checked={toll}
							onCheckedChange={(v: boolean | "indeterminate") =>
								setToll(Boolean(v))
							}
						/>
					</label>

					<label
						className={`flex items-center justify-between p-3 rounded-lg border ${rack ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/30" : "border-gray-200 dark:border-gray-700"}`}
					>
						<div>
							<div className="font-semibold">Ski/Snowboard Rack</div>
							<div className="text-sm text-gray-600">$15/day</div>
						</div>
						<Checkbox
							checked={rack}
							onCheckedChange={(v: boolean | "indeterminate") =>
								setRack(Boolean(v))
							}
						/>
					</label>
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="text-sm text-gray-500">
						Total Add-ons Cost (per day)
					</div>
					<div className="text-xl font-bold">${perDay.toFixed(2)}</div>
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
						Continue to Payment
					</button>
				</div>
			</div>

			<aside className="hidden md:block">
				<div className="sticky top-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
					<div className="text-sm text-gray-500">Selected add-ons/day</div>
					<div className="text-2xl font-extrabold mt-1">
						${perDay.toFixed(2)}
					</div>
					<div className="text-xs text-gray-500 mt-3">
						Adjust extras to update your total
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Step4_Addons;
