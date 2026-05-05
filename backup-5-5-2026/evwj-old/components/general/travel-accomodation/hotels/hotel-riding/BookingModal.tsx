"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { HotelPaymentProvider } from "../HotelPaymentContext";
import type { HotelType } from "../hotels";
import Stepper from "./Stepper";
import Step1_Details from "./Step1_Details";
import Step2_RoomSelection from "./Step2_RoomSelection";
import Step3_GuestInfo from "./Step3_GuestInfo";
import Step4_Payment from "./Step4_Payment";
import Step5_Confirmation from "./Step5_Confirmation";

export default function BookingModal({
	hotel,
	currentStep,
	onClose,
	onNext,
	onBack,
}: {
	hotel: HotelType;
	currentStep: number;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return <Step1_Details hotel={hotel} onNext={onNext} />;
			case 2:
				return (
					<Step2_RoomSelection hotel={hotel} onNext={onNext} onBack={onBack} />
				);
			case 3:
				return <Step3_GuestInfo onNext={onNext} onBack={onBack} />;
			case 4:
				return <Step4_Payment onNext={onNext} onBack={onBack} />;
			case 5:
				return <Step5_Confirmation hotel={hotel} onClose={onClose} />;
			default:
				return <div>Unknown Step</div>;
		}
	};

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function onDocMouse(e: MouseEvent) {
			if (!containerRef.current) return;
			if (!(e.target instanceof Node)) return;
			if (!containerRef.current.contains(e.target)) {
				onClose();
			}
		}

		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}

		document.addEventListener("mousedown", onDocMouse);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocMouse);
			document.removeEventListener("keydown", onKey);
		};
	}, [onClose]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-inter">
			<div
				ref={containerRef}
				className="!bg-white dark:!bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
			>
				<div className="relative pt-4 px-6 pb-2 border-b border-gray-200 dark:border-slate-600">
					<div className="w-full max-w-3xl mx-auto !bg-white dark:!bg-slate-800/95 backdrop-blur-sm rounded-lg [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
						<Stepper currentStep={currentStep} />
					</div>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				<HotelPaymentProvider>
					<div className="overflow-y-auto p-6 bg-white !bg-white dark:!bg-[#020617] [background-color:white] dark:[background-color:#020617] backdrop-blur-sm">
						{renderStepContent()}
					</div>
				</HotelPaymentProvider>
			</div>
		</div>
	);
}
