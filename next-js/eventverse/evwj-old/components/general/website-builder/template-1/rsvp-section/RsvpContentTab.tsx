import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MapPin, UserCheck, Mail, MessageSquare, Send } from 'lucide-react';

interface RsvpData {
  title: string;
  subtitle: string;
  eventDate: string;
  location: string;
  fullNameLabel: string;
  emailLabel: string;
  attendingLabel: string;
  attendingOptions: string[];
  messageLabel: string;
  submitText: string;
}

interface RsvpContentTabProps {
  data: RsvpData;
  onChange: (data: RsvpData) => void;
}

export default function RsvpContentTab({ data, onChange }: RsvpContentTabProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <UserCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'RSVP'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Please confirm your attendance'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-lg border p-4 space-y-3">
          {/* Event Details */}
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {formatDate(data.eventDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {data.location || 'Location'}
              </span>
            </div>
          </div>

          {/* Form Preview */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                {data.fullNameLabel || 'Full Name *'}
              </label>
              <div className="h-8 bg-gray-50 dark:bg-slate-800 rounded border" />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                <Mail className="h-3 w-3" />
                {data.emailLabel || 'Email Address *'}
              </label>
              <div className="h-8 bg-gray-50 dark:bg-slate-800 rounded border" />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                {data.attendingLabel || 'Will you be attending? *'}
              </label>
              <div className="flex gap-2">
                {data.attendingOptions.map((option, idx) => (
                  <div key={idx} className="px-3 py-1 bg-gray-50 dark:bg-slate-800 rounded border text-xs">
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                <MessageSquare className="h-3 w-3" />
                {data.messageLabel || 'Additional Message'}
              </label>
              <div className="h-16 bg-gray-50 dark:bg-slate-800 rounded border" />
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md text-sm">
                <Send className="h-4 w-4" />
                {data.submitText || 'Submit RSVP'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="rsvp-title">Title</Label>
          <Input
            id="rsvp-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="RSVP"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rsvp-subtitle">Subtitle</Label>
          <Input
            id="rsvp-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Please confirm your attendance"
          />
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Event Details</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rsvp-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event Date
            </Label>
            <Input
              id="rsvp-date"
              type="date"
              value={data.eventDate}
              onChange={(e) => onChange({ ...data, eventDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rsvp-location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="rsvp-location"
              value={data.location}
              onChange={(e) => onChange({ ...data, location: e.target.value })}
              placeholder="Grand Conference Center"
            />
          </div>
        </div>
      </div>

      {/* Form Field Labels */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Form Field Labels</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rsvp-fullname-label">Full Name Label</Label>
            <Input
              id="rsvp-fullname-label"
              value={data.fullNameLabel}
              onChange={(e) => onChange({ ...data, fullNameLabel: e.target.value })}
              placeholder="Full Name *"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rsvp-email-label" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Label
            </Label>
            <Input
              id="rsvp-email-label"
              value={data.emailLabel}
              onChange={(e) => onChange({ ...data, emailLabel: e.target.value })}
              placeholder="Email Address *"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rsvp-attending-label">Attending Question Label</Label>
          <Input
            id="rsvp-attending-label"
            value={data.attendingLabel}
            onChange={(e) => onChange({ ...data, attendingLabel: e.target.value })}
            placeholder="Will you be attending? *"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rsvp-attending-options">Attending Options (one per line)</Label>
          <Textarea
            id="rsvp-attending-options"
            value={data.attendingOptions.join('\n')}
            onChange={(e) => {
              const options = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
              onChange({ ...data, attendingOptions: options });
            }}
            placeholder="Yes&#10;No&#10;Maybe"
            rows={4}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Each line will become a separate option for attendees to choose from
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rsvp-message-label" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message Label
          </Label>
          <Input
            id="rsvp-message-label"
            value={data.messageLabel}
            onChange={(e) => onChange({ ...data, messageLabel: e.target.value })}
            placeholder="Additional Message"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rsvp-submit-text" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Submit Button Text
          </Label>
          <Input
            id="rsvp-submit-text"
            value={data.submitText}
            onChange={(e) => onChange({ ...data, submitText: e.target.value })}
            placeholder="Submit RSVP"
          />
        </div>
      </div>
    </div>
  );
}
