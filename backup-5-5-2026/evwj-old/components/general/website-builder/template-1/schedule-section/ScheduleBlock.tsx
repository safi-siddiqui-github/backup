 
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const getTagClasses = (tag: string) => {
  switch (tag?.toLowerCase()) {
    case 'networking':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case 'keynote':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'workshop':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'panel':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

// --- Main Component ---
export default function ScheduleBlock({ data }: { data: any }) {
  const { title, subtitle, sessions = [] } = data || {};
  return (
    <section className="py-12">
      <div className="  mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && (
            <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>

        {/* Schedule Days Loop */}
        <div className="mt-10 space-y-12">
          {sessions.map((s: any, i: number) => (
            <article key={i} aria-labelledby={`day-${i}`}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                <h4 id={`day-${i}`} className="text-xl font-semibold text-gray-900 dark:text-white">
                  {s.date}
                </h4>
              </div>

              {/* Items List - responsive grid */}
              <div className="space-y-8">
                {Array.isArray(s.items) &&
                  s.items.map((it: any, idx: number) => (
                    <div key={idx} className="flex gap-6 items-start">
                      {/* Left: marker + time */}
                      <div className="w-24 flex flex-col items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-blue-500 dark:bg-gray-900">
                          <Clock className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="mt-2 text-xs text-center">{it.time}</div>
                      </div>

                      {/* Right: content card */}
                      <div className="flex-1">
                        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900">
                          <div className="flex items-center justify-between gap-4">
                            {it.tag && (
                              <span
                                className={`rounded px-2.5 py-0.5 text-xs font-semibold ${getTagClasses(
                                  it.tag
                                )}`}
                              >
                                {it.tag}
                              </span>
                            )}
                          </div>

                          <div className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{it.title}</div>

                          {it.description && (
                            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{it.description}</div>
                          )}

                          {it.location && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                              <span>{it.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}