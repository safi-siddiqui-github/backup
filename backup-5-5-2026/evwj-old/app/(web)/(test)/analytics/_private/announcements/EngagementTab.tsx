import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaArrowUp, FaArrowDown, FaExclamation, FaFire } from "react-icons/fa";

const urgencyData = [
  {
    icon: <FaArrowDown className="text-blue-400 text-2xl" />, level: "Low", open: "45%", click: "12%", response: "8.5 hrs"
  },
  {
    icon: <FaExclamation className="text-yellow-400 text-2xl" />, level: "Medium", open: "65%", click: "24%", response: "4.2 hrs"
  },
  {
    icon: <FaArrowUp className="text-orange-500 text-2xl" />, level: "High", open: "82%", click: "38%", response: "1.8 hrs"
  },
  {
    icon: <FaFire className="text-red-500 text-2xl" />, level: "Critical", open: "94%", click: "56%", response: "0.5 hrs"
  },
];

const pieData = [
  { name: "Read", value: 67.8, color: "#6366f1" },
  { name: "Clicked Link", value: 23.4, color: "#06b6d4" },
  { name: "Replied", value: 4.5, color: "#f59e42" },
  { name: "Shared", value: 1.9, color: "#a3e635" },
  { name: "Saved", value: 1.5, color: "#f43f5e" },
  { name: "Unsubscribed", value: 0.8, color: "#c026d3" },
];

function UrgencyCard({ icon, level, open, click, response }: any) {
  const levelColor =
    level === "Low"
      ? "bg-blue-100 text-blue-700"
      : level === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : level === "High"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700";
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div>{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${levelColor}`}>{level} Urgency</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-1 text-sm">
          <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{open} Open Rate</span>
          <span className="text-blue-600 dark:text-blue-300 font-semibold">{click} Click Rate</span>
          <span className="text-emerald-600 dark:text-emerald-300 font-semibold">{response} Avg Response</span>
        </div>
      </div>
    </div>
  );
}

export default function EngagementTab() {
  return (
    <div className="space-y-10">
      {/* Urgency vs Engagement Correlation */}
      <div>
        <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Urgency vs Engagement Correlation</div>
        {urgencyData.map((urg, idx) => (
          <UrgencyCard key={idx} {...urg} />
        ))}
      </div>

      {/* User Reactions & Responses Pie Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">User Reactions & Responses</div>
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
    </div>
  );
}
