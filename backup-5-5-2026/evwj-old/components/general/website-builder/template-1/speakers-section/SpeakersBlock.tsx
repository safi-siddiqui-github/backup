import React from 'react';
import { Linkedin, Facebook } from 'lucide-react';

export default function SpeakersBlock({ data }: { data: any }) {
  const { title, subtitle, speakers = [] } = data || {};

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {speakers.map((s: any, i: number) => (
            <article key={i} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="p-8 flex flex-col items-center text-center gap-4 h-full min-h-56 justify-between">
                {/* Image centered */}
                <div className="shrink-0">
                  <img src={s.image || `https://i.pravatar.cc/240?img=${i + 10}`} alt={s.name} className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md dark:border-gray-800" />
                </div>

                {/* Main info */}
                <div className="w-full">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{s.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{s.role}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{s.company}</div>
                  {s.bio && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{s.bio}</p>}
                </div>

                {/* Sessions list */}
                {Array.isArray(s.sessions) && s.sessions.length > 0 && (
                  <div className="w-full mt-2">
                    <div className="text-xs text-gray-400">Sessions:</div>
                    <ul className="mt-2 space-y-2">
                      {s.sessions.map((ss: any, idx: number) => (
                        <li key={idx} className="rounded-md border border-gray-100 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-800 text-left">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{ss.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{ss.time} • {ss.location}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Social icons centered */}
                <div className="w-full mt-4 flex items-center justify-center gap-4">
                  {s.linkedin ? (
                    <a href={s.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  ) : (
                    <Linkedin className="h-5 w-5 text-gray-300" />
                  )}

                  {s.facebook ? (
                    <a href={s.facebook} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700">
                      <Facebook className="h-5 w-5" />
                    </a>
                  ) : (
                    <Facebook className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
