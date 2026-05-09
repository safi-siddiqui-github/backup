import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Users, Clock } from 'lucide-react';

interface NetworkingData {
  title: string;
  subtitle: string;
  description: string;
  activities: Array<{
    title: string;
    time: string;
    desc: string;
  }>;
  cta: string;
}

interface NetworkingContentTabProps {
  data: NetworkingData;
  onChange: (data: NetworkingData) => void;
}

export default function NetworkingContentTab({ data, onChange }: NetworkingContentTabProps) {
  const updateActivity = (index: number, patch: Partial<NetworkingData['activities'][0]>) => {
    const updatedActivities = data.activities.map((a, i) => (i === index ? { ...a, ...patch } : a));
    onChange({ ...data, activities: updatedActivities });
  };

  const addActivity = () => {
    const newActivity = {
      title: 'New Activity',
      time: '',
      desc: 'Activity description',
    };
    onChange({ ...data, activities: [...data.activities, newActivity] });
  };

  const removeActivity = (index: number) => {
    const updatedActivities = data.activities.filter((_, i) => i !== index);
    onChange({ ...data, activities: updatedActivities });
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Network & Connect'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Meet fellow attendees and expand your professional network'}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {data.description || 'Join structured networking sessions...'}
        </p>

        {data.activities.length > 0 ? (
          <div className="space-y-2">
            {data.activities.map((activity, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {activity.title || 'Activity Title'}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.desc || 'Description'}
                    </p>
                  </div>
                  {activity.time && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
            No activities added yet
          </div>
        )}

        {data.cta && (
          <div className="mt-4 flex justify-center">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
              {data.cta}
            </div>
          </div>
        )}
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="networking-title">Title</Label>
          <Input
            id="networking-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Network & Connect"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="networking-subtitle">Subtitle</Label>
          <Input
            id="networking-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Meet fellow attendees and expand your professional network"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="networking-description">Description</Label>
          <Textarea
            id="networking-description"
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            placeholder="Join structured networking sessions, speed-dating rounds, and informal meetups..."
            rows={4}
          />
        </div>
      </div>

      {/* Activities Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Networking Activities</h3>
          <Button
            type="button"
            onClick={addActivity}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Activity
          </Button>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {data.activities.map((activity, idx) => (
            <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activity {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeActivity(idx)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`activity-title-${idx}`}>Activity Title</Label>
                <Input
                  id={`activity-title-${idx}`}
                  value={activity.title}
                  onChange={(e) => updateActivity(idx, { title: e.target.value })}
                  placeholder="Speed Networking"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`activity-time-${idx}`}>Time</Label>
                <Input
                  id={`activity-time-${idx}`}
                  value={activity.time}
                  onChange={(e) => updateActivity(idx, { time: e.target.value })}
                  placeholder="10:30 AM"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  When this activity takes place
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`activity-desc-${idx}`}>Description</Label>
                <Textarea
                  id={`activity-desc-${idx}`}
                  value={activity.desc}
                  onChange={(e) => updateActivity(idx, { desc: e.target.value })}
                  placeholder="Quick 5-min rounds to meet many attendees"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {data.activities.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No activities added yet</p>
              <p className="text-xs mt-1">Click "Add Activity" to create your first networking activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Call to Action</h3>
        
        <div className="space-y-2">
          <Label htmlFor="networking-cta">Button Text</Label>
          <Input
            id="networking-cta"
            value={data.cta}
            onChange={(e) => onChange({ ...data, cta: e.target.value })}
            placeholder="See Events"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Text displayed on the primary action button
          </p>
        </div>
      </div>
    </div>
  );
}
