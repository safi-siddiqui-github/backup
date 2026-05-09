
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Users, Settings, ExternalLink, Copy } from "lucide-react";
import { format } from "date-fns";

const ConfirmationStep = ({ formData, onComplete }) => {
  const totalModules = formData.selectedModules?.length || 0;
  const totalAddons = formData.additionalFeatures?.length || 0;
  const totalCost = formData.selectedModules?.reduce((sum, moduleId) => {
    return sum + (moduleId === "schedules" || moduleId === "rsvp" ? 0 : 5.99);
  }, 0) || 0;

  const formatEventDate = () => {
    if (formData.endDate && formData.endDate !== formData.startDate) {
      return `${format(formData.startDate, "MMM d")} - ${format(formData.endDate, "MMM d, yyyy")}`;
    }
    return format(formData.startDate, "MMMM d, yyyy");
  };

  const eventLink = `https://eventverse.app/invite/${formData.eventName?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
    } catch (err) {
      console.log("Failed to copy link");
    }
  };

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Event Created Successfully!</h3>
        <p className="text-gray-600">Your event is ready to go</p>
      </div>

      {/* Event Summary */}
      <div className="bg-white border rounded-lg p-4 space-y-4">
        <div className="text-left">
          <h4 className="font-semibold text-gray-800 mb-3">{formData.eventName}</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{formData.eventType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formatEventDate()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{formData.locations?.[0]?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Modules:</span>
              <span className="font-medium">{totalModules} selected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Add-ons:</span>
              <span className="font-medium">{totalAddons} features</span>
            </div>
            {totalCost > 0 && (
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-gray-600">Total Cost:</span>
                <span className="font-bold text-green-600">${totalCost.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Link */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-blue-800 mb-2">Your Event Link</h5>
        <div className="flex gap-2">
          <input 
            value={eventLink} 
            readOnly 
            className="flex-1 px-3 py-2 text-sm border rounded bg-white"
          />
          <Button onClick={handleCopyLink} variant="outline" size="sm">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <h5 className="font-medium text-gray-800 mb-3">Next Steps:</h5>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
            Share your event link with guests
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
            Monitor RSVPs in your dashboard
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
            Use your selected modules to manage details
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
            Send updates and reminders to guests
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-3"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Go to Event Dashboard
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            Manage Guests
          </Button>
          <Button variant="outline" className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Event Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
