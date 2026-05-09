
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Save, Eye, AlertTriangle, Megaphone, Clock, CloudRain, Car, Shield } from "lucide-react";
import AnnouncementPreview from "./AnnouncementPreview";
import TargetAudienceSelector from "./TargetAudienceSelector";

interface AnnouncementCreatorProps {
  onBack: () => void;
  onSave: (data: any) => void;
}

type AnnouncementType = 'announcement' | 'urgent' | 'schedule-change' | 'weather' | 'parking' | 'safety';
type PriorityLevel = 'high' | 'medium' | 'low';
type DeliveryStatus = 'draft' | 'sent' | 'scheduled';

interface TargetAudience {
  type: 'all' | 'rsvp-groups' | 'ticket-tiers' | 'custom';
  rsvpGroupIds?: string[];
  ticketTierIds?: string[];
  customEmails?: string[];
}

const AnnouncementCreator = ({ onBack, onSave }: AnnouncementCreatorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    type: 'announcement' as AnnouncementType,
    title: '',
    content: '',
    priority: 'medium' as PriorityLevel,
    targetAudience: {
      type: 'all' as const
    } as TargetAudience,
    deliveryStatus: 'sent' as DeliveryStatus,
    createdBy: 'Sarah Johnson'
  });

  const announcementTypes = [
    { value: 'announcement' as const, label: 'General Announcement', icon: Megaphone, color: 'from-blue-500 to-blue-600' },
    { value: 'urgent' as const, label: 'Urgent Update', icon: AlertTriangle, color: 'from-red-500 to-red-600' },
    { value: 'schedule-change' as const, label: 'Schedule Change', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { value: 'weather' as const, label: 'Weather Update', icon: CloudRain, color: 'from-cyan-500 to-cyan-600' },
    { value: 'parking' as const, label: 'Parking Info', icon: Car, color: 'from-purple-500 to-purple-600' },
    { value: 'safety' as const, label: 'Safety Notice', icon: Shield, color: 'from-green-500 to-green-600' }
  ];

  const templates: Record<AnnouncementType, { title: string; content: string }> = {
    announcement: {
      title: "Important Event Update",
      content: "We have an important update regarding your upcoming event. Please read the details below and contact us if you have any questions."
    },
    urgent: {
      title: "URGENT: Event Change Required",
      content: "Due to unforeseen circumstances, we need to make an urgent change to the event. Please review the updated information immediately."
    },
    'schedule-change': {
      title: "Schedule Update",
      content: "There has been a change to the event schedule. Please note the new timing and plan accordingly."
    },
    weather: {
      title: "Weather Forecast Update",
      content: "Here's the latest weather forecast for your event day. We recommend planning accordingly for the conditions."
    },
    parking: {
      title: "Parking Information",
      content: "Important parking details for event attendees. Please arrive early to secure your preferred parking spot."
    },
    safety: {
      title: "Safety Guidelines",
      content: "Please review these important safety guidelines for the event to ensure everyone has a safe and enjoyable experience."
    }
  };

  const handleTypeChange = (type: string) => {
    const announcementType = type as AnnouncementType;
    const template = templates[announcementType];
    setFormData({
      ...formData,
      type: announcementType,
      title: template.title,
      content: template.content,
      priority: announcementType === 'urgent' ? 'high' : 'medium'
    });
  };

  const handleSubmit = (deliveryStatus: DeliveryStatus) => {
    onSave({
      ...formData,
      deliveryStatus
    });
  };

  if (showPreview) {
    return (
      <AnnouncementPreview 
        announcement={formData}
        onBack={() => setShowPreview(false)}
        onSend={() => handleSubmit('sent')}
      />
    );
  }

  const selectedType = announcementTypes.find(t => t.value === formData.type);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Announcement</h1>
                <p className="text-gray-600">Send important updates to your event attendees</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPreview(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={() => handleSubmit('draft')}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={() => handleSubmit('sent')}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!formData.title || !formData.content}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Announcement Details</CardTitle>
                <CardDescription>Configure your announcement settings and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Announcement Type */}
                <div className="space-y-3">
                  <Label>Announcement Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {announcementTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div
                          key={type.value}
                          onClick={() => handleTypeChange(type.value)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.type === type.value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-medium text-gray-900">{type.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter announcement title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Message Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter your announcement message"
                    rows={6}
                  />
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value: PriorityLevel) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Audience */}
                <TargetAudienceSelector 
                  value={formData.targetAudience}
                  onChange={(targetAudience) => setFormData({ ...formData, targetAudience })}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedType && <selectedType.icon className="w-4 h-4" />}
                      <Badge className={
                        formData.priority === 'high' ? 'bg-red-500' :
                        formData.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                      }>
                        {formData.priority} priority
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {formData.title || "Announcement Title"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formData.content || "Your announcement content will appear here..."}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Just now • To: {formData.targetAudience.type === 'all' ? 'All Attendees' : 
                        formData.targetAudience.type === 'rsvp-groups' ? `${formData.targetAudience.rsvpGroupIds?.length || 0} Groups` :
                        formData.targetAudience.type === 'ticket-tiers' ? `${formData.targetAudience.ticketTierIds?.length || 0} Tiers` :
                        `${formData.targetAudience.customEmails?.length || 0} Recipients`}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>This is how your announcement will appear to attendees in their event updates.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCreator;
