import React from 'react';

const icons: Record<string, React.ReactNode> = {
  RSVP: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Ticketing: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Budget: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Seating: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  ),
  Media: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Schedule: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Announcements: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Games: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Survey: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
};

const cards = [
  {
    label: 'RSVP',
    score: '94%',
    engagement: '89%',
    efficiency: '96%',
    note: '98% response rate, dietary preferences well managed',
    color: {
      bg: 'bg-blue-100',
      darkBg: 'dark:bg-blue-900',
      text: 'text-blue-600',
      darkText: 'dark:text-blue-300',
      ring: 'focus:ring-blue-500',
    },
  },
  {
    label: 'Ticketing',
    score: '91%',
    engagement: '78%',
    efficiency: '88%',
    extraLabel: 'Revenue',
    extraValue: '$24,750',
    note: 'Strong early bird sales, VIP tier performing above expectations',
    color: {
      bg: 'bg-green-100',
      darkBg: 'dark:bg-green-900',
      text: 'text-green-600',
      darkText: 'dark:text-green-300',
      ring: 'focus:ring-green-500',
    },
  },
  {
    label: 'Budget',
    score: '88%',
    engagement: '92%',
    efficiency: '85%',
    note: '15% under budget, vendor relationships optimized',
    color: {
      bg: 'bg-yellow-100',
      darkBg: 'dark:bg-yellow-900',
      text: 'text-yellow-600',
      darkText: 'dark:text-yellow-300',
      ring: 'focus:ring-yellow-500',
    },
  },
  {
    label: 'Seating',
    score: '87%',
    engagement: '85%',
    efficiency: '90%',
    note: '92% preference satisfaction, zone utilization balanced',
    color: {
      bg: 'bg-purple-100',
      darkBg: 'dark:bg-purple-900',
      text: 'text-purple-600',
      darkText: 'dark:text-purple-300',
      ring: 'focus:ring-purple-500',
    },
  },
  {
    label: 'Media',
    score: '93%',
    engagement: '96%',
    efficiency: '91%',
    note: '1,247 photos uploaded, viral potential detected',
    color: {
      bg: 'bg-pink-100',
      darkBg: 'dark:bg-pink-900',
      text: 'text-pink-600',
      darkText: 'dark:text-pink-300',
      ring: 'focus:ring-pink-500',
    },
  },
  {
    label: 'Schedule',
    score: '85%',
    engagement: '87%',
    efficiency: '83%',
    note: '83% on-time performance, buffer time optimized',
    color: {
      bg: 'bg-indigo-100',
      darkBg: 'dark:bg-indigo-900',
      text: 'text-indigo-600',
      darkText: 'dark:text-indigo-300',
      ring: 'focus:ring-indigo-500',
    },
  },
  {
    label: 'Announcements',
    score: '89%',
    engagement: '94%',
    efficiency: '84%',
    note: '76% view rate, engagement peaks during key moments',
    color: {
      bg: 'bg-red-100',
      darkBg: 'dark:bg-red-900',
      text: 'text-red-600',
      darkText: 'dark:text-red-300',
      ring: 'focus:ring-red-500',
    },
  },
  {
    label: 'Games',
    score: '92%',
    engagement: '98%',
    efficiency: '87%',
    note: '3x higher photo sharing among game participants',
    color: {
      bg: 'bg-cyan-100',
      darkBg: 'dark:bg-cyan-900',
      text: 'text-cyan-600',
      darkText: 'dark:text-cyan-300',
      ring: 'focus:ring-cyan-500',
    },
  },
  {
    label: 'Survey',
    score: '90%',
    engagement: '85%',
    efficiency: '88%',
    note: 'High completion rates, valuable feedback collected',
    color: {
      bg: 'bg-teal-100',
      darkBg: 'dark:bg-teal-900',
      text: 'text-teal-600',
      darkText: 'dark:text-teal-300',
      ring: 'focus:ring-teal-500',
    },
  },
];

export default function ModulePerformanceCards({ onNavigateTab }: { onNavigateTab?: (label: string) => void }) {
  const handleNavigate = (label: string) => onNavigateTab?.(label);

  return (
    <div className="mt-10 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Module Performance Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer focus:outline-none focus:ring-2 ${card.color.ring}`}
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(card.label)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleNavigate(card.label);
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${card.color.bg} ${card.color.darkBg} rounded-full flex items-center justify-center`}> 
                <span className={`${card.color.text} ${card.color.darkText}`}>{icons[card.label]}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{card.label}</h3>
                <span className={`text-3xl font-bold ${card.color.text} ${card.color.darkText}`}>{card.score}</span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Engagement</span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{card.engagement}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">{card.efficiency}</span>
              </div>
              {card.extraLabel && card.extraValue && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{card.extraLabel}</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{card.extraValue}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{card.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
