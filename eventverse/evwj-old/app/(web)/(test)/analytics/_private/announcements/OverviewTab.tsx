import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { FaBullhorn, FaCalendarCheck, FaBell, FaGift, FaExclamationCircle, FaCommentDots } from "react-icons/fa";

const summaryStats = [
    { label: "Total Sent", value: "156" },
    { label: "Total Reach", value: "12,450" },
    { label: "Avg Open Rate", value: "67.8%" },
    { label: "Avg Click Rate", value: "23.4%" },
    { label: "Response Rate", value: "12.5%" },
    { label: "Unsubscribe Rate", value: "0.8%" },
];

const areaData = [
    { week: "Week 1", EngagementA: 120, EngagementB: 80 },
    { week: "Week 2", EngagementA: 200, EngagementB: 140 },
    { week: "Week 3", EngagementA: 320, EngagementB: 210 },
    { week: "Week 4", EngagementA: 400, EngagementB: 300 },
    { week: "Week 5", EngagementA: 500, EngagementB: 380 },
    { week: "Week 6", EngagementA: 600, EngagementB: 420 },
];

const barData = [
    { time: "8 AM", value: 40 },
    { time: "10 AM", value: 90 },
    { time: "12 PM", value: 120 },
    { time: "2 PM", value: 180 },
    { time: "4 PM", value: 150 },
    { time: "6 PM", value: 200 },
    { time: "8 PM", value: 130 },
    { time: "10 PM", value: 70 },
];
const barColors = [
    "#6366f1", "#06b6d4", "#22d3ee", "#f59e42", "#f43f5e", "#a3e635", "#fbbf24", "#c026d3"
];

const perfData = [
    {
        icon: <FaBullhorn className="text-indigo-500 text-2xl" />, type: "Event Updates", sent: 45, open: "78.5%", click: "34.2%", response: "18.5%", status: "High"
    },
    {
        icon: <FaCalendarCheck className="text-green-500 text-2xl" />, type: "Schedule Changes", sent: 23, open: "89.2%", click: "45.6%", response: "28.9%", status: "High"
    },
    {
        icon: <FaBell className="text-yellow-500 text-2xl" />, type: "Reminders", sent: 34, open: "72.1%", click: "28.4%", response: "15.2%", status: "High"
    },
    {
        icon: <FaGift className="text-pink-500 text-2xl" />, type: "Promotional", sent: 28, open: "45.3%", click: "12.8%", response: "5.6%", status: "Low"
    },
    {
        icon: <FaExclamationCircle className="text-red-500 text-2xl" />, type: "Important Alerts", sent: 15, open: "94.7%", click: "56.3%", response: "42.1%", status: "High"
    },
    {
        icon: <FaCommentDots className="text-blue-500 text-2xl" />, type: "Surveys/Feedback", sent: 11, open: "58.9%", click: "38.2%", response: "25.4%", status: "Medium"
    },
];

function PerfCard({ icon, type, sent, open, click, response, status }: any) {
    const statusColor = status === "High" ? "bg-green-100 text-green-700" : status === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
    return (
        <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
            <div>{icon}</div>
            <div className="flex-1">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{type}</div>
                <div className="flex flex-wrap gap-4 mt-1 text-sm">
                    <span className="text-gray-500 dark:text-gray-300">{sent} sent</span>
                    <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{open} open</span>
                    <span className="text-blue-600 dark:text-blue-300 font-semibold">{click} click</span>
                    <span className="text-emerald-600 dark:text-emerald-300 font-semibold">{response} response</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ml-2 ${statusColor}`}>{status} Response</span>
                </div>
            </div>
        </div>
    );
}

export default function OverviewTab() {
    return (
        <div className="space-y-10">
            {/* Header Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {summaryStats.map((stat, idx) => (
                    <div key={idx} className="rounded-xl bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow p-6 flex flex-col items-center">
                        <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-1">{stat.value}</div>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Area Chart: Engagement Trend */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
                <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Engagement Trend</div>
                <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="week" className="text-xs"/>
                        <YAxis className="text-xs"/>
                        <Tooltip />
                        <Area type="monotone" dataKey="EngagementA" stroke="#6366f1" fillOpacity={1} fill="url(#colorA)" />
                        <Area type="monotone" dataKey="EngagementB" stroke="#06b6d4" fillOpacity={1} fill="url(#colorB)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Bar Chart: Peak Engagement Times */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
                <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Peak Engagement Times</div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="time" className="text-xs"/>
                        <YAxis className="text-xs"/>
                        <Tooltip />
                        <Bar dataKey="value">
                            {barData.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Announcement Type Performance */}
            <div>
                <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Announcement Type Performance</div>
                {perfData.map((perf, idx) => (
                    <PerfCard key={idx} {...perf} />
                ))}
            </div>
        </div>
    );
}
