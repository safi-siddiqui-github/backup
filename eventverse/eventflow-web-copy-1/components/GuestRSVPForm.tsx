"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Guest, RsvpExisting } from "@/types/rsvp";
import {
  Calendar,
  CheckCircle,
  Heart,
  MapPin,
  Music,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { EventFormData } from "./EnhancedEventCreationDialog";

interface GuestRSVPFormProps {
  event: Partial<EventFormData>;
  // guest: { name: string; email: string };
  existingRSVP?: RsvpExisting;
  guest: Partial<Guest>;
}

const GuestRSVPForm = ({ event, guest, existingRSVP }: GuestRSVPFormProps) => {
  const [attendance, setAttendance] = useState(existingRSVP?.status || "");
  const [mealChoice, setMealChoice] = useState(existingRSVP?.mealChoice || "");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    existingRSVP?.dietaryRestrictions || "",
  );
  const [songRequest, setSongRequest] = useState(
    existingRSVP?.songRequest || "",
  );
  const [plusOnes, setPlusOnes] = useState(existingRSVP?.plusOnes || 0);
  const [specialRequests, setSpecialRequests] = useState(
    existingRSVP?.specialRequests || "",
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const mealOptions =
    event?.type === "wedding"
      ? [
          "Grilled Salmon with Herbs",
          "Beef Tenderloin with Red Wine Sauce",
          "Vegetarian Risotto",
          "Vegan Mediterranean Bowl",
        ]
      : event?.type === "conference"
        ? [
            "Continental Breakfast",
            "Networking Lunch",
            "Coffee Break",
            "No Meals",
          ]
        : ["Standard Meal", "Vegetarian Option", "No Meal Preference"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendance) {
      toast({
        title: "Please select your attendance",
        variant: "destructive",
      });
      return;
    }

    // Save the RSVP data
    const rsvpData = {
      status: attendance,
      mealChoice,
      dietaryRestrictions,
      songRequest,
      plusOnes,
      specialRequests,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `rsvp_${event?.couple}_${guest.email}`,
      JSON.stringify(rsvpData),
    );

    setIsSubmitted(true);
    toast({
      title: "RSVP Submitted Successfully!",
      description: `Thank you ${guest.name}! Your response has been saved.`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 className="mb-2 text-2xl font-bold text-green-800">
              RSVP Confirmed!
            </h2>
            <p className="mb-4 text-green-700">
              Thank you for responding to {event.name}. We&apos;re excited to
              celebrate with you!
            </p>
            <div className="mb-4 rounded-lg bg-white p-4">
              <div className="text-sm text-gray-600">Your Response:</div>
              <div className="font-semibold text-gray-900">
                {attendance === "yes"
                  ? "Will Attend"
                  : attendance === "no"
                    ? "Cannot Attend"
                    : "Maybe"}
              </div>
              {attendance === "yes" && mealChoice && (
                <div className="mt-2 text-sm text-gray-600">
                  Meal: {mealChoice}
                </div>
              )}
              {plusOnes > 0 && (
                <div className="text-sm text-gray-600">
                  Plus ones: {plusOnes}
                </div>
              )}
            </div>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-green-300 text-green-700"
            >
              Edit Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="mb-6 border-0 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <Heart className="mx-auto mb-3 h-12 w-12" />
          <h2 className="mb-2 text-2xl font-bold">You&apos;re Invited!</h2>
          <p className="opacity-90">{event.name}</p>
        </CardContent>
      </Card>

      {/* Event Details */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-semibold">{event.date}</div>
                <div className="text-sm text-gray-600">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-semibold">{event.location}</div>
                <div className="text-sm text-gray-600">{event.address}</div>
              </div>
            </div>
          </div>
          {event.description && (
            <p className="mt-4 text-center text-gray-700 italic">
              &quot;{event.description}&quot;
            </p>
          )}
        </CardContent>
      </Card>

      {/* RSVP Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            Please Respond by{" "}
            {new Date(
              new Date(String(event?.startDate))?.getTime() -
                14 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Attendance */}
            <div>
              <Label className="mb-4 block text-base font-semibold">
                Will you be attending?
              </Label>
              <RadioGroup
                value={attendance}
                onValueChange={setAttendance}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="yes"
                  />
                  <Label htmlFor="yes">Yes, I&apos;ll be there! 🎉</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="no"
                  />
                  <Label htmlFor="no">Sorry, I can&apos;t make it 😔</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="maybe"
                    id="maybe"
                  />
                  <Label htmlFor="maybe">Not sure yet</Label>
                </div>
              </RadioGroup>
            </div>

            {attendance === "yes" && (
              <>
                {/* Plus Ones */}
                <div>
                  <Label className="mb-2 block text-base font-semibold">
                    How many additional guests will you bring?
                  </Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPlusOnes(Math.max(0, plusOnes - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-lg font-semibold">
                      {plusOnes}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPlusOnes(Math.min(3, plusOnes + 1))}
                    >
                      +
                    </Button>
                    <span className="text-sm text-gray-600">
                      Maximum 3 additional guests
                    </span>
                  </div>
                </div>

                {/* Meal Choice */}
                {mealOptions.length > 1 && (
                  <div>
                    <Label className="mb-4 block flex items-center gap-2 text-base font-semibold">
                      <Utensils className="h-4 w-4" />
                      Meal Preference
                    </Label>
                    <RadioGroup
                      value={mealChoice}
                      onValueChange={setMealChoice}
                    >
                      {mealOptions.map((meal, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={meal}
                            id={`meal-${index}`}
                          />
                          <Label htmlFor={`meal-${index}`}>{meal}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Dietary Restrictions */}
                <div>
                  <Label
                    htmlFor="dietary"
                    className="mb-2 block text-base font-semibold"
                  >
                    Dietary Restrictions or Allergies
                  </Label>
                  <Input
                    id="dietary"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="e.g., Vegetarian, Gluten-free, Nut allergy..."
                  />
                </div>

                {/* Song Request for Wedding */}
                {event.type === "wedding" && (
                  <div>
                    <Label
                      htmlFor="song"
                      className="mb-2 block flex items-center gap-2 text-base font-semibold"
                    >
                      <Music className="h-4 w-4" />
                      Song Request (Optional)
                    </Label>
                    <Input
                      id="song"
                      value={songRequest}
                      onChange={(e) => setSongRequest(e.target.value)}
                      placeholder="Suggest a song for the dance floor!"
                    />
                  </div>
                )}

                {/* Special Requests */}
                <div>
                  <Label
                    htmlFor="requests"
                    className="mb-2 block text-base font-semibold"
                  >
                    Special Requests or Notes
                  </Label>
                  <Textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special accommodations needed?"
                    rows={3}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 py-3 font-semibold text-white hover:from-rose-600 hover:to-purple-700"
            >
              {attendance === "yes"
                ? "Confirm My Attendance"
                : attendance === "no"
                  ? "Send Regrets"
                  : "Submit Response"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestRSVPForm;
