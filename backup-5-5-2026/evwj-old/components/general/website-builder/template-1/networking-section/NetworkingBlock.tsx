import React from 'react';

export default function NetworkingBlock({ data }: { data: any }) {
  const {
    title = 'Network & Connect',
    subtitle = 'Meet fellow attendees and expand your professional network',
    description = 'Join structured networking sessions, speed-dating rounds, and informal meetups to connect with peers, mentors, and potential collaborators.',
    activities = [],
    cta = 'See Events',
  } = data || {};

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

            {Array.isArray(activities) && activities.length > 0 && (
              <ul className="mt-4 space-y-3">
                {activities.map((a: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-semibold">{i + 1}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{a.title}</div>
                      {a.time && <div className="text-xs text-gray-500">{a.time}</div>}
                      {a.desc && <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">{a.desc}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <div className="flex flex-col items-start gap-3">
              <div className="text-sm text-gray-500">Quick actions</div>
              <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">{cta}</button>
              <button className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Join Networking Slack</button>
              <button className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Host a Meetup</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
