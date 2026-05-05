import React from "react";
import { ReusableBarChart } from "../lib/lib-barchart";


const revenueForecastData = [
    { name: "This Week", Revenue: 700, fill: "#6366f1" }, // indigo-500
    { name: "Next Week", Revenue: 1400, fill: "#3b82f6" }, // blue-500
    { name: "Week 3", Revenue: 2100, fill: "#f59e42" }, // orange-400
    { name: "Week 4", Revenue: 2800, fill: "#10b981" }, // green-500
    { name: "Event Week", Revenue: 3500, fill: "#ef4444" }, // red-500
];


const purchaseTimeData = [
    { name: "6 AM", Purchases: 5, fill: "#6366f1" }, // indigo-500
    { name: "9 AM", Purchases: 15, fill: "#3b82f6" }, // blue-500
    { name: "12 PM", Purchases: 30, fill: "#f59e42" }, // orange-400
    { name: "3 PM", Purchases: 45, fill: "#10b981" }, // green-500
    { name: "6 PM", Purchases: 60, fill: "#ef4444" }, // red-500
    { name: "9 PM", Purchases: 40, fill: "#a21caf" }, // purple-700
    { name: "12 AM", Purchases: 10, fill: "#f472b6" }, // pink-400
];


const funnelSteps = [
    {
        label: "Page Views",
        value: 2450,
        conversion: 36.3,
        color: "#6366f1", // indigo-500
    },
    {
        label: "Ticket Selection",
        value: 890,
        conversion: 51.2,
        color: "#3b82f6", // blue-500
    },
    {
        label: "Add to Cart",
        value: 456,
        conversion: 68.4,
        color: "#f59e42", // orange-400
    },
    {
        label: "Checkout Started",
        value: 312,
        conversion: 60.6,
        color: "#10b981", // green-500
    },
    {
        label: "Purchase Complete",
        value: 189,
        conversion: null,
        color: "#ef4444", // red-500
    },
];

function FunnelProgressBar({ percent, color }: { percent: number; color: string }) {
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 mb-2 overflow-hidden">
            <div
                className="h-3 rounded"
                style={{ width: `${percent}%`, background: color, transition: "width 0.5s" }}
            ></div>
        </div>
    );
}

export default function TicketSalesTab() {
    return (
        <div className="space-y-10">
            {/* Revenue Forecast Bar Chart */}

            <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-300 tracking-wide">Revenue Forecast</h2>
                <ReusableBarChart
                    data={revenueForecastData}
                    title=""
                    bars={revenueForecastData.map((d, i) => ({
                        dataKey: "Revenue",
                        name: d.name,
                        fill: d.fill,
                    }))}
                    yAxisLabel="Revenue ($)"
                    dimensions={{ width: "100%", maxWidth: "100%", height: 340 }}
                    barSize={60}
                />
            </div>

            {/* Purchase Conversion Funnel */}

            <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 w-full mx-auto">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-300 tracking-wide">Purchase Conversion Funnel</h2>
                <div className="flex flex-col gap-8 w-full">
                    {funnelSteps.map((step, idx) => (
                        <div key={step.label} className="w-full">
                            <div className="flex flex-row flex-wrap justify-between items-center w-full mb-2">
                                <span className="font-semibold text-lg md:text-xl" style={{ color: step.color }}>{step.label}</span>
                                <span className="font-mono text-2xl md:text-3xl font-bold" style={{ color: step.color }}>{step.value.toLocaleString()}</span>
                                {step.conversion !== null && (
                                    <span className="text-lg md:text-xl font-semibold" style={{ color: step.color }}>{step.conversion}% conversion</span>
                                )}
                            </div>
                            {step.conversion !== null && (
                                <div className="w-full">
                                    <FunnelProgressBar percent={step.conversion} color={step.color} />
                                </div>
                            )}
                            {step.conversion === null && (
                                <div className="w-full h-3 rounded bg-gray-200 dark:bg-gray-700 mb-2">
                                    <div
                                        className="h-3 rounded"
                                        style={{ width: "100%", background: step.color }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Purchase Time Patterns Bar Chart */}
            <div className="w-full bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mt-8">
                <ReusableBarChart
                    data={purchaseTimeData}
                    title="Purchase Time Patterns"
                    bars={purchaseTimeData.map((d, i) => ({
                        dataKey: "Purchases",
                        name: d.name,
                        fill: d.fill,
                    }))}
                    yAxisLabel="Purchases"
                    dimensions={{ width: "100%", maxWidth: "100%", height: 340 }}
                    barSize={60}
                />
            </div>
        </div>
    );
}