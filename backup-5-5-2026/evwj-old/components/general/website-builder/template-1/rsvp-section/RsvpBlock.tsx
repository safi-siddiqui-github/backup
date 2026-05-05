import React from 'react';

type RsvpData = {
  title?: string;
  subtitle?: string;
  eventDate?: string;
  location?: string;
  fullNameLabel?: string;
  emailLabel?: string;
  attendingLabel?: string;
  attendingOptions?: string[];
  messageLabel?: string;
  submitText?: string;
  bgColor?: string;
  textColor?: string;
};

export default function RsvpBlock({ data }: { data: RsvpData }) {
  const sectionStyle: React.CSSProperties = {};
  if (data.bgColor) sectionStyle.backgroundColor = data.bgColor;

  const textStyle: React.CSSProperties = {};
  if (data.textColor) textStyle.color = data.textColor;

  return (
    <section style={sectionStyle} className="rounded-lg p-6 bg-white dark:bg-gray-900">
      {data.title && <h3 style={textStyle} className="text-xl font-semibold text-gray-900 dark:text-white">{data.title}</h3>}
      {data.subtitle && <p style={textStyle} className="mt-1 text-sm text-gray-600 dark:text-gray-300">{data.subtitle}</p>}

      {(data.eventDate || data.location) && (
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
          {data.eventDate && <div className="text-sm text-gray-600 dark:text-gray-300">{new Date(data.eventDate).toLocaleDateString()}</div>}
          {data.location && <div className="text-sm text-gray-600 dark:text-gray-300">{data.location}</div>}
        </div>
      )}

      <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.fullNameLabel || 'Full Name *'}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" placeholder="Your full name" />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.emailLabel || 'Email Address *'}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" placeholder="your@email.com" />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.attendingLabel || 'Will you be attending? *'}</label>
          <select className="mt-1 w-full rounded border px-3 py-2">
            {(data.attendingOptions || ['Yes', 'No', 'Maybe']).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.messageLabel || 'Additional Message'}</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2" rows={4} placeholder="Any questions or special requests?" />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            {data.submitText || 'Submit RSVP'}
          </button>
        </div>
      </form>
    </section>
  );
}
