import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, Users, Calendar, MapPin } from "lucide-react";

interface RSVPFormSectionProps {
  title?: string;
  description?: string;
  eventDate?: string;
  eventLocation?: string;
  maxGuests?: number;
  style?: React.CSSProperties;
}

export const RSVPFormSection = ({ 
  title = "RSVP", 
  description = "Please confirm your attendance",
  eventDate,
  eventLocation,
  maxGuests = 5,
  style 
}: RSVPFormSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    dietary: '',
    message: '',
    attendance: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.attendance) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast.success("RSVP submitted successfully!");
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section style={style} className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="text-center p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-4">
                Your RSVP has been submitted successfully. We'll send you a confirmation email shortly.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Guests:</strong> {formData.guests}</p>
                <p><strong>Status:</strong> {formData.attendance}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section style={style} className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground mb-6">{description}</p>
          )}
          
          {(eventDate || eventLocation) && (
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {eventDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{eventDate}</span>
                </div>
              )}
              {eventLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{eventLocation}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Event Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                <Label htmlFor="attendance">Will you be attending? *</Label>
                <Select value={formData.attendance} onValueChange={(value) => handleInputChange('attendance', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                    <SelectItem value="no">No, I can't make it</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.attendance === 'yes' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests (including yourself)</Label>
                    <Select 
                      value={formData.guests.toString()} 
                      onValueChange={(value) => handleInputChange('guests', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: maxGuests }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} {i === 0 ? 'person' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Requirements</Label>
                    <Input
                      id="dietary"
                      value={formData.dietary}
                      onChange={(e) => handleInputChange('dietary', e.target.value)}
                      placeholder="Any allergies or dietary restrictions?"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Any questions or special requests?"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit RSVP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};