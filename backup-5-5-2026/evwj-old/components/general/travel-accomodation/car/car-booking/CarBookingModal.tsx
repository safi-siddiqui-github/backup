"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Stepper from "./Stepper";
import Step1_Selection from "./Step1_Selection";
import Step2_DriverInfo from "./Step2_DriverInfo";
import Step3_Insurance from "./Step3_Insurance";
import Step4_Addons from "./Step4_Addons";
import Step5_Payment from "./Step5_Payment";
import Step6_Confirmation from "./Step6_Confirmation";

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

export default function CarBookingModal({
	car,
	onClose,
}: {
	car: CarItem;
	onClose: () => void;
}) {
	const [step, setStep] = useState(1);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose]);

	const next = () => setStep((s) => Math.min(6, s + 1));
	const back = () => setStep((s) => Math.max(1, s - 1));

	const render = () => {
		switch (step) {
			case 1:
				return <Step1_Selection car={car} onNext={next} />;
			case 2:
				return <Step2_DriverInfo onNext={next} onBack={back} />;
			case 3:
				return <Step3_Insurance onNext={next} onBack={back} />;
			case 4:
				return <Step4_Addons onNext={next} onBack={back} />;
			case 5:
				return <Step5_Payment onNext={next} onBack={back} />;
			case 6:
				return <Step6_Confirmation car={car} onClose={onClose} />;
			default:
				return <div>Unknown</div>;
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-inter">
			{/* overlay */}
			<div
				className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
				aria-hidden="true"
				onClick={onClose}
			/>

			<div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-[#07101a] border border-gray-100 dark:border-gray-800">
				<header className="flex items-center justify-between gap-4 p-6 border-b border-gray-100 dark:border-gray-800">
					<div>
						<h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
							Reserve your ride
						</h1>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
							Quick, secure booking — customize drivers, protection and extras.
						</p>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={onClose}
							aria-label="Close"
							className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</header>

				<div className="p-4 md:p-6 flex-1 overflow-y-auto">
					<div className="w-full max-w-4xl mx-auto">
						<div className="mb-4">
							<Stepper currentStep={step} />
						</div>

						<div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 max-h-[70vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
							{render()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
