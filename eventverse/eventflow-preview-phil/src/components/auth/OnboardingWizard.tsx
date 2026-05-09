import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { User, OnboardingData } from "@/types/auth";
import { eventInterestOptions } from "@/data/mockAuthResponses";

interface OnboardingWizardProps {
  user: User;
  onComplete: (data: OnboardingData) => void;
}

const OnboardingWizard = ({ user, onComplete }: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    eventInterests: [],
    notifications: { events: true, tips: false, updates: false }
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(data as OnboardingData);
  };

  const toggleInterest = (id: string) => {
    setData(prev => ({
      ...prev,
      eventInterests: prev.eventInterests?.includes(id)
        ? prev.eventInterests.filter(i => i !== id)
        : [...(prev.eventInterests || []), id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl p-8">
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Welcome, {user.name}! 🎉</h2>
            <p className="text-muted-foreground text-lg">Let's personalize your EventVerse experience</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">What types of events interest you?</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {eventInterestOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = data.eventInterests?.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleInterest(option.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 scale-105'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{option.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">How often do you organize events?</h2>
            </div>
            <div className="space-y-3">
              {[
                { value: 'first-time', label: 'First-time organizer', desc: 'This is my first event' },
                { value: 'occasional', label: 'Occasionally', desc: '1-2 events per year' },
                { value: 'regular', label: 'Regularly', desc: '3-6 events per year' },
                { value: 'frequent', label: 'Frequently', desc: 'Monthly events' },
                { value: 'professional', label: 'Professional', desc: 'Weekly or daily events' }
              ].map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => setData(prev => ({ ...prev, organizingFrequency: freq.value as any }))}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    data.organizingFrequency === freq.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold">{freq.label}</p>
                  <p className="text-sm text-muted-foreground">{freq.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Would you like a quick tour?</h2>
            </div>
            <div className="space-y-3">
              {[
                { value: 'interactive', label: 'Interactive Tour', desc: 'Step-by-step guided tour (5 min)' },
                { value: 'video', label: 'Video Tutorial', desc: 'Watch a quick overview (3 min)' },
                { value: 'skip', label: 'Skip Tour', desc: 'Go directly to dashboard' }
              ].map((tour) => (
                <button
                  key={tour.value}
                  onClick={() => setData(prev => ({ ...prev, wantsTour: tour.value !== 'skip', tourType: tour.value as any }))}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    data.tourType === tour.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold">{tour.label}</p>
                  <p className="text-sm text-muted-foreground">{tour.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Complete Setup 🎉
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OnboardingWizard;
