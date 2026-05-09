import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings2, Clock, CheckCircle2 } from "lucide-react";

interface Props {
  onSelectMode: (mode: 'express' | 'complete') => void;
}

const EventCreationModeSelector = ({ onSelectMode }: Props) => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Setup Experience</h2>
        <p className="text-gray-600 text-lg">Select the approach that best fits your needs and timeline</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Express Setup Card */}
        <Card className="relative overflow-hidden border-2 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-bl-full" />
          
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-md">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Recommended
              </Badge>
            </div>
            
            <CardTitle className="text-2xl">Express Setup</CardTitle>
            <CardDescription className="text-base">
              Create your event in minutes with smart defaults. Perfect for straightforward events with essential features.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Single-page simplified form</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Event photo upload & customization</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">RSVP or ticketing system</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Built-in schedules & games modules</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Instant guest invitations</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Estimated time: 5-10 minutes</span>
            </div>

            <Button 
              onClick={() => onSelectMode('express')}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-6 text-lg shadow-md hover:shadow-lg transition-all"
            >
              Start Express Setup
            </Button>
          </CardContent>
        </Card>

        {/* Complete Setup Card */}
        <Card className="relative overflow-hidden border-2 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-bl-full" />
          
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-md">
                <Settings2 className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-purple-300 text-purple-700">
                Full Control
              </Badge>
            </div>
            
            <CardTitle className="text-2xl">Complete Setup</CardTitle>
            <CardDescription className="text-base">
              Full control over every aspect of your event. Ideal for complex events requiring detailed customization.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">5-step guided workflow</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Advanced module selection & configuration</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Multiple locations & session management</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Detailed photo gallery & branding</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Complete feature customization</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Estimated time: 15-20 minutes</span>
            </div>

            <Button 
              onClick={() => onSelectMode('complete')}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-md hover:shadow-lg transition-all"
            >
              Start Complete Setup
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>You can always customize your event settings after creation</p>
      </div>
    </div>
  );
};

export default EventCreationModeSelector;
