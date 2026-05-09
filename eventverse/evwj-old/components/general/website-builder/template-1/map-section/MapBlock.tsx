import React from 'react';

type MapData = {
  title?: string;
  subtitle?: string;
  description?: string;
  address?: string;
  bgColor?: string;
  textColor?: string;
};

export default function MapBlock({ data }: { data: MapData }) {
  const sectionStyle: React.CSSProperties = {};
  if (data.bgColor) sectionStyle.backgroundColor = data.bgColor;

  const textStyle: React.CSSProperties = {};
  if (data.textColor) textStyle.color = data.textColor;

  return (
    <section style={sectionStyle} className="rounded-lg p-6 bg-white dark:bg-gray-900">
      {data.title && <h3 style={textStyle} className="text-xl font-semibold text-gray-900 dark:text-white">{data.title}</h3>}
      {data.subtitle && <p style={textStyle} className="mt-1 text-sm text-gray-600 dark:text-gray-300">{data.subtitle}</p>}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="h-48 w-full rounded border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500">
            Interactive Map Coming Soon
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400" style={textStyle}>{data.description}</p>
        </div>

        <div>
          <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Find Us</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300" style={textStyle}>{data.address || '123 Event Street, City, Country'}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Directions: Take the metro to Central Station and walk 5 minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
