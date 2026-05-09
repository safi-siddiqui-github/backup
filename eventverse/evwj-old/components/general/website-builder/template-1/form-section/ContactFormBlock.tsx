import React from 'react';

type ContactFormData = {
  title?: string;
  subtitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitText?: string;
  bgColor?: string;
  textColor?: string;
};

export default function ContactFormBlock({ data }: { data: ContactFormData }) {
  const sectionStyle: React.CSSProperties = {};
  if (data.bgColor) sectionStyle.backgroundColor = data.bgColor;

  const textStyle: React.CSSProperties = {};
  if (data.textColor) textStyle.color = data.textColor;

  return (
    <section style={sectionStyle} className="rounded-lg p-6 bg-white dark:bg-gray-900">
      {data.title && <h3 style={textStyle} className="text-xl font-semibold text-gray-900 dark:text-white">{data.title}</h3>}
      {data.subtitle && <p style={textStyle} className="mt-1 text-sm text-gray-600 dark:text-gray-300">{data.subtitle}</p>}

      <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.nameLabel || 'Name*'}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" placeholder={data.namePlaceholder || 'Your name'} />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.emailLabel || 'Email*'}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" placeholder={data.emailPlaceholder || 'your@email.com'} />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{data.messageLabel || 'Message*'}</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2" rows={5} placeholder={data.messagePlaceholder || 'Your message'} />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            {data.submitText || 'Send Message'}
          </button>
        </div>
      </form>
    </section>
  );
}
