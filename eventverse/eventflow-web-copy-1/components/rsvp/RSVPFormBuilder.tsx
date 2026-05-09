"use client";

import { Button } from "@/components/ui/button";
import { CustomField, FoodChoice, RSVPGroup, RSVPSettings } from "@/types/rsvp";
import {
  CheckSquare,
  Eye,
  Mail,
  MapPin,
  MessageSquare,
  Music,
  Phone,
  Settings,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import FormCanvas from "./FormCanvas";
import FormFieldLibrary from "./FormFieldLibrary";
import FormPreview from "./FormPreview";

export interface FormFieldTwo {
  id: string;
  type: "predefined" | "custom" | "food";
  fieldType: string;
  label: string;
  required: boolean;
  order: number;
  config?: {
    placeholder: string;
    options: string[];
    choices: {
      name?: string;
    }[];
  };
}

interface RSVPFormBuilderProps {
  customFields: CustomField[];
  onUpdateCustomFields: (fields: CustomField[]) => void;
  foodChoices: FoodChoice[];
  onUpdateFoodChoices: (choices: FoodChoice[]) => void;
  settings: RSVPSettings;
  onUpdateSettings: (settings: RSVPSettings) => void;
  groups: RSVPGroup[];
  event: unknown;
}

const RSVPFormBuilder = ({
  customFields,
  onUpdateCustomFields,
  foodChoices,
  onUpdateFoodChoices,
  settings,
  onUpdateSettings,
  groups,
  event,
}: RSVPFormBuilderProps) => {
  const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder");
  const [formFields, setFormFields] = useState<FormFieldTwo[]>([
    {
      id: "1",
      type: "predefined",
      fieldType: "name",
      label: "Full Name",
      required: true,
      order: 1,
    },
    {
      id: "2",
      type: "predefined",
      fieldType: "email",
      label: "Email Address",
      required: true,
      order: 2,
    },
    {
      id: "3",
      type: "predefined",
      fieldType: "rsvp-response",
      label: "Will you be attending?",
      required: true,
      order: 3,
    },
  ]);

  const predefinedFields: CustomField[] = [
    {
      id: "name",
      type: "predefined",
      label: "Full Name",
      icon: User,
      description: "Guest full name (required)",
      required: true,
    },
    {
      id: "email",
      type: "predefined",
      label: "Email Address",
      icon: Mail,
      description: "Contact email (required)",
      required: true,
    },
    {
      id: "phone",
      type: "predefined",
      label: "Phone Number",
      icon: Phone,
      description: "Contact phone number",
      required: false,
    },
    {
      id: "rsvp-response",
      type: "predefined",
      label: "RSVP Response",
      icon: CheckSquare,
      description: "Yes/No/Maybe response",
      required: true,
    },
    {
      id: "plus-ones",
      type: "predefined",
      label: "Plus Ones",
      icon: Users,
      description: "Number of additional guests",
      required: false,
    },
    {
      id: "group-selection",
      type: "predefined",
      label: "Guest Group",
      icon: Users,
      description: "Select guest category",
      required: false,
    },
    {
      id: "dietary-restrictions",
      type: "predefined",
      label: "Dietary Restrictions",
      icon: Utensils,
      description: "Food allergies and preferences",
      required: false,
    },
    {
      id: "special-accommodations",
      type: "predefined",
      label: "Special Accommodations",
      icon: MapPin,
      description: "Accessibility requirements",
      required: false,
    },
    {
      id: "song-requests",
      type: "predefined",
      label: "Song Requests",
      icon: Music,
      description: "Music preferences",
      required: false,
    },
    {
      id: "message-to-hosts",
      type: "predefined",
      label: "Message to Hosts",
      icon: MessageSquare,
      description: "Personal note or wishes",
      required: false,
    },
  ];

  const addField = (fieldData: FormFieldTwo, insertIndex?: number) => {
    const newField: FormFieldTwo = {
      id: Date.now().toString(),
      type: fieldData.type,
      fieldType: fieldData.id || fieldData.fieldType || fieldData.type,
      label: fieldData.label,
      required: fieldData.required || false,
      order: insertIndex !== undefined ? insertIndex : formFields.length + 1,
      config: fieldData.config,
    };

    let updatedFields = [...formFields];

    if (insertIndex !== undefined) {
      // Insert at specific position and reorder
      updatedFields.splice(insertIndex, 0, newField);
      updatedFields = updatedFields.map((field, index) => ({
        ...field,
        order: index + 1,
      }));
    } else {
      // Add to end
      updatedFields.push(newField);
    }

    setFormFields(updatedFields);
  };

  const removeField = (fieldId: string) => {
    const updatedFields = formFields
      .filter((field) => field.id !== fieldId)
      .map((field, index) => ({
        ...field,
        order: index + 1,
      }));
    setFormFields(updatedFields);
  };

  const updateField = (fieldId: string, updates: Partial<FormFieldTwo>) => {
    setFormFields(
      formFields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field,
      ),
    );
  };

  const reorderFields = (draggedId: string, targetId: string) => {
    const draggedIndex = formFields.findIndex((f) => f.id === draggedId);
    const targetIndex = formFields.findIndex((f) => f.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newFields = [...formFields];
    const [draggedField] = newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, draggedField);

    // Update order numbers
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1,
    }));

    setFormFields(reorderedFields);
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">RSVP Form Builder</h2>
          <p className="text-purple-100">
            Design your perfect guest response form
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "builder" ? "default" : "outline"}
            onClick={() => setActiveTab("builder")}
            className={
              activeTab === "builder"
                ? ""
                : "border-white/20 bg-white/10 text-white"
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            Form Builder
          </Button>
          <Button
            variant={activeTab === "preview" ? "default" : "outline"}
            onClick={() => setActiveTab("preview")}
            className={
              activeTab === "preview"
                ? ""
                : "border-white/20 bg-white/10 text-white"
            }
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      {activeTab === "builder" ? (
        <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Field Library Sidebar */}
          <div className="lg:col-span-1">
            <FormFieldLibrary
              predefinedFields={predefinedFields}
              customFields={customFields}
              onUpdateCustomFields={onUpdateCustomFields}
              foodChoices={foodChoices}
              onUpdateFoodChoices={onUpdateFoodChoices}
              onAddField={addField}
            />
          </div>

          {/* Form Canvas */}
          <div className="lg:col-span-3">
            <FormCanvas
              formFields={formFields}
              onUpdateField={updateField}
              onRemoveField={removeField}
              onReorderFields={reorderFields}
              onAddField={addField}
              settings={settings}
              groups={groups}
            />
          </div>
        </div>
      ) : (
        <FormPreview
          formFields={formFields}
          customFields={customFields}
          foodChoices={foodChoices}
          settings={settings}
          groups={groups}
          event={event}
        />
      )}
    </div>
  );
};

export default RSVPFormBuilder;
