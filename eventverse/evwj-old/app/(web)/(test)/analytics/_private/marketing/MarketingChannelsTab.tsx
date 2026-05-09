import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FaEnvelope, FaShareAlt, FaBullhorn, FaUser } from "react-icons/fa";

const channelData = [
  { channel: "Email", reach: 28500, clicks: 5670, ctr: "19.9%", conversions: 234, cpc: "$0.12", icon: <FaEnvelope className="text-indigo-500 text-2xl" /> },
  { channel: "Social Media", reach: 42300, clicks: 8920, ctr: "21.1%", conversions: 156, cpc: "$0.45", icon: <FaShareAlt className="text-blue-500 text-2xl" /> },
  { channel: "Paid Ads", reach: 18900, clicks: 3450, ctr: "18.3%", conversions: 89, cpc: "$1.20", icon: <FaBullhorn className="text-pink-500 text-2xl" /> },
  { channel: "Direct", reach: 5600, clicks: 2100, ctr: "37.5%", conversions: 78, cpc: "$0.00", icon: <FaUser className="text-green-500 text-2xl" /> },
];
const barColors = ["#6366f1", "#06b6d4", "#f59e42", "#a3e635"];

function ChannelCard({ icon, channel, reach, clicks, ctr, conversions, cpc }: any) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-4">
      <div>{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{channel}</div>
        <div className="flex flex-wrap gap-4 mt-1 text-sm">
          <span className="text-blue-600 dark:text-blue-300 font-semibold">Reach: {reach.toLocaleString()}</span>
          <span className="text-pink-600 dark:text-pink-300 font-semibold">Clicks: {clicks.toLocaleString()}</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-semibold">CTR: {ctr}</span>
          <span className="text-green-600 dark:text-green-300 font-semibold">Conversions: {conversions}</span>
          <span className="text-yellow-600 dark:text-yellow-300 font-semibold">CPC: {cpc}</span>
        </div>
      </div>
    </div>
  );
}

export default function MarketingChannelsTab() {
  return (
    <div className="space-y-10">
      {/* Bar Chart: Channel Effectiveness Comparison */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-8">
        <div className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-300">Channel Effectiveness Comparison</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={channelData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="channel" className="text-xs"/>
            <YAxis className="text-xs"/>
            <Tooltip />
            <Bar dataKey="reach">
              {channelData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={barColors[idx % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">Reach</div>
      </div>

      {/* Channel Stat Cards */}
      <div>
        {channelData.map((stat, idx) => (
          <ChannelCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
}
