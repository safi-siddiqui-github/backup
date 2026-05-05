import { FaGamepad, FaUsers, FaPlay, FaClock, FaCheckCircle, FaChartBar, FaTrophy, FaStar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList, Cell } from "recharts";

const statCards = [
    { label: "Total Games", value: 8, icon: <FaGamepad className="text-white text-2xl" />, gradient: "from-blue-400 via-blue-500 to-indigo-500" },
    { label: "Total Players", value: 156, icon: <FaUsers className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
    { label: "Active Games", value: 6, icon: <FaPlay className="text-white text-2xl" />, gradient: "from-pink-400 via-pink-500 to-rose-500" },
    { label: "Avg Play Time", value: "8.5min", icon: <FaClock className="text-white text-2xl" />, gradient: "from-yellow-300 via-yellow-400 to-yellow-500" },
    { label: "Completion Rate", value: "89%", icon: <FaCheckCircle className="text-white text-2xl" />, gradient: "from-indigo-400 via-blue-400 to-blue-600" },
    { label: "Total Sessions", value: 234, icon: <FaChartBar className="text-white text-2xl" />, gradient: "from-green-400 via-green-500 to-emerald-500" },
];

const gamePopularityData = [
    { name: "Love Story Trivia", players: 45 },
    { name: "Photo Scavenger Hunt", players: 38 },
    { name: "Memory Match", players: 29 },
    { name: "Wedding Facts Quiz", players: 25 },
    { name: "Couple's Journey", players: 19 },
];
const barColors = ["#6366f1", "#10b981", "#f472b6", "#f59e42", "#8b5cf6"];

const activityLineData = [
    { hour: "14:00", sessions: 12, completions: 8 },
    { hour: "15:00", sessions: 18, completions: 13 },
    { hour: "16:00", sessions: 25, completions: 19 },
    { hour: "17:00", sessions: 32, completions: 25 },
    { hour: "18:00", sessions: 41, completions: 33 },
    { hour: "19:00", sessions: 53, completions: 44 },
    { hour: "20:00", sessions: 47, completions: 39 },
    { hour: "21:00", sessions: 38, completions: 31 },
];

const gamePerformance = [
    {
        name: "Love Story Trivia",
        players: 45,
        completions: 42,
        avgScore: 847,
        rating: 4.8,
        completionRate: 93,
        color: "#6366f1",
    },
    {
        name: "Photo Scavenger Hunt",
        players: 38,
        completions: 33,
        avgScore: 723,
        rating: 4.6,
        completionRate: 87,
        color: "#10b981",
    },
    {
        name: "Memory Match",
        players: 29,
        completions: 22,
        avgScore: 625,
        rating: 4.3,
        completionRate: 76,
        color: "#f472b6",
    },
    {
        name: "Wedding Facts Quiz",
        players: 25,
        completions: 21,
        avgScore: 534,
        rating: 4.5,
        completionRate: 84,
        color: "#f59e42",
    },
    {
        name: "Couple's Journey",
        players: 19,
        completions: 17,
        avgScore: 678,
        rating: 4.7,
        completionRate: 89,
        color: "#8b5cf6",
    },
];

const playTimeDist = [
    { range: "0-2 min", count: 34, color: "#6366f1" },
    { range: "2-5 min", count: 56, color: "#10b981" },
    { range: "5-10 min", count: 78, color: "#f472b6" },
    { range: "10-15 min", count: 41, color: "#f59e42" },
    { range: "15+ min", count: 19, color: "#8b5cf6" },
];

function StatCard({ icon, value, label, gradient }: { icon: React.ReactNode; value: string | number; label: string; gradient: string }) {
    return (
        <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br ${gradient} min-h-[120px]`}>
            <div className="mb-2">{icon}</div>
            <div className="text-2xl font-extrabold text-white drop-shadow mb-1">{value}</div>
            <div className="text-xs font-semibold text-white/80 tracking-wide text-center">{label}</div>
        </div>
    );
}

export default function AnalyticsGamesTab() {
    return (
        <div className="space-y-10">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat, idx) => (
                    <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} gradient={stat.gradient} />
                ))}
            </div>

            {/* Bar Chart: Game Popularity */}
            <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Game Popularity</h3>
                <div className="w-full max-w-2xl mx-auto">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={gamePopularityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#6366f1" angle={-20} textAnchor="end" interval={0} height={80} />
                            <YAxis stroke="#6366f1" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="players" name="Players">
                                {gamePopularityData.map((entry, idx) => (
                                    <Cell key={`cell-${entry.name}`} fill={barColors[idx % barColors.length]} />
                                ))}
                                <LabelList dataKey="players" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Line Chart: Gaming Activity Throughout Event */}
            <div className="bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100 dark:from-green-950 dark:via-yellow-950 dark:to-pink-950 rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-6 text-green-700 dark:text-green-300">Gaming Activity Throughout Event</h3>
                <div className="w-full max-w-2xl mx-auto">
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={activityLineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" stroke="#10b981" />
                            <YAxis stroke="#10b981" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sessions" stroke="#6366f1" strokeWidth={3} dot={true} name="Sessions" />
                            <Line type="monotone" dataKey="completions" stroke="#f59e42" strokeWidth={3} dot={true} name="Completions" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Game Performance Details */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-6 text-pink-700 dark:text-pink-300">Game Performance Details</h3>
                <div className="flex flex-col gap-6">
                    {gamePerformance.map((g) => (
                        <div key={g.name} className="rounded-xl shadow p-6 border-t-4 flex flex-col gap-2" style={{ borderColor: g.color, background: `${g.color}10` }}>
                            <div className="flex items-center gap-3 mb-2">
                                <FaTrophy className="text-yellow-400 text-lg" />
                                <span className="font-bold text-lg" style={{ color: g.color }}>{g.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm mb-1">
                                <span>{g.players} players • {g.completions} completions</span>
                                <span>Avg Score: <span className="font-semibold">{g.avgScore}</span></span>
                                <span>Rating: <span className="font-semibold text-yellow-500"><FaStar className="inline mr-1" />{g.rating}/5</span></span>
                                <span>Completion: <span className="font-semibold" style={{ color: g.color }}>{g.completionRate}%</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Horizontal Bar Chart: Play Time Distribution */}
            <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 dark:from-purple-950 dark:via-blue-950 dark:to-green-950 rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">Play Time Distribution</h3>
                <div className="w-full max-w-2xl mx-auto">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart
                            data={playTimeDist}
                            layout="vertical"
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" stroke="#6366f1" />
                            <YAxis dataKey="range" type="category" stroke="#6366f1" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" name="Players">
                                {playTimeDist.map((entry, idx) => (
                                    <Cell key={`cell-${entry.range}`} fill={entry.color} />
                                ))}
                                <LabelList dataKey="count" position="right" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}