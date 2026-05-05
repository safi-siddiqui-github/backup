import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
	id: string;
	title: string;
	icon: React.ReactNode;
	isComplete: boolean;
	isRequired: boolean;
}

interface StepperProgressProps {
	steps: Step[];
	currentStep: number;
	onStepClick: (stepIndex: number) => void;
}

export const StepperProgress = ({
	steps,
	currentStep,
	onStepClick,
}: StepperProgressProps) => {
	// Progress is based on stepper position, aligned to the center of each step circle
	const overallCompletion =
		steps.length > 0
			? Math.round(((currentStep + 0.5) / steps.length) * 100)
			: 0;

	return (
		<div className="bg-background/95 dark:bg-slate-800/95 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
			<div className="container mx-auto max-w-4xl px-4 py-4">
				{/* Linear Progress Bar */}
				<div className="mb-4">
					<div className="bg-muted-foreground/20 relative h-1 overflow-hidden rounded-full">
						<div
							className="from-primary to-primary/80 absolute inset-y-0 left-0 bg-gradient-to-r transition-all duration-500 ease-out"
							style={{ width: `${overallCompletion}%` }}
						/>
					</div>
					<p className="text-muted-foreground mt-1.5 text-right text-xs">
						{overallCompletion}% Complete
					</p>
				</div>

				{/* Steps */}
				<div className="flex items-center justify-between">
					{steps.map((step, index) => {
						const isCurrent = index === currentStep;
						const isPast = index < currentStep;
						const isClickable = isPast;

						return (
							<div key={step.id} className="flex flex-1 items-center">
								{/* Step Circle */}
								<button
									onClick={() => isClickable && onStepClick(index)}
									disabled={!isClickable}
									className={cn(
										"relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
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

								{/* Step Info */}
								<div className="ml-2 min-w-0 flex-1">
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

								{/* Connecting Line */}
								{index < steps.length - 1 && (
									<div className="mx-2 h-0.5 w-8">
										<div
											className={cn(
												"h-full rounded-full transition-all duration-500",
												isPast ? "bg-primary" : "bg-muted-foreground/20",
											)}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
