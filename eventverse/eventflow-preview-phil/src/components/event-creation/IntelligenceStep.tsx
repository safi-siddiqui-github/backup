
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import Phase3IntelligenceHub from "../ai/Phase3IntelligenceHub";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const IntelligenceStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
          <Brain className="w-4 h-4 text-purple-600" />
          <span className="text-purple-800 text-sm font-medium">Advanced Intelligence</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">AI-Powered Event Optimization</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Let our advanced AI systems optimize every aspect of your event for maximum success and guest satisfaction.
        </p>
      </div>

      <Phase3IntelligenceHub
        eventData={formData}
        onUpdateEvent={onUpdate}
      />

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
        >
          Continue to Preview
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default IntelligenceStep;
