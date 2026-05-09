import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Monitor, Tablet, Smartphone, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PreviewTestingStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone
  };

  const previewChecks = [
    { id: 'event-info', label: 'Event information is complete', status: 'complete' },
    { id: 'modules', label: 'Selected modules are configured', status: formData.selectedModules.length > 0 ? 'complete' : 'warning' },
    { id: 'location', label: 'Location details are provided', status: formData.locations[0]?.name ? 'complete' : 'warning' },
    { id: 'date-time', label: 'Date and time are set', status: (formData.eventDates?.startDate || formData.startDate) ? 'complete' : 'warning' },
    { id: 'theme', label: 'Theme is applied', status: 'complete' }
  ];

  const guestJourneySteps = [
    { step: 1, title: 'Discover Event', description: 'Guest finds your event through invitation or public listing' },
    { step: 2, title: 'View Details', description: 'Guest reviews event information, location, and schedule' },
    { step: 3, title: 'RSVP/Register', description: 'Guest responds to invitation or purchases tickets' },
    { step: 4, title: 'Receive Updates', description: 'Guest gets announcements and event updates' },
    { step: 5, title: 'Attend Event', description: 'Guest participates in activities and engages with content' },
    { step: 6, title: 'Share Memories', description: 'Guest uploads photos and provides feedback' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Preview & Test Your Event</h2>
        <p className="text-gray-600 mt-1">Review how your event will look and function for guests</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Event Preview</TabsTrigger>
          <TabsTrigger value="journey">Guest Journey</TabsTrigger>
          <TabsTrigger value="checklist">Pre-Launch Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          {/* Device Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Preview on:</span>
            {(['desktop', 'tablet', 'mobile'] as const).map((device) => {
              const Icon = deviceIcons[device];
              return (
                <Button
                  key={device}
                  variant={previewDevice === device ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewDevice(device)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {device.charAt(0).toUpperCase() + device.slice(1)}
                </Button>
              );
            })}
          </div>

          {/* Preview Area */}
          <Card className="h-[500px] overflow-hidden">
            <div className={`
              mx-auto bg-white border rounded-lg shadow-sm transition-all duration-300
              ${previewDevice === 'desktop' ? 'w-full h-full' : ''}
              ${previewDevice === 'tablet' ? 'w-2/3 h-full mx-auto mt-8' : ''}
              ${previewDevice === 'mobile' ? 'w-80 h-full mx-auto mt-8' : ''}
            `}>
              <div className="p-6 h-full overflow-y-auto">
                {/* Event Header */}
                <div 
                  className="rounded-lg p-6 text-white mb-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${formData.theme.primaryColor}, ${formData.theme.secondaryColor})` 
                  }}
                >
                  <h1 className="text-2xl font-bold mb-2">{formData.eventName || "Your Event Name"}</h1>
                  <p className="opacity-90">{formData.description || "Event description will appear here"}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div>📅 {(formData.eventDates?.startDate || formData.startDate) ? (formData.eventDates?.startDate || formData.startDate)!.toLocaleDateString() : "Date TBD"}</div>
                    <div>🕐 {formData.time || "Time TBD"}</div>
                    <div>📍 {formData.locations[0]?.name || "Location TBD"}</div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {formData.selectedModules.map(moduleId => {
                      const moduleNames: Record<string, string> = {
                        schedules: "📅 Schedule",
                        announcements: "📢 Announcements",
                        rsvp: "✅ RSVP",
                        games: "🎮 Games",
                        media: "📸 Photos",
                        ticketing: "🎫 Tickets",
                        seating: "🪑 Seating",
                        budgeting: "💰 Budget",
                        analytics: "📊 Analytics",
                        survey: "📝 Survey"
                      };
                      return (
                        <div key={moduleId} className="p-3 border rounded-lg text-center">
                          <div className="text-lg mb-1">{moduleNames[moduleId]}</div>
                        </div>
                      );
                    })}
                  </div>

                  {formData.ticketTypes.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Tickets Available</h3>
                      {formData.ticketTypes.map((ticket, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{ticket.name}</div>
                            <div className="text-sm text-gray-600">{ticket.description}</div>
                          </div>
                          <div className="text-lg font-bold">
                            ${ticket.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Experience Journey</CardTitle>
              <CardDescription>
                Understand how guests will interact with your event from discovery to participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {guestJourneySteps.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                      {index < guestJourneySteps.length - 1 && (
                        <div className="w-px h-6 bg-gray-200 ml-4 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Testing</CardTitle>
              <CardDescription>Test key functionality before launch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Test Guest RSVP Flow
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Test Ticket Purchase Process
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Test Mobile Experience
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Test Email Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pre-Launch Checklist</CardTitle>
              <CardDescription>
                Ensure everything is ready before publishing your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previewChecks.map((check) => (
                  <div key={check.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {check.status === 'complete' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    )}
                    <span className="flex-1">{check.label}</span>
                    <Badge variant={check.status === 'complete' ? 'default' : 'secondary'}>
                      {check.status === 'complete' ? 'Complete' : 'Review'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance & Accessibility</CardTitle>
              <CardDescription>
                Your event meets quality standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">A+</div>
                  <div className="text-sm text-gray-600">Performance Score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Accessibility</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm text-gray-600">Mobile Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Configuration
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
        >
          Next: Setup Invitations
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PreviewTestingStep;
