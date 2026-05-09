
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Utensils, Music, CheckCircle, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuestRSVPFormProps {
  event: any;
  guest: { name: string; email: string };
  existingRSVP?: any;
}

const GuestRSVPForm = ({ event, guest, existingRSVP }: GuestRSVPFormProps) => {
  const [attendance, setAttendance] = useState(existingRSVP?.status || "");
  const [mealChoice, setMealChoice] = useState(existingRSVP?.mealChoice || "");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(existingRSVP?.dietaryRestrictions || "");
  const [songRequest, setSongRequest] = useState(existingRSVP?.songRequest || "");
  const [plusOnes, setPlusOnes] = useState(existingRSVP?.plusOnes || 0);
  const [specialRequests, setSpecialRequests] = useState(existingRSVP?.specialRequests || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const mealOptions = event.type === "wedding" 
    ? ["Grilled Salmon with Herbs", "Beef Tenderloin with Red Wine Sauce", "Vegetarian Risotto", "Vegan Mediterranean Bowl"]
    : event.type === "conference"
    ? ["Continental Breakfast", "Networking Lunch", "Coffee Break", "No Meals"]
    : ["Standard Meal", "Vegetarian Option", "No Meal Preference"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendance) {
      toast({
        title: "Please select your attendance",
        variant: "destructive"
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
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem(`rsvp_${event.couple}_${guest.email}`, JSON.stringify(rsvpData));

    setIsSubmitted(true);
    toast({
      title: "RSVP Submitted Successfully!",
      description: `Thank you ${guest.name}! Your response has been saved.`
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">RSVP Confirmed!</h2>
            <p className="text-green-700 mb-4">
              Thank you for responding to {event.name}. We're excited to celebrate with you!
            </p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="text-sm text-gray-600">Your Response:</div>
              <div className="font-semibold text-gray-900">
                {attendance === "yes" ? "Will Attend" : attendance === "no" ? "Cannot Attend" : "Maybe"}
              </div>
              {attendance === "yes" && mealChoice && (
                <div className="text-sm text-gray-600 mt-2">
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
              className="text-green-700 border-green-300"
            >
              Edit Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-gradient-to-r from-rose-500 to-purple-600 text-white border-0 mb-6">
        <CardContent className="p-6 text-center">
          <Heart className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">You're Invited!</h2>
          <p className="opacity-90">{event.name}</p>
        </CardContent>
      </Card>

      {/* Event Details */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold">{event.date}</div>
                <div className="text-sm text-gray-600">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-semibold">{event.location}</div>
                <div className="text-sm text-gray-600">{event.address}</div>
              </div>
            </div>
          </div>
          {event.description && (
            <p className="text-gray-700 mt-4 text-center italic">"{event.description}"</p>
          )}
        </CardContent>
      </Card>

      {/* RSVP Form */}
      <Card>
        <CardHeader>
          <CardTitle>Please Respond by {new Date(new Date(event.startDate).getTime() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attendance */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Will you be attending?</Label>
              <RadioGroup value={attendance} onValueChange={setAttendance}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes, I'll be there! 🎉</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">Sorry, I can't make it 😔</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="maybe" />
                  <Label htmlFor="maybe">Not sure yet</Label>
                </div>
              </RadioGroup>
            </div>

            {attendance === "yes" && (
              <>
                {/* Plus Ones */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">
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
                    <span className="text-lg font-semibold w-8 text-center">{plusOnes}</span>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPlusOnes(Math.min(3, plusOnes + 1))}
                    >
                      +
                    </Button>
                    <span className="text-sm text-gray-600">Maximum 3 additional guests</span>
                  </div>
                </div>

                {/* Meal Choice */}
                {mealOptions.length > 1 && (
                  <div>
                    <Label className="text-base font-semibold mb-4 block flex items-center gap-2">
                      <Utensils className="w-4 h-4" />
                      Meal Preference
                    </Label>
                    <RadioGroup value={mealChoice} onValueChange={setMealChoice}>
                      {mealOptions.map((meal, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={meal} id={`meal-${index}`} />
                          <Label htmlFor={`meal-${index}`}>{meal}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Dietary Restrictions */}
                <div>
                  <Label htmlFor="dietary" className="text-base font-semibold mb-2 block">
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
                    <Label htmlFor="song" className="text-base font-semibold mb-2 block flex items-center gap-2">
                      <Music className="w-4 h-4" />
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
                  <Label htmlFor="requests" className="text-base font-semibold mb-2 block">
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
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold py-3"
            >
              {attendance === "yes" ? "Confirm My Attendance" : 
               attendance === "no" ? "Send Regrets" : 
               "Submit Response"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestRSVPForm;
