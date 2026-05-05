import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaBullhorn, FaClock, FaExclamationCircle } from "react-icons/fa";

const lineData = [
  { month: "Jan", open: 36, click: 18 },
  { month: "Feb", open: 42, click: 20 },
  { month: "Mar", open: 55, click: 27 },
  { month: "Apr", open: 68, click: 32 },
  { month: "May", open: 74, click: 36 },
  { month: "Jun", open: 80, click: 40 },
];

const insights = [
  {
    icon: <FaExclamationCircle className="text-red-500 text-xl" />, title: "High Engagement on Important Alerts", desc: "Your \"Important Alerts\" category has a 94.7% open rate. Consider using this format for critical communications.",
  },
  {
    icon: <FaClock className="text-indigo-500 text-xl" />, title: "Evening Sends Perform Better", desc: "Announcements sent at 7-8 PM have 21.9% higher open rates. Adjust your scheduling strategy.",
  },
  {
    icon: <FaBullhorn className="text-pink-500 text-xl" />, title: "Promotional Messages Need Improvement", desc: "Promotional announcements have only 45.3% open rate. Try personalizing subject lines or reducing frequency.",
  },
];

function InsightCard({ icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">{title}</div>
        <div className="text-gray-600 dark:text-gray-300 text-sm">{desc}</div>
      </div>
    </div>
  );
}

export default function InsightsTab() {
  return (
    <div className="space-y-10">
      {/* Line Chart: Historical Performance Trend */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Historical Performance Trend</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Line type="monotone" dataKey="open" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} name="Open Rate" />
            <Line type="monotone" dataKey="click" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} name="Click Rate" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Actionable Insights */}
      <div>
        <div className="font-bold text-lg mb-4 text-indigo-700 dark:text-indigo-300">Actionable Insights</div>
        {insights.map((ins, idx) => (
          <InsightCard key={idx} {...ins} />
        ))}
      </div>
    </div>
  );
}
