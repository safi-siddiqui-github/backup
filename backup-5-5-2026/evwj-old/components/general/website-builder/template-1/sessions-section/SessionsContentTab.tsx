import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Presentation, Clock, MapPin, Tag, User } from 'lucide-react';

interface SessionsData {
  title: string;
  subtitle: string;
  sessions: Array<{
    track: string;
    title: string;
    speaker: string;
    time: string;
    location: string;
    level: string;
    description: string;
    tags: string[];
  }>;
}

interface SessionsContentTabProps {
  data: SessionsData;
  onChange: (data: SessionsData) => void;
}

export default function SessionsContentTab({ data, onChange }: SessionsContentTabProps) {
  const updateSession = (idx: number, patch: Partial<SessionsData['sessions'][0]>) => {
    const updatedSessions = data.sessions.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...data, sessions: updatedSessions });
  };

  const addSession = () => {
    const newSession = {
      track: 'All Sessions',
      title: 'New Session',
      speaker: '',
      time: '',
      location: '',
      level: 'Beginner',
      description: '',
      tags: [],
    };
    onChange({ ...data, sessions: [...data.sessions, newSession] });
  };

  const removeSession = (idx: number) => {
    const updatedSessions = data.sessions.filter((_, i) => i !== idx);
    onChange({ ...data, sessions: updatedSessions });
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      Beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      Advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    return colors[level] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500 rounded-lg">
            <Presentation className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Conference Sessions'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Explore our diverse lineup of sessions and workshops'}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {data.sessions.length > 0 ? (
            data.sessions.slice(0, 3).map((session, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {session.track && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                          {session.track}
                        </span>
                      )}
                      {session.level && (
                        <span className={`text-xs px-2 py-0.5 rounded ${getLevelColor(session.level)}`}>
                          {session.level}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {session.title || 'Session Title'}
                    </h4>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {session.speaker && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {session.speaker}
                    </div>
                  )}
                  {session.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.time}
                    </div>
                  )}
                  {session.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {session.location}
                    </div>
                  )}
                </div>

                {session.description && (
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                    {session.description}
                  </p>
                )}

                {session.tags && session.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <Tag className="h-3 w-3 text-gray-400" />
                    {session.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
              No sessions added yet
            </div>
          )}
          {data.sessions.length > 3 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              +{data.sessions.length - 3} more sessions
            </p>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="sessions-title">Title</Label>
          <Input
            id="sessions-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Conference Sessions"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessions-subtitle">Subtitle</Label>
          <Input
            id="sessions-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Explore our diverse lineup of sessions and workshops"
          />
        </div>
      </div>

      {/* Sessions Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Conference Sessions</h3>
          <Button
            type="button"
            onClick={addSession}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {data.sessions.map((session, idx) => (
            <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Session {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSession(idx)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`session-track-${idx}`}>Track</Label>
                  <Input
                    id={`session-track-${idx}`}
                    value={session.track}
                    onChange={(e) => updateSession(idx, { track: e.target.value })}
                    placeholder="All Sessions"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`session-level-${idx}`}>Level</Label>
                  <Select
                    value={session.level}
                    onValueChange={(value) => updateSession(idx, { level: value })}
                  >
                    <SelectTrigger id={`session-level-${idx}`}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`session-title-${idx}`}>Session Title</Label>
                <Input
                  id={`session-title-${idx}`}
                  value={session.title}
                  onChange={(e) => updateSession(idx, { title: e.target.value })}
                  placeholder="Opening Keynote: The Future of Innovation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`session-speaker-${idx}`}>Speaker</Label>
                <Input
                  id={`session-speaker-${idx}`}
                  value={session.speaker}
                  onChange={(e) => updateSession(idx, { speaker: e.target.value })}
                  placeholder="Dr. Sarah Johnson"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`session-time-${idx}`}>Time</Label>
                  <Input
                    id={`session-time-${idx}`}
                    value={session.time}
                    onChange={(e) => updateSession(idx, { time: e.target.value })}
                    placeholder="09:00 - 10:00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`session-location-${idx}`}>Location</Label>
                  <Input
                    id={`session-location-${idx}`}
                    value={session.location}
                    onChange={(e) => updateSession(idx, { location: e.target.value })}
                    placeholder="Main Auditorium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`session-description-${idx}`}>Description</Label>
                <Textarea
                  id={`session-description-${idx}`}
                  value={session.description}
                  onChange={(e) => updateSession(idx, { description: e.target.value })}
                  placeholder="Join us for an inspiring keynote about emerging technologies..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`session-tags-${idx}`}>Tags (comma-separated)</Label>
                <Input
                  id={`session-tags-${idx}`}
                  value={(session.tags || []).join(', ')}
                  onChange={(e) =>
                    updateSession(idx, {
                      tags: e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="innovation, technology, keynote"
                />
              </div>
            </div>
          ))}

          {data.sessions.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Presentation className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No sessions added yet</p>
              <p className="text-xs mt-1">Click "Add Session" to create your first session</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
