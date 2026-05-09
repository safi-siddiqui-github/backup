import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export interface WizardStep {
  title: string;
  description: string;
  content: React.ReactNode;
  canContinue: boolean;
}

interface ConfigurationWizardProps {
  steps: WizardStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfigurationWizard = ({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  onCancel,
  isLoading = false
}: ConfigurationWizardProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                index < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : index === currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all ${
                  index < currentStep ? "bg-green-500" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {currentStepData.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentStepData.description}
          </p>
        </div>
        <div className="min-h-[300px]">{currentStepData.content}</div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onCancel : () => onStepChange(currentStep - 1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 0 ? "Cancel" : "Back"}
        </Button>

        {isLastStep ? (
          <Button
            onClick={onComplete}
            disabled={!currentStepData.canContinue || isLoading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            {isLoading ? "Connecting..." : "Complete Setup"}
            <Check className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={() => onStepChange(currentStep + 1)}
            disabled={!currentStepData.canContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfigurationWizard;
