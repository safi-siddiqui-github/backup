import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

type Step = {
	id: string;
	title: string;
	icon: React.ReactNode;
	isComplete: boolean;
	isRequired: boolean;
}

type StepperProgressProps ={
	steps: Step[];
	currentStep: number;
	onStepClick: (stepIndex: number) => void;
}

export const StepperProgress = ({
	steps,
	currentStep,
	onStepClick,
}: StepperProgressProps) => {
	const overallCompletion =
		steps.length > 0
			? Math.round(((currentStep + 0.5) / steps.length) * 100)
			: 0;

	return (
		<div className="  dark:bg-slate-800/95 mt-5  w-full   backdrop-blur ">
			<div className="container mx-auto max-w-4xl px-4 py-4">
				<div  className="mb-2">
					<div className="bg-muted-foreground/20 relative h-1 overflow-hidden rounded-full">
						<div
							className="from-primary to-primary/80 absolute inset-y-0 left-0 bg-linear-to-r transition-all duration-500 ease-out"
							style={{ width: `${overallCompletion}%` }}
						/>
					</div>
					<p className="text-muted-foreground mt-1.5 text-right text-xs">
						{overallCompletion}% Complete
					</p>
				</div>

				<div className="flex items-center justify-between">
					{steps.map((step, index) => {
						const isCurrent = index === currentStep;
						const isPast = index < currentStep;
						const isClickable = isPast;

						return (
							<React.Fragment key={step.id}>
								<div className="flex flex-col items-center gap-2">
									<button
										onClick={() => isClickable && onStepClick(index)}
										disabled={!isClickable}
										className={cn(
											"relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
											isPast &&
												"bg-primary text-primary-foreground cursor-pointer hover:scale-110",
											isCurrent &&
												"border-primary bg-primary/10 text-primary border-2",
											!isCurrent &&
												!isPast &&
												"border-muted-foreground/30 bg-background text-muted-foreground border-2",
											isClickable && "hover:shadow-md",
										)}
									>
										{isPast ? (
											<Check className="h-4 w-4" />
										) : (
											<span className="text-xs font-bold">{index + 1}</span>
										)}
									</button>

									<div className="min-w-0 text-center">
										<p
											className={cn(
												"truncate text-xs font-medium transition-colors",
												isCurrent && "text-primary",
												isPast && "text-foreground",
												!isCurrent && !isPast && "text-muted-foreground",
											)}
										>
											{step.title}
										</p>
										<p className="text-muted-foreground text-[10px]">
											{isPast && "Completed"}
											{isCurrent && "In Progress"}
											{!isCurrent &&
												!isPast &&
												(step.isRequired ? "Required" : "Optional")}
										</p>
									</div>
								</div>

								{index < steps.length - 1 && (
									<div className="mx-2 h-0.5 flex-1 self-start mt-4">
										<div
											className={cn(
												"h-full rounded-full transition-all duration-500",
												isPast ? "bg-primary" : "bg-muted-foreground/20",
											)}
										/>
									</div>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</div>
	);
};
