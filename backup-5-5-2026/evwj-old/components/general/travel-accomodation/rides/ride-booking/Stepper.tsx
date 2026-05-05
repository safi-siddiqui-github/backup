"use client";

import React from "react";
import { Check } from "lucide-react";

export default function Stepper({ currentStep }: { currentStep: number }) {
	const steps = ["Details", "Payment", "Confirmation"];
	return (
		<nav className="flex items-center justify-between w-full p-3">
			{steps.map((label, idx) => {
				const step = idx + 1;
				const isActive = step === currentStep;
				const isCompleted = step < currentStep;
				return (
					<React.Fragment key={step}>
						<div
							className="flex flex-col items-center shrink-0"
							style={{ width: 80 }}
						>
							<div
								className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold border-2 transition-all duration-200
                  ${isCompleted || isActive ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-400"}`}
							>
								{isCompleted ? <Check className="h-4 w-4" /> : step}
							</div>
							<span
								className={`text-xs mt-2 text-center ${isCompleted || isActive ? "text-gray-800 font-bold" : "text-gray-500"}`}
							>
								{label}
							</span>
						</div>
						{step < steps.length && (
							<div
								className={`flex-1 h-0.5 self-center mx-2 ${isCompleted ? "bg-blue-500" : "bg-gray-300"}`}
							></div>
						)}
					</React.Fragment>
				);
			})}
		</nav>
	);
}
