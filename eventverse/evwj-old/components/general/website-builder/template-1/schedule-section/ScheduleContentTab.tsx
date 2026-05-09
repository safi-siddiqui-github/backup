import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CalendarDays, Clock, MapPin } from 'lucide-react';

interface ScheduleData {
  title: string;
  subtitle: string;
  sessionsText: string;
}

interface ScheduleContentTabProps {
  data: ScheduleData;
  onChange: (data: ScheduleData) => void;
}

export default function ScheduleContentTab({ data, onChange }: ScheduleContentTabProps) {
  const isValidJSON = (text: string) => {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  };

  const sessionsValid = isValidJSON(data.sessionsText);

  const getPreviewData = () => {
    try {
      const sessions = JSON.parse(data.sessionsText);
      return { sessions, valid: true };
    } catch {
      return { sessions: [], valid: false };
    }
  };

  const preview = getPreviewData();

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <CalendarDays className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Event Schedule'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || "Don't miss out on these exciting sessions"}
            </p>
          </div>
        </div>

        {preview.valid && preview.sessions.length > 0 ? (
          <div className="space-y-3">
            {preview.sessions.slice(0, 2).map((session: any, sessionIdx: number) => (
              <div key={sessionIdx} className="bg-white dark:bg-slate-950 rounded-lg border p-3">
                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {session.date || `Session ${sessionIdx + 1}`}
                </div>
                <div className="space-y-2">
                  {session.items && session.items.length > 0 ? (
                    session.items.slice(0, 3).map((item: any, itemIdx: number) => (
                      <div
                        key={itemIdx}
                        className="flex gap-3 text-xs bg-gray-50 dark:bg-slate-900 rounded p-2"
                      >
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {item.title}
                          </div>
                          {item.description && (
                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                              {item.description}
                            </p>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400">No items</p>
                  )}
                  {session.items && session.items.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{session.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>
            ))}
            {preview.sessions.length > 2 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{preview.sessions.length - 2} more sessions
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <p className="text-sm">
              {preview.valid ? 'No sessions configured yet' : 'Invalid JSON - Please check your data format'}
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
            placeholder="Don't miss out on these exciting sessions"
          />
        </div>
      </div>

      {/* Sessions JSON Editor */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Sessions (JSON)</h3>
          {!sessionsValid && (
            <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Invalid JSON
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule-sessions">Schedule Sessions Data</Label>
          <Textarea
            id="schedule-sessions"
            value={data.sessionsText}
            onChange={(e) => onChange({ ...data, sessionsText: e.target.value })}
            rows={12}
            className={`font-mono text-xs ${!sessionsValid ? 'border-red-300 dark:border-red-700' : ''}`}
            placeholder='[{"date": "Saturday, June 15, 2024", "items": []}]'
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JSON array of date sections. Each section has a date and items (array of schedule items)
          </p>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200 font-semibold mb-2">
            Example format:
          </p>
          <pre className="text-xs text-blue-700 dark:text-blue-300 overflow-x-auto whitespace-pre-wrap">
{`[
  {
    "date": "Saturday, June 15, 2024",
    "items": [
      {
        "time": "8:00 AM - 9:00 AM",
        "title": "Registration & Coffee",
        "description": "",
        "location": "Main Lobby"
      },
      {
        "time": "9:00 AM - 10:00 AM",
        "title": "Opening Keynote",
        "description": "Welcome address",
        "location": "Main Auditorium"
      }
    ]
  }
]`}
          </pre>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Required fields per item:</strong> time, title
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            <strong>Optional fields:</strong> description, location
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            Each date section should have a "date" field and an "items" array
          </p>
        </div>
      </div>
    </div>
  );
}
