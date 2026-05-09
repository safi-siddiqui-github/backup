
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentBlockEditor } from "@/components/ui/content-block-editor";
import { Globe, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventFormData } from "../EnhancedEventCreationDialog";
import EventNameSuggestions from "../ai/EventNameSuggestions";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const EventDetailsForm = ({ formData, onUpdate }: Props) => {
  const handleInputChange = (field: keyof EventFormData, value: any) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label htmlFor="eventName" className="text-base font-semibold flex items-center gap-2">
            Event Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="eventName"
            placeholder="Enter your event name"
            value={formData.eventName}
            onChange={(e) => handleInputChange("eventName", e.target.value)}
            className="text-lg h-12 border-2 focus:border-purple-500"
          />
        </div>

        <EventNameSuggestions
          eventType={formData.eventType}
          description={formData.description}
          onSuggestionSelect={(name) => handleInputChange("eventName", name)}
          currentName={formData.eventName}
        />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Event Visibility</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                formData.isPublic 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => handleInputChange("isPublic", true)}
            >
              <Globe className="w-5 h-5 text-purple-600 mb-2" />
              <div className="font-medium">Public Event</div>
              <div className="text-sm text-gray-600">Anyone can discover and attend</div>
            </button>
            <button
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                !formData.isPublic 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => handleInputChange("isPublic", false)}
            >
              <Users className="w-5 h-5 text-purple-600 mb-2" />
              <div className="font-medium">Private Event</div>
              <div className="text-sm text-gray-600">Invitation only</div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="description" className="text-base font-semibold">Description</Label>
        <ContentBlockEditor
          blocks={formData.descriptionBlocks || []}
          onChange={(blocks) => handleInputChange("descriptionBlocks", blocks)}
          placeholder="Describe what makes your event special..."
          showAISuggestions={true}
        />
        <p className="text-sm text-muted-foreground">This will be shown to your guests</p>
      </div>
    </div>
  );
};

export default EventDetailsForm;
