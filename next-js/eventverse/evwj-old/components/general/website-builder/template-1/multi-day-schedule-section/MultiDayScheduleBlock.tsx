import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const getTagClasses = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'break':
      return 'text-xs font-medium text-gray-500 dark:text-gray-400';
    case 'keynote':
      return 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'workshop':
      return 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'networking':
      return 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default:
      return 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

export default function MultiDayScheduleBlock({ data }: { data: any }) {
  const { title = 'Event Schedule', subtitle = 'Full agenda for all event days', days = [] } = data || {};
  
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['All Events', 'Break', 'Keynote', 'Workshop', 'Networking'];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="  mx-auto px-4">
        
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && (
            <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase().replace(' ', ''))}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-colors
                ${activeFilter === filter.toLowerCase().replace(' ', '')
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {Array.isArray(days) && days.map((d: any, di: number) => (
            <div key={di}>
              <h4 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-6">
                {d.dateLabel}
              </h4>
              
              <div className="space-y-4">
                {Array.isArray(d.events) && d.events.map((e: any, ei: number) => (
                  <div 
                    key={ei} 
                    className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm"
                  >
                    <div className="w-full sm:w-28 flex-shrink-0 text-left sm:text-right">
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{e.start}</div>
                      {e.end && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">{e.end}</div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{e.title}</h5>
                      {e.description && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{e.description}</p>
                      )}
                      {e.location && (
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span>{e.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full sm:w-36 flex sm:flex-col items-end justify-between sm:justify-start sm:text-right gap-2 pt-2 sm:pt-0">
                      {e.type && (
                        <span className={getTagClasses(e.type)}>
                          {e.type.toLowerCase() === 'break' ? e.type : e.type.charAt(0).toUpperCase() + e.type.slice(1)}
                        </span>
                      )}
                      <a 
                        href={e.calendarUrl || '#'} 
                        className="mt-0 sm:mt-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400 whitespace-nowrap"
                      >
                        Add to Calendar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}