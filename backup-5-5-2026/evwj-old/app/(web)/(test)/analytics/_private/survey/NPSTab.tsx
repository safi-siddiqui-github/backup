import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from "recharts";
import { FaStar, FaArrowUp, FaArrowRight, FaUserFriends, FaUserTie, FaSmile } from "react-icons/fa";

const npsSummary = [
        { label: "Net Promoter Score", value: "72", icon: <FaStar className="text-yellow-500 text-2xl" /> },
        { label: "+8 points vs previous event", value: "", icon: <FaArrowUp className="text-green-500 text-2xl" /> },
        { label: "Promoters (9-10)", value: "68%", sub: "156 respondents", icon: <FaStar className="text-indigo-500 text-xl" /> },
        { label: "Passives (7-8)", value: "21%", sub: "48 respondents", icon: <FaArrowRight className="text-blue-500 text-xl" /> },
        { label: "Detractors (0-6)", value: "11%", sub: "24 respondents", icon: <FaArrowRight className="text-red-500 text-xl" /> },
];

const scoreCards = [
        { label: "Your Score", value: "72", status: "Excellent", color: "bg-green-100 text-green-700" },
        { label: "Industry Benchmark", value: "45", status: "+27 above", color: "bg-indigo-100 text-indigo-700" },
        { label: "Previous Event", value: "64", status: "+8 improvement", color: "bg-yellow-100 text-yellow-700" },
];

const barData = [
        { score: 0, count: 5 },
        { score: 1, count: 8 },
        { score: 2, count: 12 },
        { score: 3, count: 18 },
        { score: 4, count: 22 },
        { score: 5, count: 30 },
        { score: 6, count: 35 },
        { score: 7, count: 48 },
        { score: 8, count: 56 },
        { score: 9, count: 80 },
        { score: 10, count: 76 },
];
const barColors = ["#6366f1", "#06b6d4", "#22d3ee", "#f59e42", "#f43f5e", "#a3e635", "#c026d3", "#fbbf24", "#10b981", "#3b82f6", "#f472b6"];

const areaData = [
        { event: "Jan Event", nps: 45 },
        { event: "Feb Event", nps: 52 },
        { event: "Mar Event", nps: 60 },
        { event: "Apr Event", nps: 64 },
        { event: "Current", nps: 72 },
];

const segments = [
        { icon: <FaUserFriends className="text-indigo-500 text-2xl" />, label: "First-time Attendees", nps: 78, responses: 98 },
        { icon: <FaUserTie className="text-green-500 text-2xl" />, label: "Returning Attendees", nps: 68, responses: 126 },
        { icon: <FaSmile className="text-pink-500 text-2xl" />, label: "VIP Guests", nps: 85, responses: 24 },
];

function NPSSummaryCard({ icon, label, value, sub }: any) {
        return (
                <div className="flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100px]">
                        <div className="mb-2">{icon}</div>
                        {value && <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow mb-1">{value}</div>}
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{label}</div>
                        {sub && <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</div>}
                </div>
        );
}

function ScoreCard({ label, value, status, color }: any) {
        return (
                <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 ${color} min-h-[100px]`}>
                        <div className="text-2xl font-extrabold mb-1">{value}</div>
                        <div className="text-xs font-semibold tracking-wide text-center">{label}</div>
                        <div className="text-xs font-bold mt-1">{status}</div>
                </div>
        );
}

function SegmentCard({ icon, label, nps, responses }: any) {
        return (
                <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
                        <div>{icon}</div>
                        <div className="flex-1">
                                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{label}</div>
                                <div className="flex flex-wrap gap-4 mt-1 text-sm">
                                        <span className="text-indigo-600 dark:text-indigo-300 font-semibold">NPS: {nps}</span>
                                        <span className="text-gray-500 dark:text-gray-300">{responses} responses</span>
                                </div>
                        </div>
                </div>
        );
}

export default function NPSTab() {
        return (
                <div className="space-y-10">
                        {/* NPS Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                                {npsSummary.map((stat, idx) => (
                                        <NPSSummaryCard key={idx} {...stat} />
                                ))}
                        </div>

                        {/* Score Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {scoreCards.map((card, idx) => (
                                        <ScoreCard key={idx} {...card} />
                                ))}
                        </div>

                        {/* Charts */}
                        <div className="flex flex-col lg:flex-row gap-6">
                                {/* Vertical Bar Chart: Score Distribution */}
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex-1">
                                        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Score Distribution (0-10)</div>
                                        <ResponsiveContainer width="100%" height={220}>
                                                <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                        <XAxis dataKey="score" className="text-xs"/>
                                                        <YAxis className="text-xs"/>
                                                        <Tooltip />
                                                        <Bar dataKey="count">
                                                                {barData.map((entry, idx) => (
                                                                        <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
                                                                ))}
                                                        </Bar>
                                                </BarChart>
                                        </ResponsiveContainer>
                                </div>
                                {/* Area Chart: NPS Trend Over Events */}
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex-1">
                                        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">NPS Trend Over Events</div>
                                        <ResponsiveContainer width="100%" height={220}>
                                                <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                        <defs>
                                                                <linearGradient id="colorNPS" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                                                                </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                        <XAxis dataKey="event" className="text-xs"/>
                                                        <YAxis className="text-xs"/>
                                                        <Tooltip />
                                                        <Area type="monotone" dataKey="nps" stroke="#6366f1" fillOpacity={1} fill="url(#colorNPS)" />
                                                </AreaChart>
                                        </ResponsiveContainer>
                                </div>
                        </div>

                        {/* NPS by Attendee Segment */}
                        <div>
                                <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">NPS by Attendee Segment</div>
                                {segments.map((seg, idx) => (
                                        <SegmentCard key={idx} {...seg} />
                                ))}
                        </div>
                </div>
        );
}
