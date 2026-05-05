import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Step1_FlightSelection from "./Step1_FlightSelection";
import Step2_PassengerInfo from "./Step2_PassengerInfo";
import Step3_Seats from "./Step3_Seats";
import Step4_Baggage from "./Step4_Baggage";
import Step5_Extras from "./Step5_Extras";
import Step6_Payment from "./Step6_Payment";
import Step7_Confirmation from "./Step7_Confirmation";
import Stepper from "./Stepper";
import type { Flight } from "../data";

// Main Modal Component
export default function FlightBookingModal(props: {
	flight?: Flight;
	currentStep: number;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const { currentStep, onClose, onNext, onBack } = props;
	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return <Step1_FlightSelection flight={props.flight} onNext={onNext} />;
			case 2:
				return <Step2_PassengerInfo onNext={onNext} onBack={onBack} />;
			case 3:
				return <Step3_Seats onNext={onNext} onBack={onBack} />;
			case 4:
				return <Step4_Baggage onNext={onNext} onBack={onBack} />;
			case 5:
				return <Step5_Extras onNext={onNext} onBack={onBack} />;
			case 6:
				return <Step6_Payment onNext={onNext} onBack={onBack} />;
			case 7:
				return <Step7_Confirmation onClose={onClose} />;
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
					<Stepper currentStep={currentStep} />
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
					>
						<X className="h-6 w-6" />
					</button>
				</div>

				{/* Body */}
				<div className="overflow-y-auto p-6 bg-white dark:bg-slate-800/95 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
					{renderStepContent()}
				</div>
			</div>
		</div>
	);
}
