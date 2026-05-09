import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, DollarSign } from 'lucide-react';

interface PricingData {
  title: string;
  subtitle: string;
  speakersText: string;
  ticketsText: string;
}

interface PricingContentTabProps {
  data: PricingData;
  onChange: (data: PricingData) => void;
}

export default function PricingContentTab({ data, onChange }: PricingContentTabProps) {
  const isValidJSON = (text: string) => {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  };

  const speakersValid = isValidJSON(data.speakersText);
  const ticketsValid = isValidJSON(data.ticketsText);

  const getPreviewData = () => {
    try {
      const speakers = JSON.parse(data.speakersText);
      const tickets = JSON.parse(data.ticketsText);
      return { speakers, tickets, valid: true };
    } catch {
      return { speakers: [], tickets: [], valid: false };
    }
  };

  const preview = getPreviewData();

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500 rounded-lg">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Meet Our Speakers'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Learn from industry experts and thought leaders'}
            </p>
          </div>
        </div>

        {preview.valid ? (
          <div className="space-y-4">
            {/* Speakers Preview */}
            {preview.speakers.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Speakers</h4>
                <div className="grid gap-2">
                  {preview.speakers.slice(0, 2).map((speaker: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-950 rounded-lg border p-3 text-xs"
                    >
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {speaker.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {speaker.role} {speaker.company && `at ${speaker.company}`}
                      </div>
                    </div>
                  ))}
                  {preview.speakers.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{preview.speakers.length - 2} more speakers
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tickets Preview */}
            {preview.tickets.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Pricing Tiers</h4>
                <div className="grid gap-2">
                  {preview.tickets.slice(0, 3).map((ticket: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-950 rounded-lg border p-3"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                          {ticket.label}
                        </div>
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                          {ticket.price}
                        </div>
                      </div>
                      {ticket.sub && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {ticket.sub}
                        </div>
                      )}
                      {ticket.highlights && ticket.highlights.length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          • {ticket.highlights.slice(0, 2).join(' • ')}
                          {ticket.highlights.length > 2 && ` • +${ticket.highlights.length - 2} more`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <p className="text-sm">Invalid JSON - Please check your data format</p>
          </div>
        )}
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="pricing-title">Title</Label>
          <Input
            id="pricing-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Meet Our Speakers"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing-subtitle">Subtitle</Label>
          <Input
            id="pricing-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Learn from industry experts and thought leaders"
          />
        </div>
      </div>

      {/* Speakers JSON Editor */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Speakers (JSON)</h3>
          {!speakersValid && (
            <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Invalid JSON
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing-speakers">Speakers Data</Label>
          <Textarea
            id="pricing-speakers"
            value={data.speakersText}
            onChange={(e) => onChange({ ...data, speakersText: e.target.value })}
            rows={10}
            className={`font-mono text-xs ${!speakersValid ? 'border-red-300 dark:border-red-700' : ''}`}
            placeholder='[{"name": "Speaker Name", "role": "Title", "company": "Company", "bio": "Bio text"}]'
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JSON array of speaker objects with name, role, company, and bio fields
          </p>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Example format:</strong>
          </p>
          <pre className="text-xs mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`[
  {
    "name": "Dr. Sarah Johnson",
    "role": "Chief Innovation Officer",
    "company": "InnovateTech Corp",
    "bio": "Expert in innovation strategy"
  }
]`}
          </pre>
        </div>
      </div>

      {/* Tickets JSON Editor */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Tickets (JSON)</h3>
          {!ticketsValid && (
            <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Invalid JSON
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing-tickets">Pricing Tiers Data</Label>
          <Textarea
            id="pricing-tickets"
            value={data.ticketsText}
            onChange={(e) => onChange({ ...data, ticketsText: e.target.value })}
            rows={12}
            className={`font-mono text-xs ${!ticketsValid ? 'border-red-300 dark:border-red-700' : ''}`}
            placeholder='[{"label": "Early Bird", "price": "$299", "sub": "Description", "highlights": ["Feature 1"], "availabilityText": "50 available", "cta": "Buy Now"}]'
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JSON array of ticket objects with label, price, sub, highlights (array), availabilityText, and cta fields
          </p>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Example format:</strong>
          </p>
          <pre className="text-xs mt-1 text-blue-700 dark:text-blue-300 overflow-x-auto">
{`[
  {
    "label": "Early Bird",
    "price": "$299.00",
    "sub": "Perfect for individuals",
    "highlights": [
      "Access to all sessions",
      "Welcome reception"
    ],
    "availabilityText": "50 tickets available",
    "cta": "Get Early Bird Ticket"
  }
]`}
          </pre>
        </div>
      </div>
    </div>
  );
}
