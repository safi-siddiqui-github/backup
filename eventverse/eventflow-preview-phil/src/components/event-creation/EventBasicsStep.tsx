
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ContentBlockEditor } from "@/components/ui/content-block-editor";
import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";
import EventTypeSelector from "./EventTypeSelector";
import DateTimeManager from "./DateTimeManager";
import LocationManager from "./LocationManager";
import AIThemeGenerator from "./AIThemeGenerator";
import CompactPhotoUpload from "./CompactPhotoUpload";
import ModernEventTypeSelector from "./ModernEventTypeSelector";
import ExpandableEventDetails from "./ExpandableEventDetails";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
}

const EventBasicsStep = ({ formData, onUpdate, onNext }: Props) => {
  const canProceed = formData.eventName && formData.eventType && formData.eventDates.startDate && formData.locations[0].name;

  const handleMainPhotoUpdate = (photoId: string | null) => {
    onUpdate({
      eventPhotos: {
        ...formData.eventPhotos,
        mainPhoto: photoId
      }
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center mb-8">
        <CalendarDays className="w-12 h-12 mx-auto text-purple-600 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Event Basics</h3>
        <p className="text-gray-600">Let's start with the fundamentals of your event</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="eventName" className="text-base font-semibold">Event Name *</Label>
            <Input
              id="eventName"
              value={formData.eventName}
              onChange={(e) => onUpdate({ eventName: e.target.value })}
              placeholder="Enter your event name"
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-base font-semibold">Description</Label>
            <ContentBlockEditor
              blocks={formData.descriptionBlocks || []}
              onChange={(blocks) => onUpdate({ descriptionBlocks: blocks })}
              placeholder="Describe your event..."
              showAISuggestions={true}
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-6">
          <CompactPhotoUpload
            mainPhoto={formData.eventPhotos?.mainPhoto || null}
            onPhotoUpdate={handleMainPhotoUpdate}
          />
        </div>
      </div>

      {/* Full-width Event Type Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Event Type *</Label>
        <ModernEventTypeSelector 
          selectedType={formData.eventType}
          onTypeSelect={(type) => onUpdate({ eventType: type })}
        />
      </div>

      <div className="border-t border-gray-200 pt-8">
        <AIThemeGenerator 
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      <div className="space-y-6">
        <DateTimeManager 
          formData={formData}
          onUpdate={onUpdate}
        />

        <LocationManager 
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      {/* Additional Event Details - Expandable Section */}
      <div className="border-t border-gray-200 pt-8">
        <ExpandableEventDetails 
          formData={formData}
          onUpdate={onUpdate}
        />
      </div>

      <div className="flex justify-end pt-6">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2"
        >
          Continue to Features
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventBasicsStep;
