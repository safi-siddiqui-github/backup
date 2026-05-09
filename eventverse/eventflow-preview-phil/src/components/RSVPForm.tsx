
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, X, Clock, MapPin, Calendar, Users, Heart } from "lucide-react";
import { format } from "date-fns";
import { RSVPGroup, CustomField, FoodChoice, RSVPSettings } from "@/types/rsvp";

interface RSVPFormProps {
  event: any;
  groups: RSVPGroup[];
  customFields?: CustomField[];
  foodChoices?: FoodChoice[];
  settings?: RSVPSettings;
  onBack: () => void;
  isPreview?: boolean;
}

const RSVPForm = ({ 
  event, 
  groups, 
  customFields = [], 
  foodChoices = [], 
  settings,
  onBack,
  isPreview = false
}: RSVPFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    response: '',
    selectedGroup: '',
    plusOnes: 0,
    plusOneNames: [] as string[],
    dietaryRestrictions: '',
    accommodations: '',
    mealChoice: '',
    songRequests: '',
    specialMessage: '',
    newsletter: false,
    transportation: '',
    customResponses: {} as Record<string, any>
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      customResponses: {
        ...prev.customResponses,
        [fieldId]: value
      }
    }));
  };

  const handlePlusOneNameChange = (index: number, name: string) => {
    const newNames = [...formData.plusOneNames];
    newNames[index] = name;
    setFormData(prev => ({ ...prev, plusOneNames: newNames }));
  };

  const handleSubmit = () => {
    if (isPreview) {
      alert('This is a preview - form submission is disabled');
      return;
    }
    console.log('RSVP submitted:', formData);
    setIsSubmitted(true);
  };

  const formatEventDate = (date: any) => {
    if (!date) return "Date TBD";
    
    try {
      if (date instanceof Date) {
        return format(date, "MMMM d, yyyy");
      }
      if (typeof date === 'string') {
        return format(new Date(date), "MMMM d, yyyy");
      }
      return "Date TBD";
    } catch (error) {
      console.error('Error formatting date:', error);
      return "Date TBD";
    }
  };

  const renderCustomField = (field: CustomField) => {
    const value = formData.customResponses[field.id] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            required={field.required}
            rows={3}
          />
        );
      
      case 'dropdown':
        return (
          <Select value={value} onValueChange={(val) => handleCustomFieldChange(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={(val) => handleCustomFieldChange(field.id, val)}>
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        const checkboxValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={checkboxValues.includes(option)}
                  onCheckedChange={(checked) => {
                    const newValues = checked 
                      ? [...checkboxValues, option]
                      : checkboxValues.filter(v => v !== option);
                    handleCustomFieldChange(field.id, newValues);
                  }}
                  id={`${field.id}-${index}`}
                />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">RSVP Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your response. We've sent a confirmation to your email.
            </p>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isPreview ? '' : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'}`}>
      {/* Header */}
      {!isPreview && (
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10 p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">RSVP Form Preview</h1>
                <p className="text-purple-100 text-sm">{event.eventName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Event Info Card */}
        <Card className="bg-white/95 backdrop-blur-sm mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">{event.eventName}</CardTitle>
            <CardDescription className="text-lg">You're Invited!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium">{formatEventDate(event.startDate)}</div>
                  {event.time && <div className="text-sm text-gray-500">at {event.time}</div>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium">{event.locations?.[0]?.name || "Venue TBD"}</div>
                  <div className="text-sm text-gray-500">{event.locations?.[0]?.address || "Address TBD"}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RSVP Form */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Please Respond by {settings?.deadline ? format(settings.deadline, "MMMM d, yyyy") : "[Date]"}</CardTitle>
            <CardDescription>
              We're excited to celebrate with you! Please let us know if you can attend.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="guest-name">Full Name *</Label>
                    <Input
                      id="guest-name"
                      value={formData.guestName}
                      onChange={(e) => handleInputChange('guestName', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Group Selection */}
                {groups.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="group">Which group do you belong to?</Label>
                    <Select value={formData.selectedGroup} onValueChange={(value) => handleInputChange('selectedGroup', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your group (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Prefer not to specify</SelectItem>
                        {groups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${group.color}`} />
                              <span>{group.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Will you be attending?</Label>
                  <RadioGroup value={formData.response} onValueChange={(value) => handleInputChange('response', value)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="attending" id="attending" />
                      <Label htmlFor="attending" className="flex items-center gap-2 cursor-pointer">
                        <Check className="w-4 h-4 text-green-600" />
                        Yes, I'll be there!
                      </Label>
                    </div>
                    {settings?.responseOptions === 'yes-no-maybe' && (
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="maybe" id="maybe" />
                        <Label htmlFor="maybe" className="flex items-center gap-2 cursor-pointer">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          Maybe - I'm not sure yet
                        </Label>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="declined" id="declined" />
                      <Label htmlFor="declined" className="flex items-center gap-2 cursor-pointer">
                        <X className="w-4 h-4 text-red-600" />
                        Sorry, I can't make it
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.response === 'attending' && settings?.allowPlusOnes && (
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="plus-ones">How many guests will you bring?</Label>
                      <select
                        id="plus-ones"
                        value={formData.plusOnes}
                        onChange={(e) => handleInputChange('plusOnes', parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value={0}>Just me</option>
                        {Array.from({ length: settings.maxPlusOnes }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} additional guest{i + 1 > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.plusOnes > 0 && (
                      <div className="space-y-2">
                        <Label>Guest Names</Label>
                        {Array.from({ length: formData.plusOnes }, (_, i) => (
                          <Input
                            key={i}
                            placeholder={`Guest ${i + 1} name`}
                            value={formData.plusOneNames[i] || ''}
                            onChange={(e) => handlePlusOneNameChange(i, e.target.value)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!formData.guestName || !formData.email || !formData.response}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Additional Details */}
            {step === 2 && formData.response === 'attending' && (
              <div className="space-y-4">
                {/* Food Choices */}
                {foodChoices.length > 0 && (
                  <div className="space-y-2">
                    <Label>Meal Choice</Label>
                    <RadioGroup value={formData.mealChoice} onValueChange={(value) => handleInputChange('mealChoice', value)}>
                      {foodChoices.map((choice) => (
                        <div key={choice.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value={choice.id} id={choice.id} />
                          <Label htmlFor={choice.id} className="flex-1">
                            <div className="font-medium">{choice.name}</div>
                            {choice.description && (
                              <div className="text-sm text-gray-500">{choice.description}</div>
                            )}
                            {choice.dietary.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {choice.dietary.map((diet, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {diet}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {settings?.collectDietaryInfo && (
                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Restrictions or Allergies</Label>
                    <Textarea
                      id="dietary"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                      placeholder="Please list any dietary restrictions, allergies, or special meal requirements..."
                      rows={3}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="accommodations">Special Accommodations</Label>
                  <Textarea
                    id="accommodations"
                    value={formData.accommodations}
                    onChange={(e) => handleInputChange('accommodations', e.target.value)}
                    placeholder="Do you need any special accommodations? (wheelchair access, seating preferences, etc.)"
                    rows={3}
                  />
                </div>

                {/* Custom Fields */}
                {customFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {renderCustomField(field)}
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="songs">Song Requests</Label>
                  <Input
                    id="songs"
                    value={formData.songRequests}
                    onChange={(e) => handleInputChange('songRequests', e.target.value)}
                    placeholder="Any songs you'd like to hear at the event?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Special Message</Label>
                  <Textarea
                    id="message"
                    value={formData.specialMessage}
                    onChange={(e) => handleInputChange('specialMessage', e.target.value)}
                    placeholder="Share a special message or memory with the hosts..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Send me updates about future events
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Submit RSVP
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Decline Message */}
            {step === 2 && formData.response === 'declined' && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We're sorry you can't make it! We'll miss having you there.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Would you like to share a message?</Label>
                  <Textarea
                    id="message"
                    value={formData.specialMessage}
                    onChange={(e) => handleInputChange('specialMessage', e.target.value)}
                    placeholder="Share a message with the hosts..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    Submit Response
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RSVPForm;
