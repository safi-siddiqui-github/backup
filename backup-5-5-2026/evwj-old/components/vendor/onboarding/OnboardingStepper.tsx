"use client";

import { Check } from "lucide-react";
import React from "react";

export default function OnboardingStepper({
	currentStep,
}: {
	currentStep: number;
}) {
	const steps = ["Account", "Services", "Service Area", "Business Details"];

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
                  ${isCompleted || isActive ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400" : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"}`}
							>
								{isCompleted ? (
									<Check className="h-4 w-4" />
								) : (
									step
								)}
							</div>
							<span
								className={`text-xs mt-2 text-center ${
									isCompleted || isActive
										? "text-foreground font-bold"
										: "text-muted-foreground"
								}`}
							>
								{label}
							</span>
						</div>
						{step < steps.length && (
							<div
								className={`flex-1 h-0.5 self-center mx-2 ${
									isCompleted
										? "bg-purple-600 dark:bg-purple-400"
										: "bg-gray-300 dark:bg-gray-600"
								}`}
							></div>
						)}
					</React.Fragment>
				);
			})}
		</nav>
	);
}

