"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Edit2, MapPin, Users } from "lucide-react";
import { EventFormData } from "./EnhancedEventCreationDialog";

const EventPreview = ({
  formData,
  onBack,
  onNext,
  onEdit,
}: {
  formData?: EventFormData;
  onBack: () => void;
  onNext: () => void;
  onEdit: (num?: number) => void;
}) => {
  const formatEventDate = () => {
    if (formData?.endDate && formData.endDate !== formData.startDate) {
      return `${format(formData?.startDate ?? "", "MMM d")} - ${format(formData.endDate, "MMM d, yyyy")}`;
    }
    return format(formData?.startDate ?? "", "MMMM d, yyyy");
  };

  const getMealOptionsText = () => {
    if (!formData?.mealOptions || formData.mealOptions.length === 0)
      return null;
    return formData.mealOptions
      .map((option) => {
        switch (option) {
          case "vegetarian":
            return "Vegetarian";
          case "vegan":
            return "Vegan";
          case "glutenFree":
            return "Gluten-Free";
          case "halal":
            return "Halal";
          case "kosher":
            return "Kosher";
          default:
            return option;
        }
      })
      .join(", ");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="font-semibold">Event Preview</h3>
          <p className="text-sm text-gray-600">
            How guests will see your event
          </p>
        </div>
      </div>

      <div className="max-h-96 space-y-4 overflow-y-auto">
        {/* Guest View Preview */}
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {/* Event Header */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-800">
                {formData?.eventName}
              </h1>
              <p className="text-lg font-medium text-purple-600">
                {formData?.eventType}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">{formatEventDate()}</p>
                  {formData?.time && (
                    <p className="text-sm text-gray-600">at {formData.time}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-600" />
                <div>
                  {formData?.locations?.map((location, index) => (
                    <div
                      key={index}
                      className="mb-2"
                    >
                      <p className="font-medium">{location.name}</p>
                      {location.address && (
                        <p className="text-sm text-gray-600">
                          {location.address}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              {formData?.dressCode && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Dress Code</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {formData.dressCode}
                    </p>
                  </div>
                </div>
              )}

              {getMealOptionsText() && (
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="font-medium text-blue-800">
                    Dietary Options Available
                  </p>
                  <p className="text-sm text-blue-600">
                    {getMealOptionsText()}
                  </p>
                </div>
              )}

              {formData?.giftRegistryUrl && (
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="font-medium text-green-800">Gift Registry</p>
                  <p className="text-sm text-green-600">
                    Registry available online
                  </p>
                </div>
              )}

              {formData?.transportationDetails && (
                <div className="rounded-lg bg-yellow-50 p-3">
                  <p className="font-medium text-yellow-800">Transportation</p>
                  <p className="text-sm text-yellow-700">
                    {formData.transportationDetails}
                  </p>
                </div>
              )}

              {formData?.specialRequirements && (
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="font-medium text-purple-800">
                    Special Information
                  </p>
                  <p className="text-sm text-purple-700">
                    {formData.specialRequirements}
                  </p>
                </div>
              )}
            </div>

            {/* RSVP Section */}
            <div className="mt-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-center text-white">
              <h3 className="mb-2 font-semibold">RSVP Required</h3>
              <p className="text-sm opacity-90">Please respond by [Date]</p>
              <Button className="mt-3 bg-white text-purple-600 hover:bg-gray-100">
                RSVP Now
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Options */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onEdit(1)}
            className="flex-1 text-sm"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Details
          </Button>
          <Button
            variant="outline"
            onClick={() => onEdit(3)}
            className="flex-1 text-sm"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Add-ons
          </Button>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-white hover:from-purple-700 hover:to-blue-700"
      >
        Next: Send Invitations
      </Button>
    </div>
  );
};

export default EventPreview;
