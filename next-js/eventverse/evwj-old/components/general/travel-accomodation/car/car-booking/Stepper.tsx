"use client";

import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		"Selection",
		"Driver Info",
		"Insurance",
		"Add-ons",
		"Payment",
		"Confirmation",
	];
	return (
		<nav className="flex items-center justify-between w-full p-4 font-inter">
			{steps.map((label, index) => {
				const step = index + 1;
				const isActive = step === currentStep;
				const isCompleted = step < currentStep;
				return (
					<React.Fragment key={step}>
						<div
							className="flex flex-col items-center shrink-0"
							style={{ width: "80px" }}
						>
							<div
								className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold border-2 transition-all duration-300
                  ${isActive || isCompleted ? "border-blue-500" : "border-gray-300"}
                  ${isActive ? "text-blue-500" : ""}
                  ${isCompleted ? "text-blue-500" : ""}
                  ${!isActive && !isCompleted ? "text-gray-400" : ""}
                `}
							>
								{isCompleted ? <Check className="h-5 w-5" /> : step}
							</div>
							<span
								className={`text-xs mt-2 text-center transition-all duration-300 ${isActive || isCompleted ? "text-gray-800 font-bold" : "text-gray-500 font-medium"}`}
							>
								{label}
							</span>
						</div>
						{step < steps.length && (
							<div
								className={`flex-1 h-0.5 self-center mx-2 sm:mx-4 ${isCompleted ? "bg-blue-500" : "bg-gray-300"}`}
							></div>
						)}
					</React.Fragment>
				);
			})}
		</nav>
	);
};

export default Stepper;
