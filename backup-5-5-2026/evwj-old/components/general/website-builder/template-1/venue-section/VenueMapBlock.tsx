import React from 'react';

export default function VenueMapBlock({ data }: { data: any }) {
  const { title = 'Event Venue', subtitle = 'Find your way around our venue', address = '', embedUrl = '' } = data || {};

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Venue Address</h4>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{address || '123 Event Street, City, Country'}</p>
            <div className="mt-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || '123 Event Street, City, Country')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-700"
              >
                Get directions
              </a>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
            {embedUrl ? (
              // allow embed iframe if provided
              <div className="w-full h-64">
                <iframe src={embedUrl} title="Venue map" className="w-full h-full" />
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-gray-400">Map preview will appear here</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
