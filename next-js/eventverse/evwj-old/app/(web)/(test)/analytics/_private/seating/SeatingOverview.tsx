"use client";

import React from "react";
import { ReusableBarChart } from "../lib/lib-barchart";
import { FaTable, FaUsers, FaChair, FaPercent, FaUserTimes, FaThLarge, FaCheckCircle } from "react-icons/fa";

// Summary stats data
const summaryStats = [
    { label: "Total Tables", value: 25, color: "#6366f1", icon: <FaTable className="text-white text-lg" /> },
    { label: "Total Capacity", value: 248, color: "#3b82f6", icon: <FaUsers className="text-white text-lg" /> },
    { label: "Assigned Seats", value: 189, color: "#10b981", icon: <FaChair className="text-white text-lg" /> },
    { label: "Utilization Rate", value: "76.2%", color: "#f59e42", icon: <FaPercent className="text-white text-lg" /> },
    { label: "Unassigned", value: 59, color: "#ef4444", icon: <FaUserTimes className="text-white text-lg" /> },
    { label: "Seating Zones", value: 4, color: "#a21caf", icon: <FaThLarge className="text-white text-lg" /> },
    { label: "Preference Match", value: "92%", color: "#f472b6", icon: <FaCheckCircle className="text-white text-lg" /> },
];

// Table utilization data for chart
const tableUtilizationData = [
    { name: "1", Utilization: 8 },
    { name: "2", Utilization: 12 },
    { name: "3", Utilization: 9 },
    { name: "4", Utilization: 11 },
    { name: "5", Utilization: 7 },
    { name: "6", Utilization: 10 },
    { name: "7", Utilization: 6 },
    { name: "8", Utilization: 5 },
];

// Guest preferences data
const guestPrefs = [
    { label: "Near Dance Floor", value: 38, total: 45, percent: 84, color: "#6366f1" },
    { label: "Quiet Area", value: 29, total: 32, percent: 91, color: "#3b82f6" },
    { label: "With Family", value: 28, total: 28, percent: 100, color: "#10b981" },
    { label: "With Friends", value: 19, total: 22, percent: 86, color: "#f59e42" },
    { label: "Accessible", value: 8, total: 8, percent: 100, color: "#ef4444" },
];

// Zones overview data
const zones = [
    { name: "VIP Section", status: "Full", tables: 3, capacity: 24, assigned: 24, utilization: 100, color: "#6366f1" },
    { name: "Family Area", status: "Available", tables: 8, capacity: 80, assigned: 67, utilization: 84, color: "#3b82f6" },
    { name: "Friends Zone", status: "Available", tables: 10, capacity: 100, assigned: 78, utilization: 78, color: "#f59e42" },
    { name: "General Seating", status: "Available", tables: 4, capacity: 44, assigned: 20, utilization: 45, color: "#10b981" },
];

// Progress bar component
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

// Summary card component
function SummaryCard({ stat }: { stat: { label: string; value: string | number; color: string; icon: React.ReactNode } }) {
    return (
        <div
            className="flex items-center gap-4 rounded-xl shadow-lg px-6 py-4 bg-gradient-to-br from-white via-gray-100 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-l-8 min-w-[170px]"
            style={{ borderColor: stat.color }}
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: stat.color }}>
                {stat.icon}
            </div>
            <div>
                <div className="text-xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 tracking-wide">{stat.label}</div>
            </div>
        </div>
    );
}

// Main component
export default function SeatingOverviewTab() {
    return (
        <div className="space-y-10">
            {/* Summary Cards - visually grouped and distributed */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                    {summaryStats.map((stat) => (
                        <SummaryCard key={stat.label} stat={stat} />
                    ))}
                </div>

            {/* Table Utilization Bar Chart */}
            <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Table Utilization</h3>
                <ReusableBarChart
                    data={tableUtilizationData}
                    title=""
                    bars={[{ dataKey: "Utilization", name: "Utilization", fill: "#6366f1" }]}
                    yAxisLabel="Seats Used"
                    dimensions={{ width: "100%", maxWidth: "100%", height: 280 }}
                    barSize={40}
                />
            </div>

            {/* Guest Preferences Satisfaction */}
            <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4 text-pink-700 dark:text-pink-300">Guest Preferences Satisfaction</h3>
                <div className="space-y-4">
                    {guestPrefs.map((pref) => (
                        <div key={pref.label} className="w-full">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-gray-700 dark:text-gray-200">{pref.label}</span>
                                <span className="font-mono text-lg font-bold" style={{ color: pref.color }}>
                                    {pref.value}/{pref.total} ({pref.percent}%)
                                </span>
                            </div>
                            <ProgressBar percent={pref.percent} color={pref.color} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Seating Zones Overview */}
            <div className="bg-gradient-to-br from-green-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Seating Zones Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {zones.map((zone) => (
                        <div
                            key={zone.name}
                            className="rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 border-t-4 flex flex-col gap-2"
                            style={{ borderColor: zone.color }}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-lg" style={{ color: zone.color }}>{zone.name}</span>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${zone.status === "Full"
                                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                    : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    }`}
                                >
                                    {zone.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <span>Tables: <span className="font-semibold">{zone.tables}</span></span>
                                <span>Capacity: <span className="font-semibold">{zone.capacity}</span></span>
                                <span>Assigned: <span className="font-semibold">{zone.assigned}</span></span>
                                <span>Utilization: <span className="font-semibold">{zone.utilization}%</span></span>
                            </div>
                            <ProgressBar percent={zone.utilization} color={zone.color} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
