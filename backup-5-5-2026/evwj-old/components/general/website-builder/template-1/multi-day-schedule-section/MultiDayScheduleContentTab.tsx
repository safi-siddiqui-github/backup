import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Calendar, Clock, MapPin } from 'lucide-react';

interface MultiDayScheduleData {
  title: string;
  subtitle: string;
  daysText: string;
}

interface MultiDayScheduleContentTabProps {
  data: MultiDayScheduleData;
  onChange: (data: MultiDayScheduleData) => void;
}

export default function MultiDayScheduleContentTab({ data, onChange }: MultiDayScheduleContentTabProps) {
  const isValidJSON = (text: string) => {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  };

  const daysValid = isValidJSON(data.daysText);

  const getPreviewData = () => {
    try {
      const days = JSON.parse(data.daysText);
      return { days, valid: true };
    } catch {
      return { days: [], valid: false };
    }
  };

  const preview = getPreviewData();

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      keynote: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      workshop: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      break: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      networking: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Event Schedule'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Full agenda for all event days'}
            </p>
          </div>
        </div>

        {preview.valid && preview.days.length > 0 ? (
          <div className="space-y-3">
            {preview.days.slice(0, 2).map((day: any, dayIdx: number) => (
              <div key={dayIdx} className="bg-white dark:bg-slate-950 rounded-lg border p-3">
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {day.dateLabel || day.date || `Day ${dayIdx + 1}`}
                </div>
                <div className="space-y-2">
                  {day.events && day.events.length > 0 ? (
                    day.events.slice(0, 3).map((event: any, eventIdx: number) => (
                      <div
                        key={eventIdx}
                        className="flex gap-2 text-xs bg-gray-50 dark:bg-slate-900 rounded p-2"
                      >
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {event.start}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {event.title}
                            </span>
                            {event.type && (
                              <span className={`text-xs px-2 py-0.5 rounded ${getEventTypeColor(event.type)}`}>
                                {event.type}
                              </span>
                            )}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">No events</p>
                  )}
                  {day.events && day.events.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{day.events.length - 3} more events
                    </p>
                  )}
                </div>
              </div>
            ))}
            {preview.days.length > 2 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{preview.days.length - 2} more days
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <p className="text-sm">
              {preview.valid ? 'No days configured yet' : 'Invalid JSON - Please check your data format'}
            </p>
          </div>
        )}
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="schedule-title">Title</Label>
          <Input
            id="schedule-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Event Schedule"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule-subtitle">Subtitle</Label>
          <Input
            id="schedule-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Full agenda for all event days"
          />
        </div>
      </div>

      {/* Schedule Days JSON Editor */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Schedule Days (JSON)</h3>
          {!daysValid && (
            <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Invalid JSON
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule-days">Days & Events Data</Label>
          <Textarea
            id="schedule-days"
            value={data.daysText}
            onChange={(e) => onChange({ ...data, daysText: e.target.value })}
            rows={14}
            className={`font-mono text-xs ${!daysValid ? 'border-red-300 dark:border-red-700' : ''}`}
            placeholder='[{"date": "Friday, March 15", "dateLabel": "Day 1", "events": []}]'
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JSON array of day objects. Each day has: date, dateLabel, and events (array of event objects)
          </p>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200 font-semibold mb-2">
            Example format:
          </p>
          <pre className="text-xs text-blue-700 dark:text-blue-300 overflow-x-auto whitespace-pre-wrap">
{`[
  {
    "date": "Friday, March 15",
    "dateLabel": "Friday, March 15",
    "events": [
      {
        "start": "9:00 AM",
        "end": "10:00 AM",
        "title": "Opening Keynote",
        "type": "keynote",
        "description": "Welcome address",
        "location": "Main Auditorium",
        "btn": "Add to Calendar"
      }
    ]
  }
]`}
          </pre>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Event Types:</strong> keynote, workshop, break, networking (determines badge color)
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            <strong>Required fields per event:</strong> start, title
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            <strong>Optional fields:</strong> end, type, description, location, btn
          </p>
        </div>
      </div>
    </div>
  );
}
