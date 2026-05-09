import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";

type NavigationButtonsProps = {
  currentStep: number;
  totalSteps: number;
  isCurrentStepValid: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
  onSaveDraft: () => void;
};

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
    <div className="fixed right-0  bottom-0 left-0 border-t shadow-lg backdrop-blur dark:bg-slate-800/95">
      <div className="container mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="cursor-pointer border-gray-300 px-6 text-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer" />
            Previous
          </Button>

          <Button
            variant="ghost"
            onClick={onSaveDraft}
            className="cursor-pointer bg-gray-200 px-6"
          >
            Save Draft
            <FileText className="ml-2 h-4 w-4" />
          </Button>

          {!isLastStep ? (
            <Button
              onClick={onNext}
              disabled={!isCurrentStepValid}
              className={cn(
                "cursor-pointer px-8 transition-all duration-200",
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
                "from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-linear-to-r px-8 transition-all duration-200",
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
