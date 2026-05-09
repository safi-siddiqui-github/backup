"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import ModuleCompletionTracker from "./ModuleCompletionTracker";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EventConfigurationStep = ({
  formData,
  onUpdate,
  onNext,
  onBack,
}: Props) => {
  return (
    <div className="p-6">
      <div className="mb-6 space-y-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
          <Settings className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Event Configuration
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Review your module setup
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Here&apos;s the current status of your selected modules. Don&apos;t
          worry - you can configure everything in detail after creating your
          event.
        </p>
      </div>

      <ModuleCompletionTracker
        selectedModules={formData.selectedModules}
        moduleConfigurations={formData.moduleConfigurations}
        eventType={formData.eventType}
      />

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Features
        </Button>

        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 text-white hover:from-purple-700 hover:to-blue-700"
        >
          Continue to Launch
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventConfigurationStep;
