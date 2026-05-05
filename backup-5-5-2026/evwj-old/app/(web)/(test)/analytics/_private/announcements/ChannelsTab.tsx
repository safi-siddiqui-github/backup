import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FaEnvelope, FaBell, FaMobileAlt } from "react-icons/fa";

const channelData = [
  { channel: "Email", engagement: 71 },
  { channel: "Push Notification", engagement: 86 },
  { channel: "In-App", engagement: 86 },
];
const barColors = ["#6366f1", "#06b6d4", "#f59e42"];

const channelStats = [
  {
    icon: <FaEnvelope className="text-indigo-500 text-2xl" />, name: "Email", sent: 89, delivered: 87, opened: 62, clicked: 28, openRate: "71%"
  },
  {
    icon: <FaBell className="text-yellow-500 text-2xl" />, name: "Push Notification", sent: 45, delivered: 44, opened: 38, clicked: 15, openRate: "86%"
  },
  {
    icon: <FaMobileAlt className="text-green-500 text-2xl" />, name: "In-App", sent: 22, delivered: 22, opened: 19, clicked: 8, openRate: "86%"
  },
];

function ChannelCard({ icon, name, sent, delivered, opened, clicked, openRate }: any) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div>{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{name}</div>
        <div className="flex flex-wrap gap-4 mt-1 text-sm">
          <span className="text-gray-500 dark:text-gray-300">Sent: <span className="font-semibold">{sent}</span></span>
          <span className="text-gray-500 dark:text-gray-300">Delivered: <span className="font-semibold">{delivered}</span></span>
          <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Opened: {opened}</span>
          <span className="text-blue-600 dark:text-blue-300 font-semibold">Clicked: {clicked}</span>
          <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Open Rate: {openRate}</span>
        </div>
      </div>
    </div>
  );
}

export default function ChannelsTab() {
  return (
    <div className="space-y-10">
      {/* Bar Chart: Channel Performance Comparison */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Channel Performance Comparison</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={channelData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="channel" className="text-xs"/>
            <YAxis className="text-xs" domain={[0, 100]} tickFormatter={v => `${v}%`}/>
            <Tooltip formatter={v => `${v}%`} />
            <Bar dataKey="engagement">
              {channelData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">Engagement Rate (%)</div>
      </div>

      {/* Channel Stat Cards */}
      <div>
        {channelStats.map((stat, idx) => (
          <ChannelCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
}
