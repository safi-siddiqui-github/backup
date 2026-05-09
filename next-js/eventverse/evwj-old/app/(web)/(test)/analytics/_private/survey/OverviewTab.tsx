import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaCheckCircle, FaChartBar, FaStar, FaSmile, FaCommentDots, FaUserFriends, FaUserTie, FaEnvelope, FaMobileAlt, FaQrcode, FaSms } from "react-icons/fa";

const summaryStats = [
    { label: "Total Responses", value: "448", icon: <FaCheckCircle className="text-indigo-500 text-2xl" /> },
    { label: "+12% vs last", value: "", icon: <FaChartBar className="text-green-500 text-2xl" /> },
    { label: "Completion Rate", value: "72%", icon: <FaStar className="text-yellow-500 text-2xl" /> },
    { label: "Above average", value: "", icon: <FaSmile className="text-pink-500 text-2xl" /> },
    { label: "Avg. Completion", value: "2.8 min", icon: <FaCommentDots className="text-blue-500 text-2xl" /> },
    { label: "Optimal length", value: "", icon: <FaChartBar className="text-indigo-400 text-2xl" /> },
    { label: "Avg. Rating", value: "4.3", icon: <FaStar className="text-yellow-500 text-2xl" /> },
];

const barData = [
    { survey: "Event Feedback", responses: 240 },
    { survey: "Food & Catering", responses: 180 },
    { survey: "Venue Experience", responses: 120 },
    { survey: "Speaker Eval", responses: 60 },
    { survey: "Post-Event NPS", responses: 90 },
    { survey: "Post-Event Feedback", responses: 220 },
];
const barColors = ["#6366f1", "#06b6d4", "#22d3ee", "#f59e42", "#f43f5e", "#a3e635"];

const funnelSteps = [
    { label: "Survey Started", value: 248, percent: "100%", dropped: 0 },
    { label: "Q1 Completed", value: 228, percent: "92%", dropped: 20 },
    { label: "Q2 Completed", value: 224, percent: "90%", dropped: 4 },
    { label: "Q3 Completed", value: 186, percent: "75%", dropped: 38 },
    { label: "Q4 Completed", value: 178, percent: "72%", dropped: 8 },
    { label: "Survey Submitted", value: 142, percent: "57%", dropped: 36 },
];

const questions = [
    {
        icon: <FaStar className="text-yellow-500 text-xl" />, q: "How would you rate your overall event experience?", type: "rating", responses: 228, drop: "2%", avg: "8s", dist: [
            { label: "5 ★", value: "42%" },
            { label: "4 ★", value: "32%" },
            { label: "3 ★", value: "17%" },
            { label: "2 ★", value: "6%" },
            { label: "1 ★", value: "3%" },
        ], avgRating: "4.3 / 5"
    },
    {
        icon: <FaSmile className="text-green-500 text-xl" />, q: "How likely are you to recommend this event?", type: "nps", responses: 224, drop: "4%", avg: "6s", dist: [
            { label: "Promoters", value: "70%" },
            { label: "Passives", value: "21%" },
            { label: "Detractors", value: "9%" },
        ]
    },
    {
        icon: <FaCommentDots className="text-blue-500 text-xl" />, q: "What did you enjoy most about the event?", type: "text", responses: 186, drop: "38%", avg: "45s", dist: [
            { label: "Networking opportunities", value: "58" },
            { label: "Quality of speakers", value: "45" },
            { label: "Venue atmosphere", value: "38" },
        ]
    },
    {
        icon: <FaStar className="text-yellow-500 text-xl" />, q: "How would you rate the venue facilities?", type: "rating", responses: 178, drop: "8%", avg: "6s", dist: [
            { label: "5 ★", value: "57%" },
            { label: "4 ★", value: "25%" },
            { label: "3 ★", value: "12%" },
            { label: "2 ★", value: "3%" },
            { label: "1 ★", value: "2%" },
        ], avgRating: "4.5 / 5"
    },
    {
        icon: <FaCommentDots className="text-pink-500 text-xl" />, q: "What improvements would you suggest?", type: "text", responses: 142, drop: "36%", avg: "52s", dist: [
            { label: "More networking time", value: "35" },
            { label: "Better parking", value: "28" },
            { label: "Longer breaks", value: "22" },
        ]
    },
];

const segments = [
    {
        icon: <FaUserFriends className="text-indigo-500 text-2xl" />, label: "First-time Attendees", responses: 98, nps: 78, satisfaction: 4.5
    },
    {
        icon: <FaUserTie className="text-green-500 text-2xl" />, label: "Returning Attendees", responses: 126, nps: 68, satisfaction: 4.1
    },
    {
        icon: <FaSmile className="text-pink-500 text-2xl" />, label: "VIP Guests", responses: 24, nps: 85, satisfaction: 4.7
    },
];

const channelData = [
    { name: "Email", value: 42, icon: <FaEnvelope className="text-indigo-500 text-xl" /> },
    { name: "In-App", value: 28, icon: <FaMobileAlt className="text-green-500 text-xl" /> },
    { name: "QR Code", value: 18, icon: <FaQrcode className="text-pink-500 text-xl" /> },
    { name: "SMS", value: 12, icon: <FaSms className="text-yellow-500 text-xl" /> },
];
const channelColors = ["#6366f1", "#06b6d4", "#f59e42", "#a3e635"];

function StatCard({ icon, value, label }: any) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100px]">
            <div className="mb-2">{icon}</div>
            {value && <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow mb-1">{value}</div>}
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{label}</div>
        </div>
    );
}

function FunnelStep({ label, value, percent, dropped }: any) {
    return (
        <div className="flex items-center gap-4 mb-2">
            <FaCheckCircle className="text-indigo-400 text-lg" />
            <span className="font-semibold text-gray-700 dark:text-gray-200 w-32">{label}</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-300">{value} ({percent})</span>
            {dropped > 0 && <span className="text-xs text-red-500 ml-2">-{dropped} dropped</span>}
        </div>
    );
}

function QuestionCard({ icon, q, type, responses, drop, avg, dist, avgRating }: any) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
                {icon}
                <span className="font-bold text-indigo-700 dark:text-indigo-300">{q}</span>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{type}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-300">{responses} responses</span>
                <span className="text-red-500">{drop} drop-off</span>
                <span className="text-blue-500">{avg} avg</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
                {dist.map((d: any, idx: number) => (
                    <span key={idx} className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded-full text-xs font-semibold">{d.label}: {d.value}</span>
                ))}
            </div>
            {avgRating && <div className="mt-2 text-sm font-bold text-yellow-600 dark:text-yellow-300">Avg: {avgRating}</div>}
        </div>
    );
}

function SegmentCard({ icon, label, responses, nps, satisfaction }: any) {
    return (
        <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
            <div>{icon}</div>
            <div className="flex-1">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{label}</div>
                <div className="flex flex-wrap gap-4 mt-1 text-sm">
                    <span className="text-gray-500 dark:text-gray-300">{responses} responses</span>
                    <span className="text-indigo-600 dark:text-indigo-300 font-semibold">NPS: {nps}</span>
                    <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Satisfaction: {satisfaction}</span>
                </div>
            </div>
        </div>
    );
}

export default function OverviewTab() {
    return (
        <div className="space-y-10">
            {/* Header Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {summaryStats.map((stat, idx) => (
                    <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
                ))}
            </div>

            {/* Bar Chart & Funnel */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Vertical Bar Chart */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex-1">
                    <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Response by Survey</div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={barData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis type="number" className="text-xs"/>
                            <YAxis dataKey="survey" type="category" className="text-xs"/>
                            <Tooltip />
                            <Bar dataKey="responses">
                                {barData.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Progress Funnel */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex-1">
                    <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Survey Completion Funnel</div>
                    <div className="space-y-2">
                        {funnelSteps.map((step, idx) => (
                            <FunnelStep key={idx} {...step} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Question-Level Deep Dive */}
            <div>
                <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Question-Level Deep Dive</div>
                {questions.map((q, idx) => (
                    <QuestionCard key={idx} {...q} />
                ))}
            </div>

            {/* Response by Segment */}
            <div>
                <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Response by Segment</div>
                {segments.map((seg, idx) => (
                    <SegmentCard key={idx} {...seg} />
                ))}
            </div>

            {/* Circle Chart: Response by Channel */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
                <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Response by Channel</div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={channelData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    innerRadius={50}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                >
                                    {channelData.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={channelColors[idx % channelColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={v => `${v}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-2">
                        {channelData.map((entry, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                                {entry.icon}
                                <span className="font-semibold text-gray-700 dark:text-gray-200">{entry.name}</span>
                                <span className="ml-auto text-gray-500 dark:text-gray-400">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
