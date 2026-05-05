import React from 'react';

export default function LiveStreamBlock({ data }: { data: any }) {
  const { title = 'Watch Live', subtitle = 'Join us virtually for the live stream', streamUrl = '' } = data || {};

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 border border-gray-100 dark:border-gray-800 p-4">
          {streamUrl ? (
            <div className="w-full h-64">
              <iframe src={streamUrl} title="Live stream" className="w-full h-full" />
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500">
              <div>Stream URL not provided — show a preview or placeholder here.</div>
            </div>
          )}

          {streamUrl && (
            <div className="mt-3 flex justify-center">
              <a href={streamUrl} target="_blank" rel="noreferrer" className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Open stream</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
