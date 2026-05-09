import React from 'react';

const LevelBadge = ({ level }: { level?: string }) => {
  const map: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  const cls = level ? map[level.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  return <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${cls}`}>{level}</span>;
};

export default function SessionsBlock({ data }: { data: any }) {
  const { title, subtitle, tabs = ['All Sessions', 'Keynotes', 'Workshops', 'Panels'], sessions = [] } = data || {};

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 shadow-sm">
            {tabs.map((t: string, i: number) => (
              <button key={i} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-white/5 rounded-md">{t}</button>
            ))}
          </div>
        </div>

  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {sessions.map((s: any, i: number) => {
            const accents = [
              'from-indigo-500 to-purple-500',
              'from-rose-500 to-pink-500',
              'from-emerald-500 to-teal-500',
              'from-yellow-400 to-orange-400',
            ];
            const accent = accents[i % accents.length];

            return (
              <article key={i} className="group h-full">
                <div className={`h-full flex flex-col rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm transition-transform transform hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-opacity-30 dark:border-gray-800 dark:bg-gray-900`}>
                  {/* accent header */}
                  <div className={`w-full py-4 px-6 bg-linear-to-r ${accent} text-white`}> 
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs opacity-90">{s.track || ''}</div>
                        <h4 className="mt-1 text-lg font-semibold">{s.title}</h4>
                        {s.speaker && <div className="mt-1 text-sm opacity-90">{s.speaker}</div>}
                      </div>
                      <div className="flex flex-col items-end">
                        <LevelBadge level={s.level} />
                        <div className="mt-2 text-sm opacity-90">{s.time}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between min-h-48">
                    <div>
                      {s.description && <p className="text-sm text-gray-600 dark:text-gray-300">{s.description}</p>}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        {s.tag1 && <span className="inline-block px-2 py-1 bg-gray-100 rounded text-gray-600">{s.tag1}</span>}
                        {s.tag2 && <span className="inline-block px-2 py-1 bg-gray-100 rounded text-gray-600">{s.tag2}</span>}
                      </div>
                      <button onClick={() => alert(`View details: ${s.title}`)} className="rounded-md bg-white/10 border border-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm hover:scale-105 transition">View Details</button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
