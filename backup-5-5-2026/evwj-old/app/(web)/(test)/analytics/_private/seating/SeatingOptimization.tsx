"use client";

import React from "react";
// Radar chart data for Seating Optimization Scores
const radarData = [
  { metric: "Group Cohesion", Score: 82 },
  { metric: "Preference Match", Score: 76 },
  { metric: "Dietary Clustering", Score: 91 },
  { metric: "Accessibility", Score: 88 },
  { metric: "Table Balance", Score: 80 },
];

const radarLines = [
  {
    name: "Score",
    dataKey: "Score",
    stroke: "#6366f1",
    fill: "#6366f1",
    fillOpacity: 0.5,
  },
];
import { FaArrowRight, FaExchangeAlt, FaUsers, FaUtensils, FaLeaf, FaSeedling, FaBreadSlice, FaStar, FaCheckCircle } from "react-icons/fa";
import { SimpleRadarChart } from "../lib/lib-radarchart";

const suggestions = [
  {
    impact: "High Impact",
    confidence: 92,
    description: "Move Table 5 guests to Table 3 for better group dynamics",
    color: "#f59e42",
    icon: <FaExchangeAlt className="text-white text-lg" />,
  },
  {
    impact: "Medium Impact",
    confidence: 85,
    description: "Swap guests between Table 2 and Table 6 for dietary clustering",
    color: "#3b82f6",
    icon: <FaArrowRight className="text-white text-lg" />,
  },
  {
    impact: "High Impact",
    confidence: 88,
    description: "Relocate 3 guests from VIP to General for accessibility needs",
    color: "#10b981",
    icon: <FaUsers className="text-white text-lg" />,
  },
];

const dietaryClusters = [
  {
    label: "Vegetarian",
    tables: "3, 7, 12",
    guests: 28,
    score: 92,
    color: "#22c55e",
    icon: <FaLeaf className="text-white text-lg" />,
  },
  {
    label: "Vegan",
    tables: "7, 12",
    guests: 12,
    score: 88,
    color: "#a3e635",
    icon: <FaSeedling className="text-white text-lg" />,
  },
  {
    label: "Gluten-Free",
    tables: "5, 8",
    guests: 8,
    score: 95,
    color: "#f59e42",
    icon: <FaBreadSlice className="text-white text-lg" />,
  },
  {
    label: "Kosher",
    tables: "4",
    guests: 6,
    score: 100,
    color: "#6366f1",
    icon: <FaStar className="text-white text-lg" />,
  },
  {
    label: "Halal",
    tables: "6",
    guests: 4,
    score: 100,
    color: "#ef4444",
    icon: <FaCheckCircle className="text-white text-lg" />,
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

export default function SeatingOptimization() {
  return (
    <div className="space-y-10">
      {/* Seating Optimization Scores Radar Chart */}
      <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-extrabold mb-8 text-center text-purple-700 dark:text-purple-300 tracking-wide">Seating Optimization Scores</h2>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xl">
            <SimpleRadarChart
              data={radarData}
              lines={radarLines}
              angleKey="metric"
              outerRadius="80%"
              height={350}
              legend={false}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            {radarData.map((item) => (
              <div key={item.metric} className="flex flex-col items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-200">{item.metric}</span>
                <span className="font-bold text-lg text-purple-700 dark:text-purple-300">{item.Score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* AI Optimization Suggestions */}
      <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-300 tracking-wide">AI Optimization Suggestions</h2>
        <div className="space-y-6">
          {suggestions.map((s, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-xl shadow px-6 py-4 bg-gradient-to-br from-white via-gray-100 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-l-8" style={{ borderColor: s.color }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: s.color }}>
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold text-base ${s.impact === 'High Impact' ? 'text-orange-600 dark:text-orange-300' : 'text-blue-600 dark:text-blue-300'}`}>{s.impact}</span>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">{s.confidence}% confidence</span>
                </div>
                <div className="text-gray-800 dark:text-gray-100 font-medium">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dietary Clustering Effectiveness */}
      <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-extrabold mb-8 text-center text-pink-700 dark:text-pink-300 tracking-wide">Dietary Clustering Effectiveness</h2>
        <div className="flex flex-col gap-6">
          {dietaryClusters.map((c, idx) => (
            <div key={c.label} className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 border-t-4 flex flex-col gap-2" style={{ borderColor: c.color }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: c.color }}>
                  {c.icon}
                </div>
                <span className="font-bold text-lg" style={{ color: c.color }}>{c.label}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm mb-1">
                <span>Tables: <span className="font-semibold">{c.tables}</span></span>
                <span>Guests: <span className="font-semibold">{c.guests}</span></span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-300">Cluster Score</span>
                <span className="font-bold text-base" style={{ color: c.color }}>{c.score}%</span>
              </div>
              <ProgressBar percent={c.score} color={c.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
