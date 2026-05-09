import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface NavigationButtonsProps {
	currentStep: number;
	totalSteps: number;
	isCurrentStepValid: boolean;
	isLastStep: boolean;
	onPrevious: () => void;
	onNext: () => void;
	onComplete: () => void;
	onSaveDraft: () => void;
}

export const NavigationButtons = ({
	currentStep,
	totalSteps,
	isCurrentStepValid,
	isLastStep,
	onPrevious,
	onNext,
	onComplete,
	onSaveDraft,
}: NavigationButtonsProps) => {
	return (
		<div className="bg-background/95 dark:bg-slate-800/95 sticky bottom-0 border-t shadow-lg backdrop-blur [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
			<div className="container mx-auto max-w-4xl px-4 py-4">
				<div className="flex items-center justify-between gap-4">
					{/* Previous Button */}
					<Button
						variant="outline"
						onClick={onPrevious}
						disabled={currentStep === 0}
						className="px-6"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Previous
					</Button>

					{/* Save Draft Button */}
					<Button variant="ghost" onClick={onSaveDraft} className="px-6">
						Save Draft
					</Button>

					{/* Next/Complete Button */}
					{!isLastStep ? (
						<Button
							onClick={onNext}
							disabled={!isCurrentStepValid}
							className={cn(
								"px-8 transition-all duration-200",
								isCurrentStepValid &&
									"shadow-primary/30 shadow-md hover:scale-[1.02]",
							)}
						>
							Next
							<ArrowRight className="h-4 w-4" />
						</Button>
					) : (
						<Button
							onClick={onComplete}
							disabled={!isCurrentStepValid}
							className={cn(
								"from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r px-8 transition-all duration-200",
								isCurrentStepValid &&
									"shadow-primary/30 shadow-md hover:scale-[1.02]",
							)}
						>
							<Check className="h-4 w-4" />
							Create Event
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
