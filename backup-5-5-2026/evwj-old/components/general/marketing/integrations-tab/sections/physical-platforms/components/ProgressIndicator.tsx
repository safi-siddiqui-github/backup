import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

export default function ProgressIndicator({
	currentStep,
	totalSteps,
}: ProgressIndicatorProps) {
	return (
		<div className="flex items-center gap-2 my-6">
			{Array.from({ length: totalSteps }).map((_, index) => {
				const step = index + 1;
				const isCompleted = step < currentStep;
				const isCurrent = step === currentStep;

				return (
					<div key={step} className="flex items-center flex-1">
						<div className="flex items-center gap-2 flex-1">
							<div
								className={cn(
									"w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
									isCompleted
										? "bg-blue-600 text-white"
										: isCurrent
											? "bg-blue-600 text-white"
											: "bg-muted text-muted-foreground",
								)}
							>
								{isCompleted ? <Check className="h-4 w-4" /> : step}
							</div>
							{step < totalSteps && (
								<div
									className={cn(
										"h-0.5 flex-1",
										step < currentStep ? "bg-blue-600" : "bg-muted",
									)}
								/>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
