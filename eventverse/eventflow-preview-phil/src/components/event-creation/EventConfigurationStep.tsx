
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

const EventConfigurationStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  return (
    <div className="p-6">
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
          <Settings className="w-4 h-4 text-blue-600" />
          <span className="text-blue-800 text-sm font-medium">Event Configuration</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Review your module setup</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here's the current status of your selected modules. Don't worry - you can configure everything in detail after creating your event.
        </p>
      </div>

      <ModuleCompletionTracker 
        selectedModules={formData.selectedModules}
        moduleConfigurations={formData.moduleConfigurations}
        eventType={formData.eventType}
      />

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Features
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
        >
          Continue to Launch
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default EventConfigurationStep;
