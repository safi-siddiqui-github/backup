"use client";

import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ currentStep }: { currentStep: number }) => {
	const steps = [
		"Selection",
		"Room Selection",
		"Guest Info",
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
                  ${isActive || isCompleted ? "border-indigo-600 dark:border-indigo-400" : "border-gray-300 dark:border-slate-600"}
                  ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}
                  ${isCompleted ? "text-indigo-600 dark:text-indigo-400" : ""}
                  ${!isActive && !isCompleted ? "text-gray-400 dark:text-slate-500" : ""}
                `}
							>
								{isCompleted ? <Check className="h-5 w-5" /> : step}
							</div>
							<span
								className={`text-xs mt-2 text-center transition-all duration-300
                ${isActive || isCompleted ? "text-foreground font-bold" : "text-muted-foreground font-medium"}`}
							>
								{label}
							</span>
						</div>
						{step < steps.length && (
							<div
								className={`flex-1 h-0.5 self-center mx-2 sm:mx-4 ${isCompleted ? "bg-indigo-600 dark:bg-indigo-400" : "bg-gray-300 dark:bg-slate-600"}`}
							></div>
						)}
					</React.Fragment>
				);
			})}
		</nav>
	);
};

export default Stepper;
