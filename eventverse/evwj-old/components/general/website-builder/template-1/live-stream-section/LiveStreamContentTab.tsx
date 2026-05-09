import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Video, PlayCircle } from 'lucide-react';

interface LiveStreamData {
  title: string;
  subtitle: string;
  streamUrl: string;
}

interface LiveStreamContentTabProps {
  data: LiveStreamData;
  onChange: (data: LiveStreamData) => void;
}

export default function LiveStreamContentTab({ data, onChange }: LiveStreamContentTabProps) {
  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500 rounded-lg">
            <Video className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Watch Live'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Join us virtually for the live stream'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 rounded-lg border p-4">
          {data.streamUrl ? (
            <div className="space-y-3">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-2">
                    <p className="text-white text-xs font-medium">Live Stream Preview</p>
                    <p className="text-gray-300 text-xs mt-1 truncate">{data.streamUrl}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded font-medium">
                  LIVE
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Stream configured and ready
                </span>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex flex-col items-center justify-center">
              <Video className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No stream URL configured</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add a stream embed URL below</p>
            </div>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="stream-title">Title</Label>
          <Input
            id="stream-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Watch Live"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stream-subtitle">Subtitle</Label>
          <Input
            id="stream-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Join us virtually for the live stream"
          />
        </div>
      </div>

      {/* Stream Configuration */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Live Stream Configuration</h3>
        
        <div className="space-y-2">
          <Label htmlFor="stream-url">Stream Embed URL</Label>
          <Textarea
            id="stream-url"
            value={data.streamUrl}
            onChange={(e) => onChange({ ...data, streamUrl: e.target.value })}
            placeholder="https://www.youtube.com/embed/xyz or other embed URL"
            rows={3}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Provide an embed URL (iframe src) to display the live stream. This should be the full embed URL from your streaming platform.
          </p>
        </div>

        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200 font-semibold mb-2">
            Getting Your Stream URL:
          </p>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
            <li><strong>YouTube:</strong> Go to your video → Share → Embed → Copy the URL from the iframe src</li>
            <li><strong>Vimeo:</strong> Click Share on your video → Get the embed code → Copy the iframe src URL</li>
            <li><strong>Twitch:</strong> Use format: https://player.twitch.tv/?channel=YOURCHANNEL&parent=YOURDOMAIN</li>
          </ul>
        </div>

        {data.streamUrl && (
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-2">
              <PlayCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-green-800 dark:text-green-200 font-semibold">
                  Stream URL configured
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Your live stream will be embedded and ready to display on the event website.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
