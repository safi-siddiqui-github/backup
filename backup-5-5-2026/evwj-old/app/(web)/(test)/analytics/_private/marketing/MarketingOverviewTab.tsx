import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaBullhorn, FaChartLine, FaUsers, FaMousePointer, FaCheckCircle, FaDollarSign } from "react-icons/fa";

const summaryStats = [
  { label: "Total Campaigns", value: "12", icon: <FaBullhorn className="text-indigo-500 text-2xl" /> },
  { label: "Active", value: "4", icon: <FaChartLine className="text-green-500 text-2xl" /> },
  { label: "Total Reach", value: "45.7K", icon: <FaUsers className="text-blue-500 text-2xl" /> },
  { label: "Impressions", value: "234.5K", icon: <FaChartLine className="text-indigo-400 text-2xl" /> },
  { label: "Total Clicks", value: "8.9K", icon: <FaMousePointer className="text-pink-500 text-2xl" /> },
  { label: "Conversions", value: "312", icon: <FaCheckCircle className="text-green-500 text-2xl" /> },
  { label: "Overall ROI", value: "3.2x", icon: <FaDollarSign className="text-yellow-500 text-2xl" /> },
];

const areaData = [
  { day: "Mon", engagement: 450 },
  { day: "Tue", engagement: 900 },
  { day: "Wed", engagement: 1350 },
  { day: "Thu", engagement: 1800 },
  { day: "Fri", engagement: 1200 },
  { day: "Sat", engagement: 800 },
  { day: "Sun", engagement: 600 },
];

const pieData = [
  { name: "Email", value: 38, color: "#6366f1" },
  { name: "Social Media", value: 32, color: "#06b6d4" },
  { name: "Paid Ads", value: 18, color: "#f59e42" },
  { name: "Direct", value: 12, color: "#a3e635" },
];

const funnelSteps = [
  { label: "Impressions", value: 234500, percent: "3.8% conversion" },
  { label: "Clicks", value: 8945, percent: "69.7% conversion" },
  { label: "Page Views", value: 6234, percent: "14.3% conversion" },
  { label: "Sign-ups", value: 892, percent: "35.0% conversion" },
  { label: "Conversions", value: 312, percent: "" },
];

function StatCard({ icon, value, label }: any) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl shadow-lg px-6 py-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[100px]">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow mb-1">{value}</div>
      <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide text-center">{label}</div>
    </div>
  );
}

function FunnelStep({ label, value, percent }: any) {
  // Progress ratio based on value
  const max = funnelSteps[0].value;
  const ratio = Math.round((value / max) * 100);
  return (
    <div className="mb-4">
      <div className="flex items-center gap-4 mb-1">
        <span className="font-semibold text-gray-700 dark:text-gray-200 w-32">{label}</span>
        <span className="font-bold text-indigo-700 dark:text-indigo-300">{value.toLocaleString()} {percent && <span className="text-xs text-gray-500 ml-2">({percent})</span>}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full">
        <div className="h-3 rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400" style={{ width: `${ratio}%` }}></div>
      </div>
    </div>
  );
}

export default function MarketingOverviewTab() {
  return (
    <div className="space-y-10">
      {/* Header Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, idx) => (
          <StatCard key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Area Chart: Daily Engagement Trend */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Daily Engagement Trend</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Area type="monotone" dataKey="engagement" stroke="#6366f1" fillOpacity={1} fill="url(#colorEngagement)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Channel Distribution */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Channel Distribution</div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={v => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            {pieData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: entry.color }}></span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">{entry.name}</span>
                <span className="ml-auto text-gray-500 dark:text-gray-400">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Conversion Funnel</div>
        <div className="space-y-2">
          {funnelSteps.map((step, idx) => (
            <FunnelStep key={idx} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
