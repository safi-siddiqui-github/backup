"use client";

import {
	Check,
	Sparkles,
	Mail,
	Users,
	MessageSquare,
	CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
	hasAudienceStep: boolean;
}

export default function StepIndicator({
	currentStep,
	totalSteps,
	hasAudienceStep,
}: StepIndicatorProps) {
	const steps = [
		{
			number: 1,
			label: "Campaign",
			subLabel: "Details",
			icon: Sparkles,
		},
		{
			number: 2,
			label: "Choose",
			subLabel: "Channels",
			icon: Mail,
		},
		...(hasAudienceStep
			? [
					{
						number: 3,
						label: "Select",
						subLabel: "Audience",
						icon: Users,
					},
				]
			: []),
		{
			number: hasAudienceStep ? 4 : 3,
			label: "Create",
			subLabel: "Content",
			icon: MessageSquare,
		},
		{
			number: hasAudienceStep ? 5 : 4,
			label: "Review &",
			subLabel: "Launch",
			icon: CheckCircle2,
		},
	];

	return (
		<div className="w-full pb-6">
			{/* Progress Bar at Top */}
			<div className="mb-6">
				<Progress
					value={((currentStep - 1) / (totalSteps - 1)) * 100}
					className=" bg-gray-200 dark:bg-slate-700 [&>div]:bg-blue-600"
				/>
			</div>

			{/* Steps Container */}
			<div className="relative">
				{/* Steps */}
				<div className="relative flex justify-between items-start">
					{steps.map((step, index) => {
						const Icon = step.icon;
						const isCompleted = currentStep > step.number;
						const isCurrent = currentStep === step.number;
						const isUpcoming = currentStep < step.number;

						return (
							<div
								key={step.number}
								className="flex flex-col items-center"
								style={{
									width: `${100 / steps.length}%`,
									maxWidth: "140px",
								}}
							>
								{/* Circle Icon Container - Fixed height to prevent layout shift */}
								<div className="h-[52px] flex items-center justify-center">
									<div
										className={cn(
											"rounded-full flex items-center justify-center transition-all duration-300",
											isCompleted &&
												"w-[44px] h-[44px] bg-green-50 dark:bg-green-950/30 border-2 border-green-600 text-green-600",
											isCurrent &&
												"w-[52px] h-[52px] bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-600 text-blue-600",
											isUpcoming &&
												"w-[44px] h-[44px] bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 text-gray-400",
										)}
									>
										{isCompleted ? (
											<Check className="h-5 w-5 stroke-[2.5]" />
										) : (
											<Icon className={cn("h-5 w-5", isCurrent && "h-6 w-6")} />
										)}
									</div>
								</div>

								{/* Label */}
								<div className="mt-2 text-center px-1">
									<div
										className={cn(
											"text-xs font-semibold leading-tight transition-colors",
											isCurrent && "text-blue-600 dark:text-blue-400",
											isCompleted && "text-green-600 dark:text-green-400",
											isUpcoming && "text-gray-500 dark:text-gray-400",
										)}
									>
										{step.label}
									</div>
									<div
										className={cn(
											"text-xs font-semibold leading-tight transition-colors",
											isCurrent && "text-blue-600 dark:text-blue-400",
											isCompleted && "text-green-600 dark:text-green-400",
											isUpcoming && "text-gray-500 dark:text-gray-400",
										)}
									>
										{step.subLabel}
									</div>
									<div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
										Step {step.number}/{totalSteps}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
