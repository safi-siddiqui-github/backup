"use client";

import React, { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Step3_Insurance = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const [cdw, setCdw] = useState(false);
	const [lis, setLis] = useState(false);
	const [pai, setPai] = useState(false);
	const [pec, setPec] = useState(false);
	const [road] = useState(false);

	const perDay = useMemo(() => {
		let sum = 0;
		if (cdw) sum += 25;
		if (lis) sum += 15;
		if (pai) sum += 10;
		if (pec) sum += 8;
		if (road) sum += 7;
		return sum;
	}, [cdw, lis, pai, pec, road]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="md:col-span-2 space-y-4">
				<h2 className="text-2xl font-bold">Insurance & Protection</h2>
				<p className="text-sm text-gray-500 dark:text-gray-300">
					Choose protection options for peace of mind.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[
						{
							id: "cdw",
							title: "Collision Damage Waiver (CDW)",
							price: 25,
							desc: "Covers damage to the rental vehicle",
						},
						{
							id: "lis",
							title: "Liability Insurance Supplement (LIS)",
							price: 15,
							desc: "Additional liability protection",
						},
						{
							id: "pai",
							title: "Personal Accident Insurance (PAI)",
							price: 10,
							desc: "Medical coverage for driver and passengers",
						},
						{
							id: "pec",
							title: "Personal Effects Coverage (PEC)",
							price: 8,
							desc: "Protects personal belongings",
						},
					].map((opt) => {
						const checked =
							opt.id === "cdw"
								? cdw
								: opt.id === "lis"
									? lis
									: opt.id === "pai"
										? pai
										: pec;
						const onChange = (v: boolean | "indeterminate") => {
							if (opt.id === "cdw") setCdw(Boolean(v));
							if (opt.id === "lis") setLis(Boolean(v));
							if (opt.id === "pai") setPai(Boolean(v));
							if (opt.id === "pec") setPec(Boolean(v));
						};
						return (
							<label
								key={opt.id}
								className={`flex items-start gap-4 p-4 rounded-lg border ${checked ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/40" : "border-gray-200 dark:border-gray-700"} hover:shadow-sm`}
							>
								<Checkbox checked={checked} onCheckedChange={onChange} />
								<div>
									<div className="flex items-center justify-between gap-3">
										<div className="font-semibold text-gray-900 dark:text-white">
											{opt.title}
										</div>
										<div className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
											${opt.price}/day
										</div>
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
										{opt.desc}
									</div>
								</div>
							</label>
						);
					})}
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="text-sm text-gray-500">
						Total Insurance Cost (per day)
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
						Continue to Add-ons
					</button>
				</div>
			</div>

			<aside className="hidden md:block">
				<div className="sticky top-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
					<div className="text-sm text-gray-500">Insurance per day</div>
					<div className="text-2xl font-extrabold mt-1">
						${perDay.toFixed(2)}
					</div>
					<div className="text-xs text-gray-500 mt-3">
						Selected options will be added to your booking
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Step3_Insurance;
