import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, ArrowRight, Mail, MessageSquare, Share2, QrCode, CalendarIcon, Send, Eye } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EventFormData } from "../EnhancedEventCreationDialog";

const invitationTemplates = [
  {
    id: "elegant",
    name: "Elegant Classic",
    description: "Sophisticated design with clean typography",
    preview: "🎭 Classic elegance with gold accents"
  },
  {
    id: "modern",
    name: "Modern Minimal",
    description: "Clean, contemporary design",
    preview: "⚡ Bold and modern with geometric elements"
  },
  {
    id: "festive",
    name: "Festive Celebration",
    description: "Colorful and energetic design",
    preview: "🎉 Vibrant colors with celebration themes"
  },
  {
    id: "rustic",
    name: "Rustic Charm",
    description: "Natural, warm design elements",
    preview: "🌿 Earth tones with natural textures"
  }
];

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const InvitationSystemStep = ({ formData, onUpdate, onNext, onBack }: Props) => {
  const [selectedTemplate, setSelectedTemplate] = useState(formData.invitationSettings?.template || "elegant");
  const [customMessage, setCustomMessage] = useState(formData.invitationSettings?.customMessage || "");
  const [sendTime, setSendTime] = useState<'now' | 'scheduled'>(formData.invitationSettings?.sendTime || "now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [selectedMethods, setSelectedMethods] = useState<string[]>(formData.invitationSettings?.method || ["email"]);

  const invitationMethods = [
    { id: "email", name: "Email", icon: Mail, description: "Send beautiful email invitations" },
    { id: "sms", name: "SMS", icon: MessageSquare, description: "Quick text message invites" },
    { id: "social", name: "Social Media", icon: Share2, description: "Share on social platforms" },
    { id: "qr", name: "QR Code", icon: QrCode, description: "Generate QR codes for easy sharing" }
  ];

  const toggleMethod = (methodId: string) => {
    const newMethods = selectedMethods.includes(methodId)
      ? selectedMethods.filter(id => id !== methodId)
      : [...selectedMethods, methodId];
    setSelectedMethods(newMethods);
  };

  const handleSave = () => {
    onUpdate({
      invitationSettings: {
        method: selectedMethods,
        template: selectedTemplate,
        customMessage,
        sendTime,
        scheduledTime: scheduledDate
      }
    });
  };

  const defaultMessage = `🎉 You're invited to ${formData.eventName}!

Join us for an amazing ${formData.eventType.toLowerCase()} on ${(formData.eventDates?.startDate || formData.startDate) ? format((formData.eventDates?.startDate || formData.startDate)!, "EEEE, MMMM do, yyyy") : "[Date]"} at ${formData.locations[0]?.name || "[Venue]"}.

${formData.description || "We can't wait to celebrate with you!"}

Please RSVP by [Date] so we can prepare accordingly.

Looking forward to seeing you there! ✨`;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Setup Invitations</h2>
        <p className="text-gray-600 mt-1">Configure how you'll invite guests to your event</p>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods">Methods</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="message">Message</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Methods</CardTitle>
              <CardDescription>
                Choose how you want to send invitations to your guests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {invitationMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethods.includes(method.id);
                  
                  return (
                    <button
                      key={method.id}
                      onClick={() => toggleMethod(method.id)}
                      className={cn(
                        "p-4 border rounded-lg text-left transition-all hover:shadow-md",
                        isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={cn(
                          "w-6 h-6 mt-1",
                          isSelected ? "text-purple-600" : "text-gray-400"
                        )} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{method.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                          {isSelected && (
                            <Badge className="mt-2 bg-purple-100 text-purple-700">Selected</Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Template</CardTitle>
              <CardDescription>
                Choose a design template for your invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {invitationTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={cn(
                      "p-4 border rounded-lg text-left transition-all hover:shadow-md",
                      selectedTemplate === template.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{template.name}</h3>
                        {selectedTemplate === template.id && (
                          <Badge className="bg-purple-100 text-purple-700">Selected</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <div className="p-3 bg-gray-100 rounded text-sm text-gray-700">
                        {template.preview}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Template
                </Button>
                <Button variant="outline" className="flex-1">
                  Upload Custom Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="message" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Message</CardTitle>
              <CardDescription>
                Customize the message that will be sent to your guests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-message">Personal Message</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Write a personal message to your guests..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-sm text-gray-500">
                  This message will be included in your invitation along with event details
                </p>
              </div>

              <div className="space-y-2">
                <Label>Default Message Preview</Label>
                <div className="p-4 bg-gray-50 rounded-lg text-sm whitespace-pre-line text-gray-700">
                  {defaultMessage}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCustomMessage(defaultMessage)}
                  className="flex-1"
                >
                  Use Default Message
                </Button>
                <Button variant="outline" className="flex-1">
                  AI Generate Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Schedule</CardTitle>
              <CardDescription>
                Decide when to send your invitations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={cn(
                      "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all",
                      sendTime === 'now' ? "bg-white shadow-sm text-gray-900" : "text-gray-600"
                    )}
                    onClick={() => setSendTime('now')}
                  >
                    <Send className="w-4 h-4 mx-auto mb-1" />
                    Send Now
                    <p className="text-xs text-gray-500 mt-1">Send invitations immediately</p>
                  </button>
                  <button
                    className={cn(
                      "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all",
                      sendTime === 'scheduled' ? "bg-white shadow-sm text-gray-900" : "text-gray-600"
                    )}
                    onClick={() => setSendTime('scheduled')}
                  >
                    <CalendarIcon className="w-4 h-4 mx-auto mb-1" />
                    Schedule
                    <p className="text-xs text-gray-500 mt-1">Send at a specific time</p>
                  </button>
                </div>

                {sendTime === 'scheduled' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Send Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !scheduledDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={scheduledDate}
                              onSelect={setScheduledDate}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Send Time</Label>
                        <Input type="time" defaultValue="09:00" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Send invitations 3-4 weeks before the event</li>
                    <li>• Follow up with reminder 1 week before RSVP deadline</li>
                    <li>• Send final details 2-3 days before the event</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Preview
        </Button>
        
        <Button 
          onClick={() => {
            handleSave();
            onNext();
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
        >
          Next: Launch Event
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default InvitationSystemStep;
