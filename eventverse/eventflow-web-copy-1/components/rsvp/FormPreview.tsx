"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomField, FoodChoice, RSVPGroup, RSVPSettings } from "@/types/rsvp";
import RSVPForm from "../RSVPForm";

interface FormPreviewProps {
  formFields: unknown[];
  customFields: CustomField[];
  foodChoices: FoodChoice[];
  settings: RSVPSettings;
  groups: RSVPGroup[];
  event: unknown;
}

const FormPreview = ({
  formFields,
  customFields,
  foodChoices,
  settings,
  groups,
  event,
}: FormPreviewProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Form Preview</span>
            <span className="text-sm font-normal text-gray-500">
              - This is how guests will see your RSVP form
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-1">
            <div className="overflow-hidden rounded-lg bg-white">
              <RSVPForm
                event={event}
                groups={groups}
                customFields={customFields}
                foodChoices={foodChoices}
                settings={settings}
                onBack={() => {}}
                isPreview={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormPreview;
