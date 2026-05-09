

import { TrendingUp, DollarSign, Camera, Music, Flower2, Building2, Utensils } from "lucide-react";

const roiData = [
  { name: "Venue", roi: 4.2, investment: 15000, expected: 63000, icon: <Building2 className="h-7 w-7 text-white" />,
    gradient: "from-indigo-400 to-indigo-700" },
  { name: "Catering", roi: 3.8, investment: 9800, expected: 37240, icon: <Utensils className="h-7 w-7 text-white" />,
    gradient: "from-emerald-400 to-emerald-700" },
  { name: "Photography", roi: 5.1, investment: 7500, expected: 38250, icon: <Camera className="h-7 w-7 text-white" />,
    gradient: "from-fuchsia-400 to-fuchsia-700" },
  { name: "Flowers", roi: 2.9, investment: 3200, expected: 9280, icon: <Flower2 className="h-7 w-7 text-white" />,
    gradient: "from-rose-400 to-rose-700" },
  { name: "Music/DJ", roi: 4.7, investment: 3250, expected: 15275, icon: <Music className="h-7 w-7 text-white" />,
    gradient: "from-amber-400 to-amber-700" },
];

export default function BudgetROIAnalysisTab() {
  return (
    <div className="space-y-10">
      {/* ROI Analysis */}
      <div className="bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full bg-gradient-to-tr from-indigo-400 via-fuchsia-500 to-emerald-400 p-1 shadow-lg">
            <TrendingUp className="h-7 w-7 text-white drop-shadow" />
          </span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Return on Investment Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {roiData.map((item) => (
            <div
              key={item.name}
              className={`rounded-xl border border-gray-200 dark:border-slate-700 bg-gradient-to-br ${item.gradient} dark:from-slate-900/80 dark:to-slate-800/80 p-5 flex flex-col gap-2 shadow-lg hover:scale-[1.025] transition-transform`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <span className={`rounded-lg p-2 bg-gradient-to-tr ${item.gradient} shadow`}>{item.icon}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</span>
                </span>
                <span className="text-lg font-bold text-white drop-shadow bg-indigo-600/80 dark:bg-indigo-400/80 rounded px-2 py-1">{item.roi}x ROI</span>
              </div>
              <div className="text-sm text-white/90 dark:text-slate-200/90">Investment: <span className="font-mono">${item.investment.toLocaleString()}</span></div>
              <div className="text-sm text-white/90 dark:text-slate-200/90">Expected Return: <span className="font-mono">${item.expected.toLocaleString()}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Efficiency Benchmarking */}
      <div className="bg-gradient-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 p-1 shadow-lg">
              <DollarSign className="h-6 w-6 text-white drop-shadow" />
            </span>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Cost Efficiency Benchmarking</h2>
          </div>
          <div className="flex items-center gap-6 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$31.07</span>
              <span className="text-xs text-gray-500 dark:text-slate-400">Your Cost Per Attendee</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">$42.50</span>
              <span className="text-xs text-gray-500 dark:text-slate-400">Industry Average</span>
            </div>
          </div>
          <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Excellent Cost Efficiency!</div>
          <div className="text-sm text-gray-700 dark:text-slate-300 text-center">You're saving <span className="font-bold">$11.43</span> per attendee compared to industry average.<br />Total savings: <span className="font-bold">$14,253.21</span></div>
        </div>
      </div>
    </div>
  );
}