import { ReusableBarChart } from "../lib/lib-barchart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
// Reusable Pie Chart Component
type PieData = { name: string; value: number; fill: string }[];

function ReusablePieChart({ data, title, dimensions = { width: 320, height: 320 } }: {
    data: PieData;
    title?: string;
    dimensions?: { width?: number | string; height?: number | string };
}) {
    return (
        <div className="flex flex-col items-center">
            {title && <h3 className="text-lg font-bold mb-2 text-center">{title}</h3>}
            <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={60}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        isAnimationActive={true}
                    >
                        {data.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
                {data.map((p) => (
                    <div key={p.name} className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full" style={{ background: p.fill }}></span>
                        <span className="font-semibold text-lg" style={{ color: p.fill }}>{p.name}</span>
                        <span className="text-gray-700 dark:text-gray-200 font-bold">{p.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
import { FaMapMarkerAlt, FaTicketAlt, FaDollarSign, FaGlobeAmericas } from "react-icons/fa";

const ageData = [
    { name: "18-24", value: 22, fill: "#6366f1" },
    { name: "25-34", value: 38, fill: "#3b82f6" },
    { name: "35-44", value: 28, fill: "#f59e42" },
    { name: "45-54", value: 14, fill: "#10b981" },
    { name: "55+", value: 8, fill: "#ef4444" },
];

const paymentData = [
    { name: "Credit Card", value: 59.3, fill: "#6366f1" },
    { name: "Debit Card", value: 23.8, fill: "#3b82f6" },
    { name: "PayPal", value: 12.2, fill: "#f59e42" },
];

const geoData = [
    {
        label: "Local (< 25 mi)",
        percent: 59.3,
        tickets: 112,
        avg: 125,
        color: "#6366f1",
        icon: <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-300" />,
    },
    {
        label: "Regional (25-100 mi)",
        percent: 27.5,
        tickets: 52,
        avg: 145,
        color: "#3b82f6",
        icon: <FaMapMarkerAlt className="text-blue-500 dark:text-blue-300" />,
    },
    {
        label: "National (100+ mi)",
        percent: 13.2,
        tickets: 25,
        avg: null,
        color: "#f59e42",
        icon: <FaGlobeAmericas className="text-orange-400 dark:text-orange-300" />,
    },
];

export default function TicketDemographicsTab() {
    return (
        <div className="space-y-10">
            {/* Age Distribution Bar Chart */}
            <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-300 tracking-wide">Customer Demographics</h2>
                <ReusableBarChart
                    data={ageData}
                    title="Age Distribution"
                    bars={ageData.map((d) => ({ dataKey: "value", name: d.name, fill: d.fill }))}
                    yAxisLabel="Attendees"
                    dimensions={{ width: "100%", maxWidth: "100%", height: 340 }}
                    barSize={50}
                    isAnimationActive={true}
                />
            </div>

            {/* Payment Methods Pie Chart */}
            <div className="w-full bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-pink-700 dark:text-pink-300 tracking-wide">Payment Methods</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <ReusablePieChart data={paymentData} title="" />
                </div>
            </div>

            {/* Geographic Distribution */}
            <div className="w-full bg-gradient-to-br from-green-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-green-700 dark:text-green-300 tracking-wide">Geographic Distribution</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {geoData.map((g) => (
                        <div key={g.label} className="rounded-xl p-6 shadow bg-white dark:bg-gray-800 border-t-4 flex flex-col gap-2 items-center" style={{ borderColor: g.color }}>
                            <div className="flex items-center gap-2 mb-2 text-2xl">{g.icon}<span className="font-bold" style={{ color: g.color }}>{g.label}</span></div>
                            <div className="flex items-center gap-2 text-lg">
                                <FaTicketAlt className="text-gray-400 dark:text-gray-500" />
                                <span className="font-semibold">{g.tickets} tickets</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg">
                                <span className="font-semibold">{g.percent}% of buyers</span>
                            </div>
                            {g.avg && (
                                <div className="flex items-center gap-2 text-lg">
                                    <FaDollarSign className="text-green-500" />
                                    <span className="font-semibold">Avg ${g.avg}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}