"use client";

import React from "react";
import SimpleLineChart from "../lib/lib-linechart";

const groupStats = [
  {
    label: "2 guests",
    rate: 97.8,
    total: 45,
    placed: 44,
    color: "#22c55e",
  },
  {
    label: "3-4 guests",
    rate: 92.9,
    total: 28,
    placed: 26,
    color: "#3b82f6",
  },
  {
    label: "5-6 guests",
    rate: 91.7,
    total: 12,
    placed: 11,
    color: "#f59e42",
  },
  {
    label: "7+ guests",
    rate: 87.5,
    total: 8,
    placed: 7,
    color: "#ef4444",
  },
];

const timelineData = [
  { week: "Week 1", Assignments: 40 },
  { week: "Week 2", Assignments: 85 },
  { week: "Week 3", Assignments: 130 },
  { week: "Week 4", Assignments: 170 },
  { week: "Week 5", Assignments: 200 },
];

const lineConfig = [
  {
    dataKey: "Assignments",
    stroke: "#6366f1",
    strokeWidth: 3,
    dot: true,
  },
];

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 mb-2 overflow-hidden">
      <div
        className="h-3 rounded"
        style={{ width: `${percent}%`, background: color, transition: "width 0.5s" }}
      ></div>
    </div>
  );
}

export default function SeatingGroupTab() {
  return (
    <div className="space-y-10">
      {/* Group Placement Success Rates */}
      <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-extrabold mb-8 text-center text-pink-700 dark:text-pink-300 tracking-wide">Group Placement Success Rates</h2>
        <div className="flex flex-col gap-6">
          {groupStats.map((g) => (
            <div key={g.label} className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 border-t-4 flex flex-col gap-2" style={{ borderColor: g.color }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg" style={{ color: g.color }}>{g.label}</span>
                <span className="ml-2 text-base font-semibold text-gray-500 dark:text-gray-300">{g.rate}%</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Total Groups: <span className="font-semibold">{g.total}</span></span>
                <span>Placed Together: <span className="font-semibold">{g.placed}</span></span>
              </div>
              <ProgressBar percent={g.rate} color={g.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Timeline Line Chart */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-300 tracking-wide">Assignment Timeline</h2>
        <div className="w-full max-w-2xl mx-auto">
          <SimpleLineChart
            data={timelineData}
            lines={lineConfig}
            xKey="week"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
