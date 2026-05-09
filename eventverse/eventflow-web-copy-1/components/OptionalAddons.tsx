import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Camera,
  Car,
  Gift,
  Heart,
  Home,
  Music,
  Shirt,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "./EnhancedEventCreationDialog";

const mealOptions = [
  { id: "vegetarian", label: "Vegetarian Options", icon: Utensils },
  { id: "vegan", label: "Vegan Options", icon: Utensils },
  { id: "glutenFree", label: "Gluten-Free Options", icon: Utensils },
  { id: "halal", label: "Halal Options", icon: Utensils },
  { id: "kosher", label: "Kosher Options", icon: Utensils },
];

const additionalFeatures = [
  {
    id: "giftRegistry",
    label: "Gift Registry",
    icon: Gift,
    description: "Let guests know where to find gifts",
  },
  {
    id: "dressCode",
    label: "Dress Code",
    icon: Shirt,
    description: "Specify attire expectations",
  },
  {
    id: "transportation",
    label: "Transportation Info",
    icon: Car,
    description: "Parking and travel details",
  },
  {
    id: "accommodation",
    label: "Accommodation",
    icon: Home,
    description: "Hotel recommendations",
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
    description: "Professional photo services",
  },
  {
    id: "music",
    label: "Music Preferences",
    icon: Music,
    description: "DJ or live entertainment",
  },
  {
    id: "welcomeGifts",
    label: "Welcome Gifts",
    icon: Heart,
    description: "Party favors for guests",
  },
];

const OptionalAddons = ({
  formData,
  onUpdate,
  onBack,
  onNext,
}: {
  formData: Partial<EventFormData>;
  onUpdate: (event: Partial<EventFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}) => {
  const [selectedMeals, setSelectedMeals] = useState(
    formData.mealOptions || [],
  );
  const [selectedFeatures, setSelectedFeatures] = useState(
    formData.additionalFeatures || [],
  );
  const [customDetails, setCustomDetails] = useState({
    dressCode: formData.dressCode || "",
    giftRegistryUrl: formData.giftRegistryUrl || "",
    transportationDetails: formData.transportationDetails || "",
    accommodationDetails: formData.accommodationDetails || "",
    musicPreferences: formData.musicPreferences || "",
    specialRequirements: formData.specialRequirements || "",
  });

  const handleMealToggle = (mealId: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId],
    );
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  const handleNext = () => {
    onUpdate({
      mealOptions: selectedMeals,
      additionalFeatures: selectedFeatures,
      ...customDetails,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
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
          <h3 className="font-semibold">Optional Add-ons</h3>
          <p className="text-sm text-gray-600">Enhance your event experience</p>
        </div>
      </div>

      <div className="max-h-96 space-y-6 overflow-y-auto">
        {/* Meal Options */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 font-medium text-gray-800">
            <Utensils className="h-4 w-4" />
            Dietary Options
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {mealOptions.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={meal.id}
                  checked={selectedMeals.includes(meal.id)}
                  onCheckedChange={() => handleMealToggle(meal.id)}
                />
                <Label
                  htmlFor={meal.id}
                  className="text-sm"
                >
                  {meal.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Event Features</h4>
          <div className="space-y-2">
            {additionalFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="rounded-lg border p-3"
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={feature.id}
                      checked={selectedFeatures.includes(feature.id)}
                      onCheckedChange={() => handleFeatureToggle(feature.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <Label
                          htmlFor={feature.id}
                          className="font-medium"
                        >
                          {feature.label}
                        </Label>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Details */}
        {selectedFeatures.includes("dressCode") && (
          <div className="space-y-2">
            <Label>Dress Code Details</Label>
            <Select
              value={customDetails.dressCode}
              onValueChange={(value) =>
                setCustomDetails((prev) => ({ ...prev, dressCode: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select dress code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="business">Business Casual</SelectItem>
                <SelectItem value="cocktail">Cocktail Attire</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="black-tie">Black Tie</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedFeatures.includes("giftRegistry") && (
          <div className="space-y-2">
            <Label>Gift Registry URL</Label>
            <Input
              placeholder="https://registry.example.com"
              value={customDetails.giftRegistryUrl}
              onChange={(e) =>
                setCustomDetails((prev) => ({
                  ...prev,
                  giftRegistryUrl: e.target.value,
                }))
              }
            />
          </div>
        )}

        {selectedFeatures.includes("transportation") && (
          <div className="space-y-2">
            <Label>Transportation & Parking Details</Label>
            <Input
              placeholder="Parking available on-site, valet service provided"
              value={customDetails.transportationDetails}
              onChange={(e) =>
                setCustomDetails((prev) => ({
                  ...prev,
                  transportationDetails: e.target.value,
                }))
              }
            />
          </div>
        )}

        {selectedFeatures.includes("accommodation") && (
          <div className="space-y-2">
            <Label>Accommodation Recommendations</Label>
            <Input
              placeholder="Recommended hotels: Marriott Downtown, Holiday Inn..."
              value={customDetails.accommodationDetails}
              onChange={(e) =>
                setCustomDetails((prev) => ({
                  ...prev,
                  accommodationDetails: e.target.value,
                }))
              }
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Special Requirements & Accessibility</Label>
          <Input
            placeholder="Wheelchair accessible, sign language interpreter available..."
            value={customDetails.specialRequirements}
            onChange={(e) =>
              setCustomDetails((prev) => ({
                ...prev,
                specialRequirements: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <Button
        onClick={handleNext}
        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-white hover:from-purple-700 hover:to-blue-700"
      >
        Next: Preview Event
      </Button>
    </div>
  );
};

export default OptionalAddons;
